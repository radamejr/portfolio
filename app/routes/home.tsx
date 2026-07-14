import type { Route } from "./+types/home";
import {
  Briefcase,
  Code2,
  Globe,
  Mail,
  MapPin,
  GraduationCap,
  Building2,
} from "lucide-react";
import {
  person,
  experience,
  earlyCareer,
  education,
  skillGroups,
} from "~/data/resume";
import { Avatar } from "~/components/Avatar";

export function meta({}: Route.MetaArgs) {
  return [
    { title: `${person.displayName} — Résumé` },
    {
      name: "description",
      content: `${person.displayName}'s résumé — also viewable as LinkedIn, Twitter/X, Facebook, and GitHub profiles via the tabs above.`,
    },
  ];
}

function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="mb-3 text-sm font-semibold tracking-wide text-gray-400 uppercase dark:text-gray-500">
      {children}
    </h2>
  );
}

export default function Home() {
  return (
    <main className="mx-auto max-w-3xl px-4 pt-10 pb-20">
      {/* Header */}
      <div className="flex flex-col items-center text-center">
        <Avatar size={88} ring={person.openToWork ? "openToWork" : "none"} />
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          {person.fullName}
        </h1>
        <p className="mt-1 text-lg text-gray-500 dark:text-gray-400">
          {person.title}
        </p>

        <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1.5 text-sm text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" /> {person.location}
          </span>
          <a
            href={`mailto:${person.email}`}
            className="flex items-center gap-1 hover:underline"
          >
            <Mail className="h-3.5 w-3.5" /> {person.email}
          </a>
        </div>

        <div className="mt-3 flex items-center gap-4 text-gray-400">
          <a
            href={person.links.github}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="GitHub"
          >
            <Code2 className="h-5 w-5" />
          </a>
          <a
            href={person.links.linkedin}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="LinkedIn"
          >
            <Briefcase className="h-5 w-5" />
          </a>
          <a
            href={person.links.website}
            target="_blank"
            rel="noreferrer"
            className="transition-colors hover:text-gray-700 dark:hover:text-gray-200"
            aria-label="Website"
          >
            <Globe className="h-5 w-5" />
          </a>
        </div>

        {person.openToWork && (
          <p className="mt-4 inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
            #OpenToWork — Remote &amp; greater Phoenix, AZ opportunities
          </p>
        )}

        <div className="mt-6 max-w-md rounded-lg border border-gray-200 bg-gray-50 px-4 py-3 text-xs text-gray-500 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400">
          <strong className="text-gray-700 dark:text-gray-300">
            Heads up:
          </strong>{" "}
          the tabs above aren&apos;t links to my real LinkedIn, X, Facebook, or
          GitHub accounts. They&apos;re this same résumé data restyled to look
          like each platform — a demo of what I can build, not my actual
          profiles. (My real ones are linked above.) Stylistic homage only, not
          affiliated with LinkedIn, X Corp., Meta, or GitHub.
        </div>
      </div>

      {/* Summary */}
      <section className="mt-12">
        <SectionHeading>Summary</SectionHeading>
        <p className="text-[15px] leading-relaxed text-gray-700 dark:text-gray-300">
          {person.summary}
        </p>
      </section>

      {/* Experience */}
      <section className="mt-10">
        <SectionHeading>Experience</SectionHeading>
        <div className="flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
          {experience.map((job) => (
            <div key={job.id} className="flex gap-3 py-4 first:pt-0">
              <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 dark:text-gray-700" />
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-baseline justify-between gap-x-3">
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    {job.role}{" "}
                    <span className="font-normal text-gray-500 dark:text-gray-400">
                      · {job.company}
                    </span>
                  </h3>
                  <p className="text-xs whitespace-nowrap text-gray-400 dark:text-gray-500">
                    {job.dateRange}
                  </p>
                </div>
                <p className="text-xs text-gray-400 dark:text-gray-500">
                  {job.location}
                </p>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {job.highlights.map((h) => (
                    <span
                      key={h.title}
                      className="rounded-full border border-gray-200 px-2.5 py-0.5 text-xs text-gray-600 dark:border-gray-700 dark:text-gray-400"
                    >
                      {h.title}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <details className="group mt-3">
          <summary className="cursor-pointer text-xs font-medium text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300">
            Show earlier experience ({earlyCareer.length})
          </summary>
          <div className="mt-3 flex flex-col gap-3">
            {earlyCareer.map((job) => (
              <div
                key={job.id}
                className="flex items-baseline justify-between gap-3 text-sm"
              >
                <span className="text-gray-700 dark:text-gray-300">
                  {job.role}{" "}
                  <span className="text-gray-400 dark:text-gray-500">
                    · {job.company}
                  </span>
                </span>
                <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                  {job.dateRange}
                </span>
              </div>
            ))}
          </div>
        </details>
      </section>

      {/* Education */}
      <section className="mt-10">
        <SectionHeading>Education</SectionHeading>
        <div className="flex flex-col gap-3">
          {education.map((ed) => (
            <div key={ed.id} className="flex items-start gap-3">
              <GraduationCap className="mt-0.5 h-4 w-4 shrink-0 text-gray-300 dark:text-gray-700" />
              <div className="flex min-w-0 flex-1 flex-wrap items-baseline justify-between gap-x-3">
                <p className="text-sm text-gray-700 dark:text-gray-300">
                  <span className="font-semibold text-gray-900 dark:text-white">
                    {ed.school}
                  </span>{" "}
                  — {ed.credential}
                </p>
                <span className="shrink-0 text-xs text-gray-400 dark:text-gray-500">
                  {ed.year}
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Skills */}
      <section className="mt-10">
        <SectionHeading>Skills</SectionHeading>
        <div className="flex flex-col gap-3">
          {skillGroups.map((group) => (
            <div
              key={group.category}
              className="flex flex-wrap items-baseline gap-x-2 gap-y-1.5 text-sm"
            >
              <span className="font-medium text-gray-900 dark:text-white">
                {group.category}:
              </span>
              <span className="text-gray-600 dark:text-gray-400">
                {group.skills.join(", ")}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
