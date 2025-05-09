<template>
  <main class="background">
    <form @submit.prevent="createTransaction">
      <h1 class="calsans-text">Add Transaction</h1>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto"><img src="" alt="Icon" /></div>
          <div class="col-auto"><p class="mb-0">Recurring</p></div>
          <div class="col-auto">
            <input type="checkbox" v-model="formData.recurring" />
          </div>
        </div>
      </div>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto"><img src="" alt="Icon" /></div>
          <div class="col-auto"><p class="mb-0">Budget</p></div>
          <div class="col-auto">
            <input
              type="option"
              v-model="formData.budget"
              placeholder="Budget here.."
            />
          </div>
        </div>
      </div>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto"><img src="" alt="Icon" /></div>
          <div class="col-auto"><p class="mb-0">Amount</p></div>
          <div class="col-auto">
            <input
              type="text"
              v-model="formData.amount"
              placeholder="Amount here.."
            />
          </div>
        </div>
      </div>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto"><img src="" alt="Icon" /></div>
          <div class="col-auto"><p class="mb-0">Photo</p></div>
          <div class="col-auto">
            <input type="file" @change="onFileSelected" name="photo" />
          </div>
        </div>
      </div>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto"><img src="" alt="Icon" /></div>
          <div class="col-auto"><p class="mb-0">Date</p></div>
          <div class="col-auto">
            <input type="date" v-model="formData.date" />
          </div>
        </div>
      </div>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto"><img src="" alt="Icon" /></div>
          <div class="col-auto"><p class="mb-0">Notes</p></div>
          <div class="col-auto">
            <textarea
              v-model="formData.notes"
              id=""
              placeholder="Write a note here.."
            ></textarea>
          </div>
        </div>
      </div>
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto mx-auto">
            <input class="submitBTN" type="submit" value="SUBMIT" />
          </div>
        </div>
      </div>
    </form>
  </main>
</template>
<script setup>
import { useQvite } from "../stores/qvite";
import { ref } from "vue";

const formData = ref({
  recurring: false,
  budget: "",
  amount: "",
  photo: "",
  date: "",
  notes: "",
});
// const emit = defineEmits(["submit"]);

// const submit = () => {
//   emit("submit", { ...form.value });
// };

function logForm() {
  console.log("formdata:", formData.value.notes);
}

async function createTransaction() {
  const response = await fetch(
    "http://localhost:3000/user/account/transactions",
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        transactionAccountId: 1,
        transactionNote: formData.value.notes,
        transactionAmount: formData.value.amount,
        transactionBudget: formData.value.budget,
        transactionReurring: formData.value.recurring,
        transactionDate: formData.value.date,
      }),
    }
  );
  formData.value = {
    recurring: false,
    budget: "",
    amount: "",
    photo: "",
    date: "",
    notes: "",
  };
}

const qvite = useQvite();
</script>
<style scoped>
.background {
  min-height: 100vh;
  background-color: #5b8e7d;
}
form {
  background-color: #ebe3d5;
  border-radius: 12px;
  padding: 6px;
  margin: 20px;
  box-shadow: 0px 7px 15px #2c2a29;
}
input,
textarea {
  background-color: #776b5d;
  border-radius: 5px;
}

input::file-selector-button {
  background-color: #2c2a29;
  border-radius: 5px;
}

.submitBTN {
  background-color: #2c2a29;
  border-radius: 5px;
}

.container {
  border-bottom: solid 1px #776b5d;
  padding-bottom: 5px;
  padding-top: 5px;
}

.flexDir {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
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
