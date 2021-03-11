import React, { useEffect, useState, useRef, useMemo } from "react";
import "./countDown.scss";
import { Close } from "@material-ui/icons";
import { IconButton } from "@material-ui/core";

interface Props {
  timer: number;
  duration: number;
  onFinished: () => void;
  onPressClear: () => void;
  isBreakTime?: boolean;
}

const CountDown: React.FunctionComponent<Props> = (props) => {
  const { timer, onFinished, duration, onPressClear } = props;
  const [countDown, setCountDown] = useState(timer);

  const timerIdRef = useRef(0);

  const widthPercentage = useMemo(() => {
    return (1 - countDown / duration) * 100;
  }, [countDown, duration]);

  const second = useMemo(() => {
    return Math.floor((countDown / 1000) % 60);
  }, [countDown]);
  const min = useMemo(() => {
    return Math.floor(countDown / 1000 / 60);
  }, [countDown]);
  const time = useMemo(() => {
    return `${min < 10 ? `0${min}` : `${min}`}:${second < 10 ? `0${second}` : `${second}`}`;
  }, [min, second]);

  useEffect(() => {
    timerIdRef.current = window.setInterval(() => {
      setCountDown((c) => c - 1000);
    }, 1000);
    return () => {
      window.clearInterval(timerIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (countDown < 1000) {
      (() => onFinished())();
      window.clearInterval(timerIdRef.current);
      document.title = "番茄闹钟";
    } else {
      document.title = `${time} - 番茄闹钟`;
    }
  }, [countDown, onFinished, time]);

  return (
    <div className="countDown">
      <div className="circle">
        <div className="circle-cover" />
      </div>
      <hr className="MuiDivider-root makeStyles-divider-126 MuiDivider-vertical"></hr>
      <div className="progress-wrapper">
        <span>{time}</span>
        <div className="progress" style={{ width: `${widthPercentage}%` }} />
      </div>
      <hr className="MuiDivider-root makeStyles-divider-126 MuiDivider-vertical"></hr>
      {!props.isBreakTime && (
        <IconButton size="small" color="primary" onClick={() => onPressClear()}>
          <Close />
        </IconButton>
      )}
    </div>
  );
};

export default CountDown;
