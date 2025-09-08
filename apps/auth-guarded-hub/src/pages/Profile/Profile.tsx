import clsx from "clsx";
import { useRef, useState } from "react";
import axios from "axios";
import { Button, useToastersStore } from "@react-lab-mono/ui";
import {
  useAuth,
  useSetAuthContext,
  type User
} from "../../contexts/AuthContext";
import { tierMap } from "../../helpers/tierMap";
import styles from "./Profile.module.css";

const Profile = () => {
  const setUser = useSetAuthContext()?.setUser;
  const user = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const { enQueueToast } = useToastersStore();

  const toggleEditing = () => {
    setIsEditing((prev) => !prev);
  };

  const planRef = useRef<HTMLSelectElement | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const input = {
      name: String(fd.get("name")),
      lastname: String(fd.get("lastname")),
      email: String(fd.get("email")),
      plan: "PRO"

      // plan: String(fd.get("plan"))
    };

    try {
      setIsLoading(true);
      const { data } = await axios.put("/api/users", input);
      enQueueToast("sucess", "Successfully updated!");
      setUser?.(data);
    } catch (err) {
      let errorMessage = "Update failed!";

      if (axios.isAxiosError(err)) {
        errorMessage = err.response?.data?.message ?? errorMessage;
      }

      enQueueToast("error", errorMessage);
    } finally {
      setIsLoading(false);
    }

    // await axios.put("api/users", {
    //   ...user,
    // });
  };

  // const handleChangeUser = async (key: any) => {
  //   const plan = Number(planRef.current?.value);
  //   const answer = confirm(
  //     `\n Let's just pretend this is a payment gataway! \n\n Do you want to swith to a ${tierMap[plan].label} plan?`
  //   );

  //   if (answer) {
  //     const confirmPassword = prompt(`\n Ok! Confirm your password please!`);

  //     await axios.put("api/users", {
  //       ...user,
  //       email: user?.email,
  //       confirmPassword,
  //       plan: tierMap[plan].label
  //     });
  //   }
  // };

  return (
    <div className="container">
      <header className="hero">
        <h1>Profile</h1>
      </header>

      {!user ? (
        <section className="card">
          <p className={styles.lead}>Login or register to see your profile.</p>
        </section>
      ) : (
        <>
          <section className="card">
            <h2>Your info</h2>

            {!isEditing && (
              <Button
                className={styles.editBtn}
                onClick={toggleEditing}
                size="sm"
                type="button"
                variant="warning"
              >
                Edit
              </Button>
            )}

            <form action="" onSubmit={handleSubmit}>
              {Boolean(isEditing) && (
                <Button
                  className={styles.editBtn}
                  size="sm"
                  type="submit"
                  variant="warning"
                >
                  Save
                </Button>
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
                          defaultValue={user.name}
                          name="name"
                          type="text"
                        />
                      ) : (
                        user.name
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          defaultValue={user.lastname}
                          name="lastname"
                          type="text"
                        />
                      ) : (
                        user.lastname
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <input
                          defaultValue={user.email}
                          name="email"
                          type="email"
                        />
                      ) : (
                        user.email
                      )}
                    </td>
                    <td>
                      {isEditing ? (
                        <select
                          defaultValue={user.plan}
                          id="plan"
                          name="plan"
                          ref={planRef}
                        >
                          <option value={1}>FREE</option>
                          <option value={2}>BASIC</option>
                          <option value={3}>PRO</option>
                        </select>
                      ) : (
                        `${user.plan} Plan`
                      )}
                    </td>
                  </tr>
                </tbody>
              </table>
            </form>
          </section>

          <section className={clsx("card", styles.upgradeSection)}>
            <h2>Settings</h2>

            <p>
              You are currently on a <strong>{user.plan}</strong> plan!
            </p>
            <div className={styles.upgradeBox}>
              <p>Upgrade:</p>
              <select
                defaultValue={1}
                id="plan"
                name="plan"
                // onChange={handleChangePlan}
                ref={planRef}
              >
                <option value={1}>FREE</option>
                <option value={2}>BASIC</option>
                <option value={3}>PRO</option>
              </select>
            </div>
          </section>
        </>
      )}
    </div>
  );
};

export default Profile;
