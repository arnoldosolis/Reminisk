import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import { LoginContext } from "./Helper/Context"
import { useState } from "react";
import JournalPage from "./pages/JournalPage";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn}}>
      <Router>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <div>
          <Navbar />
          <Route exact path="/home" component={() => <VideoBackground authorized={loggedIn} />} />
          {/* Navbar paths */}
          <Route exact path="/journal">
            <JournalPage authorized={loggedIn} />
          </Route>
          {/* <Route exact path="/survey" component{}/> */}
          {/* <Route exact path="/map" component{}/> */}
          {/* <Route exact path="/profile" component{}/> */}
          {/* Other paths: Upload Journal, Upload Survey, Journal Log, Survey Record*/}
          <Footer />
        </div>
      </Switch> 
      </Router>
    </LoginContext.Provider>
  );
}

export default App;
