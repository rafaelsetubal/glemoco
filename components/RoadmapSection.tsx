"use client";

import { useEffect, useRef } from "react";
import { Users, Cpu, Globe2, Network, Layers, Coins, ChartNoAxesCombined, Building2, Trophy } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const phases = [
  { year: "2026", items: [
    { icon: Users, text: "Partner growth (+2x)" },
    { icon: Cpu, text: "AI Marketplace" },
    { icon: Globe2, text: "US market immersion" },
    { icon: Network, text: "Web3 community" },
  ] },
  { year: "2027", items: [
    { icon: Layers, text: "AI integrations, AI apps" },
    { icon: Users, text: "Over 10,000 partners" },
    { icon: Coins, text: "gO Token launch" },
    { icon: ChartNoAxesCombined, text: "Launch of the RWA platform." },
  ] },
  { year: "2028", items: [
    { icon: Building2, text: "Top of Mind for new real estate in Brazil" },
    { icon: Globe2, text: "Top of Mind for cross-border transactions of new real estate" },
    { icon: Trophy, text: "RWA platform leadership" },
  ] },
];

export function RoadmapSection() {
  const root = useRef<HTMLElement>(null);
  useEffect(() => {
    if (!root.current || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    gsap.registerPlugin(ScrollTrigger);
    const context = gsap.context(() => {
      gsap.from(".roadmap-spine-progress", { scaleY: 0, ease: "none", scrollTrigger: { trigger: root.current, start: "top 65%", end: "bottom 85%", scrub: 0.6 } });
      gsap.utils.toArray<HTMLElement>(".roadmap-phase").forEach((phase) => {
        gsap.from(phase.querySelector(".roadmap-card"), { y: 28, opacity: 0, duration: 1, ease: "power3.out", scrollTrigger: { trigger: phase, start: "top 85%", once: true } });
      });
    }, root);
    return () => context.revert();
  }, []);

  return <section id="roadmap" className="roadmap-section" ref={root} aria-labelledby="roadmap-title">
    <div className="glemo-container">
      <div className="roadmap-layout">
        <header className="roadmap-heading">
          <p className="roadmap-eyebrow">09 — ROADMAP <span /></p>
          <h2 id="roadmap-title">36-month<br /><span>roadmap</span></h2>
          <p className="roadmap-subtitle">From today to a more<br />open real estate world.</p>
        </header>
        <div className="roadmap-spine" aria-hidden="true"><span className="roadmap-spine-progress" /></div>
        <ol className="roadmap-phases">
          {phases.map((phase, index) => <li className={`roadmap-phase roadmap-phase--${index + 1}`} key={phase.year}>
            <span className="roadmap-node" aria-hidden="true" />
            <article className="roadmap-card">
              <header><h3>{phase.year}</h3><span className="roadmap-number">0{index + 1}</span></header>
              <ul>{phase.items.map(({ icon: Icon, text }) => <li key={text}><Icon size={23} strokeWidth={1.25} aria-hidden="true" /><span>{text}</span></li>)}</ul>
            </article>
          </li>)}
        </ol>
      </div>
    </div>
  </section>;
}
