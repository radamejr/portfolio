import { describe, it, expect } from "vitest";
import {
  person,
  skillGroups,
  allSkills,
  experience,
  earlyCareer,
  education,
  avatarPhotos,
} from "~/data/resume";

describe("resume data", () => {
  it("exposes a person with the expected contact fields", () => {
    expect(person.fullName).toBe("Robert Adame, Jr.");
    expect(person.email).toContain("@");
    expect(person.links.github).toMatch(/^https:\/\//);
    expect(typeof person.openToWork).toBe("boolean");
  });

  it("flattens skillGroups into allSkills", () => {
    const expectedCount = skillGroups.reduce((n, g) => n + g.skills.length, 0);
    expect(allSkills).toHaveLength(expectedCount);
    expect(allSkills).toContain("React");
  });

  it("gives every experience entry highlights and an id", () => {
    expect(experience.length).toBeGreaterThan(0);
    for (const job of experience) {
      expect(job.id).toBeTruthy();
      expect(job.highlights.length).toBeGreaterThan(0);
    }
  });

  it("gives every early-career entry a description", () => {
    expect(earlyCareer.length).toBeGreaterThan(0);
    for (const job of earlyCareer) {
      expect(job.description).toBeTruthy();
    }
  });

  it("lists education entries", () => {
    expect(education.length).toBeGreaterThan(0);
    for (const ed of education) {
      expect(ed.school).toBeTruthy();
    }
  });

  it("provides at least one avatar photo path", () => {
    expect(avatarPhotos.length).toBeGreaterThan(0);
    for (const photo of avatarPhotos) {
      expect(photo.startsWith("/")).toBe(true);
    }
  });
});
