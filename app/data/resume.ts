// Single source of truth for the portfolio: every platform "skin" renders
// from this data. Update this file to update every page at once.

export const person = {
  fullName: "Robert Adame, Jr.",
  displayName: "Robert Adame",
  initials: "RA",
  handle: "radamejr",
  title: "Senior Software Engineer",
  location: "Mesa, AZ",
  email: "radamejr@gmail.com",
  links: {
    github: "https://github.com/radamejr",
    linkedin: "https://linkedin.com/in/radamejr",
    website: "https://radamejr.com",
  },
  summary:
    "Senior Frontend Engineer with 6+ years of professional experience building scalable, high-performance web applications using React, JavaScript/TypeScript, and modern cloud architectures. Proven ability to drive AI-assisted development workflows, collaborate cross-functionally across product, design, and engineering, and deliver exceptional user experiences. Open to remote and on-site opportunities in the Mesa and greater Phoenix area, with a passion for contributing to next-generation digital platforms and AI-integrated products.",
  openToWork: true,
};

export type SkillGroup = {
  category: string;
  skills: string[];
};

export const skillGroups: SkillGroup[] = [
  {
    category: "Frontend",
    skills: [
      "React",
      "JavaScript (ES6+)",
      "TypeScript",
      "HTML5",
      "CSS3",
      "SCSS",
      "Three.js",
      "React-Three-Fiber",
    ],
  },
  {
    category: "Component Libraries",
    skills: [
      "ANTD (Ant Design)",
      "Custom shared component libraries",
      "NX Monorepo design systems",
    ],
  },
  {
    category: "AI & Developer Tools",
    skills: [
      "Claude Code",
      "GitHub Copilot",
      "AI-assisted development workflows",
    ],
  },
  {
    category: "Backend & Cloud",
    skills: [
      "Node.js",
      "Python/Django",
      "AWS (EC2, S3, Lambda, API Gateway, DynamoDB, RDS, CloudWatch)",
      "Docker",
    ],
  },
  {
    category: "Collaboration",
    skills: [
      "Agile/Scrum",
      "GitHub Actions",
      "Git",
      "Bitbucket",
      "Code reviews",
      "Technical mentorship",
    ],
  },
];

export const allSkills = skillGroups.flatMap((g) => g.skills);

export type Highlight = {
  title: string;
  body: string;
};

export type ExperienceEntry = {
  id: string;
  company: string;
  location: string;
  role: string;
  dateRange: string;
  startDate: string; // ISO, for sorting
  highlights: Highlight[];
};

export const experience: ExperienceEntry[] = [
  {
    id: "aerialsphere",
    company: "AerialSphere",
    location: "Tempe, AZ",
    role: "Senior Software Engineer",
    dateRange: "February 2020 – May 2026",
    startDate: "2020-02-01",
    highlights: [
      {
        title: "Frontend Architecture & Migration",
        body: "Led the migration of the mission-critical XPGEO Studio application from a legacy ESRI JavaScript SDK to a modern React-based framework, enabling adoption of new Oriented Imagery Layer (OIL) technology unavailable in the legacy SDK. Delivered full feature parity with the existing codebase as part of a cross-functional team effort within a 3–4 month timeline.",
      },
      {
        title: "Component-Driven Development",
        body: "Architected API Viewer 2.0 from the ground up using an NX Monorepo, consolidating 5 standalone applications under a newly built shared component library of 20–30 reusable components — improving UI consistency, reducing duplicate code, and accelerating cross-team development.",
      },
      {
        title: "Performance Optimization",
        body: "Delivered measurable improvements in application load time, usability, and rendering performance across the frontend stack through code splitting, lazy loading, and architectural refactoring.",
      },
      {
        title: "Cross-Functional Collaboration",
        body: "Partnered closely with product and design teams to translate requirements into polished, responsive web applications — coordinating across engineering, QA, and stakeholders in an Agile environment.",
      },
      {
        title: "Full-Stack API & E-Commerce",
        body: "Maintained the primary customer Web App and AerialSphere Django REST API, integrating Stripe payment webhooks to automate user registration, subscription management, and payment cycles.",
      },
      {
        title: "AI-Augmented Development",
        body: "Pioneered adoption of Claude Code into the engineering workflow, using it to port a custom CLI tool — an automated client-facing counterpart to the ESRI web app for use within ESRI Enterprise systems — from Node.js to Go, enabling a signed, cross-platform executable for Windows and Linux deployment.",
      },
      {
        title: "Code Reviews & Mentorship",
        body: "Participated in collaborative PR reviews as part of a team-wide code quality process, catching bugs pre-production through a structured dev/QA deployment pipeline. Onboarded and mentored engineers, guiding them from initial ramp-up through active participation in sprint grooming and ticket delivery — enabling smooth integration into the team's workflow and consistent on-time completion of assigned work.",
      },
    ],
  },
  {
    id: "adame-software",
    company: "Adame Software LLC",
    location: "Mesa, AZ",
    role: "Software Engineer Consultant",
    dateRange: "March 2023 – January 2026",
    startDate: "2023-03-01",
    highlights: [
      {
        title: "DevOps & Testing Infrastructure",
        body: "Designed and implemented a GitHub Actions-based CI testing suite for a client's Python backend, blocking PR merges on test failure and delivering real-time Slack alerts to the dev team — prioritizing coverage of the client's highest-value files first to maximize risk reduction with limited engineering time.",
      },
      {
        title: "Web Performance & Optimization",
        body: "Consulted local enterprise clients on web performance, security baselines, and content management systems including customized WordPress maintenance.",
      },
    ],
  },
];

export type EarlyCareerEntry = {
  id: string;
  company: string;
  role: string;
  dateRange: string;
  startDate: string;
  description: string;
};

export const earlyCareer: EarlyCareerEntry[] = [
  {
    id: "hillman",
    company: "Hillman Group",
    role: "Technical Support Representative",
    dateRange: "May 2019 – Feb 2020",
    startDate: "2019-05-01",
    description:
      "Triaged and resolved high-level hardware and software issues for the Duracell Key programming ecosystem, logging technical notes in enterprise CRM platforms.",
  },
  {
    id: "dexcom",
    company: "Dexcom",
    role: "Interim Technical Trainer / Technical Support Representative",
    dateRange: "May 2017 – May 2019",
    startDate: "2017-05-01",
    description:
      "Co-developed and facilitated comprehensive training models for inbound groups, mentoring top-tier agents to succeed in high-stakes product launches.",
  },
  {
    id: "cognosante",
    company: "Cognosante",
    role: "Outreach Supervisor",
    dateRange: "Jan 2017 – Apr 2017",
    startDate: "2017-01-01",
    description:
      "Led and trained outbound consumer data teams; built performance tools that increased operational efficiency by 35%.",
  },
  {
    id: "arris",
    company: "ARRIS / Pace / 2WIRE / Volt",
    role: "Technical Trainer & Support Supervisor",
    dateRange: "Feb 2010 – Oct 2016",
    startDate: "2010-02-01",
    description:
      "Managed and developed technical support cohorts of up to 20 agents; deployed post-onboarding models to consistently hit center KPIs.",
  },
];

export type EducationEntry = {
  id: string;
  school: string;
  credential: string;
  year: string;
};

export const education: EducationEntry[] = [
  {
    id: "uarizona",
    school: "University of Arizona",
    credential: "Certificate, Full Stack Web Development",
    year: "2019",
  },
  {
    id: "collins",
    school: "Collins College",
    credential: "Associate of Science in Information Technology",
    year: "2009",
  },
];

export const avatarPhotos = ["/radame.jpg", "/radame_2.jpg"];
