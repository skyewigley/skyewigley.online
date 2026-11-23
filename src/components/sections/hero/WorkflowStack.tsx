import type { CSSProperties } from "react";
import { LineIcon } from "@/components/ui/icons";
import type { FlowNode, Workflow } from "@/content/workflow";

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

/**
 * Phone version of a workflow: a vertical timeline rather than a shrunk canvas.
 * Each stage is one step on a rail. A single node gets an icon tile with its
 * label beside it; several nodes in a stage (sources, outputs) sit on a small
 * rail dot as a row of chips. Each rail segment fills as the data moves on,
 * using the same stages and timing as the desktop canvas and its clock.
 *
 * The diagram stacks every workflow in one grid cell (so the panel keeps the
 * tallest one's height) and only one is `active`. On a switch the outgoing one
 * fades away quickly while the incoming one's name, steps and tools rise in one
 * after another. Labels shared by every workflow don't fade, so they never flicker.
 */
export function WorkflowStack({
  flow,
  stageOf,
  stageGap,
  active,
}: {
  flow: Workflow;
  stageOf: Map<string, number>;
  stageGap: number;
  active: boolean;
}) {
  const rows: FlowNode[][] = [];
  for (const node of flow.nodes) (rows[stageOf.get(node.id)!] ??= []).push(node);
  const steps = toSteps(rows, stageOf, flow);

  const lit = (stage: number) => (active ? delay(stage * stageGap) : undefined);
  const animated = active ? "flow-node" : "";

  /** Staggered entrance for the `order`-th piece; inactive pieces fade out at once. */
  const enter = (order: number) => ({
    className: `transition-[opacity,translate] ${
      active ? "duration-500 ease-out" : "translate-y-1.5 opacity-0 duration-200 ease-in"
    }`,
    style: active ? { transitionDelay: `${180 + order * 70}ms` } : undefined,
  });
  const fixed = active ? "" : "invisible";

  return (
    <div
      aria-hidden={!active || undefined}
      className="col-start-1 row-start-1 flex flex-col px-5 pt-7 pb-8"
    >
      <p className={`eyebrow text-[10px] ${fixed}`}>From recent builds</p>
      <p
        className={`mt-1.5 font-display text-xl font-semibold ${enter(0).className}`}
        style={enter(0).style}
      >
        {flow.name}
      </p>

      <ol className="mt-7 mb-7">
        {steps.map((step, index) => {
          const last = index === steps.length - 1;
          return (
            <li
              key={step.key}
              className={`grid grid-cols-[44px_1fr] gap-x-4 ${enter(index + 1).className}`}
              style={enter(index + 1).style}
            >
              {/* Rail: the step marker, then a segment down to the next step */}
              <div className="flex flex-col items-center">
                <span
                  className={`${animated} grid size-11 shrink-0 place-items-center rounded-card border border-edge bg-raised ${
                    step.hub ? "text-accent" : ""
                  }`}
                  style={lit(step.stage)}
                >
                  <LineIcon path={step.icon} size={20} />
                </span>
                {!last && (
                  <span aria-hidden="true" className="relative min-h-5 w-px flex-1 bg-edge">
                    {active && (
                      <span className="flow-rail" style={delay(step.stage * stageGap + 0.15)} />
                    )}
                  </span>
                )}
              </div>

              {/* Every step reads the same: a name, then one quieter line under it */}
              <div className={`flex min-h-11 flex-col justify-center ${last ? "" : "pb-5"}`}>
                <p className="font-medium">{step.title}</p>
                {step.tools ? (
                  <ul className="mt-2 flex flex-wrap gap-1.5">
                    {step.tools.map((tool) => (
                      <li
                        key={tool.id}
                        className="inline-flex h-7 items-center gap-1.5 rounded-full border border-edge px-2.5 text-[12px] text-fg/80"
                      >
                        <LineIcon path={tool.icon} size={12} className="shrink-0 text-muted" />
                        {tool.label}
                      </li>
                    ))}
                  </ul>
                ) : (
                  step.caption && <p className="eyebrow mt-0.5 text-[10px]">{step.caption}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      {/* Pinned to the bottom, so it sits in the same place for every workflow */}
      <div className={`mt-auto border-t pt-5 ${active ? "border-raised" : "border-transparent"}`}>
        <p className={`eyebrow text-[10px] ${fixed}`}>Built with</p>
        <ul
          className={`mt-2.5 flex flex-wrap gap-1.5 ${enter(steps.length + 1).className}`}
          style={enter(steps.length + 1).style}
        >
          {flow.stack.split(" · ").map((tool) => (
            <li
              key={tool}
              className="rounded-full bg-ink px-2.5 py-1 font-mono text-[11px] tracking-[0.06em] text-fg/80 uppercase"
            >
              {tool}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

type Step = {
  key: string;
  stage: number;
  icon: string;
  title: string;
  /** Eyebrow under the title (a step's tool, or whether a lone pill is an input or output). */
  caption?: string;
  /** Several sources or outputs, listed as small tags under the title. */
  tools?: FlowNode[];
  hub?: boolean;
};

const groupIcons = {
  input: "M4 13h4l1.5 3h5l1.5-3h4M4 13l2-8h12l2 8v6H4z",
  output: "M4 12l16-8-6 16-2.5-6.5z",
};

/**
 * Turns each stage into rail steps that all share one shape: icon tile, title, one line under it.
 * Processing steps keep their own label; pills in a stage become a single "Sources" or "Outputs"
 * step (depending on which side of the hub they sit) with the pills as tags. A lone pill keeps
 * its label and gets "Input"/"Output" as its caption.
 */
function toSteps(rows: FlowNode[][], stageOf: Map<string, number>, flow: Workflow): Step[] {
  const hub = flow.nodes.find((node) => node.kind === "hub");
  const hubStage = hub ? stageOf.get(hub.id)! : rows.length;

  return rows.flatMap((row, stage) => {
    const input = stage < hubStage;
    const pills = row.filter((node) => node.kind === "pill");
    const steps: Step[] = row
      .filter((node) => node.kind !== "pill")
      .map((node) => ({
        key: node.id,
        stage,
        icon: node.icon,
        title: node.label,
        caption: node.sublabel,
        hub: node.kind === "hub",
      }));

    if (pills.length === 1) {
      const pill = pills[0]!;
      steps.push({
        key: pill.id,
        stage,
        icon: pill.icon,
        title: pill.label,
        caption: input ? "Input" : "Output",
      });
    } else if (pills.length > 1) {
      steps.push({
        key: `group-${stage}`,
        stage,
        icon: input ? groupIcons.input : groupIcons.output,
        title: input ? "Sources" : "Outputs",
        tools: pills,
      });
    }
    return steps;
  });
}
