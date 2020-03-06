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
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
        </ul>

        <Switch>
          <Route exact path="/" component={Index} />
          <Route path="/about" component={Login} />
          <Route path="/dashboard" component={SignUp} />
        </Switch>
      </div>
    </Router>
  );
}

// You can think of these components as "pages"
// in your app.
