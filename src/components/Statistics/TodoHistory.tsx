import React from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import _ from "lodash";

const TodoHistory: React.FunctionComponent = () => {
  return <div className="TodoHistory" id="TodoHistory"></div>;
};

export default observer(TodoHistory);
