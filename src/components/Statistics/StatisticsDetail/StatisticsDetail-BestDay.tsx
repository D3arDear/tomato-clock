import React from "react";
import { Todo } from "src/store/todoState";
import { Tomato } from "src/store/tomatoState";

import { format } from "date-fns";
import _ from "lodash";

interface BestMomentProps {
  data: Todo[] | Tomato[];
  isTomato: boolean;
}

const BestMoment: React.FC<BestMomentProps> = (props) => {
  const { data, isTomato } = props;
  const dataGrouper = (formatType: string) => {
    return isTomato
      ? _.groupBy(data as Tomato[], (tomato) => {
          return format(Date.parse(tomato.ended_at!), formatType);
        })
      : _.groupBy(data as Todo[], (todo) => {
          return format(Date.parse(todo.completed_at!), formatType);
        });
  };
  const weekData = () => {
    return ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((item) =>
      dataGrouper("eeeeee")[item]?.length
        ? { time: item, count: dataGrouper("eeeeee")[item].length }
        : { time: item, count: 0 }
    );
  };
  const timeData = () => {
    return Object.keys(Array.from({ length: 24 })).map((item) =>
      dataGrouper("H")[item]?.length
        ? { time: item, count: dataGrouper("H")[item].length }
        : { time: item, count: 0 }
    );
  };

  const findMax = (data: any[]) => {
    const max = data.reduce((a, b) => (b.count > a.count ? b : a));
    const sumCount = data.reduce((a, b) => a + b.count, 0);
    return {
      time: max.time,
      rate: `${(
        ((parseInt(max.count) - sumCount / data.length) /
          (sumCount / data.length)) *
        100
      ).toFixed(2)}%`,
    };
  };
  console.log(findMax(timeData()), "time");
  console.log(findMax(weekData()), "week");
  return (
    <div className="BestMoment">
      <div className="BestMoment-bestDay">最佳工作日</div>
      <div className="BestMoment-bestTime">最佳工作时间</div>
    </div>
  );
};

export default BestMoment;
