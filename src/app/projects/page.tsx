import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { Contact } from "@/components/sections/Contact";
import { ProjectGrid } from "@/components/sections/projects/ProjectGrid";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shareImage } from "@/config/share-image";
import { siteConfig } from "@/config/site";
import { projectsHeading } from "@/content/projects";

const title = `Projects | ${siteConfig.name}`;
const description =
  "AI agents, n8n automations, web apps and self-hosted tools I've worked on this year: client work, my own products and open source.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/projects" },
  openGraph: { type: "website", url: "/projects", title, description, siteName: siteConfig.name, images: [shareImage] },
  twitter: { card: "summary_large_image", title, description, images: [shareImage] },
};

export default function ProjectsPage() {
  return (
    <>
      <Container>
        <Navbar />
      </Container>

      {/* overflow-x-clip (not hidden) so scroll-driven reveal animations keep working */}
      <main id="top" className="overflow-x-clip">
        <section id="projects" className="pt-[clamp(56px,8vw,112px)]">
          <Container>
            <div className="reveal">
              <SectionHeading
                eyebrow={projectsHeading.eyebrow}
                title={projectsHeading.title}
                className="max-w-[820px]"
              />
              <p className="mt-5 max-w-[60ch] text-lead text-muted">{projectsHeading.intro}</p>
            </div>

            <div className="mt-[clamp(40px,5vw,64px)]">
              <ProjectGrid />
            </div>
          </Container>
        </section>

        <Contact />
      </main>
      <Footer />
    </>
  );
}
