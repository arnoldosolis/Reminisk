import styles from "./RegistrationPage.module.css";
import { Link } from "react-router-dom";

function RegistrationPage() {
  return (
    <div className={styles.bg}>
      <form className={styles.registrationForm}>
        <div>
          <Link to="/">
            <button type="button" id={styles.back}>
              <i className="material-icons left">arrow_back</i>Back
            </button>
          </Link>
        </div>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter Your Name"
          required
        ></input>
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
        <label htmlFor="email">E-Mail</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter E-Mail"
          required
        ></input>
        <button id={styles.join}>Join Reminisk</button>
      </form>
    </div>
  );
}

export default RegistrationPage;
