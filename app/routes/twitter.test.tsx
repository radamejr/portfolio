import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Twitter, { meta } from "~/routes/twitter";
import { person, experience, earlyCareer, education } from "~/data/resume";
import { seededInt } from "~/lib/helpers";

function renderTwitter() {
  return render(
    <MemoryRouter initialEntries={["/twitter"]}>
      <Twitter />
    </MemoryRouter>,
  );
}

const earliestYear = Math.min(
  ...experience.map((j) => new Date(j.startDate).getFullYear()),
  ...earlyCareer.map((j) => new Date(j.startDate).getFullYear()),
);

describe("twitter meta", () => {
  it("includes the person's name and handle in the title", () => {
    const tags = meta({} as Parameters<typeof meta>[0]);
    const title = tags.find((t) => "title" in t) as { title: string };
    expect(title.title).toContain(person.displayName);
    expect(title.title).toContain(person.handle);
  });
});

describe("Twitter", () => {
  it("renders the profile header with name, handle, and website", () => {
    renderTwitter();
    const heading = screen.getByRole("heading", { name: person.displayName });
    expect(heading).toBeInTheDocument();
    const headerBlock = heading.parentElement?.parentElement as HTMLElement;
    expect(
      within(headerBlock).getByText(`@${person.handle}`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(person.links.website.replace("https://", "")),
    ).toHaveAttribute("href", person.links.website);
    expect(screen.getByText(`Joined ${earliestYear}`)).toBeInTheDocument();
  });

  it("shows the open-to-work line in the bio when person.openToWork is true", () => {
    renderTwitter();
    expect(
      screen.getByText(/Open to remote\/on-site roles/),
    ).toBeInTheDocument();
  });

  it("shows following/followers counts scoped to their own labels", () => {
    renderTwitter();
    const followingWrapper = screen.getByText("Following")
      .parentElement as HTMLElement;
    expect(
      within(followingWrapper).getByText(
        String(seededInt(`${person.handle}following`, 180, 640)),
      ),
    ).toBeInTheDocument();

    const followersWrapper = screen.getByText("Followers")
      .parentElement as HTMLElement;
    expect(
      within(followersWrapper).getByText(
        seededInt(`${person.handle}followers`, 900, 12000).toLocaleString(),
      ),
    ).toBeInTheDocument();
  });

  it("renders all four feed tabs", () => {
    renderTwitter();
    for (const tab of ["Posts", "Replies", "Highlights", "Media"]) {
      expect(screen.getByText(tab)).toBeInTheDocument();
    }
  });

  it("pins the summary as the first post", () => {
    renderTwitter();
    expect(screen.getByText("Pinned")).toBeInTheDocument();
    const pinnedArticle = screen
      .getByText("Pinned")
      .closest("article") as HTMLElement;
    expect(within(pinnedArticle).getByText(person.summary)).toBeInTheDocument();
  });

  it("renders a post for every experience highlight", () => {
    renderTwitter();
    const job = experience[0];
    const highlight = job.highlights[0];
    expect(
      screen.getByText(`${highlight.title} — ${job.company}:`),
    ).toBeInTheDocument();
  });

  it("renders one article per post plus the pinned post", () => {
    renderTwitter();
    const totalPosts =
      experience.reduce((n, j) => n + j.highlights.length, 0) +
      earlyCareer.length +
      education.length;
    const articles = screen.getAllByRole("article");
    expect(articles.length).toBe(totalPosts + 1); // +1 pinned
  });
});

describe("Twitter without openToWork", () => {
  afterEach(() => {
    vi.doUnmock("~/data/resume");
    vi.resetModules();
  });

  it("omits the open-to-work line when person.openToWork is false", async () => {
    vi.resetModules();
    vi.doMock("~/data/resume", async () => {
      const actual =
        await vi.importActual<typeof import("~/data/resume")>("~/data/resume");
      return { ...actual, person: { ...actual.person, openToWork: false } };
    });

    const { default: TwitterWithoutOpenToWork } =
      await import("~/routes/twitter");
    render(
      <MemoryRouter initialEntries={["/twitter"]}>
        <TwitterWithoutOpenToWork />
      </MemoryRouter>,
    );
    expect(
      screen.queryByText(/Open to remote\/on-site roles/),
    ).not.toBeInTheDocument();
  });
});
