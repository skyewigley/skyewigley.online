"use client";

import { useRef, type ReactNode } from "react";
import { HeroParticles } from "./HeroParticles";

/**
 * Wraps the hero: a fine grain texture, drifting particles, and a soft accent
 * glow that follows the cursor. The glow updates CSS variables directly, so
 * moving the mouse never re-renders React.
 */
export function HeroSpotlight({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${((event.clientX - rect.left) / rect.width) * 100}%`);
    el.style.setProperty("--spot-y", `${((event.clientY - rect.top) / rect.height) * 100}%`);
  }

  return (
    <section ref={ref} onMouseMove={handleMove} className="relative overflow-hidden">
      <div
        aria-hidden="true"
        className="grain pointer-events-none absolute inset-0 opacity-[0.05] [mask-image:linear-gradient(to_bottom,black_60%,transparent)]"
      />
      <HeroParticles />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_55%,transparent)] bg-[radial-gradient(640px_circle_at_var(--spot-x,50%)_var(--spot-y,20%),color-mix(in_srgb,var(--color-accent)_11%,transparent),transparent_65%)]"
      />
      {children}
    </section>
  );
}
