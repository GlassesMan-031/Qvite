<template>
  <main>
    <div class="scan-dashboard">
      <BContainer class="ad-top">
        <BRow cols="1">
          <BCol><h1 class="calsans-text">SCAN</h1></BCol>
          <BCol><p>This feature is not available in QVITE v.1</p></BCol>
        </BRow>
      </BContainer>
      <BContainer class="ad-mid">
        <BRow cols="1"></BRow>
        <p>We are still working on it. Come back later.</p></BContainer
      >
    </div>

    <div class="scanReciept-dashboard">
      <BContainer class="sr-button">
        <BRow cols="2">
          <BCol
            ><img src="../assets/Icon-ScanReciept.png" alt="add icon" /></BCol
        ></BRow>
        <BRow>
          <BCol><h1 class="calsans-text">SCAN RECIEPT</h1></BCol>
        </BRow>
      </BContainer>
    </div>

    <div class="worker-holder">
      <img src="/work.gif" />
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQvite } from "../stores/qvite";

const qvite = useQvite();
let balance = ref(getBalance());
// let printBalance = balance
async function getBalance() {
  const response = await fetch(
    `http://localhost:3000/api/${qvite.loggedInUser}/account`
  );

  const balanceInput = await response.json();
  balance.value = balanceInput.account[0].accountBalance;
  console.log("this is the current received balance:", balance);

  return balance;
}
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
.scan-dashboard {
  min-height: 20vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
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
  justify-content: center;
}
.ad-top h1 {
  font-size: 3rem;
}

.ad-mid {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-end;
  height: 30px;
}

.ad-bot {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-end;
}

.myBudgets-dashboard {
  min-height: 20vh;

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
.myBudgets-top {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: solid 1px #776b5d;
}

.myBudgets-mid {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-end;
  height: 60px;
  border-bottom: solid 1px #776b5d;
}

.addTransaction-dashboard {
  min-height: 60px;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.at-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}

.scanReciept-dashboard {
  min-height: 60px;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.sr-button {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  place-items: center;
  text-decoration: dashed;
}
.sr-button h1 {
  color: #bc4b51;
  text-decoration: line-through;
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

.worker-holder {
  min-height: 50vh;
  z-index: 2;
  background-color: #ebe3d5;
  overflow: hidden;
  color: #2c2a29;
  border-radius: 12px;
  margin: 40px 20px 40px 20px;
  /* padding: 6px; */
  box-shadow: 0px 7px 15px #2c2a29;
}

.worker-holder img {
  object-fit: cover;
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
