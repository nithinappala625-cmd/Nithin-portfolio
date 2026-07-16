export interface HeroData {
  name: string;
  title: string;
  pitch: string;
  resumeDriveLink: string;
  githubLink: string;
  linkedinLink: string;
  email: string;
}

export interface AboutData {
  summary: string;
}

export interface ExperienceData {
  id: string;
  role: string;
  company: string;
  duration: string;
  description: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  timeline: string;
  description: string;
  bullets: string[];
  isFeatured: boolean;
  link?: string;
}

export interface SkillCategory {
  id: string;
  name: string;
  skills: string[];
}

export interface EducationData {
  id: string;
  degree: string;
  institution: string;
  duration: string;
  score: string;
}

export interface CertificationData {
  id: string;
  name: string;
  issuer: string;
  year: string;
}

export interface CustomSection {
  id: string;
  title: string;
  content: string;
  order: number;
}

export interface PortfolioData {
  hero: HeroData;
  about: AboutData;
  experience: ExperienceData[];
  projects: ProjectData[];
  skills: SkillCategory[];
  education: EducationData[];
  certifications: CertificationData[];
  customSections: CustomSection[];
}
