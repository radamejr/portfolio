import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Outlet } from "react-router";
import type { ReactElement } from "react";
import { links, Layout, ErrorBoundary } from "~/root";
import App from "~/root";

describe("links", () => {
  it("preconnects to and loads the Inter font from Google Fonts", () => {
    const tags = links();
    expect(tags).toHaveLength(3);
    expect(
      tags.some((t) => "href" in t && t.href?.includes("fonts.googleapis.com")),
    ).toBe(true);
  });
});

describe("Layout", () => {
  // Layout renders <Meta/>/<Links/>, which require a full framework router
  // context we don't want to stand up for a unit test. Instead, call it as a
  // plain function and inspect the returned element tree directly -- that
  // still executes (and covers) Layout's own body without ever rendering
  // those child components.
  it("wraps its children in the document shell", () => {
    const child = <div id="app-child">hello</div>;
    const html = Layout({ children: child }) as ReactElement<{
      lang: string;
      children: [ReactElement, ReactElement];
    }>;

    expect(html.type).toBe("html");
    expect(html.props.lang).toBe("en");

    const [head, body] = html.props.children;
    expect(head.type).toBe("head");
    expect(body.type).toBe("body");

    const bodyChildren = (body.props as { children: ReactElement[] }).children;
    expect(bodyChildren[0]).toBe(child);
  });
});

describe("App", () => {
  it("renders an Outlet", () => {
    const element = App();
    expect(element.type).toBe(Outlet);
  });
});

describe("ErrorBoundary", () => {
  it("shows a 404 message for a route not-found error", () => {
    render(
      <ErrorBoundary
        error={{
          status: 404,
          statusText: "Not Found",
          internal: false,
          data: null,
        }}
        params={{}}
      />,
    );
    expect(screen.getByRole("heading", { name: "404" })).toBeInTheDocument();
    expect(
      screen.getByText("The requested page could not be found."),
    ).toBeInTheDocument();
  });

  it("shows the response statusText for a non-404 route error", () => {
    render(
      <ErrorBoundary
        error={{
          status: 500,
          statusText: "Internal Server Error",
          internal: false,
          data: null,
        }}
        params={{}}
      />,
    );
    expect(screen.getByRole("heading", { name: "Error" })).toBeInTheDocument();
    expect(screen.getByText("Internal Server Error")).toBeInTheDocument();
  });

  it("falls back to the default details when a non-404 route error has no statusText", () => {
    render(
      <ErrorBoundary
        error={{ status: 500, statusText: "", internal: false, data: null }}
        params={{}}
      />,
    );
    expect(screen.getByRole("heading", { name: "Error" })).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred."),
    ).toBeInTheDocument();
  });

  it("shows the error message and stack trace for a thrown Error in dev", () => {
    const error = new Error("boom");
    render(<ErrorBoundary error={error} params={{}} />);
    expect(screen.getByRole("heading", { name: "Oops!" })).toBeInTheDocument();
    expect(screen.getByText("boom")).toBeInTheDocument();
    expect(document.querySelector("pre code")?.textContent).toContain(
      "Error: boom",
    );
  });

  it("falls back to the generic message for an unrecognized error value", () => {
    render(<ErrorBoundary error="a plain string" params={{}} />);
    expect(screen.getByRole("heading", { name: "Oops!" })).toBeInTheDocument();
    expect(
      screen.getByText("An unexpected error occurred."),
    ).toBeInTheDocument();
    expect(document.querySelector("pre")).not.toBeInTheDocument();
  });
});
