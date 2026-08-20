import { sendGAEvent } from "@next/third-parties/google";

/**
 * Nơi đặt nút dẫn sang App Store — gửi kèm event để GA4 tách được
 * CTA nào đang thực sự ra click.
 */
export type AppStoreCtaLocation = "cta_section" | "footer";

/**
 * Click vào CTA tải app trên App Store.
 *
 * Event name `app_store_cta_click` là custom event, cần đăng ký thành
 * Custom dimension trong GA4 (Admin → Custom definitions) nếu muốn lọc
 * theo `location` trong báo cáo.
 */
export function trackAppStoreCtaClick(location: AppStoreCtaLocation) {
  sendGAEvent("event", "app_store_cta_click", { location });
}
