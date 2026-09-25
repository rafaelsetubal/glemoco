"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { BackgroundParticles } from "./BackgroundParticles";
import { HeroGlobe } from "./HeroGlobe";

export function Hero() {
  const ref = useRef<HTMLElement>(null);
  const atmosphereRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const hero = ref.current;
    if (!hero) return;

    // Subtle pointer parallax on atmospheric glow
    const move = (e: PointerEvent) => {
      if (!atmosphereRef.current) return;
      const x = (e.clientX / innerWidth - 0.5) * 16;
      const y = (e.clientY / innerHeight - 0.5) * 14;
      atmosphereRef.current.style.transform = `translate3d(${x}px, ${y - 50}%, 0)`;
    };

    addEventListener("pointermove", move, { passive: true });
    return () => removeEventListener("pointermove", move);
  }, []);

  return (
    <section className="hero" id="top" ref={ref}>
      {/* Cinematic High-Res Space Atmosphere Background */}
      <div className="hero-bg-backdrop" aria-hidden="true">
        <img src="/hero-bg.png" alt="" className="hero-bg-img" />
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
            <img src="/brand/glemo-official.png" alt="GlemO" />
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
