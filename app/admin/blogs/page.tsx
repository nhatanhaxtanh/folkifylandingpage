"use client";

import { useEffect, useState } from "react";
import { Plus, Pencil, Trash2, X, Check, Newspaper, Eye, EyeOff } from "lucide-react";
import { toast } from "sonner";
import {
  fetchAdminBlogPosts, createBlogPost, updateBlogPost, deleteBlogPost,
  type BlogPostAdmin,
} from "@/lib/admin-api";

type FormData = Omit<BlogPostAdmin, "id" | "publishedAt" | "createdAt" | "updatedAt">;

const emptyForm = (): FormData => ({
  slug: "",
  title: "",
  summary: "",
  content: "",
  coverImageUrl: "",
  category: "",
  authorName: "",
  published: false,
});

function formatDate(iso: string | null) {
  if (!iso) return "—";
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
}

export default function BlogsPage() {
  const [posts, setPosts] = useState<BlogPostAdmin[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState<FormData>(emptyForm());
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"basic" | "content">("basic");

  useEffect(() => {
    fetchAdminBlogPosts()
      .then(setPosts)
      .catch(() => toast.error("Không thể tải danh sách bài viết"))
      .finally(() => setLoading(false));
  }, []);

  const openCreate = () => {
    setEditId(null);
    setForm(emptyForm());
    setActiveTab("basic");
    setShowForm(true);
  };

  const openEdit = (p: BlogPostAdmin) => {
    setEditId(p.id);
    setForm({
      slug: p.slug,
      title: p.title,
      summary: p.summary,
      content: p.content,
      coverImageUrl: p.coverImageUrl,
      category: p.category,
      authorName: p.authorName,
      published: p.published,
    });
    setActiveTab("basic");
    setShowForm(true);
  };

  const handleSave = async () => {
    if (!form.title || !form.slug) {
      toast.error("Vui lòng điền tiêu đề và slug");
      return;
    }
    setSaving(true);
    try {
      if (editId) {
        const updated = await updateBlogPost(editId, form);
        setPosts((prev) => prev.map((p) => (p.id === editId ? updated : p)));
        toast.success("Cập nhật bài viết thành công");
      } else {
        const created = await createBlogPost(form);
        setPosts((prev) => [created, ...prev]);
        toast.success("Tạo bài viết thành công");
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
      await deleteBlogPost(id);
      setPosts((prev) => prev.filter((p) => p.id !== id));
      toast.success("Xóa bài viết thành công");
    } catch (e: unknown) {
      toast.error(e instanceof Error ? e.message : "Lỗi xóa");
    } finally {
      setDeleteId(null);
    }
  };

  const field = (label: string, key: keyof FormData, placeholder?: string) => (
    <div key={key}>
      <label className="text-xs font-medium text-zinc-500 block mb-1">{label}</label>
      <input
        value={(form[key] as string) ?? ""}
        onChange={(e) => setForm((f) => ({ ...f, [key]: e.target.value }))}
        placeholder={placeholder}
        className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30"
      />
    </div>
  );

  if (loading) return <div className="text-zinc-400 text-sm">Đang tải...</div>;

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-xl font-bold text-[#0a1f14]">Blog</h1>
          <p className="text-zinc-400 text-sm mt-1">{posts.length} bài viết</p>
        </div>
        <button
          onClick={openCreate}
          className="flex items-center gap-2 text-sm font-medium text-white px-4 py-2 rounded-xl transition-colors"
          style={{ background: "linear-gradient(135deg,#52b788,#2d6a4f)" }}
        >
          <Plus className="w-4 h-4" />
          Thêm bài viết
        </button>
      </div>

      <div className="bg-white rounded-2xl border border-zinc-100 shadow-sm overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-zinc-50">
              <th className="text-left px-5 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Tiêu đề</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Danh mục</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Tác giả</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Trạng thái</th>
              <th className="text-left px-4 py-3 text-xs font-semibold text-zinc-400 uppercase tracking-wide">Ngày đăng</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-50">
            {posts.length === 0 && (
              <tr>
                <td colSpan={6} className="text-center text-zinc-400 text-sm py-10">Chưa có bài viết nào</td>
              </tr>
            )}
            {posts.map((p) => (
              <tr key={p.id} className="hover:bg-zinc-50/50">
                <td className="px-5 py-3">
                  <div className="flex items-center gap-2">
                    <Newspaper className="w-4 h-4 text-[#52b788] flex-shrink-0" strokeWidth={1.5} />
                    <div>
                      <p className="font-medium text-[#0a1f14] line-clamp-1">{p.title}</p>
                      <p className="text-xs text-zinc-400">{p.slug}</p>
                    </div>
                  </div>
                </td>
                <td className="px-4 py-3 text-zinc-600">{p.category || "—"}</td>
                <td className="px-4 py-3 text-zinc-600">{p.authorName || "—"}</td>
                <td className="px-4 py-3">
                  {p.published ? (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                      <Eye className="w-3 h-3" /> Đã đăng
                    </span>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs font-medium text-zinc-500 bg-zinc-100 px-2 py-0.5 rounded-full">
                      <EyeOff className="w-3 h-3" /> Nháp
                    </span>
                  )}
                </td>
                <td className="px-4 py-3 text-zinc-400 text-xs">{formatDate(p.publishedAt)}</td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2 justify-end">
                    <button onClick={() => openEdit(p)} className="text-zinc-400 hover:text-[#52b788] transition-colors">
                      <Pencil className="w-4 h-4" />
                    </button>
                    {deleteId === p.id ? (
                      <div className="flex items-center gap-1">
                        <button onClick={() => handleDelete(p.id)} className="text-xs text-red-500 hover:text-red-700 font-medium">Xóa</button>
                        <button onClick={() => setDeleteId(null)} className="text-xs text-zinc-400 hover:text-zinc-600">Hủy</button>
                      </div>
                    ) : (
                      <button onClick={() => setDeleteId(p.id)} className="text-zinc-400 hover:text-red-500 transition-colors">
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
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-100">
              <h2 className="font-semibold text-[#0a1f14]">{editId ? "Sửa bài viết" : "Thêm bài viết"}</h2>
              <button onClick={() => setShowForm(false)} className="text-zinc-400 hover:text-zinc-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex border-b border-zinc-100">
              {(["basic", "content"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm font-medium transition-colors border-b-2 -mb-px ${
                    activeTab === tab
                      ? "border-[#52b788] text-[#2d6a4f]"
                      : "border-transparent text-zinc-400 hover:text-zinc-600"
                  }`}
                >
                  {tab === "basic" ? "Thông tin cơ bản" : "Nội dung"}
                </button>
              ))}
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1">
              {activeTab === "basic" && (
                <>
                  {field("Tiêu đề *", "title", "Tiêu đề bài viết")}
                  {field("Slug *", "slug", "tieu-de-bai-viet")}
                  {field("Tóm tắt", "summary", "Mô tả ngắn về bài viết")}
                  {field("Ảnh bìa (URL)", "coverImageUrl", "https://...")}
                  {field("Danh mục", "category", "tips, news, tutorial...")}
                  {field("Tác giả", "authorName", "Tên tác giả")}
                  <div>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={form.published}
                        onChange={(e) => setForm((f) => ({ ...f, published: e.target.checked }))}
                        className="w-4 h-4 accent-[#52b788]"
                      />
                      <span className="text-sm text-zinc-700">Đăng công khai</span>
                    </label>
                  </div>
                </>
              )}

              {activeTab === "content" && (
                <div>
                  <label className="text-xs font-medium text-zinc-500 block mb-1">Nội dung bài viết</label>
                  <textarea
                    value={form.content ?? ""}
                    onChange={(e) => setForm((f) => ({ ...f, content: e.target.value }))}
                    rows={18}
                    placeholder="Viết nội dung bài viết ở đây..."
                    className="text-sm border border-zinc-200 rounded-xl px-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-[#52b788]/30 resize-none font-mono"
                  />
                </div>
              )}
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
