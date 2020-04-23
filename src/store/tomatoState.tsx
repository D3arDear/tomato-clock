import { observable, action, computed } from "mobx";

interface Tomato {
  id: number;
  user_id: number;
  started_at: string;
  ended_at: string;
  description: string;
  aborted: boolean;
  manually_created: string;
  duration: number;
  extra: any;
  created_at: string;
  updated_at: string;
}
export class tomatoState {
  @observable
  tomatoes: Tomato[] = [
    {
      id: 18310,
      user_id: 9938,
      started_at: "2020-03-18T17:40:49.555Z",
      description: "",
      aborted: true,
      manually_created: "",
      duration: 1500000,
      extra: {},
      created_at: "2020-03-18T17:40:49.556Z",
      ended_at: "2020-03-18T17:40:49.556Z",
      updated_at: "",
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

  @action
  updateTomato(payload: Tomato) {
    this.tomatoes = this.tomatoes.map((item) => {
      if (item.id === payload.id) {
        return payload;
      } else {
        return item;
      }
    });
  }

  @computed
  get unfinishedTomato() {
    return this.tomatoes.filter((tomato) => !tomato.description && !tomato.ended_at && !tomato.aborted)[0];
  }

  @computed
  get finishedTomato() {
    return this.tomatoes.filter((tomato) => tomato.description && tomato.ended_at && !tomato.aborted);
  }
}
