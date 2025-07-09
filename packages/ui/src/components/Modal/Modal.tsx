import { createPortal } from "react-dom";
import { useRef, type ReactNode } from "react";
import { CloseIcon } from "../CloseIcon/CloseIcon";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import styles from "./Modal.module.css";

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
      {showModal
        ? createPortal(
            <div
              aria-describedby="modal-desc"
              aria-labelledby="modal-title"
              aria-modal="true"
              className={styles.overlay}
              role="dialog"
            >
              <div className={styles.modal} ref={nodeRef} tabIndex={-1}>
                {onClose ? (
                  <CloseIcon className={styles.closeIcon} onClose={onClose} />
                ) : null}
                <header>
                  <h2>{title}</h2>
                </header>
                {children}
              </div>
            </div>,
            document.body
          )
        : null}
    </>
  );
};
