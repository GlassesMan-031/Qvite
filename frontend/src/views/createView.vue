<template>
  <main>
    <!-- Navigation bar with a title -->
    <nav>
      <h2>Welcome to Qvite</h2>
    </nav>

    <!-- Registration form -->
    <div class="login-wrapper">
      <BContainer class="login-dashboard">
        <!-- Header for the registration form -->
        <form @submit.prevent="handleSubmit">
          <BRow>
            <BCol>
              <h3 class="login-head">
                Please enter your information to create an account
              </h3>
            </BCol>
          </BRow>

          <!-- Firstname & Lastname input fields -->
          <BRow>
            <BCol class="input-with-icon">
              <div class="input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person icon-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0"
                  />
                </svg>
                <input
                  type="text"
                  id="name"
                  v-model="name"
                  placeholder="Your first and last name"
                  required
                />
              </div>
            </BCol>
          </BRow>

          <!-- Username input -->
          <BRow>
            <BCol class="input-with-icon">
              <div class="input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-person icon-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z"
                  />
                </svg>
                <input
                  type="text"
                  id="username"
                  v-model="username"
                  placeholder="Username"
                  required
                />
              </div>
            </BCol>
          </BRow>

          <!-- Email input -->
          <BRow>
            <BCol class="input-with-icon">
              <div class="input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-envelope icon-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2zm2-1a1 1 0 0 0-1 1v.217l7 4.2 7-4.2V4a1 1 0 0 0-1-1zm13 2.383-4.708 2.825L15 11.105zm-.034 6.876-5.64-3.471L8 9.583l-1.326-.795-5.64 3.47A1 1 0 0 0 2 13h12a1 1 0 0 0 .966-.741M1 11.105l4.708-2.897L1 5.383z"
                  />
                </svg>
                <input
                  type="email"
                  id="email"
                  v-model="email"
                  placeholder="Email"
                  required
                />
              </div>
            </BCol>
          </BRow>

          <!-- Password input -->
          <BRow>
            <BCol class="input-with-icon">
              <div class="input-wrapper">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  class="bi bi-lock icon-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    d="M8 1a2 2 0 0 1 2 2v4H6V3a2 2 0 0 1 2-2m3 6V3a3 3 0 0 0-6 0v4a2 2 0 0 0-2 2v5a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2M5 8h6a1 1 0 0 1 1 1v5a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V9a1 1 0 0 1 1-1"
                  />
                </svg>
                <input
                  type="password"
                  v-model="password"
                  id="password"
                  placeholder="Password"
                  required
                />
              </div>
            </BCol>
          </BRow>

          <!-- Create Account button -->
          <BRow>
            <BCol>
              <b-button v-on="handleSubmit" class="create-button" type="submit">
                Create account
              </b-button>
            </BCol>
          </BRow>
        </form>
      </BContainer>
    </div>
  </main>
</template>

<script setup>
import { ref } from "vue";

const name = ref("");
const username = ref("");
const email = ref("");
const password = ref("");

const handleSubmit = async () => {
  if (!name.value || !username.value || !email.value || !password.value) {
    alert("Please fill in all fields.");
    return;
  }
  // Check if user already exists
  try {
    const response = await fetch(
      `http://localhost:3000/api/check-user?username=${username.value}&email=${email.value}`
    );
    const data = await response.json();
    if (data.exists) {
      alert("A User with this username or email already exists.");
      return;
    }
  } catch (err) {
    console.error("Error checking user: ", err.message);
    alert("Could not check user.");
  }
  // Create new user if not existing
  try {
    const response = await fetch("http://localhost:3000/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        username: username.value,
        email: email.value,
        password: password.value,
      }),
    });
    if (!response.ok) {
      throw new Error("Error while creating user");
    }
    const result = await response.json();
    console.log("Result: ", result);
    alert("User created successfully!");
  } catch (err) {
    console.error("Error: ", err.message); // handle any errors in the catch block
    alert("Error creating user.");
  }
};
</script>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem;
  background-color: #5b8e7d;
  min-height: 100vh;
}

nav h2 {
  margin-bottom: 2rem;
  color: #333;
  font-weight: bold;
}

.login-wrapper {
  background-color: #ebe3d5;
  padding: 2rem;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2); /* Fixed shadow */
  width: 100%;
  max-width: 500px;
}

.login-head {
  margin-bottom: 1rem;
  color: #222;
}

input {
  width: 100%;
  padding: 0.75rem;
  margin: 0.5rem 0;
  border: 1px solid #ccc;
  border-radius: 20px;
  font-size: 1rem;
  min-height: 7vh;
}

input[type="password"] {
  margin-bottom: 1rem;
}

.create-button {
  background-color: #5b8e7d;
  color: #fff;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 25px;
  font-size: 1rem;
  font-weight: bold;
  width: 100%;
  cursor: pointer;
  transition: background-color 0.2s ease-in;
}

.create-button:hover {
  background-color: #4a7869;
}

/* testing icons */
.input-with-icon {
  position: relative;
}

.input-wrapper {
  display: flex;
  align-items: center;
  position: relative;
  border-radius: 20px;
}

.input-wrapper input {
  width: 100%;
  padding: 0.75rem;
  padding-left: 2.5rem;
  border: none;
  font-size: 1rem;
}

.icon-left {
  position: absolute;
  top: 50%;
  left: 0.75rem;
  transform: translateY(-50%);
  color: #999;
}
</style>
