"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BarChart2, BookOpen, Music, Award, ChevronRight, Crown, Flame, Sparkles, LogOut } from "lucide-react";
import { getSession, clearSession, type AuthUser } from "@/lib/auth";

const stats = [
  { label: "Bài đã học", value: "0", icon: BookOpen },
  { label: "Streak", value: "0", icon: Flame },
  { label: "Nhạc cụ", value: "0", icon: Music },
  { label: "Thành tích", value: "0", icon: Award },
];

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
    } else {
      setUser(session);
    }
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  if (!user) return null;

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Navbar */}
      <header className="bg-white border-b border-zinc-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-md bg-white border border-zinc-100 flex items-center justify-center overflow-hidden shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Folkify" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-[#0a1f14] font-bold text-lg">Folkify</span>
          </Link>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#52b788] to-[#2d6a4f] flex items-center justify-center text-white text-sm font-semibold">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center gap-1.5 text-red-400 hover:text-red-600 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Đăng xuất
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-10">
        {/* Welcome */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-[#0a1f14] flex items-center gap-2">
            Xin chào, {user.name}
            <Sparkles className="w-5 h-5 text-[#52b788]" strokeWidth={1.5} />
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Chào mừng bạn đến với Folkify!</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Main content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {stats.map((s) => (
                <div key={s.label} className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
                  <s.icon className="w-5 h-5 text-[#52b788] mb-2" strokeWidth={1.5} />
                  <p className="text-2xl font-bold text-[#0a1f14]">{s.value}</p>
                  <p className="text-zinc-400 text-xs mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Start learning */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="px-6 pt-6 pb-4 border-b border-zinc-50">
                <h2 className="text-base font-semibold text-[#0a1f14]">Bắt đầu học ngay</h2>
                <p className="text-zinc-400 text-sm mt-0.5">Chọn nhạc cụ bạn muốn học</p>
              </div>
              <div className="divide-y divide-zinc-50">
                {[
                  { name: "Đàn Tranh", type: "Dây gảy", level: "Cơ bản", lessons: 24 },
                  { name: "Sáo Trúc", type: "Hơi", level: "Cơ bản", lessons: 18 },
                  { name: "Đàn Bầu", type: "Dây", level: "Trung cấp", lessons: 20 },
                ].map((inst) => (
                  <div key={inst.name} className="flex items-center justify-between px-6 py-4 hover:bg-zinc-50 transition-colors cursor-pointer">
                    <div className="flex items-center gap-4">
                      <div className="w-10 h-10 rounded-xl bg-[#52b788]/10 flex items-center justify-center">
                        <Music className="w-5 h-5 text-[#52b788]" strokeWidth={1.5} />
                      </div>
                      <div>
                        <p className="font-medium text-[#0a1f14] text-sm">{inst.name}</p>
                        <p className="text-zinc-400 text-xs">{inst.type} · {inst.lessons} bài học</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-xs bg-[#52b788]/10 text-[#2d6a4f] px-2.5 py-1 rounded-full font-medium">
                        {inst.level}
                      </span>
                      <ChevronRight className="w-4 h-4 text-zinc-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity chart placeholder */}
            <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-semibold text-[#0a1f14]">Hoạt động</h2>
                <BarChart2 className="w-4 h-4 text-zinc-300" />
              </div>
              <div className="flex items-end gap-1.5 h-20">
                {[0,0,0,0,0,0,0].map((_, i) => (
                  <div key={i} className="flex-1 bg-zinc-100 rounded-t-md" style={{ height: "8px" }} />
                ))}
              </div>
              <div className="flex justify-between mt-2">
                {["T2","T3","T4","T5","T6","T7","CN"].map((d) => (
                  <span key={d} className="text-[10px] flex-1 text-center text-zinc-300">{d}</span>
                ))}
              </div>
              <p className="text-zinc-400 text-xs text-center mt-4">Chưa có hoạt động nào. Bắt đầu học để xem thống kê!</p>
            </div>
          </div>

          {/* Sidebar — Plan */}
          <div className="space-y-4">
            <p className="text-xs font-medium text-zinc-400 uppercase tracking-widest px-1">Gói của bạn</p>

            {/* Free plan — current */}
            <div className="bg-white rounded-2xl border-2 border-[#52b788]/40 shadow-sm overflow-hidden">
              <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                <div>
                  <p className="text-[#0a1f14] font-bold text-lg">Free</p>
                  <p className="text-zinc-400 text-xs mt-0.5">Miễn phí mãi mãi</p>
                </div>
                <span className="bg-[#52b788]/10 text-[#2d6a4f] text-xs px-2.5 py-1 rounded-full font-semibold">Hiện tại</span>
              </div>
              <div className="px-5 pb-5 space-y-2.5 border-t border-zinc-50 pt-4">
                {[
                  { text: "10 bài học mỗi tháng", ok: true },
                  { text: "Máy đếm nhịp cơ bản", ok: true },
                  { text: "Tải bản nhạc offline", ok: false },
                  { text: "AI Pitch chấm nhạc", ok: false },
                  { text: "Hỗ trợ ưu tiên 24/7", ok: false },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2.5">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 ${item.ok ? "bg-[#52b788]/15" : "bg-zinc-100"}`}>
                      <span className={`text-[10px] ${item.ok ? "text-[#52b788]" : "text-zinc-300"}`}>
                        {item.ok ? "✓" : "×"}
                      </span>
                    </div>
                    <span className={`text-sm ${item.ok ? "text-zinc-700" : "text-zinc-300"}`}>{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Pro plan — upgrade */}
            <div className="bg-gradient-to-br from-[#0a1f14] to-[#1a4a2e] rounded-2xl overflow-hidden">
              <div className="px-5 pt-5 pb-4 flex items-center justify-between">
                <div>
                  <p className="text-white font-bold text-lg flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-[#95d5b2]" strokeWidth={1.5} />
                    Pro
                  </p>
                  <p className="text-[#95d5b2]/60 text-xs mt-0.5">99.000đ / tháng</p>
                </div>
                <span className="bg-[#52b788]/20 text-[#95d5b2] text-xs px-2.5 py-1 rounded-full font-semibold">Đề xuất</span>
              </div>
              <div className="px-5 pb-4 space-y-2.5 border-t border-white/10 pt-4">
                {[
                  "Truy cập 200+ bài học",
                  "Máy đếm nhịp nâng cao",
                  "Tải bản nhạc offline",
                  "AI Pitch chấm nhạc",
                  "Hỗ trợ ưu tiên 24/7",
                ].map((text) => (
                  <div key={text} className="flex items-center gap-2.5">
                    <div className="w-4 h-4 rounded-full flex items-center justify-center flex-shrink-0 bg-[#52b788]/20">
                      <span className="text-[10px] text-[#95d5b2]">✓</span>
                    </div>
                    <span className="text-sm text-[#95d5b2]/80">{text}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 pb-5">
                <Link
                  href="/#pricing"
                  className="flex items-center justify-center gap-2 w-full h-11 rounded-xl font-semibold text-[#0a1f14] text-sm transition-all hover:opacity-90"
                  style={{ background: "linear-gradient(135deg, #52b788, #95d5b2)" }}
                >
                  Nâng cấp lên Pro
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
