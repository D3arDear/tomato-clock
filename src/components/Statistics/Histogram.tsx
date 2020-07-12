import React, { useMemo } from "react";
import { format } from "date-fns";

interface HistogramProps {
  data: any;
  width: number;
}

const Histogram: React.FunctionComponent<HistogramProps> = (props) => {
  const { data, width } = props;
  const spacePercentage = 0.35;
  const rectWidthPercentage = 0.2;
  const histogramWidth = useMemo(() => width * (1 - spacePercentage), [width]);
  const rectWidth = useMemo(() => (histogramWidth / 7) * rectWidthPercentage, [
    histogramWidth,
  ]);

  const rectPoints = useMemo(() => {
    const today = new Date(new Date().toLocaleDateString()).getTime();
    const dates = Object.keys(data)
      .sort((a, b) => {
        return Date.parse(a) - Date.parse(b);
      })
      .filter(
        (date) =>
          new Date(new Date(date).toLocaleDateString()).getTime() >
          today - 1000 * 60 * 60 * 24 * 7
      );
    const verticalRange = dates.reduce(
      (a, b) => (data[b].length > a ? data[b].length : a),
      0
    );
    let points = [];
    for (let i = 0; i < 7; i++) {
      points.push({
        x: 0,
        y: 57,
        width: rectWidth,
        height: 57,
      });
    }
    return points.map((point, index) => {
      const formatDate = (i: number) =>
        format(
          Date.parse(new Date(today - (6 - i) * 3600 * 1000 * 24).toString()),
          "yyyy-MM-dd"
        );
      return dates.indexOf(formatDate(index)) !== -1
        ? {
            x:
              width -
              histogramWidth +
              (index * rectWidth) / rectWidthPercentage,
            y: (1 - data[formatDate(index)].length / verticalRange) * 60,
            width: rectWidth,
            height: (data[formatDate(index)].length / verticalRange) * 60,
          }
        : {
            x:
              width -
              histogramWidth +
              (index * rectWidth) / rectWidthPercentage,
            y: 56,
            width: rectWidth,
            height: 4,
          };
    });
  }, [data, histogramWidth, rectWidth, width]);

  return (
    <div className="Histogram">
      <svg width="100%" height="60">
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
export default Histogram;
