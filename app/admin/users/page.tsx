"use client";

import { useEffect, useMemo, useState } from "react";
import { ChevronLeft, ChevronRight, Trash2, X } from "lucide-react";
import { toast } from "sonner";
import { fetchAdminUsers, deleteUser, type AdminUser } from "@/lib/admin-api";

const PAGE_SIZE = 10;

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

const TH_CLASS =
  "text-left px-3 py-3 text-zinc-400 font-medium text-xs uppercase tracking-wide whitespace-nowrap";
const TD_DATE_CLASS = "px-3 py-3 text-xs whitespace-nowrap";

/** Ngày rút gọn dd/MM/yy để bảng không bị tràn ngang. */
function formatShortDate(value: string) {
  return new Date(value).toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  });
}

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
    <span
      className={expired ? "text-red-500 font-medium" : "text-zinc-400"}
      title={expired ? "Đã hết hạn — chờ PlanExpiryJob hạ về Free" : undefined}
    >
      {formatShortDate(user.planExpiresAt)}
      {expired && " (hết hạn)"}
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
  const [page, setPage] = useState(1);

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
  const filtered = useMemo(
    () =>
      users.filter((u) => {
        const matchKeyword =
          !keyword ||
          u.name.toLowerCase().includes(keyword) ||
          u.email.toLowerCase().includes(keyword);
        const matchPlan = !filterPlan || u.plan === filterPlan;
        const matchRole = !filterRole || u.role === filterRole;
        return matchKeyword && matchPlan && matchRole;
      }),
    [users, keyword, filterPlan, filterRole],
  );

  const hasFilter = Boolean(keyword || filterPlan || filterRole);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  // Xóa user có thể làm hụt số trang nên phải kẹp lại thay vì tin vào state.
  const currentPage = Math.min(page, totalPages);
  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const paged = filtered.slice(startIndex, startIndex + PAGE_SIZE);

  // Mọi thay đổi bộ lọc đều đưa về trang 1, tránh đứng ở trang không còn tồn tại.
  const changeSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  const changeFilterPlan = (value: string) => {
    setFilterPlan(value);
    setPage(1);
  };

  const changeFilterRole = (value: string) => {
    setFilterRole(value);
    setPage(1);
  };

  const clearFilters = () => {
    setSearch("");
    setFilterPlan("");
    setFilterRole("");
    setPage(1);
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
            onChange={(e) => changeSearch(e.target.value)}
            className="h-9 px-3 rounded-xl border border-zinc-200 text-sm w-72 focus:outline-none focus:border-[#52b788]"
          />

          <select
            value={filterPlan}
            onChange={(e) => changeFilterPlan(e.target.value)}
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
            onChange={(e) => changeFilterRole(e.target.value)}
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
                  <th className={`${TH_CLASS} w-12`}>STT</th>
                  <th className={TH_CLASS}>Người dùng</th>
                  <th className={TH_CLASS}>Gói</th>
                  <th className={TH_CLASS}>Ngày mua</th>
                  <th className={TH_CLASS}>Hết hạn</th>
                  <th className={TH_CLASS}>Role</th>
                  <th className={TH_CLASS}>Ngày tạo</th>
                  <th className="px-3 py-3 w-10" />
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {paged.map((user, index) => (
                  <tr key={user.id} className="hover:bg-zinc-50/50 transition-colors">
                    <td className="px-3 py-3 text-zinc-400 text-xs tabular-nums">
                      {startIndex + index + 1}
                    </td>
                    <td className="px-3 py-3">
                      <div className="flex items-center gap-2.5">
                        <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#52b788] to-[#2d6a4f] flex items-center justify-center text-white text-xs font-semibold flex-shrink-0">
                          {user.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="min-w-0">
                          <p className="font-medium text-[#0a1f14] text-sm truncate max-w-[180px]">{user.name}</p>
                          <p className="text-zinc-400 text-xs truncate max-w-[180px]">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${PLAN_COLORS[user.plan] ?? "bg-zinc-100 text-zinc-500"}`}>
                        {PLAN_LABELS[user.plan] ?? user.plan}
                      </span>
                    </td>
                    <td className={`${TD_DATE_CLASS} text-zinc-400`}>
                      {user.lastPurchaseAt
                        ? formatShortDate(user.lastPurchaseAt)
                        : <span className="text-zinc-300">—</span>}
                    </td>
                    <td className={TD_DATE_CLASS}>
                      {renderPlanExpiry(user)}
                    </td>
                    <td className="px-3 py-3">
                      <span className={`text-xs px-2 py-1 rounded-full font-medium ${ROLE_COLORS[user.role] ?? "bg-zinc-100 text-zinc-500"}`}>
                        {user.role}
                      </span>
                    </td>
                    <td className={`${TD_DATE_CLASS} text-zinc-400`}>
                      {user.createdAt ? formatShortDate(user.createdAt) : "—"}
                    </td>
                    <td className="px-3 py-3">
                      <button
                        onClick={() => handleDelete(user.id, user.name)}
                        disabled={updatingId === user.id}
                        className="text-zinc-300 hover:text-red-400 transition-colors disabled:opacity-40"
                        aria-label={`Xóa tài khoản ${user.name}`}
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
                {filtered.length === 0 && (
                  <tr>
                    <td colSpan={8} className="px-3 py-10 text-center text-zinc-400 text-sm">
                      Không tìm thấy người dùng nào
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        )}

        {!loading && filtered.length > 0 && (
          <div className="px-4 py-3 border-t border-zinc-50 flex items-center justify-between gap-3">
            <p className="text-xs text-zinc-400">
              {startIndex + 1}–{startIndex + paged.length} / {filtered.length}
            </p>

            <div className="flex items-center gap-1">
              <button
                onClick={() => setPage(currentPage - 1)}
                disabled={currentPage === 1}
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Trang trước"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="text-xs text-zinc-500 px-2 tabular-nums">
                {currentPage} / {totalPages}
              </span>

              <button
                onClick={() => setPage(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded-lg text-zinc-400 hover:bg-zinc-50 hover:text-zinc-600 transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                aria-label="Trang sau"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
