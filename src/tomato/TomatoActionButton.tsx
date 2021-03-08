import React from "react";
import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";

interface Props {
  startTomato: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "5px 10px",
      background: "linear-gradient(45deg, #fe6b6b 30%, #FF8E53 90%)",
      boxShadow: "none",
    },
    wrapper: {
      padding: "6px",
      background: "white",
      boxShadow:
        " 0px 2px 1px -1px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 1px 3px 0px rgba(0, 0, 0, 0.12)",
      borderRadius: "4px",
    },
  })
);

const TomatoActionButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { startTomato } = props;
  return (
    <div className={classes.wrapper}>
      <Button
        fullWidth
        variant="contained"
        className={classes.root}
        onClick={startTomato}
        color="primary">
        开始番茄
      </Button>
    </div>
  );
};

export default TomatoActionButton;
