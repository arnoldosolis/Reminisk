import "./App.css";
import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/navbar_components/Navbar";
import Footer from "./components/footer_components/Footer";
import Home from "./pages/Home";
import Survey from "./components/surveypage_components/Survey";
import ScrollToTop from "./components/ScrollToTop";
import JournalPage from "./pages/JournalPage";
import { LoginContext } from "./Helper/Context"
import Search from "./components/search_components/Search";
import ProfilePage from "./pages/ProfilePage";
import MapIt from "./components/mapit_components/MapIt";
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
            <Route exact path="/home" component={() => <Home authorized={loggedIn} />} />
            <Route exact path="/survey" component={() => <Survey authorized={loggedIn} />} />
            <Route exact path="/journal">
              <JournalPage authorized={loggedIn} />
            </Route>
            <Route exact path="/search" component={() => <Search authorized={loggedIn} />} />
            <Route exact path="/profile" component={() => <ProfilePage authorized={loggedIn} />} />
            <Route exact path="/mapit" component={() => <MapIt authorized={loggedIn} />}/>
            <Footer />
          </>
        </ScrollToTop>
      </Switch>
    </LoginContext.Provider>
  );
}

export default App;
