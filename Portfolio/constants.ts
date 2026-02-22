import { Project, SkillCategory, NavItem, Certification } from "./types";

export const NAV_ITEMS: NavItem[] = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Certifications", href: "#certifications" },
  { label: "Stats", href: "#stats" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    title: "Core & Backend",
    skills: [
      { name: "Java", percentage: 90 },
      { name: "Python", percentage: 75 },
      { name: "Spring Boot", percentage: 75 },
      { name: "REST APIs", percentage: 75 },
      { name: "JDBC", percentage: 65 },
    ],
  },
  {
    title: "Web & Data",
    skills: [
      { name: "HTML", percentage: 75 },
      { name: "CSS", percentage: 65 },
      { name: "React", percentage: 70 },
      { name: "MySQL", percentage: 65 },
      { name: "JavaScript", percentage: 45 },
      { name: "MongoDB", percentage: 45 },
    ],
  },
  {
    title: "CS Fundamentals & Tools",
    skills: [
      { name: "DSA", percentage: 90 },
      { name: "OOPs", percentage: 90 },
      { name: "DBMS", percentage: 75 },
      { name: "Git", percentage: 75 },
      { name: "VS Code", percentage: 80 },
      { name: "OS", percentage: 65 },
      { name: "Postman", percentage: 65 },
    ],
  },
];

export const CERTIFICATIONS: Certification[] = [
  {
    title: "Java Programming Masterclass",
    issuer: "Udemy",
    date: "2025",
    link: "/certificates/java.pdf",
    tags: ["Java", "OOP", "Collections"],
  },
  {
    title: "Spring Boot",
    issuer: "Udemy",
    date: "2025",
    link: "/certificates/spring.pdf",
    tags: ["Spring Framework", "Spring Boot", "MVC", "JPA"],
  },
  {
    title: "Python",
    issuer: "Udemy",
    date: "2024",
    link: "/certificates/python.pdf",
    tags: ["Python", "Pandas", "NumPy"],
  },
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    date: "2025",
    link: "/certificates/web.pdf",
    tags: ["React", "Node.js", "MongoDB", "Express.js", "CSS"],
  },
  {
    title: "JavaScript",
    issuer: "Udemy",
    date: "2025",
    link: "/certificates/js.pdf",
    tags: ["JavaScript", "ES6"],
  },
];

export const PROJECTS: Project[] = [
  // --- JAVA BASED FullStack Projects  (The "Heavy Lifting" Backend Projects) ---
  {
    title: "ContactPro (Full Stack Contact Management System)",
    description:
      "A production-ready full stack Contact Management System with role-based authentication and secure REST APIs. Features Spring Security with HTTP Basic authentication, CORS configuration for cross-domain deployment, global exception handling, and a React + Vite frontend deployed on Vercel. Backend is deployed on Railway with MySQL integration.",
    techStack: [
      "Java",
      "Spring Boot",
      "Spring Security",
      "MySQL",
      "Hibernate",
      "React",
      "Vite",
      "Vercel",
      "Railway",
    ],
    link: "https://github.com/kamalesh574/FullStack-Projects-JRS-Edition",
    demoLink: "https://contact-manager-wheat-seven.vercel.app",
  },
 {
  title: "Food-Bridge Marketplace",
  description:
    "A frontend-only food donation marketplace connecting restaurants with surplus food to NGOs in need. Features role-based dashboards, live expiry countdown timers, dynamic filtering, request tracking workflow, and impact monitoring — built with scalable React architecture and strict TypeScript.",
  techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "React Router", "Context API", "useReducer"],
  link: "https://github.com/kamalesh574/Food-Bridge-Marketplace",
  demoLink: "https://kamal574-foodbridge.vercel.app/",
},

  // --- FRONTEND BASED (The "Visual & Logic" Projects) ---
  {
  title: "Interactive Learning Roadmap Generator",
  description:
    "A SaaS-style frontend application that generates structured, adaptive learning roadmaps based on skill, difficulty, and duration. Features interactive timeline visualization, progress tracking dashboard, analytics insights, JSON export, and persistent localStorage state — built with strict TypeScript and scalable React architecture.",
  techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "React Router", "Context API", "useReducer", "Framer Motion", "Recharts"],
  link: "https://github.com/kamalesh574/Interactive-Learning-Roadmap-Generator",
  demoLink: "https://kamal574-roadmap.vercel.app/",
},
  {
  title: "TaskFlow Pro",
  description:
    "A premium Kanban-based productivity and workflow management system featuring multi-board support, advanced drag-and-drop interactions, priority management, analytics dashboard, and persistent localStorage state — built with scalable React architecture and strict TypeScript.",
  techStack: ["React", "TypeScript", "Vite", "TailwindCSS", "React Router", "Context API", "useReducer", "@dnd-kit/core", "Framer Motion", "Recharts"],
  link: "https://github.com/kamalesh574/TaskFlow-Pro",
  demoLink: "https://kamal574-taskflowpro.vercel.app/",
},
];

export const PROFILE_URLS = {
  // Using specific flags to make them fit the new dashboard design better
  github:
    "https://streak-stats.demolab.com?user=kamalesh574&theme=dark&hide_border=true&bg_color=transparent&title_color=38bdf8&icon_color=22c55e",
  leetcode: "https://leetcard.jacoblin.cool/kamalesh004?theme=dark&font=Karma",
  geeksforgeeks:
    "https://raw.githubusercontent.com/kamalesh574/GFG-DSA/main/gfg-dashboard.svg", // Assuming username, can be updated
};

export const PERSONAL_INFO = {
  name: "Kamalesh",
  title: "Java Backend Developer",
  about:
    "Pre-final year B.Tech Computer Science student specializing in Java backend development and software engineering fundamentals. I focus on building robust, scalable Java applications using clean architecture principles and efficient system design. With a strong foundation in Data Structures, Algorithms, and object-oriented programming, I strive to write maintainable, high-performance code that solves real-world problems. My goal is to grow into a software engineer who designs reliable systems that power modern web applications at scale.",
};
