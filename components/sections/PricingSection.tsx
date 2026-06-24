"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Star, Flame } from "lucide-react";

const plans = [
  {
    name: "Free",
    price: "0đ",
    period: "mãi mãi",
    description: "Trải nghiệm âm nhạc dân tộc",
    features: [
      "10 bài học mỗi tháng",
      "Máy đếm nhịp cơ bản",
      "Truy cập diễn đàn cộng đồng",
    ],
    cta: "Bắt đầu miễn phí",
    popular: false,
  },
  {
    name: "Basic",
    price: "49.000đ",
    period: "tháng",
    description: "Phù hợp để bắt đầu khám phá",
    features: [
      "50+ bài học không giới hạn",
      "200+ bản nhạc",
      "Luyện tập không giới hạn",
      "Máy đếm nhịp nâng cao",
      "Theo dõi tiến trình",
    ],
    cta: "Bắt đầu Basic",
    popular: false,
    bestseller: true,
  },
  {
    name: "Pro",
    price: "99.000đ",
    period: "tháng",
    description: "Trải nghiệm đầy đủ nhất",
    features: [
      "Tất cả bài học & bản nhạc",
      "Máy lên dây thông minh",
      "Theo dõi tiến trình chi tiết",
      "Tải bản nhạc offline",
      "AI Pitch chấm nhạc",
      "Hỗ trợ ưu tiên 24/7",
    ],
    cta: "Bắt đầu Pro",
    popular: true,
  },
];

export default function PricingSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="pricing" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#d8f3dc] text-[#1a4a2e] border-0 mb-4 text-sm px-4 py-1 rounded-full">
            Gói Premium
          </Badge>
          <h2 className="text-4xl font-bold text-[#0a1f14] mb-4">
            Đơn giản, minh bạch
          </h2>
          <p className="text-[#2d6a4f] text-lg max-w-xl mx-auto">
            Dùng thử miễn phí, hủy bất kỳ lúc nào. Không cần thẻ tín dụng.
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-6 max-w-5xl mx-auto items-stretch pt-5">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="flex-1 relative pt-5"
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#52b788] text-[#0a1f14] text-sm font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
                    <Star className="w-4 h-4" strokeWidth={2.5} />
                    Phổ biến nhất
                  </span>
                </div>
              )}
              {"bestseller" in plan && plan.bestseller && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10">
                  <span className="inline-flex items-center gap-1.5 bg-[#f4a261] text-white text-sm font-bold px-5 py-2 rounded-full shadow-lg whitespace-nowrap">
                    <Flame className="w-4 h-4" strokeWidth={2.5} />
                    Bán chạy nhất
                  </span>
                </div>
              )}
              <Card
                className={`h-full p-8 rounded-3xl border-2 flex flex-col ${
                  plan.popular
                    ? "border-[#52b788] bg-[#0a1f14] shadow-2xl shadow-[#52b788]/20"
                    : "border-[#d8f3dc] bg-white shadow-sm"
                }`}
              >

                <div className="mb-6">
                  <h3
                    className={`text-2xl font-bold mb-1 ${
                      plan.popular ? "text-white" : "text-[#0a1f14]"
                    }`}
                  >
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-4 ${plan.popular ? "text-[#95d5b2]" : "text-[#2d6a4f]/70"}`}>
                    {plan.description}
                  </p>
                  <div className="flex items-baseline gap-1">
                    <span
                      className={`text-4xl font-bold ${
                        plan.popular ? "text-[#52b788]" : "text-[#0a1f14]"
                      }`}
                    >
                      {plan.price}
                    </span>
                    <span className={`text-sm ${plan.popular ? "text-[#95d5b2]" : "text-[#2d6a4f]/60"}`}>
                      /{plan.period}
                    </span>
                  </div>
                </div>

                <ul className="space-y-3 flex-1 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-3">
                      <div
                        className={`w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-xs ${
                          plan.popular
                            ? "bg-[#52b788]/20 text-[#52b788]"
                            : "bg-[#d8f3dc] text-[#2d6a4f]"
                        }`}
                      >
                        ✓
                      </div>
                      <span
                        className={`text-sm ${
                          plan.popular ? "text-white/90" : "text-[#2d6a4f]"
                        }`}
                      >
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full rounded-full h-12 font-semibold text-base ${
                    plan.popular
                      ? "bg-[#52b788] hover:bg-[#74c69d] text-[#0a1f14] shadow-lg shadow-[#52b788]/30"
                      : "bg-[#d8f3dc] hover:bg-[#b7e4c7] text-[#0a1f14]"
                  }`}
                >
                  {plan.cta}
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-center text-[#2d6a4f]/60 mt-8 text-sm"
        >
          Dùng thử miễn phí 7 ngày — không cần thẻ tín dụng · Hủy bất kỳ lúc nào
        </motion.p>
      </div>
    </section>
  );
}
