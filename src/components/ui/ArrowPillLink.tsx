import { ArrowRight, type LucideIcon } from "lucide-react";
import Link from "next/link";
import type { ButtonHTMLAttributes, ReactNode } from "react";

type PillStyle = {
  children: ReactNode;
  /** `solid` is the main call to action (accent fill); `outline` sits beside it. */
  variant?: "solid" | "outline";
  size?: "md" | "sm";
  /** Icon in the round button; slides out and back in on hover. */
  icon?: LucideIcon;
  className?: string;
};

type ArrowPillLinkProps = PillStyle & { href: string };

const variants = {
  solid: {
    pill: "bg-accent text-ink hover:shadow-[0_14px_34px_-12px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]",
    sheen: "via-white/35",
    bubble: "bg-ink text-accent",
  },
  outline: {
    pill: "border border-raised bg-surface text-fg hover:border-accent/60 hover:shadow-[0_14px_34px_-14px_color-mix(in_srgb,var(--color-accent)_55%,transparent)]",
    sheen: "via-accent/15",
    bubble: "bg-accent text-ink",
  },
};

const sizes = {
  md: { pill: "min-h-12 gap-3 pl-5", bubble: "size-9", icon: 16 },
  sm: { pill: "min-h-10 gap-2.5 pl-4", bubble: "size-7", icon: 14 },
};

function pillParts({
  children,
  variant = "outline",
  size = "md",
  icon: Icon = ArrowRight,
  className = "",
}: PillStyle) {
  const v = variants[variant];
  const s = sizes[size];
  const classes = `group relative inline-flex items-center overflow-hidden rounded-full py-1.5 pr-1.5 transition duration-300 hover:-translate-y-0.5 disabled:pointer-events-none disabled:opacity-60 ${s.pill} ${v.pill} ${className}`;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-y-0 -left-1/2 w-1/2 -skew-x-12 bg-gradient-to-r from-transparent ${v.sheen} to-transparent transition-transform duration-700 ease-out group-hover:translate-x-[300%]`}
      />
      <span className="relative font-mono text-label font-medium whitespace-nowrap uppercase">
        {children}
      </span>
      <span
        aria-hidden="true"
        className={`relative grid shrink-0 place-items-center overflow-hidden rounded-full ${s.bubble} ${v.bubble}`}
      >
        <Icon
          size={s.icon}
          strokeWidth={2.25}
          className="transition-transform duration-300 ease-out group-hover:translate-x-7"
        />
        <Icon
          size={s.icon}
          strokeWidth={2.25}
          className="absolute -translate-x-7 transition-transform duration-300 ease-out group-hover:translate-x-0"
        />
      </span>
    </>
  );
  return { classes, content };
}

/**
 * Pill link with a round icon button. On hover it lifts, a sheen sweeps across and the icon
 * slides out and back in. Site pages use client-side navigation; external links open in a new tab.
 */
export function ArrowPillLink({ href, ...style }: ArrowPillLinkProps) {
  const { classes, content } = pillParts(style);

  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const external = /^https?:\/\//.test(href);
  return (
    <a
      href={href}
      className={classes}
      {...(external && { target: "_blank", rel: "noopener noreferrer" })}
    >
      {content}
    </a>
  );
}

/** The same pill as a button, e.g. a form's submit. */
export function ArrowPillButton({
  children,
  variant,
  size,
  icon,
  className,
  ...button
}: PillStyle & Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children" | "className">) {
  const { classes, content } = pillParts({ children, variant, size, icon, className });
  return (
    <button {...button} className={`cursor-pointer ${classes}`}>
      {content}
    </button>
  );
}
