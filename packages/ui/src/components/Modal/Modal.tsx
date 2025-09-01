import { createPortal } from "react-dom";
import { useRef, type ReactNode } from "react";
import { XMarkIcon } from "@heroicons/react/16/solid";
import clsx from "clsx";
import { useOnClickOutside } from "../../hooks/useOnClickOutside";
import styles from "./Modal.module.css";

type ModalProps = {
  title?: string;
  showModal: boolean;
  onClose?: () => void;
  children: ReactNode;
  className?: string;
};

export const Modal = ({
  title,
  showModal,
  onClose,
  className,
  children
}: ModalProps) => {
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
              <div
                className={clsx(className, styles.modal)}
                ref={nodeRef}
                tabIndex={-1}
              >
                {onClose ? (
                  <XMarkIcon
                    className={styles.xIcon}
                    onClick={onClose}
                    role="button"
                  />
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
