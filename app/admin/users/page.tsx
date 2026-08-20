"use client";

import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { fetchAdminUsers, deleteUser, type AdminUser } from "@/lib/admin-api";

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

const SELECT_CLASS =
  "text-sm border border-zinc-200 rounded-xl px-3 py-2 bg-white text-[#0a1f14] focus:outline-none focus:ring-2 focus:ring-[#52b788]/30";

/**
 * Hạn gói. Gói đã quá hạn vẫn hiện PRO/BASIC cho tới khi PlanExpiryJob bên backend
 * quét (mỗi 15 phút) nên tô đỏ để phân biệt với gói còn hiệu lực.
 */
function renderPlanExpiry(user: AdminUser) {
  if (user.plan === "FREE") return <span className="text-zinc-300">—</span>;
  if (!user.planExpiresAt) return <span className="text-zinc-400">Vĩnh viễn</span>;

  const expiry = new Date(user.planExpiresAt);
  const expired = expiry.getTime() < Date.now();

  return (
    <span className={expired ? "text-red-500 font-medium" : "text-zinc-400"}>
      {expiry.toLocaleDateString("vi-VN")}
      {expired && " (đã hết hạn)"}
    </span>
  );
}

export default function AdminUsersPage() {
  const [users, setUsers] = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterPlan, setFilterPlan] = useState("");
  const [filterRole, setFilterRole] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  useEffect(() => {
    fetchAdminUsers()
      .then(setUsers)
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

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

  const keyword = search.trim().toLowerCase();
  const filtered = users.filter((u) => {
    const matchKeyword =
      !keyword ||
      u.name.toLowerCase().includes(keyword) ||
      u.email.toLowerCase().includes(keyword);
    const matchPlan = !filterPlan || u.plan === filterPlan;
    const matchRole = !filterRole || u.role === filterRole;
    return matchKeyword && matchPlan && matchRole;
  });

  const hasFilter = Boolean(keyword || filterPlan || filterRole);

  const clearFilters = () => {
    setSearch("");
    setFilterPlan("");
    setFilterRole("");
  };

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0a1f14]">Người dùng</h1>
        <p className="text-zinc-400 text-sm mt-1">
          {hasFilter ? `${filtered.length} / ${users.length} tài khoản` : `${users.length} tài khoản`}
        </p>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-50 flex flex-wrap items-center gap-3">
          <input
            type="text"
            placeholder="Tìm theo tên hoặc email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="h-9 px-3 rounded-xl border border-zinc-200 text-sm w-72 focus:outline-none focus:border-[#52b788]"
          />

          <select
            value={filterPlan}
            onChange={(e) => setFilterPlan(e.target.value)}
            className={SELECT_CLASS}
            aria-label="Lọc theo gói"
          >
            <option value="">Tất cả gói</option>
            {Object.entries(PLAN_LABELS).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>

          <select
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            className={SELECT_CLASS}
            aria-label="Lọc theo role"
          >
            <option value="">Tất cả role</option>
            <option value="USER">User</option>
            <option value="ADMIN">Admin</option>
          </select>

          {hasFilter && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-zinc-400 hover:text-zinc-600 transition-colors"
            >
              <X className="w-3.5 h-3.5" />
              Xóa lọc
            </button>
          )}
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
                  <th className="text-left px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide">Ngày mua</th>
                  <th className="text-left px-6 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide">Hết hạn</th>
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
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${PLAN_COLORS[user.plan] ?? "bg-zinc-100 text-zinc-500"}`}>
                        {PLAN_LABELS[user.plan] ?? user.plan}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-xs text-zinc-400">
                      {user.lastPurchaseAt
                        ? new Date(user.lastPurchaseAt).toLocaleDateString("vi-VN")
                        : <span className="text-zinc-300">—</span>}
                    </td>
                    <td className="px-6 py-4 text-xs">
                      {renderPlanExpiry(user)}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${ROLE_COLORS[user.role] ?? "bg-zinc-100 text-zinc-500"}`}>
                        {user.role}
                      </span>
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
                    <td colSpan={7} className="px-6 py-10 text-center text-zinc-400 text-sm">
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
