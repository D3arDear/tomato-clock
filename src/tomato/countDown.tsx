import React, { useEffect, useState, useRef, useMemo } from "react";
import "./countDown.scss";

interface Props {
  timer: number;
  duration: number;
  onFinished: () => void;
}

const CountDown: React.FunctionComponent<Props> = (props) => {
  const { timer, onFinished, duration } = props;
  const [countDown, setCountDown] = useState(timer);

  const timerIdRef = useRef(0);

  const widthPercentage = useMemo(() => {
    return 1 - countDown / duration;
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
      document.title = `${time} - 番茄闹钟`;
      setCountDown((c) => c - 1000);
    }, 1000);
    return () => {
      window.clearInterval(timerIdRef.current);
    };
  }, [time]);

  useEffect(() => {
    if (countDown < 1000) {
      onFinished();
      window.clearInterval(timerIdRef.current);
      document.title = "番茄闹钟";
    }
  }, [countDown, onFinished]);

  return (
    <div className="countDown">
      <span>{time}</span>
      <div className="progress" style={{ width: `${widthPercentage * 100}%` }} />
    </div>
  );
};

export default CountDown;
