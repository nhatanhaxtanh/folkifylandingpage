"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import PhoneMockup from "@/components/PhoneMockup";
import { BookOpen, Music, Timer, Brain, TrendingUp, Fingerprint, type LucideIcon } from "lucide-react";

const features: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: BookOpen,
    title: "Học theo bài học có hệ thống",
    desc: "Lộ trình từ cơ bản đến nâng cao. Mỗi bài học gồm hướng dẫn chi tiết, video minh họa và bài tập thực hành.",
  },
  {
    icon: Music,
    title: "Kho sheet nhạc phong phú",
    desc: "200+ bản nhạc dân tộc Việt Nam — dân ca Nam Bộ, vọng cổ đến nhã nhạc cung đình Huế.",
  },
  {
    icon: Timer,
    title: "Máy đếm nhịp & Luyện tập",
    desc: "Máy đếm nhịp tích hợp, luyện gam ngũ cung và bài tập nghe nhạc để phát triển tai nghe.",
  },
  {
    icon: Brain,
    title: "Quiz âm nhạc",
    desc: "Kiểm tra kiến thức qua câu đố về nhạc lý và nhạc cụ dân tộc. Tính điểm theo thời gian thực.",
  },
  {
    icon: TrendingUp,
    title: "Theo dõi tiến trình",
    desc: "Số bài đã hoàn thành, streak học liên tiếp và thành tích — tất cả hiển thị rõ ràng.",
  },
  {
    icon: Fingerprint,
    title: "Đăng nhập đa dạng",
    desc: "Email, Google hoặc Apple ID. Hỗ trợ Face ID / Touch ID để mở khóa nhanh chóng.",
  },
];

export default function FeaturesSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="features" className="py-24 bg-[#0a1f14] relative overflow-hidden" ref={ref}>
      {/* Background glow */}
      <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2d6a4f]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#52b788]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#52b788]/20 text-[#95d5b2] border border-[#52b788]/30 mb-4 text-sm px-4 py-1 rounded-full">
            Tính năng chính
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Mọi thứ bạn cần để{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] to-[#95d5b2]">
              thành thạo nhạc cụ
            </span>
          </h2>
          <p className="text-[#95d5b2] text-lg max-w-xl mx-auto">
            Folkify tích hợp đầy đủ công cụ học nhạc trong một ứng dụng duy nhất.
          </p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-16 items-center">
          {/* Features grid */}
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((feature, i) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
                whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                className="bg-[#1a4a2e]/60 border border-[#52b788]/20 rounded-2xl p-5 hover:border-[#52b788]/50 transition-colors"
              >
                <div className="w-10 h-10 rounded-xl bg-[#52b788]/15 flex items-center justify-center mb-4">
                  <feature.icon className="w-5 h-5 text-[#52b788]" strokeWidth={1.5} />
                </div>
                <h3 className="text-white font-semibold text-base mb-2">{feature.title}</h3>
                <p className="text-[#95d5b2]/80 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>

          {/* Phone mockup */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="flex-shrink-0 flex justify-center"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/mockup-features.png" alt="Folkify app features" style={{ width: 360 }} />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
