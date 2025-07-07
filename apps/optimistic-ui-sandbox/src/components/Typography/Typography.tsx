import { type CSSProperties, type ReactNode } from "react";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";

interface TypographyProps {
  type: TypographyTag;
  className?: string;
  styles?: CSSProperties;
  children: ReactNode;
}

export function Typography({
  type,
  className,
  styles,
  children
}: TypographyProps) {
  const Tag = type === "body" ? "p" : type;
  const baseStyle =
    type !== "body" ? { textAlign: "center" as const } : undefined;

  return (
    <Tag className={className} style={{ ...baseStyle, ...styles }}>
      {children}
    </Tag>
  );
}
