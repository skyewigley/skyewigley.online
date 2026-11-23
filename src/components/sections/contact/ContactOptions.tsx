"use client";

import { ArrowUpRight, ChevronDown } from "lucide-react";
import { useRef, useSyncExternalStore } from "react";
import {
  contactDetails,
  contactOptions,
  contactSocials,
  type ContactOption,
  type ContactOptionId,
} from "@/content/contact";
import { toneClass } from "../projects/ProjectCard";
import { ChannelList } from "./ChannelList";
import { ContactForm } from "./ContactForm";

/** The open option lives in the URL hash (/contact#message), so it can be linked to directly. */
function subscribe(onChange: () => void) {
  window.addEventListener("hashchange", onChange);
  return () => window.removeEventListener("hashchange", onChange);
}
const readHash = () => window.location.hash.slice(1);
const readServerHash = () => "";

const panels: Partial<Record<ContactOptionId, () => React.ReactNode>> = {
  message: () => <ContactForm />,
  details: () => <ChannelList channels={contactDetails} />,
  socials: () => <ChannelList channels={contactSocials} />,
};

/** A grid of ways to get in touch; picking one opens its panel underneath. */
export function ContactOptions() {
  const hash = useSyncExternalStore(subscribe, readHash, readServerHash);
  const open = contactOptions.find((option) => option.id === hash && panels[option.id]);
  const panelRef = useRef<HTMLDivElement>(null);

  function toggle(id: ContactOptionId) {
    const next = open?.id === id ? "" : id;
    history.replaceState(null, "", next ? `#${next}` : window.location.pathname);
    window.dispatchEvent(new HashChangeEvent("hashchange"));
    // On narrow screens the panel can sit below the fold, under the other cards.
    if (next) requestAnimationFrame(() => panelRef.current?.scrollIntoView({ block: "nearest", behavior: "smooth" }));
  }

  return (
    <>
      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {contactOptions.map((option) => (
          <li key={option.id} className={toneClass[option.category]}>
            <OptionCard option={option} isOpen={open?.id === option.id} onToggle={toggle} />
          </li>
        ))}
      </ul>

      <div ref={panelRef} className="scroll-mt-6">
        {open && (
          <div
            key={open.id}
            id={`contact-panel-${open.id}`}
            role="region"
            aria-label={open.title}
            className={`${toneClass[open.category]} mt-4 animate-fade-up rounded-card border border-raised bg-surface/80 p-[clamp(20px,3vw,32px)] backdrop-blur-sm`}
          >
            {panels[open.id]!()}
          </div>
        )}
      </div>
    </>
  );
}

const cardBase =
  "group relative isolate flex h-full w-full cursor-pointer items-start gap-4 overflow-hidden rounded-card border bg-surface/80 p-5 text-left backdrop-blur-sm transition duration-300 hover:-translate-y-0.5 hover:border-(--tone) sm:p-6";

/** Soft glow in the card's tone from its top-left corner, brighter on hover or while open. */
const glow =
  "pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_15%_0%,color-mix(in_srgb,var(--tone)_12%,transparent),transparent_60%)] transition-opacity duration-500";

function OptionCard({
  option,
  isOpen,
  onToggle,
}: {
  option: ContactOption;
  isOpen: boolean;
  onToggle: (id: ContactOptionId) => void;
}) {
  const { icon: Icon, title, text, href } = option;
  const TrailIcon = href ? ArrowUpRight : ChevronDown;

  const content = (
    <>
      <span
        aria-hidden="true"
        className={`${glow} ${isOpen ? "opacity-100" : "opacity-40 group-hover:opacity-100"}`}
      />
      <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--tone)_14%,transparent)] text-(--tone)">
        <Icon size={21} strokeWidth={1.8} aria-hidden="true" />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block font-display text-[19px] leading-tight font-semibold tracking-[-0.02em]">
          {title}
        </span>
        <span className="mt-1.5 block text-[15px] text-muted">{text}</span>
      </span>
      <TrailIcon
        size={18}
        strokeWidth={2}
        aria-hidden="true"
        className={`mt-1 shrink-0 text-muted transition duration-300 group-hover:text-(--tone) ${
          href
            ? "group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            : isOpen
              ? "rotate-180 text-(--tone)"
              : ""
        }`}
      />
    </>
  );

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={`${cardBase} border-raised`}>
        {content}
      </a>
    );
  }

  return (
    <button
      type="button"
      onClick={() => onToggle(option.id)}
      aria-expanded={isOpen}
      aria-controls={isOpen ? `contact-panel-${option.id}` : undefined}
      className={`${cardBase} ${isOpen ? "border-(--tone)" : "border-raised"}`}
    >
      {content}
    </button>
  );
}
