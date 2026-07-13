// Central collection of pure helper functions used across the platform pages.

import { Briefcase, GraduationCap } from "lucide-react";

// --- Deterministic "flavor" numbers -----------------------------------
// Every platform skin invents some cosmetic stats (likes, stars, followers).
// These are derived from a stable hash of a seed string so they never
// change between server and client renders (no hydration mismatches) and
// never change between reloads.

function hashString(str: string): number {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

export function seededInt(seed: string, min: number, max: number): number {
  const h = hashString(seed);
  return min + (h % (max - min + 1));
}

export function seededBool(seed: string, probability = 0.5): boolean {
  const h = hashString(seed);
  return (h % 100) / 100 < probability;
}

// --- Date formatting -----------------------------------------------------

const shortDateFmt = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

const monthYearFmt = new Intl.DateTimeFormat("en-US", {
  month: "long",
  year: "numeric",
});

export function formatShortDate(date: Date): string {
  return shortDateFmt.format(date);
}

export function formatMonthYear(date: Date): string {
  return monthYearFmt.format(date);
}

// --- Facebook life-event icon ---------------------------------------------

export type LifeEventKind = "job-start" | "job-end" | "education";

export function eventIcon(kind: LifeEventKind) {
  return kind === "education" ? GraduationCap : Briefcase;
}

// --- GitHub contribution-graph word art ------------------------------------

export const CONTRIBUTION_WEEKS = 52;
export const CONTRIBUTION_DAYS = 7;

// 5-wide x 7-tall dot-matrix glyphs, '1' = lit cell.
const FONT: Record<string, string[]> = {
  R: ["11110", "10001", "10001", "11110", "10100", "10010", "10001"],
  A: ["01110", "10001", "10001", "11111", "10001", "10001", "10001"],
  D: ["11110", "10001", "10001", "10001", "10001", "10001", "11110"],
  M: ["10001", "11011", "10101", "10101", "10001", "10001", "10001"],
  E: ["11111", "10000", "10000", "11110", "10000", "10000", "11111"],
  J: ["00111", "00010", "00010", "00010", "00010", "10010", "01100"],
};

const WORD = "RADAMEJR";
const LETTER_WIDTH = 5;
const LETTER_GAP = 1;

// Lays the glyphs for WORD out across the contribution grid and returns a
// [week][day] grid of which cells should render as "lit" (part of a letter).
// The grid's weeks are the GitHub-style graph's columns and days are its
// rows, so a glyph's own columns/rows map directly onto that same axis.
function buildWordMask(): boolean[][] {
  const mask: boolean[][] = Array.from({ length: CONTRIBUTION_WEEKS }, () =>
    Array(CONTRIBUTION_DAYS).fill(false),
  );

  // Center the whole word horizontally within the grid, e.g. for an 8-letter
  // word at 5 cols + 1 gap each, that's 47 of the 52 weeks, leaving a couple
  // of empty columns of padding on each side.
  const totalWidth =
    WORD.length * LETTER_WIDTH + (WORD.length - 1) * LETTER_GAP;
  let col = Math.max(0, Math.floor((CONTRIBUTION_WEEKS - totalWidth) / 2));

  for (const char of WORD) {
    const glyph = FONT[char];
    // dx/dy walk the glyph's own 5-wide x 7-tall grid; dy lines up 1:1 with
    // a day row, dx gets offset by `col` to land in the right week column.
    for (let dx = 0; dx < LETTER_WIDTH; dx++) {
      for (let dy = 0; dy < CONTRIBUTION_DAYS; dy++) {
        if (glyph[dy][dx] === "1" && col + dx < CONTRIBUTION_WEEKS) {
          mask[col + dx][dy] = true;
        }
      }
    }
    // Advance past this letter plus a 1-column gap before starting the next.
    col += LETTER_WIDTH + LETTER_GAP;
  }

  return mask;
}

const wordMask = buildWordMask();

export function contributionLevel(week: number, day: number): number {
  if (wordMask[week][day]) return seededInt(`on-${week}-${day}`, 3, 4);
  return seededInt(`off-${week}-${day}`, 0, 1);
}
