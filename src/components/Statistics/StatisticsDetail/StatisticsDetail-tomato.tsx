import React, { useMemo } from "react";
import "./StatisticsDetail.scss";
import { Tomato } from "src/store/tomatoState";
import { DateRange } from "@material-ui/pickers";
import LinePath from "./LinePath";

interface TomatoStatisticsDetailProps {
  finishedTomatoes: Tomato[];
  selectedDate: DateRange;
  width: number;
}

const TomatoStatisticsDetail = (props: TomatoStatisticsDetailProps) => {
  const { finishedTomatoes, selectedDate, width } = props;
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

  const currentMonthTomatoes = useMemo(
    () =>
      finishedTomatoes.filter(
        (tomato: Tomato) =>
          new Date(tomato.ended_at) > currentSelectedDates[0] &&
          new Date(tomato.ended_at) < currentSelectedDates[1]
      ),
    [currentSelectedDates, finishedTomatoes]
  );
  const lastMonthTomatoes = useMemo(
    () =>
      finishedTomatoes.filter(
        (tomato: Tomato) =>
          new Date(tomato.ended_at) > lastMonthDates[0] &&
          new Date(tomato.ended_at) < lastMonthDates[1]
      ),
    [finishedTomatoes, lastMonthDates]
  );
  const balanceAmongMonth = useMemo(() => {
    let rate =
      (currentMonthTomatoes.length - lastMonthTomatoes.length) /
      currentMonthTomatoes.length;
    if (Math.abs(rate) === Infinity) {
      rate = 1;
    } else if (!rate) {
      rate = 0;
    }
    return rate;
  }, [currentMonthTomatoes.length, lastMonthTomatoes.length]);

  return (
    <div className="TomatoStatisticsDetail">
      <header className="TomatoStatisticsDetail-header">
        <div>
          <p>{currentMonthTomatoes.length}</p>
          <span>总数</span>
        </div>
        <div>
          <p>{(currentMonthTomatoes.length / howManyDays).toFixed(2)}</p>
          <span>日平均数</span>
        </div>
        <div>
          <p
            style={{
              color: `${
                balanceAmongMonth > 0
                  ? "rgba(255, 179, 113, 1)"
                  : "rgba(94, 170, 163, 1)"
              }`,
            }}
          >
            {balanceAmongMonth > 0 ? +balanceAmongMonth : balanceAmongMonth}
          </p>
          <span>月增长数</span>
        </div>
      </header>
      <main className="TomatoStatisticsDetail-main">
        <LinePath
          data={currentMonthTomatoes}
          width={width}
          selectedDate={currentSelectedDates}
          isTomato
        />
      </main>
      <footer>这里是最佳工作日</footer>
    </div>
  );
};

export default TomatoStatisticsDetail;
