<template>
  <main>
    <div class="balance-card">
      <BContainer class="balance-top">
        <BRow>
          <BCol><h1 class="calsans-text">Your Balance</h1></BCol> </BRow
        ><BRow>
          <BCol>
            <p>
              This is the current chosen balance<br />
              Your current <strong>balance</strong> is
              <br />
              <span class="hugetext">{{ balance }}</span>
            </p></BCol
          ></BRow
        >
      </BContainer>
    </div>
    <div class="edit-bal-card">
      <BContainer class="edit-bal-top">
        <BRow cols="2">
          <BCol><h1 class="calsans-text">Edit Balance</h1></BCol>
        </BRow>
        <BRow>
          <BCol>
            <p>
              This is where you can change the assigned
              <strong>balance</strong>.
            </p></BCol
          ></BRow
        >
        <BRow class="input-field">
          <BCol>
            <input
              type="text"
              placeholder="Enter Balance"
              v-model="newBalance"
            />
          </BCol>
          <BCol>
            <button
              type="submit"
              :disabled="!newBalance"
              @click="submitBalance"
            >
              Change Balance
            </button>
          </BCol>
        </BRow>
      </BContainer>
    </div>
  </main>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useQvite } from "../stores/qvite";
const qvite = useQvite();
const router = useRouter();
let balance = ref(getBalance());
const newBalance = ref("");

async function getBalance() {
  const response = await fetch(
    `http://localhost:3000/api/account/${qvite.loggedInUser}`
  );

  const balanceInput = await response.json();
  balance.value = balanceInput.account[0].accountBalance;
  console.log("this is the current received balanceInput:", balanceInput);

  return balance;
}

const submitBalance = async () => {
  try {
    const response = await fetch(
      `http://localhost:3000/api/${qvite.loggedInUser}/account`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountBalance: newBalance.value,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to update balance");

    localStorage.setItem("loggedInBalance", newBalance.value);
    qvite.loggedInBalance = newBalance.value;

    newBalance.value = "";

    console.log("Balance updated successfully");
  } catch (error) {
    console.error("Error updating Balance:", error);
  }
  getBalance();
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
.balance-card {
  max-height: 28vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.edit-bal-card {
  max-height: 28vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.balance-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.balance-top h1 {
  font-size: 2.5rem;
}
.edit-bal-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.edit-bal-top h1 {
  font-size: 2.5rem;
}

.input-field {
  display: flex;
  flex-direction: column;
  justify-items: center;
  margin-top: 10px;
  padding-bottom: 20px;
}
input {
  background-color: #776b5d;
  margin: 2px;
  border-radius: 4px;
}

p {
  font-family: "Darker Grotesque", sans-serif;
  font-optical-sizing: auto;
  font-weight: 400;
  font-style: normal;
  font-size: 1.2rem;
  color: #2c2a29;
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
button {
  border-radius: 12px;
  margin: 8px;
  background-color: #5b8e7d;
  box-shadow: 5px 3px 3px #776b5d;
}
</style>
