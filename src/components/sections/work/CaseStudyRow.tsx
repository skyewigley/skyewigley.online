import { PillLink } from "@/components/ui/PillLink";
import type { CaseStudy, Tone } from "@/content/work";
import { CommunityHub } from "./visuals/CommunityHub";
import { PaymentToInvoice } from "./visuals/PaymentToInvoice";
import { StudentSupport } from "./visuals/StudentSupport";

function CaseStudyVisual({ visual }: { visual: CaseStudy["visual"] }) {
  switch (visual.kind) {
    case "student-support":
      return <StudentSupport visual={visual} />;
    case "payment-to-invoice":
      return <PaymentToInvoice visual={visual} />;
    case "community-hub":
      return <CommunityHub visual={visual} />;
  }
}

/** Sets --tone for the row; everything inside colours itself from it. */
const toneClass: Record<Tone, string> = {
  teal: "[--tone:var(--color-tone-teal)]",
  amber: "[--tone:var(--color-tone-amber)]",
  violet: "[--tone:var(--color-tone-violet)]",
};

/** Soft glow in the project's tone, sitting behind the visual's cards. */
const toneGlow =
  "bg-[radial-gradient(ellipse_at_65%_35%,color-mix(in_srgb,var(--tone)_13%,transparent),transparent_65%)]";

/** One project: compact copy on one side, a layered visual scene on the other. Alternates sides. */
export function CaseStudyRow({ study, flip }: { study: CaseStudy; flip: boolean }) {
  return (
    <article
      className={`${toneClass[study.tone]} relative grid grid-cols-1 items-center gap-[clamp(28px,4vw,64px)] ${
        flip
          ? "lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]"
          : "lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]"
      }`}
    >
      {/* Desktop: the visual's dot grid carries on behind the copy, fading out toward its far edge.
          Anchored to the same outer edge and vertical centre as the figure's grid so the dots line up. */}
      <div
        aria-hidden="true"
        className={`reveal dot-grid pointer-events-none absolute inset-0 hidden lg:block ${
          flip
            ? "[background-position:left_1px_center] [mask-image:linear-gradient(to_left,transparent_26%,black_42%)]"
            : "[background-position:right_1px_center] [mask-image:linear-gradient(to_right,transparent_26%,black_42%)]"
        }`}
      />

      <div className={`reveal relative ${flip ? "lg:order-2" : ""}`}>
        <p className="eyebrow">
          <span className="text-(--tone)">{study.name}</span> · {study.role}
        </p>
        <h3 className="mt-3.5 font-display text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-semibold tracking-[-0.03em]">
          {study.title}
        </h3>
        <p className="mt-4 text-muted">{study.summary}</p>

        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2.5" aria-label="Highlights">
          {study.highlights.map(({ icon: Icon, value, label }) => (
            <li key={label} className="flex items-center gap-2 text-[15px] text-muted">
              <Icon size={16} strokeWidth={1.8} className="shrink-0 text-(--tone)" />
              <span>
                {value && <span className="font-semibold text-fg">{value} </span>}
                {label}
              </span>
            </li>
          ))}
        </ul>

        <div className="mt-6 border-t border-raised pt-5">
          <p className="eyebrow text-[11px]">What I built</p>
          <ul className="mt-3 flex flex-wrap gap-2" aria-label="What I built">
            {study.built.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="inline-flex items-center gap-2 rounded-full bg-raised py-1.5 pr-3.5 pl-3 font-mono text-[11px] tracking-[0.08em] text-fg uppercase"
              >
                <Icon size={13} strokeWidth={2} className="text-(--tone)" />
                {label}
              </li>
            ))}
          </ul>
        </div>

        {study.caseStudyUrl && (
          <div className="mt-7">
            <PillLink href={study.caseStudyUrl} variant="secondary">
              Read the case study
            </PillLink>
          </div>
        )}
      </div>

      <figure
        className={`reveal dot-grid relative -mx-5 overflow-hidden border-y border-raised bg-surface px-5 pt-8 pb-14 sm:mx-0 sm:rounded-card sm:border sm:px-[clamp(24px,3.5vw,44px)] sm:pt-[clamp(24px,3.5vw,44px)] lg:overflow-visible lg:border-0 lg:bg-transparent lg:bg-none ${
          flip ? "lg:order-1" : ""
        }`}
      >
        {/* Soft glow in the project's tone behind the cards (mobile/tablet; desktop has it inside the fading panel) */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 lg:hidden ${toneGlow}`}
        />

        {/* Desktop: the panel itself fades out toward the copy, with a shadow that follows the fade.
            Its grid is anchored like the backdrop grid above so the dots line up through the fade. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden [filter:drop-shadow(0_20px_32px_rgb(0_0_0/0.35))] lg:block"
        >
          <div
            className={`dot-grid relative h-full overflow-hidden rounded-card bg-surface ${
              flip
                ? "[background-position:left_1px_center] [mask-image:linear-gradient(to_left,transparent,black_45%)]"
                : "[background-position:right_1px_center] [mask-image:linear-gradient(to_right,transparent,black_45%)]"
            }`}
          >
            <div className={`absolute inset-0 ${toneGlow}`} />
            {/* The border is higher-contrast than the fill, so it gets an extra fade on top of the panel's
                (the two masks multiply) — otherwise its lines stay visible after the fill has gone. */}
            <div
              className={`absolute inset-0 rounded-card border border-raised ${
                flip
                  ? "[mask-image:linear-gradient(to_left,transparent_10%,black_60%)]"
                  : "[mask-image:linear-gradient(to_right,transparent_10%,black_60%)]"
              }`}
            />
          </div>
        </div>

        <div aria-hidden="true" className="relative">
          <CaseStudyVisual visual={study.visual} />
        </div>
        <figcaption className="absolute bottom-4 left-5 font-mono text-[11px] text-muted sm:left-[clamp(24px,3.5vw,44px)]">
          {study.stack.join(" · ")}
        </figcaption>
      </figure>
    </article>
  );
}
