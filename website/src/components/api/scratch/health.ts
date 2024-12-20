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

export interface ScratchAPIgetHealthProps {
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
}

export interface ScratchAPIgetHealthResponse {
  status: "success" | "error";
  data?: ScratchAPIgetHealthProps;
  error?: unknown;
}

export async function ScratchAPIgetHealth(): Promise<ScratchAPIgetHealthResponse> {
  try {
    const res = await fetch("https://api.scratch.mit.edu/health");
    const data = await res.json();
    return { status: "success", data: data };
  } catch (error) {
    return { status: "error", error: error };
  }
}
