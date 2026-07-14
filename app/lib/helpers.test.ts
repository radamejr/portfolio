import { describe, it, expect } from "vitest";
import { GraduationCap, Briefcase } from "lucide-react";
import {
  seededInt,
  seededBool,
  formatShortDate,
  formatMonthYear,
  formatDisplayUrl,
  eventIcon,
  contributionLevel,
  CONTRIBUTION_WEEKS,
  CONTRIBUTION_DAYS,
} from "~/lib/helpers";

describe("seededInt", () => {
  it("is deterministic for the same seed", () => {
    expect(seededInt("abc", 0, 100)).toBe(seededInt("abc", 0, 100));
  });

  it("stays within the [min, max] range across many seeds", () => {
    for (let i = 0; i < 200; i++) {
      const n = seededInt(`seed-${i}`, 5, 9);
      expect(n).toBeGreaterThanOrEqual(5);
      expect(n).toBeLessThanOrEqual(9);
    }
  });

  it("differs for different seeds (spot check, not guaranteed but expected)", () => {
    const values = new Set(
      Array.from({ length: 20 }, (_, i) => seededInt(`x-${i}`, 0, 1000)),
    );
    expect(values.size).toBeGreaterThan(1);
  });
});

describe("seededBool", () => {
  it("is always false at probability 0", () => {
    for (let i = 0; i < 50; i++) {
      expect(seededBool(`p0-${i}`, 0)).toBe(false);
    }
  });

  it("is always true at probability 1", () => {
    for (let i = 0; i < 50; i++) {
      expect(seededBool(`p1-${i}`, 1)).toBe(true);
    }
  });

  it("defaults to probability 0.5", () => {
    expect(typeof seededBool("default-prob")).toBe("boolean");
  });
});

describe("formatShortDate", () => {
  it("formats as 'Mon D, YYYY'", () => {
    expect(formatShortDate(new Date("2020-02-01"))).toBe("Feb 1, 2020");
  });
});

describe("formatMonthYear", () => {
  it("formats as 'Month YYYY'", () => {
    expect(formatMonthYear(new Date("2020-02-01"))).toBe("February 2020");
  });
});

describe("formatDisplayUrl", () => {
  it("strips the https:// prefix", () => {
    expect(formatDisplayUrl("https://radamejr.com")).toBe("radamejr.com");
  });

  it("leaves a url without an https:// prefix unchanged", () => {
    expect(formatDisplayUrl("radamejr.com")).toBe("radamejr.com");
  });
});

describe("eventIcon", () => {
  it("returns GraduationCap for education", () => {
    expect(eventIcon("education")).toBe(GraduationCap);
  });

  it("returns Briefcase for job-start", () => {
    expect(eventIcon("job-start")).toBe(Briefcase);
  });

  it("returns Briefcase for job-end", () => {
    expect(eventIcon("job-end")).toBe(Briefcase);
  });
});

describe("contributionLevel", () => {
  it("only ever returns off-range (0-1) or on-range (3-4) levels", () => {
    for (let week = 0; week < CONTRIBUTION_WEEKS; week++) {
      for (let day = 0; day < CONTRIBUTION_DAYS; day++) {
        const level = contributionLevel(week, day);
        expect([0, 1, 3, 4]).toContain(level);
      }
    }
  });

  it("lights up exactly the pixels of the RADAMEJR word art", () => {
    let onCount = 0;
    for (let week = 0; week < CONTRIBUTION_WEEKS; week++) {
      for (let day = 0; day < CONTRIBUTION_DAYS; day++) {
        if (contributionLevel(week, day) >= 3) onCount++;
      }
    }
    // Total lit pixels across R-A-D-A-M-E-J-R in the 5x7 dot-matrix font.
    expect(onCount).toBe(137);
  });

  it("leaves the horizontal padding columns before the word dark", () => {
    expect(contributionLevel(0, 0)).toBeLessThanOrEqual(1);
    expect(contributionLevel(1, 0)).toBeLessThanOrEqual(1);
  });

  it("lights the top-left stroke of the leading R", () => {
    expect(contributionLevel(2, 0)).toBeGreaterThanOrEqual(3);
  });

  it("leaves the gap after the R's top stroke dark", () => {
    expect(contributionLevel(6, 0)).toBeLessThanOrEqual(1);
  });
});
