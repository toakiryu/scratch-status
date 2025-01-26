"use client";

import { useTranslations } from "next-intl";
import { Avatar, CircularProgress } from "@heroui/react";

export default function StatusMonitorElementHeader({
  remaining,
  remainingTime,
}: {
  remaining: number;
  remainingTime: number;
}) {
  const t = useTranslations("statusMonitor");
  return (
    <header className="sticky top-0 z-50 flex items-center p-3 bg-white/50 dark:bg-neutral-950/50 border-b backdrop-blur-lg">
      <Avatar
        src="/wp-content/scratch.png"
        size="sm"
        className="bg-transparent"
      />
      <div className="flex justify-center items-center w-full">
        <h1 className="font-bold text-xl">{t("title")}</h1>
      </div>
      <CircularProgress
        aria-label="Loading..."
        color="warning"
        maxValue={remaining}
        minValue={0}
        value={remainingTime}
        className="hidden md:!flex"
      />
    </header>
  );
}
