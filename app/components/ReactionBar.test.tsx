import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ReactionBar from "~/components/ReactionBar";
import { seededInt } from "~/lib/helpers";

describe("ReactionBar", () => {
  it("shows the like count and comment count seeded from its seed prop", () => {
    const seed = "test-event-1";
    render(<ReactionBar seed={seed} />);
    expect(
      screen.getByText(String(seededInt(`like-${seed}`, 8, 340))),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${seededInt(`comment-${seed}`, 0, 40)} comments`),
    ).toBeInTheDocument();
  });

  it("renders Like, Comment, and Share buttons", () => {
    render(<ReactionBar seed="test-event-2" />);
    expect(screen.getByRole("button", { name: /Like/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Comment/ })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Share/ })).toBeInTheDocument();
  });
});
