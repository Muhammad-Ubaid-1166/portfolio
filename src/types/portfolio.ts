// Portfolio Types - Dynamic Data Model

export interface PersonalInfo {
  name: string;
  title: string;
  tagline: string;
  status: string;
  field: string;
  specializations: string[];
  roleGoal: string;
  location: string;
  email: string;
  phone?: string;
  bio: string;
  avatar?: string;
  resume?: string;
}

export interface SocialLink {
  name: string;
  url: string;
  icon: string;
  username?: string;
}

export interface Skill {
  name: string;
  category: SkillCategory;
}

export type SkillCategory = 
  | 'programming'
  | 'backend'
  | 'ai-ml'
  | 'databases';

export interface SkillCategoryInfo {
  id: SkillCategory;
  label: string;
  description: string;
  color: string;
  icon: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  techStack: string[];
  category: ProjectCategory;
  featured: boolean;
  imageUrl?: string;
  demoUrl?: string;
  githubUrl?: string;
  highlights: string[];
  architecture?: string;
  date: string;
  status: 'completed' | 'in-progress' | 'archived';
}

export type ProjectCategory = 'ai' | 'backend' | 'fullstack' | 'tools' | 'other';

export interface Education {
  id: string;
  institution: string;
  degree: string;
  field: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
  achievements?: string[];
  gpa?: string;
  location?: string;
}

export interface Experience {
  id: string;
  company: string;
  role: string;
  type: 'internship' | 'part-time' | 'full-time' | 'freelance';
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
  technologies?: string[];
  achievements?: string[];
  location?: string;
}

export interface Certification {
  id: string;
  name: string;
  issuer: string;
  date: string;
  credentialUrl?: string;
  imageUrl?: string;
}

export interface TimelineEvent {
  id: string;
  year: string;
  title: string;
  description: string;
  type: 'education' | 'experience' | 'achievement' | 'milestone';
  icon?: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PortfolioConfig {
  personal: PersonalInfo;
  socials: SocialLink[];
  skills: Skill[];
  projects: Project[];
  education: Education[];
  experience: Experience[];
  certifications: Certification[];
  timeline: TimelineEvent[];
}
