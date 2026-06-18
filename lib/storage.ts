import { SquidProject, BuilderProfile } from "./types";

const STORAGE_KEY = "squidcode_projects";
const PROFILE_KEY = "squidcode_profile";

export function saveProject(project: SquidProject): void {
  const projects = loadProjects();
  const existingIndex = projects.findIndex((p) => p.id === project.id);
  if (existingIndex >= 0) {
    projects[existingIndex] = project;
  } else {
    projects.unshift(project);
  }
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}

export function loadProjects(): SquidProject[] {
  if (typeof window === "undefined") return [];
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return [];
  try {
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

export function deleteProject(id: string): void {
  const projects = loadProjects().filter((p) => p.id !== id);
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(projects));
  }
}

export function saveProfile(profile: BuilderProfile): void {
  if (typeof window !== "undefined") {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  }
}

export function loadProfile(): BuilderProfile | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem(PROFILE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}
