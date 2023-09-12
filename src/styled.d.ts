import { Theme } from "./types/themeTypes";
import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme extends Theme {}
}
