import { useRef, useState } from "react";
import axios from "axios";
import { Button, LoadingSpinner, useToastersStore } from "@react-lab-mono/ui";
import clsx from "clsx";
import { useAuth, type User } from "../../contexts/AuthContext";
import { useMutate } from "../../hooks/useMutate";
import { ROUTES, type RouteKey } from "../../api/routes";
import { PLAN_TIER, type Plan } from "../../interfaces/plan";
import { ConfirmPasswordModal } from "../../components/ConfirmPasswordModal/ConfirmPasswordModal";
import styles from "./Profile.module.css";

const Profile = () => {
  const auth = useAuth();
  const refresh = auth?.refresh;
  const setUser = auth?.setUser;
  const user = auth?.user;
  const isLoadingUser = auth?.isLoadingUser;
  const [isEditing, setIsEditing] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [pendingForm, setPendingForm] = useState<Omit<User, "password">>();
  const { enQueueToast } = useToastersStore();
  const planRef = useRef<HTMLSelectElement | null>(null);

  const { mutate: deleteUser } = useMutate({
    url: ROUTES.USERS as RouteKey,
    method: "delete"
  });

  const { mutate, isLoading: isSaving } = useMutate<Omit<User, "password">>({
    url: ROUTES.USERS as RouteKey,
    method: "put"
  });

  const handleSave = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const formData = {
      name: String(fd.get("name")),
      lastname: String(fd.get("lastname")),
      email: String(fd.get("email")),
      plan: String(fd.get("plan")) as Plan
    };

    setPendingForm(formData);
    setShowConfirmModal(true);
  };

  const handlePasswordVerified = async () => {
    if (!pendingForm) return;

    await mutate(pendingForm, {
      onSuccess: (data) => {
        enQueueToast("sucess", "Successfully updated!");
        void refresh?.();
        setUser?.(data);
        toggleEditing();
      },
      onError: (err) => {
        let errorMessage = "Update failed!";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message ?? errorMessage;
        }
        enQueueToast("error", errorMessage);
      }
    });
  };

  const handleDeleteAccount = async () => {
    const answer = confirm("Are you sure you want to delete your account?");

    if (!answer) return;

    await deleteUser(pendingForm, {
      onSuccess: () => {
        enQueueToast("sucess", "Account deleted!");
        void refresh?.();
        setUser?.(null);
      },
      onError: (err) => {
        let errorMessage = "Deleting your account failed!";
        if (axios.isAxiosError(err)) {
          errorMessage = err.response?.data?.message ?? errorMessage;
        }
        enQueueToast("error", errorMessage);
      }
    });
  };

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const isLoading = isLoadingUser || isSaving;

  return (
    <div className={clsx("container", styles.profileContainer)}>
      <header className="hero">
        <h1>Profile</h1>
      </header>

      {Boolean(isLoading) && <LoadingSpinner />}

      {!isLoading && !user && (
        <section className="card">
          <p className={styles.lead}>Login or register to see your profile.</p>
        </section>
      )}

      {!isLoading && Boolean(user) && (
        <section className="card">
          {!isEditing && (
            <div className={styles.btnBox}>
              <Button
                className={styles.editBtn}
                onClick={toggleEditing}
                size="sm"
                type="button"
                variant="warning"
              >
                Edit
              </Button>
            </div>
          )}

          <form action="" className={styles.form} onSubmit={handleSave}>
            {Boolean(isEditing) && (
              <div className={styles.btnBox}>
                <Button
                  className={styles.editBtn}
                  size="sm"
                  type="submit"
                  variant="warning"
                >
                  Save
                </Button>
                <Button
                  className={styles.editBtn}
                  fillMode="outline"
                  onClick={toggleEditing}
                  size="sm"
                  type="button"
                >
                  Cancel
                </Button>
              </div>
            )}
            <table className={styles.profileTable}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Last name</th>
                  <th>Email</th>
                  <th>Subscription</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    {isEditing ? (
                      <input
                        defaultValue={user?.name}
                        name="name"
                        type="text"
                      />
                    ) : (
                      user?.name
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        defaultValue={user?.lastname}
                        name="lastname"
                        type="text"
                      />
                    ) : (
                      user?.lastname
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <input
                        defaultValue={user?.email}
                        name="email"
                        type="email"
                      />
                    ) : (
                      user?.email
                    )}
                  </td>
                  <td>
                    {isEditing ? (
                      <select
                        defaultValue={user?.plan}
                        id="plan"
                        name="plan"
                        ref={planRef}
                      >
                        <option value={PLAN_TIER.FREE}>FREE</option>
                        <option value={PLAN_TIER.BASIC}>BASIC</option>
                        <option value={PLAN_TIER.PRO}>PRO</option>
                      </select>
                    ) : (
                      `${user?.plan} Plan`
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </form>

          <div className={styles.deleteAccountBox}>
            <Button onClick={handleDeleteAccount}>Delete your account</Button>
          </div>
        </section>
      )}
      <ConfirmPasswordModal
        onClose={() => {
          setShowConfirmModal(false);
        }}
        onPasswordVerified={handlePasswordVerified}
        showModal={showConfirmModal}
      />
    </div>
  );
};

export default Profile;
