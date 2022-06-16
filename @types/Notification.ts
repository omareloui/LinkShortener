export type NotificationType = "success" | "info" | "warn" | "error";

export interface Notification {
  id: number;
  isShown: boolean;
  type: NotificationType;
  message: string;
  duration: number;
}
