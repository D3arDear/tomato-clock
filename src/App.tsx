import React from "react";
import { Router, Switch, Route } from "react-router-dom";
import history from "./config/history";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/signUp";
import { scopeClassMaker } from "./helper/classes";
import "./App.scss";
import "./App.css";
import { MuiThemeProvider } from "@material-ui/core";
import theme from "src/config/theme";
import SimpleBar from "simplebar-react";
import "simplebar/dist/simplebar.min.css";

const sc = scopeClassMaker("app-page");

export default function App() {
  return (
    <SimpleBar style={{ maxHeight: "100vh" }}>
      <MuiThemeProvider theme={theme}>
        <Router history={history}>
          <div className={sc("wrapper")}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={Login} />
              <Route path="/signUp" component={SignUp} />
            </Switch>
          </div>
        </Router>
      </MuiThemeProvider>
    </SimpleBar>
  );
}

// You can think of these components as "pages"
// in your app.
