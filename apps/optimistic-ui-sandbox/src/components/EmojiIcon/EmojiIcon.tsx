import styles from "./EmojiIcon.module.css";
import type { HTMLAttributes, ReactNode } from "react";
type EmojiType = "check" | "edit" | "lightning" | "alert";

type EmojiIconProps = HTMLAttributes<HTMLDivElement> & {
  type: EmojiType;
  className?: string;
  onClick?: () => void;
};

const emojiMap: Record<EmojiType, ReactNode> = {
  check: "✅",
  edit: "✏️",
  lightning: "⚡",
  alert: "⚠️"
};

export const EmojiIcon = ({
  type,
  className,
  onClick,
  ...props
}: EmojiIconProps) => (
  <div className={`${styles.icon} ${className}`} onClick={onClick} {...props}>
    {emojiMap[type]}
  </div>
);
