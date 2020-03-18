import { observable, action, computed } from "mobx";

export class tomatoState {
  @observable
  tomatoes = [
    {
      description: "",
      completed: false,
      deleted: false,
      id: 1,
      editing: false,
    },
  ];

  @action
  addTomato(payload: any) {
    this.tomatoes = [payload, ...this.tomatoes];
  }

  @computed
  get currentTodos() {
    return this.tomatoes;
  }
}
