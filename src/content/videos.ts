/** The Content (videos) section and its nav link stay hidden until this is true. */
export const videosPublished = false;

export type Video = {
  url: string;
  topic: string;
  length: string;
  title: string;
  text: string;
};

// Placeholders — replace with real videos.
export const videos: Video[] = [
  {
    url: "#videos",
    topic: "[Topic]",
    length: "[0:00]",
    title: "[Video title one]",
    text: "[One-line description of what this video covers.]",
  },
  {
    url: "#videos",
    topic: "[Topic]",
    length: "[0:00]",
    title: "[Video title two]",
    text: "[One-line description of what this video covers.]",
  },
  {
    url: "#videos",
    topic: "[Topic]",
    length: "[0:00]",
    title: "[Video title three]",
    text: "[One-line description of what this video covers.]",
  },
];
