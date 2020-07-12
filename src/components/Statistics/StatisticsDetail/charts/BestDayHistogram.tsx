import React, { useMemo } from "react";
// import { Tomato } from "src/store/tomatoState";
// import { Todo } from "src/store/todoState";
interface BestDayHistogramProps {
  data: { time: string; count: number }[];
  width: number;
  bestDay: string;
}

const BestDayHistogram: React.FC<BestDayHistogramProps> = (props) => {
  const { data, bestDay, width } = props;
  const svgWidth = useMemo(() => (width > 720 ? width / 2 - 10 : width - 10), [
    width,
  ]);
  const rectWidthPercentage = 0.2;
  const rectWidth = useMemo(() => (svgWidth / 7) * rectWidthPercentage, [
    svgWidth,
  ]);
  const rectPoints = useMemo(() => {
    const verticalRange = data.filter((item) => item.time === bestDay)[0].count;
    return data.map((day, index) => {
      return {
        x: (svgWidth / 7) * index + 10,
        y: (1 - day.count / verticalRange) * 77,
        width: rectWidth,
        height: day.count === 0 ? 3 : (day.count / verticalRange) * 77,
      };
    });
  }, [bestDay, data, rectWidth, svgWidth]);
  console.log(rectPoints);

  return (
    <div className="BestDayHistogram">
      <svg width={svgWidth} height="80">
        <linearGradient id="histogramFill" gradientTransform="rotate(90)">
          <stop offset="30%" stopColor="rgba(255, 124, 54, 0.8)" />
          <stop offset="90%" stopColor="rgba(255, 179, 113, 0.8)" />
        </linearGradient>
        {rectPoints.map((point: any, index) => (
          <rect
            fill="url('#histogramFill')"
            stroke="rgba(255, 124, 54, 1)"
            strokeWidth="0"
            key={index}
            x={point.x}
            y={point.y}
            height={point.height}
            width={point.width}
          ></rect>
        ))}
      </svg>
    </div>
  );
};

export default BestDayHistogram;
