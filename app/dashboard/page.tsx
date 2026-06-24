"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { BookOpen, Award, Flame, Sparkles, LogOut, Zap, Trophy, Star, Crown, Target, Music, Music2, Wind, Waves, Guitar, type LucideIcon } from "lucide-react";

const instrumentIcon: Record<string, LucideIcon> = {
  "dan-tranh": Music2,
  "dan-bau":   Waves,
  "dan-nguyet": Guitar,
  "sao-truc":  Wind,
  "dan-ty-ba": Music,
  "dan-nhi":   Music2,
};

const achievementIcon: Record<string, LucideIcon> = {
  bullseye: Target,
  star:     Star,
  trophy:   Trophy,
  fire:     Flame,
  crown:    Crown,
  music:    Music,
};
import { getSession, clearSession, type AuthUser } from "@/lib/auth";
import { fetchProgress, fetchAchievements, fetchActivity, type UserProgress, type AchievementsResponse, type ActivityDay } from "@/lib/api";

export default function DashboardPage() {
  const router = useRouter();
  const [user, setUser] = useState<AuthUser | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [achievements, setAchievements] = useState<AchievementsResponse | null>(null);
  const [activity, setActivity] = useState<ActivityDay[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const session = getSession();
    if (!session) {
      router.replace("/login");
      return;
    }
    setUser(session);

    Promise.all([fetchProgress(), fetchAchievements(), fetchActivity()])
      .then(([prog, ach, act]) => {
        setProgress(prog);
        setAchievements(ach);
        setActivity(act);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [router]);

  const handleLogout = () => {
    clearSession();
    router.push("/login");
  };

  if (!user) return null;

  const maxXp = Math.max(...activity.map((d) => d.xpEarned), 1);

  const stats = [
    { label: "Bài đã học", value: progress?.totalLessonsCompleted ?? 0, icon: BookOpen },
    { label: "Streak", value: progress?.currentStreak ?? 0, icon: Flame },
    { label: "Thành tích", value: achievements?.unlocked.length ?? 0, icon: Award },
  ];

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
            <div className="flex items-center gap-2 text-sm text-zinc-600">
              <Zap className="w-4 h-4 text-[#52b788]" />
              <span className="font-semibold text-[#0a1f14]">{progress?.totalXp ?? 0} XP</span>
            </div>
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
          <p className="text-zinc-500 text-sm mt-1">
            {progress?.currentStreak
              ? `Streak ${progress.currentStreak} ngày — tiếp tục học để duy trì nhé!`
              : "Chào mừng bạn đến với Folkify!"}
          </p>
        </div>

        {loading ? (
          <div className="flex items-center justify-center h-48 text-zinc-400 text-sm">Đang tải...</div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Stats */}
              <div className="grid grid-cols-3 gap-4">
                {stats.map((s) => (
                  <div key={s.label} className="bg-white rounded-2xl p-4 border border-zinc-100 shadow-sm">
                    <s.icon className="w-5 h-5 text-[#52b788] mb-2" strokeWidth={1.5} />
                    <p className="text-2xl font-bold text-[#0a1f14]">{s.value}</p>
                    <p className="text-zinc-400 text-xs mt-0.5">{s.label}</p>
                  </div>
                ))}
              </div>

              {/* Instrument progress */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-6 pt-6 pb-4 border-b border-zinc-50">
                  <h2 className="text-base font-semibold text-[#0a1f14]">Tiến độ nhạc cụ</h2>
                </div>
                {progress?.instruments.length ? (
                  <div className="divide-y divide-zinc-50">
                    {progress.instruments.map((inst) => (
                      <div key={inst.id} className="px-6 py-4">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-2">
                            {(() => { const Icon = instrumentIcon[inst.slug] ?? Music; return <Icon className="w-5 h-5 text-[#52b788]" strokeWidth={1.5} />; })()}
                            <span className="font-medium text-[#0a1f14] text-sm">{inst.name}</span>
                          </div>
                          <span className="text-xs text-zinc-400">
                            {inst.completedLessons}/{inst.totalLessons} bài
                          </span>
                        </div>
                        <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${inst.progressPercent}%`,
                              background: inst.color ?? "linear-gradient(90deg, #52b788, #2d6a4f)",
                            }}
                          />
                        </div>
                        <p className="text-xs text-zinc-400 mt-1">{inst.progressPercent}%</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-zinc-400 text-sm text-center py-8">
                    Chưa học nhạc cụ nào. Bắt đầu ngay!
                  </p>
                )}
              </div>

              {/* Activity chart */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-semibold text-[#0a1f14]">Hoạt động 7 ngày</h2>
                  <span className="text-xs text-zinc-400">XP kiếm được</span>
                </div>
                <div className="flex items-end gap-1.5 h-24">
                  {activity.map((day, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div className="w-full flex items-end justify-center" style={{ height: "80px" }}>
                        <div
                          className={`w-full rounded-t-md transition-all ${day.today ? "bg-[#52b788]" : "bg-zinc-200"}`}
                          style={{ height: `${Math.max((day.xpEarned / maxXp) * 80, day.xpEarned > 0 ? 6 : 4)}px` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2">
                  {activity.map((day, i) => (
                    <span key={i} className={`text-[10px] flex-1 text-center ${day.today ? "text-[#52b788] font-semibold" : "text-zinc-300"}`}>
                      {day.dayLabel}
                    </span>
                  ))}
                </div>
                {activity.every((d) => d.xpEarned === 0) && (
                  <p className="text-zinc-400 text-xs text-center mt-3">Chưa có hoạt động nào. Bắt đầu học để xem thống kê!</p>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-4">
              {/* Streak card */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm p-5">
                <div className="flex items-center gap-2 mb-1">
                  <Flame className="w-5 h-5 text-orange-400" />
                  <span className="font-semibold text-[#0a1f14]">Streak</span>
                </div>
                <p className="text-3xl font-bold text-[#0a1f14]">{progress?.currentStreak ?? 0} <span className="text-base font-normal text-zinc-400">ngày</span></p>
                <p className="text-xs text-zinc-400 mt-1">Kỷ lục: {progress?.longestStreak ?? 0} ngày</p>
              </div>

              {/* Achievements */}
              <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
                <div className="px-5 pt-5 pb-3 border-b border-zinc-50 flex items-center gap-2">
                  <Trophy className="w-4 h-4 text-[#52b788]" />
                  <h2 className="text-sm font-semibold text-[#0a1f14]">Thành tích</h2>
                  {achievements?.unlocked.length ? (
                    <span className="ml-auto text-xs bg-[#52b788]/10 text-[#2d6a4f] px-2 py-0.5 rounded-full font-medium">
                      {achievements.unlocked.length}/{(achievements.unlocked.length + (achievements.locked?.length ?? 0))}
                    </span>
                  ) : null}
                </div>
                <div className="p-4 space-y-2">
                  {achievements?.unlocked.length ? (
                    achievements.unlocked.slice(0, 4).map((ach) => {
                      const Icon = achievementIcon[ach.icon] ?? Award;
                      return (
                        <div key={ach.id} className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-[#52b788]/10 flex items-center justify-center flex-shrink-0">
                            <Icon className="w-4 h-4 text-[#52b788]" strokeWidth={1.5} />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-[#0a1f14]">{ach.name}</p>
                            <p className="text-xs text-zinc-400">{ach.description}</p>
                          </div>
                        </div>
                      );
                    })
                  ) : (
                    <p className="text-zinc-400 text-xs text-center py-3">Chưa có thành tích nào</p>
                  )}
                  {achievements?.locked.slice(0, 2).map((ach) => {
                    const Icon = achievementIcon[ach.icon] ?? Award;
                    return (
                      <div key={ach.id} className="flex items-center gap-3 opacity-40">
                        <div className="w-8 h-8 rounded-lg bg-zinc-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-4 h-4 text-zinc-400" strokeWidth={1.5} />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-zinc-500">{ach.name}</p>
                          <p className="text-xs text-zinc-400">{ach.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Plan */}
              {user.plan === "PRO" ? (
                <div className="bg-gradient-to-br from-[#0a1f14] to-[#1a4a2e] rounded-2xl p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <Trophy className="w-4 h-4 text-[#95d5b2]" />
                    <p className="text-white font-bold">Gói Pro</p>
                    <span className="ml-auto text-xs bg-[#52b788]/20 text-[#95d5b2] px-2 py-0.5 rounded-full font-medium">Hiện tại</span>
                  </div>
                  <p className="text-[#95d5b2]/60 text-xs">Truy cập toàn bộ 200+ bài học</p>
                </div>
              ) : user.plan === "BASIC" ? (
                <div className="bg-white rounded-2xl border-2 border-[#52b788]/40 shadow-sm p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-[#0a1f14] font-bold">Gói Basic</p>
                    <span className="ml-auto text-xs bg-[#52b788]/10 text-[#2d6a4f] px-2 py-0.5 rounded-full font-medium">Hiện tại</span>
                  </div>
                  <p className="text-zinc-400 text-xs mb-4">49.000đ / tháng</p>
                  <Link
                    href="/#pricing"
                    className="flex items-center justify-center w-full h-10 rounded-xl font-semibold text-white text-sm"
                    style={{ background: "linear-gradient(135deg, #52b788, #2d6a4f)" }}
                  >
                    Nâng cấp lên Pro
                  </Link>
                </div>
              ) : (
                <div className="bg-gradient-to-br from-[#0a1f14] to-[#1a4a2e] rounded-2xl overflow-hidden p-5">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="text-white font-bold">Gói Free</p>
                    <span className="ml-auto text-xs bg-white/10 text-white/50 px-2 py-0.5 rounded-full font-medium">Hiện tại</span>
                  </div>
                  <p className="text-[#95d5b2]/60 text-xs mb-4">Nâng cấp để mở khóa 200+ bài học</p>
                  <Link
                    href="/#pricing"
                    className="flex items-center justify-center w-full h-10 rounded-xl font-semibold text-[#0a1f14] text-sm"
                    style={{ background: "linear-gradient(135deg, #52b788, #95d5b2)" }}
                  >
                    Xem các gói
                  </Link>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
