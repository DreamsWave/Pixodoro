import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { darkThemeColors, lightThemeColors, ThemeColors } from "./theme";

export interface ThemeState {
  colors: ThemeColors;
  pixelSize: number;
  darkmode: boolean;
}

const initialState: ThemeState = {
  colors: darkThemeColors,
  darkmode: true,
  pixelSize: 8,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setDarkTheme: (state) => {
      state.colors = darkThemeColors;
      state.darkmode = true;
    },
    setLightTheme: (state) => {
      state.colors = lightThemeColors;
      state.darkmode = false;
    },
    setPixelSize: (state, action: PayloadAction<number>) => {
      state.pixelSize = action.payload;
    },
  },
});

export const { setDarkTheme, setLightTheme, setPixelSize } = themeSlice.actions;

export const selectTheme = (state: RootState) => state.theme;

export default themeSlice.reducer;
