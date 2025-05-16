<template>

  <main>
    <div class="budgets-dashboard">
      <BContainer class="ad-top">
        <BRow cols="2">
          <BCol><h1 class="calsans-text">BUDGETS</h1></BCol>
        </BRow>

        <BRow>
          <!-- <BCol><p>todays date is 07/05</p></BCol> -->
        </BRow>
      </BContainer>
      <BContainer class="ad-mid">
        <BRow cols="1"></BRow>
        <p>current balance:</p></BContainer
      >
      <BContainer class="ad-bot">
        <BRow cols="3">
          <BCol
            ><h1 class="hugetext calsans-text">
              {{ balance }}
            </h1>
          </BCol>
        </BRow>
        <Bcol><p>sek</p></Bcol>
      </BContainer>
    </div>
    <!-- BYGG IN VFOR FÖR ATT HÄMTA BUDGETS HÄR SEN  -->

    <div class="add-Budget" @click="openAddBudget" style="cursor: pointer">
      <BContainer class="ab-button">
        <BRow cols="2">
          <BCol><img src="../assets/Icon-Add.png" alt="add icon" /></BCol
        ></BRow>
        <BRow>
          <BCol><h1 class="calsans-text">CREATE NEW BUDGET</h1></BCol>
        </BRow>
      </BContainer>
    </div>

    <!-- ADD BUDGET -->
    <div v-show="addBudget" class="form-container">
      <form action="" class="add-Budget" @submit.prevent="addChosenBudget">
        <select name="category" id="" v-model="formBudget.category">
          <option v-for="budget in availableBudgets">
            {{ budget }}
          </option>
        </select>
        <input
          type="text"
          placeholder="Insert amount here"
          v-model="formBudget.amount"
        />
        <button>ADD BUDGET</button>
      </form>
    </div>

    <div class="add-Budget">
      <BContainer v-for="(budget, index) in userBudgets" class="myBudgets-mid">
        <Brow>
          <BCol
            ><h1 class="calsans-text">{{ userBudgets[index].categoryName }}</h1>
          </BCol>
        </Brow>
        <Bcol
          ><h4 class="calsans-text">
            {{ userBudgets[index].budgetRemaining }}
          </h4></Bcol
        ></BContainer
      >
    </div>
  </main>

</template>

<script setup>
import { ref, computed } from "vue";
import { useQvite } from "../stores/qvite";

const qvite = useQvite();

let addBudget = ref(false);
let balance = ref(getBalance());
let userBudgets = ref(getBudgets());
let availableBudgets = ref(sortAvailableBudgets());

const formBudget = ref({
  category: "",
  amount: "",
});

// let printBalance = balance
async function getBalance() {

  const response = await fetch(
    `http://localhost:3000/api/account/${qvite.loggedInUser}`
  );

  console.log("loggedInUser: ", qvite.loggedInUser);

  const balanceInput = await response.json();
  console.log("user balance:", balanceInput);
  balance.value = balanceInput.account[0].accountBalance;

	return balance;
}

async function getBudgets() {
  const response = await fetch(
    `http://localhost:3000/api/${qvite.loggedInUser}`
  );

  const budgetInput = await response.json();
  userBudgets.value = budgetInput.userInfo;
  console.log("user budgets:", budgetInput.userInfo);

  return userBudgets;
}

async function sortAvailableBudgets() {
  // Hämta budget kategorier
  // Tag bort de kategorier som användaren redan har
  // Return array med available kategorier
  const response = await fetch(`http://localhost:3000/api/budget/categories`);

  let selectableCategories = [];
  let allCategories = [];
  let userCategories = [];
  const categories = await response.json();

  for (let i = 0; i < categories.length; i++) {
    allCategories.push(categories[i].categoryName);
  }

  for (let i = 0; i < userBudgets.value.length; i++) {
    userCategories.push(userBudgets.value[i].categoryName);
  }

  selectableCategories = allCategories.filter(function (val) {
    return userCategories.indexOf(val) == -1;
  });

  console.log(
    "selectableCategories: ",
    selectableCategories,
    "userCategories: ",
    userCategories,
    "allCategories: ",
    allCategories
  );

  availableBudgets.value = selectableCategories;

  return selectableCategories;
}

function openAddBudget() {
  addBudget.value = !addBudget.value;
  console.log("addBudget: ", addBudget.value);
}

async function addChosenBudget() {
  console.log(formBudget.value);
  const catName = await fetch(`http://localhost:3000/api/budget/categories`);

  let allCategories = [];
  const categories = await catName.json();

  for (let i = 0; i < categories.length; i++) {
    allCategories.push(categories[i].categoryName);
  }

  console.log(
    "indexOf: ",
    allCategories.indexOf(formBudget.value.category) + 1
  );

  const response = await fetch(
    `http://localhost:3000/api/budgets/${qvite.loggedInUser}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        budgetCategoryId: allCategories.indexOf(formBudget.value.category) + 1,
        budgetAmount: formBudget.value.amount,
      }),
    }
  );
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
.budgets-dashboard {
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

.add-Budget {
	min-height: 60px;
	z-index: 2;
	background-color: #ebe3d5;
	color: #2c2a29;
	border-radius: 12px;
	margin: 20px;
	padding: 6px;
	box-shadow: 0px 7px 15px #2c2a29;
}

.ab-button {
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
