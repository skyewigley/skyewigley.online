import {
  Atom,
  AudioLines,
  Bot,
  BrainCircuit,
  Cable,
  Cloud,
  Container,
  CreditCard,
  Database,
  HardDrive,
  Layers,
  LayoutDashboard,
  Library,
  MessagesSquare,
  Network,
  Palette,
  Rocket,
  Server,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  SquareTerminal,
  Webhook,
  Workflow,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import type { ProjectCategory } from "./projects";

export const servicesHeading = {
  eyebrow: "What I do",
  title: "The kind of work I take on.",
  intro:
    "Most of my work starts with something no off-the-shelf tool does. I work out what's really needed, build it properly and keep it running. It usually lands in one of these.",
};

/** Clicking a service card opens the contact page. */
export const serviceCardHref = "/contact";

export type Service = {
  title: string;
  text: string;
  /** Sets the tone, matching the project categories on /projects. */
  category: ProjectCategory;
  icon: LucideIcon;
  /** Project names from projects.ts; each links to its card on /projects. */
  examples: string[];
};

export const services: Service[] = [
  {
    title: "AI agents & RAG",
    text: "Agents that answer from your own data, like years of emails, course content or docs. In Discord, on your site, by voice or in a dashboard.",
    category: "ai",
    icon: BrainCircuit,
    examples: ["VisionX", "Email RAG agent", "Voice agents"],
  },
  {
    title: "Automation & integrations",
    text: "Workflows that take repeat work off your team: payments into Xero, leads into outreach, CRMs kept in sync. If two tools don't connect, I build the bridge.",
    category: "automation",
    icon: Workflow,
    examples: ["Finance automation", "Outreach engine", "CRM integrations"],
  },
  {
    title: "Web apps & dashboards",
    text: "Full platforms, client sites and secure dashboards, designed and built end to end.",
    category: "web",
    icon: LayoutDashboard,
    examples: ["AllMinecraft.net", "mc-hacks", "Whop apps"],
  },
  {
    title: "Tools that don't exist yet",
    text: "When nothing on the market does the job, I make it: browser extensions, dev tools, even a bridge between Minecraft and n8n.",
    category: "tools",
    icon: Wrench,
    examples: ["AutoClaude", "S-Shot", "Auton8"],
  },
  {
    title: "Hosting & upkeep",
    text: "I host what I build on my own servers and keep it updated and online long after launch.",
    category: "hosting",
    icon: Server,
    examples: ["KHost", "Discord apps", "Minecraft servers"],
  },
];

/** The last card: the open invitation for anything that doesn't fit above. */
export const otherService = {
  title: "Not on the list?",
  text: "Some of my best work didn't fit a category. Tell me the problem anyway. If I can't build it, I'll say so.",
  linkLabel: "Tell me about it",
  href: "/contact#message",
};

export const stackHeading = {
  eyebrow: "My stack",
  title: "The tools I build and ship with.",
  intro: "My defaults, not my limits. If your team already runs something else, I'm happy to pick it up and work in that.",
};

export type StackItem = { label: string; icon: LucideIcon };

export type StackGroup = {
  label: string;
  category: ProjectCategory;
  icon: LucideIcon;
  items: StackItem[];
};

export const stack: StackGroup[] = [
  {
    label: "Automation & AI",
    category: "ai",
    icon: Sparkles,
    items: [
      { label: "n8n", icon: Workflow },
      { label: "Claude Code", icon: SquareTerminal },
      { label: "RAG systems", icon: Library },
      { label: "AI agents", icon: Bot },
      { label: "Voice & transcription", icon: AudioLines },
    ],
  },
  {
    label: "Data & integrations",
    category: "automation",
    icon: Cable,
    items: [
      { label: "PostgreSQL", icon: Database },
      { label: "REST APIs & webhooks", icon: Webhook },
      { label: "Stripe", icon: CreditCard },
      { label: "Discord apps", icon: MessagesSquare },
      { label: "Whop apps", icon: ShoppingBag },
    ],
  },
  {
    label: "Infrastructure",
    category: "hosting",
    icon: Server,
    items: [
      { label: "Docker & Compose", icon: Container },
      { label: "Coolify", icon: Rocket },
      { label: "Linux VPS", icon: HardDrive },
      { label: "Reverse proxies", icon: Network },
      { label: "Cloudflare · DNS · R2", icon: Cloud },
    ],
  },
  {
    label: "Frontend",
    category: "web",
    icon: LayoutDashboard,
    items: [
      { label: "Next.js", icon: Layers },
      { label: "React", icon: Atom },
      { label: "Tailwind CSS", icon: Palette },
      { label: "Auth & dashboards", icon: ShieldCheck },
    ],
  },
];

/** Tools outside the main stack. */
export const alsoUsed = {
  label: "Also worked with",
  items: [
    "OpenAI",
    "Codex",
    "ElevenLabs",
    "Java",
    "WordPress",
    "MySQL",
    "Salesforce",
    "Playwright",
    "Chrome extensions",
  ],
};
