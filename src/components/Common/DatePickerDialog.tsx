import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import DatePicker from './DatePicker';
import { IconButton, Button } from '@material-ui/core';
import { DateRange, Clear, Check } from '@material-ui/icons';
import { DateRange as DateRangeType } from "@material-ui/pickers";
import './DatePickerDialog.scss'

interface iDatePickerDialogProps {
  handleDateChange: (date: DateRangeType) => void
  selectedDate: DateRangeType
}

export default function DatePickerDialog(props: iDatePickerDialogProps) {
  const [open, setOpen] = React.useState(false);
  const { selectedDate, handleDateChange } = props
  const [selectedDateInside, setSelectedDateInside] = React.useState<DateRangeType>(selectedDate);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    handleDateChange(selectedDateInside)
    setOpen(false)
  }

  const handleInsideChange = (date: DateRangeType) => {
    setSelectedDateInside(date)
  }
  const clearDate = () => {
    handleDateChange([null, null])
  }

  return (
    <div>
      <IconButton aria-label="date-range" onClick={handleClickOpen}>
        <DateRange color="primary" />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"请选择日期范围"}</DialogTitle>
        <DialogContent style={{ overflow: 'hidden' }}>
          <div className="datePicker-dialog-content">
            <DatePicker selectedDate={selectedDateInside} handleDateChange={handleInsideChange} />
          </div>
          <Button color='primary' onClick={clearDate}>清除</Button>
        </DialogContent>
        <DialogActions>
          <IconButton aria-label="clear" onClick={handleClose}>
            <Clear color="secondary" />
          </IconButton>
          <IconButton onClick={handleConfirm} autoFocus aria-label="confirm">
            <Check color="primary" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}