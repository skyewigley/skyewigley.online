/*
 * Selected work. All visual data below is made up: client names and data stay private.
 * Each visual is a small scene of two cards: the main view and one overlapping card.
 */
import {
  Bot,
  BrainCircuit,
  CalendarCheck,
  CirclePlay,
  FileText,
  GitMerge,
  Inbox,
  LayoutDashboard,
  ListChecks,
  Mail,
  MailSearch,
  MessagesSquare,
  PenLine,
  Repeat,
  Sheet,
  ShieldCheck,
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

/** Email RAG: staff ask about a case and get an answer from past emails, plus a draft reply. */
export type EmailAssistantVisual = {
  kind: "email-assistant";
  title: string;
  question: string;
  answer: { text: string; sources: { icon: LucideIcon; label: string }[] };
  draft: { label: string; booking: string; lines: string[] };
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
  visual: StudentSupportVisual | EmailAssistantVisual | PaymentToInvoiceVisual | CommunityHubVisual;
  /** Only set once a real case study exists. */
  caseStudyUrl?: string;
};

export const workHeading = {
  eyebrow: "Selected work",
  title: "Recent projects.",
  intro:
    "Not everything I've built, just three that show the range: AI agents that run support for course businesses, 15 years of email turned into answers, and books that update themselves.",
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
      { icon: Repeat, label: "Every client on a monthly retainer" },
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
    name: "Email RAG agent",
    role: "Client · rental business",
    tone: "violet",
    title: "15 years of email. Answers in seconds.",
    summary:
      "A rental company's know-how was buried in 15+ years of email. Now staff ask a question and get an answer from past cases, or a draft reply to finish and send.",
    highlights: [
      { icon: MailSearch, value: "15+ years", label: "of email, searchable" },
      { icon: CalendarCheck, label: "Live booking status" },
      { icon: PenLine, label: "Drafts, sent by staff" },
    ],
    built: [
      { icon: Inbox, label: "Email ingestion" },
      { icon: BrainCircuit, label: "RAG agent" },
      { icon: CalendarCheck, label: "Booking API link" },
      { icon: PenLine, label: "Reply drafts" },
    ],
    stack: ["RAG", "Claude", "PostgreSQL"],
    visual: {
      kind: "email-assistant",
      title: "Ask the inbox",
      question: "Customer says the unit arrived damaged. How did we handle this last time?",
      answer: {
        text: "Two similar cases, in 2021 and 2023. Both times we asked for photos within 48 hours, then offered a partial refund or a swap.",
        sources: [
          { icon: Mail, label: "Re: Damaged on arrival · 2023" },
          { icon: Mail, label: "Re: Unit condition · 2021" },
        ],
      },
      draft: {
        label: "Draft",
        booking: "#4821",
        lines: [
          "Sorry to hear the unit arrived damaged.",
          "Could you send a few photos? We'll sort a swap or refund today.",
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
];
