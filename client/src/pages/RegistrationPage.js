import styles from "./RegistrationPage.module.css";
import { Link } from "react-router-dom";
import { useState } from "react";
import Axios from "axios";
import Modal from "../components/Modal";
import { useHistory } from "react-router-dom";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [regSuccessModal, setRegSuccessModal] = useState(false);
  let history = useHistory();

  function addUser (event) {
    //prevents page from refreshing after form submission
    event.preventDefault();
    //sends post request to local server
    Axios.post("http://localhost:3001/createUserInfo", {
      name: name,
      email: email,
    }).then(() => {
      console.log("User information successfully posted");
    });

    //sends post request to local server
    Axios.post("http://localhost:3001/createUserCred", {
      username: username,
      password: password,
    }).then(() => {
      console.log("User credentials successfully posted");
      setRegSuccessModal(true);
    });
  };

  function redirectToLogin() {
    history.push("/");
  }

  return (
      <div className={styles.bg}>
        <form className={styles.registrationForm} onSubmit={addUser}>
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
            onChange={(event) => {
              setName(event.target.value);
            }}
          />
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter Username"
            required
            minLength="2"
            maxLength="16"
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter Password"
            required
            minLength="6"
            maxLength="16"
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <label htmlFor="email">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter E-Mail"
            required
            onChange={(event) => {
              setEmail(event.target.value);
            }}
          />
          <button id={styles.join}>Join Reminisk</button>
        </form>
        {regSuccessModal && <Modal onClick={redirectToLogin} display={"Registration Successful!"} />}
      </div> 
  );
}

export default RegistrationPage;
