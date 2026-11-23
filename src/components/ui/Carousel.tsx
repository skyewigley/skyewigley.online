"use client";

import { Children, useCallback, useEffect, useRef, useState, type ReactNode } from "react";

/** How long auto-advance holds after someone swipes or taps, so it doesn't pull the card away. */
const resumeAfterMs = 8000;

/** Every running animation inside the track that shares the followed loop's length. */
function loopAnimations(track: HTMLElement, cycle: number) {
  return track
    .getAnimations({ subtree: true })
    .filter((animation) => animation.effect?.getComputedTiming().duration === cycle);
}

type CarouselProps = {
  children: ReactNode;
  /** Names the set for the dot buttons, e.g. "Step" → "Show step 2 of 4". */
  itemLabel: string;
  as?: "ol" | "ul" | "dl" | "div";
  /** The list's own layout from sm up; below sm it becomes a one-at-a-time swipe track. */
  className?: string;
  /**
   * Selector for an element (inside the track) running a looping CSS animation that every item's
   * animations share, one equal slice of the loop per item. The visible item follows the loop; and
   * when someone swipes to an item, the loop jumps to that item's slice, plays it, then holds there
   * until auto-advance resumes.
   */
  follow?: string;
  /** Without `follow`: seconds each item shows before moving to the next, while the track is on
      screen. Holds after someone swipes or taps, like `follow`. */
  autoplay?: number;
};

/**
 * Phones only: turns a list into a horizontal swipe track showing one item at a time, with dots
 * underneath. From sm up the list renders with its normal layout and the dots are hidden.
 * The track bleeds to the screen edges with 20px padding; the gap between items is twice that,
 * so the neighbouring items sit just off screen rather than peeking in at the sides.
 */
