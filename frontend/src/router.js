import {createRouter, createWebHashHistory} from "vue-router"

import HomeView from "./views/HomeView.vue"

/* import AboutView from "./views/AboutView.vue"

import MyAccountView from "./views/MyAccountView.vue"

import NewProductView from "./views/NewProductView.vue"

import SelectedProductView from "./views/SelectedProductView.vue"

import LoggedInView from "./views/LoggedInView.vue"

import SettingsView from "./views/SettingsView.vue" */




export default createRouter({
	history: createWebHashHistory(),
	routes: [
		/* {
			component: AboutView,
			path: "/about",
		}, */
		{
			component: HomeView,
			path: "/",
		},
		/* {
			component: MyAccountView,
			path: "/myaccount",
		},
		{
			component: NewProductView,
			path: "/newproduct",
		},
		{
			component: SelectedProductView,
			path: "/selectedproduct/:id",
		},
		{
			component: LoggedInView,
			path: "/loggedinview/",
		},
		{
			component: SettingsView,
			path: "/settings/",
		}, */


	],
})
