"use client";

import { useEffect, useState } from "react";
import { ChevronDown, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { fetchAdminUsers, updateUserPlan, updateUserRole, deleteUser, type AdminUser } from "@/lib/admin-api";

const PLAN_LABELS: Record<string, string> = { FREE: "Free", BASIC: "Basic", PRO: "Pro" };
const PLAN_COLORS: Record<string, string> = {
  FREE: "bg-zinc-100 text-zinc-600",
  BASIC: "bg-blue-50 text-blue-600",
  PRO: "bg-amber-50 text-amber-600",
};
const ROLE_COLORS: Record<string, string> = {
  USER: "bg-zinc-100 text-zinc-500",
  ADMIN: "bg-red-50 text-red-500",
};

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminUsers()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const handlePlanChange = async (id: string, plan: string, name: string) => {
    setUpdatingId(id);
    try {
      const updated = await updateUserPlan(id, plan);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      toast.success(`Đã đổi gói của ${name} sang ${PLAN_LABELS[plan] ?? plan}`);
    } catch {
      toast.error("Cập nhật gói thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleRoleChange = async (id: string, role: string, name: string) => {
    setUpdatingId(id);
    try {
      const updated = await updateUserRole(id, role);
      setUsers((prev) => prev.map((u) => (u.id === id ? updated : u)));
      toast.success(`Đã đổi role của ${name} sang ${role}`);
    } catch {
      toast.error("Cập nhật role thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  const handleDelete = async (id: string, name: string) => {
    if (!confirm(`Bạn có chắc muốn xóa tài khoản "${name}"? Hành động này không thể hoàn tác.`)) return;
    setUpdatingId(id);
    try {
      await deleteUser(id);
      setUsers((prev) => prev.filter((u) => u.id !== id));
      toast.success(`Đã xóa tài khoản ${name}`);
    } catch {
      toast.error("Xóa tài khoản thất bại");
    } finally {
      setUpdatingId(null);
    }
  };

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0a1f14]">Người dùng</h1>
        <p className="text-zinc-400 text-sm mt-1">{users.length} tài khoản</p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-50 flex items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 px-3 rounded-xl border border-zinc-200 text-sm w-72 focus:outline-none focus:border-[#52b788]"
          />
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-400 text-sm">Đang tải...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-50">
                  <th className="text-left px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide">Người dùng</th>
                  <th className="text-left px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide">Gói</th>
                  <th className="text-left px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide">Role</th>
                  <th className="text-left px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide">Ngày tạo</th>
                  <th className="px-6 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {filtered.map((user) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#52b788] to-[#2d6a4f] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-[#0a1f14]">{user.name}</p>
                          <p className="text-zinc-400 text-xs">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-flex items-center gap-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${PLAN_COLORS[user.plan] ?? "bg-zinc-100 text-zinc-500"}`}>
                          {PLAN_LABELS[user.plan] ?? user.plan}
                        </span>
                        <select
                          value={user.plan}
                          disabled={updatingId === user.id}
                          onChange={(e) => handlePlanChange(user.id, e.target.value, user.name)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full"
                        >
                          <option value="FREE">Free</option>
                          <option value="BASIC">Basic</option>
                          <option value="PRO">Pro</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-zinc-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative inline-flex items-center gap-1">
                        <span className={`text-xs px-2 py-1 rounded-full font-medium ${ROLE_COLORS[user.role] ?? "bg-zinc-100 text-zinc-500"}`}>
                          {user.role}
                        </span>
                        <select
                          value={user.role}
                          disabled={updatingId === user.id}
                          onChange={(e) => handleRoleChange(user.id, e.target.value, user.name)}
                          className="absolute inset-0 opacity-0 cursor-pointer w-full"
                        >
                          <option value="USER">USER</option>
                          <option value="ADMIN">ADMIN</option>
                        </select>
                        <ChevronDown className="w-3 h-3 text-zinc-400" />
                      </div>
                    </td>
                    <td className="px-6 py-4 text-zinc-400 text-xs">
                      {user.createdAt ? new Date(user.createdAt).toLocaleDateString("vi-VN") : "—"}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={updatingId === user.id}
                        className="text-zinc-300 hover:text-red-400 transition-colors disabled:opacity-40"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-zinc-400 text-sm">
                      Không tìm thấy người dùng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
