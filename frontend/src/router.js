import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/HomeView.vue";
import SplashView from "./views/SplashView.vue";
import transactionView from "./views/transactionView.vue";
import createView from "./views/createView.vue"

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: SplashView,
      path: "/",
    },
    {
      component: transactionView,
      path: "/transaction",
    },
    {
      component: HomeView,
      path: "/home",
    },
    		{
			component: createView,
			path: "/create",
		}
  ],
});