"use client";

import { useEffect, useRef } from "react";

const DURATION_MS = 1600;
const START_DELAY_MS = 150;

const format = (n: number, prefix: string, suffix: string) =>
  `${prefix}${n.toLocaleString("en-US")}${suffix}`;

/**
 * Counts from 0 up to `value` once, when it first scrolls into view (ease-out cubic).
 * The final number is in the server-rendered HTML, so crawlers and
 * reduced-motion users always see the real value. The animation writes
 * straight to the DOM, so it never re-renders React.
 */
export function CountUp({
  value,
  prefix = "",
  suffix = "",
}: {
  value: number;
  prefix?: string;
  suffix?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let frame = 0;
    let timeout: ReturnType<typeof setTimeout> | undefined;
    el.textContent = format(0, prefix, suffix);

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        timeout = setTimeout(() => {
          const start = performance.now();
          const tick = (now: number) => {
            const progress = Math.min(1, (now - start) / DURATION_MS);
            el.textContent = format(Math.round(value * (1 - Math.pow(1 - progress, 3))), prefix, suffix);
            if (progress < 1) frame = requestAnimationFrame(tick);
          };
          frame = requestAnimationFrame(tick);
        }, START_DELAY_MS);
      },
      { threshold: 0.6 },
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timeout);
      cancelAnimationFrame(frame);
      el.textContent = format(value, prefix, suffix);
    };
  }, [value, prefix, suffix]);

  return <span ref={ref}>{format(value, prefix, suffix)}</span>;
}
