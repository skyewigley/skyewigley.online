"use client";

import { useId, useRef, useState, type CSSProperties } from "react";
import { LineIcon } from "@/components/ui/icons";
import { TracedPanel } from "@/components/ui/TracedPanel";
import { workflows, type FlowNode, type Workflow } from "@/content/workflow";
import { WorkflowStack } from "./WorkflowStack";

// Fixed-size canvas (px). Node positions in content/workflow.ts use this space.
const WIDTH = 940;
const HEIGHT = 330;

/** Size of each node kind's box (the part connectors attach to). */
const BOX = {
  pill: { h: 40 },
  step: { w: 64, h: 64 },
  hub: { w: 220, h: 64 },
};

/** Seconds between stages lighting up. */
const STAGE_GAP = 1;

/** Roughly how long the last stage stays lit (flow-node-on in globals.css). */
const LIT = 1.2;

/** Quiet beat after a pass finishes, before the next workflow. */
const HOLD = 1.4;

/** Info bubble width (px, matches w-56), for keeping it inside the canvas. */
const BUBBLE_W = 224;

const delay = (seconds: number) => ({ "--delay": `${seconds}s` }) as CSSProperties;

function size(node: FlowNode) {
  if (node.kind === "pill") return { w: node.w ?? 120, h: BOX.pill.h };
  return BOX[node.kind];
}

/** Each node's stage: one more than the latest node feeding into it. */
function stages(flow: Workflow) {
  const result = new Map<string, number>();
  const resolve = (id: string): number => {
    const known = result.get(id);
    if (known !== undefined) return known;
    const node = flow.nodes.find((n) => n.id === id)!;
    const incoming = flow.edges.filter((e) => e.to === id);
    const stage =
      node.stage ?? (incoming.length ? Math.max(...incoming.map((e) => resolve(e.from))) + 1 : 0);
    result.set(id, stage);
    return stage;
  };
  flow.nodes.forEach((n) => resolve(n.id));
  return result;
}

/** One full pass of a workflow plus the hold, in seconds. */
function cycleLength(stageOf: Map<string, number>) {
  return Math.max(...stageOf.values()) * STAGE_GAP + LIT + HOLD;
}

/** Place a pill's info bubble so it stays inside the canvas. */
function bubblePosition(node: FlowNode) {
  const vertical = node.y < HEIGHT / 2 ? "top-full mt-2.5" : "bottom-full mb-2.5";
  if (node.x - BUBBLE_W / 2 < 8) return `${vertical} left-0`;
  if (node.x + BUBBLE_W / 2 > WIDTH - 8) return `${vertical} right-0`;
  return `${vertical} left-1/2 -translate-x-1/2`;
}

/** A smooth S-curve between two nodes, as an SVG path. */
function edgePath(from: FlowNode, to: FlowNode, vertical?: boolean) {
  const a = size(from);
  const b = size(to);
  if (vertical) {
    const y1 = from.y + a.h / 2;
    const y2 = to.y - b.h / 2;
    const mid = (y1 + y2) / 2;
    return `M ${from.x} ${y1} C ${from.x} ${mid} ${to.x} ${mid} ${to.x} ${y2}`;
  }
  const x1 = from.x + a.w / 2;
  const x2 = to.x - b.w / 2;
  const mid = (x1 + x2) / 2;
  return `M ${x1} ${from.y} C ${mid} ${from.y} ${mid} ${to.y} ${x2} ${to.y}`;
}

/**
 * Animated example workflows. Each one plays a single pass, holds briefly,
 * then rotates to the next; a hidden CSS "clock" marks the end of each pass so
 * a switch never cuts an animation short. Hovering (or keyboard focus inside)
 * stops the rotation, and the current workflow keeps looping. Pills show an
 * info bubble on hover/focus. Phones get a full-width vertical version
 * (WorkflowStack) driven by the same clock; tablets scroll sideways.
 */
