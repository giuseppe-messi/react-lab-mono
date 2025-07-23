import { clsx } from "clsx";
import styles from "./box.module.css";

export const TestLocators = {
  box: "box"
};

type Size = "xs" | "sm" | "md" | "lg" | "xl";

export type BoxProps = {
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

export const Box = ({ size = "md", className = "", children }: BoxProps) => {
  return (
    <div
      className={clsx(styles.box, styles[size], className)}
      data-testid={TestLocators.box}
    >
      {children}
    </div>
  );
};
