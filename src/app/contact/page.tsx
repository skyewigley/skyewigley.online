import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { ContactOptions } from "@/components/sections/contact/ContactOptions";
import { Container } from "@/components/ui/Container";
import { GrainSection } from "@/components/ui/GrainSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { shareImage } from "@/config/share-image";
import { siteConfig } from "@/config/site";
import { contactHeading } from "@/content/contact";

const title = `Contact | ${siteConfig.name}`;
const description =
  "Send a message, book a call or find me on WhatsApp, Discord, Upwork and GitHub. Automations, AI agents and web apps, built and run properly.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/contact" },
  openGraph: { type: "website", url: "/contact", title, description, siteName: siteConfig.name, images: [shareImage] },
  twitter: { card: "summary_large_image", title, description, images: [shareImage] },
};

export default function ContactPage() {
  return (
    // The grain covers the whole page, navbar and footer included, so there are no bands.
    <GrainSection as="div" className="flex min-h-svh flex-col">
      <Container>
        <Navbar />
      </Container>

      {/* overflow-x-clip (not hidden) so scroll-driven reveal animations keep working */}
      <main id="top" className="flex-1 overflow-x-clip">
        <section id="contact" className="pt-[clamp(56px,8vw,112px)] pb-section">
          <Container>
            <div className="mx-auto max-w-[880px]">
              <div className="animate-fade-up">
                <SectionHeading eyebrow={contactHeading.eyebrow} title={contactHeading.title} />
                <p className="mt-5 max-w-[60ch] text-lead text-muted">{contactHeading.intro}</p>
              </div>

              <div className="mt-[clamp(32px,4vw,48px)]">
                <ContactOptions />
              </div>
            </div>
          </Container>
        </section>
      </main>
      <Footer />
    </GrainSection>
  );
}
