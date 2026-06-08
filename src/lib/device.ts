import { ENV } from "./env";

 

// utils/device-id.ts
export function getDeviceId(): string {
    if (typeof window === "undefined") return "";

    const KEY = `${ENV.APP_NAME.replaceAll(' ', '_')}_device_id`;

    let id = localStorage.getItem(KEY);

    if (!id) {
        id = crypto.randomUUID(); // creates secure unique identifier
        localStorage.setItem(KEY, id);
    }

    return id;
}
