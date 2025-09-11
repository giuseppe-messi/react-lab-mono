import clsx from "clsx";
import styles from "./About.module.css";

const About = () => (
  <div className={clsx("container", styles.aboutContainer)}>
    <header className="hero">
      <h1>About</h1>
    </header>

    <section className="card">
      <h2>What this is</h2>
      <p className="lead">
        This project shows a production-style auth flow that keeps sensitive
        content off the client. The UI is intentionally small and easy to read,
        so it highlights how I structure code, handle state, think about
        accessibility, and approach “real app” concerns without extra clutter.
      </p>
    </section>

    <section className="card">
      <h2>How to explore</h2>
      <ul className={styles.list}>
        <li>
          Start on <strong>Home</strong> for a quick overview.
        </li>
        <li>
          Create an account at <strong>/register</strong>, then sign in at{" "}
          <strong>/login</strong>.
        </li>
        <li>
          Check out protected routes like <strong>/profile</strong> and{" "}
          <strong>/home</strong>.
        </li>
        <li>
          Use the <strong>logout</strong> button to end the session and return
          to public pages.
        </li>
      </ul>
      <p className="muted">
        Session tokens won’t appear in DevTools — they’re stored in an{" "}
        <b>HTTP-only</b> cookie that JavaScript can’t touch.
      </p>
    </section>

    <section className="card">
      <h2>Auth &amp; session model</h2>
      <ul className={styles.list}>
        <li>
          <b>Credentials / Server:</b> Sign-in happens in a Netlify Function.
        </li>
        <li>
          <b>Password safety:</b> Passwords are hashed with bcrypt and checked
          server-side.
        </li>
        <li>
          <b>Session creation:</b> The server generates a token with an expiry
          and sets it in an <b>HTTP-only, Secure, SameSite=Lax</b> cookie.
        </li>
        <li>
          <b>Auth checks:</b> Protected routes hit a “verifyMe” endpoint; the
          server validates the cookie and returns user info.
        </li>
        <li>
          <b>Logout:</b> The server clears the session and instructs the browser
          to drop the cookie.
        </li>
      </ul>
      <p className="muted">
        This avoids storing tokens in <code>localStorage</code> or exposing them
        to client JS, which helps limit the impact of XSS and other token-leak
        issues.
      </p>
    </section>
  </div>
);

export default About;
