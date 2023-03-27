import { lightTheme } from "../theme/colors";

export type TSeparateThemeType = typeof lightTheme;

export type TThemeType = {
  theme: "light" | "dark";
  props: TSeparateThemeType;
};

export type TThemePropType = TThemeType | null;
