import styles from "./CloseIcon.module.css";

type CloseIconProps = {
  onClose: () => void;
};

export const CloseIcon = ({ onClose }: CloseIconProps) => (
  <div className={styles.closeIcon} onClick={onClose}>
    &times;
  </div>
);
