import { observable, action, computed } from "mobx";

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: string;
  manually_created: string;
  duration: number;
  extra: any;
  created_at: string;
  updated_at: string;
}
export class tomatoState {
  @observable
  tomatoes = [
    {
      id: 18310,
      user_id: 9938,
      started_at: "2020-03-18T17:40:49.555Z",
      ended_at: "",
      description: "",
      aborted: "",
      manually_created: "",
      duration: 1500000,
      extra: {},
      created_at: "2020-03-18T17:40:49.556Z",
      updated_at: "2020-03-18T17:40:49.556Z",
    },
  ];

  @action
  addTomato(payload: Tomato) {
    this.tomatoes = [payload, ...this.tomatoes];
  }

  @action
  initTomato(payload: Tomato[]) {
    this.tomatoes = payload;
  }

  @computed
  get unfinishedTomato() {
    return this.tomatoes.filter((tomato) => !tomato.description && !tomato.ended_at)[0];
  }
}
