"use client";

import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  return <div className="w-full h-full min-h-dvh">{children}</div>;
}
