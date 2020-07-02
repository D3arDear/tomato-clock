import React, { useMemo } from "react";
import "./StatisticsDetail.scss";
import { Todo } from "src/store/todoState";
import { Tomato } from "src/store/tomatoState";
import { DateRange } from "@material-ui/pickers";
import LinePath from "./LinePath";
import BestMoment from "./StatisticsDetail-BestDay";

interface StatisticsDetailItemProps {
  data: Todo[] | Tomato[];
  selectedDate: DateRange;
  width: number;
  isTomato: boolean;
}

const StatisticsDetailItem = (props: StatisticsDetailItemProps) => {
  const { data, selectedDate, width, isTomato } = props;
  const currentSelectedDates = useMemo(
    () =>
      selectedDate[0] && selectedDate[1]
        ? [selectedDate[0], selectedDate[1]]
        : [
            new Date(new Date().getFullYear(), new Date().getMonth(), 1),
            new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0),
          ],
    [selectedDate]
  );

  const howManyDays = useMemo(
    () =>
      (currentSelectedDates[1].getTime() - currentSelectedDates[0].getTime()) /
      (3600 * 1000 * 24),
    [currentSelectedDates]
  );

  const lastMonthDates = useMemo(
    () => [
      new Date(
        currentSelectedDates[0].getFullYear(),
        currentSelectedDates[0].getMonth() - 1,
        1
      ),
      new Date(
        currentSelectedDates[1].getFullYear(),
        currentSelectedDates[1].getMonth(),
        0
      ),
    ],
    [currentSelectedDates]
  );

  const dataFilter: <T>(
    data: T[],
    time: "completed_at" | "ended_at",
    dateRange: Date[]
  ) => T[] = (data, time, dateRange) => {
    return data.filter(
      (item: any) =>
        new Date(item[time as "completed_at" | "ended_at"]) > dateRange[0] &&
        new Date(item[time as "completed_at" | "ended_at"]) < dateRange[1]
    );
  };

  const currentMonthEvents = useMemo(
    () =>
      isTomato
        ? dataFilter(data as Tomato[], "ended_at", currentSelectedDates)
        : dataFilter(data as Todo[], "completed_at", currentSelectedDates),
    [currentSelectedDates, data, isTomato]
  );
  const lastMonthEvents = useMemo(
    () =>
      isTomato
        ? dataFilter(data as Tomato[], "ended_at", lastMonthDates)
        : dataFilter(data as Todo[], "completed_at", lastMonthDates),
    [data, isTomato, lastMonthDates]
  );
  const increaseRate = useMemo(() => {
    let rate =
      (currentMonthEvents.length - lastMonthEvents.length) /
      currentMonthEvents.length;
    if (Math.abs(rate) === Infinity) {
      rate = 1;
    } else if (!rate) {
      rate = 0;
    }
    return parseFloat(rate.toFixed(2));
  }, [currentMonthEvents.length, lastMonthEvents.length]);

  return (
    <div className="TodoStatisticsDetail">
      <header className="TodoStatisticsDetail-header">
        <div>
          <p>{currentMonthEvents.length}</p>
          <span>总数</span>
        </div>
        <div>
          <p>{(currentMonthEvents.length / howManyDays).toFixed(2)}</p>
          <span>日平均数</span>
        </div>
        <div>
          <p
            style={{
              color: `${
                increaseRate > 0
                  ? "rgba(255, 179, 113, 1)"
                  : "rgba(94, 170, 163, 1)"
              }`,
            }}
          >
            {increaseRate > 0 ? +increaseRate : increaseRate}
          </p>
          <span>月增长数</span>
        </div>
      </header>
      <main className="TodoStatisticsDetail-main">
        <LinePath
          isTomato={isTomato}
          data={currentMonthEvents}
          width={width}
          selectedDate={currentSelectedDates}
        />
      </main>
      <footer>
        <BestMoment data={currentMonthEvents} />
      </footer>
    </div>
  );
};

export default StatisticsDetailItem;
