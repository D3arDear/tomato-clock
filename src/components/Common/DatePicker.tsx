import "date-fns";
import * as React from "react";
import DateFnsAdapter from "@material-ui/pickers/adapter/date-fns";
import { LocalizationProvider, DateRange as DateRangeType, StaticDateRangePicker } from "@material-ui/pickers";
import cnLocale from "date-fns/locale/zh-CN";
import { useImperativeHandle, forwardRef, useState } from "react";
import { observer } from "mobx-react";
import { useStores } from "src/hooks/use-stores";
// import { format } from "date-fns";
// import { TextField, TextFieldProps } from '@material-ui/core';

interface DatePickerProps {
  ref?: React.RefObject<any>;
}

const DatePicker: React.FC<DatePickerProps> = forwardRef((props, ref) => {
  const [dateRange, setDateRange] = useState<DateRangeType>([null, null]);
  const { dateFilterState } = useStores();
  const currentDate = dateFilterState.pickersDateRange;

  useImperativeHandle(ref, () => ({
    currentDate: currentDate,
    setDateRange: changeHandler,
  }));

  const changeHandler = (date: DateRangeType) => {
    console.log("onChange触发了");
    dateFilterState.updatePickersDateRange(date);
    setDateRange(date);
  };

  return (
    <LocalizationProvider dateAdapter={DateFnsAdapter} locale={cnLocale}>
      <StaticDateRangePicker
        displayStaticWrapperAs="mobile"
        value={dateRange}
        startText={"开始时间"}
        endText={"结束时间"}
        onChange={(date) => changeHandler(date)}
      />
    </LocalizationProvider>
  );
});

export default observer(DatePicker);
