export type Repo = {
  name: string;
  description: string;
  language: string;
  color: string;
};

export type LifeEventKind = "job-start" | "job-end" | "education";

export type LifeEvent = {
  id: string;
  date: Date;
  kind: LifeEventKind;
  headline: string;
  body?: string;
};

export type Post = {
  id: string;
  date: Date;
  lead: string;
  body: string;
};
