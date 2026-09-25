"use client";

import { useEffect, useRef } from "react";
import { FeaturedMarketMetric } from "./FeaturedMarketMetric";

export function MarketStory() {
  const ref = useRef<HTMLElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = ref.current;
    const video = videoRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          section.classList.add("market-visible");
          if (video && video.paused) {
            video.play().catch(() => {});
          }
        } else {
          if (video && !video.paused) {
            video.pause();
          }
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="market-story" ref={ref} id="market-data">
      {/* 1. Full-Section Atmospheric Background Video Layer */}
      <div className="market-video-backdrop" aria-hidden="true">
        <video
          ref={videoRef}
          loop
          muted
          playsInline
          preload="none"
          className="market-bg-video"
          src="/ascii-animation (2).mp4"
        />
        <div className="market-video-protection-overlay" />
      </div>

      {/* 2. Concentrated Editorial Content Grid (~1440px max-width) */}
      <div className="glemo-container market-panel">
        {/* Top Header Row: Narrative (Left ~50%) + Featured Panel US$ 290T (Right ~44%) */}
        <div className="market-header-row">
          <div className="market-intro">
            <p className="market-label">
              <span className="market-label-tick" aria-hidden="true" />
              03 — MARKET DATA
            </p>
            <h2 className="market-headline">
              A US$290T market,
              <br />
              still largely disconnected.
            </h2>
            <p className="market-desc">
              Real estate is the world’s largest asset class — with over USD 700 billion
              <br />
              in global transaction volume, yet technological adoption remains fragmented.
            </p>
          </div>

          {/* Featured Translucent Glass Data Panel */}
          <FeaturedMarketMetric />
        </div>

        {/* 3. Tightly Grouped 5-Column Evidence Strip directly below */}
        <div className="market-metric-strip">
          <div className="metric-col metric-cyan">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>20%</strong>
              <span>
                CROSS-BORDER<br />MARKET SHARE
              </span>
            </div>
          </div>

          <div className="metric-col metric-orange">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>9MM+</strong>
              <span>
                GLOBAL COMPANIES<br />TARGET MARKET
              </span>
            </div>
          </div>

          <div className="metric-col metric-white">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>25%</strong>
              <span>
                US ENTERPRISES<br />TECH ADOPTION
              </span>
            </div>
          </div>

          <div className="metric-col metric-cyan metric-col-tag">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>USA &amp; DUBAI</strong>
              <span>
                STRONGEST RWA<br />&amp; CRYPTO HUBS
              </span>
            </div>
          </div>

          <div className="metric-col metric-white metric-col-layer">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>MASSIVE AI</strong>
              <span>
                AI &amp; WEB3<br />ADOPTION LAYER
              </span>
            </div>
          </div>
        </div>

        {/* 4. Open Viewport Space for Illuminated Earth & Curved Network Arcs */}
        <div className="market-globe-stage" aria-hidden="true" />
      </div>
    </section>
  );
}
