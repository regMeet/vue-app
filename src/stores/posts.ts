import { DateTime } from "luxon";
import { defineStore } from "pinia";
import { Period } from "../constants";
import { Post, today, thisWeek, thisMonth, TimelinePost } from "../posts";

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

  getters: {
    // similar to computed properties
    filteredPosts: (state): TimelinePost[] => {
      return state.ids
        .map((id) => {
          const post = state.all.get(id)!;
          return {
            ...post,
            created: DateTime.fromISO(post.created),
          };
        })
        .filter((post) => {
          if (state.selectedPeriod === "Today") {
            return post.created >= DateTime.now().minus({ day: 1 });
          }

          if (state.selectedPeriod === "This Week") {
            return post.created >= DateTime.now().minus({ week: 1 });
          }

          return post;
        });
    },
  },
});
