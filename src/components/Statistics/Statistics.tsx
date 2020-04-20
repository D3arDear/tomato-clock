import "./Statistics.scss";

import { format } from "date-fns";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useStores } from "src/hooks/use-stores";

import Polygon from "./Polygon";
import TodoHistoryTabs from "./TodoHistory/TodoStatisticsTabs";
import TomatoHistoryTabs from "./TomatoHistory/TomatoHistoryTabs";

const Statistics: React.FunctionComponent = () => {
  const { todoState, tomatoState } = useStores();
  const { todos } = todoState;
  const { tomatoes } = tomatoState;
  const [liWidth, setLiWidth] = useState(0);
  const liRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    setLiWidth(liRef.current!.getBoundingClientRect().width);
  }, [setLiWidth]);

  const [currentDisplay, handleDisplayChange] = useState(0);

  const finishedTodos = useMemo(() => todos.filter((todo) => todo.completed && !todo.deleted), [todos]);

  const dailyTodos = useMemo(
    () =>
      _.groupBy(finishedTodos, (todo) => {
        return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
      }),
    [finishedTodos],
  );

  const finishedTomatoes = useMemo(
    () => tomatoes.filter((tomato) => !tomato.aborted).filter((tomato) => tomato.description && tomato.ended_at),
    [tomatoes],
  );

  const dailyTomatoes = useMemo(
    () =>
      _.groupBy(finishedTomatoes, (tomato) => {
        return format(Date.parse(tomato.started_at!), "yyyy-MM-dd");
      }),
    [finishedTomatoes],
  );

  return (
    <div className="Statistics" id="Statistics">
      <ul className="Statistics-detail">
        <li>统计</li>
        <li>目标</li>
        <li
          onClick={() => {
            handleDisplayChange(3);
          }}
        >
          <div className="titles">
            <span className="title">番茄历史</span>
            <span className="subTitle">累计完成番茄</span>
            <span className="title-number">{finishedTomatoes.length}</span>
          </div>
          <Polygon data={dailyTomatoes} width={liWidth} />
        </li>
        <li
          ref={liRef}
          onClick={() => {
            handleDisplayChange(4);
          }}
        >
          <div className="titles">
            <span className="title">任务历史</span>
            <span className="subTitle">累计完成任务</span>
            <span className="title-number">{finishedTodos.length}</span>
          </div>
          <Polygon data={dailyTodos} width={liWidth} />
        </li>
      </ul>
      <div>
        {currentDisplay === 4 && <TodoHistoryTabs />}
        {currentDisplay === 3 && <TomatoHistoryTabs />}
      </div>
    </div>
  );
};

export default observer(Statistics);
