"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

const instruments = [
  { slug: "dan-tranh", image: "/instrument-dan-tranh.jpg", imagePos: "center", name: "Đàn Tranh", type: "Dây gảy", difficulty: 3, desc: "Nhạc cụ 16 dây, biểu tượng của âm nhạc truyền thống Việt Nam." },
  { slug: "dan-bau", image: "/instrument-dan-bau.jpg", imagePos: "center 70%", name: "Đàn Bầu", type: "Dây", difficulty: 4, desc: "Nhạc cụ một dây độc đáo với âm thanh réo rắt, huyền diệu." },
  { slug: "dan-nguyet", image: "/instrument-dan-nguyet.jpg", imagePos: "center", name: "Đàn Nguyệt", type: "Dây gảy", difficulty: 3, desc: "Đàn hình mặt trăng, thường dùng trong hát chèo và cải lương." },
  { slug: "sao-truc", image: "/instrument-sao-truc.jpg", imagePos: "center", name: "Sáo Trúc", type: "Hơi", difficulty: 2, desc: "Nhạc cụ hơi từ cây tre, thanh âm trong trẻo bay bổng." },
  { slug: "dan-ty-ba", image: "/instrument-dan-ty-ba.webp", imagePos: "center", name: "Đàn Tỳ Bà", type: "Dây gảy", difficulty: 4, desc: "Đàn lê hình quả tỳ bà, phổ biến trong cung đình Huế." },
  { slug: "dan-nhi", image: "/instrument-dan-nhi.jpg", imagePos: "center", name: "Đàn Nhị", type: "Dây kéo", difficulty: 4, desc: "Đàn 2 dây kéo vĩ, âm thanh tha thiết như tiếng người than." },
];

function DifficultyDots({ level }: { level: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((i) => (
        <div key={i} className={`w-1.5 h-1.5 rounded-full ${i <= level ? "bg-[#52b788]" : "bg-zinc-200"}`} />
      ))}
    </div>
  );
}

export default function InstrumentsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="instruments" className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <Badge className="bg-[#d8f3dc] text-[#1a4a2e] border-0 mb-4 text-sm px-4 py-1 rounded-full">
            Nhạc cụ hiện có
          </Badge>
          <h2 className="text-4xl font-bold text-[#0a1f14] mb-4">
            6 nhạc cụ truyền thống
          </h2>
          <p className="text-[#2d6a4f] text-lg max-w-xl mx-auto">
            Từ dây gảy, dây kéo đến nhạc cụ hơi — mỗi nhạc cụ có lộ trình học riêng từ cơ bản đến nâng cao.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {instruments.map((inst, i) => (
            <motion.div
              key={inst.name}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="group relative rounded-2xl overflow-hidden border border-zinc-100 shadow-sm hover:shadow-xl hover:border-[#52b788]/40 transition-all duration-300"
            >
              <Link href={`/instruments/${inst.slug}`} className="absolute inset-0 z-10" aria-label={inst.name} />

              {/* Image / placeholder */}
              <div className="relative h-52">
                {inst.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={inst.image}
                    alt={inst.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    style={{ objectPosition: inst.imagePos }}
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-[#0a1f14] to-[#2d6a4f]" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

                {/* Type badge on image */}
                <span className="absolute top-3 left-3 text-xs font-medium px-2.5 py-1 rounded-full bg-black/30 backdrop-blur-sm text-white border border-white/20">
                  {inst.type}
                </span>
              </div>

              {/* Info */}
              <div className="bg-white px-5 py-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-[#0a1f14] font-bold text-base">{inst.name}</h3>
                  <DifficultyDots level={inst.difficulty} />
                </div>
                <p className="text-zinc-500 text-sm mt-1 leading-snug line-clamp-2">{inst.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="text-center text-[#52b788] mt-8 text-sm"
        >
          + Thêm nhiều nhạc cụ sắp ra mắt
        </motion.p>
      </div>
    </section>
  );
}
