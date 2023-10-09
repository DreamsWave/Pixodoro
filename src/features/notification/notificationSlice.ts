import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { isPermissionGranted } from "@tauri-apps/api/notification";

export interface NotificationState {
  permissionGranted: boolean;
}

const initialState: NotificationState = {
  permissionGranted: (await isPermissionGranted()) ?? false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setPermissionGranted: (state, action: PayloadAction<boolean>) => {
      state.permissionGranted = action.payload;
    },
  },
});

export const { setPermissionGranted } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
