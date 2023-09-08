import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pixelSizeReducer from "./features/pixelSize/pixelSizeSlice";
import timerReducer from "./features/timer/timerSlice";

export const store = configureStore({
  reducer: {
    pixelSize: pixelSizeReducer,
    timer: timerReducer,
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
