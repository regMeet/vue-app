import { defineStore } from "pinia";

interface PostsState {
  foo: string;
}

const initialState = {
  foo: "foo1",
};

// name, state, update state
export const usePosts = defineStore("posts", {
  state: (): PostsState => initialState,
  actions: {
    updateFoo(foo: string) {
      this.foo = foo;
      // this.$state.foo = foo;
    },
  },
});
