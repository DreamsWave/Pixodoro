export interface ThemeColors {
  primary?: string;
  secondary?: string;
  border?: string;
  text?: string;
  background?: string;
  button?: string;
  disabled?: string;
}

export const darkThemeColors: ThemeColors = {
  primary: "#ff8080",
  secondary: "#5fa1e7",
  border: "#fff",
  text: "#fff",
  background: "#32313b",
  button: "#fff",
  disabled: "#494b65",
};

export const lightThemeColors: ThemeColors = {
  primary: "#ff8080",
  secondary: "#5fa1e7",
  border: "#cfd0e3",
  text: "#444774",
  background: "#fff",
  button: "#9598c1",
  disabled: "#cfd0e3",
};
