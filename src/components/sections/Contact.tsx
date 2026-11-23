import { CalendarDays } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ArrowPillLink } from "@/components/ui/ArrowPillLink";
import { Container } from "@/components/ui/Container";
import { TracedPanel } from "@/components/ui/TracedPanel";
import { contactCta } from "@/content/contact";

export function Contact() {
  return (
    <section id="contact" className="relative isolate overflow-hidden sm:py-section">
      {/* Faint contour lines panning slowly behind the panel. They start right under About's bottom
          border and fade out only toward the footer, so the padding around the panel keeps them.
          Phones: the panel is a full-bleed band butted straight against About (whose bottom border
          it shares) and the footer, so there's no padding band of contour above or below it. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 [mask-image:linear-gradient(to_bottom,black_80%,transparent)]"
      >
        <div className="contour contour-drift absolute top-[-640px] left-[-640px] right-0 bottom-0 opacity-[0.06]" />
      </div>
      <Container>
        <TracedPanel className="reveal -mx-5 sm:mx-0">
          <div className="dot-grid relative border-b border-raised bg-surface px-5 py-[clamp(56px,8vw,120px)] text-center sm:rounded-[calc(var(--radius-panel)-1px)] sm:border-0 sm:px-[clamp(20px,4vw,56px)]">
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
        </TracedPanel>
      </Container>
    </section>
  );
}
