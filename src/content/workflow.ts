/**
 * The example workflows in the hero diagram (phones get a vertical version, one row per stage).
 *
 * Each workflow is a small graph on a fixed 940×330 canvas: nodes are placed
 * by their centre (`x`, `y` in px) and `edges` connect them. Data dots travel
 * the edges in order; a node's stage is worked out from its incoming edges
 * unless `stage` is set. Each workflow plays one pass, holds briefly, then
 * rotates to the next.
 */

export type FlowNodeKind =
  /** Source or output: icon and label inside a pill. Needs a width `w`. */
  | "pill"
  /** Processing step: square icon tile, label and subtitle underneath. */
  | "step"
  /** The main step (an agent, the core logic): wide tile with text inside. */
  | "hub";

export type FlowNode = {
  id: string;
  kind: FlowNodeKind;
  x: number;
  y: number;
  /** Pill width in px. */
  w?: number;
  icon: string;
  label: string;
  sublabel?: string;
  /** More detail, shown in a bubble on hover/focus. Every node has one. */
  info?: string;
  /** Override when the node lights up (0 = first). */
  stage?: number;
};

export type FlowEdge = {
  from: string;
  to: string;
  /** Leave the bottom of `from` and enter the top of `to`, instead of right → left. */
  vertical?: boolean;
};

export type Workflow = {
  /** Tab label. */
  name: string;
  /** Shown in the opposite corner: what this workflow runs on. */
  stack: string;
  nodes: FlowNode[];
  edges: FlowEdge[];
};

const icons = {
  chat: "M4 5h16a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H9l-5 4V6a1 1 0 0 1 1-1z",
  book: "M5 4h11a3 3 0 0 1 3 3v13H8a3 3 0 0 1-3-3zM5 17a3 3 0 0 1 3-3h11",
  code: "M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14",
  layers: "M12 3l9 5-9 5-9-5zM3 13l9 5 9-5",
  database:
    "M4 6c0-1.7 3.6-3 8-3s8 1.3 8 3-3.6 3-8 3-8-1.3-8-3zM4 6v6c0 1.7 3.6 3 8 3s8-1.3 8-3V6M4 12v6c0 1.7 3.6 3 8 3s8-1.3 8-3v-6",
  question:
    "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM9.5 9.5a2.5 2.5 0 1 1 3.5 2.3c-.6.3-1 .9-1 1.5v.4M12 17h.01",
  bot: "M12 8V4M8 4h8M5 8h14a1 1 0 0 1 1 1v9a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1zM9 13h.01M15 13h.01M9 16.5h6",
  check: "M5 12.5l4.5 4.5L19 7.5",
  card: "M3 6h18v12H3zM3 10h18M7 15h3",
  bank: "M3 10h18M5 10v8M9 10v8M15 10v8M19 10v8M3 20h18M12 3l9 5H3z",
  filter: "M4 6h16M7 12h10M10 18h4",
  invoice: "M7 3h7l5 5v13H7zM14 3v5h5M10 13h6M10 17h6",
  sheet: "M4 4h16v16H4zM4 10h16M4 16h16M10 4v16",
  clock: "M12 21a9 9 0 1 0 0-18 9 9 0 0 0 0 18zM12 7v5l3 2",
  users:
    "M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8M21 21v-2a4 4 0 0 0-3-3.9M16 3.1a4 4 0 0 1 0 7.8",
  mic: "M12 3a3 3 0 0 0-3 3v6a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zM5 11a7 7 0 0 0 14 0M12 18v3",
  mail: "M3 6h18v12H3zM3 7l9 6 9-6",
  dashboard: "M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z",
};

