"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Calendar, User, Tag, ArrowRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterColumn from "@/components/ui/footer-column";
import { fetchBlogPosts, type BlogPostSummary } from "@/lib/api";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
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
      <section className="pt-32 pb-16 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-[#52b788] text-sm font-semibold uppercase tracking-widest mb-4">Blog</p>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 leading-tight">
            Kiến thức âm nhạc dân tộc
          </h1>
          <p className="text-white/60 text-lg max-w-xl mx-auto">
            Khám phá các bài viết về nhạc cụ dân tộc Việt Nam, mẹo học nhạc và câu chuyện âm nhạc.
          </p>
        </div>
      </section>

      {/* Posts */}
      <section className="px-6 pb-24">
        <div className="max-w-4xl mx-auto">
          {loading && (
            <div className="grid gap-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="bg-white/5 rounded-2xl h-48 animate-pulse" />
              ))}
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
            <div className="grid gap-6">
              {posts.map((post) => (
                <Link
                  key={post.id}
                  href={`/blog/${post.slug}`}
                  className="group block bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#52b788]/40 rounded-2xl overflow-hidden transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row">
                    {post.coverImageUrl && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.coverImageUrl}
                        alt={post.title}
                        className="w-full md:w-56 h-48 md:h-auto object-cover flex-shrink-0"
                      />
                    )}
                    <div className="p-6 flex flex-col justify-between flex-1">
                      <div>
                        <div className="flex flex-wrap items-center gap-3 mb-3">
                          {post.category && (
                            <span className="inline-flex items-center gap-1 text-xs font-medium text-[#52b788] bg-[#52b788]/10 px-2.5 py-0.5 rounded-full">
                              <Tag className="w-3 h-3" />
                              {post.category}
                            </span>
                          )}
                          {post.publishedAt && (
                            <span className="inline-flex items-center gap-1 text-xs text-white/40">
                              <Calendar className="w-3 h-3" />
                              {formatDate(post.publishedAt)}
                            </span>
                          )}
                          {post.authorName && (
                            <span className="inline-flex items-center gap-1 text-xs text-white/40">
                              <User className="w-3 h-3" />
                              {post.authorName}
                            </span>
                          )}
                        </div>
                        <h2 className="text-xl font-bold text-white group-hover:text-[#95d5b2] transition-colors mb-2 leading-snug">
                          {post.title}
                        </h2>
                        {post.summary && (
                          <p className="text-white/60 text-sm line-clamp-2">{post.summary}</p>
                        )}
                      </div>
                      <div className="flex items-center gap-1 mt-4 text-[#52b788] text-sm font-medium group-hover:gap-2 transition-all">
                        Đọc tiếp <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <FooterColumn />
    </main>
  );
}
