<template>
  <main class="background">
    <form @submit.prevent="createTransaction">
      <h1 class="calsans-text">Add Transaction</h1>
      <!-- Alerts for error and success messages -->
      <!-- Visa endast ett meddelande åt gången -->
      <div v-if="errorMessage" class="alert error">
        {{ errorMessage }}
      </div>
      <div v-else-if="successMessage" class="alert success">
        {{ successMessage }}
      </div>
      <!-- Recurring -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-arrow-clockwise"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2z"
              />
              <path
                d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466"
              />
            </svg>
          </div>
          <div class="col-auto"><p class="mb-0">Recurring</p></div>
          <div class="col-auto">
            <input
              type="checkbox"
              v-model="formData.recurring"
              class="form-check-input"
            />
          </div>
        </div>
      </div>

      <!-- Budget -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-exclude"
              viewBox="0 0 16 16"
            >
              <path
                d="M0 2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2h2a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2v-2H2a2 2 0 0 1-2-2zm12 2H5a1 1 0 0 0-1 1v7h7a1 1 0 0 0 1-1z"
              />
            </svg>
          </div>
          <div class="col">
            <select v-model="formData.budget" class="form-select" required>
              <option value="" disabled selected>Select a budget</option>
              <option
                v-for="budget in budgets"
                :key="budget.budgetId"
                :value="budget.budgetId"
              >
                {{ budget.categoryName }}
              </option>
            </select>
          </div>
        </div>
      </div>

      <!-- Amount -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-currency-dollar"
              viewBox="0 0 16 16"
            >
              <path
                d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718H4zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73l.348.086z"
              />
            </svg>
          </div>
          <div class="col-auto"><p class="mb-0">Amount</p></div>
          <div class="col">
            <input
              type="text"
              v-model="formData.amount"
              placeholder="Amount here.."
              class="form-control"
              required
            />
          </div>
        </div>
      </div>

      <!-- Photo -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-camera-fill"
              viewBox="0 0 16 16"
            >
              <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0" />
              <path
                d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1m9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0"
              />
            </svg>
          </div>
          <div class="col-auto"><p class="mb-0">Photo</p></div>
          <div class="col">
            <input type="file" name="photo" class="form-control" />
          </div>
        </div>
      </div>

      <!-- Date -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-calendar-event"
              viewBox="0 0 16 16"
            >
              <path
                d="M11 6.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5h-1a.5.5 0 0 1-.5-.5z"
              />
              <path
                d="M3.5 0a.5.5 0 0 1 .5.5V1h8V.5a.5.5 0 0 1 1 0V1h1a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V3a2 2 0 0 1 2-2h1V.5a.5.5 0 0 1 .5-.5M1 4v10a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V4z"
              />
            </svg>
          </div>
          <div class="col-auto"><p class="mb-0">Date</p></div>
          <div class="col">
            <input
              type="date"
              v-model="formData.date"
              class="form-control"
              required
            />
          </div>
        </div>
      </div>

      <!-- Notes -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              class="bi bi-textarea-t"
              viewBox="0 0 16 16"
            >
              <path
                d="M1.5 2.5A1.5 1.5 0 0 1 3 1h10a1.5 1.5 0 0 1 1.5 1.5v3.563a2 2 0 0 1 0 3.874V13.5A1.5 1.5 0 0 1 13 15H3a1.5 1.5 0 0 1-1.5-1.5V9.937a2 2 0 0 1 0-3.874zm1 3.563a2 2 0 0 1 0 3.874V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5V9.937a2 2 0 0 1 0-3.874V2.5A.5.5 0 0 0 13 2H3a.5.5 0 0 0-.5.5zM2 7a1 1 0 1 0 0 2 1 1 0 0 0 0-2m12 0a1 1 0 1 0 0 2 1 1 0 0 0 0-2"
              />
              <path
                d="M11.434 4H4.566L4.5 5.994h.386c.21-1.252.612-1.446 2.173-1.495l.343-.011v6.343c0 .537-.116.665-1.049.748V12h3.294v-.421c-.938-.083-1.054-.21-1.054-.748V4.488l.348.01c1.56.05 1.963.244 2.173 1.496h.386z"
              />
            </svg>
          </div>
          <div class="col-auto"><p class="mb-0">Notes</p></div>
          <div class="col">
            <textarea
              v-model="formData.notes"
              placeholder="Write a note here.."
              class="form-control"
              rows="3"
              required
            ></textarea>
          </div>
        </div>
      </div>

      <!-- Submit -->
      <div class="container darkerG-Bold">
        <div class="row align-items-center">
          <div class="col-auto mx-auto">
            <button class="submitBTN" type="submit">SUBMIT</button>
          </div>
        </div>
      </div>
    </form>
    <!-- <button @click="getUsers" class="btn btn-secondary mt-3">getUsers</button> -->
  </main>
