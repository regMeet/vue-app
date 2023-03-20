import { defineStore } from "pinia";
import { Period } from "../constants";
import { Post, today, thisWeek, thisMonth } from "../posts";

interface PostsState {
  ids: string[]; // ["1", "2"]
  all: Map<string, Post>;
  selectedPeriod: Period;
}

// name, state, update state
export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    ids: [today.id, thisWeek.id, thisMonth.id],
    all: new Map([
      [today.id, today],
      [thisWeek.id, thisWeek],
      [thisMonth.id, thisMonth],
    ]),
    selectedPeriod: "Today",
  }),

  actions: {
    setSelectedPeriod(period: Period) {
      this.selectedPeriod = period;
    },
  },
});
