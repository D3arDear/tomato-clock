import React from "react";
import { makeStyles, Theme, createStyles, Card, CardContent, Typography, Checkbox } from "@material-ui/core";

interface Props {
  description: string;
  completed: boolean;
  id: number;
  update: (x: number, y: {}) => void;
}

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: "none",
      margin: "5px 0",
    },
    details: {
      display: "flex",
      flexDirection: "column",
    },
    content: {
      flex: "1 0 auto",
      fontSize: "15px",
    },
  }),
);

const TodoItem: React.FunctionComponent<Props> = (props) => {
  const update = (payload: any) => {
    props.update(props.id, payload);
  };
  const classes = useStyle();
  return (
    <div className="todoItem">
      <Card className={classes.root} variant="outlined">
        <Checkbox checked={props.completed} onChange={(e) => update({ completed: e.target.checked })} color="primary" />
        <div className={classes.details}>
          <CardContent className={classes.content} style={{ padding: "8px" }}>
            <Typography variant="inherit" color="textPrimary">
              {props.description}
            </Typography>
          </CardContent>
        </div>
      </Card>
    </div>
  );
};

export default TodoItem;
