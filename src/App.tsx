import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index/index";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/signUp";

export default function App() {
  return (
    <Router>
      <div>
        <ul>
          <li>
            <Link to="/">Index</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/signUp">SignUp</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/login" component={Login} />
          <Route path="/signUp" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
