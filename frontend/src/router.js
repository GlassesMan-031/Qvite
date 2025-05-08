import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/homeView.vue";
import SplashView from "./views/SplashView.vue";
import transactionView from "./views/transactionView.vue";
import loginView from "./views/LoginView.vue"

// add router name so that we can choose where to display components

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: SplashView,
      path: "/",
      name: "splash"
    },
    {
      component: transactionView,
      path: "/transaction",
      name:"transaction"
    },
    {
      component: HomeView,
      path: "/home",
      name: "home"
    },
    		{
			component: loginView,
			path: "/login",
      name: "login"
		}
  ],
});