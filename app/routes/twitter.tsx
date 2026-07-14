import type { Route } from "./+types/twitter";
import { MapPin, Link2, Calendar, BadgeCheck } from "lucide-react";
import { person, experience, earlyCareer, education } from "~/data/resume";
import { seededInt, formatDisplayUrl } from "~/lib/helpers";
import { Avatar } from "~/components/Avatar";
import PostRow from "~/components/PostRow";
import type { Post } from "~/lib/types";

export function meta({}: Route.MetaArgs) {
  return [
    {
      title: `${person.displayName} (@${person.handle}) | Twitter/X-style feed`,
    },
  ];
}

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
            {formatDisplayUrl(person.links.website)}
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
