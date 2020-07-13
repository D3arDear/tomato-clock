import React, { useMemo } from "react";
import { CircleTrick, CircleNumber } from "./ClockCommon";

interface ClockChartsProps {
  width: number;
}

const ClockCharts: React.FC<ClockChartsProps> = (props) => {
  const { width } = props;
  const svgWidth = useMemo(() => (width > 720 ? width / 2 - 10 : width - 10), [
    width,
  ]);
  const circleR = useMemo(() => svgWidth / 5, [svgWidth]);
  return (
    <div className="ClockCharts">
      <svg height={circleR * 2} width={circleR * 2}>
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
        {CircleTrick(circleR)}
        {CircleNumber(circleR)}
        <circle
          cx={circleR}
          cy={circleR}
          r={circleR}
          fill="rgba(248,248,248,0.1)"
          stroke="#ddd"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default ClockCharts;
