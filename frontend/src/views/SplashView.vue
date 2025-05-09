<template>
	<BContainer fluid class="splash-background">
		<BRow>
			<BCol cols="12" class="text-center">
				<BCol cols="12" class="splash-box">
					<img
						class="logo-splash"
						src="/logoblack.png"
						alt="QVITE Logo"
						fluid
					/>
					<h3 class="lower-header">the sleek finance tracker</h3>
				</BCol>
			</BCol>

			<BContainer fluid class="formContainer">
				<BRow>
					<BCol cols="12" class="d-flex flex-column align-items-center">
						<div class="form-input">
							<BaseInput
								id="input-1"
								placeholder="Username"
								v-model="qvite.userName"
							/>
						</div>
						<!-- <p>{{ loginData.username }}</p> -->
						<div class="form-input">
							<BaseInput
								id="input-2"
								type="password"
								placeholder="Password"
								v-model="qvite.usersPassword"
							/>
						</div>
						<!-- <p>{{ loginData.Football }}</p> -->
						<div id="login-container">
							<button to="/home" @click="handleSubmit" id="login-button">
								Log in
							</button>
						</div>
						<div class="bottom-links-wrapper">
							<RouterLink to="/create" class="bottom-links"
								>Create Account</RouterLink
							>
							<RouterLink to="/recover" class="bottom-links"
								>Forgot password?</RouterLink
							>
						</div>
					</BCol>
				</BRow>
			</BContainer>
		</BRow>
	</BContainer>
</template>

<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import BaseInput from "../components/BaseInput.vue";
import { useQvite } from "../stores/qvite";

const qvite = useQvite();

// useQvite();
const handleSubmit = async () => {
	try {
		const result = await qvite.getUsersSplash();
		console.log(result);
	} catch (error) {
		console.log("someting is wrong! ");
	}
	if (qvite.userName && qvite.usersPassword) {
		if (
			loginData.username == qvite.usersInfo.users.usersName &&
			loginData.Football == qvite.usersInfo.users.usersPassword
		) {
			console.log("Credentials are correct! ");
		}
	}
};

// let usersInfo;
/* async function getUsersSplash() {
	try {
		const response = await fetch("http://localhost:3000/api/users");

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		usersInfo = await response.json();
		console.log(
			"User information:",
			usersInfo.users[i].usersName,
			usersInfo.users[i].usersPassword
		);
		return usersInfo;
	} catch (error) {
		console.error("Error at user fetch:", error);
	}
	showLogin();
} */

/* async function showLogin() {
	try {
		for (let i = 0; i < usersInfo.users.length; i++) {
			console.log(usersInfo.users[i].usersName);
			console.log(usersInfo.users[i].usersPassword);
		}
	} catch (error) {
		console.error("Error at user fetch:", error);
	}
} */
async function compareLogin() {
	// fetching users upon buttonclick
	// input-1 = usersName > compare input-1 to usersName in db
	// input-2 = usersPassword > compare input-2 to usersPassword in db
	// locks signin button unless fields have content
	// redirects to /home if conditions meet
}

// switched out password to Football for simple security
let loginData = ref({
	username: null,
	Football: null,
});
</script>

<style scoped>
.splash-box {
	position: relative;
	z-index: 10;
	padding: 2rem;
	border-radius: 12px;
	display: inline-block;
}

.logo-splash {
	max-width: 300px;
	z-index: 10;
	position: relative;
}

.splash-background {
	background-image: url("/bg.png");
	background-size: cover;
	background-position: center;
	background-repeat: no-repeat;
	min-height: 100vh;
	width: 100%;
	position: relative;
	display: flex;
	place-items: center;
	justify-content: center;
}

.splash-background::before {
	content: "";
	position: absolute;
	inset: 0;
	background-color: rgba(255, 255, 255, 0.25);
	z-index: 1;
}

body {
	background-color: #ebe3d5;
	color: #b0a695;
}

.lower-header {
	font-family: "Cal Sans", sans-serif;
	font-weight: 400;
	font-style: bolder;
	color: #2c2a29;
}

.form-input {
	width: auto;
	height: 48px;
	margin: 12px;
	padding: 12px;
	place-content: center;
	z-index: 10;
	position: relative;
}

#login-container {
	display: flex;
	justify-content: center;
	align-items: center;
	height: 60px;
}

#login-button {
	display: inline-block;
	background-color: #5b8e7d;
	font-family: "Cal Sans", sans-serif;
	margin: 12px auto;
	padding: 0 1rem;
	height: 40px;
	width: 240px;
	border-radius: 6px;
	box-shadow: 5px 3px 3px #776b5d;
	text-align: center;
	line-height: 40px;
	color: white;
	text-decoration: none;
	z-index: 10;
	position: relative;
}

.bottom-links-wrapper {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 4px;
	margin-top: 10px;
	z-index: 10;
	position: relative;
}

.bottom-links {
	color: #2c2a29;
	font-weight: bold;
	font-family: "Cal Sans", sans-serif;
	text-decoration: underline;
	text-decoration-thickness: 2px;
	text-underline-offset: 2px;
	z-index: 10;
	cursor: pointer;
}

.darkerG-Bold {
	font-family: "Darker Grotesque", sans-serif;
	font-optical-sizing: auto;
	font-weight: bold;
	font-style: normal;
}

.darkerG-Light {
	font-family: "Darker Grotesque", sans-serif;
	font-optical-sizing: auto;
	font-weight: 600;
	font-style: normal;
	color: #b0a695;
}

.darkerG-Normal {
	font-family: "Darker Grotesque", sans-serif;
	font-optical-sizing: auto;
	font-weight: normal;
	font-style: normal;
}
</style>
