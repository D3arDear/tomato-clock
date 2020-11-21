import React, { useState, useMemo, useEffect } from "react";
import axios from "src/config/axios";
import CountDown from "./countDown";
import { observer } from "mobx-react";
import "./tomatoAction.scss";
import TomatoActionButton from "./TomatoActionButton";
import AbortConfirm from "./AbortConfirm";
import TomatoInput from "./TomatoInput";
import { createNotification } from "src/components/Common/notification";
import { useStores } from "src/hooks/use-stores";

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

  const { justCompletedTodo } = useStores();

  const timeNow = new Date().getTime();
  const startedAt = useMemo(
    () => Date.parse(unfinishedTomato && unfinishedTomato.started_at),
    [unfinishedTomato]
  );
  const duration = unfinishedTomato ? unfinishedTomato.duration : 0;

  const [open, setOpen] = useState(false);
  const [finishedCount, setFinishedCount] = useState(false);
  const [finishedBreak, setFinishedBreak] = useState(false);

  const toggleConfirm = (params: boolean) => {
    setOpen(params);
  };

  const updateTomato = async (params: any) => {
    const response = await axios.put(
      `tomatoes/${props.unfinishedTomato.id}`,
      params
    );
    await props.updateTomato(response.data);
  };

  const currentTime = useMemo(() => {
    return duration + startedAt - timeNow;
  }, [duration, startedAt, timeNow]);

  useEffect(() => {
    if (unfinishedTomato && !justCompletedTodo.onCounting) {
      justCompletedTodo.CountDownStart();
    }
  }, [justCompletedTodo, unfinishedTomato]);

  const onFinishedBreak = () => {
    setFinishedBreak(true);
    createNotification(false);
  };
  const onFinished = () => {
    setFinishedCount(true);
    createNotification(true);
    setFinishedBreak(false);
  };

  const ifCountDown = useMemo(() => {
    return timeNow - startedAt <= duration;
  }, [duration, startedAt, timeNow]);

  const ifBreak = useMemo(() => {
    return timeNow - lastFinishedTomatoTime.getTime() <= 1000 * 60 * 5;
  }, [lastFinishedTomatoTime, timeNow]);

  const abortTomato = () => {
    toggleConfirm(false);
    updateTomato({ aborted: true });
    document.title = "番茄闹钟";
  };

  const doStartTomato = () => {
    startTomato();
    setFinishedCount(false);
  };

  const breakTime = useMemo(() => {
    return 1000 * 5 * 60 - timeNow + lastFinishedTomatoTime.getTime();
  }, [lastFinishedTomatoTime, timeNow]);

  const checkCountdown = !finishedCount && ifCountDown;
  const checkBreak = !finishedBreak && ifBreak;

  return !unfinishedTomato ? ( // 不存在未开始的番茄
    checkBreak ? ( // 休息没完成
      <div className="tomatoAction">
        <CountDown
          timer={breakTime}
          onFinished={() => onFinishedBreak()}
          duration={1000 * 60 * 5}
          onPressClear={() => {}}
          isBreakTime
        ></CountDown>
      </div>
    ) : (
      <div className="tomatoAction">
        <TomatoActionButton startTomato={doStartTomato} />
      </div>
    )
  ) : checkCountdown ? (
    <div className="tomatoAction">
      <CountDown
        timer={currentTime}
        onFinished={() => onFinished()}
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
  ) : (
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
  );
});

export default TomatoAction;
