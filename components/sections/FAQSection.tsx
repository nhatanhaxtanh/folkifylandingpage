"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "Tôi chưa biết gì về nhạc có học được không?",
    a: "Hoàn toàn được. Folkify được thiết kế cho người bắt đầu từ con số 0. Mỗi lộ trình đều bắt đầu từ những khái niệm cơ bản nhất — tư thế cầm đàn, cách tạo ra âm thanh đầu tiên.",
  },
  {
    q: "App có miễn phí không?",
    a: "Có. Một số bài học và bản nhạc miễn phí để bạn khám phá. Gói Premium (Basic hoặc Pro) mở khóa toàn bộ nội dung và tính năng nâng cao.",
  },
  {
    q: "Tôi có thể hủy đăng ký không?",
    a: "Có thể hủy bất kỳ lúc nào qua Settings → Apple ID → Subscriptions trên iPhone. Quyền truy cập vẫn còn cho đến hết kỳ thanh toán hiện tại.",
  },
  {
    q: "App có hoạt động offline không?",
    a: "Gói Pro hỗ trợ tải nội dung để học không cần mạng. Bạn có thể tải trước bài học, video và bản nhạc để sử dụng khi không có internet.",
  },
  {
    q: "Folkify có trên Android không?",
    a: "Hiện tại Folkify có mặt trên iOS (App Store). Phiên bản Android đang được phát triển và dự kiến ra mắt trong thời gian tới.",
  },
  {
    q: "Có video minh họa không?",
    a: "Có. Mỗi bài học đều có video hướng dẫn chi tiết từ giảng viên chuyên nghiệp, cùng với hình ảnh minh họa tư thế và kỹ thuật.",
  },
];

export default function FAQSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="faq" className="py-24 bg-white" ref={ref}>
      <div className="max-w-3xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#d8f3dc] text-[#1a4a2e] border-0 mb-4 text-sm px-4 py-1 rounded-full">
            FAQ
          </Badge>
          <h2 className="text-4xl font-bold text-[#0a1f14] mb-4">
            Câu hỏi thường gặp
          </h2>
          <p className="text-[#2d6a4f] text-lg">
            Chưa tìm thấy câu trả lời? Liên hệ{" "}
            <a href="mailto:support@folkify.vn" className="text-[#2d6a4f] underline underline-offset-2">
              support@folkify.vn
            </a>
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Accordion className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border border-[#d8f3dc] rounded-2xl px-6 data-[state=open]:border-[#52b788] transition-colors"
              >
                <AccordionTrigger className="text-[#0a1f14] font-semibold text-base text-left hover:no-underline py-5">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="text-[#2d6a4f]/80 text-base leading-relaxed pb-5">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
