import styles from "./AddTodoModal.module.css";
import { Modal } from "../Modal/Modal";

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
  return (
    <Modal title="New Todo" showModal={showModal} onClose={handleHideModal}>
      <form className={styles.modalForm} onSubmit={handleAddTodo}>
        <input
          ref={valueRef}
          id="new-todo"
          name="label"
          type="text"
          className={styles.modalInput}
          placeholder="Enter todo label"
          aria-label="Todo label"
          required
        />
        <div className={styles.modalActions}>
          <button type="submit">Add</button>
          <button onClick={handleHideModal}>Close</button>
        </div>
      </form>
    </Modal>
  );
};
