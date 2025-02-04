"use server";

export interface ScratchAPIgetHealthSqlContentProps {
  ssl: boolean; // SSLが有効かどうか
  destroyed: boolean; // 接続が破棄されたかどうか
  min: number; // 最小接続数
  max: number; // 最大接続数
  numUsed: number; // 現在使用中の接続数
  numFree: number; // 使用可能な接続数
  pendingAcquires: number; // 接続を待機中のリクエスト数
  pendingCreates: number; //  新しい接続を作成中のリクエスト数
}

export interface ScratchAPIgetHealthSqlProps {
  // メインデータベース接続
  primary: ScratchAPIgetHealthSqlContentProps;
  // レプリカデータベース接続（読み取り専用）
  replica: ScratchAPIgetHealthSqlContentProps;
}

export interface ScratchAPIgetStatusProps {
  version: string; // バージョン
  uptime: number; // 稼働時間？
  load: number[]; // 負荷？
  sql: {
    main: ScratchAPIgetHealthSqlProps;
    project_comments: ScratchAPIgetHealthSqlProps;
    gallery_comments: ScratchAPIgetHealthSqlProps;
    userprofile_comments: ScratchAPIgetHealthSqlProps;
  };
  timestamp: number; // 更新日時？
  cache: {
    connected: boolean; // キャッシュサーバーが接続されているか
    ready: boolean; // キャッシュサーバーが使用可能な状態か
  };
  website: boolean;
  search: boolean;
  database: boolean;
}

export interface ScratchAPIgetStatusResponse {
  status: "success" | "error";
  data?: ScratchAPIgetStatusProps;
  error?: unknown;
}

export async function ScratchAPIgetStatus(): Promise<ScratchAPIgetStatusResponse> {
  try {
    // 基本ステータスの取得
    const healthRes = await fetch("https://api.scratch.mit.edu/health");
    const healthData: ScratchAPIgetStatusProps = await healthRes.json();

    // データベースステータスの取得
    try {
      await fetch("https://scratch.mit.edu");
      healthData.website = true;
    } catch {
      healthData.website = false;
    }

    // 検索APIステータスの取得
    try {
      const res = await fetch(
        "https://api.scratch.mit.edu/explore/projects?limit=16&offset=0&language=ja&mode=trending&q=*"
      );
      const data = await res.json();
      if (JSON.stringify(data).length > 0) {
        healthData.search = true;
      } else {
        healthData.search = false;
      }
    } catch {
      healthData.search = false;
    }

    // データベースステータスの取得
    try {
      await fetch(
        "https://clouddata.scratch.mit.edu/logs?projectid=888571367&limit=5&offset=0"
      );
      healthData.database = true;
    } catch {
      healthData.database = false;
    }

    return { status: "success", data: healthData };
  } catch (error) {
    return { status: "error", error: error };
  }
}
