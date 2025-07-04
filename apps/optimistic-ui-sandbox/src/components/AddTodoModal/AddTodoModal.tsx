import styles from "./AddTodoModal.module.css";
import { Button } from "../Button/Button";
import { InputText } from "../InputText/InputText";
import { Modal } from "../Modal/Modal";
import { useEffect } from "react";

type AddTodoModalProps = {
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
    <Modal title="New Todo" showModal={showModal} onClose={handleHideModal}>
      <form className={styles.modalForm} onSubmit={handleAddTodo}>
        <InputText
          ref={valueRef}
          id="new-todo"
          name="todo input"
          placeholder="Enter todo label"
          required
        />
        <div className={styles.modalActions}>
          <Button type="submit" text="Add" />
          <Button text="Close" onClick={handleHideModal} />
        </div>
      </form>
    </Modal>
  );
};
