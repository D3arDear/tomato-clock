import React from "react";
import "./ClockCharts.scss";

const CircleTrick = (circleR: number) => {
  return Object.keys(Array.from({ length: 4 })).map((item) => (
    <use
      key={item}
      href="#tick"
      transform={`rotate(${parseInt(item) * 90}, ${circleR}, ${circleR})`}
    ></use>
  ));
};

const CircleNumber = (circleR: number) =>
  Object.keys(Array.from({ length: 12 })).map((item: string) =>
    parseInt(item) > 9 || parseInt(item) === 0 ? (
      <text
        className="circleNumber"
        key={item}
        x={
          circleR -
          10 +
          (circleR - 15) *
            Math.cos(-(Math.PI * 2) / 4 + parseInt(item) * ((Math.PI * 2) / 12))
        }
        y={
          circleR +
          5 +
          (circleR - 15) *
            Math.sin(-(Math.PI * 2) / 4 + parseInt(item) * ((Math.PI * 2) / 12))
        }
      >
        {parseInt(item) === 0 ? 12 : parseInt(item)}
      </text>
    ) : (
      <text
        className="circleNumber"
        key={item}
        x={
          circleR -
          5 +
          (circleR - 15) *
            Math.cos(-(Math.PI * 2) / 4 + parseInt(item) * ((Math.PI * 2) / 12))
        }
        y={
          circleR +
          5 +
          (circleR - 15) *
            Math.sin(-(Math.PI * 2) / 4 + parseInt(item) * ((Math.PI * 2) / 12))
        }
      >
        {parseInt(item) === 0 ? 12 : parseInt(item)}
      </text>
    )
  );

export { CircleTrick, CircleNumber };
