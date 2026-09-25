"use client";

import { useEffect, useRef } from "react";
import { Users, Cpu, Globe2, Network, Layers, Coins, ChartNoAxesCombined, Building2, Trophy, LucideIcon } from "lucide-react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n/context";

const phase1Icons: LucideIcon[] = [Users, Cpu, Globe2, Network];
const phase2Icons: LucideIcon[] = [Layers, Users, Coins, ChartNoAxesCombined];
const phase3Icons: LucideIcon[] = [Building2, Globe2, Trophy];

export function RoadmapSection() {
  const { t } = useI18n();
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

  const roadmapPhases = [
    {
      year: t.roadmap.phases.phase1.year,
      items: t.roadmap.phases.phase1.items.map((text, i) => ({ icon: phase1Icons[i], text })),
    },
    {
      year: t.roadmap.phases.phase2.year,
      items: t.roadmap.phases.phase2.items.map((text, i) => ({ icon: phase2Icons[i], text })),
    },
    {
      year: t.roadmap.phases.phase3.year,
      items: t.roadmap.phases.phase3.items.map((text, i) => ({ icon: phase3Icons[i], text })),
    },
  ];

  return <section id="roadmap" className="roadmap-section" ref={root} aria-labelledby="roadmap-title">
    <div className="glemo-container">
      <div className="roadmap-layout">
        <header className="roadmap-heading">
          <p className="roadmap-eyebrow">{t.roadmap.eyebrow} <span /></p>
          <h2 id="roadmap-title">{t.roadmap.titleMain}<br /><span>{t.roadmap.titleHighlight}</span></h2>
          <p className="roadmap-subtitle" dangerouslySetInnerHTML={{ __html: t.roadmap.subtitle.replace('\n', '<br />') }} />
        </header>
        <div className="roadmap-spine" aria-hidden="true"><span className="roadmap-spine-progress" /></div>
        <ol className="roadmap-phases">
          {roadmapPhases.map((phase, index) => <li className={`roadmap-phase roadmap-phase--${index + 1}`} key={phase.year}>
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
