"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { getSession, clearSession, type AuthUser } from "@/lib/auth";

const navLinks = [
  { label: "Tính năng", href: "#features" },
  { label: "Nhạc cụ", href: "#instruments" },
  { label: "Giá cả", href: "#pricing" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setUser(getSession());
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-[#0a1f14]/95 backdrop-blur-md border-b border-white/10 shadow-lg"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        <a href="/" className="flex items-center gap-2.5 group">
          <div className="w-11 h-11 rounded-md bg-white flex items-center justify-center overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/logo.png" alt="Folkify logo" className="w-10 h-10 object-contain" />
          </div>
          <span className="text-white font-bold text-2xl tracking-tight">
            Folkify
          </span>
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/70 hover:text-white text-sm transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <a
                href="/dashboard"
                className="flex items-center gap-2.5 text-white/80 hover:text-white text-sm font-medium px-3 h-10 transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#52b788] to-[#2d6a4f] flex items-center justify-center text-white text-xs font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                {user.name.split(" ").pop()}
              </a>
              <button
                onClick={() => { clearSession(); setUser(null); }}
                className="text-red-400 hover:text-red-300 text-sm font-medium px-4 h-10 flex items-center transition-colors"
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <a
                href="/login"
                className="text-white/70 hover:text-white text-sm font-medium px-4 h-10 flex items-center transition-colors"
              >
                Đăng nhập
              </a>
              <a
                href="/signup"
                className="relative inline-flex items-center gap-2 rounded-full px-6 h-10 text-sm font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-[#52b788]/40"
                style={{ background: "linear-gradient(135deg, #52b788 0%, #2d6a4f 50%, #52b788 100%)", backgroundSize: "200% auto" }}
                onMouseEnter={e => (e.currentTarget.style.backgroundPosition = "right center")}
                onMouseLeave={e => (e.currentTarget.style.backgroundPosition = "left center")}
              >
                <span className="absolute inset-0 -translate-x-full animate-[shimmer_2.5s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-[-20deg]" />
                <span className="relative flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-white/80 animate-pulse" />
                  Đăng ký miễn phí
                </span>
              </a>
            </>
          )}
        </div>
      </div>
    </motion.header>
  );
}
