"use client";

import { useEffect, useRef } from "react";

/** One particle per this many px² of hero, capped so huge screens stay light. */
const AREA_PER_PARTICLE = 16000;
const MAX_PARTICLES = 90;
/** Share of particles tinted with the accent colour; the rest are soft white. */
const ACCENT_SHARE = 0.25;

type Particle = {
  x: number;
  y: number;
  r: number;
  vx: number;
  vy: number;
  alpha: number;
  phase: number;
  accent: boolean;
};

function spawn(width: number, height: number): Particle {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    r: 0.6 + Math.random() * 1.1,
    vx: (Math.random() - 0.5) * 0.12,
    vy: -0.04 - Math.random() * 0.1,
    alpha: 0.15 + Math.random() * 0.35,
    phase: Math.random() * Math.PI * 2,
    accent: Math.random() < ACCENT_SHARE,
  };
}

/**
 * Faint dust drifting slowly upward behind the hero, drawn on a canvas.
 * Only animates while the hero is on screen. With reduced motion on, the
 * particles are drawn once and stay still.
 */
export function HeroParticles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;

    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const accent = getComputedStyle(canvas).getPropertyValue("--color-accent").trim() || "#00d6b4";
    let particles: Particle[] = [];
    let width = 0;
    let height = 0;
    let frame = 0;
    let visible = true;

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        const twinkle = 0.65 + 0.35 * Math.sin(time / 1400 + p.phase);
        ctx.globalAlpha = p.alpha * twinkle;
        ctx.fillStyle = p.accent ? accent : "#ffffff";
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    const tick = (time: number) => {
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        // Wrap around the edges so the field never thins out.
        if (p.y < -4) p.y = height + 4;
        if (p.x < -4) p.x = width + 4;
        if (p.x > width + 4) p.x = -4;
      }
      draw(time);
      frame = requestAnimationFrame(tick);
    };

    const start = () => {
      cancelAnimationFrame(frame);
      if (still) draw(0);
      else if (visible && !document.hidden) frame = requestAnimationFrame(tick);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(MAX_PARTICLES, Math.round((width * height) / AREA_PER_PARTICLE));
      particles = Array.from({ length: count }, () => spawn(width, height));
      start();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(canvas);

    const visibility = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) start();
      else cancelAnimationFrame(frame);
    });
    visibility.observe(canvas);

    const onTabChange = () => (document.hidden ? cancelAnimationFrame(frame) : start());
    document.addEventListener("visibilitychange", onTabChange);

    return () => {
      cancelAnimationFrame(frame);
      resizeObserver.disconnect();
      visibility.disconnect();
      document.removeEventListener("visibilitychange", onTabChange);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 size-full [mask-image:linear-gradient(to_bottom,black_45%,transparent_85%)]"
    />
  );
}
