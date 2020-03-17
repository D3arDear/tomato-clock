import React from "react";
import { State } from "src/store/state";

export const storesContext = React.createContext({
  store: new State(),
});
