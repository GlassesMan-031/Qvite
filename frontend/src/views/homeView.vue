<template>
	<main>
		<nav>
			<h3>This is the homepage</h3>
		</nav>

		<div class="account-dashboard">
			<BContainer class="ad-top">
				<BRow cols="2">
					<BCol><h1 class="calsans-text">HOME</h1></BCol>
				</BRow>

				<BRow>
					<BCol><p>todays date is 07/05</p></BCol>
				</BRow>
			</BContainer>
			<BContainer class="ad-mid">
				<BRow cols="1"></BRow>
				<p>current balance:</p></BContainer
			>
			<BContainer class="ad-bot">
				<BRow cols="3">
					<BCol><h1 class="hugetext calsans-text">4200</h1> </BCol>
				</BRow>
				<Bcol><p>sek</p></Bcol>
			</BContainer>
		</div>

		<div class="account-dashboard">
			<BContainer class="ad-top">
				<BRow cols="2">
					<BCol><h1 class="calsans-text">HOME</h1></BCol>
				</BRow>

				<BRow>
					<BCol><p>todays date is 07/05</p></BCol>
				</BRow>
			</BContainer>
			<BContainer class="ad-mid">
				<BRow cols="1"></BRow>
				<p>current balance:</p></BContainer
			>
			<BContainer class="ad-bot">
				<BRow cols="3">
					<BCol><h1 class="hugetext calsans-text">4200</h1> </BCol>
				</BRow>
				<Bcol><p>sek</p></Bcol>
			</BContainer>
		</div>

		<div class="account-dashboard">
			<BContainer class="ad-top">
				<BRow cols="2">
					<BCol><h1 class="calsans-text">HOME</h1></BCol>
				</BRow>

				<BRow>
					<BCol><p>todays date is 07/05</p></BCol>
				</BRow>
			</BContainer>
			<BContainer class="ad-mid">
				<BRow cols="1"></BRow>
				<p>current balance:</p></BContainer
			>
			<BContainer class="ad-bot">
				<BRow cols="3">
					<BCol><h1 class="hugetext calsans-text">4200</h1> </BCol>
				</BRow>
				<Bcol><p>sek</p></Bcol>
			</BContainer>
		</div>
	</main>
</template>

<script setup>
import { ref, computed } from "vue";
</script>

<style scoped>
nav {
	vertical-align: top;
	margin-top: 0px;
}
main {
	background-color: #5b8e7d;
	min-height: 100vh;
}
.account-dashboard {
	min-height: 20vh;
	/* display: flex; */
	/* flex-direction: row; */
	/* justify-content: space-around; */
	z-index: 2;
	background-color: #ebe3d5;
	border-radius: 12px;
	margin: 20px;
	padding: 6px;
	box-shadow: 0px 7px 15px #2c2a29;
}
p {
	font-family: "Darker Grotesque", sans-serif;
	font-optical-sizing: auto;
	font-weight: 400;
	font-style: normal;
	font-size: 1.2rem;
	color: #2c2a29;
}
.ad-top {
	display: flex;
	flex-direction: row;
	justify-content: space-between;
}

.ad-mid {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
	height: 60px;
}

.ad-bot {
	display: flex;
	flex-direction: row;
	justify-content: flex-start;
	align-items: flex-end;
}

.calsans-text {
	font-family: "Cal Sans", sans-serif;
	font-weight: 400;
	font-style: normal;
	color: #2c2a29;
}

.hugetext {
	font-size: 4rem;
}
</style>
