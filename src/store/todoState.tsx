import { action, computed, observable } from 'mobx';

interface Todo {
  description: string;
  updated_at: string;
  completed: boolean;
  deleted: boolean;
  id: number;
  editing: boolean;
}

export class todoState {
  @observable
  todos = [
    {
      description: "",
      updated_at: "",
      completed: false,
      deleted: false,
      id: 1,
      editing: false,
    },
  ];

  @action
  addTodo(payload: Todo) {
    this.todos = [payload, ...this.todos];
  }

  @action
  initTodos(payload: Todo[]) {
    this.todos = payload;
  }

  @action
  updateTodos(payload: Todo) {
    const newTodos = this.todos.map((item) => {
      if (item.id === payload.id) {
        return payload;
      } else {
        return item;
      }
    });
    this.todos = newTodos;
  }

  @action
  toggleEditing(payload: number) {
    this.todos = this.todos.map((item) => {
      if (item.id === payload) {
        return Object.assign({}, item, { editing: true });
      } else {
        return Object.assign({}, item, { editing: false });
      }
    });
  }

  @computed
  get currentTodos() {
    return this.todos;
  }
}
