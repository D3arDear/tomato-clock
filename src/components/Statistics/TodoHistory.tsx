import React, { useMemo, Fragment } from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import _ from "lodash";
import { useStores } from "src/hooks/use-stores";
import "./TodoHistory.scss";
import TodoHistoryItem from "./TodoHistoryItem";
import { MaterialUiPickersDate } from "@material-ui/pickers/src/typings/date";

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
  selectedDate: MaterialUiPickersDate[];
}

const TodoHistory: React.FunctionComponent<TodoHistoryProps> = (props) => {
  const { finished, selectedDate } = props;
  const { todoState } = useStores();
  const { todos } = todoState;

  const finishedTodos = useMemo(() => {
    console.log("selectedDate:", selectedDate);
    const afterFilterTodos = todos.filter((todo) => todo.completed && !todo.deleted);
    const filterTodosWithRange = (todos: any) => {
      return selectedDate[0] !== null && selectedDate[1] !== null
        ? todos.filter(
            (todo: any) =>
              +new Date(todo.updated_at) > +new Date(selectedDate[0]!) &&
              +new Date(todo.updated_at) < +new Date(selectedDate[1]!)?.setHours(24),
          )
        : todos;
    };
    return filterTodosWithRange(afterFilterTodos);
  }, [todos, selectedDate]);

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
        {(finished ? finishedDates : deletedDates).map((date) => {
          return (
            <div key={date} className="TodoHistory-dailyTodos">
              <div className="TodoHistory-dailyTodos-summary">
                <p className="TodoHistory-dailyTodos-summary-date">
                  <span>{date}</span>
                  <span>
                    {format(new Date((finished ? dailyFinishedTodos : dailyDeletedTodos)[date][0].updated_at), "eee")}
                  </span>
                </p>
                <p className="finishedCount">
                  {finished ? "完成了" : "移除了"} {(finished ? dailyFinishedTodos : dailyDeletedTodos)[date].length}{" "}
                  个任务
                </p>
              </div>
              <div className="TodoHistory-todoList">
                {(finished ? dailyFinishedTodos : dailyDeletedTodos)[date]
                  .sort((a, b) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
                  .map((todo) => (
                    <TodoHistoryItem key={todo.id} {...todo} itemType="finished" />
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
      <FinishedTodoList />
    </div>
  );
};

export default observer(TodoHistory);
