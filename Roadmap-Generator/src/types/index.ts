export enum DifficultyLevel {
  BEGINNER = 'Beginner',
  INTERMEDIATE = 'Intermediate',
  ADVANCED = 'Advanced',
}

export enum LearningStyle {
  VIDEO = 'Video',
  PRACTICE = 'Practice',
  BALANCED = 'Balanced',
}

export enum LearningGoal {
  JOB_READY = 'Job-ready',
  PROJECT_FOCUSED = 'Project-focused',
  CAREER_SWITCH = 'Career switch',
}

export interface RoadmapNode {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  resources: {
    title: string;
    url: string;
    type: 'video' | 'article' | 'course' | 'practice';
  }[];
  isCompleted: boolean;
}

export interface RoadmapModule {
  id: string;
  title: string;
  week: number;
  nodes: RoadmapNode[];
}

export interface Roadmap {
  id: string;
  skillName: string;
  difficulty: DifficultyLevel;
  duration: number; // in days
  learningStyle: LearningStyle;
  goal: LearningGoal;
  modules: RoadmapModule[];
  createdAt: string;
  updatedAt: string;
}

export interface Progress {
  roadmapId: string;
  completedNodeIds: string[];
  lastAccessed: string;
}

export interface AnalyticsData {
  totalHours: number;
  completedHours: number;
  completionPercentage: number;
  weeklyProgress: { day: string; hours: number }[];
  skillBreakdown: { name: string; value: number }[];
}
