import React, { useMemo } from "react";
import { CircleTrick, CircleNumber } from "./ClockCommon";

interface ClockChartsProps {
  width: number;
  bestMoment: any;
  timeData: any;
}

const ClockCharts: React.FC<ClockChartsProps> = (props) => {
  const { width, bestMoment, timeData } = props;

  const pieStroke = 5;
  const svgWidth = useMemo(() => (width > 720 ? width / 2 - 10 : width - 10), [width]);
  const circleR = useMemo(() => (svgWidth / 5 > 100 ? 100 : svgWidth / 5), [svgWidth]);
  const arcCircumference = useMemo(() => (circleR - pieStroke) * 2 * Math.PI, [circleR]);
  const circleData = useMemo(() => {
    const bestCount = timeData[bestMoment].count;
    const startAng = (time: number) => (time > 11 ? time - 12 : time);
    const endAng = (time: number) => (time > 11 ? time - 12 + 1 : time + 1);
    return timeData.map((time: any) => {
      return {
        color: `rgba(255, 124, 54,${(bestCount === 0 ? 0 : time.count / bestCount) * 0.6})`,
        startAng: startAng(parseInt(time.time)) * 30,
        endAng: endAng(parseInt(time.time)) * 30,
        dashedOffset: arcCircumference - (1 / 12) * arcCircumference,
        style: {
          transform: `rotate(${-120 + (startAng(parseInt(time.time)) + 1) * 30}deg)`,
          transition: `0.35s stroke-dashoffset`,
          transformOrigin: `${circleR}px ${circleR}px`,
        },
      };
    });
  }, [bestMoment, circleR, arcCircumference, timeData]);
  const pieData = useMemo(() => {
    const pieStrokePrefix = 2.5 * pieStroke;
    const bestCount = timeData[bestMoment].count;
    const startAng = (time: number) => (time > 11 ? time - 12 : time);
    const endAng = (time: number) => (time > 11 ? time - 12 + 1 : time + 1);
    return timeData.map((time: any) => {
      return {
        startAng: startAng(parseInt(time.time)),
        endAng: endAng(parseInt(time.time)),
        x0:
          circleR +
          (circleR - pieStrokePrefix) *
            Math.cos(-Math.PI / 2 + startAng(parseInt(time.time)) * ((Math.PI * 2) / 12)),
        y0:
          circleR +
          (circleR - pieStrokePrefix) *
            Math.sin(-Math.PI / 2 + startAng(parseInt(time.time)) * ((Math.PI * 2) / 12)),
        x1:
          circleR +
          (circleR - pieStrokePrefix) *
            Math.cos(-Math.PI / 2 + endAng(parseInt(time.time)) * ((Math.PI * 2) / 12)),
        y1:
          circleR +
          (circleR - pieStrokePrefix) *
            Math.sin(-Math.PI / 2 + endAng(parseInt(time.time)) * ((Math.PI * 2) / 12)),
        color: `rgba(255, 124, 54,${(bestCount === 0 ? 0 : time.count / bestCount) * 0.6})`,
      };
    });
  }, [bestMoment, circleR, timeData]);
  return (
    <div className="ClockCharts">
      <svg height={circleR * 2 + 10} width={circleR * 2 + 10}>
        <circle
          cx={circleR}
          cy={circleR}
          r={circleR - 2}
          fill="rgb(253,253,253)"
          stroke="#ddd"
          strokeWidth="4"
        />
        <symbol id="tick">
          <line
            x1={circleR}
            y1="0"
            x2={circleR}
            y2={pieStroke * 2}
            stroke="#999"
            strokeWidth="2"></line>
        </symbol>
        <circle
          cx={circleR}
          cy={circleR}
          r={circleR - pieStroke}
          fill="none"
          stroke="#aaaaaa13"
          strokeWidth={`${pieStroke * 2}`}
          strokeLinecap="round"
          // strokeDashoffset={arcCircumference}
        />
        {pieData.map((time: any, index: number) => (
          <path
            id={`${index}`}
            stroke="rgb(253,253,253)"
            strokeWidth={pieStroke}
            strokeLinejoin="round"
            key={index}
            d={`M ${circleR} ${circleR},L ${time.x0} ${time.y0},A ${circleR},${circleR} 0 0,1 ${time.x1} ${time.y1},Z`}
            fill={`${time.color}`}
          />
        ))}
        {CircleTrick(circleR)}
        {CircleNumber(circleR, bestMoment, pieStroke * 4)}
        <circle cx={circleR} cy={circleR} r={circleR * 0.2} fill="rgb(253,253,253)" />
        {circleData.map((arc: any, index: number) => (
          <circle
            key={index}
            cx={circleR}
            cy={circleR}
            r={circleR - pieStroke}
            fill="none"
            stroke={arc.color}
            strokeWidth={`${pieStroke * 2}`}
            // strokeLinecap="round"
            strokeDashoffset={arc.dashedOffset}
            strokeDasharray={arcCircumference}
            style={arc.style}
          />
        ))}
      </svg>
    </div>
  );
};

export default ClockCharts;
