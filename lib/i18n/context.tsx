"use client";

import React, { createContext, useContext, useEffect, useState, useMemo } from "react";
import { Locale, Dictionary } from "./types";
import { en } from "./dictionaries/en";
import { pt } from "./dictionaries/pt";
import { es } from "./dictionaries/es";
import { fr } from "./dictionaries/fr";
import { ar } from "./dictionaries/ar";

const dictionaries: Record<Locale, Dictionary> = {
  en,
  pt,
  es,
  fr,
  ar,
};

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isRtl: boolean;
}

const I18nContext = createContext<I18nContextValue | null>(null);

const STORAGE_KEY = "glemo_locale";

export function I18nProvider({ children }: { children: React.ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
      if (saved && ["en", "pt", "es", "fr", "ar"].includes(saved)) {
        setLocaleState(saved);
      } else {
        const browserLang = navigator.language.toLowerCase();
        if (browserLang.startsWith("pt")) setLocaleState("pt");
        else if (browserLang.startsWith("es")) setLocaleState("es");
        else if (browserLang.startsWith("fr")) setLocaleState("fr");
        else if (browserLang.startsWith("ar")) setLocaleState("ar");
      }
    } catch {
      // ignore
    }
  }, []);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem(STORAGE_KEY, newLocale);
    } catch {
      // ignore
    }
  };

  const isRtl = locale === "ar";

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = locale;
      document.documentElement.dir = isRtl ? "rtl" : "ltr";
      if (isRtl) {
        document.documentElement.classList.add("rtl");
      } else {
        document.documentElement.classList.remove("rtl");
      }
    }
  }, [locale, isRtl]);

  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: dictionaries[locale] || en,
      isRtl,
    }),
    [locale, isRtl]
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    return {
      locale: "en" as Locale,
      setLocale: () => {},
      t: en,
      isRtl: false,
    };
  }
  return context;
}
