import styles from "./AddNoteModal.module.css";
import { Button } from "../Button/Button";
import { Modal } from "../Modal/Modal";
import { useEffect } from "react";

type AddTodoModalProps = {
  showModal: boolean;
  valueRef: React.RefObject<HTMLTextAreaElement | null>;
  handleAddNote: (e: React.FormEvent<HTMLFormElement>) => void;
  handleHideModal: () => void;
};

export const AddNoteModal = ({
  showModal,
  valueRef,
  handleAddNote,
  handleHideModal
}: AddTodoModalProps) => {
  useEffect(() => {
    if (showModal && valueRef.current) {
      valueRef.current.focus();
    }
  }, [showModal, valueRef]);

  return (
    <Modal title="New Note" showModal={showModal} onClose={handleHideModal}>
      <form className={styles.modalForm} onSubmit={handleAddNote}>
        <textarea
          ref={valueRef}
          name="note"
          id="new-note"
          placeholder="Enter some text"
          aria-label="Note label"
          required
        ></textarea>

        <div className={styles.modalActions}>
          <Button type="submit" text="Add" />
          <Button text="Close" onClick={handleHideModal} />
        </div>
      </form>
    </Modal>
  );
};
