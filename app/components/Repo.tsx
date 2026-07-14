import { BookMarked, GitFork, Star } from "lucide-react";
import { seededInt } from "~/lib/helpers";
import type { Repo } from "~/lib/types";

function RepoComponent({ repo }: { repo: Repo }) {
  return (
    <div
      key={repo.name}
      className="flex flex-col rounded-md border border-gray-200 bg-white p-4 dark:border-gray-800 dark:bg-gray-900"
    >
      <div className="flex items-center gap-1.5 text-sm font-semibold text-sky-700 dark:text-sky-400">
        <BookMarked className="h-4 w-4 text-gray-400" />
        {repo.name}
      </div>
      <p className="mt-2 flex-1 text-xs text-gray-600 dark:text-gray-400">
        {repo.description}
      </p>
      <div className="mt-3 flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
        <span className="flex items-center gap-1.5">
          <span
            className="h-2.5 w-2.5 rounded-full"
            style={{ backgroundColor: repo.color }}
          />
          {repo.language}
        </span>
        <span className="flex items-center gap-1">
          <Star className="h-3.5 w-3.5" />{" "}
          {seededInt(`star-${repo.name}`, 3, 340)}
        </span>
        <span className="flex items-center gap-1">
          <GitFork className="h-3.5 w-3.5" />{" "}
          {seededInt(`fork-${repo.name}`, 0, 60)}
        </span>
      </div>
    </div>
  );
}

export default RepoComponent;
