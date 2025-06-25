import { type ReactNode } from "react";

type TypographyTag = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "body";

type TypographyProps = {
  type: TypographyTag;
  children: ReactNode;
};

export const Typography = ({ type, children }: TypographyProps) => {
  const Tag = type === "body" ? "p" : type;
  const style = type !== "body" ? { textAlign: "center" as const } : undefined;

  return <Tag style={style}>{children}</Tag>;
};
