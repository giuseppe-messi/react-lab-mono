import styles from "./Toast.module.css";
import { Typography } from "../Typography";
import { useEffect, useState } from "react";
import { useToastersStore, type IToast } from "../../stores/useToastersStore";

type ToastProps = IToast & {
  delay?: number;
};

const typeMap: Record<IToast["type"], string> = {
  sucess: styles.success,
  error: styles.error,
  warning: styles.warning
};

export const Toast = ({ text, type, id, delay = 2000 }: ToastProps) => {
  const [dismiss, setDismiss] = useState(false);
  const deQueueToast = useToastersStore((state) => state.deQueueToast);

  useEffect(() => {
    const timeout = setTimeout(() => setDismiss(true), delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [delay, deQueueToast, id]);

  const handleDequeue = () => {
    if (dismiss) {
      deQueueToast(id);
    }
  };

  return (
    <div
      className={`${styles.box} ${dismiss && styles.exit} ${typeMap[type]}`}
      onAnimationEnd={handleDequeue}
    >
      <Typography type="body">{text}</Typography>
    </div>
  );
};
