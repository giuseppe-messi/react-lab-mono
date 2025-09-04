import clsx from "clsx";
import { useRef } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { tierMap } from "../../helpers/tierMap";
import styles from "./Profile.module.css";

const Profile = () => {
  const user = useAuth();
  const planRef = useRef<HTMLSelectElement | null>(null);

  const handleChangePlan = () => {
    const plan = Number(planRef.current?.value);
    const answer = confirm(
      `\n Let's just pretend this is a payment gataway! \n\n Do you want to swith to a ${tierMap[plan].label} plan?`
    );
  };

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
                  <td>{user.name}</td>
                  <td>{user.lastname}</td>
                  <td>{user.email}</td>
                  <td>{user.tier} Plan</td>
                </tr>
              </tbody>
            </table>
          </section>
          <section className={clsx("card", styles.upgradeSection)}>
            <h2>Settings</h2>

            <p>
              You are currently on a <strong>{user.tier}</strong> plan!
            </p>
            <div className={styles.upgradeBox}>
              <p>Upgrade:</p>
              <select
                defaultValue={1}
                id="plan"
                name="plan"
                onChange={handleChangePlan}
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
