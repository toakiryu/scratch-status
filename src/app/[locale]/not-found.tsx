"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return null;
}
