import React, { useEffect, useState, useRef } from "react";

interface Props {
  timer: number;
  onFinished: () => void;
}

const CountDown: React.FunctionComponent<Props> = (props) => {
  const { timer, onFinished } = props;
  const [countDown, setCountDown] = useState(timer);

  const min = Math.floor(countDown / 1000 / 60);
  const second = Math.floor((countDown / 1000) % 60);
  const time = `${min}:${second < 10 ? `0${second}` : `${second}`}`;

  const timerIdRef = useRef(0);

  useEffect(() => {
    timerIdRef.current = window.setInterval(() => {
      setCountDown((c) => c - 1000);
    }, 1000);
    return () => {
      window.clearInterval(timerIdRef.current);
    };
  }, []);

  useEffect(() => {
    if (countDown <= 0) {
      onFinished();
      window.clearInterval(timerIdRef.current);
    }
  }, [countDown, onFinished]);

  return <div className="countDown">{time}</div>;
};

export default CountDown;
