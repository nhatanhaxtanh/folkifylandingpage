"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, FileMusic, Lock } from "lucide-react";
import { toast } from "sonner";
import {
  fetchAdminInstruments, fetchAdminSheets, createSheet, updateSheet, deleteSheet,
  type InstrumentAdmin, type SheetMusicAdmin,
} from "@/lib/admin-api";

const DIFFICULTIES = ["Dễ", "Trung bình", "Khó", "Nâng cao"];

const emptySheet = (): Omit<SheetMusicAdmin, "id" | "instrumentName"> => ({
  title: "",
  author: "",
  genre: "",
  difficulty: "Dễ",
  pages: 1,
  isPremium: false,
  fileUrl: "",
  description: "",
  instrumentId: null,
});

export default function SheetsPage() {
  const [instruments, setInstruments] = useState<InstrumentAdmin[]>([]);
  const [sheets, setSheets] = useState<SheetMusicAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterInstrument, setFilterInstrument] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySheet());
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchAdminInstruments(), fetchAdminSheets()])
      .then(([insts, shs]) => {
        setInstruments(insts);
        setSheets(shs);
      })
      .catch(() => toast.error("Không thể tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterInstrument
    ? sheets.filter((s) => s.instrumentId === filterInstrument)
    : sheets;

  const openCreate = () => {
    setEditId(null);
    setForm(emptySheet());
    setShowForm(true);
  };

  const openEdit = (s: SheetMusicAdmin) => {
    setEditId(s.id);
    setForm({
      title: s.title, author: s.author, genre: s.genre, difficulty: s.difficulty,
      pages: s.pages, isPremium: s.isPremium, fileUrl: s.fileUrl, description: s.description,
      instrumentId: s.instrumentId,
    });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title) {
      toast.error("Vui lòng nhập tên sheet nhạc");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        const updated = await updateSheet(editId, form);
        setSheets((prev) => prev.map((s) => (s.id === editId ? updated : s)));
        toast.success("Cập nhật sheet nhạc thành công");
      } else {
        const created = await createSheet(form);
        setSheets((prev) => [created, ...prev]);
        toast.success("Tạo sheet nhạc thành công");
      }
      setShowForm(false);
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Lỗi lưu dữ liệu");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await deleteSheet(id);
      setSheets((prev) => prev.filter((s) => s.id !== id));
      toast.success("Xóa sheet nhạc thành công");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Lỗi xóa");
    } finally {
      setDeleteId(null);
    }
  };

  if (loading) return <div className="text-zinc-400 text-sm">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0a1f14]">Sheet nhạc</h1>
          <p className="text-zinc-400 text-sm mt-1">{sheets.length} sheet nhạc</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl transition-colors"
          style={{ background: "linear-gradient(135deg,#52b788,#2d6a4f)" }}
        >
          <Plus className="w-4 h-4" />
          Thêm sheet nhạc
        </button>
      </div>

      <div className="mb-4">
        <select
          value={filterInstrument}
          onChange={(e) => setFilterInstrument(e.target.value)}
          className="text-sm border border-zinc-200 rounded-xl px-3 py-2 bg-white text-[#0a1f14] focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
        >
          <option value="">Tất cả nhạc cụ</option>
          {instruments.map((i) => (
            <option key={i.id} value={i.id}>{i.name}</option>
          ))}
        </select>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Tên sheet</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Nhạc cụ</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Tác giả</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Độ khó</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Trang</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Premium</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center text-zinc-400 text-sm py-10">Chưa có sheet nhạc nào</td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <FileMusic className="w-4 h-4 text-[#52b788] flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="font-medium text-[#0a1f14]">{s.title}</p>
                      {s.genre && <p className="text-xs text-zinc-400">{s.genre}</p>}
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-600">{s.instrumentName || "—"}</td>
                <td className="px-4 py-3 text-zinc-600">{s.author || "—"}</td>
                <td className="px-4 py-3">
                  {s.difficulty ? (
                    <span className="text-xs bg-zinc-100 text-zinc-600 px-2 py-0.5 rounded-full">{s.difficulty}</span>
                  ) : "—"}
                </td>
                <td className="px-4 py-3 text-zinc-600">{s.pages}</td>
                <td className="px-4 py-3">
                  {s.isPremium ? (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Lock className="w-3.5 h-3.5" />
                      <span className="text-xs font-medium">Premium</span>
                    </div>
                  ) : (
                    <span className="text-xs text-zinc-400">Miễn phí</span>
                  )}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(s)} className="text-zinc-400 hover:text-[#52b788] transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteId === s.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(s.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Xóa</button>
                        <button onClick={() => setDeleteId(null)} className="text-xs text-zinc-400">Hủy</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteId(s.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-[#0a1f14]">{editId ? "Sửa sheet nhạc" : "Thêm sheet nhạc"}</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1">Nhạc cụ</label>
                <select
                  value={form.instrumentId ?? ""}
                  onChange={(e) => setForm((f) => ({ ...f, instrumentId: e.target.value || null }))}
                  className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                >
                  <option value="">Không chọn</option>
                  {instruments.map((i) => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>

              {[
                ["Tên sheet nhạc *", "title"],
                ["Tác giả", "author"],
                ["Thể loại", "genre"],
                ["URL file (PDF/ảnh)", "fileUrl"],
              ].map(([label, key]) => (
                <div key={key}>
                  <label className="text-xs font-medium text-zinc-500 block mb-1">{label}</label>
                  <input
                    value={(form[key as keyof typeof form] as string) ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
                    className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                  />
                </div>
              ))}

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-medium text-zinc-500 block mb-1">Độ khó</label>
                  <select
                    value={form.difficulty}
                    onChange={(e) => setForm((f) => ({ ...f, difficulty: e.target.value }))}
                    className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                  >
                    {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-medium text-zinc-500 block mb-1">Số trang</label>
                  <input
                    type="number" min={1}
                    value={form.pages}
                    onChange={(e) => setForm((f) => ({ ...f, pages: Number(e.target.value) }))}
                    className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1">Mô tả</label>
                <textarea
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                  className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full resize-none focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                />
              </div>

              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={form.isPremium}
                  onChange={(e) => setForm((f) => ({ ...f, isPremium: e.target.checked }))}
                  className="w-4 h-4 rounded accent-[#52b788]"
                />
                <span className="text-sm text-[#0a1f14]">Chỉ dành cho gói Premium</span>
              </label>
            </div>
            <div className="px-6 py-4 border-t border-zinc-100 flex justify-end gap-3">
              <button onClick={() => setShowForm(false)} className="text-sm text-zinc-500 px-4 py-2 rounded-xl border border-zinc-200 hover:bg-zinc-50 transition-colors">Hủy</button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl disabled:opacity-50"
                style={{ background: "linear-gradient(135deg,#52b788,#2d6a4f)" }}
              >
                <Check className="w-4 h-4" />
                {saving ? "Đang lưu..." : editId ? "Cập nhật" : "Tạo mới"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
