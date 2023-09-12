import { ThemeColors, Themes, Theme } from "./types/themeTypes";

const darkThemeColors: ThemeColors = {
  primary: "#f27474",
  secondary: "#5fc9e7",
  border: "#fff",
  text: "#fff",
  background: "#32313b",
  button: "#fff",
};

const lightThemeColors: ThemeColors = {
  primary: "#f27474",
  secondary: "#5fa1e7",
  border: "#cfd0e3",
  text: "#444774",
  background: "#fff",
  button: "#9598c1",
};

const defaultTheme: Theme = {};

const themes: Themes = {
  dark: {
    color: darkThemeColors,
    ...defaultTheme,
  },
  light: {
    color: lightThemeColors,
    ...defaultTheme,
  },
};

export default themes;
