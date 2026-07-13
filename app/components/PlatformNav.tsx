import { Link, useLocation } from "react-router";
import { Home, Briefcase, MessageCircle, Users, Code2 } from "lucide-react";

const items = [
  {
    to: "/",
    label: "Home",
    icon: Home,
    accent: "text-gray-900 dark:text-white",
  },
  {
    to: "/linkedin",
    label: "LinkedIn",
    icon: Briefcase,
    accent: "text-[#0A66C2]",
  },
  {
    to: "/twitter",
    label: "Twitter/X",
    icon: MessageCircle,
    accent: "text-sky-500",
  },
  { to: "/facebook", label: "Facebook", icon: Users, accent: "text-[#1877F2]" },
  { to: "/github", label: "GitHub", icon: Code2, accent: "text-violet-500" },
];

export function PlatformNav() {
  const location = useLocation();

  return (
    <nav className="sticky top-0 z-50 flex justify-center px-3 pt-3">
      <div className="flex max-w-full items-center gap-1 overflow-x-auto rounded-full border border-gray-200 bg-white/80 p-1.5 shadow-lg shadow-black/5 backdrop-blur-md dark:border-gray-800 dark:bg-gray-900/80">
        {items.map(({ to, label, icon: Icon, accent }) => {
          const active = location.pathname === to;
          return (
            <Link
              key={to}
              to={to}
              className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium whitespace-nowrap transition-colors ${
                active
                  ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                  : "text-gray-500 hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-800"
              }`}
            >
              <Icon
                className={`h-4 w-4 ${active ? "" : accent}`}
                strokeWidth={2.25}
              />
              <span className="hidden sm:inline">{label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
