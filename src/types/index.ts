export interface Project {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  imageUrl?: string;
  githubUrl?: string;
  liveUrl?: string;
  date: string; // Format: "YYYY-MM" or "YYYY-MM-DD"
  featured?: boolean;
  achievements?: string[];
}

export interface Skill {
  name: string;
  level: number; // 1-5
  category: 'frontend' | 'backend' | 'tools' | 'languages' | 'other' | 'ml';
  icon?: string; // Lucide icon name
}

export interface WorkExperience {
  id: string;
  position: string;
  company: string;
  location?: string;
  startDate: string; // Format: "YYYY-MM"
  endDate: string; // Format: "YYYY-MM" or "Present"
  description: string;
  achievements?: string[];
  technologies?: string[];
  type: 'internship' | 'full-time' | 'part-time' | 'contract';
}

export type ThemeMode = 'light' | 'dark';