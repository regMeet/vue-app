import { defineStore } from "pinia";
import { Post, today, thisWeek, thisMonth } from "../posts";

interface PostsState {
  ids: string[]; // ["1", "2"]
  all: Map<string, Post>;
}

const initialState = {
  ids: [today.id, thisWeek.id, thisMonth.id],
  all: new Map([
    [today.id, today],
    [thisWeek.id, thisWeek],
    [thisMonth.id, thisMonth],
  ]),
};

// name, state, update state
export const usePosts = defineStore("posts", {
  state: (): PostsState => initialState,
  actions: {
    // ...
  },
});
