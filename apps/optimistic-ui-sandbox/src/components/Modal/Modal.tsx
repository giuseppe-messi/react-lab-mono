import styles from "./Modal.module.css";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { createPortal } from "react-dom";
import { useOnClickOutside } from "@react-lab-mono/ui/hooks/useOnClickOutside";
import { useRef, type ReactNode } from "react";

type ModalProps = {
  title?: string;
  showModal: boolean;
  onClose?: () => void;
  children: ReactNode;
};

export const Modal = ({ title, showModal, onClose, children }: ModalProps) => {
  const nodeRef = useRef(null);
  useOnClickOutside(nodeRef, () => onClose?.());

  return (
    <>
      {showModal &&
        createPortal(
          <div
            className={styles.overlay}
            role="dialog"
            aria-modal="true"
            aria-labelledby="modal-title"
            aria-describedby="modal-desc"
          >
            <div ref={nodeRef} className={styles.modal} tabIndex={-1}>
              {onClose && (
                <CloseIcon className={styles.closeIcon} onClose={onClose} />
              )}
              <header>
                <h2>{title}</h2>
              </header>
              {children}
            </div>
          </div>,
          document.body
        )}
    </>
  );
};
