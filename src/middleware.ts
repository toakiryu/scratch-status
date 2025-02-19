import createMiddleware from "next-intl/middleware";
import { NextRequest, NextResponse } from "next/server";
import { routing } from "./i18n/routing";
import { getCookie } from "cookies-next";

import siteConfig from "../richtpl.config";

// 既存のミドルウェアを作成
const intlMiddleware = createMiddleware(routing);

export async function middleware(request: NextRequest) {
  // 言語を取得
  const locale =
    (await getCookie("NEXT_LOCALE")) || siteConfig.i18n.defaultLocale;

  // 環境変数を取得
  const maintenance = process.env.MAINTENANCE_MODE || "false";
  const requestLimit = process.env.REQUEST_LIMIT_REACHED || "false";

  // 現在のパスを取得
  const currentPath = request.nextUrl.pathname;

  // 言語リストを取得
  const locales = siteConfig.i18n.locales;
  // 現在のパスの最初の部分（言語コード）を正規表現で削除
  const regex = new RegExp(`^/(?:${locales.join("|")})`);
  // 言語部分を削除したパスを取得
  const pathWithoutLocale = currentPath.replace(regex, "");

  if (maintenance === "true" && pathWithoutLocale !== `/maintenance`) {
    return NextResponse.redirect(
      new URL(`/${locale}/maintenance`, request.url)
    );
  } else if (maintenance !== "true" && pathWithoutLocale === `/maintenance`) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  } else if (requestLimit === "true" && pathWithoutLocale !== `/requestLimit`) {
    return NextResponse.redirect(
      new URL(`/${locale}/requestLimit`, request.url)
    );
  } else if (requestLimit !== "true" && pathWithoutLocale === `/requestLimit`) {
    return NextResponse.redirect(new URL(`/${locale}/`, request.url));
  }

  // intlMiddleware を実行して、結果を取得
  let response = intlMiddleware(request);

  // intlMiddleware がレスポンスを返さなかった場合、デフォルトのNextResponseを作成
  if (!response) {
    response = NextResponse.next();
  }

  // カスタムヘッダーを追加する処理
  response.headers.set("x-pathname", request.nextUrl.pathname);

  return response;
}

export const config = {
  // Match only internationalized pathnames
  matcher: ["/", `/(ja|en)/:path*`],
};
