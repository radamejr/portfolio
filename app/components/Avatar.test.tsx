import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Avatar } from "~/components/Avatar";
import { person, avatarPhotos } from "~/data/resume";

function renderAt(path: string, ui: React.ReactElement) {
  return render(<MemoryRouter initialEntries={[path]}>{ui}</MemoryRouter>);
}

describe("Avatar", () => {
  it("renders the person's photo with alt text, from a route-seeded choice", () => {
    renderAt("/twitter", <Avatar />);
    const img = screen.getByRole("img", { name: person.fullName });
    expect(avatarPhotos).toContain(img.getAttribute("src"));
  });

  it("applies the default size when none is given", () => {
    const { container } = renderAt("/", <Avatar />);
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe("64px");
    expect(wrapper.style.height).toBe("64px");
  });

  it("applies a custom size and className", () => {
    const { container } = renderAt(
      "/",
      <Avatar size={40} className="border" />,
    );
    const wrapper = container.firstChild as HTMLElement;
    expect(wrapper.style.width).toBe("40px");
    expect(wrapper.className).toContain("border");
  });

  it("shows the #OpenToWork badge when ring is openToWork", () => {
    renderAt("/", <Avatar ring="openToWork" />);
    expect(screen.getByText("#OpenToWork")).toBeInTheDocument();
  });

  it("hides the #OpenToWork badge by default (ring=none)", () => {
    renderAt("/", <Avatar />);
    expect(screen.queryByText("#OpenToWork")).not.toBeInTheDocument();
  });
});
