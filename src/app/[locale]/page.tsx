import { Suspense } from "react";
import { GiscusContent } from "@/components/giscus";

import lazyImport from "@/components/lazyImport";
const StatusMonitorElement = lazyImport(() => import("@/components/monitor"))
const Footer = lazyImport(() => import("@/components/footer"))

export default async function Home() {
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
