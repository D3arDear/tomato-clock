import React, { useState, useMemo } from "react";
import axios from "src/config/axios";
import CountDown from "./countDown";
import { observer } from "mobx-react";
// import { useForceUpdate } from "src/hooks/useForceUpdate";
import "./tomatoAction.scss";
import TomatoActionButton from "./TomatoActionButton";
import AbortConfirm from "./AbortConfirm";
import TomatoInput from "./TomatoInput";

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: boolean;
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
  lastFinishedTomatoTime: Date;
}

const TomatoAction: React.FunctionComponent<Props> = observer((props) => {
  const { startTomato, unfinishedTomato, lastFinishedTomatoTime } = props;
  // const forceUpdate = useForceUpdate();
  const timeNow = new Date().getTime();
  const startedAt = Date.parse(unfinishedTomato && unfinishedTomato.started_at);
  const duration = unfinishedTomato ? unfinishedTomato.duration : 0;

  const [open, setOpen] = useState(false);
  const toggleConfirm = (params: boolean) => {
    setOpen(params);
  };

  const updateTomato = async (params: any) => {
    const response = await axios.put(
      `tomatoes/${props.unfinishedTomato.id}`,
      params
    );
    await props.updateTomato(response.data.resource);
  };

  const currentTime = useMemo(() => {
    return duration - timeNow + startedAt;
  }, [duration, startedAt, timeNow]);

  const onFinished = () => {};

  const abortTomato = () => {
    toggleConfirm(false);
    updateTomato({ aborted: true });
    document.title = "番茄闹钟";
  };

  const ifBreak = useMemo(() => {
    return timeNow - lastFinishedTomatoTime.getTime() < 1000 * 5 * 60;
  }, [lastFinishedTomatoTime, timeNow]);

  const breakTime = useMemo(() => {
    return 1000 * 5 * 60 - timeNow + lastFinishedTomatoTime.getTime();
  }, [lastFinishedTomatoTime, timeNow]);

  return unfinishedTomato === undefined ? (
    ifBreak ? (
      <div className="tomatoAction">
        <CountDown
          timer={breakTime}
          onFinished={onFinished}
          duration={1000 * 5 * 60}
          onPressClear={() => {}}
          isBreakTime
        ></CountDown>
      </div>
    ) : (
      <div className="tomatoAction">
        <TomatoActionButton startTomato={startTomato} />
      </div>
    )
  ) : timeNow - startedAt > duration ? (
    <div className="tomatoAction">
      <div className="tomatoAction-input">
        <TomatoInput
          updateTomato={updateTomato}
          onPressClear={() => {
            toggleConfirm(true);
          }}
        />
      </div>
      <div className="abort">
        <AbortConfirm
          open={open}
          toggleConfirm={toggleConfirm}
          abortTomato={abortTomato}
        ></AbortConfirm>
      </div>
    </div>
  ) : (
    <div className="tomatoAction">
      <CountDown
        timer={currentTime}
        onFinished={onFinished}
        duration={duration}
        onPressClear={() => {
          toggleConfirm(true);
        }}
      ></CountDown>
      <div className="abort">
        <AbortConfirm
          open={open}
          toggleConfirm={toggleConfirm}
          abortTomato={abortTomato}
        ></AbortConfirm>
      </div>
    </div>
  );
});

export default TomatoAction;
