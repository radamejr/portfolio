import type { Route } from "./+types/linkedin";
import {
  MapPin,
  Mail,
  GraduationCap,
  Building2,
  Link2,
  ThumbsUp,
} from "lucide-react";
import {
  person,
  experience,
  earlyCareer,
  education,
  skillGroups,
} from "~/data/resume";
import { seededInt, formatDisplayUrl } from "~/lib/helpers";
import { Avatar } from "~/components/Avatar";
import CardComponent from "~/components/CardComponent";

export function meta({}: Route.MetaArgs) {
  return [{ title: `${person.displayName} | LinkedIn-style profile` }];
}

export default function LinkedIn() {
  return (
    <main className="mx-auto max-w-5xl px-3 pb-20 sm:px-4">
      {/* Profile header */}
      <div className="overflow-hidden rounded-lg border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="h-28 bg-gradient-to-r from-[#0A66C2] to-[#66B2FF] sm:h-36" />
        <div className="px-5 pb-5">
          <div className="-mt-10 sm:-mt-12">
            <Avatar
              size={88}
              ring={person.openToWork ? "openToWork" : "none"}
              className="rounded-full border-4 border-white dark:border-gray-900"
            />
          </div>
          <h1 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            {person.fullName}
          </h1>
          <p className="mt-0.5 text-base text-gray-700 dark:text-gray-300">
            {person.title}
          </p>
          <p className="mt-1 flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-3.5 w-3.5" />
            {person.location} ·{" "}
            <span className="text-[#0A66C2] dark:text-sky-400">
              500+ connections
            </span>
          </p>
          {person.openToWork && (
            <p className="mt-2 inline-block rounded bg-emerald-50 px-2 py-1 text-xs font-medium text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400">
              #OpenToWork — Remote &amp; greater Phoenix, AZ opportunities
            </p>
          )}
          <div className="mt-4 flex flex-wrap gap-2">
            <a
              href={person.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-[#0A66C2] px-4 py-1.5 text-sm font-semibold text-white transition-opacity hover:opacity-90"
            >
              Connect
            </a>
            <a
              href={`mailto:${person.email}`}
              className="rounded-full border border-gray-400 px-4 py-1.5 text-sm font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-800"
            >
              Message
            </a>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {/* Main column */}
        <div className="flex flex-col gap-4 lg:col-span-2">
          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              About
            </h2>
            <p className="mt-2 text-sm leading-relaxed whitespace-pre-line text-gray-700 dark:text-gray-300">
              {person.summary}
            </p>
          </CardComponent>

          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Experience
            </h2>
            <div className="mt-3 flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
              {experience.map((job) => (
                <div
                  key={job.id}
                  className="flex gap-3 py-4 first:pt-0 last:pb-0"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <Building2 className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {job.role}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {job.company}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {job.dateRange} · {job.location}
                    </p>
                    <ul className="mt-2 space-y-2">
                      {job.highlights.map((h) => (
                        <li
                          key={h.title}
                          className="text-sm text-gray-700 dark:text-gray-300"
                        >
                          <span className="font-medium text-gray-900 dark:text-white">
                            {h.title}:{" "}
                          </span>
                          {h.body}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}

              <div className="pt-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-500 dark:text-gray-400">
                  Earlier experience
                </h3>
                {earlyCareer.map((job) => (
                  <div key={job.id} className="flex gap-3 py-2">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                      <Building2 className="h-5 w-5" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="text-sm font-semibold text-gray-900 dark:text-white">
                        {job.role}
                      </h4>
                      <p className="text-sm text-gray-700 dark:text-gray-300">
                        {job.company}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {job.dateRange}
                      </p>
                      <p className="mt-1 text-sm text-gray-700 dark:text-gray-300">
                        {job.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardComponent>

          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Education
            </h2>
            <div className="mt-3 flex flex-col divide-y divide-gray-100 dark:divide-gray-800">
              {education.map((ed) => (
                <div
                  key={ed.id}
                  className="flex gap-3 py-3 first:pt-0 last:pb-0"
                >
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400">
                    <GraduationCap className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {ed.school}
                    </h3>
                    <p className="text-sm text-gray-700 dark:text-gray-300">
                      {ed.credential}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {ed.year}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardComponent>

          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Skills
            </h2>
            <div className="mt-3 flex flex-col gap-4">
              {skillGroups.map((group) => (
                <div key={group.category}>
                  <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400">
                    {group.category}
                  </h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="flex items-center gap-1 rounded-full border border-gray-200 px-3 py-1 text-xs text-gray-700 dark:border-gray-700 dark:text-gray-300"
                      >
                        {skill}
                        <span className="flex items-center gap-0.5 text-[10px] text-gray-400">
                          <ThumbsUp className="h-2.5 w-2.5" />
                          {seededInt(skill, 4, 63)}
                        </span>
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </CardComponent>
        </div>

        {/* Sidebar */}
        <div className="flex flex-col gap-4">
          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              Contact info
            </h2>
            <ul className="mt-3 flex flex-col gap-3 text-sm">
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Mail className="h-4 w-4 text-gray-400" />
                <a
                  href={`mailto:${person.email}`}
                  className="hover:text-[#0A66C2] hover:underline"
                >
                  {person.email}
                </a>
              </li>
              <li className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                <Link2 className="h-4 w-4 text-gray-400" />
                <a
                  href={person.links.website}
                  target="_blank"
                  rel="noreferrer"
                  className="truncate hover:text-[#0A66C2] hover:underline"
                >
                  {formatDisplayUrl(person.links.website)}
                </a>
              </li>
            </ul>
          </CardComponent>

          <CardComponent>
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
              At a glance
            </h2>
            <dl className="mt-3 grid grid-cols-2 gap-3 text-center">
              <div className="rounded bg-gray-50 py-3 dark:bg-gray-800">
                <dt className="text-xs text-gray-500 dark:text-gray-400">
                  Years experience
                </dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                  6+
                </dd>
              </div>
              <div className="rounded bg-gray-50 py-3 dark:bg-gray-800">
                <dt className="text-xs text-gray-500 dark:text-gray-400">
                  Skills listed
                </dt>
                <dd className="text-lg font-semibold text-gray-900 dark:text-white">
                  {skillGroups.reduce((n, g) => n + g.skills.length, 0)}
                </dd>
              </div>
            </dl>
          </CardComponent>
        </div>
      </div>
    </main>
  );
}
