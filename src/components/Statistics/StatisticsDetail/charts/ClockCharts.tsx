import React, { useMemo } from "react";
import { CircleTrick, CircleNumber } from "./ClockCommon";

interface ClockChartsProps {
  width: number;
  bestMoment: any;
  timeData: any;
}

const ClockCharts: React.FC<ClockChartsProps> = (props) => {
  const { width, bestMoment, timeData } = props;

  const svgWidth = useMemo(() => (width > 720 ? width / 2 - 10 : width - 10), [
    width,
  ]);
  const circleR = useMemo(() => (svgWidth / 5 > 110 ? 110 : svgWidth / 5), [
    svgWidth,
  ]);
  const pieStroke = 5;
  const pieData = useMemo(() => {
    const bestCount = timeData[bestMoment].count;
    const startAng = (time: number) => (time > 11 ? time - 12 : time);
    const endAng = (time: number) => (time > 11 ? time - 12 + 1 : time + 1);
    return timeData.map((time: any) => {
      return {
        startAng: startAng(parseInt(time.time)),
        endAng: endAng(parseInt(time.time)),
        x0:
          circleR +
          (circleR - pieStroke) *
            Math.cos(
              -Math.PI / 2 +
                startAng(parseInt(time.time)) * ((Math.PI * 2) / 12)
            ),
        y0:
          circleR +
          (circleR - pieStroke) *
            Math.sin(
              -Math.PI / 2 +
                startAng(parseInt(time.time)) * ((Math.PI * 2) / 12)
            ),
        x1:
          circleR +
          (circleR - pieStroke) *
            Math.cos(
              -Math.PI / 2 + endAng(parseInt(time.time)) * ((Math.PI * 2) / 12)
            ),
        y1:
          circleR +
          (circleR - pieStroke) *
            Math.sin(
              -Math.PI / 2 + endAng(parseInt(time.time)) * ((Math.PI * 2) / 12)
            ),
        color: `rgba(255, 124, 54,${(time.count / bestCount) * 0.6})`,
      };
    });
  }, [bestMoment, circleR, timeData]);
  return (
    <div className="ClockCharts">
      <svg height={circleR * 2 + 10} width={circleR * 2 + 10}>
        <circle
          cx={circleR}
          cy={circleR}
          r={circleR}
          fill="rgb(253,253,253)"
          stroke="#ddd"
          strokeWidth="2"
        />
        <symbol id="tick">
          <line
            x1={circleR}
            y1="0"
            x2={circleR}
            y2="5"
            stroke="#999"
            strokeWidth="1"
          ></line>
        </symbol>
        {pieData.map((time: any, index: number) => (
          <path
            id={`${index}`}
            stroke="rgb(253,253,253)"
            strokeWidth={pieStroke}
            key={index}
            d={`M ${circleR} ${circleR},L ${time.x0} ${time.y0},A ${circleR},${circleR} 0 0,1 ${time.x1} ${time.y1},Z`}
            fill={`${time.color}`}
          />
        ))}
        {CircleTrick(circleR)}
        {CircleNumber(circleR, bestMoment)}
        <circle
          cx={circleR}
          cy={circleR}
          r={circleR * 0.3}
          fill="rgb(253,253,253)"
        />
      </svg>
    </div>
  );
};

export default ClockCharts;
