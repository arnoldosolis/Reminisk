import "./App.css";
import { Route, Switch } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import RegistrationPage from "./pages/RegistrationPage";

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
      </Switch>
    </div>
  );
}

export default App;
