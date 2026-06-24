"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Eye, EyeOff } from "lucide-react";
import { login, saveSession } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const tokens = await login(email, password);
      saveSession(tokens);
      router.push(tokens.user.role === "ADMIN" ? "/admin" : "/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Đăng nhập thất bại");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left panel — branding */}
      <div
        className="hidden lg:flex flex-col justify-between w-[480px] flex-shrink-0 p-10 relative overflow-hidden"
        style={{ background: "linear-gradient(160deg, #0a1f14 0%, #1a4a2e 100%)" }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center opacity-30"
          style={{ backgroundImage: "url('/hero-bg.png')" }}
        />
        <div className="relative">
          <Link href="/" className="text-[#95d5b2]/60 hover:text-[#95d5b2] text-sm transition-colors">
            ← Về trang chủ
          </Link>
        </div>

        <div className="relative flex flex-col items-center text-center">
          <div className="w-32 h-32 rounded-3xl bg-white flex items-center justify-center overflow-hidden shadow-xl shadow-black/30 mb-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Folkify" className="w-28 h-28 object-contain" />
          </div>
          <h2 className="text-white text-5xl font-bold tracking-tight mb-3">Folkify</h2>
          <p className="text-[#95d5b2]/70 text-base">Tiếng đàn vẫn còn đó, chỉ thiếu mình bạn</p>
        </div>

        <div className="relative flex items-center gap-3 bg-white/5 border border-white/10 rounded-2xl p-4">
          <div className="flex -space-x-1.5">
            {["47","32","12","25"].map((id) => (
              // eslint-disable-next-line @next/next/no-img-element
              <img key={id} src={`https://i.pravatar.cc/100?img=${id}`}
                className="w-8 h-8 rounded-full ring-2 ring-[#0a1f14]" alt="" />
            ))}
          </div>
          <div>
            <p className="text-white text-sm font-semibold">10,000+ học viên</p>
            <p className="text-[#95d5b2]/60 text-xs">đang học mỗi ngày</p>
          </div>
        </div>
      </div>

      {/* Right panel — form */}
      <div className="flex-1 flex items-center justify-center px-6 py-12 bg-white">
        <div className="w-full max-w-md">
          <div className="flex lg:hidden items-center gap-2 mb-8">
            <div className="w-9 h-9 rounded-md bg-[#0a1f14] flex items-center justify-center overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Folkify" className="w-8 h-8 object-contain" />
            </div>
            <span className="text-[#0a1f14] font-bold text-lg">Folkify</span>
          </div>

          <h1 className="text-2xl font-bold text-[#0a1f14] mb-1">Đăng nhập</h1>
          <p className="text-[#2d6a4f]/60 text-sm mb-8">
            Chưa có tài khoản?{" "}
            <Link href="/signup" className="text-[#52b788] font-medium hover:underline">
              Đăng ký miễn phí
            </Link>
          </p>

          <div className="flex gap-3 mb-6">
            <button className="flex-1 flex items-center justify-center gap-2.5 h-11 rounded-xl border border-zinc-200 bg-white hover:bg-zinc-50 transition-colors text-sm font-medium text-zinc-700">
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Google
            </button>
            <button className="flex-1 flex items-center justify-center gap-2.5 h-11 rounded-xl border border-zinc-200 bg-black hover:bg-zinc-900 transition-colors text-sm font-medium text-white">
              <svg className="w-5 h-5 fill-white" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              Apple
            </button>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <Separator className="flex-1" />
            <span className="text-zinc-400 text-xs">hoặc đăng nhập bằng email</span>
            <Separator className="flex-1" />
          </div>

          {error && (
            <div className="mb-4 px-4 py-3 rounded-xl bg-red-50 border border-red-100 text-red-600 text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <Label htmlFor="email" className="text-sm font-medium text-zinc-700">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="ban@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-11 rounded-xl border-zinc-200 focus:border-[#52b788] focus:ring-[#52b788]/20"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <Label htmlFor="password" className="text-sm font-medium text-zinc-700">Mật khẩu</Label>
                <Link href="#" className="text-xs text-[#52b788] hover:underline">Quên mật khẩu?</Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Nhập mật khẩu"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="h-11 rounded-xl border-zinc-200 focus:border-[#52b788] focus:ring-[#52b788]/20 pr-10"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full h-11 rounded-xl font-semibold text-white text-sm transition-all hover:opacity-90 hover:scale-[1.01] disabled:opacity-70 mt-2"
              style={{ background: "linear-gradient(135deg, #52b788, #2d6a4f)" }}
            >
              {loading ? "Đang đăng nhập..." : "Đăng nhập"}
            </button>
          </form>

          <p className="text-zinc-400 text-xs text-center mt-6 leading-relaxed">
            Bằng cách đăng nhập, bạn đồng ý với{" "}
            <Link href="#" className="underline hover:text-zinc-600">Điều khoản sử dụng</Link>{" "}
            và{" "}
            <Link href="#" className="underline hover:text-zinc-600">Chính sách bảo mật</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
