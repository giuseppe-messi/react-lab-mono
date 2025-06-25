import styles from "./CloseIcon.module.css";
import type { HTMLAttributes } from "react";

type CloseIconProps = HTMLAttributes<HTMLDivElement> & {
  onClose: () => void;
  className?: string;
};

export const CloseIcon = ({ onClose, className, ...props }: CloseIconProps) => (
  <div
    className={`${styles.closeIcon} ${className}`}
    onClick={onClose}
    {...props}
  >
    &times;
  </div>
);
