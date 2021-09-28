import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  return (
    <div>
      <div className={styles.box}>
        <h1 className={styles.Reminisk}>Reminisk</h1>
      </div>
      <div className={styles.box2}>
        <div className={styles.loginFormBox}>
          <form>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Enter Username"
              required
              minLength="2"
              maxLength="16"
            ></input>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter Password"
              required
              minLength="6"
              maxLength="16"
            ></input>
            <button>Log In</button>
            <Link to="/registration">
              <button type="button" id={styles.register}>Sign Up<i className="material-icons right">arrow_forward</i></button>
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
