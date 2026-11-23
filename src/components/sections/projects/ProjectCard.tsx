import { ArrowUpRight, Lock, Star, TrendingUp } from "lucide-react";
import { projectId, type Project, type ProjectCategory } from "@/content/projects";

/** Unpublished reviews still show in local dev, so the layout can be checked. */
const showUnpublishedReviews = process.env.NODE_ENV === "development";

/** Sets --tone for the card from its category; everything inside colours itself from it. */
export const toneClass: Record<ProjectCategory, string> = {
  ai: "[--tone:var(--color-tone-teal)]",
  automation: "[--tone:var(--color-tone-amber)]",
  web: "[--tone:var(--color-tone-violet)]",
  tools: "[--tone:var(--color-tone-sky)]",
  hosting: "[--tone:var(--color-tone-rose)]",
};

/** One gentle ease-in-out curve for every part of the hover, so it all moves as one. */
const ease = "ease-[cubic-bezier(0.45,0,0.25,1)]";

/**
 * A card is "open" on hover (pointer devices), on focus (keyboard, and tap on touch screens), or
 * when it's the card linked to from the About row (`data-open`, see ProjectGrid). `card-hover`
 * (globals.css) is hover that switches off while another card is held open.
 *
 * Both layers react to that open state.
 * Opacity only, no movement or blur, so the text never jumps. The outgoing layer fades quickly;
 * the incoming one waits until the slide is under way, then fades in slowly. Same in reverse.
 */
const layerTransition = `transition-opacity ${ease}`;
const showOnHover =
  "opacity-0 duration-200 delay-0 card-hover:opacity-100 card-hover:duration-500 card-hover:delay-200 group-focus-within:opacity-100 group-focus-within:duration-500 group-focus-within:delay-200 group-data-open:opacity-100 group-data-open:duration-500 group-data-open:delay-200";
const hideOnHover =
  "duration-500 delay-200 card-hover:opacity-0 card-hover:duration-200 card-hover:delay-0 group-focus-within:opacity-0 group-focus-within:duration-200 group-focus-within:delay-0 group-data-open:opacity-0 group-data-open:duration-200 group-data-open:delay-0";

/**
 * On hover the whole card body slides up by the header's height (44px icon + 20px gap = 64px), so
 * the icon row scrolls out of the top and the details get that space at the bottom. The details
 * layer gets a matching negative bottom margin, so it can use the extra room without making the
 * card taller. Both values must stay equal.
 */
const slideUpOnHover =
  "card-hover:-translate-y-16 group-focus-within:-translate-y-16 group-data-open:-translate-y-16";
const fadeOutOnHover =
  "card-hover:opacity-0 group-focus-within:opacity-0 group-data-open:opacity-0";

/**
 * One project. The face shows the icon, name and a one-line summary; hovering or focusing the
 * card swaps in the details, result and link. Details stay in the DOM so they're always readable
 * by search engines and screen readers.
 */
