"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Globe, Target, Zap, Smartphone, type LucideIcon } from "lucide-react";

const reasons: { icon: LucideIcon; title: string; desc: string }[] = [
  {
    icon: Globe,
    title: "Thuần Việt",
    desc: "Nội dung được xây dựng bởi người Việt, cho người Việt. Giao diện và hướng dẫn hoàn toàn bằng tiếng Việt.",
  },
  {
    icon: Target,
    title: "Học đúng kỹ thuật",
    desc: "Mỗi bài học xây dựng nền tảng đúng từ đầu — tư thế, cách cầm đàn, kỹ thuật gảy — thay vì học mò.",
  },
  {
    icon: Zap,
    title: "Học mọi lúc mọi nơi",
    desc: "Không cần thầy, không cần lịch cố định. Học 10 phút hay 1 tiếng — hoàn toàn tùy bạn.",
  },
  {
    icon: Smartphone,
    title: "Trải nghiệm mượt mà",
    desc: "Thiết kế tối giản, tối ưu cho iOS. Hỗ trợ chế độ tối và học offline với gói Pro.",
  },
];

export default function WhySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-[#0a1f14] relative overflow-hidden" ref={ref}>
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-0 w-[400px] h-[400px] bg-[#52b788]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
        <div className="absolute top-1/2 right-0 w-[400px] h-[400px] bg-[#2d6a4f]/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#52b788]/20 text-[#95d5b2] border border-[#52b788]/30 mb-4 text-sm px-4 py-1 rounded-full">
            Vì sao chọn Folkify?
          </Badge>
          <h2 className="text-4xl font-bold text-white mb-4">
            Khác biệt tạo nên{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#52b788] to-[#95d5b2]">
              giá trị thật
            </span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ scale: 1.02 }}
              className="bg-[#1a4a2e]/50 border border-[#52b788]/20 rounded-2xl p-8 flex gap-6 hover:border-[#52b788]/50 transition-colors"
            >
              <div className="w-14 h-14 rounded-2xl bg-[#52b788]/15 flex items-center justify-center flex-shrink-0">
                <reason.icon className="w-6 h-6 text-[#52b788]" strokeWidth={1.5} />
              </div>
              <div>
                <h3 className="text-white font-bold text-xl mb-2">{reason.title}</h3>
                <p className="text-[#95d5b2]/80 text-base leading-relaxed">{reason.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-16 border-t border-white/10 pt-16"
        >
          {[
            { value: "10K+", label: "Học viên" },
            { value: "200+", label: "Bản nhạc" },
            { value: "6", label: "Nhạc cụ" },
            { value: "4.9★", label: "App Store" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-4xl font-bold text-[#52b788] mb-1">{stat.value}</p>
              <p className="text-[#95d5b2]/60 text-sm">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
