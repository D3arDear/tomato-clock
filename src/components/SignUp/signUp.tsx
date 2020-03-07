import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./signUp.scss";
import { makeStyles } from "@material-ui/core";

interface State {
  username: string;
  password: string;
  passwordConformation: string;
}
const useStyles = makeStyles({
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    width: "100%",
    borderRadius: 3,
    marginTop: "10px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
  input: {
    width: "100%",
  },
  paper: {
    minWidth: "300px",
    "@media (max-width:800px)": {
      maxWidth: "300px",
      boxShadow: "none",
    },
    display: "flex",
    boxShadow: "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
    overflow: "hidden",
  },
  card: {
    width: "50%",
    "@media (max-width:800px)": {
      width: "100%",
    },
    padding: "120px 40px 50px 40px",
  },
  cover: {
    display: "flex",
    flex: "1",
    "@media (max-width:800px)": {
      display: "none",
    },
    background: "black",
  },
});

const SignUp: React.FunctionComponent<any> = (props) => {
  const classes = useStyles();
  const [userForm, setUserForm] = useState<State>({
    username: "",
    password: "",
    passwordConformation: "",
  });
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [prop]: event.target.value,
    });
  };
  const signUp = () => {
    props.history.push("");
  };
  return (
    <div className={classes.paper}>
      <div className={classes.card}>
        <TextField
          className={classes.input}
          margin="dense"
          required
          label="用户名"
          placeholder="用户名"
          variant="filled"
          value={userForm.username}
          onChange={handleChange("username")}
        />
        <TextField
          className={classes.input}
          required
          margin="dense"
          type="password"
          label="密码"
          placeholder="密码"
          variant="filled"
          value={userForm.password}
          onChange={handleChange("password")}
        />
        <TextField
          className={classes.input}
          required
          margin="dense"
          type="password"
          label="确认密码"
          placeholder="确认密码"
          variant="filled"
          value={userForm.passwordConformation}
          onChange={handleChange("passwordConformation")}
        />
        <Button className={classes.button} color="secondary" onClick={signUp} variant="contained">
          注册
        </Button>
      </div>
      <div className={classes.cover}></div>
    </div>
  );
};

export default SignUp;