export function ProjectCard({
  project,
  open = false,
  muted = false,
}: {
  project: Project;
  /** Held open as if hovered (the card linked to from the About row). */
  open?: boolean;
  /** Another card is held open, so hover is ignored here until the pointer moves. */
  muted?: boolean;
}) {
  const { icon: Icon, link } = project;
  const review =
    project.review && (project.review.published || showUnpublishedReviews)
      ? project.review
      : null;
  // With a review, "Confidential" is dropped: the review already shows it was client work.
  const shownLink = review && link === "private" ? undefined : link;

  return (
    <li
      id={projectId(project)}
      tabIndex={0}
      data-open={open || undefined}
      data-muted={muted || undefined}
      className={`${toneClass[project.category]} group relative isolate scroll-mt-24 flex flex-col overflow-hidden rounded-card border border-raised bg-surface p-6 transition-colors duration-300 card-hover-self:border-(--tone) focus-within:border-(--tone) data-open:border-(--tone)`}
    >
      {/* Soft glow in the tone, brighter on hover */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_srgb,var(--tone)_10%,transparent),transparent_60%)] opacity-60 transition-opacity duration-[650ms] card-hover:opacity-100 group-focus-within:opacity-100 group-data-open:opacity-100"
      />

      <div
        className={`flex flex-1 flex-col transition-transform duration-[650ms] ${ease} ${slideUpOnHover}`}
      >
        <div
          className={`flex items-start justify-between gap-4 transition-opacity duration-400 ${ease} ${fadeOutOnHover}`}
        >
          <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] text-(--tone)">
            <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
          </span>
          <p className="eyebrow pt-1 text-right text-[11px]">
            {project.context}
          </p>
        </div>

        <h3 className="mt-5 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">
          {project.name}
        </h3>

        {/* The two layers share one grid cell and cross-fade, so the card is always as tall as the
          taller of the two and nothing is ever cut off. */}
        <div className="mt-2.5 grid flex-1">
          <div
            className={`flex flex-col [grid-area:1/1] ${layerTransition} ${hideOnHover}`}
          >
            <p className="text-[15px] text-muted">{project.summary}</p>
            <div className="mt-auto flex items-end justify-between gap-4 pt-6">
              <p className="font-mono text-[11px] text-muted">
                {project.stack.join(" · ")}
              </p>
              {review && <ReviewStars rating={review.rating} />}
            </div>
          </div>

          <div
            className={`-mb-16 flex flex-col [grid-area:1/1] ${layerTransition} ${showOnHover}`}
          >
            <p className="text-[14px] leading-relaxed text-muted">
              {project.details}
            </p>
            {/* With a review, the review takes the bottom of the card. */}
            {(project.result || shownLink) && (
              <div
                className={`flex flex-wrap items-center justify-between gap-x-4 gap-y-2 pt-3 ${review ? "mt-3" : "mt-auto"}`}
              >
                {project.result ? (
                  <p className="flex items-center gap-2 text-[14px] font-semibold text-fg">
                    <TrendingUp
                      size={15}
                      strokeWidth={2}
                      className="shrink-0 text-(--tone)"
                      aria-hidden="true"
                    />
                    {project.result}
                  </p>
                ) : (
                  <span />
                )}
                <ProjectLink link={shownLink} name={project.name} />
              </div>
            )}

            {review && (
              <figure className="mt-auto pt-4 text-[13px] leading-snug">
                <blockquote className="text-fg/85 italic">
                  &ldquo;{review.quote}&rdquo;
                </blockquote>
                <figcaption className="mt-0.5 text-muted">
                  {review.author}
                </figcaption>
              </figure>
            )}
          </div>
        </div>
      </div>
    </li>
  );
}

/** Quiet rating shown on the card face; the quote itself appears on hover. */
function ReviewStars({ rating }: { rating: number }) {
  return (
    <span
      className="flex shrink-0 gap-px text-(--tone) opacity-80"
      role="img"
      aria-label={`Client review: ${rating} out of 5`}
    >
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={11}
          strokeWidth={2}
          fill={i < rating ? "currentColor" : "none"}
          aria-hidden="true"
        />
      ))}
    </span>
  );
}

function ProjectLink({ link, name }: { link: Project["link"]; name: string }) {
  if (!link) return null;

  if (link === "private" || link === "private-repo") {
    return (
      <span className="eyebrow inline-flex items-center gap-1.5 text-[11px]">
        <Lock size={12} strokeWidth={2} aria-hidden="true" />
        {link === "private" ? "Confidential" : "Private repository"}
      </span>
    );
  }

  return (
    <a
      href={link.href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${name} on ${link.label} (opens in a new tab)`}
      className="eyebrow inline-flex items-center gap-1.5 text-[11px] text-fg transition-colors duration-200 hover:text-(--tone)"
    >
      {link.label}
      <ArrowUpRight size={13} strokeWidth={2} aria-hidden="true" />
    </a>
  );
}
