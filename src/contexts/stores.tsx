import React from "react";
import { Store } from "src/store/store";

export const storesContext = React.createContext({
  store: new Store(),
});
