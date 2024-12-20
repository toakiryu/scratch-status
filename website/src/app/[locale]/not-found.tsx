"use client";

import { useRouter } from "@/i18n/routing";
import { useEffect } from "react";

export default function NotFoundPage() {
  const router = useRouter();

  useEffect(() => {
    router.replace("/");
  }, []);

  return null;
}
