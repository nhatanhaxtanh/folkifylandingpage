import { getAccessToken } from "./auth";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8080";

async function adminRequest<T>(path: string, options?: RequestInit): Promise<T> {
  const token = getAccessToken();
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options?.headers,
    },
  });
  const json = await res.json();
  if (!res.ok) throw new Error(json.message ?? "Lỗi server");
  return json.result as T;
}

export interface AdminStats {
  totalUsers: number;
  freeUsers: number;
  basicUsers: number;
  proUsers: number;
  newUsersThisWeek: number;
  totalAdmins: number;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: string;
  plan: string;
  createdAt: string;
}

export const fetchAdminStats = () => adminRequest<AdminStats>("/api/admin/stats");
export const fetchAdminUsers = () => adminRequest<AdminUser[]>("/api/admin/users");

export const updateUserPlan = (id: string, plan: string) =>
  adminRequest<AdminUser>(`/api/admin/users/${id}/plan`, {
    method: "PATCH",
    body: JSON.stringify({ plan }),
  });

export const updateUserRole = (id: string, role: string) =>
  adminRequest<AdminUser>(`/api/admin/users/${id}/role`, {
    method: "PATCH",
    body: JSON.stringify({ role }),
  });

export const deleteUser = (id: string) =>
  adminRequest<void>(`/api/admin/users/${id}`, { method: "DELETE" });
