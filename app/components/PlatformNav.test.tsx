import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { PlatformNav } from "~/components/PlatformNav";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <PlatformNav />
    </MemoryRouter>,
  );
}

describe("PlatformNav", () => {
  it("renders a link for every platform", () => {
    renderAt("/");
    expect(screen.getByRole("link", { name: /Home/i })).toHaveAttribute(
      "href",
      "/",
    );
    expect(screen.getByRole("link", { name: /LinkedIn/i })).toHaveAttribute(
      "href",
      "/linkedin",
    );
    expect(screen.getByRole("link", { name: /Twitter\/X/i })).toHaveAttribute(
      "href",
      "/twitter",
    );
    expect(screen.getByRole("link", { name: /Facebook/i })).toHaveAttribute(
      "href",
      "/facebook",
    );
    expect(screen.getByRole("link", { name: /GitHub/i })).toHaveAttribute(
      "href",
      "/github",
    );
  });

  it("marks the current route's tab active and leaves the rest inactive", () => {
    renderAt("/twitter");
    const active = screen.getByRole("link", { name: /Twitter\/X/i });
    const inactive = screen.getByRole("link", { name: /Home/i });
    expect(active.className).toContain("bg-gray-900");
    expect(inactive.className).not.toContain("bg-gray-900");
  });

  it("marks Home active at the root route", () => {
    renderAt("/");
    const active = screen.getByRole("link", { name: /Home/i });
    expect(active.className).toContain("bg-gray-900");
  });
});
