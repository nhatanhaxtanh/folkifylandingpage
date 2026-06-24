import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

export const metadata: Metadata = {
  title: "Folkify — Học nhạc cụ dân tộc Việt Nam",
  description:
    "Ứng dụng học đàn tranh, sáo trúc, đàn bầu và nhiều nhạc cụ truyền thống ngay trên điện thoại. Học theo từng bài, theo tốc độ của riêng bạn.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="vi"
      className={`${GeistSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
