import type { HTMLAttributes, ReactNode } from "react";
import styles from "./EmojiIcon.module.css";

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

export function EmojiIcon({
  type,
  className,
  onClick,
  ...props
}: EmojiIconProps) {
  return (
    <div className={`${styles.icon} ${className}`} onClick={onClick} {...props}>
      {emojiMap[type]}
    </div>
  );
}
