"use client";

import { useState } from "react";
import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PlayIcon } from "@/components/ui/icons";

/**
 * Intro video. Shows a lightweight placeholder and only loads the YouTube
 * player once the visitor presses play (keeps the page fast).
 * Set NEXT_PUBLIC_INTRO_VIDEO_ID to enable it.
 */
export function IntroVideo() {
  const [playing, setPlaying] = useState(false);
  const videoId = siteConfig.introVideoId;

  return (
    <section id="intro" className="py-section">
      <Container>
        <div className="mx-auto max-w-[1100px]">
        <div className="reveal mb-10 text-center">
          <p className="eyebrow">The short version</p>
          <h2 className="mt-4 font-display text-h2 font-semibold">See how I work.</h2>
        </div>

        <div className="reveal group relative -mx-5 aspect-video overflow-hidden border-y border-raised bg-surface sm:mx-0 sm:rounded-panel sm:border">
          {playing && videoId ? (
            <iframe
              className="absolute inset-0 size-full"
              src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`}
              title="Intro video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <>
              <div className="dot-grid absolute inset-0 transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-4 text-center">
                <button
                  type="button"
                  onClick={() => setPlaying(true)}
                  disabled={!videoId}
                  aria-label="Play intro video"
                  className="grid size-[clamp(60px,7vw,92px)] animate-pulse-ring cursor-pointer place-items-center rounded-full bg-accent text-ink transition-transform duration-300 group-hover:scale-110 disabled:cursor-default"
                >
                  <PlayIcon size={28} />
                </button>
                {!videoId && <span className="eyebrow">[Your intro video embeds here]</span>}
              </div>
            </>
          )}
        </div>
        </div>
      </Container>
    </section>
  );
}
