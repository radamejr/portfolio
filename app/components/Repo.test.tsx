import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import RepoComponent from "~/components/Repo";
import { seededInt } from "~/lib/helpers";
import type { Repo } from "~/lib/types";

const sampleRepo: Repo = {
  name: "sample-repo",
  description: "A sample repository for testing.",
  language: "TypeScript",
  color: "#3178c6",
};

describe("RepoComponent", () => {
  it("renders the repo name, description, and language", () => {
    render(<RepoComponent repo={sampleRepo} />);
    expect(screen.getByText(sampleRepo.name)).toBeInTheDocument();
    expect(screen.getByText(sampleRepo.description)).toBeInTheDocument();
    expect(screen.getByText(sampleRepo.language)).toBeInTheDocument();
  });

  it("shows the star and fork counts seeded from the repo name", () => {
    render(<RepoComponent repo={sampleRepo} />);
    expect(
      screen.getByText(String(seededInt(`star-${sampleRepo.name}`, 3, 340))),
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(seededInt(`fork-${sampleRepo.name}`, 0, 60))),
    ).toBeInTheDocument();
  });

  it("colors the language dot with the repo's color", () => {
    const { container } = render(<RepoComponent repo={sampleRepo} />);
    const dot = container.querySelector(".rounded-full") as HTMLElement;
    expect(dot.style.backgroundColor).toBeTruthy();
  });
});
