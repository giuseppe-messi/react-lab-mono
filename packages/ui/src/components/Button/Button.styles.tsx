import styles from "styled-components";
/// <reference types="react" />
import type { ButtonSize } from "./Button.types";

const paddingMap: Record<ButtonSize, string> = {
  sm: "4px 8px",
  md: "8px 16px",
  lg: "12px 24px"
};

const fontSizeMap: Record<ButtonSize, string> = {
  sm: "1rem",
  md: "1rem",
  lg: "1.25rem"
};

const fontWeightMap: Record<ButtonSize, React.CSSProperties["fontWeight"]> = {
  sm: 300,
  md: "normal",
  lg: "normal"
};

type ButtonStyleProps = {
  size?: ButtonSize;
};

export const Button = styles.button<ButtonStyleProps>`
  color: var(--color-light-white);
  padding: ${({ size = "md" }) => paddingMap[size]};
  font-size: ${({ size = "md" }) => fontSizeMap[size]};
  font-weight: ${({ size = "md" }) => fontWeightMap[size]};
`;
