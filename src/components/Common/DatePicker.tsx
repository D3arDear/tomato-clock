import "date-fns";
import * as React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import {
  LocalizationProvider,
  DateRange as DateRangeType,
  StaticDateRangePicker,
  DateRangeDelimiter,
} from "@material-ui/pickers";
import cnLocale from "date-fns/locale/zh-CN";
import { useImperativeHandle, forwardRef, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "src/hooks/use-stores";
import { TextField } from "@material-ui/core";
// import { format } from "date-fns";
// import { TextField, TextFieldProps } from '@material-ui/core';

interface DatePickerProps {
  ref?: React.RefObject<any>;
}

const DatePicker: React.FC<DatePickerProps> = forwardRef((props, ref) => {
  const { dateFilterState } = useStores();
  const currentDate = dateFilterState.pickersDateRange;
  const [dateRange, setDateRange] = useState<DateRangeType>([null, null]);
  React.useEffect(() => {
    setDateRange(() => dateFilterState.dateRange);
  }, [dateFilterState.dateRange]);

  React.useEffect(() => {
    console.log(dateRange[0]);
  }, [dateRange]);

  useImperativeHandle(ref, () => ({
    currentDate: currentDate,
    setDateRange: changeHandler,
  }));

  const changeHandler = (date: DateRangeType) => {
    setDateRange(date);
    dateFilterState.updatePickersDateRange(date);
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={dateRange}
        disableFuture={true}
        startText={"开始时间"}
        endText={"结束时间"}
        onChange={(date) => changeHandler(date)}
        renderInput={(startProps, endProps) => (
          <>
            <TextField {...startProps} />
            <DateRangeDelimiter> to </DateRangeDelimiter>
            <TextField {...endProps} />
          </>
        )}
      />
    </LocalizationProvider>
  );
});

export default observer(DatePicker);
