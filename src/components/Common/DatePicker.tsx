import "date-fns";
import * as React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider, DateRange as DateRangeType, DateRangePicker } from "@material-ui/pickers";
import cnLocale from "date-fns/locale/zh-CN";
// import { format } from "date-fns";
import { observer } from 'mobx-react';
// import { TextField, TextFieldProps } from '@material-ui/core';

interface DatePickerProps {
  handleDateChange: (date: DateRangeType) => void
  selectedDate: DateRangeType
}


const DatePicker = (props: DatePickerProps) => {
  const { handleDateChange, selectedDate } = props


  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <DateRangePicker
        disableFuture
        value={selectedDate}
        startText={'开始时间'}
        endText={'结束时间'}
        onChange={(date) => handleDateChange(date)}
        calendars={1}
      />
    </LocalizationProvider>
  );
}

export default observer(DatePicker)