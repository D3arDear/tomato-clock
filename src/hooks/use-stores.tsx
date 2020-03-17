import React from "react";
import { storesContext } from "src/contexts/stores";

export const useStores = () => React.useContext(storesContext);
