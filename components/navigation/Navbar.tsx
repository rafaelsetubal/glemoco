"use client";

import { Menu, X, ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useI18n } from "@/lib/i18n/context";
import { LanguageSelector } from "./LanguageSelector";

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { label: t.nav.about, href: "#leadership" },
    { label: t.nav.ecosystem, href: "#ecosystem" },
    { label: t.nav.marketplace, href: "#marketplace" },
    { label: t.nav.roadmap, href: "#roadmap" },
    { label: t.nav.events, href: "#events" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className={`nav ${scrolled ? "nav-scrolled" : ""}`}>
      <div className="glemo-container nav-inner">
        <a href="#top" className="brand" aria-label="GlemO home">
          <img src="/brand/glemo-official.webp" alt="GlemO" width="142" height="45" />
        </a>
        <nav>
          {navItems.map((item) => (
            <a href={item.href} key={item.href}>
              {item.label}
            </a>
          ))}
          <a className="contact" href="mailto:gleisson@glemo.co">
            {t.nav.contact} <ArrowUpRight size={14} />
          </a>
          <LanguageSelector />
        </nav>
        <button className="menu" onClick={() => setOpen(!open)} aria-label={open ? "Close navigation" : "Open navigation"}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
      {open && (
        <div className="mobile-overlay" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="mobile-overlay-header">
            <a href="#top" className="mobile-brand" onClick={() => setOpen(false)} aria-label="GlemO home">
              <img src="/brand/glemo-official.webp" alt="GlemO" width="132" height="42" />
            </a>
            <button className="mobile-close-btn" onClick={() => setOpen(false)} aria-label="Close navigation">
              <X size={22} />
            </button>
          </div>
          
          <div className="mobile-overlay-nav">
            {navItems.map((item) => (
              <a href={item.href} key={item.href} onClick={() => setOpen(false)}>
                {item.label}
              </a>
            ))}
          </div>

          <div className="mobile-overlay-footer">
            <a href="mailto:gleisson@glemo.co" className="mobile-contact-btn" onClick={() => setOpen(false)}>
              <span>{t.nav.contact}</span>
              <ArrowUpRight size={16} />
            </a>
            <LanguageSelector isMobile />
          </div>
        </div>
      )}
    </header>
  );
}
