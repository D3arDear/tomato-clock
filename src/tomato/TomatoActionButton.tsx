import React from "react";
import { Button, makeStyles, createStyles, Theme } from "@material-ui/core";

interface Props {
  startTomato: () => void;
}

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "10px 16px",
      background: "linear-gradient(45deg, rgba(255, 90, 70, 1) 30%, rgba(255, 179, 113, 1) 90%)",
    },
  }),
);

const TomatoActionButton: React.FC<Props> = (props) => {
  const classes = useStyles();
  const { startTomato } = props;
  return (
    <Button fullWidth variant="contained" className={classes.root} onClick={startTomato} color="primary">
      开始番茄
    </Button>
  );
};

export default TomatoActionButton;
