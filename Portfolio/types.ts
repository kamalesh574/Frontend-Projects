export interface SkillItem {
  name: string;
  percentage: number;
}

export interface SkillCategory {
  title: string;
  skills: SkillItem[];
}

export interface Project {
  title: string;
  description: string;
  techStack: string[];
  link?: string; // GitHub Link
  demoLink?: string; // Live Demo Link
}

export interface Certification {
  title: string;
  issuer: string;
  date: string;
  link: string;
  tags: string[];
}

export interface NavItem {
  label: string;
  href: string;
}