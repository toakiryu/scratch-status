"use client";

import React, { useEffect, useState } from "react";
import { CircularProgress, Image } from "@heroui/react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import {
  ScratchAPIgetStatus,
  ScratchAPIgetStatusProps,
} from "./api/scratch/health";
import StatusMonitorElementHeader from "./header";

import lazyImport from "@/components/lazyImport";
const StatusMonitorElementContents = lazyImport(
  () => import("@/components/ui/statusMonitorElementContents")
);

export interface StatusMonitorElementProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const StatusMonitorElement = React.forwardRef<
  HTMLDivElement,
  StatusMonitorElementProps
>(({ className, ...props }, ref) => {
  const t = useTranslations("statusMonitor");
  const remaining = 10;
  const [status, setStatus] = useState<ScratchAPIgetStatusProps | undefined>(
    undefined
  );
  const [remainingTime, setRemainingTime] = useState<number>(remaining);
  const [isLoading, setIsLoading] = useState<"loading" | "success" | "error">(
    "loading"
  );

  // ステータスの取得関数
  const fetchStatus = async () => {
    try {
      const res = await ScratchAPIgetStatus();
      setStatus(res.data);
      setIsLoading("success");
    } catch (error) {
      console.error(t("errorFetchStatus"), error);
      setIsLoading("error");
    }
  };

  useEffect(() => {
    // 初回のデータ取得
    fetchStatus();

    // 残り時間のカウントダウン用インターバル
    const countdownInterval = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev <= 0) {
          return remaining; // remainingが1になるとリセットして再取得
        }
        return prev - 1;
      });
    }, 1000);

    // クリーンアップ
    return () => {
      clearInterval(countdownInterval);
    };
  }, [remaining]); // remainingが変更されるたびに更新

  // 残り時間が1になったらデータを再取得
  useEffect(() => {
    if (remainingTime === 0) {
      fetchStatus();
    }
  }, [remainingTime]);

  return (
    <div
      className={cn("relative w-full min-h-dvh", className)}
      ref={ref}
      {...props}
    >
      <div className="relative bg-yellow-500">
        <div className="container flex justify-center items-center max-w-4xl h-80">
          <Image
            alt="Scratch"
            src="/wp-content/scratch.png"
            width={150}
            loading="lazy"
          />
        </div>
      </div>
      <div className="relative container max-w-4xl min-h-dvh">
        <CircularProgress
          aria-label="Loading..."
          color="warning"
          maxValue={remaining}
          minValue={0}
          value={remainingTime}
          className="fixed z-50 md:!hidden bottom-3 left-3 rounded-full shadow shadow-orange-200"
        />
        <StatusMonitorElementHeader
          remaining={remaining}
          remainingTime={remainingTime}
        />
        <StatusMonitorElementContents status={status} isLoading={isLoading} />
      </div>
    </div>
  );
});

StatusMonitorElement.displayName = "StatusMonitorElement";

export default StatusMonitorElement;
