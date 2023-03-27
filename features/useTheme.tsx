import React from "react";
import { COLORS } from "../lib/constants";
import { darkTheme, lightTheme } from "../theme/colors";
import { TThemePropType, TThemeType } from "./types";

interface ContextProps {
  theme: TThemePropType;
  toggleTheme: () => void;
}

interface ThemeProviderProps {
  children: React.ReactNode;
}

const _noop = async () => {
  throw new Error("Not loaded");
};

const ThemeContext = React.createContext<ContextProps>({
  theme: null,
  toggleTheme: _noop,
});

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<TThemeType | null>(null);

  React.useEffect(() => {
    setTheme({ theme: COLORS.LIGHT, props: lightTheme });
  }, []);

  const toggleTheme = React.useCallback(() => {
    if (theme?.theme === COLORS.LIGHT) {
      setTheme({ theme: COLORS.DARK, props: darkTheme });
      return;
    }
    setTheme({ theme: COLORS.LIGHT, props: lightTheme });
  }, [theme]);

  const value = React.useMemo(
    () => ({
      theme,
      toggleTheme,
    }),
    [theme, toggleTheme]
  );
  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
};
export const useTheme = () => {
  const context = React.useContext(ThemeContext);

  if (!context)
    throw new Error("useTheme() can only be called within the theme provider");

  return context;
};
