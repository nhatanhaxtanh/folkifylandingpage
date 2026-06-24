"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import PhoneMockup from "@/components/PhoneMockup";
import { Music } from "lucide-react";

const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

export default function HeroSection() {
  return (
    <section className="relative flex items-start overflow-hidden" style={{ minHeight: "calc(100vh + 14rem)" }}>
      {/* Hero background image */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/hero-bg.png')" }}
      />
      {/* Overlay to darken slightly for text readability */}
      <div className="absolute inset-0 bg-[#0a1f14]/40" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full bg-[#52b788]/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-1/4 right-1/4 w-[350px] h-[350px] rounded-full bg-[#95d5b2]/10 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />

      {/* Floating particles */}
      <div className="absolute inset-0 pointer-events-none">
        {[...Array(24)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              left: `${(i * 37 + 10) % 100}%`,
              top: `${(i * 53 + 5) % 100}%`,
              width: i % 3 === 0 ? 3 : 2,
              height: i % 3 === 0 ? 3 : 2,
              backgroundColor: i % 4 === 0 ? "#95d5b2" : "#52b788",
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, i % 2 === 0 ? 8 : -8, 0],
              opacity: [0.2, 0.8, 0.2],
            }}
            transition={{
              duration: 3 + (i % 5),
              repeat: Infinity,
              delay: i * 0.25,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      <div className="relative max-w-7xl mx-auto px-6 pt-16 pb-32 flex flex-col lg:flex-row items-center gap-12">
        {/* Left: Text content */}
        <div className="flex-1 text-center lg:text-left">
          <motion.div
            initial="hidden"
            animate="show"
            variants={{ show: { transition: { staggerChildren: 0.12 } } }}
          >
            <motion.div variants={fadeUp}>
              <span className="inline-flex items-center gap-2 text-[#52b788] text-sm font-medium border border-[#52b788]/30 rounded-full px-4 py-1.5 mb-6 bg-[#52b788]/10">
                <span>🇻🇳</span> Ứng dụng nhạc cụ dân tộc Việt Nam
              </span>
            </motion.div>

            <motion.h1
              variants={fadeUp}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6"
            >
              Khám phá âm nhạc{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] to-[#95d5b2]">
                dân tộc Việt Nam
              </span>{" "}
              theo cách của bạn
            </motion.h1>

            <motion.p
              variants={fadeUp}
              className="text-[#95d5b2] text-lg max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Học đàn tranh, sáo trúc, đàn bầu và nhiều nhạc cụ truyền thống
              ngay trên điện thoại — theo từng bài học, theo tốc độ của riêng bạn.
            </motion.p>

            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Button
                className="bg-[#52b788] hover:bg-[#74c69d] text-[#0a1f14] font-bold text-base rounded-full px-8 h-12 shadow-lg shadow-[#52b788]/30"
                render={<a href="#pricing" />}
              nativeButton={false}
              >
                <Music className="w-4 h-4 mr-1.5" strokeWidth={2} />
                Dùng thử miễn phí
              </Button>
              <Button
                variant="outline"
                className="border-white/20 text-white hover:bg-white/10 hover:text-white bg-transparent rounded-full px-8 h-12"
                render={<a href="#features" />}
                nativeButton={false}
              >
                Xem tính năng ↓
              </Button>
            </motion.div>

            <motion.div variants={fadeUp} className="mt-10 flex justify-center lg:justify-start">
              <div className="flex items-center rounded-full border border-white/20 bg-white/10 backdrop-blur-sm p-1 gap-1 shadow shadow-black/20">
                <div className="flex -space-x-1.5">
                  {[
                    "https://i.pravatar.cc/100?img=47",
                    "https://i.pravatar.cc/100?img=32",
                    "https://i.pravatar.cc/100?img=12",
                    "https://i.pravatar.cc/100?img=25",
                  ].map((src, i) => (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      key={i}
                      className="rounded-full ring-1 ring-[#0a1f14]"
                      src={src}
                      width={28}
                      height={28}
                      alt={`Học viên ${i + 1}`}
                    />
                  ))}
                </div>
                <div className="flex items-center gap-1.5 px-2">
                  <div className="flex text-[#f4a261] gap-px text-xs">
                    {"★★★★★".split("").map((s, i) => <span key={i}>{s}</span>)}
                  </div>
                  <p className="text-xs text-white/70">
                    <strong className="font-semibold text-white">10K+</strong> học viên tin dùng
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Right: Real mockup image */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative flex-shrink-0"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#52b788]/20 rounded-full blur-3xl pointer-events-none" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/mockup.png"
            alt="Folkify app mockup"
            style={{ width: 500, position: "relative" }}
          />
        </motion.div>
      </div>

      {/* Bottom gradient blend */}
      <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
