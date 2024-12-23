import Footer from "@/components/footer";
import { StatusMonitorElement } from "@/components/monitor";
import { getLocale } from "next-intl/server";
import Script from "next/script";
import { Suspense } from "react";

export default async function Home() {
  const lang = await getLocale();

  return (
    <div className="flex flex-col justify-center items-center w-full h-full min-h-dvh">
      <Suspense>
        <StatusMonitorElement />
      </Suspense>
      <Suspense>
        <Footer />
      </Suspense>
      <Suspense>
        <Script
          src="https://giscus.app/client.js"
          data-repo="toakiryu/gform-quick-submit"
          data-repo-id="R_kgDONeSy1A"
          data-category="General"
          data-category-id="DIC_kwDONeSy1M4ClTF4"
          data-mapping="url"
          data-strict="0"
          data-reactions-enabled="1"
          data-emit-metadata="0"
          data-input-position="bottom"
          data-theme="dark"
          data-lang={lang || "ja"}
          data-loading="lazy"
          crossOrigin="anonymous"
          async
        ></Script>
      </Suspense>
    </div>
  );
}
