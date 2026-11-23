import { siteConfig } from "@/config/site";
import { Container } from "@/components/ui/Container";
import { PillLink } from "@/components/ui/PillLink";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { PlayIcon } from "@/components/ui/icons";
import { videos } from "@/content/videos";

export function Videos() {
  return (
    <section id="videos" className="pb-section">
      <Container>
        <div className="reveal mb-10 flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
          <SectionHeading eyebrow="Content" title="Watch how it's built." />
          {siteConfig.socials.youtube && (
            <PillLink href={siteConfig.socials.youtube} variant="secondary">
              Visit the channel
            </PillLink>
          )}
        </div>

        <ul className="grid grid-cols-[repeat(auto-fit,minmax(min(100%,300px),1fr))] gap-x-6 gap-y-10">
          {videos.map((video) => (
            <li key={video.title} className="reveal">
              <a href={video.url} className="group block">
                <div className="relative -mx-5 aspect-video overflow-hidden border-y border-raised bg-surface sm:mx-0 sm:rounded-card sm:border">
                  <div className="dot-grid absolute inset-0 transition-transform duration-700 ease-[cubic-bezier(.2,.7,.2,1)] group-hover:scale-105" />
                  <div className="absolute inset-0 grid place-items-center">
                    <span className="grid size-14 place-items-center rounded-full bg-accent text-ink transition-transform duration-300 group-hover:scale-110">
                      <PlayIcon size={20} />
                    </span>
                  </div>
                </div>
                <p className="eyebrow mt-[18px]">
                  {video.topic} · {video.length}
                </p>
                <h3 className="mt-2">
                  <span className="bg-[linear-gradient(var(--color-accent),var(--color-accent))] bg-size-[0_2px] bg-left-bottom bg-no-repeat pb-[3px] font-display text-[21px] leading-tight font-semibold tracking-[-0.02em] transition-[background-size] duration-400 group-hover:bg-size-[100%_2px]">
                    {video.title}
                  </span>
                </h3>
                <p className="mt-2 text-[15px] text-muted">{video.text}</p>
              </a>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
