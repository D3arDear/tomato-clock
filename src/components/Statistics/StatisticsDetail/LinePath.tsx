import React, { useMemo } from "react";
import { Tomato } from "src/store/tomatoState";
import { Todo } from "src/store/todoState";

import { format } from "date-fns";
import _ from "lodash";

interface LinePathProps {
  width: number;
  data: Tomato[] | Todo[];
  selectedDate: Date[];
  isTomato: boolean;
}

const LinePath: React.FC<LinePathProps> = (props) => {
  const { width, data, selectedDate, isTomato } = props;
  const chartWidth = useMemo(() => width - 10, [width]);
  const groupedData = useMemo(
    () =>
      isTomato
        ? _.groupBy(data as Todo[], (todo) => {
            return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
          })
        : _.groupBy(data as Tomato[], (tomato) => {
            return format(Date.parse(tomato.ended_at!), "yyyy-MM-dd");
          }),
    [data, isTomato]
  );
  console.log("groupedData ", groupedData);
  console.log(chartWidth, data, selectedDate);

  return <div></div>;
};

export default LinePath;
