type CardProps = {
  size: "xs" | "sm" | "md" | "lg" | "xl";
  children: React.ReactNode;
};

const paddingMap: Record<CardProps["size"], string> = {
  xs: "var(--space-xs)",
  sm: "var(--space-sm)",
  md: "var(--space-md)",
  lg: "var(--space-lg)",
  xl: "var(--space-xl)"
};

export const Card = ({ size, children }: CardProps) => (
  <div style={{ flex: 1, padding: paddingMap[size] }}>{children}</div>
);
