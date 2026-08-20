"use client";

import { useEffect, useState } from "react";
import { Users, Crown, Zap, UserCheck, TrendingUp, Shield } from "lucide-react";
import {
  fetchAdminStats, fetchAdminBlogPosts,
  type AdminStats, type BlogPostAdmin,
} from "@/lib/admin-api";
import BlogWeeklyStats from "./BlogWeeklyStats";

export default function AdminOverviewPage() {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [posts, setPosts] = useState<BlogPostAdmin[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Bảng thống kê theo tuần cần danh sách bài viết để đếm cột Blog Posts.
    Promise.all([fetchAdminStats(), fetchAdminBlogPosts()])
      .then(([adminStats, blogPosts]) => {
        setStats(adminStats);
        setPosts(blogPosts);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  const statCards = stats
    ? [
        { label: "Tổng người dùng", value: stats.totalUsers, icon: Users, color: "text-[#52b788]", bg: "bg-[#52b788]/10" },
        { label: "Mới tuần này", value: stats.newUsersThisWeek, icon: TrendingUp, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Gói Basic", value: stats.basicUsers, icon: Zap, color: "text-blue-500", bg: "bg-blue-50" },
        { label: "Gói Pro", value: stats.proUsers, icon: Crown, color: "text-amber-500", bg: "bg-amber-50" },
        { label: "Gói Free", value: stats.freeUsers, icon: UserCheck, color: "text-zinc-400", bg: "bg-zinc-100" },
        { label: "Admins", value: stats.totalAdmins, icon: Shield, color: "text-red-400", bg: "bg-red-50" },
      ]
    : [];

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-[#0a1f14]">Tổng quan</h1>
        <p className="text-zinc-400 text-sm mt-1">Thống kê hệ thống Folkify</p>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-48 text-zinc-400 text-sm">Đang tải...</div>
      ) : (
        <>
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
            {statCards.map((s) => (
              <div key={s.label} className="bg-white rounded-2xl p-5 border border-zinc-100 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${s.bg} flex items-center justify-center mb-4`}>
                  <s.icon className={`w-5 h-5 ${s.color}`} strokeWidth={1.5} />
                </div>
                <p className="text-3xl font-bold text-[#0a1f14]">{s.value}</p>
                <p className="text-zinc-400 text-sm mt-1">{s.label}</p>
              </div>
            ))}
          </div>

          <BlogWeeklyStats posts={posts} />
        </>
      )}
    </div>
  );
}
