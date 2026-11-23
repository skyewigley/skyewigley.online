import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ArrowPillLink } from "@/components/ui/ArrowPillLink";
import { Container } from "@/components/ui/Container";
import { contactCta } from "@/content/contact";

export function Contact() {
  return (
    <section id="contact" className="pb-section">
      <Container>
        <div className="reveal dot-grid -mx-5 border-y border-raised bg-surface px-5 py-[clamp(56px,8vw,120px)] text-center sm:mx-0 sm:rounded-panel sm:border sm:px-[clamp(20px,4vw,56px)]">
          <h2 className="font-display text-cta font-semibold">
            {contactCta.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          <p className="mx-auto mt-6 max-w-[440px] text-muted">{contactCta.text}</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <ArrowPillLink href="/contact" variant="solid">
              {contactCta.primaryLabel}
            </ArrowPillLink>
            {siteConfig.bookingUrl && (
              <ArrowPillLink href={siteConfig.bookingUrl} icon={CalendarDays}>
                {contactCta.bookingLabel}
              </ArrowPillLink>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
}
