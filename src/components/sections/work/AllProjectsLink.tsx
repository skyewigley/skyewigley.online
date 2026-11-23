import { ArrowPillLink } from "@/components/ui/ArrowPillLink";
import { workHeading } from "@/content/work";

/** Link from Selected work to /projects. */
export function AllProjectsLink({ className = "" }: { className?: string }) {
  return (
    <ArrowPillLink href="/projects" className={className}>
      {workHeading.allProjectsLabel}
    </ArrowPillLink>
  );
}
