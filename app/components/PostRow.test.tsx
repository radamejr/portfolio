import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import PostRow from "~/components/PostRow";
import { person } from "~/data/resume";
import { seededInt, formatShortDate } from "~/lib/helpers";
import type { Post } from "~/lib/types";

const samplePost: Post = {
  id: "sample-post",
  date: new Date("2024-03-15"),
  lead: "Sample highlight",
  body: "Sample body text.",
};

function renderPostRow(props: { post: Post; pinned?: boolean }) {
  return render(
    <MemoryRouter initialEntries={["/twitter"]}>
      <PostRow {...props} />
    </MemoryRouter>,
  );
}

describe("PostRow", () => {
  it("renders the post's lead, body, and date", () => {
    renderPostRow({ post: samplePost });
    expect(screen.getByText(`${samplePost.lead}:`)).toBeInTheDocument();
    expect(screen.getByText(samplePost.body)).toBeInTheDocument();
    expect(
      screen.getByText(formatShortDate(samplePost.date)),
    ).toBeInTheDocument();
    expect(screen.getByText(`@${person.handle}`)).toBeInTheDocument();
  });

  it("shows the Pinned label when pinned is true", () => {
    renderPostRow({ post: samplePost, pinned: true });
    expect(screen.getByText("Pinned")).toBeInTheDocument();
  });

  it("hides the Pinned label by default", () => {
    renderPostRow({ post: samplePost });
    expect(screen.queryByText("Pinned")).not.toBeInTheDocument();
  });

  it("renders the seeded reply, retweet, like, and view counts", () => {
    renderPostRow({ post: samplePost });
    expect(
      screen.getByText(String(seededInt(`reply-${samplePost.id}`, 1, 40))),
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(seededInt(`retweet-${samplePost.id}`, 2, 120))),
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(seededInt(`like-${samplePost.id}`, 12, 980))),
    ).toBeInTheDocument();
    expect(
      screen.getByText(String(seededInt(`views-${samplePost.id}`, 800, 42000))),
    ).toBeInTheDocument();
  });
});
