import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DateTimePicker from "src/components/Common/DateTimePicker";
import { TextField } from "@material-ui/core";
import axios from "src/config/axios";
// import useMediaQuery from '@material-ui/core/useMediaQuery';
// import { useTheme } from '@material-ui/core/styles';
import { IconButton } from "@material-ui/core";
import { Clear, Check, Add } from "@material-ui/icons";
import "./AddTomatoDialog.scss";
import { observer } from "mobx-react";
import { useStores } from "src/hooks/use-stores";

const AddTomatoDialog = () => {
  const [open, setOpen] = React.useState(false);
  const [startDate, setStartDate] = useState<Date>(new Date(new Date().getTime() - 25 * 1000 * 60));
  const [endDate, setEndDate] = useState<Date>(new Date());
  const [description, setDescription] = useState<string>("");
  const { tomatoState } = useStores();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const addTomato = async () => {
    const response = await axios.post("tomatoes", {
      description: description,
      started_at: startDate,
      ended_at: endDate,
    });
    tomatoState.addTomato(response.data);
  };

  const handleConfirm = () => {
    addTomato();
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
              <DateTimePicker
                label="开始时间"
                endDate={endDate}
                selectedDate={startDate}
                setSelectedDate={setStartDate}
              />
            </div>
            <div className="addTomato-dialog-content-endTime">
              <DateTimePicker
                label="结束时间"
                selectedDate={endDate}
                startDate={startDate}
                setSelectedDate={setEndDate}
              />
            </div>
            <div className="addTomato-dialog-content-description">
              <TextField
                label="番茄描述"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>
          </div>
        </DialogContent>
        <DialogActions
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            padding: "20px",
          }}>
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

export default observer(AddTomatoDialog);
