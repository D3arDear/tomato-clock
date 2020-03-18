import React, { useEffect } from "react";
import "./Tomatoes.scss";
import TomatoAction from "./TomatoAction";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import axios from "src/config/axios";

interface Props {}

// interface Tomato extends Object {
//   id: number;
//   user_id: number;
//   start_at: string;
//   description: string | null;
//   ended_at: string | null;
//   duration: number;
//   created_at: string;
//   update_at: string;
// }

const Tomatoes: React.FunctionComponent<Props> = observer(() => {
  const { tomatoState } = useStores();
  const unfinishedTomato = { tomatoState };
  const startTomato = async () => {
    const response = await axios.post("tomatoes", { duration: 25 * 60 * 1000 });
    tomatoState.addTomato(response.data.resource);
  };

  useEffect(() => {
    const getTodo = async () => {
      const response = await axios.get("tomatoes");
      tomatoState.initTomato(response.data.resource);
    };
    getTodo();
  }, [tomatoState]);

  return (
    <div className="Tomatoes">
      <TomatoAction startTomato={startTomato} unfinishedTomato={unfinishedTomato}></TomatoAction>
    </div>
  );
});

export default Tomatoes;
