import React from "react";
import { DateRange } from "@material-ui/pickers/src/DateRangePicker/RangeTypes";

interface TomatoHistoryProps {
  aborted?: boolean;
  selectedDate: DateRange;
}

const TomatoHistory: React.FC<TomatoHistoryProps> = (props) => {
  const { aborted, selectedDate } = props;
  console.log(aborted, selectedDate);
  return <div></div>;
};

export default TomatoHistory;
