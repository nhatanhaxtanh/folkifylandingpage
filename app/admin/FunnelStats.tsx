"use client";

const WEEK_COUNT = 4;

/**
 * Số liệu demo phễu chuyển đổi. Chưa có nguồn thật: App Downloads phải lấy từ
 * App Store Connect, các bước sau lấy từ bảng users / payment_transaction.
 */
const FUNNEL_METRICS: { label: string; values: number[] }[] = [
  { label: "App Downloads", values: [12, 18, 20, 14] },
  { label: "Registrations", values: [9, 14, 16, 13] },
  { label: "Activated Users", values: [7, 11, 12, 9] },
  { label: "Free Trials Started", values: [5, 8, 9, 6] },
  { label: "New Paying Customers", values: [3, 5, 7, 5] },
];

const TH_CLASS =
  "px-3 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide whitespace-nowrap";

/** dd/MM — khớp cách hiển thị của bảng thống kê theo tuần. */
function dayMonth(date: Date) {
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  return `${day}/${month}`;
}

function startOfWeek(date: Date) {
  const d = new Date(date.getFullYear(), date.getMonth(), date.getDate());
  d.setDate(d.getDate() - ((d.getDay() + 6) % 7));
  return d;
}

/**
 * Khoảng ngày thật của từng cột, để hover lên tiêu đề là biết "Week 3" ứng với
 * tuần nào. Week cuối cùng là tuần hiện tại.
 */
function weekRange(weekIndex: number) {
  const monday = startOfWeek(new Date());
  monday.setDate(monday.getDate() - 7 * (WEEK_COUNT - 1 - weekIndex));
  const sunday = new Date(monday);
  sunday.setDate(sunday.getDate() + 6);
  return `${dayMonth(monday)} – ${dayMonth(sunday)}/${String(sunday.getFullYear()).slice(2)}`;
}

export default function FunnelStats() {
  return (
    <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden mb-6">
      <div className="px-4 py-3 border-b border-zinc-50">
        <h2 className="text-sm font-semibold text-[#0a1f14]">Phễu chuyển đổi theo tuần</h2>
        <p className="text-xs text-zinc-400 mt-0.5">{WEEK_COUNT} tuần gần nhất</p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-50">
              <th className={`${TH_CLASS} text-left`}>Metric</th>
              {Array.from({ length: WEEK_COUNT }, (_, i) => (
                <th key={i} className={`${TH_CLASS} text-right`} title={weekRange(i)}>
                  Week {i + 1}
                </th>
              ))}
              <th className={`${TH_CLASS} text-right text-zinc-500`}>Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {FUNNEL_METRICS.map(({ label, values }) => (
              <tr key={label} className="hover:bg-zinc-50/50 transition-colors">
                <td className="px-3 py-3 text-sm text-[#0a1f14] whitespace-nowrap">{label}</td>
                {values.map((value, i) => (
                  <td key={i} className="px-3 py-3 text-sm text-zinc-500 text-right tabular-nums">
                    {value}
                  </td>
                ))}
                <td className="px-3 py-3 text-sm font-semibold text-[#0a1f14] text-right tabular-nums">
                  {values.reduce((sum, v) => sum + v, 0)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
