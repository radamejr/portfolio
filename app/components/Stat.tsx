import type { Heart } from "lucide-react";
import { seededInt } from "~/lib/helpers";

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

export default Stat;
