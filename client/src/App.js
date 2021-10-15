import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";
import JournalPage from "./pages/JournalPage";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
