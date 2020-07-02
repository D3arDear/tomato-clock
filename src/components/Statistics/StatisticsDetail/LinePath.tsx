import React, { useMemo } from "react";
import { Tomato } from "src/store/tomatoState";
import { Todo } from "src/store/todoState";

import { format } from "date-fns";
import _ from "lodash";
import { Tooltip, makeStyles } from "@material-ui/core";

interface LinePathProps {
  width: number;
  data: Tomato[] | Todo[];
  selectedDate: Date[];
  isTomato?: boolean;
}

const useStyles = makeStyles({
  root: {
    backgroundColor: "rgb(255, 124, 54)",
  },
  arrow: {
    color: "rgb(255, 124, 54)",
  },
});

const LinePath: React.FC<LinePathProps> = (props) => {
  const classes = useStyles();
  const { width, data, selectedDate, isTomato } = props;
  const chartWidth = useMemo(() => width - 20, [width]);
  const groupedData = useMemo(
    () =>
      isTomato
        ? _.groupBy(data as Tomato[], (tomato) => {
            return format(Date.parse(tomato.ended_at!), "yyyy-MM-dd");
          })
        : _.groupBy(data as Todo[], (todo) => {
            return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
          }),
    [data, isTomato]
  );
  const count =
    (selectedDate[1].getTime() - selectedDate[0].getTime()) /
      (3600 * 1000 * 24) +
    1;
  const days = useMemo(() => {
    const dateArr = [];
    for (let i = 0; i < count; i++) {
      dateArr.push(
        format(
          new Date(selectedDate[0].getTime() + 3600 * 1000 * 24 * i),
          "yyyy-MM-dd"
        )
      );
    }
    return dateArr;
  }, [count, selectedDate]);
  const points = useMemo(() => {
    const dates = Object.keys(groupedData).sort((a, b) => {
      return Date.parse(a) - Date.parse(b);
    });
    const verticalRange = dates.reduce(
      (a, b) => (groupedData[b].length > a ? groupedData[b].length : a),
      0
    );
    return days.map((day, index) => {
      const x = (index / (count - 1)) * chartWidth + 10;
      const y =
        (1 - (groupedData[day] ? groupedData[day].length / verticalRange : 0)) *
          180 +
        10;
      return [x, y, groupedData[day] ? groupedData[day].length : 0];
    });
  }, [chartWidth, count, days, groupedData]);
  console.log(classes);

  return (
    <div className="LinePath">
      <svg width={chartWidth} height="210">
        <rect x={10} y={10} width={chartWidth} height={180} />
        <path
          stroke="rgb(255, 124, 54)"
          strokeWidth="2.5"
          d={points.reduce(
            (a, b) => a.concat(`${b.slice(0, 2).join(",")},`),
            "M"
          )}
        />
        {points.map((point, index) => (
          <text key={index} x={point[0] - 5} y="210">
            {(index + 1) % 2 === 0 ? "" : index + 1}
          </text>
        ))}
        {points.map((point, index) => (
          <Tooltip
            key={index}
            classes={{
              tooltip: classes.root,
              arrow: classes.arrow,
            }}
            placement="top"
            title={`${point[2]}`}
            arrow
          >
            <circle r="5" cx={point[0]} cy={point[1]} />
          </Tooltip>
        ))}
      </svg>
    </div>
  );
};

export default LinePath;
