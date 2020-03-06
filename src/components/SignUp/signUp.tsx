import React from "react";
import Button from "@material-ui/core/Button";

const SignUp: React.FunctionComponent<any> = (props) => {
  const signUp = () => {
    props.history.push("");
  };
  return (
    <div>
      <Button onClick={signUp} variant="contained">
        注册
      </Button>
    </div>
  );
};

export default SignUp;
