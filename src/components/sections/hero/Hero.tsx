import { Navbar } from "@/components/layout/Navbar";
import { Container } from "@/components/ui/Container";
import { PillLink } from "@/components/ui/PillLink";
import { hero } from "@/content/hero";
import { HeroSpotlight } from "./HeroSpotlight";
import { LocalClock } from "./LocalClock";
import { WorkflowDiagram } from "./WorkflowDiagram";

export function Hero() {
  return (
    <HeroSpotlight>
      <Container className="relative pb-section">
        <Navbar />

        <div className="pt-[clamp(40px,8vw,112px)] pb-[clamp(40px,5vw,72px)] text-center">
          <p className="eyebrow inline-flex animate-fade-up flex-wrap items-center justify-center gap-x-3.5 gap-y-2 delay-step-1">
            <span aria-hidden="true" className="size-2 animate-pulse-ring rounded-full bg-accent" />
            <span className="hidden sm:inline">{hero.availability}</span>
            <span className="sm:hidden">{hero.availabilityShort}</span>
            <span aria-hidden="true" className="text-edge">
              ·
            </span>
            <span>
              {hero.location.city} <LocalClock timeZone={hero.location.timeZone} />
            </span>
          </p>

          {/* Phones: one balanced block at a smaller size instead of two forced lines that each wrap. */}
          <h1 className="mt-5 animate-fade-up font-display text-display font-semibold text-balance delay-step-2 max-sm:text-[clamp(32px,9vw,38px)] sm:mt-6">
            {hero.headline.map((line) => (
              <span key={line} className="sm:block">
                {line}{" "}
              </span>
            ))}
          </h1>

          <p className="mx-auto mt-5 max-w-[620px] animate-fade-up text-lead text-pretty text-muted delay-step-3 sm:mt-6">
            {hero.intro}
          </p>

          <div className="mt-8 flex animate-fade-up flex-wrap justify-center gap-3 delay-step-4">
            <PillLink href="#work">See the work</PillLink>
          </div>
        </div>

        <WorkflowDiagram />
      </Container>
    </HeroSpotlight>
  );
}
