"use client";

import { ReactNode } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Alert, Chip, Skeleton, Tooltip } from "@heroui/react";
import {
  ScratchAPIgetHealthSqlProps,
  ScratchAPIgetStatusProps,
} from "../api/scratch/health";
import {
  CalendarSearch,
  CircleFadingArrowUp,
  CircleHelp,
  Database,
  DatabaseZap,
  GalleryHorizontalEnd,
  History,
  Loader,
  PanelsTopLeft,
  User,
} from "lucide-react";
import config from "../../../richtpl.config";
import StatusCards from "./statusCards";

function ComponentContainer({ children }: { children: ReactNode }) {
  return (
    <div className="p-5 bg-neutral-50 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-lg">
      {children}
    </div>
  );
}

export default function StatusMonitorElementContents({
  status,
  isLoading,
}: {
  status: ScratchAPIgetStatusProps | undefined;
  isLoading: boolean;
}) {
  const lang = useLocale();
  const t = useTranslations("statusMonitor");

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

  if (status) {
    const renderSQLStatus = (sqlStatus: ScratchAPIgetHealthSqlProps) => {
      const { primary, replica } = sqlStatus;
      return (
        <div className="mt-2">
          <h3 className="flex items-center text-lg">
            {t("sql.primary")}
            <Tooltip showArrow content={t("sql.primary-help")}>
              <CircleHelp className="w-4 ml-2 opacity-50" />
            </Tooltip>
          </h3>
          <section className="flex flex-col divide-y">
            <div className="flex flex-wrap items-center py-2">
              <h2 className="mr-2 opacity-85">{t("sql.ssl")}:</h2>
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
            <div className="flex flex-wrap items-center py-2">
              <h2 className="mr-2 opacity-85">{t("sql.destroyed")}:</h2>
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
            <div className="py-2">
              <h3 className="opacity-85">{t("sql.connections")}:</h3>
              <div className="flex items-center mt-1 overflow-auto">
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
              <div className="flex items-center mt-1 overflow-auto">
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
              <div className="flex items-center mt-1 overflow-auto">
                <div className="flex">
                  <h2 className="mr-2 opacity-70">{t("sql.acquires")}:</h2>
                  <span>{primary.pendingAcquires}</span>
                </div>
                <span className="mx-2">/</span>
                <div className="flex">
                  <h2 className="mr-2 opacity-70">{t("sql.creates")}:</h2>
                  <span>{primary.pendingAcquires}</span>
                </div>
              </div>
            </div>
          </section>
          <h3 className="flex items-center text-lg mt-2">
            {t("sql.replica")}
            <Tooltip showArrow content={t("sql.replica-help")}>
              <CircleHelp className="w-4 ml-2 opacity-50" />
            </Tooltip>
          </h3>
          <section className="flex flex-col divide-y">
            <div className="flex flex-wrap items-center py-2">
              <h2 className="mr-2 opacity-85">{t("sql.ssl")}:</h2>
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
            <div className="flex flex-wrap items-center py-2">
              <h2 className="mr-2 opacity-85">{t("sql.destroyed")}:</h2>
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
            <div className="py-2">
              <h3 className="opacity-85">{t("sql.connections")}:</h3>
              <div className="flex items-center mt-1 overflow-auto">
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
              <div className="flex items-center mt-1 overflow-auto">
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
              <div className="flex items-center mt-1 overflow-auto">
                <div className="flex">
                  <h2 className="mr-2 opacity-70">{t("sql.acquires")}:</h2>
                  <span>{replica.pendingAcquires}</span>
                </div>
                <span className="mx-2">/</span>
                <div className="flex">
                  <h2 className="mr-2 opacity-70">{t("sql.creates")}:</h2>
                  <span>{replica.pendingAcquires}</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      );
    };

    return (
      <section id="components-container" className="sm:!px-5 my-10">
        <div>
          <StatusCards
            statusList={[
              {
                title: t("statusCards.website.title"),
                descriptions: {
                  success: t("statusCards.website.success"),
                  danger: t("statusCards.website.danger"),
                },
                status: status.website,
              },
              {
                title: t("statusCards.search.title"),
                descriptions: {
                  success: t("statusCards.search.success"),
                  danger: t("statusCards.search.danger"),
                },
                status: status.search,
              },
              {
                title: t("statusCards.database.title"),
                descriptions: {
                  success: t("statusCards.database.success"),
                  danger: t("statusCards.database.danger"),
                },
                status: status.database,
              },
            ]}
          />
        </div>
        <hr className="my-5" />
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
              <h3 className="flex flex-wrap items-center text-lg">
                <CircleFadingArrowUp className="w-4 mr-1" />
                {t("systemStatus.uptimeTitle")}
                <Tooltip showArrow content={t("systemStatus.uptimeTitle-help")}>
                  <CircleHelp className="w-4 ml-2 opacity-50" />
                </Tooltip>
              </h3>
              <p className="text-sm opacity-70 overflow-auto mt-1">
                {status.uptime}
              </p>
            </div>
            <div className="mt-2">
              <h3 className="flex flex-wrap items-center text-lg">
                <Loader className="w-4 mr-1" />
                {t("systemStatus.loadTitle")}
                <Tooltip showArrow content={t("systemStatus.loadTitle-help")}>
                  <CircleHelp className="w-4 ml-2 opacity-50" />
                </Tooltip>
              </h3>
              <p className="text-sm opacity-70 overflow-auto mt-1">
                {status.load && Array.isArray(status.load)
                  ? status.load.join(" / ")
                  : "N/A"}
              </p>
            </div>
            <div className="mt-2">
              <h3 className="flex flex-wrap items-center text-lg">
                <CalendarSearch className="w-4 mr-1" />
                {t("systemStatus.timestampTitle")}
                <Tooltip
                  showArrow
                  content={t("systemStatus.timestampTitle-help")}
                >
                  <CircleHelp className="w-4 ml-2 opacity-50" />
                </Tooltip>
              </h3>
              <p className="text-sm opacity-70 overflow-auto mt-1">
                {new Intl.DateTimeFormat(
                  config.i18n.localeConfigs[lang].htmlLang,
                  {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    second: "numeric",
                    timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
                  }
                ).format(new Date(status.timestamp))}
              </p>
            </div>
          </div>
        </div>
        <hr className="my-5" />
        <div className="mt-4">
          <h1 className="font-bold text-xl mb-3">{t("sqlStatus.title")}</h1>
          <div className="grid grid-cols-1 md:!grid-cols-2 gap-2">
            <ComponentContainer>
              <h2 className="flex flex-wrap items-center font-bold text-lg sm:!text-xl">
                <Database className="mr-2" />
                {t("sqlStatus.main")}
              </h2>
              {renderSQLStatus(status.sql.main)}
            </ComponentContainer>
            <ComponentContainer>
              <h2 className="flex flex-wrap items-center font-bold text-lg sm:!text-xl">
                <PanelsTopLeft className="mr-2" />
                {t("sqlStatus.projectComments")}
              </h2>
              {renderSQLStatus(status.sql.project_comments)}
            </ComponentContainer>
            <ComponentContainer>
              <h2 className="flex flex-wrap items-center font-bold text-lg sm:!text-xl">
                <GalleryHorizontalEnd className="mr-2" />
                {t("sqlStatus.galleryComments")}
              </h2>
              {renderSQLStatus(status.sql.gallery_comments)}
            </ComponentContainer>
            <ComponentContainer>
              <h2 className="flex flex-wrap items-center font-bold text-lg sm:!text-xl">
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
            <h2 className="mr-2 opacity-70">{t("cacheStatus.connected")}:</h2>
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
    );
  } else {
    if (isLoading) {
      return (
        <section id="components-container" className="sm:!px-5 my-10">
          <SkeletonContents />
        </section>
      );
    } else {
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
