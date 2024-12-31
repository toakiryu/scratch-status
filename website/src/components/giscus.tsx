"use client";

import Script from "next/script";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";

export function GiscusContent() {
  const lang = useLocale();
  const { theme, systemTheme } = useTheme();

  return (
    <Script
      src="https://giscus.app/client.js"
      data-repo="toakiryu/scratch-status"
      data-repo-id="R_kgDONgM9ug"
      data-mapping="number"
      data-category="General"
      data-category-id="DIC_kwDONeSy1M4ClTF4"
      data-strict="0"
      data-reactions-enabled="1"
      data-emit-metadata="0"
      data-input-position="bottom"
      data-theme={theme === "system" ? systemTheme : theme}
      data-lang={lang || "ja"}
      data-loading="lazy"
      crossOrigin="anonymous"
      data-term="5"
      async
    ></Script>
  );
}
