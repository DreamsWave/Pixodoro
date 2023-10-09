import { useEffect } from "react";
import { useAppSelector } from "../../hooks";
import { selectNotification, setPermissionGranted } from "./notificationSlice";
import {
  requestPermission,
  sendNotification as sendNotificationAPI,
} from "@tauri-apps/api/notification";

export default function useNotification() {
  const { permissionGranted } = useAppSelector(selectNotification);

  const sendNotification = async (
    options:
      | {
          title: string;
          body?: string;
          icon?: string;
        }
      | string
  ) => {
    let granted = permissionGranted;
    if (!permissionGranted) {
      const permission = await requestPermission();
      granted = permission === "granted";
      setPermissionGranted(granted);
    }
    if (granted) {
      sendNotificationAPI(options);
    }
  };

  return { sendNotification };
}
