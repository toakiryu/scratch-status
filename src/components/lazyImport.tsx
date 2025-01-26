import React, { ComponentType, lazy } from "react";

// 共通のエラーハンドリングと遅延読み込み関数
const lazyImport = (factory: () => Promise<{ default: ComponentType<any> }>) =>
  lazy(async () => {
    try {
      return await factory();
    } catch (e) {
      console.log(e);
      return {
        default: () => <></>,
      };
    }
  });

export default lazyImport;
