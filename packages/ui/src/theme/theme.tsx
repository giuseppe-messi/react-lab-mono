// packages/ui/src/theme.tsx
import type { ReactNode } from "react";
import React, { createContext, useContext, useMemo, useEffect } from "react";

export interface Theme {
  // Core colors
  colorPrimary: string;
  colorSecondary: string;
  colorLightWhite: string;
  colorLightRed: string;
  colorLightGreen: string;
  colorLightYellow: string;

  // Typography / base
  fontFamily: string;
  lineHeight: string;
  fontWeight: string;
  fontSizeBase: string;
  backgroundColor: string;

  // Spacing
  spaceXs: string;
  spaceSm: string;
  spaceMd: string;
  spaceLg: string;
  spaceXl: string;

  // Radii
  appRadius: string;
  btnRadius: string;

  // Breakpoints
  bpSm: string;
  bpMd: string;
  bpLg: string;
  bpXl: string;

  // Focus
  inputFocus: string;
}

const defaultTheme: Theme = {
  colorPrimary: "#242424",
  colorSecondary: "#468faf",
  colorLightWhite: "#f8f8ff",
  colorLightRed: "#e15151",
  colorLightGreen: "#48bb78",
  colorLightYellow: "#e1c051",

  fontFamily: `"Helvetica Neue", system-ui, Avenir, Helvetica, Arial, sans-serif`,
  lineHeight: "1.5",
  fontWeight: "400",
  fontSizeBase: "1rem",
  backgroundColor: "#242424",

  spaceXs: "4px",
  spaceSm: "8px",
  spaceMd: "16px",
  spaceLg: "24px",
  spaceXl: "32px",

  appRadius: "6px",
  btnRadius: "4px",

  bpSm: "576px",
  bpMd: "768px",
  bpLg: "992px",
  bpXl: "1200px",

  inputFocus: "#0070f3"
};

const toCssVars = (theme: Theme): Record<string, string> => ({
  "--color-primary": theme.colorPrimary,
  "--color-secondary": theme.colorSecondary,
  "--color-light-white": theme.colorLightWhite,
  "--color-light-red": theme.colorLightRed,
  "--color-light-green": theme.colorLightGreen,
  "--color-light-yellow": theme.colorLightYellow,

  "--font-family": theme.fontFamily,
  "--line-height": theme.lineHeight,
  "--font-weight": theme.fontWeight,
  "--font-size-base": theme.fontSizeBase,
  "--background-color": theme.backgroundColor,

  "--space-xs": theme.spaceXs,
  "--space-sm": theme.spaceSm,
  "--space-md": theme.spaceMd,
  "--space-lg": theme.spaceLg,
  "--space-xl": theme.spaceXl,

  "--app-radius": theme.appRadius,
  "--btn-radius": theme.btnRadius,

  "--bp-sm": theme.bpSm,
  "--bp-md": theme.bpMd,
  "--bp-lg": theme.bpLg,
  "--bp-xl": theme.bpXl,

  "--input-focus": theme.inputFocus
});

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  theme?: Partial<Theme>;
  children: ReactNode;
  global?: boolean; // if true, apply CSS vars to :root, else scope to wrapper
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({
  theme = {},
  children,
  global = false
}) => {
  const merged = useMemo<Theme>(() => ({ ...defaultTheme, ...theme }), [theme]);
  const cssVars = useMemo(() => toCssVars(merged), [merged]);

  useEffect(() => {
    if (!global) return;
    const root = document.documentElement;

    // Save previous values so we can restore on cleanup
    const previous: Record<string, string> = {};
    Object.keys(cssVars).forEach((key) => {
      previous[key] = root.style.getPropertyValue(key);
    });

    // Apply new vars
    Object.entries(cssVars).forEach(([k, v]) => {
      root.style.setProperty(k, v);
    });

    return () => {
      // Restore previous: if empty string, remove the variable
      Object.entries(previous).forEach(([k, v]) => {
        if (v) root.style.setProperty(k, v);
        else root.style.removeProperty(k);
      });
    };
  }, [cssVars, global]);

  const wrapperStyle: React.CSSProperties = global
    ? {}
    : (Object.fromEntries(
        Object.entries(cssVars)
      ) as unknown as React.CSSProperties);

  return (
    <ThemeContext.Provider value={merged}>
      {global ? children : <div style={wrapperStyle}>{children}</div>}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
