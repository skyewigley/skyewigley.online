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
        {rows.map((row, stage) => {
          const last = stage === rows.length - 1;
          const single = row.length === 1 ? row[0]! : null;
          return (
            <li
              key={stage}
              className={`grid grid-cols-[44px_1fr] gap-x-4 ${enter(stage + 1).className}`}
              style={enter(stage + 1).style}
            >
              {/* Rail: the step marker, then a segment down to the next step */}
              <div className="flex flex-col items-center">
                {single ? (
                  <span
                    className={`${animated} grid size-11 shrink-0 place-items-center rounded-card border border-edge bg-raised ${
                      single.kind === "hub" ? "text-accent" : ""
                    }`}
                    style={lit(stage)}
                  >
                    <LineIcon path={single.icon} size={20} />
                  </span>
                ) : (
                  <span className="grid h-11 shrink-0 place-items-center">
                    <span
                      className={`${animated} block size-3 rounded-full border border-edge bg-raised`}
                      style={lit(stage)}
                    />
                  </span>
                )}
                {!last && (
                  <span aria-hidden="true" className="relative min-h-5 w-px flex-1 bg-edge">
                    {active && (
                      <span className="flow-rail" style={delay(stage * stageGap + 0.15)} />
                    )}
                  </span>
                )}
              </div>

              <div className={last ? "" : "pb-5"}>
                {single ? (
                  <div className="flex min-h-11 flex-col justify-center">
                    <p className="font-medium">{single.label}</p>
                    {single.sublabel && (
                      <p className="eyebrow mt-0.5 text-[10px]">{single.sublabel}</p>
                    )}
                  </div>
                ) : (
                  <ul className="flex min-h-11 flex-wrap items-center gap-2">
                    {row.map((node) => (
                      <li
                        key={node.id}
                        className={`${animated} inline-flex min-h-9 items-center gap-2 rounded-full border border-edge bg-raised px-3 text-[13px] font-medium`}
                        style={lit(stage)}
                      >
                        <LineIcon path={node.icon} size={14} className="shrink-0 text-muted" />
                        {node.label}
                      </li>
                    ))}
                  </ul>
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
          className={`mt-2.5 flex flex-wrap gap-1.5 ${enter(rows.length + 1).className}`}
          style={enter(rows.length + 1).style}
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
