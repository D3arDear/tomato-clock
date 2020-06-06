import React, { useState } from "react";
import axios from "src/config/axios";
import { makeStyles, Theme, IconButton, createStyles, TextField } from "@material-ui/core";
import { Delete, Edit, SettingsBackupRestore, Check } from "@material-ui/icons";
import { format } from "date-fns";
import "./TomatoHistoryItem.scss";

// interface TomatoHistoryItemInterface {
//   itemType: "finished" | "aborted";
// }

// interface Tomato {
//   id: number;
//   user_id: number;
//   started_at: string;
//   ended_at: string;
//   description: string;
//   aborted: boolean;
//   manually_created: string;
//   duration: number;
//   extra: any;
//   created_at: string;
//   updated_at: string;
// }

const useStyle = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      borderRadius: "none",
      margin: "5px 0",
    },
    iconButton: {
      padding: 0,
    },
  }),
);

const TomatoHistoryItem: React.FC<any> = (props) => {
  const { started_at, ended_at, description, id, itemType, updateTomato } = props;
  const [editText, setEditText] = useState(props.description);
  const classes = useStyle();
  const handleUpdateTomato = async (payload: any) => {
    const response = await axios.put(`tomatoes/${id}`, payload);
    updateTomato(response.data.resource);
  };
  const [editMode, toggleEditMode] = useState(false);
  const keyUpHandler: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.keyCode === 13 && props.description !== "") {
      handleUpdateTomato({ description: editText });
    }
  };
  const ListItem = (
    <div className="TomatoHistory-tomatoItem">
      <div className="text">
        <span className="TomatoHistory-tomatoItem-time">{`${format(new Date(started_at), "HH:mm")} ~ ${format(
          new Date(ended_at),
          "HH:mm",
        )}`}</span>
        <span className="TomatoHistory-tomatoItem-description">{description}</span>
      </div>
      {itemType === "finished" ? (
        <div className="action">
          <IconButton
            className={classes.iconButton}
            color="primary"
            size="small"
            onClick={(e) => {
              toggleEditMode(true);
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            size="small"
            onClick={(e) => {
              handleUpdateTomato({ aborted: true });
            }}
          >
            <Delete />
          </IconButton>
        </div>
      ) : (
        <div className="action">
          <IconButton
            className={classes.iconButton}
            color="primary"
            size="small"
            onClick={(e) => {
              handleUpdateTomato({ aborted: false });
            }}
          >
            <Edit />
          </IconButton>
          <IconButton
            className={classes.iconButton}
            size="small"
            onClick={(e) => {
              handleUpdateTomato({ deleted: false });
            }}
          >
            <SettingsBackupRestore />
          </IconButton>
        </div>
      )}
    </div>
  );
  const EditingItem = (
    <div className="todoItem-editing">
      <IconButton
        color="primary"
        className={classes.iconButton}
        onClick={(e) => handleUpdateTomato({ description: editText })}
      >
        <Check />
      </IconButton>
      <TextField
        className="todoItem-editing-input"
        style={{ paddingLeft: 8, width: "100%" }}
        placeholder={props.description}
        value={editText}
        onChange={(e) => setEditText(e.target.value)}
        onKeyUp={keyUpHandler}
      />
      <IconButton className={classes.iconButton} onClick={(e) => handleUpdateTomato({ deleted: true })}>
        <Delete />
      </IconButton>
    </div>
  );

  return <div>{editMode ? EditingItem : ListItem}</div>;
};

export default TomatoHistoryItem;
