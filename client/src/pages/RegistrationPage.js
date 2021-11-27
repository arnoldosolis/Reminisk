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
  
  var passwordInput = document.getElementById("password");
  var letter = document.getElementById("letter");
  var capital = document.getElementById("capital");
  var number = document.getElementById("number");
  var length = document.getElementById("length");
  
  //When the user clicks on the password field, show the message box
  passwordInput.onfocus = function() {
  document.getElementById("message").style.display = "block";
  }

  //When the user clicks off of the password field, hide the message box
  passwordInput.onblur = function() {
    document.getElementById("message").style.display = "none";
  }

  //When the user starts to type something inside the password field, validate certain requirements
  passwordInput.onkeyup = function() {
    //Validate lowercase letters
    var lowercaseLetters = /[a-z]/g;
    if(passwordInput.value.match(lowercaseLetters)){
      letter.classList.remove("invalid");
      letter.classList.add("valid");
    }
    else {
      letter.classList.remove("valid");
      letter.classList.add("invalid");
    }
    
    //Validate capital letters
    var capitalLetters = /[A-Z]/g;
    if(passwordInput.value.match(capitalLetters)){
      capital.classList.remove("invalid");
      capital.classList.add("valid");
    }
    else {
      capital.classList.remove("valid");
      capital.classList.add("invalid");
    }

    //Validate numbers
    var numbers = /[0-9]/g;
    if(passwordInput.value.match(numbers)){
      number.classList.remove("invalid");
      number.classList.add("valid");
    }
    else {
      number.classList.remove("valid");
      number.classList.add("invalid");
    }

    //Validate length
    if(passwordInput.value.length >= 8){
      length.classList.remove("invalid");
      length.classList.add("valid");
    }
    else {
      length.classList.remove("valid");
      length.classList.add("invalid");
    }
  };
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

        <div id="message">
          <p id="letter" class="invalid">r</p>
          <p id="capital" class="invalid"></p>
          <p id="number" class="invalid"></p>
          <p id="length" class="invalid"></p>
        </div>
        
      </div> 
  );
}

export default RegistrationPage;
