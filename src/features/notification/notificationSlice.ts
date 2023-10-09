import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

export interface NotificationState {
  enabled: boolean;
}

const initialState: NotificationState = {
  enabled: false,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setEnabled: (state, action: PayloadAction<boolean>) => {
      state.enabled = action.payload;
    },
  },
});

export const { setEnabled } = notificationSlice.actions;

export const selectNotification = (state: RootState) => state.notification;

export default notificationSlice.reducer;
