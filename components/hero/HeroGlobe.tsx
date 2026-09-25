"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { createGlobe } from "./GlobeScene";

export function HeroGlobe() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = mount.current;
    if (!el) return;
    const startup = performance.now();
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 20);
    camera.position.z = 4.8;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
    el.appendChild(renderer.domElement);

    const { group: globeGroup, update: updateGlobe } = createGlobe();
    
    // Initial angle highlighting Latin America -> US signature route
    globeGroup.rotation.set(0.18, -0.42, 0);
    scene.add(globeGroup);

    // Subtle atmospheric ambient & key lights
    scene.add(new THREE.HemisphereLight(0x99e6ff, 0x010306, .65));
    const keyLight = new THREE.DirectionalLight(0x81cbff, 2.8);
    keyLight.position.set(-2.5, 2.2, 3.2);
    scene.add(keyLight);

    const clock = new THREE.Clock();
    let frame = 0,
      visible = true,
      dragging = false,
      lastX = 0,
      lastY = 0,
      targetX = 0.18,
      targetY = -0.42,
      velocityX = 0,
      velocityY = 0;
    const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      const w = el.clientWidth,
        h = el.clientHeight;
      if (w > 0 && h > 0) {
        renderer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
      }
    };

    const down = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      velocityX = 0;
      velocityY = 0;
      el.setPointerCapture(e.pointerId);
    };

    const move = (e: PointerEvent) => {
      if (!dragging) return;
      velocityY = (e.clientX - lastX) * 0.007;
      velocityX = (e.clientY - lastY) * 0.005;
      targetY += velocityY;
      targetX = THREE.MathUtils.clamp(targetX + velocityX, -0.95, 0.95);
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const up = (e: PointerEvent) => {
      dragging = false;
      if (el.hasPointerCapture(e.pointerId)) el.releasePointerCapture(e.pointerId);
    };

    const animate = () => {
      if (!visible) {
        frame = 0;
        return;
      }
      const elapsedTime = clock.getElapsedTime();

      if (!dragging && !reduced) {
        // Ultra-slow continuous rotation
        targetY += 0.00095 + velocityY;
        targetX = THREE.MathUtils.clamp(targetX + velocityX, -0.95, 0.95);
        velocityX *= 0.94;
        velocityY *= 0.94;
      }

      globeGroup.rotation.x += (targetX - globeGroup.rotation.x) * 0.065;
      globeGroup.rotation.y += (targetY - globeGroup.rotation.y) * 0.065;

      updateGlobe(reduced ? 0 : elapsedTime);

      renderer.render(scene, camera);
      if (!el.dataset.ready) {
        el.dataset.ready = "true";
        el.dataset.initMs = String(Math.round(performance.now() - startup));
      }
      frame = requestAnimationFrame(animate);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        if (visible && !frame) animate();
      },
      { threshold: 0.01 }
    );
    const handleVisibilityChange = () => {
      if (document.hidden) {
        visible = false;
        if (frame) {
          cancelAnimationFrame(frame);
          frame = 0;
        }
      } else {
        visible = true;
        if (!frame) animate();
      }
    };
    document.addEventListener("visibilitychange", handleVisibilityChange);

    const ro = new ResizeObserver(resize);
    ro.observe(el);
    resize();
    observer.observe(el);
    addEventListener("resize", resize);
    el.addEventListener("pointerdown", down);
    el.addEventListener("pointermove", move);
    el.addEventListener("pointerup", up);
    el.addEventListener("pointercancel", up);
    animate();
    return () => {
      ro.disconnect();
      observer.disconnect();
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      cancelAnimationFrame(frame);
      removeEventListener("resize", resize);
      el.removeEventListener("pointerdown", down);
      el.removeEventListener("pointermove", move);
      el.removeEventListener("pointerup", up);
      el.removeEventListener("pointercancel", up);
      globeGroup.traverse(object => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line) object.geometry.dispose();
        if (object instanceof THREE.Mesh || object instanceof THREE.Points || object instanceof THREE.Line || object instanceof THREE.Sprite) {
          const materials = Array.isArray(object.material) ? object.material : [object.material];
          materials.forEach(material => material.dispose());
        }
      });
      renderer.dispose();
      el.removeChild(renderer.domElement);
    };
  }, []);
  return <div className="globe" ref={mount} role="application" aria-label="Interactive globe. Drag to rotate." />;
}
