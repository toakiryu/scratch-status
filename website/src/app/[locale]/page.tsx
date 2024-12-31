import Footer from "@/components/footer";
import { GiscusContent } from "@/components/giscus";
import { StatusMonitorElement } from "@/components/monitor";
import { getLocale } from "next-intl/server";
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
        <GiscusContent />
      </Suspense>
    </div>
  );
}
