const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  tokenType: string;
  expiresIn: number;
  user: AuthUser;
}

async function request<T>(path: string, body: unknown): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const json = await res.json();
  if (!res.ok) {
    throw new Error(json.message ?? "Đã có lỗi xảy ra");
  }
  return json.result as T;
}

export async function register(name: string, email: string, password: string): Promise<AuthTokens> {
  return request<AuthTokens>("/api/auth/register", { name, email, password });
}

export async function login(email: string, password: string): Promise<AuthTokens> {
  return request<AuthTokens>("/api/auth/login", { email, password });
}

export function saveSession(tokens: AuthTokens): void {
  localStorage.setItem("accessToken", tokens.accessToken);
  localStorage.setItem("refreshToken", tokens.refreshToken);
  localStorage.setItem("user", JSON.stringify(tokens.user));
}

export function getSession(): AuthUser | null {
  if (typeof window === "undefined") return null;
  const raw = localStorage.getItem("user");
  return raw ? (JSON.parse(raw) as AuthUser) : null;
}

export function getAccessToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("accessToken");
}

export function clearSession(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}
