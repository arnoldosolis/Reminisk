import styles from "./LoginPage.module.css";
import { Link } from "react-router-dom";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  //server processes post request to login
  const login = () =>
  {
    Axios.post
    (
      "http://localhost:3001/login",
      {
        username: username,
        password: password,
      } 
    ).then
    (
      (response) => 
    {
      console.log(response);
    }
    );
  };

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
              onChange=
              {
                (event) => 
                {
                 setUsername(event.target.value);
                }
              }
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
              onChange=
              {
                (event) => 
                {
                 setPassword(event.target.value);
                }
              }
            ></input>
            
            {/* 
              Testing Start
              Registration and Authentication code needed here
              Log In button goes to Home for testing
            */}
            <Link to="/home">
              <button onClick = {login}>Log In</button>
            </Link>
            {/* Testing End*/}

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
