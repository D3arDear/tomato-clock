import React, { InputHTMLAttributes, useState } from "react";
import axios from "src/config/axios";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import InputBase from "@material-ui/core/InputBase";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import { Edit, SubdirectoryArrowLeft, Close } from "@material-ui/icons";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}
const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      padding: "6px 6px",
      display: "flex",
      alignItems: "center",
      // width: 400,
    },
    input: {
      marginLeft: theme.spacing(1),
      flex: 1,
    },
    icon: {
      margin: "0 5px",
    },
    iconButton: {
      padding: 5,
    },
    divider: {
      height: 28,
      margin: "2px 4px",
    },
    dividerRight: {
      height: 28,
      margin: 2,
    },
  }),
);

const TodoInput: React.FunctionComponent<Props> = observer((props) => {
  const [description, setDescription] = useState<string>("");
  const { todoState } = useStores();
  const classes = useStyles();

  const pressEnter: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13 && description !== "") {
      submitDescription();
    }
  };
  const addTodo = async () => {
    const response = await axios.post("todos", { description: description });
    todoState.addTodo(response.data.resource);
  };
  const submitDescription = () => {
    if (description !== "") {
      addTodo();
      pressClear();
    }
  };
  const pressClear = () => {
    setDescription("");
  };
  const dontReload = (e: any) => {
    e.preventDefault();
  };
  return (
    <Paper className={classes.root}>
      <Edit color="primary" className={classes.icon} />
      <Divider className={classes.divider} orientation="vertical" />
      <InputBase
        className={classes.input}
        placeholder="新增任务"
        inputProps={{ "aria-label": "新增任务" }}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        onKeyUp={pressEnter}
        onSubmit={dontReload}
      />
      <IconButton className={classes.iconButton} aria-label="clear" onClick={pressClear}>
        <Close />
      </IconButton>
      <Divider className={classes.dividerRight} orientation="vertical" />
      <IconButton className={classes.iconButton} aria-label="enter" onClick={submitDescription}>
        <SubdirectoryArrowLeft />
      </IconButton>
    </Paper>
  );
});
export default TodoInput;
