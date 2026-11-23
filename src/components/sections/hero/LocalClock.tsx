"use client";

import { useEffect, useState } from "react";

/** Current time in the given time zone (HH:MM). Rendered client-side only. */
export function LocalClock({ timeZone }: { timeZone: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const format = () =>
      new Date().toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", timeZone });
    const update = () => setTime(format());
    update();
    const interval = setInterval(update, 20_000);
    return () => clearInterval(interval);
  }, [timeZone]);

  return <time suppressHydrationWarning>{time}</time>;
}
