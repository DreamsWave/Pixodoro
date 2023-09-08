import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import pixelSizeReducer from "./features/pixelSize/pixelSizeSlice";

export const store = configureStore({
  reducer: {
    pixelSize: pixelSizeReducer,
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
