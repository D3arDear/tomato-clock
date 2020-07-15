import React, { useMemo } from "react";
import { Tooltip, makeStyles } from "@material-ui/core";
// import { Tomato } from "src/store/tomatoState";
// import { Todo } from "src/store/todoState";
interface BestDayHistogramProps {
  data: { time: string; count: number }[];
  width: number;
  bestDay: string;
}
const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(255, 124, 54)",
  },
  arrow: {
    color: "rgb(255, 124, 54)",
  },
});

const BestDayHistogram: React.FC<BestDayHistogramProps> = (props) => {
  const classes = useStyles();
  const { data, bestDay, width } = props;
  const week = ["M", "T", "W", "T", "F", "S", "S"];
  const svgWidth = useMemo(() => (width > 720 ? width / 2 - 10 : width - 10), [
    width,
  ]);
  const rectWidthPercentage = 0.1;
  const rectWidth = useMemo(() => (svgWidth / 7) * rectWidthPercentage, [
    svgWidth,
  ]);
  const rectPoints = useMemo(() => {
    const verticalRange = data.filter((item) => item.time === bestDay)[0].count;
    return data.map((day, index) => {
      return {
        x: (svgWidth / 7) * index + 30,
        y: (1 - day.count / verticalRange) * 97 + 10,
        width: rectWidth,
        height: day.count === 0 ? 3 : (day.count / verticalRange) * 100,
      };
    });
  }, [bestDay, data, rectWidth, svgWidth]);

  return (
    <div className="BestDayHistogram">
      <svg width={svgWidth} height="140">
        <linearGradient id="histogramFill" gradientTransform="rotate(90)">
          <stop offset="30%" stopColor="rgba(255, 124, 54, 0.8)" />
          <stop offset="90%" stopColor="rgba(255, 179, 113, 0.8)" />
        </linearGradient>
        {rectPoints.map((point, index) => (
          <Tooltip
            key={index}
            classes={{
              tooltip: classes.root,
              arrow: classes.arrow,
            }}
            placement="top"
            title={`${data[index].count}`}
            arrow
          >
            <rect
              x={point.x - 30}
              y="0"
              fill="rgba(248,248,248,0.5)"
              width={svgWidth / 7}
              height="110"
            />
          </Tooltip>
        ))}
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
        {rectPoints.map((point: any, index) => (
          <text key={index} x={point.x} y="130">
            {week[index]}
          </text>
        ))}
      </svg>
    </div>
  );
};

export default BestDayHistogram;
