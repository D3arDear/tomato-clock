import React from "react";
import {
  makeStyles,
  Theme,
  createStyles,
  Card,
  CardContent,
  Typography,
  Checkbox,
  TextField,
  IconButton,
} from "@material-ui/core";
import "./todoItem.scss";
import { Check, Delete } from "@material-ui/icons";

interface Props {
  description: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  update: (x: number, y: {}) => void;
  editing?: boolean;
  toggleEditMode: (x: number) => void;
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
      justifyContent: "center",
      alignItems: "center",
    },
    content: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      fontSize: "15px",
    },
    iconButton: {
      padding: 5,
    },
  }),
);

const TodoItem: React.FunctionComponent<Props> = (props) => {
  const update = (payload: any) => {
    props.update(props.id, payload);
  };
  const classes = useStyle();
  const toggleEditMode: React.MouseEventHandler<HTMLDivElement> = (e) => {
    props.toggleEditMode(props.id);
  };
  const Editing = (
    <div className="todoItem-editing">
      <TextField
        className="todoItem-editing-input"
        style={{ width: "100%", padding: "6px 5px 6px 50px" }}
        defaultValue={props.description}
        placeholder={props.description}
      />
      <div className="todoItem-editing-iconWrapper">
        <IconButton color="primary" className={classes.iconButton}>
          <Check />
        </IconButton>
        <IconButton className={classes.iconButton} onClick={(e) => update({ deleted: true })}>
          <Delete />
        </IconButton>
      </div>
    </div>
  );
  const ListItem = (
    <Card className={classes.root} variant="outlined" onDoubleClick={toggleEditMode}>
      <Checkbox checked={props.completed} onChange={(e) => update({ completed: e.target.checked })} color="primary" />
      <div className={classes.details}>
        <CardContent className={classes.content} style={{ padding: "8px" }}>
          <Typography variant="inherit" color="textPrimary">
            {props.description}
          </Typography>
        </CardContent>
      </div>
    </Card>
  );
  return <div className="todoItem">{props.editing ? Editing : ListItem}</div>;
};

export default TodoItem;
