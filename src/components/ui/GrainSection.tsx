"use client";

import { useRef, type ReactNode } from "react";

/** How far the light layer shifts against the cursor, as a fraction of the cursor's offset. */
const PARALLAX = 0.04;

type GrainSectionProps = {
  id?: string;
  /** `div` when it wraps a whole page (navbar and footer included) rather than one section. */
  as?: "section" | "div";
  children: ReactNode;
  /** Padding and borders; defaults to the About band. */
  className?: string;
};

/**
 * A deep section (or whole page) with fine film grain over two soft, slowly drifting pools of light (teal and
 * violet). Used by About and /contact. Unlike the hero's cursor spotlight, the light never follows
 * the pointer: the whole layer shifts a little the opposite way (parallax) and eases there (see
 * .about-light in globals.css). The shift is set directly on the element, so moving the mouse
 * never re-renders React.
 */
export function GrainSection({
  id,
  as: Tag = "section",
  children,
  // Phones: About opens straight on its full-bleed portrait (which has its own top border).
  className = "border-y border-raised py-[clamp(56px,7vw,96px)] max-sm:border-t-0 max-sm:pt-0",
}: GrainSectionProps) {
  const sectionRef = useRef<HTMLElement & HTMLDivElement>(null);
  const lightRef = useRef<HTMLDivElement>(null);

  function handleMove(event: React.MouseEvent<HTMLElement>) {
    const section = sectionRef.current;
    const light = lightRef.current;
    if (!section || !light) return;
    const rect = section.getBoundingClientRect();
    const dx = event.clientX - rect.left - rect.width / 2;
    const dy = event.clientY - rect.top - rect.height / 2;
    light.style.translate = `${-dx * PARALLAX}px ${-dy * PARALLAX}px`;
  }

  function handleLeave() {
    if (lightRef.current) lightRef.current.style.translate = "0px 0px";
  }

  return (
    <Tag
      ref={sectionRef}
      id={id}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`relative isolate overflow-hidden bg-deep ${className}`}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div ref={lightRef} className="about-light absolute -inset-16">
          <div className="about-drift absolute top-[-10%] right-[-5%] h-[70%] w-[55%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent)_8%,transparent),transparent)]" />
          <div className="about-drift-alt absolute bottom-[-15%] left-[-10%] h-[65%] w-[50%] rounded-full bg-[radial-gradient(closest-side,color-mix(in_srgb,var(--color-tone-violet)_6%,transparent),transparent)]" />
        </div>
        <div className="grain absolute inset-0 opacity-[0.12]" />
      </div>
      {children}
    </Tag>
  );
}
