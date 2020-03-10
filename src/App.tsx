import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./config/history";
import Index from "./components/Index/index";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/signUp";
import { scopeClassMaker } from "./helper/classes";
import "./App.scss";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "src/config/theme";
const sc = scopeClassMaker("app-page");

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <div className={sc("wrapper")}>
          <Switch>
            <Route exact path="/" component={Index} />
            <Route path="/login" component={Login} />
            <Route path="/signUp" component={SignUp} />
          </Switch>
        </div>
      </Router>
    </MuiThemeProvider>
  );
}

// You can think of these components as "pages"
// in your app.
