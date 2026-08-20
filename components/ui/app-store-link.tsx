"use client";

import type { ReactNode } from "react";
import { trackAppStoreCtaClick } from "@/lib/analytics";

/**
 * Link App Store trong footer. Tách riêng thành client component để phần
 * còn lại của footer vẫn render phía server — chỉ mỗi onClick cần client.
 */
export default function AppStoreLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <a href={href} className={className} onClick={() => trackAppStoreCtaClick("footer")}>
      {children}
    </a>
  );
}
