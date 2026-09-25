"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useI18n } from "@/lib/i18n/context";

const milestoneVideos = [
  "/network/network-03.mp4",
  "/network/network-02.mp4",
  "/network/network-01.mp4",
];

export function NetworkSection() {
  const { t } = useI18n();
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    gsap.registerPlugin(ScrollTrigger);
    const videos = Array.from(section.querySelectorAll("video"));
    const visible = new Set<HTMLVideoElement>();
    const sync = (video: HTMLVideoElement) => {
      if (visible.has(video) && !document.hidden) {
        video.muted = true;
        if (video.paused) void video.play().catch(() => undefined);
      } else video.pause();
    };
    const observer = new IntersectionObserver((entries) => entries.forEach(({ isIntersecting, target }) => {
      const video = target as HTMLVideoElement;
      if (isIntersecting) visible.add(video);
      else visible.delete(video);
      sync(video);
    }), { threshold: 0 });
    const ready = (event: Event) => sync(event.currentTarget as HTMLVideoElement);
    const visibility = () => videos.forEach(sync);
    videos.forEach((video) => { observer.observe(video); video.addEventListener("canplay", ready); });
    document.addEventListener("visibilitychange", visibility);
    const cleanup = () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", visibility);
      videos.forEach(video => { video.removeEventListener("canplay", ready); video.pause(); });
    };
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return cleanup;
    const context = gsap.context(() => {
      gsap.from(".network-copy > *", { y: 20, opacity: 0, duration: 0.9, ease: "power3.out", stagger: 0.1, scrollTrigger: { trigger: section, start: "top 72%", once: true } });
    }, section);
    return () => { cleanup(); context.revert(); };
  }, []);

  const milestoneItems = [
    { number: "01", video: milestoneVideos[0], copy: t.network.milestones[0] },
    { number: "02", video: milestoneVideos[1], copy: t.network.milestones[1] },
    { number: "03", video: milestoneVideos[2], copy: t.network.milestones[2] },
  ];

  return <section className="network-section" id="network" ref={sectionRef}>
    <div className="network-section__backdrop" aria-hidden="true" />
    <div className="glemo-container network-layout">
      <aside className="network-copy">
        <p className="network-eyebrow"><span /> {t.network.eyebrow}</p>
        <h2>{t.network.titleMain} <em>{t.network.titleHighlight}</em></h2>
        <p className="network-intro">{t.network.intro}</p>
        <p className="network-signature">
          {t.network.signature.line1}<br />
          {t.network.signature.line2}<br />
          {t.network.signature.line3}
        </p>
      </aside>
      <div className="network-rail" aria-label="Network milestones">
        {milestoneItems.map((milestone) => <article className="network-evidence" key={milestone.number}>
          <div className="network-evidence__index"><span>{milestone.number}</span><i /></div>
          <div className="network-evidence__visual"><video muted loop playsInline preload="auto" src={milestone.video} aria-label={milestone.copy} /></div>
          <p>{milestone.copy}</p>
        </article>)}
      </div>
    </div>
  </section>;
}
