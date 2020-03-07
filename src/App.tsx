import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Index from "./components/Index/index";
import Login from "./components/Login/Login";
import SignUp from "./components/SignUp/signUp";
import { scopeClassMaker } from "./helper/classes";
import "./App.scss";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core";
const sc = scopeClassMaker("app-page");

const theme = createMuiTheme({
  palette: {
    common: { black: "rgba(15, 11, 11, 1)", white: "rgba(248, 248, 248, 1)" },
    background: { paper: "#fff", default: "#fafafa" },
    primary: {
      light: "rgba(255, 225, 143, 1)",
      main: "rgba(255, 179, 113, 1)",
      dark: "rgba(255, 138, 73, 1)",
      contrastText: "rgba(255, 255, 255, 1)",
    },
    secondary: {
      light: "rgba(134, 231, 217, 1)",
      main: "rgba(94, 170, 163, 1)",
      dark: "rgba(28, 126, 118, 1)",
      contrastText: "#fff",
    },
    error: { light: "#e57373", main: "#f44336", dark: "#d32f2f", contrastText: "#fff" },
    text: {
      primary: "rgba(0, 0, 0, 0.87)",
      secondary: "rgba(0, 0, 0, 0.54)",
      disabled: "rgba(0, 0, 0, 0.38)",
      hint: "rgba(0, 0, 0, 0.38)",
    },
  },
});

export default function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <Router>
        <div className={sc("wrapper")}>
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
    </MuiThemeProvider>
  );
}

// You can think of these components as "pages"
// in your app.
