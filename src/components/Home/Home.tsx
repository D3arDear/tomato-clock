import React, { useEffect, useState } from "react";
// import Button from "@material-ui/core/Button";
import axios from "src/config/axios";
import "./Home.scss";
import UserMenu from "./userMenu";
import Todos from "src/components/Todos/Todos";
import { MenuItem, makeStyles, ListItemIcon, Toolbar, Typography, AppBar } from "@material-ui/core";
import { ExitToApp, Settings } from "@material-ui/icons";
import Tomatoes from "src/tomato/Tomatoes";
import Statistics from "../Statistics/Statistics";

interface HomeState {
  account: string;
}

const useStyles = makeStyles({
  menuItem: {
    fontSize: "14px",
  },
  appBar: {
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    boxShadow: "0 4px 4px -4px rgba(0,0,0,0.2),0px 5px 5px -5px rgba(0,0,0,0.14), 0px 10px 10px -10px rgba(0,0,0,0.12)",
  },
});

const Home: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState<HomeState>({ account: "" });

  const login = () => {
    props.history.push("/login");
  };
  const logout = () => {
    localStorage.setItem("x-token", "");
    login();
  };
  useEffect(() => {
    const getMe = async () => {
      const response = await axios.get("me");
      setUser(response.data);
    };
    getMe();
  }, []);
  return (
    <div className="home">
      <AppBar className={classes.appBar} color="transparent" position="static">
        <Toolbar variant="dense" className="home-header">
          <Typography variant="h6">番茄闹钟</Typography>
          <div className="home-header-userButton">
            <UserMenu username={user.account}>
              <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <Settings fontSize="small"></Settings>
                </ListItemIcon>
                偏好设置
              </MenuItem>
              <MenuItem className={classes.menuItem} onClick={logout}>
                <ListItemIcon>
                  <ExitToApp fontSize="small"></ExitToApp>
                </ListItemIcon>
                注销
              </MenuItem>
            </UserMenu>
          </div>
        </Toolbar>
      </AppBar>
      <main className="home-main">
        <div className="home-main-clock">
          <Tomatoes></Tomatoes>
        </div>
        <div className="home-main-todo">
          <Todos></Todos>
        </div>
      </main>
      <main className="home-main">
        <Statistics />
      </main>
    </div>
  );
};

export default Home;
