import "./Statistics.scss";

import { format } from "date-fns";
import _ from "lodash";
import { observer } from "mobx-react";
import React, { useMemo, useRef, useState, useEffect } from "react";
import { useStores } from "src/hooks/use-stores";

import { motion } from "framer-motion";
import { scaleAndFade } from "src/config/animation";

import Polygon from "./Polygon";
import TodoHistoryTabs from "./TodoHistory/TodoStatisticsTabs";
import TomatoHistoryTabs from "./TomatoHistory/TomatoHistoryTabs";
import Histogram from "./Histogram";
import StatisticsDetailTabs from "./StatisticsDetail/StatisticsDetail-tabs";

const Statistics: React.FunctionComponent = () => {
  const { todoState, tomatoState } = useStores();
  const { todos } = todoState;
  const { tomatoes } = tomatoState;
  const [liWidth, setLiWidth] = useState(0);
  const [ulWidth, setUlWidth] = useState(0);
  const liRef = useRef<HTMLLIElement>(null);
  const ulRef = useRef<HTMLUListElement>(null);
  const updateWidth = () => {
    setLiWidth(liRef.current!.getBoundingClientRect().width);
    setUlWidth(ulRef.current!.getBoundingClientRect().width);
  };
  useEffect(() => {
    updateWidth();
  }, [setLiWidth]);

  useEffect(() => {
    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  const [currentDisplay, handleDisplayChange] = useState(0);

  const finishedTodos = useMemo(() => todos.filter((todo) => todo.completed && !todo.deleted), [
    todos,
  ]);

  const dailyTodos = useMemo(
    () =>
      _.groupBy(finishedTodos, (todo) => {
        return format(Date.parse(todo.completed_at!), "yyyy-MM-dd");
      }),
    [finishedTodos]
  );

  const finishedTomatoes = useMemo(
    () => tomatoes.filter((tomato) => !tomato.aborted).filter((tomato) => tomato.ended_at),
    [tomatoes]
  );

  const currentMonthTomatoes = useMemo(
    () =>
      finishedTomatoes.filter(
        (tomato) =>
          new Date(tomato.ended_at) > new Date(new Date().getTime() - 1000 * 60 * 60 * 24 * 30)
      ),
    [finishedTomatoes]
  );

  const GroupedCurrentMonthTomatoes = useMemo(
    () =>
      _.groupBy(currentMonthTomatoes, (tomato) => {
        return format(Date.parse(tomato.started_at!), "yyyy-MM-dd");
      }),
    [currentMonthTomatoes]
  );

  const dailyTomatoes = useMemo(
    () =>
      _.groupBy(finishedTomatoes, (tomato) => {
        return format(Date.parse(tomato.started_at!), "yyyy-MM-dd");
      }),
    [finishedTomatoes]
  );

  return (
    <div className="Statistics" id="Statistics">
      <ul className="Statistics-detail" ref={ulRef}>
        <li
          className={currentDisplay === 1 ? "active" : ""}
          onClick={() => {
            handleDisplayChange(1);
          }}>
          <div className="titles">
            <span className="title">统计</span>
            <span className="subTitle">近30天累计</span>
            <span className="title-number">{currentMonthTomatoes.length}</span>
          </div>
          <Histogram data={GroupedCurrentMonthTomatoes} width={liWidth} />
        </li>
        <li
          className={currentDisplay === 2 ? "active" : ""}
          onClick={() => {
            handleDisplayChange(2);
          }}>
          <div className="titles">
            <span className="title">番茄历史</span>
            <span className="subTitle">累计完成番茄</span>
            <span className="title-number">{finishedTomatoes.length}</span>
          </div>
          <Polygon data={dailyTomatoes} width={liWidth} />
        </li>
        <li
          className={currentDisplay === 3 ? "active" : ""}
          ref={liRef}
          onClick={() => {
            handleDisplayChange(3);
          }}>
          <div className="titles">
            <span className="title">任务历史</span>
            <span className="subTitle">累计完成任务</span>
            <span className="title-number">{finishedTodos.length}</span>
          </div>
          <Polygon data={dailyTodos} width={liWidth} />
        </li>
      </ul>
      <div>
        {currentDisplay === 1 && (
          <motion.div initial="initial" animate="enter" exit="exit" variants={scaleAndFade}>
            <StatisticsDetailTabs
              finishedTodos={finishedTodos}
              finishedTomatoes={finishedTomatoes}
              width={ulWidth}
            />
          </motion.div>
        )}
        {currentDisplay === 2 && (
          <motion.div initial="initial" animate="enter" exit="exit" variants={scaleAndFade}>
            <TomatoHistoryTabs />
          </motion.div>
        )}
        {currentDisplay === 3 && (
          <motion.div initial="initial" animate="enter" exit="exit" variants={scaleAndFade}>
            <TodoHistoryTabs />
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default observer(Statistics);
