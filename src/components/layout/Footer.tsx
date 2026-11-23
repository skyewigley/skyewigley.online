import type { ReactNode } from "react";
import { siGithub, siYoutube } from "simple-icons";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Container";
import { LinkedInIcon } from "@/components/ui/icons";

/** `color` is a brand text-colour class, so each link reads as the platform it goes to. */
type FooterLink = { label: string; href: string; icon: ReactNode; color: string };

/** On mobile the socials collapse to icons (labels stay for screen readers) so the footer is one row. */
const linkClass =
  "eyebrow inline-flex min-h-11 min-w-11 items-center justify-center gap-2 transition duration-250 sm:min-w-0";

export function Footer() {
  const { linkedin, github, youtube } = siteConfig.socials;
  // Only links that are configured in the environment are shown.
  const links: FooterLink[] = [
    { label: "LinkedIn", href: linkedin, icon: <LinkedInIcon size={14} />, color: "text-brand-linkedin" },
    { label: "GitHub", href: github, icon: <BrandIcon icon={siGithub} size={14} />, color: "text-brand-github" },
    { label: "YouTube", href: youtube, icon: <BrandIcon icon={siYoutube} size={14} />, color: "text-brand-youtube" },
  ].filter((link) => link.href);

  return (
    <footer>
      <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 py-2 sm:pb-8">
        <p className="eyebrow">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex items-center gap-x-1 sm:gap-x-7">
          {links.map((link) => (
            <li key={link.label}>
              <a href={link.href} target="_blank" rel="noopener noreferrer" className={`${linkClass} ${link.color} hover:opacity-75`}>
                {link.icon}
                <span className="max-sm:sr-only">{link.label}</span>
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className={`${linkClass} hover:text-fg`}>
              <span className="max-sm:sr-only">Top</span> ↑
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
