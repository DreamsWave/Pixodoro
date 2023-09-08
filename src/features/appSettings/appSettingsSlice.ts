import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

interface AppSettingsState {
  audioVolume: number;
  darkTheme: boolean;
}

const initialState: AppSettingsState = {
  audioVolume: 0.5,
  darkTheme: true,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.darkTheme = !state.darkTheme;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.audioVolume = action.payload;
    },
  },
});

export const { toggleTheme, setVolume } = appSettingsSlice.actions;

export const selectAppSettings = (state: RootState) => state.appSettings;

export default appSettingsSlice.reducer;
