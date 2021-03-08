import React, { useMemo, Fragment } from "react";
import { DateRange } from "@material-ui/pickers/DateRangePicker/RangeTypes";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import "mobx-react-lite/batchingForReactDom";
import { format } from "date-fns";
import _ from "lodash";
import TomatoHistoryItem from "./TomatoHistoryItem";
import { Tomato } from "src/store/tomatoState";
import "./TomatoHistory.scss";

interface TomatoHistoryProps {
  aborted?: boolean;
  selectedDate: DateRange<Date | null>;
}

const TomatoHistory: React.FC<TomatoHistoryProps> = (props) => {
  const { aborted, selectedDate } = props;
  const { tomatoState } = useStores();
  const { tomatoes } = tomatoState;

  const finishedTomatoes = useMemo(() => {
    const afterFilterTomatoes = tomatoes.filter((tomato) => tomato.ended_at && !tomato.aborted);
    const filterTomatoesWithRange = (tomatoes: any) => {
      return selectedDate[0] !== null && selectedDate[1] !== null
        ? tomatoes.filter(
            (tomato: any) =>
              +new Date(tomato.ended_at) > +new Date(selectedDate[0]!) &&
              +new Date(tomato.ended_at) < +new Date(selectedDate[1]!)?.setHours(24)
          )
        : tomatoes;
    };
    return filterTomatoesWithRange(afterFilterTomatoes);
  }, [selectedDate, tomatoes]);

  const abortedTomatoes = useMemo(() => {
    return selectedDate[0] !== null && selectedDate[1] !== null
      ? tomatoes
          .filter((tomato) => tomato.aborted)
          .filter(
            (tomato) =>
              +new Date(tomato.ended_at) > +new Date(selectedDate[0]!) &&
              +new Date(tomato.ended_at) < +new Date(selectedDate[1]!)?.setHours(24)
          )
      : tomatoes.filter((tomato) => tomato.aborted);
  }, [selectedDate, tomatoes]);

  const dailyFinishedTomatoes = useMemo(() => {
    return _.groupBy(finishedTomatoes, (tomato) => {
      return format(new Date(tomato.ended_at!), "yyyy-MM-dd");
    });
  }, [finishedTomatoes]);

  const dailyAbortedTomatoes = useMemo(() => {
    return _.groupBy(abortedTomatoes, (tomato) => {
      return format(new Date(tomato.ended_at ? tomato.ended_at : tomato.updated_at), "yyyy-MM-dd");
    });
  }, [abortedTomatoes]);

  const finishedDates = useMemo(() => {
    return Object.keys(dailyFinishedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyFinishedTomatoes]);

  const abortedDates = useMemo(() => {
    return Object.keys(dailyAbortedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyAbortedTomatoes]);

  const totalTomatoTime = (tomatoArray: Tomato[]) => {
    let time = 0;
    tomatoArray.forEach((tomato: Tomato) => {
      time += duration(tomato.started_at, tomato.ended_at) / 60 / 60;
    });
    return time;
  };

  const duration = (start: string, end: string) => {
    return (new Date(end).valueOf() - new Date(start).valueOf()) / 1000;
  };

  const doUpdateTomato = (payload: Tomato) => {
    tomatoState.updateTomato(payload);
  };
  const FinishedTomatoList = () => {
    return (
      <Fragment>
        {(!aborted ? finishedDates : abortedDates).map((date) => {
          return (
            <div key={date} className="TomatoHistory-dailyTomatoes">
              {!aborted && (
                <div className="finishedCount-polygon">
                  {dailyFinishedTomatoes[date].map((eachDate, index) => {
                    return (
                      <div
                        key={eachDate.id}
                        className="finishedCount-line"
                        style={{
                          width: `${
                            (duration(eachDate.started_at, eachDate.ended_at) /
                              3600 /
                              totalTomatoTime(dailyFinishedTomatoes[date])) *
                            100
                          }%`,
                          background: `${index % 2 === 0 ? "#ff7c36" : "#F2C086"}`,
                        }}></div>
                    );
                  })}
                </div>
              )}
              <div className="TomatoHistory-dailyTomatoes-summary">
                <p className="TomatoHistory-dailyTomatoes-summary-date">
                  <span>{date}</span>
                  <span>
                    {format(
                      new Date(
                        (!aborted ? dailyFinishedTomatoes : dailyAbortedTomatoes)[date][0][
                          aborted ? "updated_at" : "ended_at"
                        ]
                      ),
                      "eee"
                    )}
                  </span>
                </p>
                <div>
                  <p className="finishedCount">
                    {!aborted ? "完成了" : "打断了"}{" "}
                    {(!aborted ? dailyFinishedTomatoes : dailyAbortedTomatoes)[date].length} 个番茄
                  </p>
                  {!aborted && (
                    <p className="finishedCount">{`总计 ${totalTomatoTime(
                      dailyFinishedTomatoes[date]
                    ).toFixed(2)} 小时`}</p>
                  )}
                </div>
              </div>
              <div className=" TomatoHistory-tomatoList">
                {!aborted
                  ? dailyFinishedTomatoes[date]
                      .sort((a, b) => Date.parse(b.ended_at) - Date.parse(a.ended_at))
                      .map((tomato) => (
                        <TomatoHistoryItem
                          key={tomato.id}
                          {...tomato}
                          updateTomato={doUpdateTomato}
                          itemType="finished"
                        />
                      ))
                  : dailyAbortedTomatoes[date]
                      .sort((a, b) => Date.parse(b.ended_at) - Date.parse(a.ended_at))
                      .map((tomato) => (
                        <TomatoHistoryItem
                          key={tomato.id}
                          {...tomato}
                          updateTomato={doUpdateTomato}
                          itemType="aborted"
                        />
                      ))}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div className="TomatoHistory" id="TomatoHistory">
      <FinishedTomatoList />
    </div>
  );
};

export default observer(TomatoHistory);
