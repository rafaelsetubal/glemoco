"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, UserRound, ChartNoAxesColumnIncreasing, Database, LayoutGrid, Blocks, LucideIcon } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const connections = [
  "M265 140 H335 C390 140 370 230 460 230",
  "M265 280 H460",
  "M265 420 H330 C390 420 375 330 460 330",
  "M935 140 H865 C810 140 830 230 740 230",
  "M935 280 H740",
  "M935 420 H870 C810 420 825 330 740 330",
];

interface StepItem {
  number: string;
  title: string;
  copy: string;
  icon: LucideIcon;
}

function Layer({ items, web, name }: { items: StepItem[]; web: string; name: string }) {
  return <div className={`eco-layer eco-${web.toLowerCase()}`}>
    <h3><span>{web}</span> {name}</h3>
    <ol start={web === "WEB3" ? 4 : 1}>{items.map(({ number, title, copy, icon: Icon }) => <li key={number} data-step={number}>
      <span className="eco-number">{number}</span>
      <span className="eco-icon"><Icon size={25} strokeWidth={1.25} aria-hidden="true" /></span>
      <div><h4>{title}</h4><p>{copy}</p></div>
    </li>)}</ol>
  </div>;
}

export function EcosystemSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  const transaction: StepItem[] = [
    { number: "01", title: t.ecosystem.steps.step1Title, copy: t.ecosystem.steps.step1Copy, icon: Search },
    { number: "02", title: t.ecosystem.steps.step2Title, copy: t.ecosystem.steps.step2Copy, icon: UserRound },
    { number: "03", title: t.ecosystem.steps.step3Title, copy: t.ecosystem.steps.step3Copy, icon: ChartNoAxesColumnIncreasing },
  ];

  const infrastructure: StepItem[] = [
    { number: "04", title: t.ecosystem.steps.step4Title, copy: t.ecosystem.steps.step4Copy, icon: Database },
    { number: "05", title: t.ecosystem.steps.step5Title, copy: t.ecosystem.steps.step5Copy, icon: LayoutGrid },
    { number: "06", title: t.ecosystem.steps.step6Title, copy: t.ecosystem.steps.step6Copy, icon: Blocks },
  ];
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add({ mobile: "(max-width: 800px)", desktop: "(min-width: 801px)", reduced: "(prefers-reduced-motion: reduce)" }, context => {
      const steps = Array.from(section.querySelectorAll<HTMLElement>("[data-step]"));
      const paths = Array.from(section.querySelectorAll<SVGPathElement>(".eco-route-draw"));
      const particles = Array.from(section.querySelectorAll<SVGCircleElement>(".eco-flow-particle"));
      const lengths = paths.map(path => path.getTotalLength());
      const reached = new Array(6).fill(0);
      const spine = section.querySelector<HTMLElement>(".eco-spine-node")!;
      const visual = section.querySelector<HTMLElement>(".eco-visual")!;
      let completed = false;
      const setStep = (index: number, value: number) => {
        const progress = reached[index] = Math.max(reached[index], Math.min(1, Math.max(0, value)));
        steps[index].style.setProperty("--flow", String(progress));
        steps[index].style.setProperty("--particle", progress > 0 && progress < 1 ? "1" : "0");
        steps[index].classList.toggle("eco-step-reached", progress > 0);
        paths[index].style.strokeDashoffset = String(1 - progress);
        paths[index].style.opacity = progress === 1 ? ".42" : ".9";
        const point = paths[index].getPointAtLength(lengths[index] * progress);
        particles[index].setAttribute("cx", String(point.x));
        particles[index].setAttribute("cy", String(point.y));
        particles[index].style.opacity = progress > 0 && progress < 1 ? "1" : "0";
        visual.style.setProperty("--core-response", reached.some(p => p > 0 && p < 1) ? ".13" : ".045");
        if (!completed && reached.every(p => p === 1)) {
          completed = true;
          if (!context.conditions?.reduced) gsap.fromTo(spine, { top: "0%", opacity: 0 }, { top: "100%", opacity: .8, duration: 2.4, ease: "power1.inOut", onComplete: () => { spine.style.opacity = "0"; } });
        }
      };
      if (context.conditions?.reduced) steps.forEach((_, i) => setStep(i, 1));
      else if (context.conditions?.mobile) steps.forEach((step, i) => ScrollTrigger.create({ trigger: step, start: "top 95%", end: "bottom 90%", onUpdate: self => setStep(i, self.progress) }));
      else ScrollTrigger.create({ trigger: section, start: "top 75%", end: "bottom bottom", onUpdate: self => steps.forEach((_, i) => setStep(i, self.progress * 6 - i)) });
    });
    return () => media.revert();
  }, []);

  return <section ref={sectionRef} className="ecosystem" id="ecosystem" aria-labelledby="eco-title">
    <div className="glemo-container eco-container">
      <p className="eco-label"><i aria-hidden="true" />{t.ecosystem.label}</p>
      <header className="eco-heading">
        <h2 id="eco-title">{t.ecosystem.titleMain} <span>{t.ecosystem.titleHighlight}</span></h2>
        <p>{t.ecosystem.subtitle}</p>
      </header>
      <div className="eco-composition">
        <div className="eco-spine" aria-hidden="true"><i className="eco-spine-node" /></div>
        <Layer items={transaction} web="WEB2" name={t.ecosystem.web2LayerName} />
        <figure className="eco-visual">
          <img src="/ecosystem/connected-layers.webp" width="1254" height="1254" loading="lazy" decoding="async" alt="Two glemO mobile experiences connected through a luminous blue infrastructure network" />
          <img className="eco-devices" src="/ecosystem/connected-layers.webp" width="1254" height="1254" loading="lazy" decoding="async" alt="" aria-hidden="true" />
        </figure>
        <svg className="eco-routes" viewBox="0 0 1200 540" preserveAspectRatio="none" aria-hidden="true">
          {connections.map((d, i) => <g className={i < 3 ? "eco-flow-web2" : "eco-flow-web3"} key={d}>
            <path className="eco-route-track" d={d} />
            <path className="eco-route-draw" pathLength="1" d={d} />
            <circle className="eco-flow-particle" r="2.8" />
          </g>)}
        </svg>
        <Layer items={infrastructure} web="WEB3" name={t.ecosystem.web3LayerName} />
      </div>
      <div className="eco-horizon" aria-hidden="true"><i /></div>
    </div>
  </section>;
}
