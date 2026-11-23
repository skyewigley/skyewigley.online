import type { ReactNode } from "react";

type TracedPanelProps = {
  children: ReactNode;
  /** Layout and entrance classes for the frame (margins, reveal/fade-up). */
  className?: string;
};

/**
 * A 1px frame with a teal glint travelling round it (.border-trace in globals.css): a large conic
 * gradient spins behind the panel and only shows through the frame. From sm up the frame is the
 * panel's border, so the child should drop its own border there and use
 * `relative sm:rounded-[calc(var(--radius-panel)-1px)] sm:border-0`. Phones show panels as
 * full-bleed bands (top and bottom borders only), so there's no frame or trace there.
 */
export function TracedPanel({ children, className = "" }: TracedPanelProps) {
  return (
    <div className={`relative sm:overflow-hidden sm:rounded-panel sm:bg-raised sm:p-px ${className}`}>
      <div
        aria-hidden="true"
        className="border-trace pointer-events-none absolute top-1/2 left-1/2 hidden aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 sm:block"
      />
      {children}
    </div>
  );
}
