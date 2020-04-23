import React, { useState } from "react";
import { makeStyles, Theme, IconButton, createStyles } from "@material-ui/core";
import { Delete, Edit, SettingsBackupRestore } from "@material-ui/icons";
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
  const { updated_at, started_at, ended_at, description, itemType } = props;
  console.log("updated_at,:", updated_at);
  const classes = useStyle();
  const handleUpdateTomato = (payload: any) => {
    console.log(payload);
    console.log(started_at, ended_at);
  };
  const [editMode, toggleEditMode] = useState(false);
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
              handleUpdateTomato({ deleted: true });
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
              handleUpdateTomato({ deleted: false });
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
    <div>
      <input type="text" />
    </div>
  );

  return <div>{editMode ? EditingItem : ListItem}</div>;
};

export default TomatoHistoryItem;
