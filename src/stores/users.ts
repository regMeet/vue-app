import { defineStore } from "pinia";
import { NewUser } from "../users";

interface UsersState {
  currentUserId?: string;
}

export const useUsers = defineStore("users", {
  state: () => ({
    currentUserId: undefined,
  }),

  actions: {
    async authenticate() {
      try {
        const res = await window.fetch("/api/current-user", {
          headers: {
            method: "GET",
            "Content-Type": "application/json",
          },
        });

        const result = await res.json();
        this.currentUserId = result.id;
      } catch (error) {
        // first time might get 404
      }
    },
    async logout() {
      await window.fetch("/api/logout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });

      this.currentUserId = undefined;
      return;
    },
    async loginUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      const res = await window.fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      return { error: [401, 404].includes(res.status) };
    },
    async createUser(newUser: NewUser) {
      const body = JSON.stringify(newUser);

      await window.fetch("/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body,
      });

      return this.authenticate();
    },
  },
});
