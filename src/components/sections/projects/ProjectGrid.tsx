"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";
import { projectId, projects } from "@/content/projects";
import { ProjectCard } from "./ProjectCard";

const ids = new Set(projects.map(projectId));

/** The project id in the URL hash (`/projects#allminecraft-net`), if it names a real project. */
function idFromHash() {
  const id = decodeURIComponent(window.location.hash.slice(1));
  return ids.has(id) ? id : null;
}

/** The card (if any) an event happened in. */
function cardOf(target: EventTarget | null) {
  return target instanceof Element ? (target.closest("li[id]")?.id ?? null) : null;
}

/**
 * Every project as a card grid. Arriving from the About row (`/projects#<id>`) holds that card
 * open, as if hovered, and mutes hover on every other card.
 *
 * The hold ends when the visitor moves onto a different card, taps it or tabs to it, or moves off
 * the held card. One exception: if the cursor was already resting on another card when the page
 * opened, that card is ignored (it stays muted) until the cursor leaves it. So a cursor that just
 * happened to be there never steals the highlight; only a deliberate move to a card does.
 */
export function ProjectGrid() {
  const [openId, setOpenId] = useState<string | null>(null);
  /** The non-held card the cursor was resting on when the hold began. */
  const restingId = useRef<string | null>(null);
  /** Whether the cursor has really moved since the hold began. */
  const hasMoved = useRef(false);
  /** Last cursor position on screen. Scrolling moves the page under a still cursor and fires
   * pointer events, but the screen position stays the same, so this tells real moves apart. */
  const lastScreen = useRef<{ x: number; y: number } | null>(null);

  useEffect(() => {
    const sync = () => {
      restingId.current = null;
      hasMoved.current = false;
      lastScreen.current = null;
      const id = idFromHash();
      setOpenId(id);
      // Jump straight to the card, centred. The site scrolls smoothly, and a smooth scroll to the
      // card could land short of it while dragging the page under the cursor.
      if (id) document.getElementById(id)?.scrollIntoView({ block: "center", behavior: "instant" });
    };
    // After a client-side navigation the hash can land a frame later, so check again then.
    sync();
    const frame = requestAnimationFrame(sync);
    window.addEventListener("hashchange", sync);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("hashchange", sync);
    };
  }, []);

  const release = () => {
    restingId.current = null;
    setOpenId(null);
  };

  /**
   * True if the cursor has moved on screen since the last pointermove (not just the page under it).
   * Only pointermove records the position: boundary events (pointerout) fire just before the
   * pointermove at the same spot, and recording there would hide that move.
   */
  const cursorMoved = (event: PointerEvent, record: boolean) => {
    const last = lastScreen.current;
    if (record) lastScreen.current = { x: event.screenX, y: event.screenY };
    return last !== null && (last.x !== event.screenX || last.y !== event.screenY);
  };

  const handlePointerMove = (event: PointerEvent) => {
    if (!openId || event.pointerType !== "mouse") return;
    if (!cursorMoved(event, true)) return;

    const card = cardOf(event.target);
    if (!hasMoved.current) {
      hasMoved.current = true;
      // First real movement: if it's over another card, the cursor was already resting there.
      if (card && card !== openId) restingId.current = card;
      return;
    }
    if (card && card !== openId && card !== restingId.current) release();
  };

  const handlePointerOut = (event: PointerEvent) => {
    if (!openId || event.pointerType !== "mouse") return;
    // The page scrolled under a still cursor: not the visitor's doing.
    if (!cursorMoved(event, false)) return;
    const from = cardOf(event.target);
    const to = cardOf(event.relatedTarget);
    if (from === to) return; // moving within one card
    // Leaving the resting card makes it a normal card again, so moving back onto it counts.
    if (from === restingId.current) restingId.current = null;
    // Moving off the held card (to a gap or another card) hands control back to hover.
    if (from === openId) release();
  };

  /** Taps and keyboard focus are always deliberate. */
  const releaseIfOther = (target: EventTarget | null) => {
    const card = cardOf(target);
    if (openId && card && card !== openId) release();
  };

  return (
    <ul
      className="grid grid-cols-[repeat(auto-fill,minmax(min(100%,300px),1fr))] gap-5"
      onPointerMove={handlePointerMove}
      onPointerOut={handlePointerOut}
      onPointerDown={(event) => releaseIfOther(event.target)}
      onFocus={(event) => releaseIfOther(event.target)}
    >
      {projects.map((project) => {
        const id = projectId(project);
        return (
          <ProjectCard
            key={project.name}
            project={project}
            open={openId === id}
            muted={openId !== null && openId !== id}
          />
        );
      })}
    </ul>
  );
}
