import React from "react";
import { DialogActions, DialogTitle, Dialog, IconButton } from "@material-ui/core";
import { Check, Close } from "@material-ui/icons";

interface ConfirmProps {
  open: boolean;
  toggleConfirm: (params: boolean) => void;
  abortTomato: () => void;
}
const AbortConfirm: React.FC<ConfirmProps> = (props) => {
  const { open, toggleConfirm, abortTomato } = props;
  return (
    <div>
      <Dialog open={open} onClose={() => toggleConfirm(false)}>
        <DialogTitle id="alert-dialog-title">{"确认要放弃这个番茄时间吗？"}</DialogTitle>
        <DialogActions>
          <IconButton onClick={() => abortTomato()} color="primary">
            <Check />
          </IconButton>
          <IconButton onClick={() => toggleConfirm(false)} color="secondary" autoFocus>
            <Close />
          </IconButton>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AbortConfirm;
