"use client";

import { useEffect, useRef } from "react";
import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { BackgroundParticles } from "./BackgroundParticles";

const HeroGlobe = dynamic(
  () => import("./HeroGlobe").then((mod) => mod.HeroGlobe),
  {
    ssr: false,
    loading: () => <div className="globe" style={{ opacity: 0 }} aria-hidden="true" />,
  }
);

export function Hero() {
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
      {/* Cinematic High-Res Space Atmosphere Background */}
      <div className="hero-bg-backdrop" aria-hidden="true">
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
          <p className="hero-eyebrow">GLOBAL REAL ESTATE ECOSYSTEM</p>

          <h1 className="hero-headline">
            <span className="hero-headline-desktop">
              <span>Global real estate,</span>
              <span>powered by Web2,</span>
              <span>Web3 &amp; AI.</span>
            </span>
            <span className="hero-headline-mobile">
              <span>Global real estate,</span>
              <span>powered by</span>
              <span>Web2, Web3 &amp; AI.</span>
            </span>
          </h1>

          <p className="hero-support hero-support-desktop">
            Properties, people, data and opportunities in one ecosystem.
          </p>

          <p className="hero-support hero-support-mobile">
            Properties, data and opportunities in one ecosystem.
          </p>

          {/* Premium Architectural CTA Cluster */}
          <div className="hero-cta-group">
            <a href="#ecosystem" className="hero-cta-primary">
              <span>Explore ecosystem</span>
              <ArrowUpRight size={14} className="cta-arrow" />
            </a>
            <a href="#contact" className="hero-cta-secondary">
              Contact us
            </a>
          </div>
        </div>

        {/* Right Visual Column (Globe + Anchored Network Metrics) */}
        <div className="hero-visual">
          {/* Mobile Featured Centered Logo ABOVE the Globe */}
          <div className="hero-mobile-brand" aria-hidden="true">
            <img src="/brand/glemo-official.webp" alt="GlemO" width="220" height="70" />
          </div>

          <div className="hero-globe-wrapper">
            <HeroGlobe />

            {/* Network Indicators Anchored Around Globe */}
            <div className="hero-indicator hero-indicator-network">
              <span className="indicator-label">GLOBAL NETWORK</span>
              <span className="indicator-status">
                <i className="indicator-pulse" /> LIVE
              </span>
            </div>

            <div className="hero-indicator hero-indicator-markets">
              <strong>06</strong>
              <span>KEY MARKETS</span>
            </div>

            <div className="hero-indicator hero-indicator-connections">
              <strong>120+</strong>
              <span>CONNECTIONS</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
