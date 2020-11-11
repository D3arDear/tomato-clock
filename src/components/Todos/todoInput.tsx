import React, { InputHTMLAttributes } from "react";
import axios from "src/config/axios";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import StyledInput from "../Common/StyledInput";

interface Props extends InputHTMLAttributes<HTMLInputElement> {}

const TodoInput: React.FunctionComponent<Props> = (props) => {
  const { todoState } = useStores();

  const addTodo = async (value: string) => {
    const response = await axios.post("todos", { description: value });
    todoState.addTodo(response.data);
  };
  return <StyledInput onSubmitValue={addTodo} placeholder="新增任务" />;
};

export default observer(TodoInput);
