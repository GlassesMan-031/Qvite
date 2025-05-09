import { defineStore } from "pinia";

export const useQvite = defineStore("qvite", {
  state: () => ({
    // set variables here
    users: null,
  }),
  actions: {
    // add global frontend-functions here:
    async getUsers() {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      console.log(users);
    },
  },
});
