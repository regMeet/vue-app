import { defineStore } from "pinia";

interface PostsState {
  foo: string;
}

// name, state, update state
export const usePosts = defineStore("posts", {
  state: (): PostsState => ({
    foo: "foo",
  }),
  actions: {
    updateFoo(foo: string) {
      this.foo = foo;
      // this.$state.foo = foo;
    },
  },
});
