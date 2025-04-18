import { ChartLineUp, Code, Globe, Robot, Wine } from "@phosphor-icons/react";

// Site wide strings
export const NAV_TEXT = "Raúl Pineda";
export const SITE_TITLE = NAV_TEXT;
export const SITE_DESCRIPTION = "A software development lead resume.";

export const NAME = "Raúl";
export const BIO =
  "I am a software engineering leader with over a decade of experience in front end development based in Copenhagen, Denmark. I love working with teams who build products that make people lives better.";
export const ABOUT_ME =
  "I am experienced in leading full stack teams building web applications and platforms. I have over ten years of experience as a software engineer, specializing in front end development and product engineering.";
export const CONTACT_TEXT =
  "I'd love to hear from you! I'm always open to good conversations and exploring new opportunities.";
export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/#about" },
  { name: "Contact", href: "/#contact" },
];

export const WORK_EXPERIENCES = [
  {
    organisationName: "DataRobot",
    position: "Staff Engineer & Team Lead — Applications",
    date: "2024 - PRESENT",
    info: [
      "I lead a full stack team building DataRobot's AI Application platform",
      "We enable code-first users to build, manage, and deploy their artificial intelligence applications on DataRobot's infrastructure",
      "Part of the incident response team since 2021, following blameless processes",
    ],
    skills: [
      "Engineering management",
      "Kubernetes",
      "Coaching",
      "Python",
      "Go",
      "NodeJs",
    ],
    icon: Robot,
  },
  {
    organisationName: "DataRobot",
    position: "Staff Front End Engineer — MLOps",
    date: "2022 - 2024",
    info: [
      "Led a team of front engineers building the interfaces for making predictions",
      "Automated testing of multiple combinations of intake-inference-output configurations",
      "Refactored and modernized the model governance solution",
    ],
    skills: [
      "React",
      "TanStack Query",
      "Jest",
      "Cypress",
      "Project management",
    ],
    icon: Robot,
  },
  {
    organisationName: "DataRobot",
    position: "Senior Front End Engineer — Inference",
    date: "2019 - 2022",
    info: [
      "Migrated the legacy Angular inference interfaces into React",
      "Build inference functionality into the MLOps platform",
      "Collaborated with the Core UI division regularly contributing to the design system",
    ],
    skills: ["React", "Angular", "Karma", "Design systems"],
    icon: Robot,
  },
  {
    organisationName: "Saxo Bank",
    position: "Senior Front End Developer",
    date: "2017 - 2019",
    info: [
      "Part of the team developing the bank's trading platforms",
      "Implemented a multi-window state management solution allowing users to seamlessly move trading modules between windows.",
    ],
    skills: ["React", "Redux", "Electron", "Cypress"],
    icon: ChartLineUp,
  },
  {
    organisationName: "Vivino",
    position: "Front End Developer",
    date: "2015 - 2017",
    info: [
      "Migrated the web application from a primarily static website using Ruby and jQuery to a social media and e-commerce platform using React",
      "Built Vivino's back office analytics and e-commerce management platform for wine merchants",
    ],
    skills: ["React", "Ember", "Ruby on Rails"],
    icon: Wine,
  },
];
export const VOLUNTEERING_EXPERIENCES = [
  {
    organisationName: "Codher",
    date: "2016- 2019",
    info: [
      "Taught introductory courses to programming primarily for women and other minorities in technology",
      "Responsible for contenct strategy and managing the team of mentors",
    ],
    skills: [
      "Mentoring",
      "Public speaking",
      "Content planning",
      "Volunteer mananagement",
    ],
    icon: Code,
  },
  {
    organisationName: "AIESEC",
    date: "2009 - 2013",
    info: [
      "Served as Vice President of Finance for AIESEC in Austria",
      "Held multiple trainings and conferences for audiences of up to 500 participants",
      "Sales and partnership management in AIESEC in Mexico",
    ],
    skills: [
      "Financial strategy",
      "Leadership",
      "Training",
      "Public speaking",
      "Partnerships",
      "Volunteer management",
    ],
    icon: Globe,
  },
];

export const CONTACT_OPTIONS = [
  { name: "Github", link: "https://github.com/raulpineda/" },
  { name: "LinkedIn", link: "https://www.linkedin.com/in/raulpineda/" },
];
