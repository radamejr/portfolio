import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import Home, { meta } from "~/routes/home";
import {
  person,
  experience,
  earlyCareer,
  education,
  skillGroups,
} from "~/data/resume";

function renderHome() {
  return render(
    <MemoryRouter initialEntries={["/"]}>
      <Home />
    </MemoryRouter>,
  );
}

describe("home meta", () => {
  it("includes the person's name in the title", () => {
    const tags = meta({} as Parameters<typeof meta>[0]);
    const title = tags.find((t) => "title" in t) as { title: string };
    expect(title.title).toContain(person.displayName);
  });
});

describe("Home", () => {
  it("renders the header with name, title, and email", () => {
    renderHome();
    expect(
      screen.getByRole("heading", { name: person.fullName }),
    ).toBeInTheDocument();
    expect(screen.getAllByText(person.title).length).toBeGreaterThan(0);
    expect(screen.getByText(person.email)).toBeInTheDocument();
  });

  it("links out to github, linkedin, and the personal site", () => {
    renderHome();
    expect(screen.getByLabelText("GitHub")).toHaveAttribute(
      "href",
      person.links.github,
    );
    expect(screen.getByLabelText("LinkedIn")).toHaveAttribute(
      "href",
      person.links.linkedin,
    );
    expect(screen.getByLabelText("Website")).toHaveAttribute(
      "href",
      person.links.website,
    );
  });

  it("shows the open-to-work badge when person.openToWork is true", () => {
    renderHome();
    expect(
      screen.getByText(/greater Phoenix, AZ opportunities/),
    ).toBeInTheDocument();
  });

  it("renders the summary", () => {
    renderHome();
    expect(screen.getByText(person.summary)).toBeInTheDocument();
  });

  it("renders every experience entry with its highlight chips", () => {
    renderHome();
    for (const job of experience) {
      expect(
        screen.getAllByText(job.company, { exact: false }).length,
      ).toBeGreaterThan(0);
      for (const highlight of job.highlights) {
        expect(screen.getByText(highlight.title)).toBeInTheDocument();
      }
    }
  });

  it("reveals earlier experience once expanded", () => {
    renderHome();
    expect(
      screen.getByText(`Show earlier experience (${earlyCareer.length})`),
    ).toBeInTheDocument();
    for (const job of earlyCareer) {
      expect(
        screen.getAllByText(job.company, { exact: false }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("renders every education entry", () => {
    renderHome();
    for (const ed of education) {
      expect(
        screen.getAllByText(ed.school, { exact: false }).length,
      ).toBeGreaterThan(0);
    }
  });

  it("renders every skill group", () => {
    renderHome();
    for (const group of skillGroups) {
      expect(screen.getByText(`${group.category}:`)).toBeInTheDocument();
    }
  });
});

describe("Home without openToWork", () => {
  afterEach(() => {
    vi.doUnmock("~/data/resume");
    vi.resetModules();
  });

  it("hides the open-to-work badge when person.openToWork is false", async () => {
    vi.resetModules();
    vi.doMock("~/data/resume", async () => {
      const actual =
        await vi.importActual<typeof import("~/data/resume")>("~/data/resume");
      return { ...actual, person: { ...actual.person, openToWork: false } };
    });

    const { default: HomeWithoutOpenToWork } = await import("~/routes/home");
    render(
      <MemoryRouter initialEntries={["/"]}>
        <HomeWithoutOpenToWork />
      </MemoryRouter>,
    );
    expect(
      screen.queryByText(/greater Phoenix, AZ opportunities/),
    ).not.toBeInTheDocument();
  });
});
