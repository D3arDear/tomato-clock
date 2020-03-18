import React from "react";
import { Button } from "@material-ui/core";

interface Props {
  startTomato: () => void;
  unfinishedTomato: any;
}

const TomatoAction: React.FunctionComponent<Props> = (props) => {
  const { startTomato } = props;
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
