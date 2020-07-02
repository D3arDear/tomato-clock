import { action, computed, observable } from "mobx";

interface Todo {
  description: string;
  updated_at: string;
  completed_at: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  editing: boolean;
}

export class justCompletedTodoState {
  @observable
  todos = [
    {
      description: "",
      updated_at: "",
      completed_at: "",
      completed: false,
      deleted: false,
      id: 1,
      editing: false,
    },
  ];

  @action
  addTodo(payload: Todo) {
    let update = false;
    const newTodos = this.todos.map((item) => {
      if (item.id === payload.id) {
        update = true;
        return payload;
      } else {
        return item;
      }
    });
    update ? (this.todos = newTodos) : (this.todos = [...this.todos, payload]);
  }

  @action
  removeTodo(payload: Todo) {
    const newTodos = this.todos.filter((todo) => todo.completed);
    this.todos = newTodos;
  }

  @computed
  get justCompletedTodos() {
    return this.todos
      .filter((todo) => todo.completed)
      .map((todo) => todo.description)
      .filter((todo) => todo)
      .join(" + ");
  }
}
