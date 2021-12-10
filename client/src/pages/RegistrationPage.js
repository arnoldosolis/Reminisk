import styles from "./RegistrationPage.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "../components/Modal";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Helper/Context";

function RegistrationPage() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [regSuccessModal, setRegSuccessModal] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  let history = useHistory();

  Axios.defaults.withCredentials = true;

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

  //checks if user has logged in before and redirects to home page if so
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.logIn === true) {
        setLoggedIn(true);
        history.push("/home");
      }
      else{ setLoggedIn(false); }
    });
  }, []);

  return (
      <div id={styles.bg}>
        <button type="button" id={styles.back} onClick={() => history.push("/")}>
          <i className="material-icons left">arrow_back</i>Back
        </button>
        <form id={styles.registrationForm} onSubmit={addUser}>
          <div id={styles.formName}>Create Reminisk Account</div>
          <span className={styles.inputLabel}>Name</span>
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
          <span className={styles.inputLabel}>Username</span>
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
          <span className={styles.inputLabel}>Password</span>
          <input
            type="password"
            id="password"
            name="password"
            pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
            title="Must contain at least one number, one lowercase letter, one uppercase letter, and must be at least 8 or more characters"
            placeholder="Enter Password"
            maxLength="255"
            required
            onChange={(event) => {
              setPassword(event.target.value);
            }}
          />
          <span className={styles.inputLabel}>E-Mail</span>
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
          <button>Join Reminisk</button>
        </form>
        {regSuccessModal && <Modal onClick={redirectToLogin} display={"Registration Successful!"} />}   
      </div> 
  );
}

export default RegistrationPage;
