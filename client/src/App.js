import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/navbar_components/Navbar";
import Footer from "./components/footer_components/Footer";
import VideoBackground from "./components/homepage_components/VideoBackground";
import Survey from "./components/surveypage_components/Survey";
import ScrollToTop from "./components/ScrollToTop";
import JournalPage from "./pages/JournalPage";
import { LoginContext } from "./Helper/Context"
import { useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  return (
    <LoginContext.Provider value={{ loggedIn, setLoggedIn}}>
      <Switch>
        <Route path="/" exact>
          <LoginPage />
        </Route>
        <Route path="/registration">
          <RegistrationPage />
        </Route>
        <ScrollToTop>
          <>
            <Navbar />
            <Route exact path="/home" component={() => <VideoBackground authorized={loggedIn} />} />
            <Route exact path="/survey" component={() => <Survey authorized={loggedIn} />} />
            <Route exact path="/journal">
              <JournalPage authorized={loggedIn} />
            </Route>
            {/* <Route exact path="/mapit" component{}/> */}
            {/* <Route exact path="/profile" component{}/> */}
            <Footer />
          </>
        </ScrollToTop>
      </Switch>
    </LoginContext.Provider>
  );
}

export default App;
