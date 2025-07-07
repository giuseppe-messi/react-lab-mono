import styles from "./Box.module.css";

type Size = "xs" | "sm" | "md" | "lg" | "xl";

interface BoxProps {
  size?: Size;
  className?: string;
  children: React.ReactNode;
}

const paddingMap: Record<Size, string> = {
  xs: styles.xs,
  sm: styles.sm,
  md: styles.md,
  lg: styles.lg,
  xl: styles.xl
};

export function Box({ size = "md", className = "", children }: BoxProps) {
  return (
    <div className={`${styles.box} ${paddingMap[size]} ${className}`}>
      {children}
    </div>
  );
}
