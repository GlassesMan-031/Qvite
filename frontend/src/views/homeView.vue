<template>
  <main>
    <div class="account-dashboard">
      <BContainer class="ad-top">
        <BRow cols="2">
          <BCol><h1 class="calsans-text">HOME</h1></BCol>
          <Bcol
            ><h5>welcome {{ qvite.loggedInUser }}</h5></Bcol
          >
        </BRow>
        <BRow>
          <BCol></BCol>
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
    <!-- BYGG IN VFOR FÖR ATT HÄMTA BUDGETS HÄR SEN  -->
    <div class="myBudgets-dashboard">
      <BContainer class="myBudgets-top">
        <BRow cols="2">
          <BCol><h4 class="calsans-text">my budgets</h4></BCol>
        </BRow>
        <BRow>
          <BCol><p>remaining:</p></BCol>
        </BRow>
      </BContainer>
      <BContainer class="myBudgets-mid">
        <Brow>
          <BCol><h1 class="calsans-text">Groceries</h1> </BCol>
        </Brow>
        <Bcol><h4 class="calsans-text">400</h4></Bcol></BContainer
      >

      <BContainer class="myBudgets-mid">
        <Brow>
          <BCol><h1 class="calsans-text">Leisure</h1> </BCol>
        </Brow>
        <Bcol><h4 class="calsans-text">120</h4></Bcol></BContainer
      >

      <BContainer class="myBudgets-mid">
        <Brow>
          <BCol><h1 class="calsans-text">Transport</h1> </BCol>
        </Brow>
        <Bcol><h4 class="calsans-text">180</h4></Bcol></BContainer
      >

      <BContainer class="myBudgets-mid">
        <Brow>
          <BCol><h1 class="calsans-text">Shopping</h1> </BCol>
        </Brow>
        <Bcol><h4 class="calsans-text">420</h4></Bcol></BContainer
      >
    </div>

    <div class="addTransaction-dashboard">
      <BContainer class="at-button">
        <BRow cols="2">
          <BCol
            ><img
              src="../assets/Icon-AddTransaction.png"
              alt="add icon" /></BCol
        ></BRow>
        <BRow>
          <BCol><h1 class="calsans-text">ADD TRANSACTION</h1></BCol>
        </BRow>
      </BContainer>
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
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useQvite } from "../stores/qvite";

const qvite = useQvite();
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
.account-dashboard {
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
  justify-content: space-between;
}
.ad-top h1 {
  font-size: 3rem;
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
