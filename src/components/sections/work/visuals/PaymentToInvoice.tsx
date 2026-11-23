import { BadgeCheck, Landmark } from "lucide-react";
import type { PaymentToInvoiceVisual } from "@/content/work";
import { SceneCard } from "./SceneCard";

/** Finance scene: a payment lands and becomes a paid invoice. */
export function PaymentToInvoice({ visual }: { visual: PaymentToInvoiceVisual }) {
  const { payment, invoice } = visual;

  return (
    <div className="relative sm:min-h-[330px]">
      {/* Payment notification */}
      <SceneCard className="relative w-[240px] p-4 sm:absolute sm:top-0 sm:left-0">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-full bg-(--tone)/15 text-(--tone)">
            <Landmark size={15} />
          </span>
          <div>
            <p className="text-[13px] font-semibold">Payment received</p>
            <p className="font-mono text-[10px] text-muted">
              {payment.source} · {payment.time}
            </p>
          </div>
        </div>
        <p className="mt-3 font-display text-2xl font-semibold tracking-tight">{payment.amount}</p>
        <p className="text-[12px] text-muted">from {payment.from}</p>
        <p className="mt-3 flex items-center gap-1.5 border-t border-raised pt-3 font-mono text-[10px] text-(--tone)">
          <BadgeCheck size={13} />
          {payment.matched}
        </p>
      </SceneCard>

      {/* The invoice it became: a light "paper" document for contrast */}
      <div className="relative z-10 mt-[-20px] ml-auto w-[min(100%,300px)] rounded-2xl bg-fg p-5 text-ink shadow-[0_28px_60px_-24px_rgb(0_0_0/0.9)] sm:absolute sm:top-12 sm:right-0 sm:mt-0">
        <div className="flex items-start justify-between">
          <div>
            <p className="font-mono text-[10px] tracking-[0.14em] text-ink/50 uppercase">Invoice</p>
            <p className="mt-0.5 font-display text-lg font-semibold">{invoice.number}</p>
          </div>
          <span className="rounded-full bg-(--tone) px-2.5 py-1 font-mono text-[10px] font-medium tracking-wider uppercase">
            {invoice.status}
          </span>
        </div>
        <p className="mt-4 font-mono text-[10px] tracking-wider text-ink/50 uppercase">Billed to</p>
        <p className="text-sm font-medium">{invoice.billedTo}</p>
        <ul className="mt-4 space-y-2 border-t border-ink/10 pt-3 text-[13px]">
          {invoice.lines.map((line) => (
            <li key={line.item} className="flex justify-between gap-4">
              <span className="text-ink/70">{line.item}</span>
              <span className="font-mono tabular-nums">{line.amount}</span>
            </li>
          ))}
        </ul>
        <p className="mt-3 flex justify-between border-t border-ink/10 pt-3 text-sm font-semibold">
          <span>Total</span>
          <span className="font-mono tabular-nums">{invoice.total}</span>
        </p>
      </div>
    </div>
  );
}
