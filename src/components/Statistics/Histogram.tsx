import React, { useMemo } from "react";
import { format } from "date-fns";

interface HistogramProps {
  data: any;
  width: number;
}

const Histogram: React.FunctionComponent<HistogramProps> = (props) => {
  const { data, width } = props;
  console.log("data", data);
  const spacePercentage = 0.3;
  const histogramWidth = useMemo(() => width * (1 - spacePercentage), [width]);
  const rectWidth = useMemo(() => (histogramWidth / 7) * 0.6, [histogramWidth]);

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
    console.log("rectPoints -> dates", dates);
    const verticalRange = dates.reduce(
      (a, b) => (data[b].length > a ? data[b].length : a),
      0
    );
    const points = [];
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
            x: width - histogramWidth + (index * rectWidth) / 0.6,
            y: (1 - data[formatDate(index)].length / verticalRange) * 60,
            width: rectWidth,
            height: (data[formatDate(index)].length / verticalRange) * 60,
          }
        : {
            x: width - histogramWidth + (index * rectWidth) / 0.6,
            y: 57,
            width: rectWidth,
            height: 3,
          };
    });
  }, [data, histogramWidth, rectWidth, width]);
  console.log("rectPoints", rectPoints);

  return (
    <div className="Histogram">
      <svg width="100%" height="60">
        {rectPoints.map((point: any, index) => (
          <rect
            fill="rgba(255, 179, 113, 0.1)"
            stroke="rgba(255, 179, 113, 0.5)"
            strokeWidth="1"
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
