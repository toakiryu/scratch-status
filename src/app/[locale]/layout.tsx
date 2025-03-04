import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

// config
import config from "../../../richtpl.config";

// next-intl (i18n)
import { NextIntlClientProvider } from "next-intl";
import { getMessages, getTranslations } from "next-intl/server";

// next-theme
import { ThemeProvider } from "next-themes";

// ui
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

import { HeroUIProvider } from "@heroui/react";

import { GoogleAnalytics } from "@next/third-parties/google";

export type LayoutProps = {
  locale: string;
};

export async function generateMetadata(props: {
  params: LayoutProps;
}): Promise<Metadata> {
  const { locale } = await props.params;
  const t = await getTranslations({ locale, namespace: "Metadata" });

  const header = await headers();
  const pathname = header.get("x-pathname");
  const path = pathname ? pathname : "";

  const generateAlternates = () => {
    const alternates: {
      canonical: string;
      languages: { [key: string]: string };
    } = {
      canonical: `${config.url}${path}`,
      languages: {},
    };

    for (const locale of config.i18n.locales) {
      const localeConfig = config.i18n.localeConfigs[locale];
      const cleanPath = path.replace(`/${locale}`, ""); // Remove current locale from path
      alternates.languages[
        localeConfig.htmlLang
      ] = `${config.url}/${localeConfig.path}${cleanPath}`;
    }

    return alternates;
  };

  // titleの値を判別
  const titleData = config.themeConfig?.metadata?.title;
  let title: string;
  if (t.has(`title`)) {
    title = t(`title`);
  } else if (typeof titleData === "string") {
    title = titleData;
  } else if (titleData && "default" in titleData) {
    title = titleData.default;
  } else if (titleData && "absolute" in titleData) {
    title = titleData.absolute;
  } else {
    title = config.title;
  }

  const description =
    (t.has(`description`) && t(`description`)) ||
    config.themeConfig.metadata?.description ||
    config.description;

  return {
    title: {
      template: `%s | ${(t.has(`title`) && t(`title`)) ?? config.title}`,
      default: `${(t.has(`title`) && t(`title`)) ?? config.title}`,
    },
    description: description,
    referrer: "origin-when-cross-origin",
    keywords: ["Vercel", "Next.js"],
    authors: [{ name: "Toa Kiryu", url: "https://toakiryu.com" }],
    creator: "Toa Kiryu",
    icons: config.favicon ?? "/favicon.ico",
    generator: "Next.js",
    publisher: "Vercel",
    robots: "follow, index",
    metadataBase:
      config.themeConfig?.metadata?.metadataBase ?? new URL(config.url),
    alternates: generateAlternates(),
    openGraph: {
      type: "profile",
      url: config.url,
      siteName: title,
      title: title,
      description: description,
      images:
        config.themeConfig.metadata?.openGraph?.images ??
        config.themeConfig.image,
      locale:
        config.themeConfig?.metadata?.openGraph?.locale ??
        config.i18n.localeConfigs[locale].htmlLang ??
        "ja-JP",
    },
    twitter: {
      card: "summary",
      site: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      title: title,
      description: description,
      creator: `@${config.themeConfig?.metadata?.creator ?? "toakiryu"}`,
      images:
        config.themeConfig.metadata?.twitter?.images ??
        config.themeConfig.image,
    },
    ...config.themeConfig?.metadata,
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: LayoutProps;
}) {
  const { locale } = await params;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  const gaId = process.env.GA_ID || "";

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://giscus.app" />
        <link rel="preconnect" href="https://github.githubassets.com" />
      </head>
      <GoogleAnalytics gaId={gaId} />
      <body
        className={`${inter.className} relative w-full h-full min-h-dvh overflow-x-clip`}
        suppressHydrationWarning
      >
        <HeroUIProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme={config.themeConfig.colorMode.defaultMode}
            enableSystem
            disableTransitionOnChange
          >
            <NextIntlClientProvider messages={messages}>
              <main className="w-full h-full">{children}</main>
            </NextIntlClientProvider>
          </ThemeProvider>
        </HeroUIProvider>
      </body>
    </html>
  );
}
