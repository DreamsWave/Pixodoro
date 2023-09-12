import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { ThemeType } from "../../theme";

interface AppSettingsState {
  audioVolume: number;
  theme: ThemeType;
  pixelSize: number;
}

const initialState: AppSettingsState = {
  audioVolume: 0.5,
  theme: "dark",
  pixelSize: 8,
};

export const appSettingsSlice = createSlice({
  name: "appSettings",
  initialState,
  reducers: {
    setTheme: (state, action: PayloadAction<ThemeType>) => {
      state.theme = action.payload;
    },
    setVolume: (state, action: PayloadAction<number>) => {
      state.audioVolume = action.payload;
    },
    setPixelSize: (state, action: PayloadAction<number>) => {
      state.pixelSize = action.payload;
    },
  },
});

export const { setTheme, setVolume, setPixelSize } = appSettingsSlice.actions;

export const selectAppSettings = (state: RootState) => state.appSettings;

export default appSettingsSlice.reducer;
