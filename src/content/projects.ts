/*
 * The full project catalogue shown on /projects. Everything here was built in the last year.
 * Client names and data stay private: client work has no link unless the client has agreed.
 */
import {
  AudioLines,
  Blocks,
  BrainCircuit,
  Cable,
  ChartNoAxesCombined,
  Cloud,
  Gamepad2,
  Globe,
  ListChecks,
  Mail,
  MailSearch,
  MessageCircle,
  MessagesSquare,
  Newspaper,
  Receipt,
  ScanLine,
  Send,
  Server,
  ShoppingBag,
  SquareTerminal,
  Wallet,
  type LucideIcon,
} from "lucide-react";

/** Sets the card's tone (globals.css). */
export type ProjectCategory = "ai" | "automation" | "web" | "tools" | "hosting";

/**
 * A client review. Drafts are placeholders written to fill the layout: they only render in local
 * dev (with a "Draft" tag) and never in a production build. Replace the quote with the client's
 * real words, then set `verified: true` to publish it.
 */
export type Review = {
  quote: string;
  /** Role and company type, never a private name without permission. */
  author: string;
  /** Out of 5. */
  rating: number;
  verified: boolean;
};

export type Project = {
  name: string;
  category: ProjectCategory;
  icon: LucideIcon;
  /** My part in it, or who it was for. */
  context: string;
  /** One line, always visible on the card. */
  summary: string;
  /** Shown on hover / focus. Two or three short sentences. */
  details: string;
  /** A single concrete result, if there is one worth stating. */
  result?: string;
  stack: string[];
  /** Client projects only. */
  review?: Review;
  /**
   * Public link, "private" for confidential client work, or "private-repo" for my own code that
   * isn't public. Omit for none.
   */
  link?: { href: string; label: string } | "private" | "private-repo";
};

