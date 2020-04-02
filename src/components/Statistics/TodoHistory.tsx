import React, { useMemo, Fragment } from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import _ from "lodash";
import { useStores } from "src/hooks/use-stores";
import "./TodoHistory.scss";

// interface Todo {
//   description: string;
//   updated_at: string;
//   completed: boolean;
//   deleted: boolean;
//   id: number;
//   editing: boolean;
// }
interface TodoHistoryProps {
  finished: boolean;
}

const TodoHistoryItem = (props: any) => {
  return (
    <div className="TodoHistory-todoList-todoItem">
      <span className="TodoHistory-todoList-todoItem-time">{format(new Date(props.updated_at), "HH:mm")}</span>
      <span className="TodoHistory-todoList-todoItem-description">{props.description}</span>
    </div>
  );
};

const TodoHistory: React.FunctionComponent<TodoHistoryProps> = (props) => {
  const { finished } = props;
  const { todoState } = useStores();
  const { todos } = todoState;

  const finishedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed && !todo.deleted);
  }, [todos]);

  const deletedTodos = useMemo(() => {
    return todos.filter((todo) => todo.deleted);
  }, [todos]);

  const dailyFinishedTodos = useMemo(() => {
    return _.groupBy(finishedTodos, (todo) => {
      return format(new Date(todo.updated_at!), "yyyy-MM-dd");
    });
  }, [finishedTodos]);

  const dailyDeletedTodos = useMemo(() => {
    return _.groupBy(deletedTodos, (todo) => {
      return format(new Date(todo.updated_at!), "yyyy-MM-dd");
    });
  }, [deletedTodos]);

  const finishedDates = useMemo(() => {
    return Object.keys(dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyFinishedTodos]);

  const deletedDates = useMemo(() => {
    return Object.keys(dailyDeletedTodos).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyDeletedTodos]);

  const FinishedTodoList = () => {
    return (
      <Fragment>
        {finishedDates.map((date) => {
          return (
            <div key={date} className="TodoHistory-dailyTodos">
              <div className="TodoHistory-dailyTodos-summary">
                <p className="TodoHistory-dailyTodos-summary-date">
                  <span>{date}</span>
                  <span>周五</span>
                </p>
                <p className="finishedCount">完成了 {dailyFinishedTodos[date].length} 个任务</p>
              </div>
              <div className="TodoHistory-todoList">
                {dailyFinishedTodos[date]
                  .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
                  .map((todo) => (
                    <TodoHistoryItem key={todo.id} {...todo} />
                  ))}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  const DeletedTodoList = () => {
    return (
      <Fragment>
        {deletedDates.map((date) => {
          return (
            <div key={date} className="TodoHistory-dailyTodos">
              <div className="TodoHistory-dailyTodos-summary">
                <p className="TodoHistory-dailyTodos-summary-date">
                  <span>{date}</span>
                  <span>周五</span>
                </p>
                <p className="finishedCount">移除了 {dailyDeletedTodos[date].length} 个任务</p>
              </div>
              <div className="TodoHistory-todoList">
                {dailyDeletedTodos[date]
                  .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
                  .map((todo) => (
                    <TodoHistoryItem key={todo.id} {...todo} />
                  ))}
              </div>
            </div>
          );
        })}
      </Fragment>
    );
  };

  return (
    <div className="TodoHistory" id="TodoHistory">
      {finished ? <FinishedTodoList /> : <DeletedTodoList />}
    </div>
  );
};

export default observer(TodoHistory);
