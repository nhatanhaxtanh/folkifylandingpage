export default function LessonScreen() {
  return (
    <div className="flex flex-col h-full w-full bg-[#0a1f14] overflow-hidden" style={{ fontFamily: "var(--font-space-grotesk), sans-serif" }}>
      <div className="flex justify-between items-center px-5 pt-4 pb-1">
        <span className="text-white text-[13px] font-medium">9:41</span>
        <div className="flex gap-1 items-center">
          <div className="w-4 h-2.5 rounded-sm bg-white/70" />
          <div className="w-1.5 h-1.5 rounded-full bg-white/70" />
          <div className="w-4 h-2 bg-white/70 rounded-sm" />
        </div>
      </div>

      <div className="px-5 pt-3 pb-4 flex items-center gap-3">
        <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-white text-[16px]">‹</div>
        <div>
          <p className="text-[#95d5b2] text-[12px]">Đàn Tranh · Cơ bản</p>
          <h2 className="text-white text-[17px] font-bold">Bài 5: Gảy cơ bản</h2>
        </div>
      </div>

      <div className="mx-5 mb-4 bg-[#1a4a2e] rounded-2xl overflow-hidden relative" style={{ aspectRatio: "16/9" }}>
        <div className="absolute inset-0 bg-gradient-to-br from-[#2d6a4f]/60 to-[#0a1f14]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
            <div className="w-0 h-0 border-t-[8px] border-b-[8px] border-l-[14px] border-transparent border-l-white ml-1" />
          </div>
        </div>
        <div className="absolute bottom-3 left-3 right-3">
          <div className="flex items-center gap-2">
            <span className="text-white/60 text-[11px]">1:23</span>
            <div className="flex-1 bg-white/20 rounded-full h-1">
              <div className="bg-[#52b788] h-1 rounded-full w-[35%]" />
            </div>
            <span className="text-white/60 text-[11px]">3:58</span>
          </div>
        </div>
      </div>

      <div className="px-5 mb-3">
        <div className="bg-[#1a4a2e] rounded-2xl p-4 mb-3">
          <p className="text-[#95d5b2] text-[11px] uppercase tracking-widest mb-2">Hướng dẫn</p>
          <p className="text-white/90 text-[13px] leading-relaxed">Đặt ngón cái lên dây số 1, ngón trỏ dây số 2. Giữ cổ tay thẳng và gảy nhẹ nhàng từ trên xuống dưới theo nhịp.</p>
        </div>

        <div className="bg-[#1a4a2e] rounded-2xl p-4">
          <p className="text-[#95d5b2] text-[11px] uppercase tracking-widest mb-3">Luyện nốt</p>
          <div className="flex gap-2">
            {["Đô", "Rê", "Mi", "Fa", "Sol"].map((note, i) => (
              <div key={note} className={`flex-1 rounded-xl py-2.5 text-center ${i === 2 ? "bg-[#52b788]" : "bg-white/10"}`}>
                <p className={`text-[12px] font-semibold ${i === 2 ? "text-[#0a1f14]" : "text-white"}`}>{note}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 mt-auto pb-6">
        <div className="bg-[#52b788] rounded-2xl py-3.5 text-center">
          <p className="text-[#0a1f14] text-[15px] font-bold">Bài tập tiếp theo →</p>
        </div>
      </div>
    </div>
  );
}
