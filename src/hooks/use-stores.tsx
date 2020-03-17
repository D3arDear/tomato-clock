import React from "react";
import { storesContext } from "src/store/stores";

export const useStores = () => React.useContext(storesContext);
