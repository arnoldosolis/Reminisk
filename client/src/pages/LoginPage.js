import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import Axios from "axios";
import Modal from "../components/Modal";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Helper/Context";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showFailModal, setShowFailModal] = useState(false);
  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  let history = useHistory();
  const [errMessage, setErrMessage] = useState("");

  Axios.defaults.withCredentials = true;

  function login(event) {
    //prevents page from refreshing after form submission
    event.preventDefault();
    //sends post (login) request to local server
    Axios.post("http://localhost:3001/login", {
      username: username,
      password: password,
    }).then((response) => {
      if (response.data.error) {
        //setLoggedIn(false);
        setShowFailModal(true);
      } else {
        console.log(response.data);
        //console.log("testing");
        localStorage.setItem("token", response.data.token)
        setLoggedIn(true);
        history.push("/home");
      }
    });
  }

  //function to retrieve the token
  const userAuthenticated = () => {
    Axios.get("http://localhost:3001/isUserAuth", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    }).then((response) => {
      console.log(response);
    });
  };

  const closeModal = () => {
    setShowFailModal(false);
  };

  //checks if user has logged in before and redirects to home page if so
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.logIn === true) {
        setLoggedIn(true);
        history.push("/home");
      }
    });
  }, []);

  return (
    <div>
      <div className={styles.box}>
        <h1 className={styles.Reminisk}>Reminisk</h1>
      </div>
      <div className={styles.box2}>
        <div className={styles.loginFormBox}>
          <form onSubmit={login}>
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
              placeholder="Enter Password"
              required
              minLength="6"
              maxLength="16"
              onChange={(event) => {
                setPassword(event.target.value);
              }}
            />
            <button>Log In</button>
            <Link to="/registration">
              <button type="button" id={styles.register}>
                Sign Up<i className="material-icons right">arrow_forward</i>
              </button>
            </Link>
          </form>
        </div>
      </div>
      {showFailModal && <Modal onClick={closeModal} display={"Wrong username/password combination"} />}
    </div>
  );
}

export default LoginPage;