export function Carousel({ children, itemLabel, as: Track = "div", className = "", follow, autoplay }: CarouselProps) {
  const trackRef = useRef<HTMLElement>(null);
  /** Set by a touch, wheel or dot tap; cleared when the carousel scrolls itself. */
  const userDriven = useRef(false);
  const [active, setActive] = useState(0);
  const count = Children.count(children);

  const scrollToItem = useCallback((index: number) => {
    const track = trackRef.current;
    const items = track?.children;
    if (!track || !items?.length) return;
    const first = items[0] as HTMLElement;
    const target = items[index] as HTMLElement;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    track.scrollTo({ left: target.offsetLeft - first.offsetLeft, behavior: reduceMotion ? "auto" : "smooth" });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const currentIndex = () => {
      const items = track.children;
      if (items.length < 2) return 0;
      const step = (items[1] as HTMLElement).offsetLeft - (items[0] as HTMLElement).offsetLeft;
      return step > 0 ? Math.min(items.length - 1, Math.round(track.scrollLeft / step)) : 0;
    };
    const driver = () => (follow ? track.querySelector(follow)?.getAnimations()[0] : undefined);
    const isCarousel = () => track.scrollWidth > track.clientWidth;

    // Auto-advance state: the item last scrolled to, and a hold after someone picks an item.
    let shown = -1;
    let holdUntil = 0;
    let heldIndex = -1;
    let pausedByUs = false;

    /** Moves every looped animation to `time` ms into the loop (on its second pass, so every
        delayed animation is mid-loop rather than still waiting for its first start). */
    const seekLoop = (cycle: number, time: number) => {
      for (const animation of loopAnimations(track, cycle)) animation.currentTime = cycle + time;
    };

    // Someone landed on an item: play its slice of the loop from the start and hold auto-advance.
    const pick = (index: number) => {
      const cycle = Number(driver()?.effect?.getComputedTiming().duration);
      if (!cycle) return;
      if (pausedByUs) for (const animation of loopAnimations(track, cycle)) animation.play();
      pausedByUs = false;
      seekLoop(cycle, (index * cycle) / count);
      heldIndex = index;
      shown = index;
      holdUntil = Date.now() + resumeAfterMs;
    };

    // Timed autoplay (no `follow`): when it last moved, and whether the track is on screen.
    let lastAdvance = 0;
    let onScreen = false;
    const visibility = new IntersectionObserver(
      ([entry]) => {
        onScreen = entry?.isIntersecting ?? false;
        // A fresh full turn for whichever item is showing when it comes into view.
        if (onScreen) lastAdvance = Date.now();
      },
      { threshold: 0.35 },
    );
    visibility.observe(track);

    let settleTimer = 0;
    const onScroll = () => {
      setActive(currentIndex());
      window.clearTimeout(settleTimer);
      settleTimer = window.setTimeout(() => {
        if (userDriven.current && isCarousel()) {
          if (follow) pick(currentIndex());
          else holdUntil = Date.now() + resumeAfterMs;
          lastAdvance = Date.now();
        }
        userDriven.current = false;
      }, 150);
    };
    const onInteract = () => {
      userDriven.current = true;
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    track.addEventListener("pointerdown", onInteract, { passive: true });
    track.addEventListener("wheel", onInteract, { passive: true });

    // Auto-advance in step with the followed loop.
    const timer = follow
      ? window.setInterval(() => {
          if (!isCarousel()) return;
          const animation = driver();
          const timing = animation?.effect?.getComputedTiming();
          const cycle = Number(timing?.duration);
          if (!animation || !cycle) return;
          const index = Math.min(count - 1, Math.floor((timing?.progress ?? 0) * count));

          if (Date.now() < holdUntil) {
            // The picked item's slice has played out: freeze just before its end (while its spotlight
            // is still fully on) until the hold ends.
            if (!pausedByUs && index !== heldIndex) {
              seekLoop(cycle, ((heldIndex + 1) * cycle) / count - cycle * 0.02);
              for (const looped of loopAnimations(track, cycle)) looped.pause();
              pausedByUs = true;
            }
            return;
          }
          if (pausedByUs) {
            for (const looped of loopAnimations(track, cycle)) looped.play();
            pausedByUs = false;
          }
          if (index !== shown) {
            shown = index;
            userDriven.current = false;
            scrollToItem(index);
          }
        }, 250)
      : autoplay
        ? window.setInterval(() => {
            if (!isCarousel() || !onScreen || Date.now() < holdUntil) return;
            if (Date.now() - lastAdvance < autoplay * 1000) return;
            lastAdvance = Date.now();
            userDriven.current = false;
            scrollToItem((currentIndex() + 1) % count);
          }, 250)
        : 0;

    return () => {
      window.clearTimeout(settleTimer);
      window.clearInterval(timer);
      visibility.disconnect();
      track.removeEventListener("scroll", onScroll);
      track.removeEventListener("pointerdown", onInteract);
      track.removeEventListener("wheel", onInteract);
    };
  }, [follow, autoplay, count, scrollToItem]);

  return (
    <>
      <Track
        ref={trackRef as never}
        data-carousel
        className={`${className} scrollbar-none max-sm:-mx-5 max-sm:flex max-sm:snap-x max-sm:snap-mandatory max-sm:gap-10 max-sm:overflow-x-auto max-sm:scroll-px-5 max-sm:px-5 max-sm:*:w-full max-sm:*:shrink-0 max-sm:*:snap-start`}
      >
        {children}
      </Track>
      <div className="mt-6 flex justify-center gap-1 sm:hidden">
        {Array.from({ length: count }, (_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Show ${itemLabel.toLowerCase()} ${index + 1} of ${count}`}
            aria-current={index === active || undefined}
            onClick={() => {
              userDriven.current = true;
              scrollToItem(index);
            }}
            className="grid h-6 place-items-center px-1"
          >
            <span
              className={`block h-1.5 rounded-full transition-all duration-300 ${
                index === active ? "w-5 bg-accent" : "w-1.5 bg-edge"
              }`}
            />
          </button>
        ))}
      </div>
    </>
  );
}
