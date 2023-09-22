import {defineStore} from "pinia";
import {Notification} from "../data/notification";

interface State {
    viewedNotifications: Notification[],
    scheduledNotifications: Notification[],
    updaterID: number,
}

export const useToastStore = defineStore("toastStore", {
    state: (): State => {
        return {
            viewedNotifications: [],
            scheduledNotifications: [],
            updaterID: 0,
        }
    },
    actions: {
        startUpdater() {
            this.updaterID = setInterval(this.updateToasts, 500)
        },
        stopUpdater() {
            clearInterval(this.updaterID);
        },
        addNotification(type: "info"|"error", message: string) {
            const notification: Notification = {
                type,
                message,
                timestamp: 0,
            };
            this.scheduledNotifications.push(notification);
        },
        updateToasts() {
            const currentDate = new Date().getTime();
            if (this.viewedNotifications.length < 3 && this.scheduledNotifications.length != 0) {
                const toPush = this.scheduledNotifications.splice(0,1)[0];
                toPush.timestamp = currentDate;

                this.viewedNotifications.push(toPush);
                return;
            }

            for (let i = 0; i < this.viewedNotifications.length; i++) {
                if (currentDate - this.viewedNotifications[i].timestamp > 5_000) {
                    this.viewedNotifications.splice(i, 1);
                    return;
                }
            }
        }
    }
});