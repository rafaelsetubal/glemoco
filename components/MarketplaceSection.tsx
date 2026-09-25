"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n/context";

const categoryKeys = ["all", "ai", "sales", "content", "operations", "web3"] as const;
type CategoryKey = typeof categoryKeys[number];

interface AppConfig {
  id: "eva" | "presence" | "journey" | "zones" | "rewards" | "studio" | "seo" | "contracts";
  categoryKey: CategoryKey;
  layout: "feature" | "wide" | "small";
}

const appConfigs: AppConfig[] = [
  { id: "eva", categoryKey: "ai", layout: "feature" },
  { id: "presence", categoryKey: "operations", layout: "wide" },
  { id: "journey", categoryKey: "sales", layout: "wide" },
  { id: "zones", categoryKey: "sales", layout: "small" },
  { id: "rewards", categoryKey: "sales", layout: "small" },
  { id: "studio", categoryKey: "content", layout: "small" },
  { id: "seo", categoryKey: "web3", layout: "small" },
  { id: "contracts", categoryKey: "operations", layout: "small" },
];

export function MarketplaceSection() {
  const { t } = useI18n();
  const [selectedCategory, setSelectedCategory] = useState<CategoryKey>("all");
  const [selectedAppId, setSelectedAppId] = useState<AppConfig["id"] | null>(null);
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  const categoryNames: Record<CategoryKey, string> = {
    all: t.marketplace.categories.all,
    ai: t.marketplace.categories.ai,
    sales: t.marketplace.categories.sales,
    content: t.marketplace.categories.content,
    operations: t.marketplace.categories.operations,
    web3: t.marketplace.categories.web3,
  };

  const visibleConfigs = appConfigs.filter(app => selectedCategory === "all" || app.categoryKey === selectedCategory);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const context = gsap.context(() => {
        gsap.fromTo(".mp-card", { y: 18, opacity: .5 }, { y: 0, opacity: 1, duration: .65, stagger: .045, ease: "power3.out", scrollTrigger: { trigger: ".mp-grid", start: "top 92%", once: true } });
      }, root);
      return () => context.revert();
    });
    return () => media.revert();
  }, [selectedCategory]);

  useEffect(() => {
    if (!selectedAppId) return;
    const element = dialog.current!;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; if (element.open) element.close(); };
  }, [selectedAppId]);

  const selectedApp = selectedAppId ? {
    ...appConfigs.find(a => a.id === selectedAppId)!,
    data: t.marketplace.apps[selectedAppId],
    categoryLabel: categoryNames[appConfigs.find(a => a.id === selectedAppId)!.categoryKey],
  } : null;

  return <section ref={root} id="marketplace" className="marketplace" aria-labelledby="marketplace-title">
    <div className="glemo-container">
      <header className="mp-heading">
        <p className="mp-label">{t.marketplace.label}</p>
        <h2 id="marketplace-title">{t.marketplace.titleMain}<br /> <span>{t.marketplace.titleHighlight}</span></h2>
        <p className="mp-intro">{t.marketplace.intro}</p>
      </header>
      <div className="mp-filters" role="group" aria-label="Filter apps by category">
        {categoryKeys.map(catKey => (
          <button
            type="button"
            key={catKey}
            aria-pressed={selectedCategory === catKey}
            onClick={() => setSelectedCategory(catKey)}
          >
            {categoryNames[catKey]}
          </button>
        ))}
      </div>
      <p className="mp-sr-only" role="status" aria-live="polite">
        {visibleConfigs.length} apps shown. Category: {categoryNames[selectedCategory]}.
      </p>
      <div className={`mp-grid ${selectedCategory !== "all" ? "mp-filtered" : ""}`}>
        {visibleConfigs.map(cfg => {
          const appData = t.marketplace.apps[cfg.id];
          const catLabel = categoryNames[cfg.categoryKey];
          return (
            <article key={cfg.id} className={`mp-card mp-${cfg.layout} mp-${cfg.categoryKey}`}>
              <img className="mp-art" src={`/marketplace/${cfg.id}.webp`} width="1448" height="1086" loading="lazy" decoding="async" alt="" />
              <div className="mp-shade" aria-hidden="true" />
              <div className="mp-card-copy">
                <span className="mp-category"><i aria-hidden="true" />{catLabel}</span>
                <h3>{appData.title}</h3>
                <p className="mp-subtitle">{appData.subtitle}</p>
                <p className="mp-description">{appData.description}</p>
                <button
                  className="mp-explore"
                  type="button"
                  onClick={() => setSelectedAppId(cfg.id)}
                  aria-label={`${t.marketplace.explore} ${appData.title}`}
                >
                  {cfg.layout === "feature" ? t.marketplace.exploreApp : t.marketplace.explore}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </button>
              </div>
              {cfg.layout === "feature" && (
                <ul className="mp-feature-notes" aria-label={`${appData.title} capabilities`}>
                  {appData.features.map(feature => <li key={feature}>{feature}</li>)}
                </ul>
              )}
            </article>
          );
        })}
      </div>
    </div>
    <dialog
      className="mp-dialog"
      ref={dialog}
      aria-labelledby="mp-dialog-title"
      onClose={() => setSelectedAppId(null)}
      onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}
    >
      {selectedApp && (
        <div className="mp-dialog-body">
          <button
            className="mp-close"
            type="button"
            aria-label={t.marketplace.closeDetails}
            onClick={() => dialog.current?.close()}
            autoFocus
          >
            <X size={22} />
          </button>
          <img src={`/marketplace/${selectedApp.id}.webp`} alt="" width="1448" height="1086" loading="lazy" decoding="async" />
          <div className="mp-dialog-copy">
            <span className="mp-category">{selectedApp.categoryLabel}</span>
            <h2 id="mp-dialog-title">{selectedApp.data.title}</h2>
            <p className="mp-subtitle">{selectedApp.data.subtitle}</p>
            <p>{selectedApp.data.description}</p>
            <ul>{selectedApp.data.features.map(feature => <li key={feature}>{feature}</li>)}</ul>
          </div>
        </div>
      )}
    </dialog>
  </section>;
}
