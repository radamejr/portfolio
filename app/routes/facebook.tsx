import type { Route } from "./+types/facebook";
import { Briefcase, GraduationCap, MapPin, Mail, Link2 } from "lucide-react";
import { person, experience, earlyCareer, education } from "~/data/resume";
import { formatMonthYear, eventIcon, formatDisplayUrl } from "~/lib/helpers";
import { Avatar } from "~/components/Avatar";
import CardComponent from "~/components/CardComponent";
import ReactionBar from "~/components/ReactionBar";
import type { LifeEvent, LifeEventKind } from "~/lib/types";

export function meta({}: Route.MetaArgs) {
  return [{ title: `${person.displayName} | Facebook-style timeline` }];
}

const jobStartEvents: LifeEvent[] = experience.map((job) => ({
  id: `${job.id}-start`,
  date: new Date(job.startDate),
  kind: "job-start",
  headline: `started a new position as ${job.role} at ${job.company}`,
  body: job.highlights
    .slice(0, 2)
    .map((h) => `${h.title}: ${h.body}`)
    .join(" "),
}));

const earlyEvents: LifeEvent[] = earlyCareer.map((job) => ({
  id: job.id,
  date: new Date(job.startDate),
  kind: "job-start",
  headline: `started a new position as ${job.role} at ${job.company}`,
  body: job.description,
}));

const educationEvents: LifeEvent[] = education.map((ed) => ({
  id: ed.id,
  date: new Date(`${ed.year}-06-01`),
  kind: "education",
  headline: `completed ${ed.credential} at ${ed.school}`,
}));

const events = [...jobStartEvents, ...earlyEvents, ...educationEvents].sort(
  (a, b) => b.date.getTime() - a.date.getTime(),
);

const eventsByYear = events.reduce<Map<number, LifeEvent[]>>((map, ev) => {
  const year = ev.date.getFullYear();
  const list = map.get(year) ?? [];
  list.push(ev);
  map.set(year, list);
  return map;
}, new Map());

export default function Facebook() {
  return (
    <main className="mx-auto max-w-4xl pb-20">
      {/* Cover + profile */}
      <div className="overflow-hidden rounded-b-lg border-x border-b border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="h-48 bg-gradient-to-br from-[#1877F2] via-[#4293FF] to-[#8ec5ff] sm:h-64" />
        <div className="px-4 pb-4 sm:px-6">
          <div className="-mt-14 flex flex-col items-center sm:-mt-16 sm:flex-row sm:items-end sm:gap-4">
            <Avatar
              size={140}
              ring={person.openToWork ? "openToWork" : "none"}
              className="rounded-full border-4 border-white dark:border-gray-900"
            />
            <div className="mt-3 flex flex-1 flex-col items-center sm:mt-0 sm:items-start sm:pb-2">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                {person.fullName}
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {person.title} · {person.location}
              </p>
            </div>
            <div className="mt-3 flex gap-2 pb-2 sm:mt-0">
              <a
                href={`mailto:${person.email}`}
                className="rounded-md bg-[#1877F2] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                + Add Friend
              </a>
              <a
                href={`mailto:${person.email}`}
                className="rounded-md bg-gray-100 px-4 py-2 text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              >
                Message
              </a>
            </div>
          </div>
          <div className="mt-4 flex gap-6 border-t border-gray-200 pt-2 text-sm font-semibold text-gray-500 dark:border-gray-800 dark:text-gray-400">
            {["Posts", "About", "Friends", "Photos"].map((tab, i) => (
              <span
                key={tab}
                className={`cursor-default border-b-[3px] py-2 ${
                  i === 0
                    ? "border-[#1877F2] text-[#1877F2]"
                    : "border-transparent hover:text-gray-700 dark:hover:text-gray-200"
                }`}
              >
                {tab}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-5">
        {/* Intro sidebar */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Intro
            </h2>
            <p className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              {person.summary}
            </p>
            <ul className="mt-4 flex flex-col gap-2.5 text-sm text-gray-700 dark:text-gray-300">
              <li className="flex items-center gap-2.5">
                <Briefcase className="h-4 w-4 shrink-0 text-gray-400" />
                Works as{" "}
                <span className="font-semibold">
                  {experience[0].role}
                </span> at{" "}
                <span className="font-semibold">{experience[0].company}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <GraduationCap className="h-4 w-4 shrink-0 text-gray-400" />
                Studied at{" "}
                <span className="font-semibold">{education[0].school}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <MapPin className="h-4 w-4 shrink-0 text-gray-400" />
                Lives in{" "}
                <span className="font-semibold">{person.location}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                <a href={`mailto:${person.email}`} className="hover:underline">
                  {person.email}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Link2 className="h-4 w-4 shrink-0 text-gray-400" />
                <a
                  href={person.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate hover:underline"
                >
                  {formatDisplayUrl(person.links.website)}
                </a>
              </li>
            </ul>
          </CardComponent>
        </div>

        {/* Timeline */}
        <div className="flex flex-col gap-6 lg:col-span-3">
          {[...eventsByYear.entries()].map(([year, yearEvents]) => (
            <div key={year}>
              <h2 className="mb-3 text-2xl font-bold text-gray-300 dark:text-gray-700">
                {year}
              </h2>
              <div className="flex flex-col gap-4">
                {yearEvents.map((ev) => {
                  const Icon = eventIcon(ev.kind);
                  return (
                    <article
                      key={ev.id}
                      className="rounded-lg border border-gray-200 bg-white pt-4 dark:border-gray-800 dark:bg-gray-900"
                    >
                      <div className="flex items-start gap-3 px-4">
                        <Avatar size={40} />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm text-gray-900 dark:text-gray-100">
                            <span className="font-semibold">
                              {person.displayName}
                            </span>{" "}
                            {ev.headline}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {formatMonthYear(ev.date)}
                          </p>
                        </div>
                        <Icon className="h-5 w-5 shrink-0 text-gray-300 dark:text-gray-700" />
                      </div>
                      {ev.body && (
                        <p className="mt-3 px-4 text-sm text-gray-700 dark:text-gray-300">
                          {ev.body}
                        </p>
                      )}
                      <ReactionBar seed={ev.id} />
                      <div className="h-2" />
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
