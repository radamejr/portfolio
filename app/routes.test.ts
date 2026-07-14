import { describe, it, expect } from "vitest";
import routes from "~/routes";

describe("routes", () => {
  it("wraps every page in the platform layout", () => {
    expect(routes).toHaveLength(1);
    expect(routes[0].file).toBe("layout/platform-layout.tsx");
  });

  it("registers the home index route plus one route per platform", () => {
    const children = routes[0].children ?? [];
    expect(children).toHaveLength(5);

    const files = children.map((c) => c.file);
    expect(files).toEqual([
      "routes/home.tsx",
      "routes/linkedin.tsx",
      "routes/twitter.tsx",
      "routes/facebook.tsx",
      "routes/github.tsx",
    ]);

    const paths = children.map((c) => c.path);
    expect(paths).toEqual([
      undefined,
      "linkedin",
      "twitter",
      "facebook",
      "github",
    ]);
  });
});
