import { useAuth } from "../../contexts/AuthContext";
import styles from "./Home.module.css";

export default function Home() {
  const user = useAuth();

  return (
    <div className="container">
      <header className="hero">
        <h1>Auth-Guarded Hub</h1>
        <p className="sub">
          A focused demo of protected routes with server-side sessions
          (HTTP-only cookie), built with React, Netlify Functions, Prisma, and
          Neon Postgres.
        </p>
      </header>

      <section className="card">
        {user ? (
          <h2 className={styles.h2}>This content is now visible to view</h2>
        ) : (
          <h2 className={styles.h2}>
            Content only visible to Logged in users!
          </h2>
        )}
      </section>

      <section className="card">
        <h2 className={styles.h2}>What this is</h2>
        <p className="lead">
          This project showcases a production-style auth flow that keeps
          sensitive tokens off the client. The UI is a small, readable codebase
          that demonstrates how I approach structure, accessibility, state, and
          “real app” concerns without the noise.
        </p>
      </section>

      <section className="card">
        <h2 className={styles.h2}>How to explore</h2>
        <ul className={styles.list}>
          <li>
            Start here on <code>/</code> for the overview.
          </li>
          <li>
            Create an account at <code>/signup</code>, then sign in at{" "}
            <code>/signin</code>.
          </li>
          <li>
            Visit protected areas like <code>/dashboard</code> and{" "}
            <code>/account</code>.
          </li>
          <li>
            Use <code>/logout</code> to end the session and return to public
            pages.
          </li>
        </ul>
        <p className="muted">
          You won’t see the session token in DevTools — it’s stored in an{" "}
          <b>HTTP-only</b> cookie so JavaScript cannot access it.
        </p>
      </section>

      <section className="card">
        <h2 className={styles.h2}>Auth &amp; session model (high-level)</h2>
        <ul className={styles.list}>
          <li>
            <b>Credentials → Server:</b> Sign-in happens on the server (Netlify
            Function).
          </li>
          <li>
            <b>Password safety:</b> Passwords are hashed with bcrypt and
            compared server-side.
          </li>
          <li>
            <b>Session creation:</b> Server creates a session (random token,
            expiry) and sets an <b>HTTP-only, Secure, SameSite=Lax</b> cookie.
          </li>
          <li>
            <b>Auth checks:</b> Protected pages call a small “who am I”
            endpoint; server validates the cookie against the session and
            returns user info.
          </li>
          <li>
            <b>Logout:</b> Server deletes the session and instructs the browser
            to clear the cookie.
          </li>
        </ul>
        <p className="muted">
          This design avoids storing tokens in <code>localStorage</code> or
          exposing them to client JS, reducing the blast radius of XSS and
          common token-leak patterns.
        </p>
      </section>
    </div>
  );
}
