/**
 * Personal details and links, read from environment variables at build time.
 *
 * Nothing personal is committed to the repo: real values live in `.env.local`
 * (local, gitignored) and in Coolify's environment settings (production).
 * See `.env.example` for the full list.
 *
 * Note: this is a static site, so every value here ends up in the public HTML.
 * Never put secrets (API keys, passwords) in these variables.
 */

function env(value: string | undefined, fallback = ""): string {
  const trimmed = value?.trim();
  return trimmed ? trimmed : fallback;
}

const name = env(process.env.NEXT_PUBLIC_NAME, "[YOUR NAME]");

export const siteConfig = {
  url: env(process.env.NEXT_PUBLIC_SITE_URL, "http://localhost:3000"),
  name,
  initials: env(process.env.NEXT_PUBLIC_INITIALS, initialsOf(name)),
  role: "AI automation & full-stack engineer",
  description:
    "AI automation and full-stack engineer. n8n workflows, RAG agents, API integrations and self-hosted systems, planned, reviewed and shipped properly.",
  email: env(process.env.NEXT_PUBLIC_CONTACT_EMAIL),
  bookingUrl: env(process.env.NEXT_PUBLIC_BOOKING_URL),
  /** WhatsApp and Discord usernames, shown on /contact with a copy button. */
  whatsapp: env(process.env.NEXT_PUBLIC_WHATSAPP),
  discord: env(process.env.NEXT_PUBLIC_DISCORD),
  /**
   * Where the /contact form POSTs its JSON ({ name, email, message }). Public by nature, so the
   * receiving workflow must validate the payload itself.
   */
  contactWebhookUrl: env(process.env.NEXT_PUBLIC_CONTACT_WEBHOOK_URL),
  /** YouTube video ID for the intro video, e.g. "dQw4w9WgXcQ". */
  introVideoId: env(process.env.NEXT_PUBLIC_INTRO_VIDEO_ID),
  socials: {
    linkedin: env(process.env.NEXT_PUBLIC_LINKEDIN_URL),
    github: env(process.env.NEXT_PUBLIC_GITHUB_URL),
    youtube: env(process.env.NEXT_PUBLIC_YOUTUBE_URL),
    instagram: env(process.env.NEXT_PUBLIC_INSTAGRAM_URL),
    upwork: env(process.env.NEXT_PUBLIC_UPWORK_URL),
  },
} as const;

function initialsOf(fullName: string): string {
  const letters = fullName
    .replace(/[^\p{L}\s]/gu, "")
    .split(/\s+/)
    .filter(Boolean)
    .map((part) => part[0]!.toUpperCase());
  return letters.length ? letters.slice(0, 2).join("") : "YN";
}
