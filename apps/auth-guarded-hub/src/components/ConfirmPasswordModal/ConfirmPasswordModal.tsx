import {
  Button,
  LoadingSpinner,
  Modal,
  useToastersStore
} from "@react-lab-mono/ui";
import axios from "axios";
import { ROUTES, type RouteKey } from "../../api/routes";
import { useMutate } from "../../hooks/useMutate";
import styles from "./ConfirmPasswordModal.module.css";

type Props = {
  showModal: boolean;
  onClose: () => void;
  onPasswordVerified: () => Promise<void>;
};

export const ConfirmPasswordModal = ({
  showModal,
  onClose,
  onPasswordVerified
}: Props) => {
  const { enQueueToast } = useToastersStore();

  const { mutate, isLoading } = useMutate({
    url: ROUTES.CONFIRM_EMAIL as RouteKey,
    type: "post"
  });

  const handleCheckPassword = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const formData = {
      password: String(fd.get("password"))
    };

    await mutate(formData, {
      onSuccess: () => {
        void onPasswordVerified();
        onClose();
      },
      onError: (err) => {
        let errorMessage = "Something went wrong! Try again!";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message ?? errorMessage;
        }
        enQueueToast("error", errorMessage);
      }
    });
  };

  return (
    <Modal onClose={onClose} showModal={showModal}>
      <form className={styles.confirmForm} onSubmit={handleCheckPassword}>
        <label htmlFor="password">Confirm your password</label>
        <input id="password" name="password" required type="password" />

        {isLoading ? (
          <LoadingSpinner size="md" />
        ) : (
          <div className={styles.formActions}>
            <Button fillMode="outline" size="sm" type="submit">
              Confirm
            </Button>
            <Button
              fillMode="outline"
              onClick={onClose}
              size="sm"
              type="reset"
              variant="white"
            >
              Cancel
            </Button>
          </div>
        )}
      </form>
    </Modal>
  );
};
