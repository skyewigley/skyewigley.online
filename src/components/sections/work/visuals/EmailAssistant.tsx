import { CalendarCheck, MailSearch, PenLine } from "lucide-react";
import type { EmailAssistantVisual } from "@/content/work";
import { SceneCard } from "./SceneCard";

/** Email RAG scene: staff ask about a case and get an answer from past emails, plus a draft reply. */
export function EmailAssistant({ visual }: { visual: EmailAssistantVisual }) {
  const { question, answer, draft } = visual;

  return (
    <div className="relative">
      {/* The question and the answer from past emails */}
      <SceneCard>
        <div className="flex items-center gap-2 border-b border-raised px-4 py-3 text-sm font-medium">
          <MailSearch size={14} className="text-(--tone)" />
          {visual.title}
        </div>
        <div className="space-y-4 p-4 sm:pb-16">
          <p className="ml-auto w-fit max-w-[85%] rounded-2xl rounded-br-md bg-raised px-3.5 py-2.5 text-sm text-fg/90">
            {question}
          </p>
          <div className="min-w-0">
            <p className="text-sm text-fg/90">{answer.text}</p>
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
      </SceneCard>

      {/* The draft reply, overlapping the bottom of the answer (not on phones: too busy) */}
      <SceneCard className="relative mt-[-40px] mr-3 ml-auto hidden w-[min(300px,90%)] p-4 sm:mr-6 sm:block">
        <div className="flex items-center justify-between gap-3">
          <p className="eyebrow flex items-center gap-1.5 text-[9px] whitespace-nowrap">
            <PenLine size={11} className="text-(--tone)" />
            {draft.label}
          </p>
          <span className="inline-flex items-center gap-1 rounded-full bg-(--tone)/15 px-2 py-0.5 font-mono text-[9px] tracking-wider whitespace-nowrap text-(--tone)">
            <CalendarCheck size={10} />
            {draft.booking}
          </span>
        </div>
        <div className="mt-3 space-y-1.5 text-[12px] text-fg/80">
          {draft.lines.map((line) => (
            <p key={line}>{line}</p>
          ))}
        </div>
      </SceneCard>
    </div>
  );
}
