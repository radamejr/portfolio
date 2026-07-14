import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import LinkedIn, { meta } from "~/routes/linkedin";
import {
  person,
  experience,
  earlyCareer,
  education,
  skillGroups,
} from "~/data/resume";
import { seededInt } from "~/lib/helpers";

function renderLinkedIn() {
  return render(
    <MemoryRouter initialEntries={["/linkedin"]}>
      <LinkedIn />
    </MemoryRouter>,
  );
}

describe("linkedin meta", () => {
  it("includes the person's name in the title", () => {
    const tags = meta({} as Parameters<typeof meta>[0]);
    const title = tags.find((t) => "title" in t) as { title: string };
    expect(title.title).toContain(person.displayName);
  });
});

describe("LinkedIn", () => {
  it("renders the header with name and headline", () => {
    renderLinkedIn();
    expect(
      screen.getByRole("heading", { name: person.fullName }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(person.title).length).toBeGreaterThan(0);
    expect(screen.getByText(/500\+ connections/)).toBeInTheDocument();
  });

  it("shows the open-to-work banner when person.openToWork is true", () => {
    renderLinkedIn();
    expect(
      screen.getByText(/greater Phoenix, AZ opportunities/),
    ).toBeInTheDocument();
  });

  it("has Connect and Message actions", () => {
    renderLinkedIn();
    expect(screen.getByRole("link", { name: "Connect" })).toHaveAttribute(
      "href",
      person.links.linkedin,
    );
    expect(screen.getByRole("link", { name: "Message" })).toHaveAttribute(
      "href",
      `mailto:${person.email}`,
    );
  });

  it("renders the About section", () => {
    renderLinkedIn();
    expect(screen.getByText(person.summary)).toBeInTheDocument();
  });

  it("renders every experience entry with role, company, and highlights", () => {
    renderLinkedIn();
    for (const job of experience) {
      expect(
        screen.getAllByText(job.company, { exact: false }).length,
      ).toBeGreaterThan(0);
      for (const highlight of job.highlights) {
        expect(screen.getByText(`${highlight.title}:`)).toBeInTheDocument();
      }
    }
  });

  it("renders earlier experience entries", () => {
    renderLinkedIn();
    expect(screen.getByText("Earlier experience")).toBeInTheDocument();
    for (const job of earlyCareer) {
      expect(
        screen.getAllByText(job.company, { exact: false }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("renders every education entry", () => {
    renderLinkedIn();
    for (const ed of education) {
      expect(
        screen.getAllByText(ed.school, { exact: false }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("renders every skill with its own seeded endorsement count", () => {
    renderLinkedIn();
    for (const group of skillGroups) {
      expect(screen.getByText(group.category)).toBeInTheDocument();
      for (const skill of group.skills) {
        const pill = screen.getByText(skill).closest("span") as HTMLElement;
        expect(
          within(pill).getByText(String(seededInt(skill, 4, 63))),
        ).toBeInTheDocument();
      }
    }
  });

  it("shows contact info and at-a-glance stats", () => {
    renderLinkedIn();
    expect(screen.getByText(person.email)).toBeInTheDocument();

    const yearsCard = screen
      .getByText("Years experience")
      .closest("div") as HTMLElement;
    expect(within(yearsCard).getByText("6+")).toBeInTheDocument();

    const totalSkills = skillGroups.reduce((n, g) => n + g.skills.length, 0);
    const skillsCard = screen
      .getByText("Skills listed")
      .closest("div") as HTMLElement;
    expect(
      within(skillsCard).getByText(String(totalSkills)),
    ).toBeInTheDocument();
  });
});

describe("LinkedIn without openToWork", () => {
  afterEach(() => {
    vi.doUnmock("~/data/resume");
    vi.resetModules();
  });

  it("hides the open-to-work banner when person.openToWork is false", async () => {
    vi.resetModules();
    vi.doMock("~/data/resume", async () => {
      const actual =
        await vi.importActual<typeof import("~/data/resume")>("~/data/resume");
      return { ...actual, person: { ...actual.person, openToWork: false } };
    });

    const { default: LinkedInWithoutOpenToWork } =
      await import("~/routes/linkedin");
    render(
      <MemoryRouter initialEntries={["/linkedin"]}>
        <LinkedInWithoutOpenToWork />
      </MemoryRouter>,
    );
    expect(
      screen.queryByText(/greater Phoenix, AZ opportunities/),
    ).not.toBeInTheDocument();
  });
});
