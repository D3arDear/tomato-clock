import React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { TextField } from "@material-ui/core";
import cnLocale from "date-fns/locale/zh-CN";
import { MobileDateTimePicker, LocalizationProvider } from "@material-ui/pickers";

function DateTimePicker(props: any) {
  const { label, selectedDate, setSelectedDate, startDate, endDate } = props;
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <MobileDateTimePicker
        autoOk
        disableFuture
        minDate={startDate ? startDate : null}
        minTime={startDate ? startDate : null}
        maxDate={endDate ? endDate : null}
        maxTime={endDate ? endDate : null}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        label={label}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
}

export default DateTimePicker;
