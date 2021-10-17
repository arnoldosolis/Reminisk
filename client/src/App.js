import { Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
<<<<<<< HEAD
import Navbar from "./components/navbar_components/Navbar";
import Footer from "./components/footer_components/Footer";
import VideoBackground from "./components/homepage_components/VideoBackground";
import Survey from "./components/surveypage_components/Survey";
import ScrollToTop from "./components/ScrollToTop";
=======
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import JournalPage from "./pages/JournalPage";
>>>>>>> main

function App() {
  return (
    <div>
<<<<<<< HEAD
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
          <Footer />
        </>
        </ScrollToTop>
      </Switch>
      
=======
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
            <Route exact path="/home" component={VideoBackground} />
            {/* Navbar paths */}
            <Route exact path="/journal">
              <JournalPage />
            </Route>
            {/* <Route exact path="/survey" component{}/> */}
            {/* <Route exact path="/mapit" component{}/> */}
            {/* <Route exact path="/profile" component{}/> */}
            {/* Other paths: Upload Journal, Upload Survey, Journal Log, Survey Record*/}
            <Footer />
          </div>
        </Switch>
      </Router>
>>>>>>> main
    </div>
  );
}

export default App;
