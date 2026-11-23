/**
 * "How I work": what happens from the first message to long after launch.
 *
 * Each step has a small animated scene. Together they follow one example project (a payments →
 * Xero automation) through all four stages. The scenes play in turn, left to right, on a loop.
 */

export const processHeading = {
  eyebrow: "How I work",
  title: "You'll always know where things stand.",
  intro: "From the first message to long after launch, this is what working together looks like.",
};

export type ChatScene = {
  kind: "chat";
  title: string;
  messages: { from: "client" | "me"; text: string }[];
};

export type PlanScene = {
  kind: "plan";
  title: string;
  rows: { label: string; value: string }[];
};

export type TestScene = {
  kind: "test";
  title: string;
  checks: string[];
};

export type LiveScene = {
  kind: "live";
  title: string;
  status: string;
  /** Uptime strip caption, e.g. "30 days · no downtime". */
  uptime: string;
  /** Recent activity, newest first: what keeping it running actually looks like. */
  events: { label: string; value: string }[];
};

export type ProcessStep = {
  title: string;
  text: string;
  scene: ChatScene | PlanScene | TestScene | LiveScene;
};

export const processSteps: ProcessStep[] = [
  {
    title: "We talk it through",
    text: "Tell me what's slowing you down. I dig into the details early, so there are no surprises.",
    scene: {
      kind: "chat",
      title: "Messages",
      messages: [
        { from: "client", text: "Month-end invoicing takes us a full day." },
        { from: "me", text: "What happens when a payment doesn't match?" },
      ],
    },
  },
  {
    title: "You get a plan and a price",
    text: "What I'll build, how long it takes and what it costs, in writing before any work starts.",
    scene: {
      kind: "plan",
      title: "Proposal",
      rows: [
        { label: "Scope", value: "Payments → Xero" },
        { label: "Timeline", value: "3 weeks" },
        { label: "Price", value: "Agreed upfront" },
      ],
    },
  },
  {
    title: "I build, you see it working",
    text: "A working version early, updates as it grows, and everything tested before it goes live.",
    scene: {
      kind: "test",
      title: "Test run",
      checks: ["Payments matched", "Invoices created", "Mismatches flagged"],
    },
  },
  {
    title: "It keeps running",
    text: "Hosting, fixes and changes on a monthly plan, so it keeps up as your business grows.",
    scene: {
      kind: "live",
      title: "Monitoring",
      status: "Live",
      uptime: "30 days · no downtime",
      events: [
        { label: "Invoices synced today", value: "42" },
        { label: "Change request", value: "Shipped" },
      ],
    },
  },
];
