"use client";

import { useState, useRef, useEffect } from "react";
import { Globe, ChevronDown, Check } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";
import { Locale } from "@/lib/i18n/types";

const languages: { code: Locale; label: string; native: string }[] = [
  { code: "en", label: "English", native: "EN" },
  { code: "pt", label: "Português", native: "PT" },
  { code: "es", label: "Español", native: "ES" },
  { code: "fr", label: "Français", native: "FR" },
  { code: "ar", label: "العربية", native: "AR" },
];

export function LanguageSelector({ isMobile = false }: { isMobile?: boolean }) {
  const { locale, setLocale, t } = useI18n();
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleOutsideClick);
      document.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  const currentLang = languages.find((l) => l.code === locale) || languages[0];

  if (isMobile) {
    return (
      <div className="mobile-lang-selector" role="group" aria-label={t.common.language}>
        <span className="mobile-lang-title">
          <Globe size={14} aria-hidden="true" />
          {t.common.language}
        </span>
        <div className="mobile-lang-chips">
          {languages.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                type="button"
                key={lang.code}
                className={`mobile-lang-chip ${isSelected ? "mobile-lang-chip--active" : ""}`}
                onClick={() => setLocale(lang.code)}
                aria-pressed={isSelected}
              >
                {lang.label}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="lang-dropdown-wrapper" ref={containerRef}>
      <button
        type="button"
        className={`lang-trigger ${isOpen ? "lang-trigger--active" : ""}`}
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`${t.common.language}: ${currentLang.label}`}
      >
        <Globe size={13} className="lang-globe-icon" aria-hidden="true" />
        <span className="lang-code-text">{currentLang.native}</span>
        <ChevronDown size={11} className={`lang-chevron ${isOpen ? "lang-chevron--open" : ""}`} aria-hidden="true" />
      </button>

      {isOpen && (
        <div className="lang-menu-glass" role="listbox" aria-label={t.common.language}>
          {languages.map((lang) => {
            const isSelected = locale === lang.code;
            return (
              <button
                type="button"
                key={lang.code}
                role="option"
                aria-selected={isSelected}
                className={`lang-option ${isSelected ? "lang-option--selected" : ""}`}
                onClick={() => {
                  setLocale(lang.code);
                  setIsOpen(false);
                }}
              >
                <span className="lang-option-text">{lang.label}</span>
                <span className="lang-option-code">{lang.native}</span>
                {isSelected && <Check size={13} className="lang-check-icon" aria-hidden="true" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
