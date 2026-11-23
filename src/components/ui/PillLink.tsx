import Link from "next/link";
import type { ReactNode } from "react";

type PillLinkProps = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  className?: string;
};

const base =
  "inline-flex min-h-11 items-center justify-center gap-2.5 rounded-full px-[22px] font-mono text-label font-medium uppercase transition duration-250 hover:-translate-y-0.5";

const variants = {
  primary:
    "bg-accent text-ink hover:shadow-[0_12px_30px_-10px_color-mix(in_srgb,var(--color-accent)_70%,transparent)]",
  secondary: "bg-raised text-fg hover:bg-edge",
};

/** Rounded call-to-action link. Other pages on the site use client-side navigation; external links open in a new tab. */
export function PillLink({ href, children, variant = "primary", className = "" }: PillLinkProps) {
  const classes = `${base} ${variants[variant]} ${className}`;
  if (href.startsWith("/")) {
    return (
      <Link href={href} className={classes}>
        {children}
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
      {children}
    </a>
  );
}
