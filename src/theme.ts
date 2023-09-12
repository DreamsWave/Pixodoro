export interface ThemeColors {
  primary: string;
  secondary: string;
  border: string;
  text: string;
  background: string;
  button: string;
}

export type ThemeType = "dark" | "light";

export type Themes = {
  [key in ThemeType]: {
    color: ThemeColors;
  };
};

const darkThemeColors: ThemeColors = {
  primary: "#f27474",
  secondary: "#5fc9e7",
  border: "#fff",
  text: "#fff",
  background: "#32313b",
  button: "#fff",
};

const lightThemeColors: ThemeColors = {
  primary: "#5fa1e7",
  secondary: "#f27474",
  border: "#cfd0e3",
  text: "#444774",
  background: "#fff",
  button: "#9598c1",
};

const defaultTheme = {};

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
