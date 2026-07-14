import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CardComponent from "~/components/CardComponent";

describe("CardComponent", () => {
  it("renders its children inside a section", () => {
    const { container } = render(
      <CardComponent>
        <p>card content</p>
      </CardComponent>,
    );
    expect(screen.getByText("card content")).toBeInTheDocument();
    expect((container.firstChild as HTMLElement).tagName).toBe("SECTION");
  });

  it("applies the base card styling by default", () => {
    const { container } = render(<CardComponent>content</CardComponent>);
    expect((container.firstChild as HTMLElement).className).toContain(
      "rounded-lg",
    );
  });

  it("appends a custom className alongside the base styling", () => {
    const { container } = render(
      <CardComponent className="extra-class">content</CardComponent>,
    );
    const section = container.firstChild as HTMLElement;
    expect(section.className).toContain("extra-class");
    expect(section.className).toContain("rounded-lg");
  });
});
