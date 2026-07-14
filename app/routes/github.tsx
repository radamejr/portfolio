import type { Route } from "./+types/github";
import {
  Users,
  MapPin,
  Link2,
  Building2,
  Star,
  GitFork,
  BookMarked,
  Mail,
  Pin,
} from "lucide-react";
import { person, allSkills, experience } from "~/data/resume";
import {
  seededInt,
  formatDisplayUrl,
  contributionLevel,
  CONTRIBUTION_WEEKS,
  CONTRIBUTION_DAYS,
} from "~/lib/helpers";
import { Avatar } from "~/components/Avatar";
import type { Repo } from "~/lib/types";
import RepoComponent from "~/components/Repo";

export function meta({}: Route.MetaArgs) {
  return [{ title: `${person.handle} | GitHub-style profile` }];
}

const repos: Repo[] = [
  {
    name: "xpgeo-studio",
    description:
      "React rewrite of a legacy ESRI JS SDK app — unlocks Oriented Imagery Layer (OIL) support, shipped with full feature parity.",
    language: "TypeScript",
    color: "#3178c6",
  },
  {
    name: "api-viewer-2.0",
    description:
      "NX monorepo consolidating 5 standalone apps under one shared library of 20-30 reusable components.",
    language: "TypeScript",
    color: "#3178c6",
  },
  {
    name: "aerialsphere-webapp",
    description:
      "Customer web app + Django REST API, Stripe webhooks driving registration, subscriptions, and billing cycles.",
    language: "Python",
    color: "#3572A5",
  },
  {
    name: "esri-cli-go-port",
    description:
      "Node.js → Go port of a client-facing CLI for ESRI Enterprise systems — signed, cross-platform builds for Windows & Linux.",
    language: "Go",
    color: "#00ADD8",
  },
  {
    name: "ci-testing-suite",
    description:
      "GitHub Actions CI for a client's Python backend — blocks merges on test failure, posts real-time Slack alerts.",
    language: "Python",
    color: "#3572A5",
  },
  {
    name: "shared-component-library",
    description:
      "20-30 reusable, documented components powering 5 production applications from one design system.",
    language: "TypeScript",
    color: "#3178c6",
  },
];

const levelClasses = [
  "bg-gray-100 dark:bg-gray-800",
  "bg-emerald-200 dark:bg-emerald-950",
  "bg-emerald-400 dark:bg-emerald-800",
  "bg-emerald-600 dark:bg-emerald-600",
  "bg-emerald-800 dark:bg-emerald-400",
];

export default function GitHub() {
  return (
    <main className="mx-auto max-w-5xl px-3 pb-20 sm:px-4">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Sidebar */}
        <aside className="flex flex-col gap-4 md:col-span-1">
          <Avatar size={200} className="mx-auto md:mx-0" ring="none" />
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              {person.displayName}
            </h1>
            <p className="text-xl font-light text-gray-500 dark:text-gray-400">
              {person.handle}
            </p>
          </div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            {person.title} — 6+ years writing software.
          </p>

          <a
            href={person.links.github}
            target="_blank"
            rel="noreferrer"
            className="w-full rounded-md border border-gray-300 bg-gray-50 py-1.5 text-center text-sm font-semibold text-gray-800 transition-colors hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
          >
            Follow
          </a>

          <ul className="flex flex-col gap-2 text-sm text-gray-600 dark:text-gray-400">
            <li className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span className="font-semibold text-gray-900 dark:text-white">
                {seededInt(person.handle + "followers-gh", 40, 620)}
              </span>{" "}
              followers ·{" "}
              <span className="font-semibold text-gray-900 dark:text-white">
                {seededInt(person.handle + "following-gh", 10, 90)}
              </span>{" "}
              following
            </li>
            <li className="flex items-center gap-2">
              <Building2 className="h-4 w-4" /> {experience[0].company}
            </li>
            <li className="flex items-center gap-2">
              <MapPin className="h-4 w-4" /> {person.location}
            </li>
            <li className="flex items-center gap-2">
              <Mail className="h-4 w-4" />
              <a href={`mailto:${person.email}`} className="hover:underline">
                {person.email}
              </a>
            </li>
            <li className="flex items-center gap-2">
              <Link2 className="h-4 w-4" />
              <a
                href={person.links.website}
                target="_blank"
                rel="noreferrer"
                className="hover:underline"
              >
                {formatDisplayUrl(person.links.website)}
              </a>
            </li>
          </ul>

          <div className="border-t border-gray-200 pt-4 dark:border-gray-800">
            <h2 className="mb-2 text-xs font-semibold text-gray-500 dark:text-gray-400">
              Skills · {allSkills.length} technologies
            </h2>
            <div className="flex flex-wrap gap-1.5">
              {allSkills.slice(0, 14).map((skill) => (
                <span
                  key={skill}
                  className="rounded-full bg-gray-100 px-2 py-0.5 font-mono text-[11px] text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        </aside>

        {/* Main */}
        <div className="flex flex-col gap-6 md:col-span-2">
          <section className="rounded-md border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-gray-900">
            <h2 className="font-mono text-sm text-gray-500 dark:text-gray-400">
              # README.md
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-gray-700 dark:text-gray-300">
              {person.summary}
            </p>
          </section>

          <section>
            <h2 className="mb-3 flex items-center gap-2 text-base font-semibold text-gray-900 dark:text-white">
              <Pin className="h-4 w-4" /> Pinned
            </h2>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {repos.map((repo) => (
                <RepoComponent key={repo.name} repo={repo} />
              ))}
            </div>
          </section>

          <section>
            <h2 className="mb-3 text-base font-semibold text-gray-900 dark:text-white">
              1,337 contributions in the last year
            </h2>
            <div className="overflow-x-auto rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900">
              <div className="grid w-max grid-flow-col grid-rows-7 gap-0.5">
                {Array.from({ length: CONTRIBUTION_WEEKS }, (_, w) =>
                  Array.from({ length: CONTRIBUTION_DAYS }, (_, d) => (
                    <div
                      key={`${w}-${d}`}
                      className={`h-2.5 w-2.5 rounded-sm ${levelClasses[contributionLevel(w, d)]}`}
                    />
                  )),
                )}
              </div>
              <div className="mt-2 flex items-center justify-end gap-1 text-xs text-gray-400">
                Less
                {levelClasses.map((c, i) => (
                  <div key={i} className={`h-3 w-3 rounded-sm ${c}`} />
                ))}
                More
              </div>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
