import React from "react";
import "./Tomatoes.scss";
import TomatoAction from "./TomatoAction";

interface Props {}

const Tomatoes: React.FunctionComponent<Props> = () => {
  return (
    <div className="Tomatoes">
      <TomatoAction></TomatoAction>
    </div>
  );
};

export default Tomatoes;
