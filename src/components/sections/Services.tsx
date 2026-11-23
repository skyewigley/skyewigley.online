import Link from "next/link";
import { ArrowRight, ArrowUpRight, MessageCircleQuestion } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { Carousel } from "@/components/ui/Carousel";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projectId, projects } from "@/content/projects";
import {
  alsoUsed,
  otherService,
  serviceCardHref,
  services,
  servicesHeading,
  stack,
  stackHeading,
  type Service,
} from "@/content/services";
import { toneClass } from "./projects/ProjectCard";

/** Soft glow in the card's tone from its top-left corner, brighter on hover. */
const toneGlow =
  "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_srgb,var(--tone)_10%,transparent),transparent_60%)] opacity-50 transition-opacity duration-500 group-hover:opacity-100";

// Work above supplies the top gap on desktop; on phones Work ends flush, so Services adds its own.
// On phones the stack panel ends the section flush, so Process supplies the gap below instead.
export function Services() {
  return (
    <section id="services" className="pb-section max-sm:pt-section max-sm:pb-0">
      <Container>
        <SectionHeading
          eyebrow={servicesHeading.eyebrow}
          title={servicesHeading.title}
          className="reveal max-w-[820px]"
        />
        <p className="reveal mt-6 max-w-[600px] text-muted">{servicesHeading.intro}</p>

        <Carousel
          as="ul"
          itemLabel="Service"
          className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {services.map((service) => (
            <ServiceCard key={service.title} service={service} />
          ))}
          <OtherServiceCard />
        </Carousel>

        {/* Stack: heading and intro share one row, then the groups run across the full width.
            Phones: a full-bleed surface panel (no dots) that sits flush on How I work,
            so it reads as its own block between Services and Process. */}
        <div className="mt-[clamp(72px,9vw,128px)] max-sm:-mx-5 max-sm:border-y max-sm:border-raised max-sm:bg-surface max-sm:px-5 max-sm:py-12">
          <div className="reveal grid grid-cols-1 items-end gap-x-[clamp(32px,5vw,72px)] gap-y-4 lg:grid-cols-2">
            <div>
              <p className="eyebrow">{stackHeading.eyebrow}</p>
              <h3 className="mt-4 font-display text-[clamp(26px,2.6vw,36px)] leading-[1.1] font-semibold tracking-[-0.03em]">
                {stackHeading.title}
              </h3>
            </div>
            <p className="max-w-[520px] text-muted lg:justify-self-end">{stackHeading.intro}</p>
          </div>

          <Carousel
            as="dl"
            itemLabel="Group"
            autoplay={4}
            className="mt-10 grid grid-cols-1 gap-x-8 gap-y-8 sm:grid-cols-2 lg:grid-cols-4"
          >
            {stack.map(({ label, category, icon: Icon, items }) => (
              <div
                key={label}
                className={`${toneClass[category]} reveal group/col relative border-t border-raised pt-5`}
              >
                {/* Short tone segment over the hairline; runs the full width while the column is hovered */}
                <span
                  aria-hidden="true"
                  className="absolute -top-px left-0 h-px w-10 bg-(--tone) transition-[width] duration-500 ease-[cubic-bezier(0.45,0,0.25,1)] group-hover/col:w-full"
                />
                <dt className="eyebrow flex items-center gap-2.5 text-fg">
                  <Icon size={15} strokeWidth={1.8} className="text-(--tone)" aria-hidden="true" />
                  {label}
                </dt>
                {/* One tool per hairline row, so rows line up across the columns */}
                <dd className="mt-3">
                  <ul>
                    {items.map(({ label: item, icon: ItemIcon }) => (
                      <li
                        key={item}
                        className="group/item flex items-center gap-3 border-b border-raised/60 py-2 text-[15px] text-muted transition-colors duration-200 last:border-b-0 hover:text-fg"
                      >
                        <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-[color-mix(in_srgb,var(--tone)_10%,transparent)] text-(--tone) transition-colors duration-200 group-hover/item:bg-[color-mix(in_srgb,var(--tone)_20%,transparent)]">
                          <ItemIcon size={14} strokeWidth={1.8} aria-hidden="true" />
                        </span>
                        <span className="transition-transform duration-200 group-hover/item:translate-x-0.5">
                          {item}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            ))}
          </Carousel>

          <div className="reveal mt-8 flex flex-col gap-2 border-t border-raised pt-6 sm:flex-row sm:items-baseline sm:gap-6">
            <p className="eyebrow shrink-0">{alsoUsed.label}</p>
            <p className="text-[15px] text-muted">{alsoUsed.items.join(" · ")}</p>
          </div>
        </div>
      </Container>
    </section>
  );
}

function ServiceCard({ service }: { service: Service }) {
  const { icon: Icon } = service;
  const examples = service.examples
    .map((name) => projects.find((project) => project.name === name))
    .filter((project) => project !== undefined);

  return (
    <li
      className={`${toneClass[service.category]} reveal group relative isolate flex flex-col overflow-hidden rounded-card border border-raised bg-surface p-6 transition-colors duration-300 hover:border-(--tone) has-[.card-link:focus-visible]:border-(--tone)`}
    >
      <div aria-hidden="true" className={toneGlow} />
      <ArrowUpRight
        size={18}
        strokeWidth={2}
        aria-hidden="true"
        className="absolute top-6 right-6 text-(--tone) opacity-0 transition-[opacity,translate] duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100"
      />
      <span className="grid size-11 place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] text-(--tone)">
        <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">
        {/* Stretched link: the whole card opens the contact page; the example links sit above it. */}
        <Link
          href={serviceCardHref}
          className="card-link outline-none after:absolute after:inset-0 after:content-['']"
        >
          {service.title}
        </Link>
      </h3>
      <p className="mt-2.5 text-[15px] text-muted">{service.text}</p>

      {examples.length > 0 && (
        <div className="mt-auto pt-6">
          <p className="eyebrow text-[11px]">For example</p>
          <ul className="relative z-10 mt-2.5 flex flex-wrap gap-x-4 gap-y-1.5">
            {examples.map((project) => (
              <li key={project.name}>
                <Link
                  href={`/projects#${projectId(project)}`}
                  className="inline-flex items-center gap-1 text-[14px] text-fg transition-colors duration-200 hover:text-(--tone)"
                >
                  {project.name}
                  <ArrowUpRight size={13} strokeWidth={2} className="text-(--tone)" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </li>
  );
}

/** The open invitation: same shape as the service cards, dashed and in the brand accent. The whole card links to the contact form. */
function OtherServiceCard() {
  return (
    <li className="reveal group relative isolate flex flex-col overflow-hidden rounded-card border border-dashed border-edge p-6 transition-colors duration-300 [--tone:var(--color-accent)] hover:border-accent has-[.card-link:focus-visible]:border-accent">
      <div aria-hidden="true" className={toneGlow} />
      <span className="grid size-11 place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] text-accent">
        <MessageCircleQuestion size={21} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <h3 className="mt-5 font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">
        {otherService.title}
      </h3>
      <p className="mt-2.5 text-[15px] text-muted">{otherService.text}</p>
      <div className="mt-auto pt-6">
        <a
          href={otherService.href}
          className="card-link eyebrow inline-flex items-center gap-2 text-[11px] text-fg outline-none transition-colors duration-200 group-hover:text-accent after:absolute after:inset-0 after:content-['']"
        >
          {otherService.linkLabel}
          <ArrowRight
            size={13}
            strokeWidth={2}
            className="text-accent transition-transform duration-200 group-hover:translate-x-0.5"
            aria-hidden="true"
          />
        </a>
      </div>
    </li>
  );
}
