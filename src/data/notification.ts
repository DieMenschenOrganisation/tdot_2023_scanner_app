export interface Notification {
    type: "info"|"error",
    message: string,
    timestamp: number,
}