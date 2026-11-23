import { Footer } from "@/components/layout/Footer";
import { About } from "@/components/sections/About";
import { Contact } from "@/components/sections/Contact";
import { Hero } from "@/components/sections/hero/Hero";
import { Services } from "@/components/sections/Services";
import { Videos } from "@/components/sections/Videos";
import { Work } from "@/components/sections/work/Work";
import { siteConfig } from "@/config/site";

// Structured data so search engines understand who the page is about.
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: siteConfig.name,
  jobTitle: siteConfig.role,
  url: siteConfig.url,
  sameAs: Object.values(siteConfig.socials).filter(Boolean),
};

export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd).replace(/</g, "\\u003c") }}
      />
      {/* overflow-x-clip (not hidden) so scroll-driven reveal animations keep working */}
      <main id="top" className="overflow-x-clip">
        <Hero />
        <Work />
        <About />
        <Services />
        <Videos />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
