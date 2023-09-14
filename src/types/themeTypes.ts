export interface Theme {
  color?: ThemeColors;
  fonts?: string[];
}

export interface ThemeColors {
  primary?: string;
  secondary?: string;
  border?: string;
  text?: string;
  background?: string;
  button?: string;
  disabled?: string;
}

export type ThemeType = "dark" | "light";

export type Themes = {
  [key in ThemeType]: Theme;
};
