import type { ReactNode } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  title: ReactNode;
  className?: string;
};

/** Small mono label above a large section title. */
export function SectionHeading({ eyebrow, title, className = "" }: SectionHeadingProps) {
  return (
    <div className={className}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="mt-4 font-display text-h2 font-semibold">{title}</h2>
    </div>
  );
}
