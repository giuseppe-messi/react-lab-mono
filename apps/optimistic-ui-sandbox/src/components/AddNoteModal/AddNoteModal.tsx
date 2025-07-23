import { Button, Modal, TextArea } from "@react-lab-mono/ui";
import { useEffect } from "react";
import styles from "./AddNoteModal.module.css";

export type AddTodoModalProps = {
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
    <Modal onClose={handleHideModal} showModal={showModal} title="New Note">
      <form className={styles.modalForm} onSubmit={handleAddNote}>
        <TextArea
          id="new-note"
          name="new note"
          placeholder="Enter some text"
          ref={valueRef}
          required
        />
        <div className={styles.modalActions}>
          <Button text="Add" type="submit" />
          <Button onClick={handleHideModal} text="Close" />
        </div>
      </form>
    </Modal>
  );
};
