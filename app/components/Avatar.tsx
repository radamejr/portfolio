import { useLocation } from "react-router";
import { person, avatarPhotos } from "~/data/resume";
import { seededInt } from "~/lib/helpers";

type AvatarProps = {
  size?: number;
  className?: string;
  ring?: "none" | "openToWork";
};

export function Avatar({
  size = 64,
  className = "",
  ring = "none",
}: AvatarProps) {
  const { pathname } = useLocation();
  const photo = avatarPhotos[seededInt(pathname, 0, avatarPhotos.length - 1)];
  return (
    <div
      className={`relative shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      <img
        src={photo}
        alt={person.fullName}
        className="h-full w-full rounded-full object-cover select-none"
      />
      {ring === "openToWork" && (
        <div
          className="absolute inset-0 rounded-full ring-4 ring-emerald-500"
          aria-hidden
        />
      )}
      {ring === "openToWork" && (
        <div
          className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-emerald-600 px-1.5 py-0.5 text-[9px] font-semibold whitespace-nowrap text-white shadow"
          style={{ fontSize: Math.max(8, size * 0.12) }}
        >
          #OpenToWork
        </div>
      )}
    </div>
  );
}
