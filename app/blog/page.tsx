"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, Clock } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterColumn from "@/components/ui/footer-column";
import { fetchBlogPosts, type BlogPostSummary } from "@/lib/api";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("vi-VN", { day: "numeric", month: "long", year: "numeric" });
}

function readTime(summary: string) {
  const words = (summary ?? "").split(/\s+/).filter(Boolean).length;
  const mins = Math.max(1, Math.round(words / 200));
  return `${mins} phút`;
}

function BlogCard({ post }: { post: BlogPostSummary }) {
  return (
    <Link
      href={`/blog/${post.slug}`}
      className="group flex flex-col bg-white/5 hover:bg-white/[0.08] border border-white/10 hover:border-[#52b788]/40 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30"
    >
      {/* Cover image */}
      <div className="aspect-[16/9] overflow-hidden bg-white/5 flex-shrink-0">
        {post.coverImageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={post.coverImageUrl}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-[#52b788]/20 to-[#2d6a4f]/20 flex items-center justify-center">
            <span className="text-4xl opacity-30">🎵</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-5">
        {/* Category */}
        {post.category && (
          <span className="inline-block self-start text-xs font-semibold text-[#52b788] border border-[#52b788]/40 px-2.5 py-0.5 rounded-md mb-3 uppercase tracking-wide">
            {post.category}
          </span>
        )}

        {/* Title */}
        <h2 className="text-base font-bold text-white group-hover:text-[#95d5b2] transition-colors leading-snug mb-2 line-clamp-2">
          {post.title}
        </h2>

        {/* Summary */}
        {post.summary && (
          <p className="text-white/50 text-sm line-clamp-3 leading-relaxed mb-4 flex-1">
            {post.summary}
          </p>
        )}

        {/* Footer meta */}
        <div className="flex items-center gap-4 mt-auto pt-3 border-t border-white/10">
          {post.publishedAt && (
            <span className="flex items-center gap-1.5 text-xs text-white/40">
              <Calendar className="w-3.5 h-3.5" />
              {formatDate(post.publishedAt)}
            </span>
          )}
          <span className="flex items-center gap-1.5 text-xs text-white/40">
            <Clock className="w-3.5 h-3.5" />
            {readTime(post.summary)}
          </span>
        </div>
      </div>
    </Link>
  );
}

function SkeletonCard() {
  return (
    <div className="flex flex-col bg-white/5 rounded-2xl overflow-hidden animate-pulse">
      <div className="aspect-[16/9] bg-white/10" />
      <div className="p-5 space-y-3">
        <div className="h-4 bg-white/10 rounded w-1/4" />
        <div className="h-5 bg-white/10 rounded w-3/4" />
        <div className="h-4 bg-white/5 rounded w-full" />
        <div className="h-4 bg-white/5 rounded w-5/6" />
      </div>
    </div>
  );
}

export default function BlogPage() {
  const [posts, setPosts] = useState<BlogPostSummary[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    fetchBlogPosts()
      .then(setPosts)
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="min-h-screen bg-[#0a1f14]">
      <Navbar />

      {/* Header */}
      <section className="pt-32 pb-12 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-[#52b788] text-sm font-semibold uppercase tracking-widest mb-3">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Kiến thức âm nhạc dân tộc
          </h1>
          <p className="text-white/50 text-lg max-w-xl mx-auto">
            Khám phá các bài viết về nhạc cụ dân tộc Việt Nam, mẹo học nhạc và câu chuyện âm nhạc.
          </p>
        </div>
      </section>

      {/* Grid */}
      <section className="px-6 pb-24">
        <div className="max-w-6xl mx-auto">
          {loading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => <SkeletonCard key={i} />)}
            </div>
          )}

          {!loading && error && (
            <div className="text-center text-white/50 py-20">
              Không thể tải bài viết. Vui lòng thử lại sau.
            </div>
          )}

          {!loading && !error && posts.length === 0 && (
            <div className="text-center text-white/50 py-20">
              Chưa có bài viết nào được đăng.
            </div>
          )}

          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <BlogCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterColumn />
    </main>
  );
}
