"use client";

import { ChangeEvent, useEffect, useState, useTransition } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useTheme } from "next-themes";
import { useParams } from "next/navigation";
import { Locale, usePathname, useRouter } from "@/i18n/routing";
import { Select, SelectItem } from "@nextui-org/react";
import { Earth, MonitorCog, Moon, Sun } from "lucide-react";
import config from "../../richtpl.config";

export default function Footer() {
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
    <footer className="relative container max-w-4xl border-t py-5">
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
