import styles from "./Box.module.css";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

type BoxProps = {
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const paddingMap: Record<Size, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl
};

export const Box = ({ size = "md", className = "", children }: BoxProps) => (
  <div className={`${styles.box} ${paddingMap[size]} ${className}`}>
    {children}
  </div>
);
