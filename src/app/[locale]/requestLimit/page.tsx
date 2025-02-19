"use client";

import { ChangeEvent, Suspense, useTransition } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";

import { Earth } from "lucide-react";

import { useLocale, useTranslations } from "next-intl";
import { Locale, usePathname, useRouter } from "@/i18n/routing";

import { Image } from "@heroui/react";
import { Select, SelectItem } from "@heroui/react";

import { ColorModeToggle } from "@/components/ui/color-mode-toggle.tsx";

import config from "../../../../richtpl.config";
import { GiscusContent } from "@/components/giscus";

export default function RequestLimitPage() {
  const router = useRouter();
  const locale = useLocale();
  const [isPending, startTransition] = useTransition();
  const pathname = usePathname();
  const params = useParams();
  const langT = useTranslations("languages");

  const t = useTranslations("pages.requestLimit");

  const returnTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

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

  return (
    <div className="flex w-full h-full min-h-[calc(dvh-20%)] items-center justify-center text-center">
      <div className="container max-w-5xl mt-20 mb-10">
        <div className="mb-5">
          <div className="flex justify-center items-center w-fit px-3 py-1 border rounded-full">
            <Image
              src="/wp-content/scratch_256x256.png"
              width={20}
              height={20}
            />
            <span className="ml-1 text-base">Scratch Status</span>
          </div>
        </div>
        <section id="description" className="text-left">
          <h1 className="text-3xl font-bold">{t("title")}</h1>

          <p className="text-sm text-default-500 mt-3">
            {t("description.part1")}
            <br />
            {t("description.part2")}
          </p>

          <p className="text-sm text-default-500 mt-3">
            {t.rich("description.part3", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            {t("description.part4")}
          </p>

          <p className="text-sm text-default-500 mt-3">
            {t("description.part5")}
          </p>
          <ul className="text-sm text-default-500 mt-2 list-disc list-inside">
            <li>{t("description.list1")}</li>
            <li>{t("description.list2")}</li>
          </ul>

          <p className="text-sm text-default-500 mt-3">
            {t.rich("description.part6", {
              strong: (chunks) => <strong>{chunks}</strong>,
            })}
            {t("description.part7")}
          </p>

          <p className="text-sm text-default-500 mt-3">
            {t("description.support")}
            <Link
              href={t("description.fanboxLink")}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              {t("description.fanboxLink")}
            </Link>
          </p>

          <div className="text-sm text-default-500 mt-3">
            <p>Contact:</p>
            <div className="flex flex-wrap gap-3 w-full mt-1">
              <Link
                href="https://l.toakiryu.com/website"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Website
              </Link>
              <Link
                href="https://l.toakiryu.com/github"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                GitHub
              </Link>
              <Link
                href="https://l.toakiryu.com/x"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                X(Twitter)
              </Link>
              <Link
                href="https://l.toakiryu.com/discord"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
              >
                Discord
              </Link>
            </div>
          </div>
        </section>
        <div className="flex flex-wrap items-center gap-3 mt-10">
          <ColorModeToggle />
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
        <Suspense>
          <GiscusContent />
        </Suspense>
      </div>
    </div>
  );
}
