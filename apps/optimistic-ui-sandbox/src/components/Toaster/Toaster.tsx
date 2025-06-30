import styles from "./Toaster.module.css";
import { createPortal } from "react-dom";
import { Toast } from "../Toast/Toast";
import { useToastersStore } from "../../stores/useToastersStore";

export const Toaster = () => {
  const toastQueue = useToastersStore((state) => state.toastQueue);

  return (
    <>
      {createPortal(
        <div className={styles.container}>
          {toastQueue.map((t) => (
            <Toast key={t.id} text={t.text} type={t.type} />
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
