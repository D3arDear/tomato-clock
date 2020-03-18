import React from "react";
import { Button } from "@material-ui/core";
import axios from "src/config/axios";

interface Props {}

const TomatoAction: React.FunctionComponent<Props> = () => {
  const startTomato = async () => {
    const response = await axios.post("tomatoes", { duration: 25 * 60 * 1000 });
    console.log(response.data);
  };
  return (
    <div className="TomatoAction">
      <Button className="startTomatoButton" onClick={startTomato}>
        开始番茄
      </Button>
      这里是闹钟
    </div>
  );
};

export default TomatoAction;
