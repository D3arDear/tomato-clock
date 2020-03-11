import React, { useEffect } from "react";

interface Props {
  description: string;
}

const TodoItem: React.FunctionComponent<Props> = (props) => {
  useEffect(() => {
    console.log(props);
  }, [props]);
  return <div className="todoItem">{props.description}</div>;
};

export default TodoItem;
