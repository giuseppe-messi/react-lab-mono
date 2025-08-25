import { useAuth } from "../../contexts/AuthContext";
import styles from "./Profile.module.css";

const Profile = () => {
  const user = useAuth();

  console.log("🚀 ~ Profile ~ user:", user);

  return (
    <div className="container">
      <header className="hero">
        <h2>Profile</h2>
      </header>

      {!user ? (
        <section className="card">
          <p className={styles.lead}>Login or register to see your profile.</p>
        </section>
      ) : (
        <section className="card">
          <h3>Your info:</h3>

          <table className={styles.profileTable}>
            <thead>
              <tr>
                <th>Name</th>
                <th>Last name</th>
                <th>Email</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{user.name}</td>
                <td>{user.lastname}</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
        </section>
      )}
    </div>
  );
};

export default Profile;
