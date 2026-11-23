/*
 * Selected work. All visual data below is made up: client names and data stay private.
 * Each visual is a small scene of two cards: the main view and one overlapping card.
 */
import {
  BookOpen,
  Bot,
  BrainCircuit,
  CirclePlay,
  FileText,
  Flame,
  GitMerge,
  KeyRound,
  LayoutDashboard,
  LayoutGrid,
  ListChecks,
  MessagesSquare,
  Palette,
  Repeat,
  Server,
  Sheet,
  ShieldCheck,
  Sparkles,
  Trophy,
  UserRound,
  Users,
  Workflow,
  Zap,
  type LucideIcon,
} from "lucide-react";

/** VisionX: an agent answering a student in Discord, and an insight for the course owner. */
export type StudentSupportVisual = {
  kind: "student-support";
  channel: string;
  question: { name: string; text: string };
  answer: { name: string; text: string; sources: { icon: LucideIcon; label: string }[] };
  insight: {
    label: string;
    value: string;
    caption: string;
    /** Most-asked topics, largest first. */
    topics: { label: string; count: number }[];
  };
};

/** Finance: a payment notification and the invoice it became. */
export type PaymentToInvoiceVisual = {
  kind: "payment-to-invoice";
  payment: { source: string; time: string; amount: string; from: string; matched: string };
  invoice: {
    number: string;
    billedTo: string;
    lines: { item: string; amount: string }[];
    total: string;
    status: string;
  };
};

/** AllMinecraft: trending content posts and the user leaderboard. */
export type CommunityHubVisual = {
  kind: "community-hub";
  tabs: string[];
  activeTab: number;
  posts: {
    title: string;
    category: string;
    icon: LucideIcon;
    version: string;
    author: string;
    views: string;
    comments: number;
  }[];
  leaders: { name: string; points: string }[];
};

/** Each project gets its own colour (tokens in globals.css). */
export type Tone = "teal" | "amber" | "violet";

export type Highlight = { icon: LucideIcon; value?: string; label: string };
export type BuiltItem = { icon: LucideIcon; label: string };

export type CaseStudy = {
  name: string;
  /** My part in it, shown next to the name. */
  role: string;
  tone: Tone;
  title: string;
  /** Problem and what changed, in two short sentences. */
  summary: string;
  highlights: Highlight[];
  built: BuiltItem[];
  /** Shown as a caption on the visual. */
  stack: string[];
  visual: StudentSupportVisual | PaymentToInvoiceVisual | CommunityHubVisual;
  /** Only set once a real case study exists. */
  caseStudyUrl?: string;
};

export const workHeading = {
  eyebrow: "Selected work",
  title: "Recent projects.",
  intro:
    "A few recent builds, not everything I've worked on. Picked to show the range: AI agents, finance automation and a full web platform.",
  /** Link to /projects, which lists this year's work only (not every project ever). */
  allProjectsLabel: "More from this year",
};

export const caseStudies: CaseStudy[] = [
  {
    name: "VisionX",
    role: "Co-founder",
    tone: "teal",
    title: "Answers for students. Insight for course owners.",
    summary:
      "Course owners had student data spread across Discord, Whop, email and calls. I pulled it into one secure database and put AI agents on top.",
    highlights: [
      { icon: Bot, value: "15", label: "production AI agents" },
      { icon: Users, value: "1,000s", label: "of real users" },
      { icon: Repeat, label: "Run on a monthly retainer" },
    ],
    built: [
      { icon: Workflow, label: "Data pipelines" },
      { icon: BrainCircuit, label: "RAG agents" },
      { icon: MessagesSquare, label: "Discord & Whop apps" },
      { icon: LayoutDashboard, label: "Secure dashboard" },
    ],
    stack: ["n8n", "PostgreSQL", "Claude", "Next.js"],
    visual: {
      kind: "student-support",
      channel: "ask-the-course",
      question: { name: "Jordan", text: "Where's the pricing template from week 3?" },
      answer: {
        name: "Course Assistant",
        text: "Module 3, Lesson 4, “Pricing your offer”. The template is linked under the video.",
        sources: [
          { icon: CirclePlay, label: "Module 3 · Lesson 4" },
          { icon: FileText, label: "pricing-template.pdf" },
        ],
      },
      insight: {
        label: "Most asked · This month",
        value: "1,240",
        caption: "questions answered",
        topics: [
          { label: "Pricing your offer", count: 312 },
          { label: "Finding first clients", count: 241 },
          { label: "Ad account setup", count: 167 },
        ],
      },
    },
  },
  {
    name: "Finance automation",
    role: "Via a partner agency",
    tone: "amber",
    title: "Payments in. Invoices out.",
    summary:
      "Every Stripe and Revolut payment was matched, invoiced in Xero and logged by hand. Now it happens as payments arrive.",
    highlights: [
      { icon: Zap, label: "No manual entry" },
      { icon: ShieldCheck, label: "Mismatches flagged, not guessed" },
    ],
    built: [
      { icon: GitMerge, label: "Payment matching" },
      { icon: FileText, label: "Xero invoicing" },
      { icon: Sheet, label: "Spreadsheet sync" },
      { icon: ListChecks, label: "Review queue" },
    ],
    stack: ["n8n", "Stripe", "Revolut", "Xero"],
    visual: {
      kind: "payment-to-invoice",
      payment: {
        source: "Revolut",
        time: "09:38",
        amount: "$1,150.00",
        from: "Northside Studio",
        matched: "Matched to customer",
      },
      invoice: {
        number: "INV-0411",
        billedTo: "Northside Studio",
        lines: [
          { item: "Monthly retainer", amount: "$1,000.00" },
          { item: "Extra support hours", amount: "$150.00" },
        ],
        total: "$1,150.00",
        status: "Paid",
      },
    },
  },
  {
    name: "AllMinecraft.net",
    role: "Solo build",
    tone: "violet",
    title: "A community hub, built and run solo.",
    summary:
      "A content hub where players share and find mods, shaders, servers and guides, with accounts, ranks and leaderboards. I built every part of it and run the hosting.",
    highlights: [
      { icon: UserRound, value: "1,203", label: "registered accounts" },
      { icon: LayoutGrid, value: "13", label: "content categories" },
    ],
    built: [
      { icon: KeyRound, label: "Accounts & ranks" },
      { icon: Trophy, label: "Leaderboards" },
      { icon: Flame, label: "Trending feeds" },
      { icon: Server, label: "Self-hosted" },
    ],
    stack: ["Next.js", "Docker", "Coolify"],
    visual: {
      kind: "community-hub",
      tabs: ["New", "Trending", "Featured"],
      activeTab: 1,
      posts: [
        {
          title: "Low-end shader setup",
          category: "Shader Packs",
          icon: Sparkles,
          version: "MC 1.21.1",
          author: "aster",
          views: "4.3K",
          comments: 12,
        },
        {
          title: "32x night texture pack",
          category: "Texture Packs",
          icon: Palette,
          version: "MC 1.21.4",
          author: "pip",
          views: "1.2K",
          comments: 7,
        },
        {
          title: "Fabric server setup guide",
          category: "Guides",
          icon: BookOpen,
          version: "MC 1.21.1",
          author: "moss",
          views: "318",
          comments: 4,
        },
      ],
      leaders: [
        { name: "aster", points: "9,840" },
        { name: "moss", points: "7,215" },
        { name: "pip", points: "5,602" },
      ],
    },
  },
];
