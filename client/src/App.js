import "./App.css";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import VideoBackground from "./components/VideoBackground";

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
        <Route path="/home" >
          <Navbar />
          <VideoBackground />
          <Footer />
        </Route>
        <Route path="/journal" >
          <Navbar />
          {/* Insert and Import Journal Component */}
          <Footer />
        </Route>
        <Route path="/survey" >
          <Navbar />
          {/* Insert and Import Survey Component */}
          <Footer />
        </Route>
        <Route path="/map" >
          <Navbar />
          {/* Insert and Import MapIt Component */}
          <Footer />
        </Route>
        <Route path="/profile" >
          <Navbar />
          {/* Insert and Import Profile Component */}
          <Footer />
        </Route>
      </Switch>
      </Router>
    </div>
  );
}

export default App;
