import type { ReactNode } from "react";

/** A floating card inside a work visual: dark, bordered, with a deep soft shadow for layering. */
export function SceneCard({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={`rounded-2xl border border-edge/70 bg-ink shadow-[0_28px_60px_-24px_rgb(0_0_0/0.9)] ${className}`}
    >
      {children}
    </div>
  );
}