export const workflows: Workflow[] = [
  {
    // Two lanes: knowledge is ingested left to right; questions drop in from above.
    name: "RAG agent",
    stack: "n8n · PostgreSQL · Claude",
    nodes: [
      { id: "discord", kind: "pill", x: 95, y: 85, w: 120, icon: icons.chat, label: "Discord", info: "Messages and threads from community channels, pulled in on a schedule." },
      { id: "docs", kind: "pill", x: 95, y: 165, w: 120, icon: icons.book, label: "Docs", info: "Guides, FAQs and internal docs, re-indexed whenever they change." },
      { id: "apis", kind: "pill", x: 95, y: 245, w: 120, icon: icons.code, label: "APIs", info: "Live data from connected services, so answers reflect what's true now." },
      { id: "embed", kind: "step", x: 285, y: 165, icon: icons.layers, label: "Chunk & embed", sublabel: "n8n", info: "Splits content into small passages and turns each into an embedding, so it can be searched by meaning." },
      { id: "store", kind: "step", x: 465, y: 165, icon: icons.database, label: "Vector store", sublabel: "PostgreSQL", info: "Embeddings stored in PostgreSQL, alongside the source text and where it came from." },
      { id: "question", kind: "pill", x: 665, y: 58, w: 130, icon: icons.question, label: "Question", stage: 2, info: "Asked through a Discord app, a Next.js front end or n8n chat." },
      { id: "agent", kind: "hub", x: 665, y: 165, icon: icons.bot, label: "RAG agent", sublabel: "Claude", info: "Finds the most relevant passages for the question, then has Claude answer from that context." },
      { id: "answer", kind: "pill", x: 862, y: 165, w: 120, icon: icons.check, label: "Answer", info: "Written from the most relevant stored context and sent back where the question came from." },
    ],
    edges: [
      { from: "discord", to: "embed" },
      { from: "docs", to: "embed" },
      { from: "apis", to: "embed" },
      { from: "embed", to: "store" },
      { from: "store", to: "agent" },
      { from: "question", to: "agent", vertical: true },
      { from: "agent", to: "answer" },
    ],
  },
  {
    // A trigger, fan in, fan out, converge.
    name: "Finance automation",
    stack: "n8n · Stripe · Revolut · Xero",
    nodes: [
      { id: "trigger", kind: "step", x: 75, y: 165, icon: icons.clock, label: "New payment", sublabel: "n8n", info: "n8n picks up each payment as it lands, so nothing waits on a manual export." },
      { id: "stripe", kind: "pill", x: 245, y: 110, w: 130, icon: icons.card, label: "Stripe", info: "Payments, refunds and payouts, picked up by webhook as they happen." },
      { id: "revolut", kind: "pill", x: 245, y: 220, w: 130, icon: icons.bank, label: "Revolut", info: "Business account transactions, pulled through the Revolut API." },
      { id: "match", kind: "hub", x: 465, y: 165, icon: icons.filter, label: "Match & categorise", sublabel: "n8n", info: "Pairs each transaction with its invoice or customer and sorts it into the right category." },
      { id: "xero", kind: "pill", x: 690, y: 105, w: 150, icon: icons.invoice, label: "Xero invoice", info: "Each matched payment becomes or settles an invoice in Xero." },
      { id: "sheet", kind: "pill", x: 690, y: 225, w: 150, icon: icons.sheet, label: "Spreadsheet", info: "A running ledger for quick checks and monthly reporting." },
      { id: "done", kind: "step", x: 862, y: 165, icon: icons.check, label: "Books updated", sublabel: "No manual entry", info: "Invoices and the ledger stay in step automatically. Nothing is typed in by hand." },
    ],
    edges: [
      { from: "trigger", to: "stripe" },
      { from: "trigger", to: "revolut" },
      { from: "stripe", to: "match" },
      { from: "revolut", to: "match" },
      { from: "match", to: "xero" },
      { from: "match", to: "sheet" },
      { from: "xero", to: "done" },
      { from: "sheet", to: "done" },
    ],
  },
  {
    // One trigger fans out to every source, then narrows to two outputs.
    name: "Community insights",
    stack: "Whop · Discord · n8n · Next.js",
    nodes: [
      { id: "cron", kind: "step", x: 85, y: 165, icon: icons.clock, label: "Scheduled sync", sublabel: "n8n", info: "An n8n schedule that kicks off a sync of every source at set times." },
      { id: "whop", kind: "pill", x: 275, y: 50, w: 120, icon: icons.users, label: "Whop", info: "Memberships, payments and cancellations from the Whop API." },
      { id: "discord", kind: "pill", x: 275, y: 125, w: 120, icon: icons.chat, label: "Discord", info: "Community activity: messages, engagement and who's gone quiet." },
      { id: "fathom", kind: "pill", x: 275, y: 200, w: 120, icon: icons.mic, label: "Fathom", info: "Call recordings, transcripts and summaries." },
      { id: "email", kind: "pill", x: 275, y: 275, w: 120, icon: icons.mail, label: "Email", info: "Support threads and replies from the shared inbox." },
      { id: "db", kind: "step", x: 450, y: 165, icon: icons.database, label: "Normalise", sublabel: "PostgreSQL", info: "Cleans and joins the data from every source into one consistent PostgreSQL schema." },
      { id: "agent", kind: "hub", x: 650, y: 165, icon: icons.bot, label: "Insights agent", sublabel: "Claude", info: "Claude reads the combined data and flags trends, at-risk members and what needs attention." },
      { id: "dash", kind: "pill", x: 862, y: 110, w: 135, icon: icons.dashboard, label: "Dashboard", info: "A secure Next.js dashboard with insights for each community." },
      { id: "bot", kind: "pill", x: 862, y: 220, w: 135, icon: icons.chat, label: "Discord app", info: "Insights and alerts posted straight into Discord." },
    ],
    edges: [
      { from: "cron", to: "whop" },
      { from: "cron", to: "discord" },
      { from: "cron", to: "fathom" },
      { from: "cron", to: "email" },
      { from: "whop", to: "db" },
      { from: "discord", to: "db" },
      { from: "fathom", to: "db" },
      { from: "email", to: "db" },
      { from: "db", to: "agent" },
      { from: "agent", to: "dash" },
      { from: "agent", to: "bot" },
    ],
  },
];
