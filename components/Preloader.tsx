"use client";

import { useEffect, useState } from "react";

export function Preloader() {
  const [progress, setProgress] = useState(0);
  const [phase, setPhase] = useState<"loading" | "dissolving" | "done">("loading");

  useEffect(() => {
    // Check if user prefers reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) {
      document.body.classList.add("preloader-loaded");
      setPhase("done");
      return;
    }

    let current = 0;
    const interval = setInterval(() => {
      current += Math.floor(Math.random() * 16) + 10;
      if (current >= 100) {
        current = 100;
        setProgress(100);
        clearInterval(interval);

        // Transition: Soft blur dissolution
        setTimeout(() => {
          setPhase("dissolving");
          document.body.classList.add("preloader-loaded");

          // Remove when fade & blur are fully complete
          setTimeout(() => {
            setPhase("done");
          }, 800);
        }, 120);
      } else {
        setProgress(current);
      }
    }, 40);

    return () => clearInterval(interval);
  }, []);

  if (phase === "done") {
    return null;
  }

  return (
    <aside
      className={`preloader-overlay ${phase === "dissolving" ? "preloader-dissolve" : ""}`}
      aria-label="Loading glemO"
      aria-hidden={phase !== "loading"}
    >
      <div className="preloader-backdrop-glow" aria-hidden="true" />
      
      <div className="preloader-content">
        {/* Glowing Logo */}
        <div className="preloader-logo-wrap">
          <img
            src="/events/glemo.white.svg"
            alt="glemO"
            width={138}
            height={48}
            className="preloader-logo"
          />
          <div className="preloader-logo-flare" aria-hidden="true" />
        </div>

        {/* Laser Progress Track */}
        <div className="preloader-track" role="progressbar" aria-valuenow={progress} aria-valuemin={0} aria-valuemax={100}>
          <div
            className="preloader-bar"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Tech Counter & Status */}
        <div className="preloader-meta">
          <span className="preloader-counter">{String(progress).padStart(2, "0")}%</span>
          <span className="preloader-status">INITIALIZING ECOSYSTEM</span>
        </div>
      </div>
    </aside>
  );
}
