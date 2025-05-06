import {createRouter, createWebHashHistory} from "vue-router"

import HomeView from "./views/HomeView.vue"

import SplashView from "./views/SplashView.vue"



export default createRouter({
	history: createWebHashHistory(),
	routes: [
		 {
			component: SplashView,
			path: "/welcome/",
		}, 
		{
			component: HomeView,
			path: "/home",
		}

	],
})
