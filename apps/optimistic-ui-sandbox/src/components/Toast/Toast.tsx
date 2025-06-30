import styles from "./Toast.module.css";
import { Typography } from "../Typography/Typography";
import { useEffect, useState } from "react";
import type { IToast } from "../../stores/useToastersStore";

type ToastProps = Pick<IToast, "text" | "type"> & {
  delay?: number;
};

const typeMap: Record<IToast["type"], string> = {
  sucess: styles.success,
  error: styles.error,
  warning: styles.warning
};

export const Toast = ({ text, type, delay = 2000 }: ToastProps) => {
  const [dismiss, setDismiss] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setDismiss(true), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay]);

  return (
    <div className={`${styles.box} ${dismiss && styles.exit} ${typeMap[type]}`}>
      <Typography type="body">{text}</Typography>
    </div>
  );
};
