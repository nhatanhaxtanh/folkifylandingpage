"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { Calendar, User, Tag, ArrowLeft } from "lucide-react";
import Navbar from "@/components/Navbar";
import FooterColumn from "@/components/ui/footer-column";
import { fetchBlogPost, type BlogPost } from "@/lib/api";

function formatDate(iso: string | null) {
  if (!iso) return "";
  return new Date(iso).toLocaleDateString("vi-VN", { day: "2-digit", month: "long", year: "numeric" });
}

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    fetchBlogPost(slug)
      .then(setPost)
      .catch(() => setNotFound(true))
      .finally(() => setLoading(false));
  }, [slug]);

  return (
    <main className="min-h-screen bg-[#0a1f14]">
      <Navbar />

      <div className="max-w-3xl mx-auto px-6 pt-32 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm text-white/50 hover:text-white transition-colors mb-10"
        >
          <ArrowLeft className="w-4 h-4" />
          Quay lại Blog
        </Link>

        {loading && (
          <div className="space-y-4 animate-pulse">
            <div className="h-10 bg-white/10 rounded-xl w-3/4" />
            <div className="h-4 bg-white/5 rounded w-1/3" />
            <div className="h-64 bg-white/5 rounded-2xl mt-8" />
          </div>
        )}

        {!loading && notFound && (
          <div className="text-center py-20">
            <p className="text-white/50 text-lg mb-4">Không tìm thấy bài viết.</p>
            <Link href="/blog" className="text-[#52b788] hover:underline text-sm">
              Xem tất cả bài viết
            </Link>
          </div>
        )}

        {!loading && post && (
          <article>
            {/* Cover image */}
            {post.coverImageUrl && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={post.coverImageUrl}
                alt={post.title}
                className="w-full h-64 md:h-80 object-cover rounded-2xl mb-8"
              />
            )}

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-3 mb-4">
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

            {/* Title */}
            <h1 className="text-3xl md:text-4xl font-bold text-white leading-tight mb-4">
              {post.title}
            </h1>

            {/* Summary */}
            {post.summary && (
              <p className="text-white/60 text-lg border-l-2 border-[#52b788] pl-4 mb-10 italic">
                {post.summary}
              </p>
            )}

            {/* Content */}
            <div className="prose prose-invert prose-green max-w-none text-white/80 whitespace-pre-wrap leading-relaxed">
              {post.content}
            </div>
          </article>
        )}
      </div>

      <FooterColumn />
    </main>
  );
}
