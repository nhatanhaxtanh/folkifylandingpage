export default function HomeScreen() {
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

      <div className="px-5 pt-3 pb-4">
        <p className="text-[#95d5b2] text-[13px]">Chào buổi sáng,</p>
        <h2 className="text-white text-[22px] font-bold mt-0.5">Minh Tuấn 👋</h2>
      </div>

      <div className="mx-5 mb-4 bg-[#52b788]/20 border border-[#52b788]/30 rounded-2xl p-4 flex items-center gap-3">
        <div className="w-11 h-11 rounded-full bg-[#52b788]/30 flex items-center justify-center text-2xl">🔥</div>
        <div>
          <p className="text-white text-[14px] font-semibold">7 ngày liên tiếp!</p>
          <p className="text-[#95d5b2] text-[12px]">Tiếp tục duy trì nhé</p>
        </div>
        <div className="ml-auto text-[#52b788] text-[13px] font-medium">Xem →</div>
      </div>

      <div className="px-5 mb-4">
        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-3">Tiếp tục học</p>
        <div className="bg-[#1a4a2e] rounded-2xl p-4">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 rounded-xl bg-[#52b788]/20 flex items-center justify-center text-2xl">🎵</div>
            <div>
              <p className="text-white text-[15px] font-semibold">Đàn Tranh</p>
              <p className="text-[#95d5b2] text-[12px]">Bài 5: Gảy cơ bản</p>
            </div>
            <div className="ml-auto w-9 h-9 bg-[#52b788] rounded-full flex items-center justify-center">
              <div className="w-0 h-0 border-t-[6px] border-b-[6px] border-l-[10px] border-transparent border-l-[#0a1f14] ml-0.5" />
            </div>
          </div>
          <div className="w-full bg-white/10 rounded-full h-1.5">
            <div className="bg-[#52b788] h-1.5 rounded-full w-[60%]" />
          </div>
          <p className="text-[#95d5b2] text-[11px] mt-1.5">60% hoàn thành</p>
        </div>
      </div>

      <div className="px-5 flex-1">
        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-3">Nhạc cụ</p>
        <div className="grid grid-cols-3 gap-2.5">
          {[
            { emoji: "🎵", name: "Đàn Tranh", active: true },
            { emoji: "🎶", name: "Đàn Bầu", active: false },
            { emoji: "🎋", name: "Sáo Trúc", active: false },
            { emoji: "🌙", name: "Đàn Nguyệt", active: false },
            { emoji: "🪕", name: "Tỳ Bà", active: false },
            { emoji: "🎻", name: "Đàn Nhị", active: false },
          ].map((item) => (
            <div key={item.name} className={`rounded-2xl p-3 text-center ${item.active ? "bg-[#52b788]/30 border border-[#52b788]/50" : "bg-[#1a4a2e]"}`}>
              <div className="text-2xl mb-1.5">{item.emoji}</div>
              <p className="text-white text-[11px] font-medium leading-tight">{item.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 flex justify-around py-4 px-5 mt-3">
        {[
          { icon: "🏠", label: "Trang chủ", active: true },
          { icon: "📚", label: "Học", active: false },
          { icon: "🎼", label: "Sheet", active: false },
          { icon: "👤", label: "Tôi", active: false },
        ].map((item) => (
          <div key={item.label} className="flex flex-col items-center gap-1">
            <span className="text-[18px]">{item.icon}</span>
            <span className={`text-[10px] font-medium ${item.active ? "text-[#52b788]" : "text-white/40"}`}>{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
