import React, { useMemo, Fragment } from "react";
import { observer } from "mobx-react";
import { format } from "date-fns";
import _ from "lodash";
import { useStores } from "src/hooks/use-stores";

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
    <div>
      <span>{props.updated_at}</span>
      <span>{props.description}</span>
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
      return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
    });
  }, [finishedTodos]);

  const dailyDeletedTodos = useMemo(() => {
    return _.groupBy(deletedTodos, (todo) => {
      return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
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
            <div key={date}>
              <h3>
                {date}
                完成了{dailyFinishedTodos[date].length}个任务
              </h3>
              <div>
                {dailyFinishedTodos[date].map((todo) => (
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
            <div key={date}>
              <h3>
                {date}
                移除了{dailyDeletedTodos[date].length}个任务
              </h3>
              <div>
                {dailyDeletedTodos[date].map((todo) => (
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
