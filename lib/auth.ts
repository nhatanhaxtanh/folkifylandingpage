const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: "FREE" | "BASIC" | "PRO";
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

export function getRefreshToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("refreshToken");
}

export function clearSession(): void {
  localStorage.removeItem("accessToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("user");
}

// Gọi refresh-token để lấy cặp token mới. Gom nhiều lời gọi đồng thời vào
// cùng một request để tránh refresh trùng lặp khi nhiều fetch cùng gặp 401.
let refreshPromise: Promise<string | null> | null = null;

export function refreshSession(): Promise<string | null> {
  if (refreshPromise) return refreshPromise;

  refreshPromise = (async () => {
    const refreshToken = getRefreshToken();
    if (!refreshToken) return null;
    try {
      const res = await fetch(`${API_URL}/api/auth/refresh-token`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!res.ok) {
        clearSession();
        return null;
      }
      const json = await res.json();
      const tokens = json.result as AuthTokens;
      saveSession(tokens);
      return tokens.accessToken;
    } catch {
      return null;
    } finally {
      refreshPromise = null;
    }
  })();

  return refreshPromise;
}

// Fetch có gắn Bearer token; nếu gặp 401 thì tự refresh và thử lại một lần.
export async function authFetch(input: string, init: RequestInit = {}): Promise<Response> {
  const withAuth = (token: string | null): RequestInit => ({
    ...init,
    headers: {
      ...init.headers,
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
  });

  let res = await fetch(input, withAuth(getAccessToken()));
  if (res.status === 401) {
    const newToken = await refreshSession();
    if (newToken) {
      res = await fetch(input, withAuth(newToken));
    }
  }
  return res;
}
