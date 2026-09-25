"use client";

import { useEffect, useRef } from "react";

export function VisionSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = ref.current;
    if (!section) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) section.classList.add("vision-visible");
      },
      { threshold: 0.05 }
    );
    observer.observe(section);

    const move = (event: PointerEvent) => {
      const architecture = section.querySelector<HTMLElement>(".vision-architecture-mid");
      if (architecture) {
        architecture.style.transform = `translate3d(${(event.clientX - innerWidth / 2) * 0.004}px,${(event.clientY - innerHeight / 2) * 0.003}px,0)`;
      }
    };
    section.addEventListener("pointermove", move);
    return () => {
      observer.disconnect();
      section.removeEventListener("pointermove", move);
    };
  }, []);

  return (
    <section className="vision" ref={ref} id="vision">
      <div className="glemo-container vision-grid">
        {/* Left Narrative Column */}
        <div className="vision-copy">
          <p className="vision-label">02 — OUR VISION</p>
          <h2 className="vision-headline">
            <span className="vision-h2-line">Real estate is global.</span>
            <span className="vision-h2-line">Its infrastructure should be too.</span>
          </h2>
          <div className="vision-statement">
            <p>
              Real estate is the world’s largest financial asset, yet technological adoption remains slow and fragmented.
            </p>
            <p>
              Cross-border transactions are still complex, limiting access to global opportunities.
            </p>
          </div>

          <blockquote className="vision-quote">
            <p>
              “We are not building another real estate platform. We are connecting the infrastructure of a global market.”
            </p>
            <footer className="vision-author">
              <strong>GLEISSON OLIVEIRA HERIT</strong>
              <span>THE CREATOR OF OPEN AND THE GLEMO PROJECT</span>
            </footer>
          </blockquote>
        </div>

        {/* Right Visual Stage (Buildings + Blue Rim Light + Founder Cutout) */}
        <div className="vision-stage" aria-hidden="true">
          <img className="vision-architecture vision-architecture-back" src="/buildings.svg" alt="" />
          <img className="vision-architecture vision-architecture-mid" src="/buildings.svg" alt="" />
          <div className="vision-light" />
          <img className="vision-founder" src="/founder/gleisson-herit-cutout.png" alt="Gleisson Oliveira Herit" />
        </div>
      </div>
    </section>
  );
}
