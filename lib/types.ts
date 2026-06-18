export type SkillLevel = "no-code" | "beginner" | "intermediate" | "developer";

export type AvailableTime = "1 day" | "3 days" | "1 week" | "1 month";

export type Difficulty = "low" | "medium" | "high";

export interface BuilderProfile {
  skillLevel: SkillLevel;
  interests: string[];
  availableTime: AvailableTime;
  goals: string[];
  tools: string[];
  preferredStyle: string;
}

export interface Opportunity {
  title: string;
  description: string;
  deadline?: string;
  link?: string;
}

export interface AnalysisResult {
  theme: string;
  fitScore: number;
  difficulty: Difficulty;
  deadlinePressure: string;
  bestProjectType: string;
  demoPotential: string;
  recommendedStrategy: string;
}

export interface IdeaBranch {
  name: string;
  description: string;
  targetUser: string;
  problem: string;
  solution: string;
  difficulty: Difficulty;
  demoStrength: number;
  whyItCanWin: string;
}

export interface MVPPlan {
  summary: string;
  coreFeatures: string[];
  buildFirst: string[];
  dontBuild: string[];
  threeDayPlan: string[];
  oneWeekPlan: string[];
  riskNotes: string[];
  demoFocus: string;
}

export interface TentacleOutputs {
  buildPlan: string;
  appStructure: string;
  codingPrompt: string;
  pitch: string;
  demoScript: string;
  checklist: string;
  roadmap: string;
}

export interface SquidProject {
  id: string;
  profile: BuilderProfile;
  opportunity: Opportunity;
  analysis: AnalysisResult;
  selectedIdea: IdeaBranch;
  mvpPlan: MVPPlan;
  outputs: TentacleOutputs;
  createdAt: string;
}

export const INTEREST_OPTIONS = [
  "AI Agents",
  "Games",
  "DeFi",
  "Productivity",
  "Education",
  "Creator Tools",
  "Social Apps",
];

export const GOAL_OPTIONS = [
  "Win prize",
  "Build portfolio",
  "Learn AI tools",
  "Ship MVP",
];

export const TOOL_OPTIONS = [
  "ChatGPT",
  "v0",
  "Cursor",
  "Lovable",
  "Bolt",
  "Replit",
  "GitHub",
  "Vercel",
];

export const SKILL_LABELS: Record<SkillLevel, string> = {
  "no-code": "No-Code",
  beginner: "Beginner",
  intermediate: "Intermediate",
  developer: "Developer",
};

export const TIME_LABELS: Record<AvailableTime, string> = {
  "1 day": "1 Day",
  "3 days": "3 Days",
  "1 week": "1 Week",
  "1 month": "1 Month",
};

export const DEMO_OPPORTUNITY_TEXT = `0G Labs - Vibe Coding Tournament
No coding skills required
$17,000 prize pool
Build an AI-native app, agent, companion, or game
Submit by June 23`;

export const DEFAULT_PROFILE: BuilderProfile = {
  skillLevel: "no-code",
  interests: [],
  availableTime: "3 days",
  goals: [],
  tools: [],
  preferredStyle: "",
};
