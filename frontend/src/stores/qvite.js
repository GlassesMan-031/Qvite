import { defineStore } from "pinia";



export let useQvite = defineStore("qvite", {
  state: () => ({
    // set variables here
    users: "",
    usersInfo: "",
    userName: loginData.username,
    usersPassword:""
  }),
  actions: {
    // add global frontend-functions here:
    async getUsers() {
      let response = await fetch("http://localhost:3000/api/users");
      let users = await response.json();
      console.log(users);
    },
 // shows users credentials in console
    async showLogin() {
      try {
        for (let i = 0; i < this.usersInfo.users.length; i++) {
          console.log(this.usersInfo.users[i].usersName);
          console.log(this.usersInfo.users[i].usersPassword);
        }
      } catch (error) {
        console.error(" fetch is fucked up:", error);
      }
    },
  //  Fetches the usercredentials from MySQL
    async getUsersSplash() {
      try {
        const response = await fetch("http://localhost:3000/api/users");
    
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
    
        this.usersInfo = await response.json();
    
        this.showLogin();

        return this.usersInfo;
      } catch (error) {
        console.error("Error at user fetch:", error);
      }
      
    },

  },
});





