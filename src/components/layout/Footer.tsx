import { siGithub, siYoutube, type SimpleIcon } from "simple-icons";
import { siteConfig } from "@/config/site";
import { BrandIcon } from "@/components/ui/BrandIcon";
import { Container } from "@/components/ui/Container";

type FooterLink = { label: string; href: string; icon?: SimpleIcon };

export function Footer() {
  const { linkedin, github, youtube } = siteConfig.socials;
  // Only links that are configured in the environment are shown.
  const links: FooterLink[] = [
    { label: "LinkedIn", href: linkedin },
    { label: "GitHub", href: github, icon: siGithub },
    { label: "YouTube", href: youtube, icon: siYoutube },
  ].filter((link) => link.href);

  return (
    <footer>
      <Container className="flex flex-wrap items-center justify-between gap-x-10 gap-y-4 pt-2 pb-8">
        <p className="eyebrow">
          © {new Date().getFullYear()} {siteConfig.name}
        </p>
        <ul className="flex flex-wrap gap-x-7 gap-y-3">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="eyebrow inline-flex min-h-11 items-center gap-2 transition-colors duration-250 hover:text-fg"
              >
                {link.icon && <BrandIcon icon={link.icon} size={14} />}
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a href="#top" className="eyebrow inline-flex min-h-11 items-center transition-colors duration-250 hover:text-fg">
              Top ↑
            </a>
          </li>
        </ul>
      </Container>
    </footer>
  );
}
