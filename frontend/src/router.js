import {createRouter, createWebHashHistory} from "vue-router"

import HomeView from "./views/HomeView.vue"

import SplashView from "./views/SplashView.vue"

import loginView from "./views/LoginView.vue"

export default createRouter({
	history: createWebHashHistory(),
	routes: [
		 {
			component: SplashView,
			path: "/",
		}, 
		{
			component: HomeView,
			path: "/home",
		},
		{
			component: loginView,
			path: "/login",
		}

	],
})
