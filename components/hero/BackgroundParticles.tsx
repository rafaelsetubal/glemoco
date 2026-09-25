"use client";
import { useEffect, useRef } from "react";

type DataPoint = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  opacity: number;
  depth: number;
};

type LiveNode = {
  cx: number;
  cy: number;
  rx: number;
  ry: number;
  rotation: number;
  speed: number;
  progress: number;
  color: string;
  isPrimary?: boolean;
};

export function BackgroundParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0,
      height = 0,
      pointer = { x: 0, y: 0, targetX: 0, targetY: 0 };
    let points: DataPoint[] = [];
    let liveNodes: LiveNode[] = [];
    let frame = 0,
      visible = true;

    const random = () => Math.random();

    const size = () => {
      const ratio = Math.min(devicePixelRatio, 1.5);
      width = innerWidth;
      height = innerHeight;
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      // Sparse spatial data coordinates
      const count = width < 760 ? 30 : Math.min(70, Math.round((width * height) / 16000));
      points = Array.from({ length: count }, () => ({
        x: random() * width,
        y: random() * height,
        vx: (random() - 0.5) * 0.08,
        vy: -0.03 - random() * 0.06,
        size: random() > 0.85 ? 1.4 : 0.75,
        opacity: 0.02 + random() * 0.05,
        depth: 0.2 + random() * 0.8,
      }));

      // Live traveling energy beacons overlaid along visual orbits
      const isMobile = width <= 820;
      const cx = isMobile ? width * 0.5 : width * 0.68;
      const cy = isMobile ? height * 0.52 : height * 0.46;
      const baseR = Math.min(width, height) * (isMobile ? 0.32 : 0.38);

      liveNodes = [
        {
          cx,
          cy,
          rx: baseR * 1.2,
          ry: baseR * 0.54,
          rotation: -0.28,
          speed: 0.00045,
          progress: 0.28,
          color: "#ff9a00",
          isPrimary: true,
        },
        {
          cx: cx - 15,
          cy: cy + 12,
          rx: baseR * 1.4,
          ry: baseR * 0.62,
          rotation: 0.22,
          speed: -0.0003,
          progress: 0.72,
          color: "#00baff",
          isPrimary: false,
        },
        {
          cx: cx + 18,
          cy: cy - 10,
          rx: baseR * 0.96,
          ry: baseR * 0.42,
          rotation: -0.48,
          speed: 0.00035,
          progress: 0.45,
          color: "#00e1ff",
          isPrimary: false,
        },
      ];
    };

    const draw = () => {
      if (!visible) {
        frame = 0;
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Smooth pointer interpolation
      if (!reduced) {
        pointer.x += (pointer.targetX - pointer.x) * 0.04;
        pointer.y += (pointer.targetY - pointer.y) * 0.04;
      }

      const pX = (pointer.x / (width || 1) - 0.5) * 2;
      const pY = (pointer.y / (height || 1) - 0.5) * 2;

      // 1. Live traveling energy beacons along orbits
      for (const node of liveNodes) {
        ctx.save();
        const pShiftX = !reduced ? pX * 9 : 0;
        const pShiftY = !reduced ? pY * 7 : 0;
        ctx.translate(node.cx + pShiftX, node.cy + pShiftY);
        ctx.rotate(node.rotation);

        if (!reduced) {
          node.progress = (node.progress + node.speed) % 1;
          if (node.progress < 0) node.progress += 1;
        }

        const angle = node.progress * Math.PI * 2;
        const nx = node.rx * Math.cos(angle);
        const ny = node.ry * Math.sin(angle);

        // Soft pulse halo
        ctx.beginPath();
        ctx.arc(nx, ny, node.isPrimary ? 5 : 3.5, 0, Math.PI * 2);
        ctx.fillStyle = node.isPrimary ? "rgba(255, 154, 0, 0.22)" : "rgba(0, 186, 255, 0.18)";
        ctx.fill();

        // Node core
        ctx.beginPath();
        ctx.arc(nx, ny, node.isPrimary ? 1.8 : 1.3, 0, Math.PI * 2);
        ctx.fillStyle = node.color;
        ctx.shadowBlur = node.isPrimary ? 9 : 6;
        ctx.shadowColor = node.color;
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.restore();
      }

      // 2. Sparse drifting spatial coordinates
      for (const pt of points) {
        if (!reduced) {
          pt.x += pt.vx;
          pt.y += pt.vy;
          if (pt.x < 0) pt.x = width;
          if (pt.x > width) pt.x = 0;
          if (pt.y < 0) pt.y = height;
          if (pt.y > height) pt.y = 0;
        }

        const parallaxX = !reduced ? pX * 14 * pt.depth : 0;
        const parallaxY = !reduced ? pY * 11 * pt.depth : 0;

        ctx.fillStyle = `rgba(185, 215, 240, ${pt.opacity})`;
        ctx.fillRect(pt.x + parallaxX, pt.y + parallaxY, pt.size, pt.size);
      }

      if (!reduced) frame = requestAnimationFrame(draw);
    };

    const move = (e: PointerEvent) => {
      pointer.targetX = e.clientX;
      pointer.targetY = e.clientY;
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame && !reduced) frame = requestAnimationFrame(draw);
      },
      { threshold: 0.01 }
    );

    const handleVisibility = () => {
      if (document.hidden) {
        visible = false;
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      } else {
        visible = true;
        if (!frame && !reduced) frame = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", handleVisibility);

    observer.observe(canvas);
    size();
    draw();
    addEventListener("resize", size);
    addEventListener("pointermove", move);

    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      cancelAnimationFrame(frame);
      removeEventListener("resize", size);
      removeEventListener("pointermove", move);
    };
  }, []);

  return <canvas className="particle-field" ref={ref} aria-hidden="true" />;
}