</template>

<script setup>
import { useQvite } from "../stores/qvite";
import { ref, onMounted } from "vue";

const qvite = useQvite();
const errorMessage = ref("");
const successMessage = ref("");

const formData = ref({
  recurring: false,
  budget: "",
  amount: "",
  photo: "",
  date: "",
  notes: "",
});

const budgets = ref([]);
// http://localhost:3000/api/budgets/Lisa
onMounted(async () => {
  const response = await fetch(
    `http://localhost:3000/api/budgets/${qvite.loggedInUser}`
  );
  const data = await response.json();
  budgets.value = data.budgets; // Extract the 'budgets' array from the response
  console.log("budgets.value:", budgets.value);
});

// Submit form
async function createTransaction() {
  const userId = qvite.loggedInUserId;
  const accountId = userId;
  const payload = {
    transactionAccountId: accountId,
    transactionNote: formData.value.notes,
    transactionAmount: formData.value.amount,
    transactionImage: formData.value.photo,
    transactionRecurring: formData.value.recurring,
    transactionDate: formData.value.date,
    transactionBudgetId: formData.value.budget,
  };
  console.log("Payload:", payload); // Log the payload

  const response = await fetch("http://localhost:3000/api/transactions", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json(); // Get error details from server
    console.error("Server error:", errorData);
    errorMessage.value = errorData.message || "Failed to make transaction";
  } else {
    successMessage.value = "Transaction made successfully";
  }

  // Reset form
  formData.value = {
    recurring: false,
    budget: "",
    amount: "",
    photo: "",
    date: "",
    notes: "",
  };
}
</script>

<style scoped>
.background {
  min-height: 100vh;
  background-color: #5b8e7d;
  padding: 20px;
}

form {
  background-color: #ebe3d5;
  border-radius: 12px;
  padding: 20px;
  margin: 0 auto;
  max-width: 600px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.container {
  border-bottom: solid 1px #776b5d;
  padding: 15px 10px;
  margin-bottom: 10px;
}

.form-control,
.form-select,
.form-check-input {
  background-color: #776b5d;
  border: 1px solid #2c2a29;
  color: white;
  border-radius: 5px;
  padding: 8px 12px;
}

.form-control:focus,
.form-select:focus {
  background-color: #776b5d;
  color: white;
  border-color: #2c2a29;
  box-shadow: 0 0 0 0.25rem rgba(44, 42, 41, 0.25);
}

.form-control::placeholder {
  color: #d1d1d1;
}

input[type="file"]::file-selector-button {
  background-color: #2c2a29;
  border-radius: 5px;
  color: white;
  padding: 5px 10px;
  border: none;
  margin-right: 10px;
}

.submitBTN {
  background-color: #2c2a29;
  border-radius: 5px;
  color: white;
  padding: 10px 30px;
  border: none;
  font-weight: bold;
  text-transform: uppercase;
}

.submitBTN:hover {
  background-color: #3a3837;
}

.calsans-text {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: normal;
  color: #2c2a29;
  text-align: center;
  margin-bottom: 25px;
}

.darkerG-Bold {
  font-family: "Darker Grotesque", sans-serif;
  font-optical-sizing: auto;
  font-weight: bold;
  font-style: normal;
  color: #2c2a29;
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

svg {
  margin-right: 10px;
  color: #2c2a29;
}
.alert {
  padding: 12px 15px;
  margin: 15px 0;
  border-radius: 5px;
  font-weight: bold;
}

.error {
  background-color: #ffebee;
  color: #c62828;
  border-left: 4px solid #c62828;
}

.success {
  background-color: #e8f5e9;
  color: #2e7d32;
  border-left: 4px solid #2e7d32;
}
/* Responsive adjustments */
@media (max-width: 576px) {
  .container .row {
    flex-direction: column;
    align-items: flex-start;
  }

  .col-auto,
  .col {
    width: 100%;
    margin-bottom: 5px;
  }
}
</style>