/** Anchor id for a project's card on /projects, e.g. "allminecraft-net". */
export function projectId(project: Pick<Project, "name">) {
  return project.name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export const projectsHeading = {
  eyebrow: "All projects · 2026",
  title: "Everything I've shipped this year.",
  intro:
    "Client work, my own products and open-source tools, all built in the last year. Where client work is confidential, I describe what I built, not who it was for.",
};

export const projects: Project[] = [
  {
    name: "VisionX",
    category: "ai",
    icon: BrainCircuit,
    context: "Co-founder · since 2024",
    summary: "AI agents and a secure dashboard for course owners and their communities.",
    details:
      "Student data from Discord, Whop, email and calls flows into one secure database, with production AI agents on top. Students get answers in seconds; owners see where people get stuck.",
    result: "15 production AI agents",
    stack: ["n8n", "PostgreSQL", "Claude", "Next.js"],
  },
  {
    name: "Finance automation",
    category: "automation",
    icon: Receipt,
    context: "Via a partner agency",
    summary: "Stripe and Revolut payments matched, invoiced in Xero and logged automatically.",
    details:
      "Each payment is matched to a customer, invoiced in Xero and logged to the books as it arrives. Anything that doesn't match goes to a review queue instead of being guessed.",
    result: "No manual entry",
    stack: ["n8n", "Stripe", "Revolut", "Xero"],
    review: {
      quote: "Payments just show up in Xero now. Saved us hours every week.",
      author: "Founder, digital agency",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "AllMinecraft.net",
    category: "web",
    icon: Blocks,
    context: "Solo build · since 2025",
    summary: "A community hub for sharing mods, shaders, servers and guides.",
    details:
      "Players share and discover mods, shaders, texture packs, servers and guides across 13 categories. Accounts, ranks, leaderboards and trending feeds keep people posting and coming back. I designed and built every part of it, and run the hosting and database myself.",
    result: "1,203 registered accounts",
    stack: ["Next.js", "PostgreSQL", "Docker", "Coolify"],
  },
  {
    name: "Outreach engine",
    category: "automation",
    icon: Send,
    context: "Own product",
    summary: "Finds potential clients, enriches the data and writes the first message.",
    details:
      "A self-hosted Next.js dashboard with Playwright scraping, cleaning and enrichment into PostgreSQL. n8n generates a personalised message for each lead and runs the outreach.",
    result: "30% reply rate, half of them positive",
    stack: ["Next.js", "PostgreSQL", "Playwright", "n8n"],
  },
  {
    name: "Email RAG agent",
    category: "ai",
    icon: MailSearch,
    context: "Client · rental business",
    summary: "An assistant built on 15+ years of a rental company's emails and records.",
    details:
      "Staff ask about a problem and get an answer grounded in past emails, or request a draft reply to finish and send. Live booking status comes from the company's API.",
    result: "15+ years of email, searchable",
    stack: ["RAG", "Claude", "PostgreSQL"],
    review: {
      quote: "Our team finds answers in seconds instead of digging through old emails.",
      author: "Owner, rental company",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "AutoClaude",
    category: "tools",
    icon: SquareTerminal,
    context: "Own product",
    summary: "A self-hostable service for running Claude Code tasks in the cloud.",
    details:
      "Connect Claude Code and GitHub, pick a repo and hand off a coding task. Agent, auto mode and other options are set per task, and each task runs in its own container. Work keeps moving while I'm away, ready to review when I'm back.",
    result: "Runs with the laptop closed",
    stack: ["Claude Code", "GitHub", "Docker"],
  },
  {
    name: "Auton8",
    category: "tools",
    icon: Gamepad2,
    context: "Own product",
    summary: "The first integration connecting Minecraft and n8n.",
    details:
      "A custom Java mod paired with Baritone lets n8n workflows drive in-game tasks. Players automate Minecraft with the same workflows a business uses for its processes.",
    stack: ["Java", "Baritone", "n8n"],
    link: { href: "https://www.youtube.com/watch?v=ClEU58Inbbk", label: "YouTube" },
  },
  {
    name: "K-Mail",
    category: "web",
    icon: Mail,
    context: "Own product",
    summary: "A self-hosted mail client running on Cloudflare's email services.",
    details:
      "I host a clean web interface and the database; Cloudflare handles sending and receiving. Reliable email for a small fee, without the cost and upkeep of a full mail server.",
    stack: ["Next.js", "PostgreSQL", "Cloudflare"],
    link: "private-repo",
  },
  {
    name: "S-Shot",
    category: "tools",
    icon: ScanLine,
    context: "Open source",
    summary: "A Chrome extension for crisp, full-page screenshots of any site or PDF.",
    details:
      "Scrolls the page, hides sticky headers, loads lazy content and stitches every viewport into one PNG, tagged with the right DPI for design work. No tracking, nothing leaves your machine.",
    stack: ["JavaScript", "Chrome MV3", "pdf.js"],
    link: { href: "https://github.com/skyewigley/S-Shot", label: "GitHub" },
  },
  {
    name: "Whop apps",
    category: "web",
    icon: ShoppingBag,
    context: "Multiple clients",
    summary: "Custom Whop apps for paid communities, built, hosted and maintained.",
    details:
      "From simple onboarding flows to Discord account linking and member tracking. Each one is built around how that community runs, and I keep them online and up to date.",
    stack: ["Whop API", "Discord", "Next.js", "PostgreSQL"],
    review: {
      quote: "Onboarding finally runs itself. Quick to fix anything we raised.",
      author: "Community owner, Whop",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "Course gap finder",
    category: "ai",
    icon: ListChecks,
    context: "Multiple clients",
    summary: "Shows course owners what their content is missing.",
    details:
      "Analyses course material against the questions students ask most and where they get stuck, then suggests topics to add or rework. Built, hosted and maintained for several courses.",
    stack: ["n8n", "Claude", "PostgreSQL"],
    review: {
      quote: "Showed us exactly which lessons needed work. Really useful.",
      author: "Course creator",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "Student progress tracker",
    category: "ai",
    icon: ChartNoAxesCombined,
    context: "Multiple clients",
    summary: "Regular check-ins that show who's excelling and who needs help.",
    details:
      "Analyses student progress and check-in answers, then notifies admins on a custom dashboard with a short summary of where each student could use support.",
    stack: ["n8n", "Claude", "Next.js", "PostgreSQL"],
    review: {
      quote: "We spot students who are struggling before they drop off.",
      author: "Program manager, online course",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "Website chat agents",
    category: "ai",
    icon: MessageCircle,
    context: "Multiple clients",
    summary: "AI chat agents that answer visitors' questions on the spot.",
    details:
      "Built and hosted chat agents for several websites, answering from each site's own content. Visitors get quick answers and support teams get fewer repeat questions.",
    stack: ["RAG", "Claude", "n8n"],
    review: {
      quote: "Fewer repeat support tickets from week one. Great work.",
      author: "Operations lead, e-commerce",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "Voice agents",
    category: "ai",
    icon: AudioLines,
    context: "Multiple clients",
    summary: "Voice agents for websites and social media automation.",
    details:
      "Multiple voice agents built on ElevenLabs, connected to each client's own data and workflows so they can hold real conversations, not just read a script.",
    stack: ["ElevenLabs", "n8n", "Webhooks"],
    review: {
      quote: "Sounds natural and handles the common questions well. Very happy.",
      author: "Marketing lead, service business",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "CRM integrations",
    category: "automation",
    icon: Cable,
    context: "Multiple clients",
    summary: "Custom Salesforce and CRM integrations, built and hosted.",
    details:
      "Connected Salesforce and other CRMs to the tools sales teams already use, with custom hosted services where no integration existed. Less manual entry and fewer gaps between systems.",
    stack: ["Salesforce", "REST APIs", "n8n"],
    review: {
      quote: "Our CRM and tools finally stay in sync. Clear communication throughout.",
      author: "Sales manager, B2B services",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "KHost",
    category: "web",
    icon: Globe,
    context: "Client",
    summary: "A Next.js website for a hosting business, run on my infrastructure.",
    details:
      "Designed and built the site, then deployed it on my own servers. I look after hosting, updates and uptime, so the client doesn't have to.",
    stack: ["Next.js", "Docker", "Coolify", "Cloudflare"],
    review: {
      quote: "Great site, fast and always up. Easy to work with.",
      author: "Owner, KHost",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "Skillslink",
    category: "hosting",
    icon: Server,
    context: "Client",
    summary: "WordPress hosting and management, plus n8n automations.",
    details:
      "I run their WordPress site and database, and built n8n automations aimed at the real bottlenecks in their day-to-day operations.",
    stack: ["WordPress", "MySQL", "n8n"],
    review: {
      quote: "Solid hosting and the automations removed real bottlenecks for us.",
      author: "Director, Skillslink",
      rating: 5,
      verified: false,
    },
    link: "private",
  },
  {
    name: "mc-hacks",
    category: "web",
    icon: Newspaper,
    context: "Solo build",
    summary: "A Next.js site and front end for blog posts and gaming content.",
    details:
      "Designed, built and hosted the site end to end: a fast, search-friendly front end for articles, guides and gaming content. It runs on my own infrastructure and stays quick under heavy traffic.",
    result: "2 million+ visitors",
    stack: ["Next.js", "Docker", "Coolify"],
  },
  {
    name: "Discord apps",
    category: "web",
    icon: MessagesSquare,
    context: "Gaming communities",
    summary: "12 custom Discord apps for gaming communities, including Dead by Daylight groups.",
    details:
      "Each one built around what that community needed, and all 12 run around the clock on my own infrastructure.",
    result: "12 apps, self-hosted",
    stack: ["Discord API", "Docker", "Coolify"],
    review: {
      quote: "Exactly what our community needed, and it never goes down.",
      author: "Server admin, gaming community",
      rating: 5,
      verified: false,
    },
  },
  {
    name: "Personal finance flow",
    category: "automation",
    icon: Wallet,
    context: "Own use",
    summary: "An n8n flow that keeps my own books up to date.",
    details:
      "Logs revenue and expenses to spreadsheets as they happen, sorted into categories so nothing piles up at month end. A monthly summary shows what came in, what went out and where it went. Self-hosted on my own n8n.",
    result: "Books stay current, hands-off",
    stack: ["n8n", "Spreadsheets", "Notifications"],
  },
  {
    name: "Minecraft servers",
    category: "hosting",
    icon: Cloud,
    context: "Own infrastructure",
    summary: "Minecraft servers for friend groups, communities and mod testing.",
    details:
      "Everything from SMPs for groups of friends to test servers for client and server mods. Test servers run several Minecraft versions side by side, so a mod can be checked against each one. All set up and run on my own hosting.",
    result: "SMPs to multi-version testing",
    stack: ["Linux VPS", "Docker"],
  },
];

