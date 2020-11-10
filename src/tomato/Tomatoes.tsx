import React, { useEffect, useMemo } from "react";
import "./Tomatoes.scss";
import TomatoAction from "./TomatoAction";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import axios from "src/config/axios";
import TomatoList from "src/tomato/TomatoList";
import _ from "lodash";
import { format } from "date-fns";

interface Props {}

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: boolean;
  manually_created: string;
  duration: number;
  extra: any;
  created_at: string;
  updated_at: string;
}

const Tomatoes: React.FunctionComponent<Props> = observer(() => {
  const { tomatoState, justCompletedTodo } = useStores();
  const finishedTomato = tomatoState.finishedTomato;

  const unfinishedTomato = useMemo(() => {
    return tomatoState.tomatoes.filter(
      (tomato) => !tomato.description && !tomato.ended_at && !tomato.aborted
    )[0];
  }, [tomatoState.tomatoes]);

  const startTomato = async () => {
    const response = await axios.post("tomatoes", { duration: 25 * 60 * 1000 });
    justCompletedTodo.CountDownStart();
    tomatoState.addTomato(response.data.resource);
  };

  const sortedFinishedTomato = useMemo(() => {
    return _.groupBy(finishedTomato, (tomato: Tomato) => {
      return format(Date.parse(tomato.started_at), "yyyy-MM-dd");
    });
  }, [finishedTomato]);

  const lastFinishedTomatoTime = useMemo(
    () => new Date(finishedTomato[0]?.ended_at),
    [finishedTomato]
  );

  useEffect(() => {
    const getTomato = async () => {
      const response = await axios.get("tomatoes");
      tomatoState.initTomato(response.data);
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
        lastFinishedTomatoTime={lastFinishedTomatoTime}
        updateTomato={doUpdateTomato}
      />
      <TomatoList finishedTomato={sortedFinishedTomato} />
    </div>
  );
});

export default Tomatoes;
