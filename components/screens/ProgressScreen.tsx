export default function ProgressScreen() {
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
        <h2 className="text-white text-[22px] font-bold">Tiến trình</h2>
        <p className="text-[#95d5b2] text-[13px]">Tháng 6, 2026</p>
      </div>

      <div className="px-5 grid grid-cols-3 gap-2.5 mb-4">
        {[
          { value: "24", label: "Bài học" },
          { value: "7🔥", label: "Streak" },
          { value: "3h", label: "Thời gian" },
        ].map((stat) => (
          <div key={stat.label} className="bg-[#1a4a2e] rounded-2xl p-3 text-center">
            <p className="text-[#52b788] text-[20px] font-bold">{stat.value}</p>
            <p className="text-white/50 text-[11px] mt-0.5">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="px-5 mb-4">
        <div className="bg-[#1a4a2e] rounded-2xl p-4">
          <p className="text-[#95d5b2] text-[11px] uppercase tracking-widest mb-3">Hoạt động tuần này</p>
          <div className="flex items-end gap-1.5 h-16">
            {[40, 70, 30, 90, 60, 100, 75].map((h, i) => (
              <div key={i} className="flex-1 flex flex-col justify-end h-full">
                <div className={`rounded-t-md ${i === 5 ? "bg-[#52b788]" : "bg-[#52b788]/30"}`} style={{ height: `${h}%` }} />
              </div>
            ))}
          </div>
          <div className="flex justify-between mt-2">
            {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((d, i) => (
              <span key={d} className={`text-[10px] flex-1 text-center ${i === 5 ? "text-[#52b788] font-medium" : "text-white/30"}`}>{d}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="px-5 flex-1">
        <p className="text-white/40 text-[11px] uppercase tracking-widest mb-3">Thành tích</p>
        <div className="grid grid-cols-4 gap-2">
          {[
            { emoji: "🏆", name: "Hoàn hảo" },
            { emoji: "⚡", name: "Nhanh nhẹn" },
            { emoji: "🎯", name: "Chính xác" },
            { emoji: "🔥", name: "7 ngày" },
          ].map((badge) => (
            <div key={badge.name} className="bg-[#1a4a2e] rounded-2xl py-3 px-1 text-center">
              <div className="text-2xl mb-1">{badge.emoji}</div>
              <p className="text-white text-[10px] font-medium leading-tight">{badge.name}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t border-white/10 flex justify-around py-4 px-5 mt-3">
        {[
          { icon: "🏠", label: "Trang chủ", active: false },
          { icon: "📚", label: "Học", active: false },
          { icon: "🎼", label: "Sheet", active: false },
          { icon: "👤", label: "Tôi", active: true },
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
