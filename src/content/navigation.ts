import { videosPublished } from "./videos";

/**
 * Links shown in the navbar. Section links are root-relative ("/#work") so they also work from
 * other pages; on the home page they still scroll in place.
 */
export const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/#services" },
  { label: "Process", href: "/#process" },
  { label: "About", href: "/#about" },
  ...(videosPublished ? [{ label: "Videos", href: "/#videos" }] : []),
];
