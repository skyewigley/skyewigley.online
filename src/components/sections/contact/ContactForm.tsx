"use client";

import { CircleCheck, Send } from "lucide-react";
import { useState, type FormEvent } from "react";
import { ArrowPillButton } from "@/components/ui/ArrowPillLink";
import { siteConfig } from "@/config/site";
import { contactForm } from "@/content/contact";

type Status = "idle" | "sending" | "sent" | "error";

const field =
  "mt-2 w-full rounded-[14px] border border-raised bg-ink/70 px-4 py-3 text-base text-fg sm:text-[15px] transition-colors duration-200 outline-none placeholder:text-edge hover:border-edge focus:border-accent";

/**
 * Name, email and message, POSTed as JSON to the webhook in NEXT_PUBLIC_CONTACT_WEBHOOK_URL.
 * The checks here are only for the visitor's convenience: the static site has no server, so the
 * receiving workflow must validate the payload and drop anything with the `company` honeypot set.
 */
export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    setStatus("sending");

    try {
      if (!siteConfig.contactWebhookUrl) throw new Error("No webhook configured");
      const response = await fetch(siteConfig.contactWebhookUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? "").trim(),
          email: String(data.get("email") ?? "").trim(),
          message: String(data.get("message") ?? "").trim(),
          company: String(data.get("company") ?? ""),
          page: window.location.href,
        }),
      });
      if (!response.ok) throw new Error(`Webhook responded ${response.status}`);
      form.reset();
      setStatus("sent");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div role="status" className="flex items-start gap-4">
        <span className="grid size-11 shrink-0 place-items-center rounded-[12px] bg-accent/15 text-accent">
          <CircleCheck size={21} strokeWidth={1.8} aria-hidden="true" />
        </span>
        <div>
          <p className="font-display text-[22px] leading-tight font-semibold tracking-[-0.02em]">
            {contactForm.sentTitle}
          </p>
          <p className="mt-1.5 text-[15px] text-muted">{contactForm.sentText}</p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-5 sm:grid-cols-2">
      <label className="eyebrow block">
        {contactForm.nameLabel}
        <input
          name="name"
          type="text"
          required
          maxLength={120}
          autoComplete="name"
          className={`${field} font-sans normal-case tracking-normal`}
        />
      </label>
      <label className="eyebrow block">
        {contactForm.emailLabel}
        <input
          name="email"
          type="email"
          required
          maxLength={254}
          autoComplete="email"
          className={`${field} font-sans normal-case tracking-normal`}
        />
      </label>
      <label className="eyebrow block sm:col-span-2">
        {contactForm.messageLabel}
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={5000}
          rows={6}
          placeholder={contactForm.messagePlaceholder}
          className={`${field} resize-y font-sans normal-case tracking-normal`}
        />
      </label>

      {/* Honeypot: hidden from people, filled in by spam scripts. */}
      <div aria-hidden="true" className="absolute -left-[9999px]">
        <label>
          Company
          <input name="company" type="text" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="flex flex-wrap items-center gap-x-6 gap-y-3 sm:col-span-2">
        <ArrowPillButton type="submit" variant="solid" icon={Send} disabled={status === "sending"}>
          {status === "sending" ? contactForm.sendingLabel : contactForm.submitLabel}
        </ArrowPillButton>
        {status === "error" && (
          <p role="alert" className="text-[14px] text-tone-rose">
            {contactForm.errorText}{" "}
            <a href={`mailto:${siteConfig.email}`} className="text-fg underline underline-offset-4">
              {siteConfig.email}
            </a>
            .
          </p>
        )}
      </div>
    </form>
  );
}
