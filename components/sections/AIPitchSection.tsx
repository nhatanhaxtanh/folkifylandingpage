"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Mic, Waves, Target, Zap } from "lucide-react";

const features = [
  {
    icon: Mic,
    title: "Chấm điểm theo thời gian thực",
    desc: "AI lắng nghe bạn chơi và đánh giá từng nốt nhạc ngay lập tức — không cần chờ đợi.",
  },
  {
    icon: Waves,
    title: "Nhận diện cao độ chính xác",
    desc: "Phân tích tần số âm thanh để xác định bạn đang chơi đúng hay lạc tông so với chuẩn.",
  },
  {
    icon: Target,
    title: "Luyện theo gam ngũ cung",
    desc: "Tập từng nốt trong thang âm truyền thống Việt Nam — Đô, Rê, Mi, Fa, Sol và hơn thế nữa.",
  },
  {
    icon: Zap,
    title: "Phản hồi tức thì",
    desc: "Biết ngay mình chơi đúng hay sai sau mỗi nốt, giúp hình thành thói quen chơi chuẩn.",
  },
];

export default function AIPitchSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white relative overflow-hidden" ref={ref}>
      {/* Subtle background accents */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#52b788]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#95d5b2]/8 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left: Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="flex-shrink-0 flex justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mockup-ai.png" alt="Folkify AI Pitch" style={{ width: 320 }} />
          </motion.div>

          {/* Right: Content */}
          <div className="flex-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <Badge className="bg-[#52b788]/15 text-[#2d6a4f] border border-[#52b788]/30 mb-4 text-sm px-4 py-1 rounded-full">
                AI Pitch · Công nghệ mới
              </Badge>
              <h2 className="text-4xl font-bold text-[#0a1f14] mb-4 leading-tight">
                Chấm nhạc bằng AI —{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] to-[#2d6a4f]">
                  biết ngay đúng hay sai
                </span>
              </h2>
              <p className="text-[#2d6a4f]/70 text-lg mb-10 leading-relaxed">
                Tính năng AI Pitch của Folkify nghe và phân tích từng nốt bạn chơi, cho điểm accuracy theo thời gian thực — như có một người thầy bên cạnh mỗi khi luyện tập.
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {features.map((feature, i) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.2 + i * 0.08 }}
                  className="flex gap-4 p-4 rounded-2xl border border-[#52b788]/15 bg-[#f0faf5] hover:border-[#52b788]/40 transition-colors"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#52b788]/15 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-5 h-5 text-[#52b788]" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="text-[#0a1f14] font-semibold text-sm mb-1">{feature.title}</h3>
                    <p className="text-[#2d6a4f]/70 text-sm leading-relaxed">{feature.desc}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
