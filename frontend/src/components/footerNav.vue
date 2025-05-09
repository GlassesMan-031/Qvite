<template>
	<section id="sectionFooter">
		<!-- renders navbar using vfor -->
		<div
			v-for="item in navItems"
			:key="item.name"
			class="icon-container"
			:class="{
				'home-icon': item.name === 'home',
				'budgets-icon': item.name === 'budgets',
				'add-icon': item.name === 'add',
				'scan-icon': item.name === 'scan',
				'settings-icon': item.name === 'settings',
			}"
		>
			<router-link :to="item.path" :aria-label="item.name">
				<!-- Active state with darker background -->
				<div
					v-if="
						$route.path === item.path ||
						($route.path === '/' && item.path === '/home')
					"
					class="active-container"
				>
					<svg
						class="nav-icon"
						width="52"
						height="52"
						viewBox="0 0 52 52"
						place-items="center"
					>
						<path
							v-for="(path, index) in Array.isArray(item.iconPath)
								? item.iconPath
								: [item.iconPath]"
							:key="index"
							:d="path"
							stroke="#ebe3d5"
							fill="none"
							viewBox="0 0 52 52"
							width="52"
							height="52"
							transform="scale(2)"
						/>
					</svg>
				</div>
				<!-- Inactive state -->
				<div v-else>
					<svg
						class="nav-icon"
						width="52"
						height="52"
						viewBox="0 0 52 52"
						place-items="center"
					>
						<path
							v-for="(path, index) in Array.isArray(item.iconPath)
								? item.iconPath
								: [item.iconPath]"
							:key="index"
							:d="path"
							stroke="#776B5D"
							fill="none"
							transform="scale(2)"
						/>
					</svg>
				</div>
			</router-link>
		</div>
	</section>
</template>

<!-- The array called navItems holds all the svgfiles for the navbar -->

<script>
export default {
	name: "Navbar",
	data() {
		return {
			navItems: [
				{
					name: "home",
					path: "/home",
					iconPath:
						"M14 20V14C14 12.8954 13.1046 12 12 12C10.8954 12 10 12.8954 10 14V20M10.9833 3.60011L4.98335 7.14177C4.37395 7.50149 4 8.15646 4 8.8641V18C4 19.1046 4.89543 20 6 20H18C19.1046 20 20 19.1046 20 18V8.8641C20 8.15646 19.6261 7.50149 19.0167 7.14177L13.0167 3.60011C12.3894 3.22988 11.6106 3.22988 10.9833 3.60011Z", // Home icon SVG path
				},
				{
					name: "budgets",
					path: "/budgets",
					iconPath:
						"M5 19.5002V6.2002C5 5.08009 5 4.51962 5.21799 4.0918C5.40973 3.71547 5.71547 3.40973 6.0918 3.21799C6.51962 3 7.08009 3 8.2002 3H17.4002C17.9602 3 18.2407 3 18.4546 3.10899C18.6427 3.20487 18.7948 3.35774 18.8906 3.5459C18.9996 3.75981 19 4.04005 19 4.6001V16.4001C19 16.9601 18.9996 17.2398 18.8906 17.4537C18.7948 17.6419 18.6429 17.7952 18.4548 17.8911C18.2411 18 17.961 18 17.402 18H7.25C6.00736 18 5 19.0074 5 20.25C5 20.6642 5.33579 21 5.75 21H16.402C16.961 21 17.2411 21 17.4548 20.8911C17.6429 20.7952 17.7948 20.642 17.8906 20.4538C17.9996 20.2399 18 19.9601 18 19.4V18", // budgets icon SVG path
				},
				{
					name: "add",
					path: "/transaction",
					iconPath:
						"M8 12H12M12 12H16M12 12V16M12 12V8M4 16.8002V7.2002C4 6.08009 4 5.51962 4.21799 5.0918C4.40973 4.71547 4.71547 4.40973 5.0918 4.21799C5.51962 4 6.08009 4 7.2002 4H16.8002C17.9203 4 18.4801 4 18.9079 4.21799C19.2842 4.40973 19.5905 4.71547 19.7822 5.0918C20.0002 5.51962 20.0002 6.07967 20.0002 7.19978V16.7998C20.0002 17.9199 20.0002 18.48 19.7822 18.9078C19.5905 19.2841 19.2842 19.5905 18.9079 19.7822C18.4805 20 17.9215 20 16.8036 20H7.19691C6.07899 20 5.5192 20 5.0918 19.7822C4.71547 19.5905 4.40973 19.2842 4.21799 18.9079C4 18.4801 4 17.9203 4 16.8002Z", // add icon SVG path
				},
				{
					name: "scan",
					path: "/scan",
					iconPath: [
						// Camera frame
						"M15.0858 3.58579C14.7107 3.21071 14.202 3 13.6716 3H10.3284C9.79799 3 9.28929 3.21071 8.91421 3.58579L8.08579 4.41421C7.71071 4.78929 7.20201 5 6.67157 5H5C3.89543 5 3 5.89543 3 7L3 17C3 18.1046 3.89543 19 5 19H19C20.1046 19 21 18.1046 21 17V7C21 5.89543 20.1046 5 19 5H17.3284C16.798 5 16.2893 4.78929 15.9142 4.41421L15.0858 3.58579Z",
						// Camera lens
						"M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z",
					],
				},
				{
					name: "settings",
					path: "/settings",
					iconPath:
						"M15 11a4.002 4.002 0 0 1-3.874-3H3a1 1 0 0 1 0-2h8.126a4.002 4.002 0 0 1 7.748 0H21a1 1 0 1 1 0 2h-2.126A4.002 4.002 0 0 1 15 11zM3 16a1 1 0 1 0 0 2h2.126a4.002 4.002 0 0 0 7.748 0H21a1 1 0 1 0 0-2h-8.126a4.002 4.002 0 0 0-7.748 0H3zm12-7a2 2 0 1 0 0-4 2 2 0 0 0 0 4zm-4 8a2 2 0 1 1-4 0 2 2 0 0 1 4 0z", // settings icon SVG path
				},
			],
		};
	},
};
</script>

<style scoped>
#sectionFooter {
	display: flex;
	justify-content: space-around;
	background-color: #ebe3d5;
	min-height: 50px;
	position: fixed;
	bottom: 0;
	width: 100vw;
}

.navbar {
	background-color: #333; /* Dark navbar background */
	display: flex;
	justify-content: space-around;
}

.icon-container {
	display: flex;
	min-width: 60px;
	min-height: 60px;

	justify-content: center;
	align-items: center;
}

.active-container {
	background-color: #776b5d;
	display: flex;
	place-items: center;
	min-width: 60px;
	min-height: 60px;
	align-items: center;
	justify-content: center;
}

.nav-icon {
	color: #fff;
	min-width: 44px;
	min-height: 44px;
}

.active-container .nav-icon {
	color: #f0f0f0;
}

.icon-container:hover .nav-icon {
	color: #f0f0f0;
}
</style>
