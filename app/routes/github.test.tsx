import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import GitHub, { meta } from "~/routes/github";
import { person, experience, allSkills } from "~/data/resume";
import {
  seededInt,
  CONTRIBUTION_WEEKS,
  CONTRIBUTION_DAYS,
} from "~/lib/helpers";

const repos = [
  "xpgeo-studio",
  "api-viewer-2.0",
  "aerialsphere-webapp",
  "esri-cli-go-port",
  "ci-testing-suite",
  "shared-component-library",
];

function renderGitHub() {
  return render(
    <MemoryRouter initialEntries={["/github"]}>
      <GitHub />
    </MemoryRouter>,
  );
}

describe("github meta", () => {
  it("includes the person's handle in the title", () => {
    const tags = meta({} as Parameters<typeof meta>[0]);
    const title = tags.find((t) => "title" in t) as { title: string };
    expect(title.title).toContain(person.handle);
  });
});

describe("GitHub", () => {
  it("renders the profile sidebar with name, handle, and tagline", () => {
    renderGitHub();
    expect(
      screen.getByRole("heading", { name: person.displayName }),
    ).toBeInTheDocument();
    expect(screen.getByText(person.handle)).toBeInTheDocument();
    expect(screen.getByText(/6\+ years writing software/)).toBeInTheDocument();
  });

  it("links Follow to the real github profile", () => {
    renderGitHub();
    expect(screen.getByRole("link", { name: "Follow" })).toHaveAttribute(
      "href",
      person.links.github,
    );
  });

  it("shows seeded followers/following counts", () => {
    const { container } = renderGitHub();
    const followersLi = Array.from(container.querySelectorAll("li")).find(
      (li) => li.textContent?.includes("followers"),
    ) as HTMLElement;
    expect(followersLi.textContent).toContain(
      String(seededInt(`${person.handle}followers-gh`, 40, 620)),
    );
    expect(followersLi.textContent).toContain(
      String(seededInt(`${person.handle}following-gh`, 10, 90)),
    );
  });

  it("shows the current company, location, email, and website", () => {
    renderGitHub();
    expect(
      screen.getAllByText(experience[0].company, { exact: false }).length,
    ).toBeGreaterThan(0);
    expect(screen.getByText(person.email)).toHaveAttribute(
      "href",
      `mailto:${person.email}`,
    );
    expect(
      screen.getByText(person.links.website.replace("https://", "")),
    ).toHaveAttribute("href", person.links.website);
  });

  it("lists skills with a total count", () => {
    renderGitHub();
    expect(
      screen.getByText(`Skills · ${allSkills.length} technologies`),
    ).toBeInTheDocument();
    expect(screen.getByText(allSkills[0])).toBeInTheDocument();
  });

  it("renders the README section with the summary", () => {
    renderGitHub();
    expect(screen.getByText("# README.md")).toBeInTheDocument();
    expect(screen.getByText(person.summary)).toBeInTheDocument();
  });

  it("renders every pinned repo with its own stars and forks", () => {
    renderGitHub();
    for (const name of repos) {
      const card = screen.getByText(name).parentElement as HTMLElement;
      expect(
        within(card).getByText(String(seededInt(`star-${name}`, 3, 340))),
      ).toBeInTheDocument();
      expect(
        within(card).getByText(String(seededInt(`fork-${name}`, 0, 60))),
      ).toBeInTheDocument();
    }
  });

  it("renders the contribution graph heading and full grid", () => {
    const { container } = renderGitHub();
    expect(
      screen.getByText("1,337 contributions in the last year"),
    ).toBeInTheDocument();
    expect(container.textContent).toContain("Less");
    expect(container.textContent).toContain("More");
    // 364 grid cells + 5 legend swatches, all sharing the rounded-sm class.
    expect(container.querySelectorAll(".rounded-sm").length).toBe(
      CONTRIBUTION_WEEKS * CONTRIBUTION_DAYS + 5,
    );
  });
});
