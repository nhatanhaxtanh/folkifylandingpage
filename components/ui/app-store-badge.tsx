"use client";

import { cn } from "@/lib/utils";
import { trackAppStoreCtaClick, type AppStoreCtaLocation } from "@/lib/analytics";

/**
 * Link tải app trên App Store. Đổi ở đây là đổi mọi nút badge trên landing page.
 * TODO: thay bằng URL thật của app sau khi được duyệt lên App Store.
 */
export const APP_STORE_URL = "https://apps.apple.com";

/**
 * Badge "Download on the App Store". Mọi lần dùng đều tự bắn event GA4,
 * `location` để phân biệt nút nào trong báo cáo.
 */
export default function AppStoreBadge({
  location,
  className,
}: {
  location: AppStoreCtaLocation;
  className?: string;
}) {
  return (
    <a
      href={APP_STORE_URL}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackAppStoreCtaClick(location)}
      className={cn(
        // justify-center để khi nút bị kéo full width trên mobile thì nội dung
        // vẫn canh giữa như các nút bên cạnh.
        "flex items-center justify-center gap-3 bg-black hover:bg-zinc-900 text-white rounded-2xl px-5 h-14 transition-colors border border-white/10",
        className,
      )}
    >
      <svg
        viewBox="0 0 24 24"
        className="w-7 h-7 fill-white flex-shrink-0"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.8-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
      </svg>
      <div className="text-left">
        <p className="text-white/50 text-[10px] leading-none mb-0.5">Download on the</p>
        <p className="text-white font-semibold text-base leading-none">App Store</p>
      </div>
    </a>
  );
}
