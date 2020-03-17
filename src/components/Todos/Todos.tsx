import React, { useEffect, useMemo } from "react";
import TodoInput from "./TodoInput";
import axios from "src/config/axios";
import TodoItem from "src/components/Todos/TodoItem";
import "./Todos.scss";
import { useStores } from "src/hooks/use-stores";
import { observer } from "mobx-react";

interface Todos {
  description: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  editing?: boolean;
}

const Todos: React.FunctionComponent = observer(() => {
  const { store } = useStores();
  const { currentTodos } = store;

  const unDeletedTodos = useMemo(() => {
    return currentTodos.filter((todo) => !todo.deleted);
  }, [currentTodos]);

  const unCompletedTodos = useMemo(() => {
    return unDeletedTodos.filter((todo) => !todo.completed);
  }, [unDeletedTodos]);

  const completedTodos = useMemo(() => {
    return unDeletedTodos.filter((todo) => todo.completed);
  }, [unDeletedTodos]);

  useEffect(() => {
    const getTodo = async () => {
      const response = await axios.get("todos");
      const editingTodos = response.data.resources.map((item: Todos) => Object.assign({}, item, { editing: false }));
      store.initTodos(editingTodos);
    };
    getTodo();
  }, [store]);

  return (
    <div className="Todos" id="Todos">
      <TodoInput />
      <main className="Todos-list">
        <div>
          {unCompletedTodos.map((item) => {
            return <TodoItem key={item.id} {...item}></TodoItem>;
          })}
        </div>
        <div>
          {completedTodos.map((item) => {
            return <TodoItem key={item.id} {...item}></TodoItem>;
          })}
        </div>
      </main>
    </div>
  );
});

export default Todos;
