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
          <p class="lower-header">the sleek finance tracker</p>
        </BCol>
      </BCol>
      <BContainer fluid class="formContainer">
        <BRow>
          <BCol cols="10">
            <div class="form-input">
              <Input
                id="input-1"
                v-model="formData.productName"
                type="text"
                placeholder="Username"
              />
            </div>
          </BCol>
          <div class="form-input">
            <Input
              id="input-2"
              v-model="formData.productName"
              type="text"
              placeholder="Password"
            />
          </div>
          <BCol cols="10">
            <div id="login-container">
              <RouterLink to="/home" @click.prevent id="login-button"
                >Log in</RouterLink
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

const formData = ref({
  productName: "",
});
</script>

<style scoped>
.splash-box {
  position: relative;
  z-index: 10;
  /* background-color: white; */
  padding: 2rem;
  border-radius: 12px;
  display: inline-block;
  /* box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1); */
}

.logo-splash {
  /* display: block; */
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

.intro-text {
  margin-top: -14px;
}
.lower-header {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: bolder;
  color: #2c2a29;
  /* background-color: lightcoral; */
}

.form-input {
  width: auto;
  height: 48px;
  margin: 12px;
  padding: 12px;
  place-content: center;

  /* background-color: lightcoral; */
}

#input-1 {
  background-color: #f5f5f5;
  font-family: "Cal Sans", sans-serif;
  color: #2c2a29;
  height: 40px;
  width: 240px;
  text-align: center;
  border-radius: 6px;
  border: none;
  box-shadow: inset 5px 3px 3px #776b5d;
}

#input-2 {
  background-color: #f5f5f5;
  font-family: "Cal Sans", sans-serif;
  color: #2c2a29;
  height: 40px;
  width: 240px;
  text-align: center;
  border-radius: 6px;
  border: none;
  box-shadow: inset 5px 3px 3px #776b5d;
}

#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px; /* Slightly taller for comfort */
}

#login-button {
  display: inline-block; /* Ensures it's treated like a button */
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
