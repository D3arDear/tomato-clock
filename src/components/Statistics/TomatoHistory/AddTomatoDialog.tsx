import React from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DateTimePicker from "src/components/Common/DateTimePicker";
import { TextField } from "@material-ui/core";
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { Clear, Check, Add } from "@material-ui/icons";
import "./AddTomatoDialog.scss";

const AddTomatoDialog = () => {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
  };

  return (
    <div className="AddTomatoDialog">
      <IconButton aria-label="add-tomato" onClick={handleClickOpen}>
        <Add color="primary" />
      </IconButton>
      <Dialog open={open} onClose={handleClose} aria-labelledby="responsive-dialog-title">
        <DialogContent style={{ overflow: "hidden", padding: 0 }}>
          <div className="addTomato-dialog-content">
            <div className="addTomato-dialog-content-startTime">
              <DateTimePicker label="开始时间" />
            </div>
            <div className="addTomato-dialog-content-endTime">
              <DateTimePicker label="结束时间" />
            </div>
            <div className="addTomato-dialog-content-description">
              <TextField label="番茄描述" />
            </div>
          </div>
        </DialogContent>
        <DialogActions style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
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

export default AddTomatoDialog;
