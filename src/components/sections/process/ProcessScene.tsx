import type { CSSProperties } from "react";
import { Activity, Check, CircleCheck, FileText, FlaskConical, MessageSquare } from "lucide-react";
import type { ChatScene, LiveScene, PlanScene, ProcessStep, TestScene } from "@/content/process";

/** Inline delay for a `.process-anim` element: its step's start plus its own offset within it. */
export function delay(seconds: number): CSSProperties {
  return { "--d": `${seconds.toFixed(2)}s` } as CSSProperties;
}

/**
 * One step's small animated scene. `start` is when its step begins in the loop (seconds).
 * Below lg there are no numbered nodes, so the card itself marks the spotlit step: it's framed like
 * a TracedPanel (1px padding over the edge colour) and a border glint shows only during its turn.
 */
export function ProcessScene({ scene, start }: { scene: ProcessStep["scene"]; start: number }) {
  return (
    <div
      aria-hidden="true"
      className="relative overflow-hidden rounded-2xl shadow-[0_28px_60px_-24px_rgb(0_0_0/0.9)] max-lg:bg-edge/70 max-lg:p-px"
    >
      <span style={delay(start)} className="process-anim process-spot absolute inset-0 lg:hidden">
        <span className="border-trace absolute top-1/2 left-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2" />
      </span>
      <div className="relative h-[156px] overflow-hidden rounded-2xl bg-ink p-4 max-lg:h-[154px] max-lg:rounded-[15px] lg:border lg:border-edge/70">
        {scene.kind === "chat" && <Chat scene={scene} start={start} />}
        {scene.kind === "plan" && <Plan scene={scene} start={start} />}
        {scene.kind === "test" && <Test scene={scene} start={start} />}
        {scene.kind === "live" && <Live scene={scene} start={start} />}
      </div>
    </div>
  );
}

/** Two messages arrive, one after the other. */
function Chat({ scene, start }: { scene: ChatScene; start: number }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-1.5 text-[9px]">
        <MessageSquare size={11} className="text-accent" />
        {scene.title}
      </p>
      <div className="mt-3 flex flex-col gap-2.5">
        {scene.messages.map((message, index) => (
          <p
            key={message.text}
            style={delay(start + 0.2 + index * 0.9)}
            className={`process-anim process-in max-w-[88%] rounded-2xl px-3 py-2 text-[12px] leading-snug ${
              message.from === "me"
                ? "ml-auto rounded-br-md bg-accent/15 text-fg"
                : "rounded-bl-md bg-raised text-fg/85"
            }`}
          >
            {message.text}
          </p>
        ))}
      </div>
    </div>
  );
}

/** A proposal whose lines tick off in turn. */
function Plan({ scene, start }: { scene: PlanScene; start: number }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-1.5 text-[9px]">
        <FileText size={11} className="text-accent" />
        {scene.title}
      </p>
      <ul className="mt-3 space-y-2">
        {scene.rows.map((row, index) => (
          <li
            key={row.label}
            className="flex items-center gap-2.5 border-b border-raised/70 pb-2 text-[12px] last:border-b-0"
          >
            <span
              style={delay(start + 0.3 + index * 0.6)}
              className="process-anim process-in grid size-4 shrink-0 place-items-center rounded-full bg-accent text-ink"
            >
              <Check size={10} strokeWidth={3} />
            </span>
            <span className="text-muted">{row.label}</span>
            <span className="ml-auto font-medium text-fg">{row.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

/** A progress bar fills while the checks pass one by one. */
function Test({ scene, start }: { scene: TestScene; start: number }) {
  return (
    <div>
      <p className="eyebrow flex items-center gap-1.5 text-[9px]">
        <FlaskConical size={11} className="text-accent" />
        {scene.title}
      </p>
      <span className="mt-3 block h-1 overflow-hidden rounded-full bg-raised">
        <span
          style={delay(start + 0.2)}
          className="process-anim process-bar block h-full origin-left rounded-full bg-accent"
        />
      </span>
      <ul className="mt-3.5 space-y-2">
        {scene.checks.map((check, index) => (
          <li
            key={check}
            style={delay(start + 0.5 + index * 0.7)}
            className="process-anim process-in flex items-center gap-2 text-[12px] text-fg/85"
          >
            <CircleCheck size={13} className="shrink-0 text-accent" />
            {check}
          </li>
        ))}
      </ul>
    </div>
  );
}

const uptimeBars = 30;
/** Seconds between one day bar and the next. */
const barStagger = 0.04;

/**
 * A monitoring panel: live status in the header, a 30-day uptime strip that fills in day by day,
 * then recent activity arriving underneath, showing it's watched, maintained and still changing.
 */
function Live({ scene, start }: { scene: LiveScene; start: number }) {
  const barsDone = start + 0.2 + uptimeBars * barStagger;
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="eyebrow flex items-center gap-1.5 text-[9px]">
          <Activity size={11} className="text-accent" />
          {scene.title}
        </p>
        <p className="flex items-center gap-1.5 rounded-full bg-accent/15 py-0.5 pr-2 pl-1.5 text-[10px] font-semibold text-accent">
          <span style={delay(start)} className="process-anim process-pulse size-1.5 rounded-full bg-accent" />
          {scene.status}
        </p>
      </div>

      <div className="mt-3 flex h-4 gap-[2px]">
        {Array.from({ length: uptimeBars }, (_, index) => (
          <span
            key={index}
            style={delay(start + 0.2 + index * barStagger)}
            className="process-anim process-tick flex-1 rounded-[2px] bg-accent/70"
          />
        ))}
      </div>
      <p className="mt-1.5 font-mono text-[10px] text-muted">{scene.uptime}</p>

      <ul className="mt-3 space-y-2">
        {scene.events.map((event, index) => (
          <li
            key={event.label}
            style={delay(barsDone + 0.3 + index * 0.7)}
            className="process-anim process-in flex items-center gap-2 text-[12px]"
          >
            <span className="size-1 shrink-0 rounded-full bg-muted" />
            <span className="text-fg/85">{event.label}</span>
            <span className="ml-auto font-medium text-fg">{event.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
