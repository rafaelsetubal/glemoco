"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { BackgroundParticles } from "./BackgroundParticles";
import { useI18n } from "@/lib/i18n/context";

const HeroGlobe = dynamic(
  () => import("./HeroGlobe").then((mod) => mod.HeroGlobe),
  {
    ssr: false,
    loading: () => <div className="globe" style={{ opacity: 0 }} aria-hidden="true" />,
  }
);

export function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    let rafId: number | null = null;
    let targetX = 0;
    let targetY = 0;

    // Subtle pointer parallax on atmospheric glow throttled by RAF
    const move = (e: PointerEvent) => {
      targetX = (e.clientX / window.innerWidth - 0.5) * 16;
      targetY = (e.clientY / window.innerHeight - 0.5) * 14;

      if (rafId === null) {
        rafId = requestAnimationFrame(() => {
          if (atmosphereRef.current) {
            atmosphereRef.current.style.transform = `translate3d(${targetX}px, ${targetY - 50}%, 0)`;
          }
          rafId = null;
        });
      }
    };

    window.addEventListener("pointermove", move, { passive: true });
    return () => {
      window.removeEventListener("pointermove", move);
      if (rafId !== null) cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section className="hero" id="top" ref={ref}>
      {/* Cinematic High-Res Space Atmosphere Background with Smooth Fade */}
      <div className="hero-bg-backdrop hero-fade-bg" aria-hidden="true">
        <img src="/hero-bg.webp" alt="" className="hero-bg-img" fetchPriority="high" />
        <div className="hero-bg-vignette" />
      </div>

      <BackgroundParticles />
      <div className="atmosphere" ref={atmosphereRef} />

      {/* Subtle Top Horizontal Divider */}
      <div className="hero-top-divider" aria-hidden="true" />

      <div className="glemo-container hero-layout-grid">
        {/* Left Narrative Column */}
        <div className="hero-narrative">
          <p className="hero-eyebrow hero-fade-eyebrow">{t.hero.eyebrow}</p>

          <h1 className="hero-headline">
            <span className="hero-headline-desktop">
              <span className="hero-line-wrap">
                <AnimatedWords text={t.hero.headlineDesktop.line1} startIdx={0} />
              </span>
              <span className="hero-line-wrap">
                <AnimatedWords text={t.hero.headlineDesktop.line2} startIdx={4} />
              </span>
              <span className="hero-line-wrap">
                <AnimatedWords text={t.hero.headlineDesktop.line3} startIdx={8} />
              </span>
            </span>
            <span className="hero-headline-mobile">
              <span className="hero-line-wrap">
                <AnimatedWords text={t.hero.headlineMobile.line1} startIdx={0} />
              </span>
              <span className="hero-line-wrap">
                <AnimatedWords text={t.hero.headlineMobile.line2} startIdx={3} />
              </span>
              <span className="hero-line-wrap">
                <AnimatedWords text={t.hero.headlineMobile.line3} startIdx={6} />
              </span>
            </span>
          </h1>

          <p className="hero-support hero-support-desktop hero-fade-support">
            {t.hero.supportDesktop}
          </p>

          <p className="hero-support hero-support-mobile hero-fade-support">
            {t.hero.supportMobile}
          </p>

          {/* Premium Architectural CTA Cluster */}
          <div className="hero-cta-group hero-fade-cta">
            <a href="#ecosystem" className="hero-cta-primary">
              <span>{t.hero.ctaPrimary}</span>
              <ArrowUpRight size={14} className="cta-arrow" />
            </a>
            <a href="#contact" className="hero-cta-secondary">
              {t.hero.ctaSecondary}
            </a>
          </div>
        </div>

        {/* Right Visual Column (Globe + Anchored Network Metrics) */}
        <div className="hero-visual hero-fade-visual">
          {/* Mobile Featured Centered Logo ABOVE the Globe */}
          <div className="hero-mobile-brand" aria-hidden="true">
            <img src="/brand/glemo-official.webp" alt="GlemO" width="220" height="70" />
          </div>

          <div className="hero-globe-wrapper">
            <HeroGlobe />

            {/* Network Indicators Anchored Around Globe */}
            <div className="hero-indicator hero-indicator-network hero-fade-indicator-1">
              <span className="indicator-label">{t.hero.indicators.globalNetwork}</span>
              <span className="indicator-status">
                <i className="indicator-pulse" /> {t.hero.indicators.live}
              </span>
            </div>

            <div className="hero-indicator hero-indicator-markets hero-fade-indicator-2">
              <strong>{t.hero.indicators.keyMarkets}</strong>
              <span>{t.hero.indicators.keyMarketsLabel}</span>
            </div>

            <div className="hero-indicator hero-indicator-connections hero-fade-indicator-3">
              <strong>{t.hero.indicators.connections}</strong>
              <span>{t.hero.indicators.connectionsLabel}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function AnimatedWords({ text, startIdx = 0 }: { text: string; startIdx?: number }) {
  const words = text.split(" ");
  return (
    <>
      {words.map((word, i) => (
        <span
          key={i}
          className="hero-word-token"
          style={{ "--word-i": startIdx + i } as React.CSSProperties}
        >
          {word}&nbsp;
        </span>
      ))}
    </>
  );
}
