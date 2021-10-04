import "./App.css";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";
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
        <Route path="/journalpage">
          <JournalPage />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
