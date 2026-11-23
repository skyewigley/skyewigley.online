import type { SimpleIcon } from "simple-icons";

type BrandIconProps = { icon: SimpleIcon; size?: number; className?: string };

/** A brand logo from simple-icons, drawn in currentColor so it takes the site's tones. */
export function BrandIcon({ icon, size = 18, className = "" }: BrandIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d={icon.path} />
    </svg>
  );
}
