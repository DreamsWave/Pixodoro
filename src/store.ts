import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import timerReducer from "./features/timer/timerSlice";
import appSettingsReducer from "./features/appSettings/appSettingsSlice";
import musicReducer from "./features/music/musicSlice";

export const store = configureStore({
  reducer: {
    timer: timerReducer,
    appSettings: appSettingsReducer,
    music: musicReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
