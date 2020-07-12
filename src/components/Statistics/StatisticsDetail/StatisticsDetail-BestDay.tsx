import React, { useMemo, useCallback } from "react";
import { Todo } from "src/store/todoState";
import { Tomato } from "src/store/tomatoState";

import { format } from "date-fns";
import _ from "lodash";
import BestDayHistogram from "./charts/BestDayHistogram";

interface BestMomentProps {
  data: Todo[] | Tomato[];
  isTomato: boolean;
  width: number;
}

const BestMoment: React.FC<BestMomentProps> = (props) => {
  const { data, isTomato } = props;
  const dataGrouper = useCallback(
    (formatType: string) => {
      return isTomato
        ? _.groupBy(data as Tomato[], (tomato) => {
            return format(Date.parse(tomato.ended_at!), formatType);
          })
        : _.groupBy(data as Todo[], (todo) => {
            return format(Date.parse(todo.completed_at!), formatType);
          });
    },
    [data, isTomato]
  );
  const weekData = useMemo(() => {
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
  }, [dataGrouper]);
  const timeData = useMemo(() => {
    return Object.keys(Array.from({ length: 24 })).map((item) =>
      dataGrouper("H")[item]?.length
        ? { time: item, count: dataGrouper("H")[item].length }
        : { time: item, count: 0 }
    );
  }, [dataGrouper]);
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
  return (
    <div className="BestMoment">
      <div className="BestMoment-bestDay">
        <div className="BestMoment-bestDay-detail">
          <h4>最佳工作日</h4>
          <p>{`${findMax(weekData).time}`}</p>
          <span>{`比平均值高出${findMax(weekData).rate}`}</span>
          <BestDayHistogram
            bestDay={`${findMax(weekData).time}`}
            width={props.width}
            data={weekData}
          />
        </div>
      </div>
      <div className="BestMoment-bestTime">
        <div className="BestMoment-bestTime-detail">
          <h4>最佳工作时间</h4>
          <p>{`${findMax(timeData).time}:00~${
            parseInt(findMax(timeData).time) + 1 > 24
              ? 0
              : parseInt(findMax(timeData).time) + 1
          }:00`}</p>
          <span>{`比平均值高出${findMax(timeData).rate}`}</span>
        </div>
      </div>
    </div>
  );
};

export default BestMoment;
