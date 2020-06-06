import React, { useState } from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { TextField } from "@material-ui/core";
import cnLocale from "date-fns/locale/zh-CN";
import { MobileDateTimePicker, LocalizationProvider } from "@material-ui/pickers";

function DateTimePicker(props: any) {
  const { label } = props;
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const handleDateChange = (date: any) => {
    setSelectedDate(date);
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <MobileDateTimePicker
        autoOk
        disableFuture
        maxTime={new Date()}
        value={selectedDate}
        onChange={(date) => handleDateChange(date)}
        label={label}
        renderInput={(props) => <TextField {...props} />}
      />
    </LocalizationProvider>
  );
}

export default DateTimePicker;
