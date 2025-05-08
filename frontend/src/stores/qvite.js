import { defineStore } from "pinia";

export const useQvite = defineStore("qvite", {
  state: () => ({
    // set variables here
  }),
  actions: {
    // add global frontend-functions here:
    async fetchUsers() {
      const response = await fetch("/api/users");
      const users = await response.json();
      return users;
    },
  },
});
