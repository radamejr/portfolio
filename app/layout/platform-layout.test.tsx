import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router";
import PlatformLayout from "~/layout/platform-layout";

describe("PlatformLayout", () => {
  it("renders the platform nav and the matched child route", () => {
    render(
      <MemoryRouter initialEntries={["/child"]}>
        <Routes>
          <Route element={<PlatformLayout />}>
            <Route path="/child" element={<div>child content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByRole("link", { name: /Home/i })).toBeInTheDocument();
    expect(screen.getByText("child content")).toBeInTheDocument();
  });
});
