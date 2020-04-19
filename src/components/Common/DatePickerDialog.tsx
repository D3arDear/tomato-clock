import React from 'react';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import DatePicker from './DatePicker';
import { IconButton } from '@material-ui/core';
import { DateRange, Clear, Check } from '@material-ui/icons';
import './DatePickerDialog.scss'

export default function DatePickerDialog() {
  const [open, setOpen] = React.useState(false);
  // const theme = useTheme();
  // const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

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
        <DialogContent>
          <div className="datePicker-dialog-content">
            <DatePicker />
          </div>
        </DialogContent>
        <DialogActions>
          <IconButton aria-label="clear" onClick={handleClose}>
            <Clear color="secondary" />
          </IconButton>
          <IconButton onClick={handleClose} autoFocus aria-label="confirm">
            <Check color="primary" />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
}