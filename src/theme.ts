import { ThemeColors, Themes, Theme } from "./types/themeTypes";

const darkThemeColors: ThemeColors = {
  primary: "#ff8080",
  secondary: "#5fa1e7",
  border: "#fff",
  text: "#fff",
  background: "#32313b",
  button: "#fff",
  disabled: "#494b65",
};

const lightThemeColors: ThemeColors = {
  primary: "#ff8080",
  secondary: "#5fa1e7",
  border: "#cfd0e3",
  text: "#444774",
  background: "#fff",
  button: "#9598c1",
  disabled: "#cfd0e3",
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
