import React, { useEffect, useState } from "react";
import { Button, TextField } from "@material-ui/core";
import axios from "src/config/axios";
import CountDown from "./countDown";

interface Props {
  startTomato: () => void;
  unfinishedTomato: any;
}

interface SubProps {
  unfinishedTomato: any;
  startTomato: () => void;
}

const TomatoActionButton: React.FunctionComponent<SubProps> = (props) => {
  const { startTomato, unfinishedTomato } = props;
  const timeNow = new Date().getTime();
  const startedAt = Date.parse(unfinishedTomato && unfinishedTomato.started_at);
  const duration = unfinishedTomato ? unfinishedTomato.duration : 0;
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    console.log("unfinishedTomato", unfinishedTomato);
  }, [unfinishedTomato]);

  const addDescription = async () => {
    const response = await axios.put(`tomatoes/${props.unfinishedTomato.id}`, {
      description: description,
      ended_at: new Date(),
    });
    setDescription("");
    console.log(response);
  };

  const pressEnter: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.keyCode === 13 && description !== "") {
      addDescription();
    }
  };

  return unfinishedTomato === undefined ? (
    <div>
      <Button className="startTomatoButton" onClick={startTomato}>
        开始番茄
      </Button>
    </div>
  ) : timeNow - startedAt > duration ? (
    <div>
      <TextField
        placeholder="请输入刚才完成的任务"
        style={{ paddingLeft: 0, width: "100%" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={(e) => pressEnter(e)}
      ></TextField>
    </div>
  ) : (
    <CountDown></CountDown>
  );
};

const TomatoAction: React.FunctionComponent<Props> = (props) => {
  const { startTomato, unfinishedTomato } = props;
  useEffect(() => {
    console.log(unfinishedTomato);
  }, [unfinishedTomato]);

  return (
    <div className="TomatoAction">
      <TomatoActionButton unfinishedTomato={unfinishedTomato} startTomato={startTomato}></TomatoActionButton>
    </div>
  );
};

export default TomatoAction;
