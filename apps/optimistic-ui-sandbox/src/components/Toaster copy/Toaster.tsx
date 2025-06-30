import styles from "./Toaster.module.css";
import { createPortal } from "react-dom";
import { Typography } from "../Typography/Typography";
import { useTostersStore } from "../../stores/useToastersStore";

export const Toaster = () => {
  const queue = useTostersStore((state) => state.queue);

  return (
    <>
      {createPortal(
        <div className={styles.container}>
          {queue.map((t) => (
            <div>
              <Typography type="body">{t.text}</Typography>
            </div>
          ))}
        </div>,
        document.body
      )}
    </>
  );
};
