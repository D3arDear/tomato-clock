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
// interface TodoHistoryProps {
//   todos: Todo[];
// }

const TodoHistoryItem = (props: any) => {
  return (
    <div>
      <span>{props.updated_at}</span>
      <span>{props.description}</span>
    </div>
  );
};

const TodoHistory: React.FunctionComponent = () => {
  const { todoState } = useStores();
  const { todos } = todoState;

  const finishedTodos = useMemo(() => {
    return todos.filter((todo) => todo.completed && !todo.deleted);
  }, [todos]);

  const deletedTodos = useMemo(() => {
    return todos.filter((todo) => todo.deleted);
  }, [todos]);

  console.log(deletedTodos);
  const dailyFinishedTodos = useMemo(() => {
    return _.groupBy(finishedTodos, (todo) => {
      return format(Date.parse(todo.updated_at!), "yyyy-MM-dd");
    });
  }, [finishedTodos]);

  const dates = useMemo(() => {
    return Object.keys(dailyFinishedTodos).sort((a, b) => Date.parse(b) - Date.parse(a));
  }, [dailyFinishedTodos]);

  const TodoList = () => {
    return (
      <Fragment>
        {dates.map((date) => {
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

  return (
    <div className="TodoHistory" id="TodoHistory">
      <TodoList />
    </div>
  );
};

export default observer(TodoHistory);
