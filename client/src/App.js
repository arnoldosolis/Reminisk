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

function App() {
  return (
    <div>
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
            <Route exact path="/home" component={VideoBackground} />
            <Route exact path="/survey" component={Survey} />
            <Route exact path="/journal">
              <JournalPage />
            </Route>
            {/* <Route exact path="/mapit" component{}/> */}
            {/* <Route exact path="/profile" component{}/> */}
            <Footer />
          </>
        </ScrollToTop>
      </Switch>
    </div>
  );
}

export default App;
