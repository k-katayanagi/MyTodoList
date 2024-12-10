export interface TodoType {
  id: number;
  title?: string;
  state?: "未完了" | "進行中" | "完了";
}

export type StateSortType = "すべて" | "未完了" | "進行中" | "完了";
