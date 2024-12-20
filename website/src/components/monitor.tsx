"use client";

import React, {
  ChangeEvent,
  ReactNode,
  Suspense,
  useEffect,
  useState,
  useTransition,
} from "react";
import { cn } from "@/lib/utils";
import {
  ScratchAPIgetHealth,
  ScratchAPIgetHealthProps,
  ScratchAPIgetHealthSqlProps,
} from "./api/scratch/health";
import {
  Alert,
  Avatar,
  Chip,
  CircularProgress,
  Image,
  Select,
  SelectItem,
  Skeleton,
  Tooltip,
} from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import config from "../../richtpl.config";
import {
  CalendarSearch,
  CircleFadingArrowUp,
  CircleHelp,
  Database,
  DatabaseZap,
  Earth,
  GalleryHorizontalEnd,
  History,
  Loader,
  MonitorCog,
  Moon,
  PanelsTopLeft,
  Sun,
  User,
} from "lucide-react";
import { useParams } from "next/navigation";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

function StatusMonitorElementSkeletonContents({
  status,
  isLoading,
}: {
  status: ScratchAPIgetHealthProps | undefined;
  isLoading: boolean;
}) {
  function SkeletonContents() {
    return (
      <>
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </div>
        <hr className="my-5" />
        <div className="mt-4">
          <div className="grid grid-cols-1 md:!grid-cols-2 gap-2">
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
            <Skeleton className="rounded-lg">
              <div className="h-24 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </div>
        <hr className="my-5" />
        <div className="bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg mt-5 p-5">
          <div className="space-y-3">
            <Skeleton className="w-3/5 rounded-lg">
              <div className="h-3 w-3/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-4/5 rounded-lg">
              <div className="h-3 w-4/5 rounded-lg bg-default-200" />
            </Skeleton>
            <Skeleton className="w-2/5 rounded-lg">
              <div className="h-3 w-2/5 rounded-lg bg-default-300" />
            </Skeleton>
          </div>
        </div>
      </>
    );
  }
  if (isLoading) {
    return (
      <section id="components-container" className="sm:!px-5 my-10">
        <SkeletonContents />
      </section>
    );
  } else {
    if (!status) {
      return (
        <section id="components-container" className="relative sm:!px-5 my-10">
          <div className="absolute top-0 left-0 z-10 w-full h-full rounded-lg bg-neutral-500/10 backdrop-blur">
            <div className="flex justify-center items-center w-full h-full p-5">
              <Alert
                color="danger"
                title="ステータス情報を取得出来ませんでした。"
              />
            </div>
          </div>
          <SkeletonContents />
        </section>
      );
    }
  }
}

function ComponentContainer({ children }: { children: ReactNode }) {
  return (
    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
      {children}
    </div>
  );
}

