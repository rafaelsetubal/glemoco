"use client";

import { useEffect } from "react";

export function ScrollRevealProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if user prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      document.querySelectorAll(".reveal-init").forEach((el) => el.classList.add("is-revealed"));
      return;
    }

    const targets = document.querySelectorAll<HTMLElement>(
      ".vision-grid, .vision-quote-card, .market-intro, .featured-market-metric, .market-metric-strip .metric-col, .eco-heading, .eco-composition, .product-chapter, .mp-heading, .mp-card, .network-copy, .network-evidence, .roadmap-heading, .roadmap-phase, .leadership-copy, .leadership-portrait, .events-intro, .event-photo, .closing-cta-layout"
    );

    targets.forEach((target) => {
      target.classList.add("reveal-init");
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-revealed");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -40px 0px",
      }
    );

    targets.forEach((target) => observer.observe(target));

    return () => observer.disconnect();
  }, []);

  return <>{children}</>;
}
