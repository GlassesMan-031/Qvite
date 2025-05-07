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
          <p class="calsans-text">the sleek finance tracker</p>
        </BCol>
      </BCol>
      <BContainer fluid class="formContainer">
        <h2>An input formula is supposed to go here !</h2>
        <BRow>
          <BCol cols="10">
            <div class="productName">
              <BFormGroup label="Namn på produkt" label-for="input-1">
                <BFormInput
                  id="input-1"
                  v-model="formData.productName"
                  type="text"
                  placeholder="Skriv här"
                />
              </BFormGroup>
            </div>
          </BCol>
        </BRow>
      </BContainer>
    </BRow>
  </BContainer>
</template>

<script setup>
import { ref } from "vue";

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
  /* background-image: url("/bg.png"); */
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
.calsans-text {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #2c2a29;
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
