import { defineStore } from "pinia";
import { ref } from "vue";
import { useLocalStorage } from "@vueuse/core";
export const useQvite = defineStore("qvite", {
  state: () => ({
    // set variables here

    loggedInUser: useLocalStorage("loggedInUser", ""),

    usersInfo: null, // SplashView.vue
    userName: "", // SplashView.vue
    userPassword: "", // SplashView.vue

    createUsers: null, // CreateView.vue
    createName: "", // CreateView.vue
    createUsername: "", // CreateView.vue
    createEmail: "", // CreateView.vue
    createPassword: "", // CreateView.vue
    isLoading: false, // CreateView.vue
  }),
  actions: {
    async getUsers() {
      const response = await fetch("http://localhost:3000/api/users");
      const users = await response.json();
      console.log(users);
    },

    async registerUser() {
      try {
        this.isLoading = true;

        // Client-side validation
        if (
          !this.createName ||
          !this.createUsername ||
          !this.createEmail ||
          !this.createPassword
        ) {
          throw new Error("Please fill in all fields.");
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(this.createEmail)) {
          throw new Error("Please enter a valid email address.");
        }

        if (this.createPassword.length < 8) {
          throw new Error("Password must be at least 8 characters long.");
        }

        // Check if user already exists
        const responseCheck = await fetch(
          `http://localhost:3000/api/check-user?usersName=${encodeURIComponent(
            this.createUsername
          )}&usersEmail=${encodeURIComponent(this.email)}`
        );
        if (!responseCheck.ok) {
          throw new Error("Error checking user existence");
        }

        const dataCheck = await responseCheck.json();
        if (dataCheck.exists) {
          throw new Error("A user with this username or email already exists.");
        }

        // Create new user
        const response = await fetch("http://localhost:3000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: this.createName,
            usersName: this.createUsername,
            usersEmail: this.createEmail,
            usersPassword: this.createPassword,
          }),
        });

        const result = await response.json();

        if (!response.ok) {
          console.log("!Response.ok: ", !response.ok);
          console.log("Response status: ", response.status);
          console.log("Response body:", result);
          throw new Error(result.error || "Error creating user.");
        }

        console.log("User created: ", result);
        this.createName = "";
        this.createUsername = "";
        this.createEmail = "";
        this.createPassword = "";
        return result; // Return result for component to handle
      } catch (err) {
        console.error("Error: ", err.message);
        throw err; // Re-throw error for component to handle
      } finally {
        this.isLoading = false;
      }
    },
    async getUsersSplash() {
      try {
        const response = await fetch("http://localhost:3000/api/users");

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        this.usersInfo = await response.json();
        return this.usersInfo;
      } catch (error) {
        console.error("Error at user fetch:", error);
        throw error;
      }
    },
    // add global frontend-functions here:
  },
});
