import React from "react";
import Button from "@material-ui/core/Button";

const Index: React.FunctionComponent = () => {
  const login = () => {
    console.log("点击了登录");
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
