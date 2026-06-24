"use client";

import { useEffect, useState } from "react";
import { Pencil, Check, X, Music, ChevronDown, ChevronUp } from "lucide-react";
import { toast } from "sonner";
import { fetchAdminInstruments, updateInstrument, type InstrumentAdmin } from "@/lib/admin-api";

export default function InstrumentsPage() {
  const [instruments, setInstruments] = useState<InstrumentAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Partial<InstrumentAdmin>>({});
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchAdminInstruments()
      .then(setInstruments)
      .catch(() => toast.error("Không thể tải danh sách nhạc cụ"))
      .finally(() => setLoading(false));
  }, []);

  const startEdit = (inst: InstrumentAdmin) => {
    setEditId(inst.id);
    setEditData({ ...inst });
  };

  const cancelEdit = () => {
    setEditId(null);
    setEditData({});
  };

  const saveEdit = async (id: string) => {
    setSaving(true);
    try {
      const updated = await updateInstrument(id, editData);
      setInstruments((prev) => prev.map((i) => (i.id === id ? updated : i)));
      setEditId(null);
      toast.success("Cập nhật nhạc cụ thành công");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Lỗi cập nhật");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-zinc-400 text-sm">Đang tải...</div>;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-xl font-bold text-[#0a1f14]">Nhạc cụ</h1>
        <p className="text-zinc-400 text-sm mt-1">Chỉnh sửa thông tin 6 nhạc cụ dân tộc</p>
      </div>

      <div className="space-y-3">
        {instruments.map((inst) => {
          const isEditing = editId === inst.id;
          const isExpanded = expanded === inst.id || isEditing;
          const d = isEditing ? editData : inst;

          return (
            <div key={inst.id} className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
              <div className="px-5 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#52b788]/10 flex items-center justify-center flex-shrink-0">
                  <Music className="w-5 h-5 text-[#52b788]" strokeWidth={1.5} />
                </div>
                <div className="flex-1 min-w-0">
                  {isEditing ? (
                    <input
                      className="text-sm font-semibold text-[#0a1f14] border border-zinc-200 rounded-lg px-2 py-1 w-full max-w-xs"
                      value={editData.name ?? ""}
                      onChange={(e) => setEditData((p) => ({ ...p, name: e.target.value }))}
                    />
                  ) : (
                    <p className="font-semibold text-[#0a1f14] text-sm">{inst.name}</p>
                  )}
                  <p className="text-xs text-zinc-400">{inst.slug} · {inst.lessonCount} bài học</p>
                </div>
                <div className="flex items-center gap-2">
                  {isEditing ? (
                    <>
                      <button
                        onClick={() => saveEdit(inst.id)}
                        disabled={saving}
                        className="flex items-center gap-1 text-xs text-[#52b788] hover:text-[#2d6a4f] font-medium px-3 py-1.5 rounded-lg border border-[#52b788]/30 hover:bg-[#52b788]/5 transition-colors disabled:opacity-50"
                      >
                        <Check className="w-3.5 h-3.5" />
                        Lưu
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="flex items-center gap-1 text-xs text-zinc-400 hover:text-zinc-600 font-medium px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
                      >
                        <X className="w-3.5 h-3.5" />
                        Hủy
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => startEdit(inst)}
                      className="flex items-center gap-1 text-xs text-zinc-500 hover:text-[#0a1f14] font-medium px-3 py-1.5 rounded-lg border border-zinc-200 hover:bg-zinc-50 transition-colors"
                    >
                      <Pencil className="w-3.5 h-3.5" />
                      Sửa
                    </button>
                  )}
                  <button
                    onClick={() => setExpanded(isExpanded && !isEditing ? null : inst.id)}
                    className="text-zinc-400 hover:text-zinc-600 transition-colors"
                  >
                    {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="border-t border-zinc-50 px-5 py-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {([
                    ["Tiếng Anh", "englishName"],
                    ["Vùng miền", "region"],
                    ["Phân loại", "category"],
                    ["Chất liệu", "material"],
                    ["Tầm âm", "soundRange"],
                    ["Màu sắc (hex/gradient)", "color"],
                    ["URL ảnh", "imageUrl"],
                    ["YouTube URL", "youtubeUrl"],
                  ] as [string, keyof InstrumentAdmin][]).map(([label, key]) => (
                    <div key={key}>
                      <p className="text-xs text-zinc-400 mb-1">{label}</p>
                      {isEditing ? (
                        <input
                          className="text-sm border border-zinc-200 rounded-lg px-2 py-1 w-full"
                          value={(editData[key] as string) ?? ""}
                          onChange={(e) => setEditData((p) => ({ ...p, [key]: e.target.value }))}
                        />
                      ) : (
                        <p className="text-sm text-[#0a1f14] truncate">{(d[key] as string) || "—"}</p>
                      )}
                    </div>
                  ))}

                  <div className="md:col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">Mô tả ngắn</p>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        className="text-sm border border-zinc-200 rounded-lg px-2 py-1 w-full resize-none"
                        value={editData.shortDesc ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, shortDesc: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-[#0a1f14]">{d.shortDesc || "—"}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">Mô tả đầy đủ</p>
                    {isEditing ? (
                      <textarea
                        rows={3}
                        className="text-sm border border-zinc-200 rounded-lg px-2 py-1 w-full resize-none"
                        value={editData.description ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, description: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-[#0a1f14]">{d.description || "—"}</p>
                    )}
                  </div>

                  <div className="md:col-span-2">
                    <p className="text-xs text-zinc-400 mb-1">Nguồn gốc</p>
                    {isEditing ? (
                      <textarea
                        rows={2}
                        className="text-sm border border-zinc-200 rounded-lg px-2 py-1 w-full resize-none"
                        value={editData.origin ?? ""}
                        onChange={(e) => setEditData((p) => ({ ...p, origin: e.target.value }))}
                      />
                    ) : (
                      <p className="text-sm text-[#0a1f14]">{d.origin || "—"}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-zinc-400 mb-1">Độ khó (1-5)</p>
                    {isEditing ? (
                      <input
                        type="number" min={1} max={5}
                        className="text-sm border border-zinc-200 rounded-lg px-2 py-1 w-full"
                        value={editData.difficulty ?? 1}
                        onChange={(e) => setEditData((p) => ({ ...p, difficulty: Number(e.target.value) }))}
                      />
                    ) : (
                      <p className="text-sm text-[#0a1f14]">{d.difficulty}</p>
                    )}
                  </div>

                  <div>
                    <p className="text-xs text-zinc-400 mb-1">Độ phổ biến (1-100)</p>
                    {isEditing ? (
                      <input
                        type="number" min={1} max={100}
                        className="text-sm border border-zinc-200 rounded-lg px-2 py-1 w-full"
                        value={editData.popularity ?? 1}
                        onChange={(e) => setEditData((p) => ({ ...p, popularity: Number(e.target.value) }))}
                      />
                    ) : (
                      <p className="text-sm text-[#0a1f14]">{d.popularity}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
