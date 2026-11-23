import Link from "next/link";
import { siteConfig } from "@/config/site";
import { ArrowPillLink } from "@/components/ui/ArrowPillLink";
import { navLinks } from "@/content/navigation";

export function Navbar() {
  return (
    <nav
      aria-label="Main"
      className="-mx-5 flex items-center border-b border-raised px-5 py-3 sm:mx-0 sm:mt-5 sm:rounded-full sm:border-0 sm:bg-surface sm:py-2 sm:pr-2 sm:pl-5"
    >
      <div className="min-w-0 flex-1">
        <Link
          href="/#top"
          className="inline-flex max-w-full items-center gap-2.5 font-display text-[17px] font-semibold tracking-[-0.02em] text-fg"
        >
          <span
            aria-hidden="true"
            className="grid size-[30px] shrink-0 place-items-center rounded-[9px] bg-accent text-xs font-bold text-ink"
          >
            {siteConfig.initials}
          </span>
          <span className="truncate">{siteConfig.name}</span>
        </Link>
      </div>

      <ul className="hidden items-center gap-9 md:flex">
        {navLinks.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="eyebrow transition-colors duration-250 hover:text-fg">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex flex-1 shrink-0 justify-end pl-3">
        <ArrowPillLink href="/contact" variant="solid" size="sm">
          Get in touch
        </ArrowPillLink>
      </div>
    </nav>
  );
}
