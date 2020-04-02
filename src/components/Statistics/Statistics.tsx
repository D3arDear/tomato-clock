import "./Statistics.scss";

import { format } from "date-fns";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { useMemo } from "react";
import { useStores } from "src/hooks/use-stores";

import Polygon from "./Polygon";
import TodoHistory from "./TodoHistory";
import StatisticsTabs from "./StatisticsTabs";

const Statistics: React.FunctionComponent = () => {
  const { todoState } = useStores();
  const { todos } = todoState;
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
      <ul>
        <li>统计</li>
        <li>目标</li>
        <li>番茄历史</li>
        <li>
          任务历史 累计完成{finishedTodos.length}个任务
          <Polygon data={dailyTodos} totalFinishedCount={finishedTodos.length} />
        </li>
      </ul>
      <StatisticsTabs>
        <TodoHistory />
        <div>这是第二个</div>
      </StatisticsTabs>
    </div>
  );
};

export default observer(Statistics);
