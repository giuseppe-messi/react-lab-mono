import { createPortal } from "react-dom";
import clsx from "clsx";
import { Toast } from "../Toast/Toast";
import { useToastersStore } from "../../stores/useToastersStore/useToastersStore";
import styles from "./Toaster.module.css";

type ToasterProps = {
  className?: string;
};

export const Toaster = ({ className }: ToasterProps) => {
  const toastQueue = useToastersStore((state) => state.toastQueue);

  return (
    <>
      {createPortal(
        <div className={clsx(styles.container, className)}>
          {toastQueue.map((t) => (
            <Toast id={t.id} key={t.id} text={t.text} type={t.type} />
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
