import { getAccessToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function get<T>(path: string): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}${path}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Lỗi server");
  return json.result as T;
}

export interface InstrumentProgress {
  id: string;
  slug: string;
  name: string;
  emoji: string;
  color: string;
  completedLessons: number;
  totalLessons: number;
  progressPercent: number;
}

export interface UserProgress {
  totalXp: number;
  totalLessonsCompleted: number;
  currentStreak: number;
  longestStreak: number;
  instruments: InstrumentProgress[];
}

export interface Achievement {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  unlockedAt?: string;
}

export interface AchievementsResponse {
  unlocked: Achievement[];
  locked: Achievement[];
}

export interface ActivityDay {
  date: string;
  dayLabel: string;
  xpEarned: number;
  minutes: number;
  today: boolean;
}

export const fetchProgress = () => get<UserProgress>("/api/progress");
export const fetchAchievements = () => get<AchievementsResponse>("/api/progress/achievements");
export const fetchActivity = () => get<ActivityDay[]>("/api/progress/activity");
