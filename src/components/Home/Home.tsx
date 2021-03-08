import React, { useEffect, useState } from "react";
// import Button from "@material-ui/core/Button";
import axios from "src/config/axios";
import "./Home.scss";
import UserMenu from "./userMenu";
import Todos from "src/components/Todos/Todos";
import { MenuItem, makeStyles, ListItemIcon, Toolbar, Typography, AppBar } from "@material-ui/core";
import { ExitToApp } from "@material-ui/icons";
import Tomatoes from "src/tomato/Tomatoes";
import Statistics from "../Statistics/Statistics";
import SvgIcon from "./svgIcon";
import ReferenceFooter from "./ReferenceFooter";
import { motion } from "framer-motion";
import { moveAndFade } from "src/config/animation";

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
    boxShadow:
      "0 4px 4px -4px rgba(0,0,0,0.2),0px 5px 5px -5px rgba(0,0,0,0.14), 0px 10px 10px -10px rgba(0,0,0,0.12)",
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
      const response = await axios.get("user/me");
      setUser({ account: response.data.data });
    };
    getMe();
  }, []);
  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={moveAndFade}>
      <div>
        <div className="home">
          <AppBar className={classes.appBar} color="transparent" position="static">
            <Toolbar variant="dense" className="home-header">
              <div className="home-header-icon">
                {SvgIcon(30, { filter: "drop-shadow(0px 0px 2px #f0492c)" })}
                <div>
                  <Typography variant="h6">番茄闹钟</Typography>
                </div>
              </div>
              <div className="home-header-userButton">
                <UserMenu username={user.account}>
                  {/* <MenuItem className={classes.menuItem}>
                <ListItemIcon>
                  <Settings fontSize="small"></Settings>
                </ListItemIcon>
                偏好设置
              </MenuItem> */}
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
        <ReferenceFooter />
      </div>
    </motion.div>
  );
};

export default Home;
