// GitHub Types
export interface GitHubDay {
  contributionCount: number;
  date: string;
  color: string;
}

export interface GitHubWeek {
  contributionDays: GitHubDay[];
}

export interface GitHubCalendar {
  totalContributions: number;
  weeks: GitHubWeek[];
}

export interface GitHubLanguage {
  name: string;
  color: string;
}

export interface GitHubRepo {
  name: string;
  stargazerCount: number;
  primaryLanguage: GitHubLanguage | null;
  description: string | null;
  url: string;
  pushedAt: string;
}

export interface GitHubStats {
  repositories: { nodes: GitHubRepo[] };
  contributionsCollection: {
    totalCommitContributions: number;
    contributionCalendar: GitHubCalendar;
  };
  followers: { totalCount: number };
}

// Chat Types
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

// Project Types
export interface Project {
  slug: string;
  title: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  stars?: number;
  lastCommit?: string;
  status: 'active' | 'archived' | 'wip';
  featured: boolean;
}

// Blog Types
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
  readingTime: string;
  viewCount?: number;
}

// Skill Types
export interface Skill {
  name: string;
  level: number; // 0-100
  category: 'frontend' | 'backend' | 'devops' | 'ai' | 'mobile';
}

// Radar chart data point
export interface RadarDataPoint {
  axis: string;
  value: number;
}
