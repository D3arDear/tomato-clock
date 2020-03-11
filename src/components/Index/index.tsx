import React, { useEffect, useState } from "react";
// import Button from "@material-ui/core/Button";
import axios from "src/config/axios";
import "./index.scss";
import UserMenu from "./userMenu";
import Todos from "src/components/Todos/Todos";
import { MenuItem, makeStyles, ListItemIcon, Toolbar, Typography, AppBar } from "@material-ui/core";
import { ExitToApp, Settings } from "@material-ui/icons";

interface IndexState {
  account: string;
}

const useStyles = makeStyles({
  menuItem: {
    fontSize: "14px",
  },
});

const Index: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const [user, setUser] = useState<IndexState>({ account: "" });

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
    <div className="index">
      <AppBar color="default">
        <Toolbar variant="dense" className="index-header">
          <Typography variant="h6">LOGO</Typography>
          <div className="index-header-userButton">
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
      <main className="index-main">
        <div className="index-main-clock">这里是闹钟</div>
        <Todos></Todos>
      </main>
    </div>
  );
};

export default Index;
