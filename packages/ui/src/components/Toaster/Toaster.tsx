import { createPortal } from "react-dom";
import { Toast } from "../Toast/Toast";
import { useToastersStore } from "../../stores/useToastersStore/useToastersStore";
import styles from "./Toaster.module.css";

export const Toaster = () => {
  const toastQueue = useToastersStore((state) => state.toastQueue);

  return (
    <>
      {createPortal(
        <div className={styles.container}>
          {toastQueue.map((t) => (
            <Toast id={t.id} key={t.id} text={t.text} type={t.type} />
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
