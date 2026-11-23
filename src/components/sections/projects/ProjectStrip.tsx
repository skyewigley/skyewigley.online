import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { projectId, projects, type Project } from "@/content/projects";
import { toneClass } from "./ProjectCard";

/**
 * Every project in a slow, endless auto-scrolling row. Each item links to its card on /projects.
 * The list is rendered twice and the track moves by exactly one copy (-50%), so the loop never
 * jumps. It never pauses; both edges fade out.
 */
export function ProjectStrip({ title, linkLabel }: { title: string; linkLabel: string }) {
  return (
    <div>
      <div className="flex items-end justify-between gap-6">
        <h3 className="font-display text-xl font-semibold tracking-[-0.02em]">{title}</h3>
        <Link
          href="/projects"
          className="eyebrow inline-flex items-center gap-1.5 text-fg transition-colors duration-200 hover:text-accent"
        >
          {linkLabel}
          <ArrowRight size={14} strokeWidth={2} aria-hidden="true" />
        </Link>
      </div>

      <div className="-mx-5 mt-5 overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)] sm:mx-0">
        <div className="project-marquee flex w-max">
          <ProjectList />
          <ProjectList duplicate />
        </div>
      </div>
    </div>
  );
}

/** One copy of the list. The duplicate is hidden from screen readers and the tab order. */
function ProjectList({ duplicate = false }: { duplicate?: boolean }) {
  return (
    <ul className="flex shrink-0" aria-hidden={duplicate || undefined}>
      {projects.map((project) => (
        // Spacing is padding on each item, not a flex gap, so the two copies line up exactly.
        <li key={project.name} className={`${toneClass[project.category]} shrink-0 pr-3`}>
          <ProjectLink project={project} tabbable={!duplicate} />
        </li>
      ))}
    </ul>
  );
}

function ProjectLink({ project, tabbable }: { project: Project; tabbable: boolean }) {
  const Icon = project.icon;
  return (
    <Link
      href={`/projects#${projectId(project)}`}
      tabIndex={tabbable ? undefined : -1}
      className="flex w-[236px] items-center gap-3.5 rounded-card border border-raised bg-ink/40 p-3.5 transition-colors duration-300 hover:border-(--tone)"
    >
      <span className="grid size-10 shrink-0 place-items-center rounded-[10px] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] text-(--tone)">
        <Icon size={19} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0">
        <span className="block truncate font-medium">{project.name}</span>
        <span className="block truncate text-[13px] text-muted">{project.context}</span>
      </span>
    </Link>
  );
}
