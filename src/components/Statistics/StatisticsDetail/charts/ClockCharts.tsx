import React, { useMemo } from "react";

interface ClockChartsProps {
  width: number;
}

const ClockCharts: React.FC<ClockChartsProps> = (props) => {
  const { width } = props;
  const svgWidth = useMemo(() => (width > 720 ? width / 2 - 10 : width - 10), [
    width,
  ]);
  const circleR = useMemo(() => svgWidth / 5, [svgWidth]);
  console.log(svgWidth);
  return (
    <div className="ClockCharts">
      <svg height={circleR * 2} width={circleR * 2}>
        <circle
          cx={circleR}
          cy={circleR}
          r={circleR}
          fill="none"
          stroke="#f6f6f6"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default ClockCharts;
