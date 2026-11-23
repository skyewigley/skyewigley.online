# skyewigley.online

The source for my portfolio site. It covers my AI automation and full-stack work: case studies, projects, services and how to reach me.

It's a fully static site. `next build` outputs plain HTML, CSS and JS, and nginx serves it from a small Docker image on my own server. There is no backend or database, so there is nothing to break or patch at runtime.

## Stack

| Layer      | Tools                                                        |
| ---------- | ------------------------------------------------------------ |
| Framework  | Next.js 16 (App Router, static export), React 19, TypeScript |
| Styling    | Tailwind CSS v4, design tokens in `src/app/globals.css`      |
| Icons      | lucide-react, simple-icons                                   |
| Serving    | nginx (gzip, long-lived asset caching, security headers)     |
| Deployment | Docker Compose on a VPS running Coolify                      |
| Contact    | Form posts to an n8n webhook                                 |

## How it's built

- **Content is separate from components.** All copy and project data lives in `src/content/*.ts`. Components only render it.
- **Nothing personal is hard-coded.** Name, email and links come from `NEXT_PUBLIC_*` env vars at build time (see `.env.example`).
- **Server components by default.** Only interactive parts run on the client: the hero spotlight, workflow diagram, project cards and contact form.
- **Mobile is designed, not squeezed.** Panels run edge to edge, the fixed-width diagram is hidden on phones, and hover details also open on tap.
- **Motion respects `prefers-reduced-motion`.** Scroll reveals use CSS scroll-driven animations, so they need no JavaScript.
- **SEO:** per-page metadata, Open Graph tags, JSON-LD, `sitemap.xml` and `robots.txt`.

```
src/
├── app/          # Routes: / , /projects , /contact, plus metadata, sitemap, robots
├── components/   # layout/ (navbar, footer), sections/ (one per page section), ui/ (shared pieces)
├── config/       # site.ts: personal details from env vars
└── content/      # All copy and data, one file per section
```

## Run it locally

Requires Node.js 20+.

```bash
npm install
cp .env.example .env.local   # fill in your details
npm run dev                  # http://localhost:3000
```

To test the production image (nginx on port 8080):

```bash
docker compose -f docker-compose.local.yml --env-file .env.local up --build
```

## Deploy (Coolify)

1. Create a resource from this repo with the **Docker Compose** build pack, using `docker-compose.yml`.
2. Set the domain on the `web` service. Coolify routes it to nginx on port 80 and handles HTTPS. `NEXT_PUBLIC_SITE_URL` is filled in from that domain.
3. Fill in the remaining `NEXT_PUBLIC_*` variables in the Environment Variables tab, then deploy.

These values are baked into public HTML, so never put secrets in them.
