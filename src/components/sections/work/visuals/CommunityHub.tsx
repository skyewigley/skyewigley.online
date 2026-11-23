import { Eye, MessageCircle, Trophy } from "lucide-react";
import type { CommunityHubVisual } from "@/content/work";
import { SceneCard } from "./SceneCard";

/** AllMinecraft scene: trending content posts, and the user leaderboard. */
export function CommunityHub({ visual }: { visual: CommunityHubVisual }) {
  return (
    <div className="relative">
      {/* Trending posts */}
      <SceneCard className="p-4 pb-14">
        <div className="flex gap-1.5">
          {visual.tabs.map((tab, index) => (
            <span
              key={tab}
              className={`rounded-full px-2.5 py-1 font-mono text-[10px] tracking-wider uppercase ${
                index === visual.activeTab ? "bg-(--tone) text-ink" : "text-muted"
              }`}
            >
              {tab}
            </span>
          ))}
        </div>
        <ul className="mt-3 divide-y divide-raised/70">
          {visual.posts.map(({ icon: Icon, ...post }) => (
            <li key={post.title} className="flex items-center gap-3 py-3 last:pb-1">
              <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-(--tone)/12 text-(--tone)">
                <Icon size={17} />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{post.title}</p>
                <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[10px] text-muted">
                  <span className="rounded bg-raised px-1.5 py-px text-fg/80">{post.category}</span>
                  {post.version} · {post.author}
                </p>
              </div>
              <div className="hidden shrink-0 flex-col items-end gap-1 font-mono text-[10px] text-muted sm:flex">
                <span className="flex items-center gap-1">
                  <Eye size={11} /> {post.views}
                </span>
                <span className="flex items-center gap-1">
                  <MessageCircle size={11} /> {post.comments}
                </span>
              </div>
            </li>
          ))}
        </ul>
      </SceneCard>

      {/* User leaderboard, overlapping the bottom of the feed */}
      <SceneCard className="relative mt-[-40px] mr-3 ml-auto w-[220px] p-4 sm:mr-6">
        <p className="eyebrow flex items-center gap-1.5 text-[9px]">
          <Trophy size={11} className="text-(--tone)" />
          User leaderboard
        </p>
        <ol className="mt-3 space-y-2.5">
          {visual.leaders.map((leader, index) => (
            <li key={leader.name} className="flex items-center gap-2.5 text-[13px]">
              <span
                className={`grid size-6 place-items-center rounded-full font-mono text-[10px] ${
                  index === 0 ? "bg-(--tone) text-ink" : "bg-raised text-muted"
                }`}
              >
                {index + 1}
              </span>
              <span className="flex-1 truncate">{leader.name}</span>
              <span className="font-mono text-[10px] text-muted tabular-nums">{leader.points}</span>
            </li>
          ))}
        </ol>
      </SceneCard>
    </div>
  );
}
