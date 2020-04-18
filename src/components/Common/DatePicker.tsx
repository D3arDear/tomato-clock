import "date-fns";
import * as React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider, DateRange, DateRangePicker } from "@material-ui/pickers";
import cnLocale from "date-fns/locale/zh-CN";

export default function MaterialUIPickers() {
  const [selectedDate, handleDateChange] = React.useState<DateRange>([null, null]);

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <DateRangePicker
        value={selectedDate}
        startText={`${selectedDate[0]}`}
        endText={`${selectedDate[1]}`}
        onChange={(date) => handleDateChange(date)}
        calendars={1}
      />
    </LocalizationProvider>
  );
}
