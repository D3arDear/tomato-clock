import React, { useEffect, useMemo, useState } from "react";
import TodoInput from "./todoInput";
import axios from "src/config/axios";
import TodoItem from "src/components/Todos/TodoItem";
import "./Todos.scss";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";
import { ArrowRight } from "@material-ui/icons";
import { Button } from "@material-ui/core";
import SimpleBar from "simplebar-react";
import useOver2Month, { dateOfTwoMonthBefore } from "../Common/useOver2Mon";

interface Todos {
  description: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  editing?: boolean;
  updated_at: string;
  completed_at: string;
}

const Todos: React.FunctionComponent = observer(() => {
  const [completedVisible, setCompletedVisible] = useState(false);
  const { todoState, dateFilterState } = useStores();
  const { currentTodos } = todoState;

  const unDeletedTodos = useMemo(() => {
    return currentTodos.filter((todo) => !todo.deleted);
  }, [currentTodos]);

  const unCompletedTodos = useMemo(() => {
    return unDeletedTodos.filter((todo) => !todo.completed);
  }, [unDeletedTodos]);

  const completedTodos = useMemo(() => {
    return unDeletedTodos
      .filter((todo) => todo.completed)
      .sort((a, b) => Date.parse(b.completed_at) - Date.parse(a.completed_at));
  }, [unDeletedTodos]);

  const toggleCompletedTodos = () => {
    setCompletedVisible(!completedVisible);
  };
  useEffect(() => {
    const getTodo = async () => {
      const response = await axios.get("todos");
      const editingTodos = response.data.map((item: Todos) =>
        Object.assign({}, item, { editing: false })
      );
      todoState.initTodos(editingTodos);
    };
    getTodo().then(
      () => {
        if (useOver2Month(todoState.todos)) {
          dateFilterState.updatedDate([new Date(dateOfTwoMonthBefore), new Date()]);
        }
      },
      () => {}
    );
  }, [dateFilterState, todoState]);

  return (
    <div className="Todos" id="Todos">
      <TodoInput />
      <main className="Todos-list">
        {currentTodos.length > 0 ? (
          <div className="Todos-list-todo">
            {unCompletedTodos.map((item) => {
              return <TodoItem key={item.id} {...item}></TodoItem>;
            })}
          </div>
        ) : (
          <div className="Todos-list-empty">您还没有创建任何任务</div>
        )}
        <Button
          color="primary"
          startIcon={
            <ArrowRight
              style={{
                transform: `rotate(${completedVisible ? "90deg" : "0"})`,
              }}
            />
          }
          onClick={toggleCompletedTodos}>
          近一周完成的任务
        </Button>
        {
          <SimpleBar
            className={completedVisible ? "completedTodos" : "completedTodos invisible"}
            style={{}}>
            {completedTodos
              .filter(
                (item) =>
                  Date.parse(item.updated_at) >
                  new Date().setHours(0, 0, 0, 0) - 6 * 24 * 60 * 60 * 1000
              )
              .map((item) => {
                return <TodoItem key={item.id} {...item}></TodoItem>;
              })}
          </SimpleBar>
        }
      </main>
    </div>
  );
});

export default Todos;
