type Size = "xs" | "sm" | "md" | "lg" | "xl";

type BoxProps = {
  size?: Size;
  className?: string;
  children: React.ReactNode;
};

const paddingMap: Record<Size, string> = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)"
};

export const Box = ({ size = "md", className = "", children }: BoxProps) => (
  <div className={className} style={{ flex: 1, padding: paddingMap[size] }}>
    {children}
  </div>
);
