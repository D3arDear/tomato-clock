import React, { useState, useMemo } from "react";
import { Button, TextField, IconButton } from "@material-ui/core";
import axios from "src/config/axios";
import CountDown from "./countDown";
import { Close } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useForceUpdate } from "src/hooks/useForceUpdate";

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: string;
  manually_created: string;
  duration: number;
  extra: any;
  created_at: string;
  updated_at: string;
}
interface Props {
  startTomato: () => void;
  unfinishedTomato: Tomato;
  updateTomato: (params: Tomato) => void;
}

const TomatoAction: React.FunctionComponent<Props> = observer((props) => {
  const { startTomato, unfinishedTomato, updateTomato } = props;
  const forceUpdate = useForceUpdate();
  const timeNow = new Date().getTime();
  const startedAt = Date.parse(unfinishedTomato && unfinishedTomato.started_at);
  const duration = unfinishedTomato ? unfinishedTomato.duration : 0;
  const [description, setDescription] = useState<string>("");

  const addDescription = async () => {
    const response = await axios.put(`tomatoes/${props.unfinishedTomato.id}`, {
      description: description,
      ended_at: new Date(),
    });
    console.log(response.data.resource);
    await updateTomato(response.data.resource);
    setDescription("");
  };

  const currentTime = useMemo(() => {
    return duration - timeNow + startedAt;
  }, [duration, startedAt, timeNow]);

  const pressEnter: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.keyCode === 13 && description !== "") {
      addDescription();
    }
  };

  const onFinished = () => {
    forceUpdate();
  };

  return unfinishedTomato === undefined ? (
    <div className="tomatoAction">
      <Button className="startTomatoButton" onClick={startTomato}>
        开始番茄
      </Button>
    </div>
  ) : timeNow - startedAt > duration ? (
    <div className="tomatoAction">
      <TextField
        placeholder="请输入刚才完成的任务"
        style={{ paddingLeft: 0, width: "100%" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={(e) => pressEnter(e)}
      />
      <IconButton>
        <Close />
      </IconButton>
    </div>
  ) : (
    <CountDown timer={currentTime} onFinished={onFinished}></CountDown>
  );
});

export default TomatoAction;
