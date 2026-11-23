"use client";

import { ArrowUpRight, Check, Copy } from "lucide-react";
import { useState } from "react";
import { BrandIcon } from "@/components/ui/BrandIcon";
import type { ContactChannel } from "@/content/contact";

/** Rows of channels: an icon in the panel's tone, label and value, then open and/or copy. */
export function ChannelList({ channels }: { channels: ContactChannel[] }) {
  return (
    <ul className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
      {channels.map((channel) => (
        <ChannelRow key={channel.label} channel={channel} />
      ))}
    </ul>
  );
}

function ChannelRow({ channel }: { channel: ContactChannel }) {
  const { label, value, href, icon } = channel;
  const external = href?.startsWith("http");

  const body = (
    <>
      <span className="grid size-10 shrink-0 place-items-center rounded-[12px] bg-[color-mix(in_srgb,var(--tone)_12%,transparent)] text-(--tone) transition-colors duration-200 group-hover/row:bg-[color-mix(in_srgb,var(--tone)_22%,transparent)]">
        {"path" in icon ? (
          <BrandIcon icon={icon} size={17} />
        ) : (
          (() => {
            const Icon = icon;
            return <Icon size={18} strokeWidth={1.8} aria-hidden="true" />;
          })()
        )}
      </span>
      <span className="min-w-0">
        <span className="eyebrow block text-[11px]">{label}</span>
        <span className="block truncate text-[15px] text-fg">{value}</span>
      </span>
    </>
  );

  return (
    <li className="group/row flex items-center gap-3 border-b border-raised/60 py-3.5">
      {href ? (
        <a
          href={href}
          className="flex min-w-0 flex-1 items-center gap-4"
          {...(external && { target: "_blank", rel: "noopener noreferrer" })}
        >
          {body}
          <ArrowUpRight
            size={16}
            strokeWidth={2}
            className="ml-auto shrink-0 text-muted transition duration-200 group-hover/row:-translate-y-0.5 group-hover/row:translate-x-0.5 group-hover/row:text-(--tone)"
            aria-hidden="true"
          />
        </a>
      ) : (
        <div className="flex min-w-0 flex-1 items-center gap-4">{body}</div>
      )}
      {!external && <CopyButton value={value} label={label} />}
    </li>
  );
}

function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    } catch {
      // Clipboard blocked (e.g. insecure context): the value is still visible to copy by hand.
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      className="grid size-9 shrink-0 cursor-pointer place-items-center rounded-full text-muted transition-colors duration-200 hover:bg-raised hover:text-fg"
    >
      {copied ? (
        <Check size={15} strokeWidth={2} className="text-(--tone)" aria-hidden="true" />
      ) : (
        <Copy size={15} strokeWidth={1.8} aria-hidden="true" />
      )}
    </button>
  );
}
