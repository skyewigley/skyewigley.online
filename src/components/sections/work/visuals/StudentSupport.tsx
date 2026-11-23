import { Hash } from "lucide-react";
import type { StudentSupportVisual } from "@/content/work";
import { SceneCard } from "./SceneCard";

/** VisionX scene: the agent answering in Discord, and an insight card for the owner. */
export function StudentSupport({ visual }: { visual: StudentSupportVisual }) {
  const { question, answer, insight } = visual;
  const maxCount = Math.max(...insight.topics.map((topic) => topic.count));

  return (
    <div className="relative">
      {/* The conversation */}
      <SceneCard>
        <div className="flex items-center gap-1.5 border-b border-raised px-4 py-3 text-sm font-medium">
          <Hash size={14} className="text-muted" />
          {visual.channel}
        </div>
        <div className="space-y-4 p-4 pb-14">
          <div className="flex gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-raised text-xs font-semibold">
              {question.name.charAt(0)}
            </span>
            <div>
              <p className="text-[13px] font-semibold">{question.name}</p>
              <p className="mt-0.5 text-sm text-muted">{question.text}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <span className="grid size-8 shrink-0 place-items-center rounded-full bg-(--tone) text-xs font-semibold text-ink">
              {answer.name.charAt(0)}
            </span>
            <div className="min-w-0">
              <p className="flex items-center gap-1.5 text-[13px] font-semibold">
                {answer.name}
                <span className="rounded bg-(--tone)/15 px-1 py-px font-mono text-[9px] tracking-wider text-(--tone)">
                  APP
                </span>
              </p>
              <p className="mt-0.5 text-sm text-fg/90">{answer.text}</p>
              <div className="mt-2.5 flex flex-wrap gap-1.5">
                {answer.sources.map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 rounded-full bg-raised/70 py-1 pr-2.5 pl-2 text-[11px] text-fg/80"
                  >
                    <Icon size={12} className="text-(--tone)" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </SceneCard>

      {/* What the owner sees, overlapping the bottom of the conversation */}
      <SceneCard className="relative mt-[-36px] mr-3 ml-auto w-[min(280px,90%)] p-4 sm:mr-6">
        <p className="eyebrow text-[9px]">{insight.label}</p>
        <p className="mt-1.5 flex items-baseline gap-2">
          <span className="font-display text-2xl font-semibold text-(--tone)">{insight.value}</span>
          <span className="text-[12px] text-muted">{insight.caption}</span>
        </p>

        {/* One line per topic: label, bar, count */}
        <ul className="mt-3 space-y-1.5">
          {insight.topics.map((topic, index) => (
            <li key={topic.label} className="flex items-center gap-2.5 text-[11px]">
              <span className={`flex-1 truncate ${index === 0 ? "text-fg" : "text-fg/75"}`}>
                {topic.label}
              </span>
              <span className="h-1 w-14 shrink-0 rounded-full bg-raised">
                <span
                  className={`block h-full rounded-full ${index === 0 ? "bg-(--tone)" : "bg-(--tone)/40"}`}
                  style={{ width: `${(topic.count / maxCount) * 100}%` }}
                />
              </span>
              <span className="w-7 text-right font-mono text-[10px] text-muted tabular-nums">
                {topic.count}
              </span>
            </li>
          ))}
        </ul>
      </SceneCard>
    </div>
  );
}
