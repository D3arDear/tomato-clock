import React, { useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import DatePicker from "./DatePicker";
import { IconButton, Button } from "@material-ui/core";
import { DateRange, Clear, Check } from "@material-ui/icons";
import "./DatePickerDialog.scss";
import { observer } from "mobx-react";
import { useStores } from "src/hooks/use-stores";

const DatePickerDialog = () => {
  const [open, setOpen] = React.useState(false);
  const { dateFilterState } = useStores();
  const selectedDate = dateFilterState.dateRange;
  const datePickerRef = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    // @ts-ignore：无法被执行的代码的错误
    const currentDate = datePickerRef.current?.currentDate;
    dateFilterState.updatedDate(currentDate);
    setOpen(false);
  };

  const clearDate = () => {
    // @ts-ignore：无法被执行的代码的错误
    datePickerRef.current.setDateRange([null, null]);
    dateFilterState.updatedDate([null, null]);
  };

  return (
    <div>
      <IconButton aria-label="date-range" onClick={handleClickOpen}>
        <DateRange color={selectedDate[0] !== null && selectedDate[1] !== null ? "primary" : "secondary"} />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogContent style={{ overflow: "hidden", padding: 0 }}>
          <div className="datePicker-dialog-content">
            <DatePicker ref={datePickerRef} />
          </div>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Button color="primary" onClick={clearDate}>
            清除
          </Button>
          <div>
            <IconButton aria-label="clear" onClick={handleClose}>
              <Clear color="secondary" />
            </IconButton>
            <IconButton onClick={handleConfirm} autoFocus aria-label="confirm">
              <Check color="primary" />
            </IconButton>
          </div>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default observer(DatePickerDialog);
