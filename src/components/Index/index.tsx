import React, { useEffect, useState } from "react";
import Button from "@material-ui/core/Button";
import axios from "src/config/axios";

interface IndexState {
  account: any;
}

const Index: React.FunctionComponent<any> = (props) => {
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
      try {
        const response = await axios.get("me");
        setUser(response.data);
      } catch (e) {}
    };
    getMe();
  }, [props.history]);
  return (
    <div>
      欢迎{user.account}
      <Button onClick={logout} variant="contained">
        注销
      </Button>
    </div>
  );
};

export default Index;
