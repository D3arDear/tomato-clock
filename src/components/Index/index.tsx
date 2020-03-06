import React from "react";
import Button from "@material-ui/core/Button";

const Index: React.FunctionComponent<any> = (props) => {
  const login = () => {
    props.history.push("/login");
  };
  return (
    <div>
      <Button onClick={login} variant="contained">
        登录
      </Button>
    </div>
  );
};

export default Index;
