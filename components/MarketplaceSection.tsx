"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const categories = ["All", "AI", "Sales", "Content", "Operations", "Web3"] as const;
type Category = typeof categories[number];
const apps = [
  { id: "eva", title: "EVA", subtitle: "Broker Training", category: "AI", description: "Your AI-powered training companion. Personalized learning, real scenarios and always-on guidance for modern brokers.", features: ["Personalized learning", "Real-world scenarios", "24/7 AI support"], layout: "feature" },
  { id: "presence", title: "Digital Presence", subtitle: "Market Monitoring", category: "Operations", description: "Track markets, projects and opportunities in real time.", features: ["Live data", "Market trends", "New opportunities"], layout: "wide" },
  { id: "journey", title: "Broker Journey", subtitle: "24/7 Assistance", category: "Sales", description: "An AI co-pilot for every step of the broker journey — from lead to close.", features: ["Leads", "Guidance", "Negotiation", "Closing"], layout: "wide" },
  { id: "zones", title: "Hot Zones", subtitle: "Market & Sales Intelligence", category: "Sales", description: "Identify high-potential areas with AI-driven market and sales data.", features: ["Market intelligence", "Opportunity discovery"], layout: "small" },
  { id: "rewards", title: "Referral Rewards", subtitle: "Client Acquisition", category: "Sales", description: "Turn relationships into opportunities with automated referral rewards.", features: ["Referral network", "Client acquisition"], layout: "small" },
  { id: "studio", title: "Multimedia Studio", subtitle: "Ad Creation", category: "Content", description: "Create property content with AI — images, videos and campaigns.", features: ["Images", "Videos", "Campaigns"], layout: "small" },
  { id: "seo", title: "SEO & Content Analyzer", subtitle: "Content Intelligence", category: "Web3", description: "Optimize your content, increase visibility and reach more clients across the web.", features: ["SEO insights", "Content optimization"], layout: "small" },
  { id: "contracts", title: "Contract Manager", subtitle: "Smart Documents", category: "Operations", description: "Create, manage and sign real estate contracts with AI-powered assistance.", features: ["AI drafting", "Smart documents", "Signing workflow"], layout: "small" },
] as const;
type App = typeof apps[number];

export function MarketplaceSection() {
  const [category, setCategory] = useState<Category>("All");
  const [selected, setSelected] = useState<App | null>(null);
  const root = useRef<HTMLElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const visibleApps = apps.filter(app => category === "All" || app.category === category);

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
  }, [category]);

  useEffect(() => {
    if (!selected) return;
    const element = dialog.current!;
    element.showModal();
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; if (element.open) element.close(); };
  }, [selected]);

  return <section ref={root} id="marketplace" className="marketplace" aria-labelledby="marketplace-title">
    <div className="glemo-container">
      <header className="mp-heading">
        <p className="mp-label">07 — MARKETPLACE</p>
        <h2 id="marketplace-title">One marketplace. Apps, AI and dApps<br /> built for <span>real estate.</span></h2>
        <p className="mp-intro">Discover tools for acquisition, sales, content, operations and tokenized infrastructure.</p>
      </header>
      <div className="mp-filters" role="group" aria-label="Filter apps by category">
        {categories.map(item => <button type="button" key={item} aria-pressed={category === item} onClick={() => setCategory(item)}>{item}</button>)}
      </div>
      <p className="mp-sr-only" role="status" aria-live="polite">{visibleApps.length} apps shown. Category: {category}.</p>
      <div className={`mp-grid ${category !== "All" ? "mp-filtered" : ""}`}>
        {visibleApps.map(app => <article key={app.id} className={`mp-card mp-${app.layout} mp-${app.category.toLowerCase()}`}>
          <img className="mp-art" src={`/marketplace/${app.id}.png`} width="1448" height="1086" loading="lazy" decoding="async" alt="" />
          <div className="mp-shade" aria-hidden="true" />
          <div className="mp-card-copy">
            <span className="mp-category"><i aria-hidden="true" />{app.category}</span>
            <h3>{app.title}</h3><p className="mp-subtitle">{app.subtitle}</p>
            <p className="mp-description">{app.description}</p>
            <button className="mp-explore" type="button" onClick={() => setSelected(app)} aria-label={`Explore ${app.title}`}>{app.layout === "feature" ? "Explore app" : "Explore"}<ArrowUpRight size={17} aria-hidden="true" /></button>
          </div>
          {app.layout === "feature" && <ul className="mp-feature-notes" aria-label="EVA capabilities">{app.features.map(feature => <li key={feature}>{feature}</li>)}</ul>}
        </article>)}
      </div>
    </div>
    <dialog className="mp-dialog" ref={dialog} aria-labelledby="mp-dialog-title" onClose={() => setSelected(null)} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close(); }}>
      {selected && <div className="mp-dialog-body">
        <button className="mp-close" type="button" aria-label="Close app details" onClick={() => dialog.current?.close()} autoFocus><X size={22} /></button>
        <img src={`/marketplace/${selected.id}.png`} alt="" width="1448" height="1086" />
        <div className="mp-dialog-copy"><span className="mp-category">{selected.category}</span><h2 id="mp-dialog-title">{selected.title}</h2><p className="mp-subtitle">{selected.subtitle}</p><p>{selected.description}</p><ul>{selected.features.map(feature => <li key={feature}>{feature}</li>)}</ul></div>
      </div>}
    </dialog>
  </section>;
}
