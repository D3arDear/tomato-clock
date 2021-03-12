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
  disableFuture?: boolean;
}

const DatePicker = forwardRef((props: DatePickerProps, ref) => {
  const { disableFuture } = props;
  const { dateFilterState } = useStores();
  const currentDate = dateFilterState.pickersDateRange;
  const [dateRange, setDateRange] = useState<DateRangeType<Date | null>>([null, null]);
  React.useEffect(() => {
    setDateRange(() => dateFilterState.dateRange);
  }, [dateFilterState.dateRange]);

  useImperativeHandle(ref, () => ({
    currentDate: currentDate,
    setDateRange: changeHandler,
  }));

  const changeHandler = (date: DateRangeType<Date | null>) => {
    setDateRange(date);
    dateFilterState.updatePickersDateRange(date);
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={dateRange}
        disableFuture={disableFuture}
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
