import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { caseStudies, workHeading } from "@/content/work";
import { AllProjectsLink } from "./AllProjectsLink";
import { CaseStudyRow } from "./CaseStudyRow";

export function Work() {
  return (
    <section id="work" className="pb-section max-sm:pb-0">
      <Container>
        <div className="reveal flex flex-col gap-7 md:flex-row md:items-end md:justify-between">
          <div>
            <SectionHeading eyebrow={workHeading.eyebrow} title={workHeading.title} />
            <p className="mt-5 max-w-[56ch] text-lead text-muted">{workHeading.intro}</p>
          </div>
          <AllProjectsLink className="shrink-0 self-start md:self-end" />
        </div>

        {/* Mobile: a full-bleed rule separates the intro from the first project, and the last visual
            is full-bleed and sits flush on Services. */}
        <div className="mt-[clamp(48px,6vw,80px)] flex flex-col gap-[clamp(56px,7vw,92px)] max-sm:-mx-5 max-sm:mt-10 max-sm:border-t max-sm:border-raised max-sm:px-5 max-sm:pt-10">
          {caseStudies.map((study, index) => (
            <CaseStudyRow key={study.name} study={study} flip={index % 2 === 1} />
          ))}
        </div>
      </Container>
    </section>
  );
}
