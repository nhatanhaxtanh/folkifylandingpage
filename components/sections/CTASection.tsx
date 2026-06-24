"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Music } from "lucide-react";

export default function CTASection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 relative overflow-hidden" ref={ref}>
      {/* Same hero background */}
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/hero-bg.png')" }} />
      <div className="absolute inset-0 bg-[#0a1f14]/50" />

      {/* Animated glow orbs */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[#52b788]/15 blur-3xl pointer-events-none"
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 rounded-md bg-white flex items-center justify-center overflow-hidden shadow-xl shadow-black/30">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/logo.png" alt="Folkify" className="w-14 h-14 object-contain" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
            Bắt đầu hành trình âm nhạc{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] to-[#95d5b2]">
              của bạn ngay hôm nay
            </span>
          </h2>
          <p className="text-[#95d5b2] text-xl mb-10 max-w-xl mx-auto">
            Hàng nghìn học viên đã bắt đầu học nhạc cụ dân tộc cùng Folkify. Lượt tiếp theo là bạn.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button
              className="bg-[#52b788] hover:bg-[#74c69d] text-[#0a1f14] font-bold text-lg rounded-full px-10 h-14 shadow-xl shadow-[#52b788]/30"
              render={<a href="#pricing" />}
              nativeButton={false}
            >
              <Music className="w-5 h-5" /> Dùng thử miễn phí 7 ngày
            </Button>
            <a
              href="#"
              className="flex items-center gap-3 bg-black hover:bg-zinc-900 text-white rounded-2xl px-5 h-14 transition-colors border border-white/10"
            >
              <svg viewBox="0 0 24 24" className="w-7 h-7 fill-white flex-shrink-0" xmlns="http://www.w3.org/2000/svg">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
              </svg>
              <div className="text-left">
                <p className="text-white/50 text-[10px] leading-none mb-0.5">Download on the</p>
                <p className="text-white font-semibold text-base leading-none">App Store</p>
              </div>
            </a>
          </div>

          <p className="text-[#95d5b2]/50 text-sm mt-6">
            Không cần thẻ tín dụng · Hủy bất kỳ lúc nào
          </p>
        </motion.div>
      </div>
    </section>
  );
}
