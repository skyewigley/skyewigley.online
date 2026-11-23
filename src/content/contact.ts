import { CalendarDays, Mail, MessageSquareText, Share2, type LucideIcon } from "lucide-react";
import {
  siDiscord,
  siGithub,
  siInstagram,
  siUpwork,
  siWhatsapp,
  siYoutube,
  type SimpleIcon,
} from "simple-icons";
import { siteConfig } from "@/config/site";
import type { ProjectCategory } from "./projects";

/** The closing section on the home and projects pages. */
export const contactCta = {
  title: ["Something to automate,", "or a problem to solve?"],
  text: "Tell me what you're trying to do. I'll tell you honestly whether I can build it.",
  primaryLabel: "Get in touch",
  bookingLabel: "Book a call",
};

/** The /contact page. */
export const contactHeading = {
  eyebrow: "Contact",
  title: "Let's talk.",
  intro: "Pick whatever's easiest. I usually reply within a day.",
};

export type ContactOptionId = "message" | "details" | "socials" | "call";

export type ContactOption = {
  id: ContactOptionId;
  title: string;
  text: string;
  icon: LucideIcon;
  /** Picks the card's tone, the same palette as /projects. */
  category: ProjectCategory;
  /** Set for options that leave the page (booking) instead of opening a panel. */
  href?: string;
};

export const contactOptions: ContactOption[] = [
  {
    id: "message",
    title: "Send me a message",
    text: "Tell me what you need. I'll reply by email.",
    icon: MessageSquareText,
    category: "ai",
  },
  {
    id: "details",
    title: "Contact details",
    text: "Email, WhatsApp or Discord, whichever you prefer.",
    icon: Mail,
    category: "tools",
  },
  {
    id: "socials",
    title: "My socials",
    text: "See what I'm building and how I work.",
    icon: Share2,
    category: "web",
  },
  {
    id: "call",
    title: "Book a call",
    text: "30 minutes to talk through your problem.",
    icon: CalendarDays,
    category: "automation",
    href: siteConfig.bookingUrl,
  },
].filter((option) => option.id !== "call" || option.href) as ContactOption[];

export type ContactChannel = {
  label: string;
  value: string;
  icon: LucideIcon | SimpleIcon;
  /** Opens this link; channels without one are copy-only. */
  href?: string;
};

/** Direct ways to reach me. Each is hidden when its env value is empty. */
export const contactDetails: ContactChannel[] = [
  {
    label: "Email",
    value: siteConfig.email,
    icon: Mail,
    href: siteConfig.email ? `mailto:${siteConfig.email}` : undefined,
  },
  { label: "WhatsApp", value: siteConfig.whatsapp, icon: siWhatsapp },
  { label: "Discord", value: siteConfig.discord, icon: siDiscord },
].filter((channel) => channel.value);

const { github, youtube, instagram, upwork } = siteConfig.socials;

/** "@name" from a profile URL like https://github.com/name or https://youtube.com/@name. */
function handleOf(url: string): string {
  const last = url.replace(/\/+$/, "").split("/").pop() ?? "";
  return last ? `@${last.replace(/^@/, "")}` : "";
}

/** Profiles. Each is hidden when its env value is empty. */
export const contactSocials: ContactChannel[] = [
  { label: "Upwork", value: "Hire me on Upwork", icon: siUpwork, href: upwork },
  { label: "GitHub", value: handleOf(github), icon: siGithub, href: github },
  { label: "YouTube", value: handleOf(youtube), icon: siYoutube, href: youtube },
  { label: "Instagram", value: handleOf(instagram), icon: siInstagram, href: instagram },
].filter((channel) => channel.href);

export const contactForm = {
  title: "Send me a message",
  nameLabel: "Name",
  emailLabel: "Email",
  messageLabel: "Message",
  messagePlaceholder: "What are you trying to solve or automate?",
  submitLabel: "Send message",
  sendingLabel: "Sending",
  sentTitle: "Message sent.",
  sentText: "Thanks. I'll get back to you by email, usually within a day.",
  errorText: "That didn't send. Try again, or email me directly at",
};