function StatusMonitorElementHeader({
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

function StatusMonitorElementFooter() {
  const router = useRouter();
  const theme = useTheme();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const t = useTranslations("theme");
  const langT = useTranslations("languages");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (!isClient) return null;

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale;
    startTransition(() => {
      router.replace(
        // @ts-expect-error -- TypeScript will validate that only known `params`
        // are used in combination with a given `pathname`. Since the two will
        // always match for the current route, we can skip runtime checks.
        { pathname, params },
        { locale: nextLocale }
      );
    });
  }

  function getThemeIcon(theme: string) {
    if (theme === "system") return <MonitorCog className="w-5" />;
    if (theme === "dark") return <Moon className="w-5" />;
    return <Sun className="w-5" />;
  }

  return (
    <footer className="border-t py-5">
      <div className="flex justify-center items-center gap-5 max-w-xs mx-auto">
        <Select
          aria-label={t("Mode")}
          size="sm"
          selectedKeys={[theme.theme as string]}
          onChange={(e) => theme.setTheme(e.target.value)}
          className="w-28"
        >
          {theme.themes.map((theme) => {
            return (
              <SelectItem key={theme} startContent={getThemeIcon(theme)}>
                {t(theme.charAt(0).toUpperCase() + theme.slice(1))}
              </SelectItem>
            );
          })}
        </Select>
        <Select
          aria-label={langT("Language")}
          size="sm"
          startContent={<Earth className="w-5" />}
          selectedKeys={[locale || ""]}
          isLoading={isPending}
          onChange={(e) => {
            onSelectChange(e), returnTop();
          }}
          className="w-fit min-w-32 max-w-full"
        >
          {config.i18n.locales.map((lang) => {
            return (
              <SelectItem key={config.i18n.localeConfigs[lang].path}>
                {config.i18n.localeConfigs[lang].label}
              </SelectItem>
            );
          })}
        </Select>
      </div>
      <div className="p-3 text-center">
        <p className="opacity-50">Powered by Scratch API</p>
      </div>
    </footer>
  );
}

export interface StatusMonitorElementProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const StatusMonitorElement = React.forwardRef<
  HTMLDivElement,
  StatusMonitorElementProps
>(({ className, ...props }, ref) => {
  const t = useTranslations("statusMonitor");
  const format = useFormatter();
  const remaining = 10;
  const [status, setStatus] = useState<ScratchAPIgetHealthProps | undefined>(
    undefined
  );
  const [remainingTime, setRemainingTime] = useState<number>(remaining);
  const [isLoading, setIsLoading] = useState(true);

  // ステータスの取得関数
  const fetchStatus = async () => {
    try {
      setIsLoading(true);
      const res = await ScratchAPIgetHealth();
      setStatus(res.data);
    } catch (error) {
      console.error(t("errorFetchStatus"), error);
    } finally {
      setIsLoading(false);
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

  const renderSQLStatus = (sqlStatus: ScratchAPIgetHealthSqlProps) => {
    const { primary, replica } = sqlStatus;
    return (
      <div className="mt-2">
        <h3 className="flex items-center text-lg opacity-90">
          {t("sql.primary")}
          <Tooltip showArrow content={t("sql.primary-help")}>
            <CircleHelp className="w-4 ml-2 opacity-50" />
          </Tooltip>
        </h3>
        <div>
          <div className="flex items-center mt-1">
            <h2 className="mr-2 opacity-70">{t("sql.ssl")}:</h2>
            <span>
              {primary.ssl ? (
                <Chip color="success" size="sm" variant="flat">
                  {t("enabled")}
                </Chip>
              ) : (
                <Chip color="danger" size="sm" variant="flat">
                  {t("disabled")}
                </Chip>
              )}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <h2 className="mr-2 opacity-70">{t("sql.destroyed")}:</h2>
            <span>
              {primary.destroyed ? (
                <Chip color="danger" size="sm" variant="flat">
                  {t("yes")}
                </Chip>
              ) : (
                <Chip color="success" size="sm" variant="flat">
                  {t("no")}
                </Chip>
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center mt-1">
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.min")}:</h2>
              <span>{primary.min}</span>
            </div>
            <span className="mx-2">/</span>
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.max")}:</h2>
              <span>{primary.max}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-1">
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.used")}:</h2>
              <span>{primary.numUsed}</span>
            </div>
            <span className="mx-2">/</span>
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.free")}:</h2>
              <span>{primary.numFree}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-1">
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.pendingAcquires")}:</h2>
              <span>{primary.pendingAcquires}</span>
            </div>
            <span className="mx-2">/</span>
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.pendingCreates")}:</h2>
              <span>{primary.pendingAcquires}</span>
            </div>
          </div>
        </div>
        <h3 className="flex items-center text-lg opacity-90 mt-2">
          {t("sql.replica")}
          <Tooltip showArrow content={t("sql.replica-help")}>
            <CircleHelp className="w-4 ml-2 opacity-50" />
          </Tooltip>
        </h3>
        <div>
          <div className="flex items-center mt-1">
            <h2 className="mr-2 opacity-70">{t("sql.ssl")}:</h2>
            <span>
              {replica.ssl ? (
                <Chip color="success" size="sm" variant="flat">
                  {t("enabled")}
                </Chip>
              ) : (
                <Chip color="danger" size="sm" variant="flat">
                  {t("disabled")}
                </Chip>
              )}
            </span>
          </div>
          <div className="flex items-center mt-1">
            <h2 className="mr-2 opacity-70">{t("sql.destroyed")}:</h2>
            <span>
              {replica.destroyed ? (
                <Chip color="danger" size="sm" variant="flat">
                  {t("yes")}
                </Chip>
              ) : (
                <Chip color="success" size="sm" variant="flat">
                  {t("no")}
                </Chip>
              )}
            </span>
          </div>
          <div className="flex flex-wrap items-center mt-1">
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.min")}:</h2>
              <span>{replica.min}</span>
            </div>
            <span className="mx-2">/</span>
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.max")}:</h2>
              <span>{replica.max}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-1">
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.used")}:</h2>
              <span>{replica.numUsed}</span>
            </div>
            <span className="mx-2">/</span>
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.free")}:</h2>
              <span>{replica.numFree}</span>
            </div>
          </div>
          <div className="flex flex-wrap items-center mt-1">
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.pendingAcquires")}:</h2>
              <span>{replica.pendingAcquires}</span>
            </div>
            <span className="mx-2">/</span>
            <div className="flex">
              <h2 className="mr-2 opacity-70">{t("sql.pendingCreates")}:</h2>
              <span>{replica.pendingAcquires}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div
      className={cn("relative w-full min-h-dvh", className)}
      ref={ref}
      {...props}
    >
      <div className="relative bg-yellow-500">
        <div className="container flex justify-center items-center max-w-4xl h-80">
          <Image alt="Scratch" src="/wp-content/scratch.png" width={150} />
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
        <div className="sm:!px-5 mt-24">
          <Alert color={`success`} title={`All Systems Operational`} />
        </div>
        {status ? (
          <section id="components-container" className="sm:!px-5 my-10">
            <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg p-5">
              <h2 className="font-bold text-xl">{t("systemStatus.title")}</h2>
              <div className="flex flex-col">
                <div className="mt-2">
                  <h3 className="flex items-center text-lg">
                    <History className="w-4 mr-1" />
                    {t("systemStatus.versionTitle")}
                  </h3>
                  <p className="text-sm opacity-70 overflow-auto mt-1">
                    {status.version}
                  </p>
                </div>
                <div className="mt-2">
                  <h3 className="flex items-center text-lg">
                    <CircleFadingArrowUp className="w-4 mr-1" />
                    {t("systemStatus.uptimeTitle")}
                  </h3>
                  <p className="text-sm opacity-70 overflow-auto mt-1">
                    {status.uptime}
                  </p>
                </div>
                <div className="mt-2">
                  <h3 className="flex items-center text-lg">
                    <Loader className="w-4 mr-1" />
                    {t("systemStatus.loadTitle")}
                  </h3>
                  <p className="text-sm opacity-70 overflow-auto mt-1">
                    {status.load.join(" / ")}
                  </p>
                </div>
                <div className="mt-2">
                  <h3 className="flex items-center text-lg">
                    <CalendarSearch className="w-4 mr-1" />
                    {t("systemStatus.timestampTitle")}
                  </h3>
                  <p className="text-sm opacity-70 overflow-auto mt-1">
                    {format.dateTime(new Date(status.timestamp), {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "numeric",
                      minute: "numeric",
                      second: "numeric",
                    })}
                  </p>
                </div>
              </div>
            </div>
            <hr className="my-5" />
            <div className="mt-4">
              <h1 className="font-bold text-xl mb-3">{t("sqlStatus.title")}</h1>
              <div className="grid grid-cols-1 md:!grid-cols-2 gap-2">
                <ComponentContainer>
                  <h2 className="flex items-center text-lg sm:!text-xl">
                    <Database className="mr-2" />
                    {t("sqlStatus.main")}
                  </h2>
                  {renderSQLStatus(status.sql.main)}
                </ComponentContainer>
                <ComponentContainer>
                  <h2 className="flex items-center text-lg sm:!text-xl">
                    <PanelsTopLeft className="mr-2" />
                    {t("sqlStatus.projectComments")}
                  </h2>
                  {renderSQLStatus(status.sql.project_comments)}
                </ComponentContainer>
                <ComponentContainer>
                  <h2 className="flex items-center text-lg sm:!text-xl">
                    <GalleryHorizontalEnd className="mr-2" />
                    {t("sqlStatus.galleryComments")}
                  </h2>
                  {renderSQLStatus(status.sql.gallery_comments)}
                </ComponentContainer>
                <ComponentContainer>
                  <h2 className="flex items-center text-lg sm:!text-xl">
                    <User className="mr-2" />
                    {t("sqlStatus.userProfileComments")}
                  </h2>
                  {renderSQLStatus(status.sql.userprofile_comments)}
                </ComponentContainer>
              </div>
            </div>
            <hr className="my-5" />
            <div className="bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg mt-5 p-5">
              <h3 className="flex items-center font-bold text-lg">
                <DatabaseZap className="w-5 mr-2" />
                {t("cacheStatus.title")}
              </h3>
              <div className="flex items-center mt-2">
                <h2 className="mr-2 opacity-70">
                  {t("cacheStatus.connected")}:
                </h2>
                <span>
                  {status.cache.connected ? (
                    <Chip color="success" size="sm" variant="flat">
                      {t("yes")}
                    </Chip>
                  ) : (
                    <Chip color="danger" size="sm" variant="flat">
                      {t("no")}
                    </Chip>
                  )}
                </span>
              </div>
              <div className="flex items-center">
                <h2 className="mr-2 opacity-70">{t("cacheStatus.ready")}:</h2>
                <span>
                  {status.cache.ready ? (
                    <Chip color="success" size="sm" variant="flat">
                      {t("yes")}
                    </Chip>
                  ) : (
                    <Chip color="danger" size="sm" variant="flat">
                      {t("no")}
                    </Chip>
                  )}
                </span>
              </div>
            </div>
          </section>
        ) : (
          <StatusMonitorElementSkeletonContents
            status={status}
            isLoading={isLoading}
          />
        )}
        <Suspense>
          <StatusMonitorElementFooter />
        </Suspense>
      </div>
    </div>
  );
});

StatusMonitorElement.displayName = "StatusMonitorElement";

export { StatusMonitorElement };
