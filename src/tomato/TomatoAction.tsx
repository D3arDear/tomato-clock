import React, { useState, useMemo } from "react";
import { Button, TextField, IconButton } from "@material-ui/core";
import axios from "src/config/axios";
import CountDown from "./countDown";
import { Close } from "@material-ui/icons";
import { observer } from "mobx-react";
import { useForceUpdate } from "src/hooks/useForceUpdate";
import "./tomatoAction.scss";

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
  const { startTomato, unfinishedTomato } = props;
  const forceUpdate = useForceUpdate();
  const timeNow = new Date().getTime();
  const startedAt = Date.parse(unfinishedTomato && unfinishedTomato.started_at);
  const duration = unfinishedTomato ? unfinishedTomato.duration : 0;
  const [description, setDescription] = useState<string>("");

  const updateTomato = async (params: any) => {
    const response = await axios.put(`tomatoes/${props.unfinishedTomato.id}`, params);
    console.log(response.data.resource);
    await props.updateTomato(response.data.resource);
  };

  const currentTime = useMemo(() => {
    return duration - timeNow + startedAt;
  }, [duration, startedAt, timeNow]);

  const pressEnter: React.KeyboardEventHandler<HTMLDivElement> = (e) => {
    if (e.keyCode === 13 && description !== "") {
      updateTomato({
        description: description,
        ended_at: new Date(),
      });
      setDescription("");
    }
  };

  const onFinished = () => {
    forceUpdate();
  };

  const abortTomato = () => {
    updateTomato({ aborted: true });
  };

  return unfinishedTomato === undefined ? (
    <div className="tomatoAction">
      <Button className="startTomatoButton" onClick={startTomato} color="primary">
        开始番茄
      </Button>
    </div>
  ) : timeNow - startedAt > duration ? (
    <div className="tomatoAction">
      <div className="tomatoAction-input">
        <TextField
          placeholder="请输入刚才完成的任务"
          style={{ paddingLeft: 0, width: "100%" }}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          onKeyUp={(e) => pressEnter(e)}
        />
      </div>
      <div className="abort">
        <IconButton size="small" color="primary" onClick={abortTomato}>
          <Close />
        </IconButton>
      </div>
    </div>
  ) : (
    <div className="tomatoAction">
      <CountDown timer={currentTime} onFinished={onFinished} duration={duration}></CountDown>
      <div className="abort">
        <IconButton size="small" color="primary" onClick={abortTomato}>
          <Close />
        </IconButton>
      </div>
    </div>
  );
});

export default TomatoAction;
