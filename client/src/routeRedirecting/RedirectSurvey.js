import { useEffect } from "react";
import Axios from "axios";
import { useHistory } from "react-router-dom";
import { useContext } from "react";
import { LoginContext } from "../Helper/Context";

function RedirectSurvey() {

  const { loggedIn, setLoggedIn } = useContext(LoginContext);
  let history = useHistory();
  
  Axios.defaults.withCredentials = true;

  //checks if user has logged in before and redirects to survey page if so
  //otherwise they will be redirected to login
  useEffect(() => {
    Axios.get("http://localhost:3001/login").then((response) => {
      if (response.data.logIn === true) {
        setLoggedIn(true);
        history.push("/survey");
      }
      else{ 
        setLoggedIn(false);
        history.push("/");
        }
    });
  }, []);

  return (
    <div></div>
  );
}

export default RedirectSurvey;