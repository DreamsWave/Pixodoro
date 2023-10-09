import { useAppSelector } from "../../hooks";
import { selectNotification } from "./notificationSlice";
import {
  requestPermission,
  sendNotification as sendNotificationAPI,
  Options,
} from "@tauri-apps/api/notification";

export default function useNotification() {
  const { enabled } = useAppSelector(selectNotification);

  const sendNotification = async (options: Options | string) => {
    let granted = false;
    if (!granted) {
      const permission = await requestPermission();
      granted = permission === "granted";
    }
    if (granted && enabled) {
      sendNotificationAPI(options);
    }
  };

  return { sendNotification };
}
