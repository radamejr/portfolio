import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Facebook, { meta } from "~/routes/facebook";
import { person, experience, earlyCareer, education } from "~/data/resume";

function renderFacebook() {
  return render(
    <MemoryRouter initialEntries={["/facebook"]}>
      <Facebook />
    </MemoryRouter>,
  );
}

describe("facebook meta", () => {
  it("includes the person's name in the title", () => {
    const tags = meta({} as Parameters<typeof meta>[0]);
    const title = tags.find((t) => "title" in t) as { title: string };
    expect(title.title).toContain(person.displayName);
  });
});

describe("Facebook", () => {
  it("renders the cover header with name, title, and location", () => {
    renderFacebook();
    expect(
      screen.getByRole("heading", { name: person.fullName }),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${person.title} · ${person.location}`),
    ).toBeInTheDocument();
  });

  it("has Add Friend and Message actions", () => {
    renderFacebook();
    expect(screen.getByRole("link", { name: "+ Add Friend" })).toHaveAttribute(
      "href",
      `mailto:${person.email}`,
    );
    expect(screen.getByRole("link", { name: "Message" })).toHaveAttribute(
      "href",
      `mailto:${person.email}`,
    );
  });

  it("renders all four profile tabs", () => {
    renderFacebook();
    for (const tab of ["Posts", "About", "Friends", "Photos"]) {
      expect(screen.getByText(tab)).toBeInTheDocument();
    }
  });

  it("renders the Intro card with work, education, and location", () => {
    renderFacebook();
    expect(screen.getByText("Intro")).toBeInTheDocument();
    expect(screen.getByText(person.summary)).toBeInTheDocument();
    expect(
      screen.getAllByText(experience[0].company, { exact: false }).length,
    ).toBeGreaterThan(0);
    expect(
      screen.getAllByText(education[0].school, { exact: false }).length,
    ).toBeGreaterThan(0);
  });

  it("renders a timeline article for every job-start and education event", () => {
    renderFacebook();
    const expectedCount =
      experience.length + earlyCareer.length + education.length;
    expect(screen.getAllByRole("article").length).toBe(expectedCount);
  });

  it("shows highlight body text on a job-start event", () => {
    renderFacebook();
    const job = experience[0];
    const heading = screen.getByText(
      `started a new position as ${job.role} at ${job.company}`,
      { exact: false },
    );
    const article = heading.closest("article") as HTMLElement;
    expect(
      within(article).getByText(job.highlights[0].title, { exact: false }),
    ).toBeInTheDocument();
  });

  it("omits a body paragraph on an education event", () => {
    renderFacebook();
    const ed = education[0];
    const heading = screen.getByText(
      `completed ${ed.credential} at ${ed.school}`,
      { exact: false },
    );
    const article = heading.closest("article") as HTMLElement;
    // Only the reaction bar's "Comment" button text should be present, not a body <p>.
    const bodyParagraphs = article.querySelectorAll("p.px-4.text-sm");
    expect(bodyParagraphs.length).toBe(0);
  });

  it("renders a working reaction bar on every event", () => {
    renderFacebook();
    const likeButtons = screen.getAllByRole("button", { name: /Like/ });
    const commentButtons = screen.getAllByRole("button", { name: /Comment/ });
    const shareButtons = screen.getAllByRole("button", { name: /Share/ });
    const expectedCount =
      experience.length + earlyCareer.length + education.length;
    expect(likeButtons.length).toBe(expectedCount);
    expect(commentButtons.length).toBe(expectedCount);
    expect(shareButtons.length).toBe(expectedCount);
  });
});

describe("Facebook without openToWork", () => {
  afterEach(() => {
    vi.doUnmock("~/data/resume");
    vi.resetModules();
  });

  it("passes ring=none to the avatar when person.openToWork is false", async () => {
    vi.resetModules();
    vi.doMock("~/data/resume", async () => {
      const actual =
        await vi.importActual<typeof import("~/data/resume")>("~/data/resume");
      return { ...actual, person: { ...actual.person, openToWork: false } };
    });

    const { default: FacebookWithoutOpenToWork } =
      await import("~/routes/facebook");
    render(
      <MemoryRouter initialEntries={["/facebook"]}>
        <FacebookWithoutOpenToWork />
      </MemoryRouter>,
    );
    // No #OpenToWork ring badge should render on the avatar.
    expect(screen.queryByText("#OpenToWork")).not.toBeInTheDocument();
  });
});
