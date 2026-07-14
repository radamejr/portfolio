import {
  BadgeCheck,
  Heart,
  MessageCircle,
  Repeat2,
  BarChart3,
  Pin,
} from "lucide-react";
import { person } from "~/data/resume";
import { formatShortDate } from "~/lib/helpers";
import { Avatar } from "~/components/Avatar";
import Stat from "~/components/Stat";
import type { Post } from "~/lib/types";

function PostRow({ post, pinned = false }: { post: Post; pinned?: boolean }) {
  return (
    <article className="flex gap-3 border-b border-gray-100 px-4 py-3 transition-colors hover:bg-gray-50/70 dark:border-gray-800 dark:hover:bg-gray-900/50">
      <Avatar size={40} className="mt-0.5" />
      <div className="min-w-0 flex-1">
        {pinned && (
          <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-gray-500 dark:text-gray-400">
            <Pin className="h-3.5 w-3.5" /> Pinned
          </div>
        )}
        <div className="flex flex-wrap items-center gap-1 text-sm">
          <span className="font-bold text-gray-900 dark:text-white">
            {person.displayName}
          </span>
          <BadgeCheck className="h-4 w-4 fill-sky-500 text-white" />
          <span className="text-gray-500 dark:text-gray-400">
            @{person.handle}
          </span>
          <span className="text-gray-400">·</span>
          <span className="text-gray-500 dark:text-gray-400">
            {formatShortDate(post.date)}
          </span>
        </div>
        <p className="mt-0.5 text-[15px] leading-normal text-gray-900 dark:text-gray-100">
          <span className="font-semibold">{post.lead}:</span> {post.body}
        </p>
        <div className="group mt-3 flex max-w-md items-center justify-between">
          <Stat
            icon={MessageCircle}
            seed={`reply-${post.id}`}
            min={1}
            max={40}
          />
          <Stat icon={Repeat2} seed={`retweet-${post.id}`} min={2} max={120} />
          <Stat icon={Heart} seed={`like-${post.id}`} min={12} max={980} />
          <Stat
            icon={BarChart3}
            seed={`views-${post.id}`}
            min={800}
            max={42000}
          />
        </div>
      </div>
    </article>
  );
}

export default PostRow;
