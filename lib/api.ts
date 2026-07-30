import { authFetch } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function publicGet<T>(path: string): Promise<T> {
  const res = await fetch(`${API_URL}${path}`);
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Lỗi server");
  return json.result as T;
}

export interface BlogPostSummary {
  id: string;
  slug: string;
  title: string;
  summary: string;
  coverImageUrl: string;
  category: string;
  authorName: string;
  publishedAt: string | null;
}

export interface BlogPost extends BlogPostSummary {
  content: string;
  updatedAt: string;
}

export const fetchBlogPosts = () => publicGet<BlogPostSummary[]>("/api/blog");
export const fetchBlogPost = (slug: string) => publicGet<BlogPost>(`/api/blog/${slug}`);

async function get<T>(path: string): Promise<T> {
  const res = await authFetch(`${API_URL}${path}`);
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
