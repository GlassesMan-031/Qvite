import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/homeView.vue";
import SplashView from "./views/SplashView.vue";
import transactionView from "./views/transactionView.vue";
import createView from "./views/createView.vue"
import BudgetsView from "./views/BudgetsView.vue";

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
      component: BudgetsView,
      path: "/budgets",
      name: "budgets"
    },

   
    {
      component: createView,
			path: "/create",
      name: "create"

		}

   
  ],
});
