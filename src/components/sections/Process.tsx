import type { CSSProperties } from "react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { processHeading, processSteps } from "@/content/process";
import { PlayInView } from "./process/PlayInView";
import { delay, ProcessScene } from "./process/ProcessScene";

/** Seconds each step holds the spotlight; one loop is every step in turn. */
const stepSeconds = 3.5;

/**
 * How an engagement runs. Four steps on a track: the spotlight moves along it one step at a time,
 * each node lights, its scene builds and the track fills on to the next. Below lg there's no track:
 * the cards stack full width and the spotlit one gets a glint travelling round its border instead.
 */
export function Process() {
  return (
    <section id="process" className="pb-section">
      <Container>
        <div className="reveal grid grid-cols-1 items-end gap-x-[clamp(32px,5vw,72px)] gap-y-5 lg:grid-cols-2">
          <SectionHeading eyebrow={processHeading.eyebrow} title={processHeading.title} />
          <p className="max-w-[440px] text-muted lg:justify-self-end">{processHeading.intro}</p>
        </div>

        <PlayInView
          className="mt-14"
          style={{ "--cycle": `${stepSeconds * processSteps.length}s` } as CSSProperties}
        >
          <ol className="grid grid-cols-1 gap-y-10 lg:grid-cols-4 lg:gap-x-8">
            {processSteps.map((step, index) => {
              const start = index * stepSeconds;
              const isLast = index === processSteps.length - 1;
              return (
                <li
                  key={step.title}
                  className="reveal relative"
                >
                  {/* Node on the track */}
                  <span
                    style={delay(start)}
                    className="process-anim process-node relative z-10 hidden size-10 place-items-center rounded-full border border-edge bg-ink font-mono text-[12px] text-muted lg:grid"
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>

                  {/* Track to the next node (desktop only). Fills during this step. */}
                  {!isLast && (
                    <span
                      aria-hidden="true"
                      className="absolute top-5 -right-6 left-14 hidden h-px bg-raised lg:block"
                    >
                      <span
                        style={delay(start)}
                        className="process-anim process-fill absolute inset-0 origin-left bg-accent [--fill-0:0_1]"
                      />
                    </span>
                  )}

                  <div className="lg:mt-6">
                    <ProcessScene scene={step.scene} start={start} />
                    <h3 className="mt-5 font-display text-[20px] leading-tight font-semibold tracking-[-0.02em]">
                      {step.title}
                    </h3>
                    <p className="mt-2 text-[15px] text-muted">{step.text}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </PlayInView>
      </Container>
    </section>
  );
}
