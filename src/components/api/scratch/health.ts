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

export type statusType = "success" | "error" | "timeout";

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
  main: statusType;
  website: statusType;
  search: statusType;
  database: statusType;
}

export interface ScratchAPIgetStatusResponse {
  data?: ScratchAPIgetStatusProps;
}

export async function ScratchAPIgetStatus(): Promise<ScratchAPIgetStatusResponse> {
  let healthData: ScratchAPIgetStatusProps = {
    version: "", // バージョン情報
    uptime: 0, // 稼働時間（適切な初期値を設定）
    load: [], // 負荷（適切な初期値を設定）
    sql: {
      main: {
        primary: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
        replica: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
      },
      project_comments: {
        primary: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
        replica: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
      },
      gallery_comments: {
        primary: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
        replica: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
      },
      userprofile_comments: {
        primary: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
        replica: {
          ssl: false,
          destroyed: false,
          min: 0,
          max: 0,
          numUsed: 0,
          numFree: 0,
          pendingAcquires: 0,
          pendingCreates: 0,
        },
      },
    },
    timestamp: Date.now(), // 現在の時刻を設定
    cache: {
      connected: false,
      ready: false,
    },
    main: "error",
    website: "error", // 初期ステータス
    search: "error", // 初期ステータス
    database: "error", // 初期ステータス
  };

  // 基本ステータスの取得
  try {
    const url = "https://api.scratch.mit.edu/health";

    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 5000);

    const response = await fetch(url, { signal: abortController.signal });

    if (response.status === 200) {
      const data = await response.json();
      healthData = data;
      healthData.main = "success";
    }
    if (response.status === 504) {
      healthData.main = "timeout";
    }

    clearTimeout(timeoutId);
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.name === "AbortError") {
        console.log("Fetch request was aborted due to timeout.");
        healthData.main = "timeout";
      } else {
        console.error("Error fetching database status:", e.message);
        healthData.main = "error";
      }
    } else {
      // e が Error 型でない場合
      console.error("Unknown error:", e);
      healthData.main = "error";
    }
  }

  // データベースステータスの取得
  try {
    const url = "https://scratch.mit.edu";

    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 5000);

    const response = await fetch(url, { signal: abortController.signal });

    if (response.status === 200) {
      healthData.website = "success";
    }
    if (response.status === 504) {
      healthData.website = "timeout";
    }

    clearTimeout(timeoutId);
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.name === "AbortError") {
        console.log("Fetch request was aborted due to timeout.");
        healthData.website = "timeout";
      } else {
        console.error("Error fetching database status:", e.message);
        healthData.website = "error";
      }
    } else {
      // e が Error 型でない場合
      console.error("Unknown error:", e);
      healthData.website = "error";
    }
  }

  // 検索APIステータスの取得
  try {
    const url =
      "https://api.scratch.mit.edu/explore/projects?limit=16&offset=0&language=ja&mode=trending&q=*";

    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
      healthData.search = "timeout";
    }, 5000);

    const response = await fetch(url, { signal: abortController.signal });

    if (response.status === 200) {
      const data = await response.json();
      if (JSON.stringify(data).length > 0) {
        healthData.search = "success";
      } else {
        healthData.search = "error";
      }
    }
    if (response.status === 504) {
      healthData.search = "timeout";
    }

    clearTimeout(timeoutId);
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.name === "AbortError") {
        console.log("Fetch request was aborted due to timeout.");
        healthData.search = "timeout";
      } else {
        console.error("Error fetching database status:", e.message);
        healthData.search = "error";
      }
    } else {
      // e が Error 型でない場合
      console.error("Unknown error:", e);
      healthData.search = "error";
    }
  }

  // データベースステータスの取得
  try {
    const url =
      "https://clouddata.scratch.mit.edu/logs?projectid=888571367&limit=5&offset=0";

    const abortController = new AbortController();

    const timeoutId = setTimeout(() => {
      abortController.abort();
    }, 5000);

    const response = await fetch(url, { signal: abortController.signal });

    if (response.status === 200) {
      healthData.database = "success";
    } else if (response.status === 504) {
      healthData.database = "timeout";
    }

    clearTimeout(timeoutId);
  } catch (e: unknown) {
    if (e instanceof Error) {
      if (e.name === "AbortError") {
        console.log("Fetch request was aborted due to timeout.");
        healthData.database = "timeout";
      } else {
        console.error("Error fetching database status:", e.message);
        healthData.database = "error";
      }
    } else {
      // e が Error 型でない場合
      console.error("Unknown error:", e);
      healthData.database = "error";
    }
  }

  return { data: healthData };
}
