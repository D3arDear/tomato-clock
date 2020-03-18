import React from "react";
import { todoState } from "src/store/todoState";
import { tomatoState } from "src/store/tomatoState";

export const storesContext = React.createContext({
  todoState: new todoState(),
  tomatoState: new tomatoState(),
});
