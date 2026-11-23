import {
  BrainCircuit,
  BriefcaseBusiness,
  Clock,
  History,
  MapPin,
  Users,
  type LucideIcon,
} from "lucide-react";

export const about = {
  eyebrow: "About",
  /** `{firstName}` is replaced with the first word of your name from the env. */
  title: "Hi, I'm {firstName}.",
  /** Two short paragraphs. */
  body: [
    "Laid back, but I like things done properly. I build automations, AI agents and the platforms around them: finance workflows, RAG agents trained on years of business data, and full web apps I host and run myself. Most of it starts as a problem with no off-the-shelf answer.",
    "I plan the whole system before anything gets built: how it connects, what it affects and how it stays secure. I use Claude Code every day to build faster, but the architecture and the decisions stay mine. Everything is reviewed and tested before it ships, and I keep it running after.",
  ],
  /**
   * Portrait image path under /public, e.g. "/images/portrait.jpg".
   * Leave empty to show the placeholder.
   */
  portrait: "/images/portrait.jpg",
};

export type Stat = {
  icon: LucideIcon;
  /** Animated count-up target. Omit to show `text` as-is. */
  value?: number;
  prefix?: string;
  suffix?: string;
  text?: string;
  /** Keep these short and similar in length so the row stays even. */
  label: string;
};

/** Headline numbers, shown under the About body. */
export const stats: Stat[] = [
  { icon: History, value: 8, suffix: "+", label: "Years of experience" },
  { icon: BrainCircuit, value: 100, suffix: "+", label: "Deployed agents" },
  { icon: Users, text: "1,000s", label: "Of active users" },
];

export const facts: { icon: LucideIcon; label: string; value: string }[] = [
  { icon: MapPin, label: "Based in", value: "South Africa" },
  { icon: Clock, label: "Hours", value: "Flexible, currently US hours" },
  { icon: BriefcaseBusiness, label: "Open to", value: "Freelance, contract & full-time" },
];

/** Scrollable row of projects under the About text; each links to its card on /projects. */
export const projectStrip = {
  title: "Built in the last year",
  linkLabel: "All projects",
};
