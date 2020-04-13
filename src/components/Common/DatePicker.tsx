import "date-fns";
import * as React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider, DateRange, StaticDateRangePicker } from "@material-ui/pickers";
import cnLocale from "date-fns/locale/zh-CN";

export default function MaterialUIPickers() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
      />
    </LocalizationProvider>
  );
}
