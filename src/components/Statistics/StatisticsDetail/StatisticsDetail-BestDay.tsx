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
    return [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ].map((item) =>
      dataGrouper("cccc")[item]?.length
        ? { time: item, count: dataGrouper("cccc")[item].length }
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
  console.log(timeData(), "time");
  console.log(weekData(), "week");
  return (
    <div className="BestMoment">
      <div className="BestMoment-bestDay">
        <div className="BestMoment-bestDay-detail">
          <span>最佳工作日</span>
          <span>{`${findMax(weekData()).time}`}</span>
          <span>{`比平均值高出${findMax(weekData()).rate}`}</span>
        </div>
      </div>
      <div className="BestMoment-bestTime">
        <div className="BestMoment-bestTime-detail">
          <span>最佳工作时间</span>
          <span>{`${findMax(timeData()).time}`}</span>
          <span>{`比平均值高出${findMax(timeData()).rate}`}</span>
        </div>
      </div>
    </div>
  );
};

export default BestMoment;
