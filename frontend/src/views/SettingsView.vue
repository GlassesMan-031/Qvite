<template>
  <main>
    <!-- container for Account card, links to /account-settings -->
    <div class="account-card">
      <router-link to="/account-settings">
        <BContainer class="ac-top">
          <BRow>
            <BCol><h1 class="calsans-text">Account</h1></BCol> </BRow
          ><BRow>
            <BCol>
              <p>
                In this tab you can change your personal settings like username
                password and email.
              </p></BCol
            ></BRow
          >
        </BContainer>
      </router-link>
    </div>
    <!-- container for Balance Card, links to /balance-settings -->
    <div class="balance-card">
      <router-link to="/balance-settings">
        <BContainer class="bal-top">
          <BRow cols="2">
            <BCol><h1 class="calsans-text">Balance</h1></BCol>
          </BRow>
          <BRow>
            <BCol>
              <p>
                In this tab you can change your totalt balance that you want to
                visualize in the app.
              </p></BCol
            ></BRow
          >
        </BContainer>
      </router-link>
    </div>
    <!-- container for Budget Card, links to /budget-settings, empty as of 05/16 -->
    <div class="budgets-card">
      <router-link to="/budget-settings">
        <BContainer class="bud-top">
          <BRow cols="2">
            <BCol><h1 class="calsans-text">Budget</h1></BCol> </BRow
          ><BRow>
            <BCol>
              <p>
                In this tab you can edit your budgets. You can change the amount
                used and what amount it should have from the start.
              </p></BCol
            ></BRow
          >
        </BContainer>
      </router-link>
    </div>
    <!-- container for Logout Card, logs out user and leads back to / -->
    <div class="logout-card" v-on:click="logOutUser">
      <BContainer class="lo-button">
        <BRow cols="2">
          <BCol> </BCol>
        </BRow>
        <BRow>
          <BCol><h1 class="calsans-text-l">LOG OUT</h1></BCol>
        </BRow>
      </BContainer>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

// Clear localStorage, redirects to splashview
const router = useRouter();
const logOutUser = () => {
  localStorage.clear();
  router.push("/");
};
</script>

<style scoped>
nav {
  vertical-align: top;
  background-color: #5b8e7d;
  margin-top: 0px;
}
main {
  background-color: #5b8e7d;
  min-height: 100vh - 60px;
}
.account-card {
  min-height: 20vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}
.account-card a {
  text-decoration: none;
}
.balance-card {
  min-height: 20vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}
.balance-card a {
  text-decoration: none;
}
.budgets-card {
  min-height: 20vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}
.budgets-card a {
  text-decoration: none;
}
.logout-card {
  height: 60px;
  z-index: 2;
  background-color: #776b5d;
  color: #ebe3d5;
  border-radius: 12px;
  margin: 60px 20px 60px 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
  justify-content: center;
  display: flex;
  cursor: pointer;
}
p {
  font-family: "Darker Grotesque", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 1.2rem;
  color: #2c2a29;
}
.ac-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.ac-top h1 {
  font-size: 3rem;
}

.bal-top h1 {
  font-size: 3rem;
}

.bud-top h1 {
  font-size: 3rem;
}

p {
  font-family: "Darker Grotesque", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 1.2rem;
  color: #2c2a29;
}

.lo-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  cursor: pointer;
}

.calsans-text {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #2c2a29;
}
.calsans-text-l {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #ebe3d5;
}

.hugetext {
  font-size: 4rem;
}
</style>
