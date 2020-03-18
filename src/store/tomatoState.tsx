import { observable, action, computed } from "mobx";

// interface Tomato extends Object {
//   id: number;
//   user_id: number;
//   start_at: string;
//   description: string | null;
//   ended_at: string | null;
//   duration: number;
//   created_at: string;
//   update_at: string;
// }
export class tomatoState {
  @observable
  tomatoes = [
    {
      id: 18295,
      user_id: 9938,
      started_at: "2020-03-18T16:19:55.642Z",
      ended_at: "",
      description: "",
      // aborted: null,
      // manually_created: null,
      // extra: null,
      duration: 1500000,
      created_at: "2020-03-18T16:19:55.643Z",
      updated_at: "2020-03-18T16:19:55.643Z",
    },
  ];

  @action
  addTomato(payload: any) {
    this.tomatoes = [payload, ...this.tomatoes];
  }
  @action
  initTomato(payload: any) {
    this.tomatoes = payload;
  }

  @computed
  get unfinishedTomato() {
    return this.tomatoes.filter((tomato) => !tomato.description && !tomato.ended_at)[0];
  }
}