export function WorkflowDiagram() {
  const [active, setActive] = useState(0);
  const hovered = useRef(false);
  const focused = useRef(false);
  const id = useId();

  const flow = workflows[active]!;
  const stageOf = stages(flow);
  const byId = new Map(flow.nodes.map((n) => [n.id, n]));
  const cycle = { "--cycle": `${cycleLength(stageOf)}s` } as CSSProperties;

  function handlePassEnd() {
    if (hovered.current || focused.current) return;
    setActive((i) => (i + 1) % workflows.length);
  }

  return (
    <TracedPanel className="animate-fade-up delay-step-5 max-sm:-mx-5">
      <figure
        onPointerEnter={(e) => {
          if (e.pointerType === "mouse") hovered.current = true;
        }}
        onPointerLeave={() => {
          hovered.current = false;
        }}
        onFocus={(e) => {
          // Keyboard focus only: a mouse click on a tab shouldn't freeze rotation.
          focused.current = e.target.matches(":focus-visible");
        }}
        onBlur={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget)) focused.current = false;
        }}
        className="dot-grid relative overflow-hidden border-y border-raised bg-surface sm:rounded-[calc(var(--radius-panel)-1px)] sm:border-0"
      >
        {/* Phones: no tabs, the workflows just rotate (dots below show which one is playing). */}
        <figcaption className="hidden flex-wrap items-center justify-between gap-x-5 gap-y-3 px-5 pt-5 sm:flex">
          <div
            role="tablist"
            aria-label="Example workflows"
            className="inline-flex rounded-full border border-raised bg-ink p-1"
          >
            {workflows.map((item, index) => {
              const selected = index === active;
              return (
                <button
                  key={item.name}
                  type="button"
                  role="tab"
                  id={`${id}-tab-${index}`}
                  aria-selected={selected}
                  aria-controls={`${id}-panel`}
                  onClick={() => setActive(index)}
                  className={`min-h-8 cursor-pointer rounded-full px-3.5 font-mono text-label uppercase transition-colors duration-250 ${
                    selected ? "bg-raised text-fg" : "text-muted hover:text-fg"
                  }`}
                >
                  {item.name}
                </button>
              );
            })}
          </div>
          <span className="eyebrow">{flow.stack}</span>
        </figcaption>

        <div role="tabpanel" id={`${id}-panel`} aria-labelledby={`${id}-tab-${active}`}>
          {/* Phones: every workflow is laid out in the same grid cell, only the active one visible, so
              the panel is always as tall as the tallest. They stay mounted (outside the keyed wrapper
              below) so a switch can crossfade instead of cutting. */}
          <div className="relative grid sm:hidden" style={cycle}>
            {workflows.map((item, index) => (
              <WorkflowStack
                key={item.name}
                flow={item}
                stageOf={index === active ? stageOf : stages(item)}
                stageGap={STAGE_GAP}
                active={index === active}
              />
            ))}
            <div className="absolute top-7 right-5 flex items-center gap-1.5">
              {workflows.map((item, index) => (
                <button
                  key={item.name}
                  type="button"
                  aria-label={`Show the ${item.name} workflow`}
                  aria-current={index === active || undefined}
                  onClick={() => setActive(index)}
                  className="grid h-6 cursor-pointer place-items-center"
                >
                  <span
                    className={`block h-1.5 rounded-full transition-all duration-300 ${
                      index === active ? "w-5 bg-accent" : "w-1.5 bg-edge"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Keyed so every animation (and the clock) restarts on each switch */}
          <div key={flow.name} className="relative animate-fade-in" style={cycle}>
            <span aria-hidden="true" className="flow-clock" onAnimationIteration={handlePassEnd} />

            <div className="hidden overflow-x-auto sm:block">
              <div className="relative mx-auto" style={{ width: WIDTH, height: HEIGHT }}>
                <svg
                  aria-hidden="true"
                  width={WIDTH}
                  height={HEIGHT}
                  className="absolute inset-0 text-edge"
                  fill="none"
                >
                  {flow.edges.map((edge) => (
                    <path
                      key={`${edge.from}-${edge.to}`}
                      d={edgePath(byId.get(edge.from)!, byId.get(edge.to)!, edge.vertical)}
                      stroke="currentColor"
                      strokeWidth={1.5}
                    />
                  ))}
                </svg>

                {/* Data dots, each riding its connector's curve */}
                {flow.edges.map((edge) => {
                  const d = edgePath(byId.get(edge.from)!, byId.get(edge.to)!, edge.vertical);
                  const start = stageOf.get(edge.from)! * STAGE_GAP + 0.15;
                  return (
                    <span
                      key={`dot-${edge.from}-${edge.to}`}
                      aria-hidden="true"
                      className="flow-packet"
                      style={{ offsetPath: `path("${d}")`, ...delay(start) }}
                    />
                  );
                })}

                {flow.nodes.map((node) => {
                  const { w, h } = size(node);
                  const lit = delay(stageOf.get(node.id)! * STAGE_GAP);
                  const box = {
                    left: node.x - w / 2,
                    top: node.y - h / 2,
                    width: w,
                    height: h,
                  };

                  const infoId = `${id}-info-${node.id}`;
                  // Focusable, and described by its bubble, when the node has info.
                  const describe = node.info ? { tabIndex: 0, "aria-describedby": infoId } : {};
                  const bubble = node.info && (
                    <span
                      id={infoId}
                      role="tooltip"
                      className={`pointer-events-none absolute w-56 rounded-card border border-raised bg-ink px-4 py-3 text-left font-sans text-[13px] leading-snug font-normal whitespace-normal text-muted opacity-0 shadow-lg shadow-black/40 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 group-has-focus-visible:opacity-100 ${bubblePosition(node)}`}
                    >
                      <span className="eyebrow mb-1 block text-[10px] text-fg">{node.label}</span>
                      {node.info}
                    </span>
                  );

                  if (node.kind === "pill") {
                    return (
                      <div
                        key={node.id}
                        {...describe}
                        className="flow-node group absolute flex cursor-help items-center gap-2.5 rounded-full border border-edge bg-raised px-4 text-sm font-medium whitespace-nowrap hover:z-20 focus-visible:z-20"
                        style={{ ...box, ...lit }}
                      >
                        <LineIcon path={node.icon} size={18} className="shrink-0 text-muted" />
                        {node.label}
                        {bubble}
                      </div>
                    );
                  }

                  if (node.kind === "hub") {
                    return (
                      <div
                        key={node.id}
                        {...describe}
                        className="flow-node group absolute flex cursor-help items-center justify-center gap-3 rounded-card border border-edge bg-raised px-4 hover:z-20 focus-visible:z-20"
                        style={{ ...box, ...lit }}
                      >
                        <LineIcon path={node.icon} size={26} className="shrink-0" />
                        <span className="text-left leading-tight">
                          <span className="block font-display text-base font-semibold whitespace-nowrap">
                            {node.label}
                          </span>
                          {node.sublabel && (
                            <span className="eyebrow mt-0.5 block text-[10px]">{node.sublabel}</span>
                          )}
                        </span>
                        {bubble}
                      </div>
                    );
                  }

                  // Step: the wrapper is the hover group, so the label opens the bubble too.
                  return (
                    <div key={node.id} className="group">
                      <div
                        {...describe}
                        className="flow-node absolute grid cursor-help place-items-center rounded-card border border-edge bg-raised group-hover:z-20 focus-visible:z-20"
                        style={{ ...box, ...lit }}
                      >
                        <LineIcon path={node.icon} size={26} />
                        {bubble}
                      </div>
                      <div
                        className="absolute w-[140px] cursor-help text-center"
                        style={{ left: node.x - 70, top: node.y + h / 2 + 12 }}
                      >
                        <p className="text-sm leading-snug font-medium">{node.label}</p>
                        {node.sublabel && <p className="eyebrow mt-1 text-[10px]">{node.sublabel}</p>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </figure>
    </TracedPanel>
  );
}
