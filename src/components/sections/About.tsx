import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { CountUp } from "@/components/ui/CountUp";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { about, facts, projectStrip, stats } from "@/content/about";
import { GrainSection } from "@/components/ui/GrainSection";
import { ProjectStrip } from "./projects/ProjectStrip";

export function About() {
  return (
    <GrainSection id="about">
      <Container>
        <div className="grid grid-cols-1 items-center gap-[clamp(32px,6vw,88px)] lg:grid-cols-[5fr_7fr]">
          <div className="reveal -mx-5 grid aspect-[4/5] place-items-center overflow-hidden border-y border-raised bg-ink sm:mx-0 sm:rounded-panel sm:border">
            {about.portrait ? (
              // Static export: images are served as-is, so a plain <img> is simplest.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={about.portrait}
                alt={`Portrait of ${siteConfig.name}`}
                loading="lazy"
                className="size-full object-cover"
              />
            ) : (
              <span className="eyebrow">[Your portrait photo]</span>
            )}
          </div>

          <div className="min-w-0">
            <SectionHeading
              eyebrow={about.eyebrow}
              title={about.title.replace("{firstName}", siteConfig.name.split(" ")[0]!)}
              className="reveal"
            />
            <div className="mt-6 max-w-[600px] space-y-4 text-[15px] leading-relaxed text-muted sm:text-base">
              {about.body.map((paragraph) => (
                <p key={paragraph.slice(0, 24)}>{paragraph}</p>
              ))}
            </div>

            <dl className="mt-8">
              {facts.map(({ icon: Icon, label, value }) => (
                <div
                  key={label}
                  className="flex justify-between gap-5 border-b border-raised py-2.5"
                >
                  <dt className="eyebrow flex items-center gap-2.5 pt-[3px]">
                    <Icon size={15} strokeWidth={1.8} className="text-accent" aria-hidden="true" />
                    {label}
                  </dt>
                  <dd className="text-right font-medium">{value}</dd>
                </div>
              ))}
            </dl>

            {/* Equal columns, so different-width numbers still read as one even row. */}
            <dl className="mt-6 grid grid-cols-3">
              {stats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div
                    key={stat.label}
                    className="flex flex-col-reverse justify-end px-4 py-3.5 first:pl-0 last:pr-0 sm:px-6"
                  >
                    <dt className="mt-1.5 text-[13px] leading-snug text-muted sm:text-[14px]">
                      {stat.label}
                    </dt>
                    <dd className="flex items-center gap-2 font-display text-[22px] leading-none font-semibold sm:gap-2.5 sm:text-[30px]">
                      <Icon
                        size={18}
                        strokeWidth={1.8}
                        className="size-4 shrink-0 text-accent sm:size-[18px]"
                        aria-hidden="true"
                      />
                      {stat.value !== undefined ? (
                        <CountUp value={stat.value} prefix={stat.prefix} suffix={stat.suffix} />
                      ) : (
                        stat.text
                      )}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>
        </div>

        <div className="reveal mt-[clamp(40px,5vw,64px)]">
          <ProjectStrip title={projectStrip.title} linkLabel={projectStrip.linkLabel} />
        </div>
      </Container>
    </GrainSection>
  );
}
