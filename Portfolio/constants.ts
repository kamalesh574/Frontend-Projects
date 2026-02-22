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
  // --- JAVA BASED (The "Heavy Lifting" Backend Projects) ---
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
    title: "Edu-Nexus (LMS Platform)",
    description:
      "A comprehensive Learning Management System with strict Role-Based Access Control (RBAC). Features secure video streaming, progress tracking, and instructor dashboards.",
    techStack: ["Java", "Spring Security", "JWT", "React", "MongoDB"],
    link: "https://github.com/kamalesh574/Edu-Nexus-LMS",
    demoLink: "https://edu-nexus-demo.com",
  },

  // --- FRONTEND BASED (The "Visual & Logic" Projects) ---
  {
    title: "Algo-Visualizer",
    description:
      "Interactive dashboard visualizing complex sorting and pathfinding algorithms (BFS, Dijkstra). Features dynamic speed control, step-by-step execution, and complexity analysis.",
    techStack: ["React", "TypeScript", "Algorithms", "CSS Animation"],
    link: "https://github.com/kamalesh574/Frontend-UI-Collection/tree/main/01-Algo-Visualizer",
    demoLink: "https://algo-visualizer.com",
  },
  {
    title: "Food-Bridge Marketplace",
    description:
      'A "Zero-Hunger" marketplace connecting restaurants with NGOs. Handles real-time inventory tracking, expiration alerts, and distinct dashboards for donors and receivers.',
    techStack: ["React", "Context API", "Tailwind CSS", "Moment.js"],
    link: "https://github.com/kamalesh574/Frontend-UI-Collection/tree/main/02-Food-Bridge",
    demoLink: "https://food-bridge.com",
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
