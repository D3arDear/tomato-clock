import "./Statistics.scss";

import { format } from "date-fns";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useStores } from "src/hooks/use-stores";

import Polygon from "./Polygon";
import TodoHistory from "./TodoHistory";
import StatisticsTabs from "./StatisticsTabs";

const Statistics: React.FunctionComponent = () => {
  const { todoState } = useStores();
  const { todos } = todoState;
  const [liWidth, setLiWidth] = useState(0);
  const liRef = useRef<HTMLLIElement>(null);
  useEffect(() => {
    setLiWidth(liRef.current!.getBoundingClientRect().width);
  }, [setLiWidth]);

  const finishedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed && !todo.deleted);
  }, [todos]);

  const dailyTodos = useMemo(() => {
    return _.groupBy(finishedTodos, (todo) => {
      return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
    });
  }, [finishedTodos]);

  return (
    <div className="Statistics" id="Statistics">
      <ul className="Statistics-detail">
        <li>统计</li>
        <li>目标</li>
        <li>番茄历史</li>
        <li ref={liRef}>
          <div className="titles">
            <span className="title">任务历史</span>
            <span className="subTitle">累计完成任务</span>
            <span className="title-number">{finishedTodos.length}</span>
          </div>
          <Polygon data={dailyTodos} width={liWidth} />
        </li>
      </ul>
      <StatisticsTabs>
        <TodoHistory finished />
        <TodoHistory finished={false} />
      </StatisticsTabs>
    </div>
  );
};

export default observer(Statistics);
