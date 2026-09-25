"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Search, UserRound, ChartNoAxesColumnIncreasing, Building2, Database, Network } from "lucide-react";
import { useI18n } from "@/lib/i18n/context";

const web2Icons = [Search, UserRound, ChartNoAxesColumnIncreasing];
const web3Icons = [Building2, Database, Network];

export function ProductSections() {
  const { t } = useI18n();
  const root = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const media = gsap.matchMedia();
    media.add("(prefers-reduced-motion: no-preference)", () => {
      const scope = root.current!;
      const context = gsap.context(() => {
        scope.querySelectorAll<HTMLElement>(".product-chapter").forEach(section => {
          const image = section.querySelector(".product-image");
          const line = section.querySelector(".product-capability-path");
          gsap.fromTo(image, { opacity: .35, y: 22, scale: .98 }, { opacity: 1, y: 0, scale: 1, duration: 1.15, ease: "power3.out", scrollTrigger: { trigger: section, start: "top 82%", once: true } });
          gsap.fromTo(line, { strokeDashoffset: 1 }, { strokeDashoffset: 0, duration: 1.3, ease: "power2.inOut", scrollTrigger: { trigger: section, start: "top 65%", once: true } });
          if (section.id === "web3") gsap.fromTo(section.querySelector(".product-art"), { y: 12 }, { y: -12, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: .6 } });
        });
        gsap.fromTo(".product-bridge-node", { y: 0 }, { y: 90, ease: "none", scrollTrigger: { trigger: ".product-bridge", start: "top 85%", end: "bottom 40%", scrub: .4 } });
      }, scope);
      return () => context.revert();
    });
    return () => media.revert();
  }, []);

  const productsList = [
    {
      id: "web2",
      data: t.products.web2,
      icons: web2Icons,
      image: "/products/web2.webp",
      alt: "glemO domestic and international real estate marketplaces displayed on two laptops",
      width: 1448,
      height: 1086
    },
    {
      id: "web3",
      data: t.products.web3,
      icons: web3Icons,
      image: "/products/rwa.webp",
      alt: "glemO RWA platform mockup showing asset offerings and the investor conversion journey",
      width: 1225,
      height: 1284
    },
  ];

  return <div ref={root} className="product-chapters">
    {productsList.map((product, index) => <div key={product.id}>
      {index === 1 && <div className="product-bridge" aria-hidden="true"><span>WEB2 → WEB3</span><i><b className="product-bridge-node" /></i></div>}
      <section id={product.id} className={`product-chapter product-${product.id}`} aria-labelledby={`${product.id}-title`}>
        <div className="glemo-container product-grid">
          <div className="product-copy">
            <p className="product-label">{product.data.label}</p>
            <h2 id={`${product.id}-title`}>
              {product.data.titleMain} <span>{product.data.titleHighlight}</span>
            </h2>
            <p className="product-description">{product.data.copy}</p>
            <div className="product-capabilities">
              <svg viewBox="0 0 400 32" preserveAspectRatio="none" aria-hidden="true">
                <path className="product-capability-track" d={index === 0 ? "M4 16 H396" : "M4 24 C100 24 100 7 200 7 S300 24 396 24"}/>
                <path className="product-capability-path" pathLength="1" d={index === 0 ? "M4 16 H396" : "M4 24 C100 24 100 7 200 7 S300 24 396 24"}/>
              </svg>
              <ul>{product.data.capabilities.map((capability, i) => {
                const Icon = product.icons[i];
                return (
                  <li key={capability}>
                    <span className="product-capability-icon"><Icon size={24} strokeWidth={1.4} aria-hidden="true" /></span>
                    <strong>{capability}</strong>
                    <p>{product.data.capabilityDetails[i]}</p>
                  </li>
                );
              })}</ul>
            </div>
          </div>
          <div className="product-art">
            {index === 1 && <svg className="product-orbits" viewBox="0 0 700 700" aria-hidden="true"><path d="M30 460 C-20 180 570 0 660 250 S270 720 70 570"/><path d="M70 230 C270 50 760 370 610 590 S100 510 40 360"/></svg>}
            <img className="product-image" src={product.image} alt={product.alt} width={product.width} height={product.height} loading="lazy" decoding="async" />
          </div>
        </div>
      </section>
    </div>)}
  </div>;
}
