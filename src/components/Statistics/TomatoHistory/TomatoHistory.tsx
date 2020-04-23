import React, { useMemo, Fragment } from "react";
import { DateRange } from "@material-ui/pickers/src/DateRangePicker/RangeTypes";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import { format } from "date-fns";
import _ from "lodash";
import TomatoHistoryItem from "./TomatoHistoryItem";

interface TomatoHistoryProps {
  aborted?: boolean;
  selectedDate: DateRange;
}

const TomatoHistory: React.FC<TomatoHistoryProps> = (props) => {
  const { aborted, selectedDate } = props;
  const { tomatoState } = useStores();
  const { tomatoes } = tomatoState;

  const finishedTomatoes = useMemo(() => {
    console.log("selectedDate:", selectedDate);
    const afterFilterTomatoes = tomatoes.filter((tomato) => tomato.ended_at && !tomato.aborted);
    const filterTomatoesWithRange = (tomatoes: any) => {
      return selectedDate[0] !== null && selectedDate[1] !== null
        ? tomatoes.filter(
            (tomato: any) =>
              +new Date(tomato.ended_at) > +new Date(selectedDate[0]!) &&
              +new Date(tomato.ended_at) < +new Date(selectedDate[1]!)?.setHours(24),
          )
        : tomatoes;
    };
    return filterTomatoesWithRange(afterFilterTomatoes);
  }, [selectedDate, tomatoes]);

  const deletedTomatoes = useMemo(() => {
    return selectedDate[0] !== null && selectedDate[1] !== null
      ? tomatoes
          .filter((tomato) => tomato.aborted)
          .filter(
            (tomato) =>
              +new Date(tomato.ended_at) > +new Date(selectedDate[0]!) &&
              +new Date(tomato.ended_at) < +new Date(selectedDate[1]!)?.setHours(24),
          )
      : tomatoes.filter((tomato) => tomato.aborted);
  }, [selectedDate, tomatoes]);

  const dailyFinishedTomatoes = useMemo(() => {
    return _.groupBy(finishedTomatoes, (tomato) => {
      return format(new Date(tomato.updated_at!), "yyyy-MM-dd");
    });
  }, [finishedTomatoes]);

  const dailyAbortedTomatoes = useMemo(() => {
    return _.groupBy(deletedTomatoes, (tomato) => {
      return format(new Date(tomato.ended_at!), "yyyy-MM-dd");
    });
  }, [deletedTomatoes]);

  const finishedDates = useMemo(() => {
    return Object.keys(dailyFinishedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyFinishedTomatoes]);

  const abortedDates = useMemo(() => {
    return Object.keys(dailyAbortedTomatoes).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyAbortedTomatoes]);

  console.log(aborted, selectedDate, deletedTomatoes);
  console.log("finishedDates:", finishedDates);
  console.log("deletedDates:", abortedDates);
  console.log(finishedTomatoes);

  const FinishedTomatoList = () => {
    return (
      <Fragment>
        {(!aborted ? finishedDates : abortedDates).map((date) => {
          return (
            <div key={date} className="TomatoHistory-dailyTomatoes">
              <div className="TomatoHistory-dailyTomatoes-summary">
                <p className="TomatoHistory-dailyTomatoes-summary-date">
                  <span>{date}</span>
                  <span>
                    {format(
                      new Date((!aborted ? dailyFinishedTomatoes : dailyAbortedTomatoes)[date][0].updated_at),
                      "eee",
                    )}
                  </span>
                </p>
                <p className="finishedCount">
                  {!aborted ? "完成了" : "打断了"}{" "}
                  {(!aborted ? dailyFinishedTomatoes : dailyAbortedTomatoes)[date].length} 个番茄
                </p>
              </div>
              <div className="TomatoHistory-tomatoList">
                {(!aborted ? dailyFinishedTomatoes : dailyAbortedTomatoes)[date]
                  .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
                  .map((tomato) => (
                    <TomatoHistoryItem key={tomato.id} {...tomato} itemType="finished" />
                  ))}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };
  console.log(FinishedTomatoList);

  return <div></div>;
};

export default observer(TomatoHistory);
