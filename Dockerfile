# syntax=docker/dockerfile:1

# ---- Build: compile the static site into /app/out --------------------------
FROM node:24-alpine AS build
WORKDIR /app

COPY package.json package-lock.json ./
RUN npm ci

COPY . .

# Public, build-time values (baked into the HTML). In Coolify, add these as
# environment variables and tick "Build Variable". Never put secrets here.
ARG NEXT_PUBLIC_SITE_URL
ARG NEXT_PUBLIC_NAME
ARG NEXT_PUBLIC_INITIALS
ARG NEXT_PUBLIC_CONTACT_EMAIL
ARG NEXT_PUBLIC_BOOKING_URL
ARG NEXT_PUBLIC_INTRO_VIDEO_ID
ARG NEXT_PUBLIC_LINKEDIN_URL
ARG NEXT_PUBLIC_GITHUB_URL
ARG NEXT_PUBLIC_YOUTUBE_URL
ARG NEXT_PUBLIC_INSTAGRAM_URL
ARG NEXT_PUBLIC_UPWORK_URL
ARG NEXT_PUBLIC_WHATSAPP
ARG NEXT_PUBLIC_DISCORD
ARG NEXT_PUBLIC_CONTACT_WEBHOOK_URL

ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build

# ---- Serve: tiny nginx image with only the static files --------------------
FROM nginx:1.29-alpine AS runtime

COPY nginx/default.conf /etc/nginx/conf.d/default.conf
COPY --from=build /app/out /usr/share/nginx/html

EXPOSE 80
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -qO- http://127.0.0.1/healthz || exit 1
