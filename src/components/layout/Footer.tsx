import type { ReactNode } from "react";
import { siGithub, siYoutube } from "simple-icons";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Container";
import { LinkedInIcon } from "@/components/ui/icons";

type FooterLink = { label: string; href: string; icon: ReactNode };

/** On mobile the socials collapse to icons (labels stay for screen readers) so the footer is one row. */
const linkClass =
  "eyebrow inline-flex min-h-11 min-w-11 items-center justify-center gap-2 transition-colors duration-250 hover:text-fg sm:min-w-0";

export function Footer() {
  const { linkedin, github, youtube } = siteConfig.socials;
  // Only links that are configured in the environment are shown.
  const links: FooterLink[] = [
    { label: "LinkedIn", href: linkedin, icon: <LinkedInIcon size={14} /> },
    { label: "GitHub", href: github, icon: <BrandIcon icon={siGithub} size={14} /> },
    { label: "YouTube", href: youtube, icon: <BrandIcon icon={siYoutube} size={14} /> },
  ].filter((link) => link.href);

  return (
    <footer>
      <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pt-2 pb-8">
        <p className="eyebrow">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex items-center gap-x-1 sm:gap-x-7">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={linkClass}>
                {link.icon}
                <span className="max-sm:sr-only">{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className={linkClass}>
              <span className="max-sm:sr-only">Top</span> ↑
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
