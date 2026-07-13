import {
  type RouteConfig,
  index,
  layout,
  route,
} from "@react-router/dev/routes";

export default [
  layout("layout/platform-layout.tsx", [
    index("routes/home.tsx"),
    route("linkedin", "routes/linkedin.tsx"),
    route("twitter", "routes/twitter.tsx"),
    route("facebook", "routes/facebook.tsx"),
    route("github", "routes/github.tsx"),
  ]),
] satisfies RouteConfig;
