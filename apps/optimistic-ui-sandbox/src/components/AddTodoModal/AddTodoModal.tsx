import { Button, InputText, Modal } from "@react-lab-mono/ui";
import { useEffect } from "react";
import styles from "./AddTodoModal.module.css";

export type AddTodoModalProps = {
  showModal: boolean;
  valueRef: React.RefObject<HTMLInputElement | null>;
  handleAddTodo: (e: React.FormEvent<HTMLFormElement>) => void;
  handleHideModal: () => void;
};

export const AddTodoModal = ({
  showModal,
  valueRef,
  handleAddTodo,
  handleHideModal
}: AddTodoModalProps) => {
  useEffect(() => {
    if (showModal && valueRef.current) {
      valueRef.current.focus();
    }
  }, [showModal, valueRef]);

  return (
    <Modal onClose={handleHideModal} showModal={showModal} title="New Todo">
      <form className={styles.modalForm} onSubmit={handleAddTodo}>
        <InputText
          id="new-todo"
          name="todo input"
          placeholder="Enter todo label"
          ref={valueRef}
          required
        />
        <div className={styles.modalActions}>
          <Button type="submit">Add</Button>
          <Button onClick={handleHideModal}>Close</Button>
        </div>
      </form>
    </Modal>
  );
};
