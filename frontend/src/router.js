import { createRouter, createWebHashHistory } from "vue-router";

import HomeView from "./views/homeView.vue";
import SplashView from "./views/SplashView.vue";
import transactionView from "./views/transactionView.vue";
import createView from "./views/createView.vue";
import BudgetsView from "./views/BudgetsView.vue";
import SettingsView from "./views/SettingsView.vue";
import ScanView from "./views/ScanView.vue";
import accountSettingsView from "./views/accountSettingsView.vue";
import budgetSettingsView from "./views/budgetSettingsView.vue";
import balanceSettingsView from "./views/balanceSettingsView.vue";

// add router name so that we can choose where to display components

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      component: SplashView,
      path: "/",
      name: "splash",
    },
    {
      component: transactionView,
      path: "/transaction",
      name: "transaction",
    },
    {
      component: HomeView,
      path: "/home",
      name: "home",
    },
    {
      component: BudgetsView,
      path: "/budgets",
      name: "budgets",
    },
    {
      component: createView,
      path: "/create",
      name: "create",
    },
    {
      component: SettingsView,
      path: "/settings",
      name: "settings",
    },
    {
      component: ScanView,
      path: "/scan",
      name: "scan",
    },
    {
      component: accountSettingsView,
      path: "/account-settings",
      name: "account settings",
    },
    {
      component: budgetSettingsView,
      path: "/budget-settings",
      name: "budget settings",
    },
    {
      component: balanceSettingsView,
      path: "/balance-settings",
      name: "balance settings",
    },
  ],
});
