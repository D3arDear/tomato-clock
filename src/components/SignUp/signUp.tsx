import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import "./signUp.scss";
import { makeStyles } from "@material-ui/core";
import axios from "src/config/axios";
import { History } from "history";
import { AxiosResponse } from "axios";
import SvgIcon from "../Home/svgIcon";
import ReferenceFooter from "../Home/ReferenceFooter";
import { motion } from "framer-motion";
import { moveAndFade } from "src/config/animation";

interface State {
  username: string;
  password: string;
  passwordConfirmation: string;
}
interface Props extends React.FunctionComponent {
  history: History;
}
const useStyles = makeStyles({
  title: {
    fontWeight: "normal",
    fontSize: "35px",
    color: "rgba(255, 179, 113, 1)",
    marginBottom: "20px",
  },
  subTitle: {
    fontSize: "14px",
    color: "rgba(255, 179, 113, 1)",
    lineHeight: "1",
  },
  buttonWrapper: {
    display: "flex",
    marginTop: "14px",
  },
  buttonWrapperWithError: {
    display: "flex",
    marginTop: "0",
  },
  button: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    width: "50%",
    marginTop: "10px",
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    marginRight: "10px",
    color: "white",
    height: 40,
    padding: "0 30px",
  },
  secondaryButton: {
    height: 40,
    marginTop: "10px",
    padding: "0 30px",
    width: "50%",
  },
  input: {
    width: "100%",
  },
  paper: {
    width: "700px",
    "@media (max-width:800px)": {
      maxWidth: "300px",
      boxShadow: "none",
    },
    display: "flex",
    boxShadow:
      "0px 3px 3px -2px rgba(0,0,0,0.2), 0px 3px 4px 0px rgba(0,0,0,0.14), 0px 1px 8px 0px rgba(0,0,0,0.12)",
    borderRadius: "4px",
    overflow: "hidden",
  },
  card: {
    width: "50%",
    "@media (max-width:800px)": {
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      flexDirection: "column",
    },
    padding: "50px 40px 60px 40px",
  },
  cover: {
    display: "flex",
    flex: "1",
    justifyContent: "center",
    alignItems: "center",
    "@media (max-width:800px)": {
      display: "none",
    },
    background: "linear-gradient(45deg, #fe6b6b 30%, #FF8E53 90%)",
  },
});

const SignUp: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [userForm, setUserForm] = useState<State>({
    username: "",
    password: "",
    passwordConfirmation: "",
  });
  const [error, setError] = useState<string>("");
  const { username, password, passwordConfirmation } = userForm;
  const handleChange = (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
    setUserForm({
      ...userForm,
      [prop]: event.target.value,
    });
  };
  const submit = async () => {
    await axios
      .post("user/register", {
        username: username,
        password,
        password_confirmation: passwordConfirmation,
      })
      .then(
        () => {
          props.history.push("/");
        },
        (error) => {
          const response: AxiosResponse = error.response;
          setError(response.data.msg);
        }
      );
  };
  const linkTo = () => {
    props.history.push("/login");
  };
  return (
    <motion.div initial="initial" animate="enter" exit="exit" variants={moveAndFade}>
      <div className="signUp">
        <div className="signUp-wrapper">
          <div className={classes.paper}>
            <div className={classes.card}>
              <div className={classes.title}>
                <div>注册</div>
                <div className={classes.subTitle}>注册账号以保存您的番茄进度</div>
              </div>
              <TextField
                className={classes.input}
                margin="dense"
                required
                label="用户名"
                placeholder="用户名"
                variant="filled"
                value={username}
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
                value={password}
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
                value={passwordConfirmation}
                onChange={handleChange("passwordConfirmation")}
              />
              <div className={classes.subTitle}>{error}</div>
              <div className={error ? classes.buttonWrapperWithError : classes.buttonWrapper}>
                <Button
                  className={classes.button}
                  color="secondary"
                  onClick={submit}
                  variant="contained">
                  注册
                </Button>
                <Button className={classes.secondaryButton} color="primary" onClick={linkTo}>
                  登录
                </Button>
              </div>
            </div>
            <div className={classes.cover}>
              {SvgIcon(240, { filter: "drop-shadow(0px 0px 10px #f0492c)" })}
            </div>
          </div>
        </div>
        <ReferenceFooter />
      </div>
    </motion.div>
  );
};

export default SignUp;
