"use client";

import { useEffect, useRef } from "react";
import { FeaturedMarketMetric } from "./FeaturedMarketMetric";
import { useI18n } from "@/lib/i18n/context";

export function MarketStory() {
  const { t } = useI18n();
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
              {t.market.label}
            </p>
            <h2 className="market-headline">
              {t.market.headlineLine1}
              <br />
              {t.market.headlineLine2}
            </h2>
            <p className="market-desc">
              {t.market.descLine1}
              <br />
              {t.market.descLine2}
            </p>
          </div>

          {/* Featured Translucent Glass Data Panel */}
          <FeaturedMarketMetric
            topLabel={t.market.featuredTop}
            value={t.market.featuredValue}
            bottomLabel={t.market.featuredBottom}
          />
        </div>

        {/* 3. Tightly Grouped 5-Column Evidence Strip directly below */}
        <div className="market-metric-strip">
          <div className="metric-col metric-cyan">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>{t.market.metrics.shareValue}</strong>
              <span dangerouslySetInnerHTML={{ __html: t.market.metrics.shareLabel.replace('\n', '<br />') }} />
            </div>
          </div>

          <div className="metric-col metric-orange">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>{t.market.metrics.companiesValue}</strong>
              <span dangerouslySetInnerHTML={{ __html: t.market.metrics.companiesLabel.replace('\n', '<br />') }} />
            </div>
          </div>

          <div className="metric-col metric-white">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>{t.market.metrics.adoptionValue}</strong>
              <span dangerouslySetInnerHTML={{ __html: t.market.metrics.adoptionLabel.replace('\n', '<br />') }} />
            </div>
          </div>

          <div className="metric-col metric-cyan metric-col-tag">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>{t.market.metrics.hubsValue}</strong>
              <span dangerouslySetInnerHTML={{ __html: t.market.metrics.hubsLabel.replace('\n', '<br />') }} />
            </div>
          </div>

          <div className="metric-col metric-white metric-col-layer">
            <div className="metric-col-tick" aria-hidden="true" />
            <div className="metric-col-content">
              <strong>{t.market.metrics.aiValue}</strong>
              <span dangerouslySetInnerHTML={{ __html: t.market.metrics.aiLabel.replace('\n', '<br />') }} />
            </div>
          </div>
        </div>

        {/* 4. Open Viewport Space for Illuminated Earth & Curved Network Arcs */}
        <div className="market-globe-stage" aria-hidden="true" />
      </div>
    </section>
  );
}
