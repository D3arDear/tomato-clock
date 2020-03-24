import React, { useEffect } from "react";
import "./Tomatoes.scss";
import TomatoAction from "./TomatoAction";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import axios from "src/config/axios";

interface Props {}

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: string;
  manually_created: string;
  duration: number;
  extra: any;
  created_at: string;
  updated_at: string;
}

const Tomatoes: React.FunctionComponent<Props> = observer(() => {
  const { tomatoState } = useStores();
  const { unfinishedTomato } = tomatoState;

  const startTomato = async () => {
    const response = await axios.post("tomatoes", { duration: 25 * 60 * 1000 });
    tomatoState.addTomato(response.data.resource);
  };

  useEffect(() => {
    const getTomato = async () => {
      const response = await axios.get("tomatoes");
      tomatoState.initTomato(response.data.resources);
    };
    getTomato();
  }, [tomatoState]);

  const doUpdateTomato = (payload: Tomato) => {
    tomatoState.updateTomato(payload);
  };

  return (
    <div className="Tomatoes">
      <TomatoAction
        startTomato={startTomato}
        unfinishedTomato={unfinishedTomato}
        updateTomato={doUpdateTomato}
      ></TomatoAction>
    </div>
  );
});

export default Tomatoes;
