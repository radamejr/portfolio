import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Heart } from "lucide-react";
import Stat from "~/components/Stat";
import { seededInt } from "~/lib/helpers";

describe("Stat", () => {
  it("renders the seeded number for its seed/min/max", () => {
    render(<Stat icon={Heart} seed="test-stat" min={10} max={99} />);
    expect(
      screen.getByText(String(seededInt("test-stat", 10, 99))),
    ).toBeInTheDocument();
  });

  it("renders the given icon", () => {
    const { container } = render(
      <Stat icon={Heart} seed="test-stat-2" min={0} max={5} />,
    );
    expect(container.querySelector("svg")).toBeInTheDocument();
  });
});
