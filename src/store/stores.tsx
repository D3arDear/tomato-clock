import React from "react";
import { todoState } from "src/store/todoState";
import { tomatoState } from "src/store/tomatoState";
import { justCompletedTodoState } from './justCompletedTodo';

export const storesContext = React.createContext({
  todoState: new todoState(),
  tomatoState: new tomatoState(),
  justCompletedTodo: new justCompletedTodoState()
});
