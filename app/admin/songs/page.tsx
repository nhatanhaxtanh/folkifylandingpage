"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Music2 } from "lucide-react";
import { toast } from "sonner";
import {
  fetchAdminInstruments, fetchAdminSongs, createSong, updateSong, deleteSong,
  type InstrumentAdmin, type SongAdmin,
} from "@/lib/admin-api";

const emptySong = (): Omit<SongAdmin, "id" | "instrumentName"> => ({
  instrumentId: "",
  title: "",
  artist: "",
  duration: "",
  orderIndex: 0,
});

export default function SongsPage() {
  const [instruments, setInstruments] = useState<InstrumentAdmin[]>([]);
  const [songs, setSongs] = useState<SongAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterInstrument, setFilterInstrument] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptySong());
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  useEffect(() => {
    Promise.all([fetchAdminInstruments(), fetchAdminSongs()])
      .then(([insts, sgs]) => {
        setInstruments(insts);
        setSongs(sgs);
        if (insts.length) setForm((f) => ({ ...f, instrumentId: insts[0].id }));
      })
      .catch(() => toast.error("Không thể tải dữ liệu"))
      .finally(() => setLoading(false));
  }, []);

  const filtered = filterInstrument
    ? songs.filter((s) => s.instrumentId === filterInstrument)
    : songs;

  const openCreate = () => {
    setEditId(null);
    setForm({ ...emptySong(), instrumentId: instruments[0]?.id ?? "" });
    setShowForm(true);
  };

  const openEdit = (s: SongAdmin) => {
    setEditId(s.id);
    setForm({ instrumentId: s.instrumentId, title: s.title, artist: s.artist, duration: s.duration, orderIndex: s.orderIndex });
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.instrumentId) {
      toast.error("Vui lòng điền tên bài hát và chọn nhạc cụ");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        const updated = await updateSong(editId, form);
        setSongs((prev) => prev.map((s) => (s.id === editId ? updated : s)));
        toast.success("Cập nhật bài hát thành công");
      } else {
        const created = await createSong(form);
        setSongs((prev) => [...prev, created]);
        toast.success("Tạo bài hát thành công");
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
      await deleteSong(id);
      setSongs((prev) => prev.filter((s) => s.id !== id));
      toast.success("Xóa bài hát thành công");
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
          <h1 className="text-xl font-bold text-[#0a1f14]">Bài hát</h1>
          <p className="text-zinc-400 text-sm mt-1">{songs.length} bài hát</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl transition-colors"
          style={{ background: "linear-gradient(135deg,#52b788,#2d6a4f)" }}
        >
          <Plus className="w-4 h-4" />
          Thêm bài hát
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
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Tên bài hát</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Nhạc cụ</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Nghệ sĩ</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Thời lượng</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Thứ tự</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-zinc-400 text-sm py-10">Chưa có bài hát nào</td>
              </tr>
            )}
            {filtered.map((s) => (
              <tr key={s.id} className="hover:bg-zinc-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Music2 className="w-4 h-4 text-[#52b788] flex-shrink-0" strokeWidth={1.5} />
                    <span className="font-medium text-[#0a1f14]">{s.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-600">{s.instrumentName}</td>
                <td className="px-4 py-3 text-zinc-600">{s.artist || "—"}</td>
                <td className="px-4 py-3 text-zinc-600">{s.duration || "—"}</td>
                <td className="px-4 py-3 text-zinc-400">{s.orderIndex}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(s)} className="text-zinc-400 hover:text-[#52b788] transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteId === s.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(s.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Xóa</button>
                        <button onClick={() => setDeleteId(null)} className="text-xs text-zinc-400 hover:text-zinc-600">Hủy</button>
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-[#0a1f14]">{editId ? "Sửa bài hát" : "Thêm bài hát"}</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1">Nhạc cụ *</label>
                <select
                  value={form.instrumentId}
                  onChange={(e) => setForm((f) => ({ ...f, instrumentId: e.target.value }))}
                  className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                >
                  {instruments.map((i) => (
                    <option key={i.id} value={i.id}>{i.name}</option>
                  ))}
                </select>
              </div>
              {[
                ["Tên bài hát *", "title"],
                ["Nghệ sĩ", "artist"],
                ["Thời lượng (vd: 3:45)", "duration"],
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
              <div>
                <label className="text-xs font-medium text-zinc-500 block mb-1">Thứ tự</label>
                <input
                  type="number" min={0}
                  value={form.orderIndex}
                  onChange={(e) => setForm((f) => ({ ...f, orderIndex: Number(e.target.value) }))}
                  className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
                />
              </div>
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
