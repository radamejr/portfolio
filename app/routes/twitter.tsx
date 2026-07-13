import type { Route } from "./+types/twitter";
import {
  MapPin,
  Link2,
  Calendar,
  BadgeCheck,
  Heart,
  MessageCircle,
  Repeat2,
  BarChart3,
  Pin,
} from "lucide-react";
import { person, experience, earlyCareer, education } from "~/data/resume";
import { seededInt, formatShortDate } from "~/lib/helpers";
import { Avatar } from "~/components/Avatar";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: `${person.displayName} (@${person.handle}) | Twitter/X-style feed`,
    },
  ];
}

type Post = {
  id: string;
  date: Date;
  lead: string;
  body: string;
};

const posts: Post[] = [
  ...experience.flatMap((job) =>
    job.highlights.map((h, i) => {
      const date = new Date(job.startDate);
      date.setDate(date.getDate() + i * 47);
      return {
        id: `${job.id}-${i}`,
        date,
        lead: `${h.title} — ${job.company}`,
        body: h.body,
      };
    }),
  ),
  ...earlyCareer.map((job) => ({
    id: job.id,
    date: new Date(job.startDate),
    lead: `${job.role} — ${job.company}`,
    body: job.description,
  })),
  ...education.map((ed) => ({
    id: ed.id,
    date: new Date(`${ed.year}-06-01`),
    lead: `${ed.credential}`,
    body: `Completed at ${ed.school}. 🎓`,
  })),
].sort((a, b) => b.date.getTime() - a.date.getTime());

const earliestYear = Math.min(
  ...experience.map((j) => new Date(j.startDate).getFullYear()),
  ...earlyCareer.map((j) => new Date(j.startDate).getFullYear()),
);

function Stat({
  icon: Icon,
  seed,
  min,
  max,
}: {
  icon: typeof Heart;
  seed: string;
  min: number;
  max: number;
}) {
  return (
    <span className="flex items-center gap-1 text-xs text-gray-500 transition-colors group-hover:text-current">
      <Icon className="h-4 w-4" strokeWidth={1.75} />
      {seededInt(seed, min, max)}
    </span>
  );
}

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

export default function Twitter() {
  return (
    <main className="mx-auto max-w-xl border-x border-gray-100 pb-20 dark:border-gray-800">
      {/* Banner + avatar */}
      <div className="h-40 bg-gradient-to-r from-gray-900 via-gray-800 to-sky-600" />
      <div className="px-4">
        <div className="-mt-12 flex items-end justify-between">
          <Avatar
            size={88}
            ring={person.openToWork ? "openToWork" : "none"}
            className="rounded-full border-4 border-white dark:border-gray-950"
          />
          <a
            href={person.links.website}
            target="_blank"
            rel="noreferrer"
            className="mb-1 rounded-full bg-gray-900 px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90 dark:bg-white dark:text-gray-900"
          >
            Follow
          </a>
        </div>

        <div className="mt-3">
          <div className="flex items-center gap-1">
            <h1 className="text-xl font-extrabold text-gray-900 dark:text-white">
              {person.displayName}
            </h1>
            <BadgeCheck className="h-5 w-5 fill-sky-500 text-white" />
          </div>
          <p className="text-gray-500 dark:text-gray-400">@{person.handle}</p>
        </div>

        <p className="mt-3 text-[15px] text-gray-800 dark:text-gray-200">
          {person.title} · shipping React &amp; AI-assisted dev workflows.{" "}
          {person.openToWork ? "Open to remote/on-site roles 👀" : ""}
        </p>

        <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-4 w-4" /> {person.location}
          </span>
          <a
            href={person.links.website}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1 text-sky-600 hover:underline dark:text-sky-400"
          >
            <Link2 className="h-4 w-4" />{" "}
            {person.links.website.replace("https://", "")}
          </a>
          <span className="flex items-center gap-1">
            <Calendar className="h-4 w-4" /> Joined {earliestYear}
          </span>
        </div>

        <div className="mt-3 flex gap-4 text-sm">
          <span className="text-gray-900 dark:text-white">
            <span className="font-bold">
              {seededInt(person.handle + "following", 180, 640)}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Following</span>
          </span>
          <span className="text-gray-900 dark:text-white">
            <span className="font-bold">
              {seededInt(
                person.handle + "followers",
                900,
                12000,
              ).toLocaleString()}
            </span>{" "}
            <span className="text-gray-500 dark:text-gray-400">Followers</span>
          </span>
        </div>
      </div>

      {/* Tabs */}
      <div className="mt-4 flex border-b border-gray-100 text-sm font-medium dark:border-gray-800">
        {["Posts", "Replies", "Highlights", "Media"].map((tab, i) => (
          <div
            key={tab}
            className={`flex-1 cursor-default py-3 text-center ${
              i === 0
                ? "border-b-2 border-sky-500 text-gray-900 dark:text-white"
                : "text-gray-500 dark:text-gray-400"
            }`}
          >
            {tab}
          </div>
        ))}
      </div>

      {/* Feed */}
      <div>
        <PostRow
          post={{
            id: "pinned-summary",
            date: new Date(),
            lead: "About me",
            body: person.summary,
          }}
          pinned
        />
        {posts.map((post) => (
          <PostRow key={post.id} post={post} />
        ))}
      </div>
    </main>
  );
}
