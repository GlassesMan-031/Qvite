<template>
  <BContainer fluid class="splash-background">
    <div
      class="header finisher-header"
      style="
        position: absolute;
        inset: 0;
        z-index: 10;
        width: 100%;
        height: 100%;
      "
    >
      <BRow>
        <BCol cols="12" class="text-center">
          <BCol cols="12" class="splash-box">
            <img
              class="logo-splash"
              src="/logoblack.png"
              alt="QVITE Logo"
              fluid
            />
            <h3 class="lower-header">the sleek finance tracker</h3>
          </BCol>
        </BCol>

        <BContainer fluid class="formContainer">
          <BRow>
            <BCol cols="12" class="d-flex flex-column align-items-center">
              <!-- Error message display -->
              <div v-if="errorMessage" class="error-message">
                {{ errorMessage }}
              </div>
              <div class="form-input">
                <BaseInput
                  id="input-1"
                  placeholder="Username"
                  v-model="qvite.userName"
                />
              </div>
              <div class="form-input">
                <BaseInput
                  id="input-2"
                  type="password"
                  placeholder="Password"
                  v-model="qvite.usersPassword"
                />
              </div>
              <div id="login-container">
                <button
                  @click="handleSubmit"
                  id="login-button"
                  :disabled="qvite.isLoading"
                >
                  {{ qvite.isLoading ? "Logging in..." : "Log in" }}
                </button>
              </div>
              <div class="bottom-links-wrapper">
                <RouterLink to="/create" class="bottom-links"
                  >Create Account</RouterLink
                >
                <RouterLink to="/recover" class="bottom-links"
                  >Forgot password?</RouterLink
                >
              </div>
            </BCol>
          </BRow>
        </BContainer>
      </BRow>
    </div>
  </BContainer>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { RouterLink, useRouter } from "vue-router";
import BaseInput from "../components/BaseInput.vue";
import { useQvite } from "../stores/qvite";

const qvite = useQvite();
const router = useRouter();
const errorMessage = ref("");

const handleSubmit = async () => {
  errorMessage.value = "";
  try {
    // Fetch users
    const usersInfo = await qvite.getUsersSplash();

    // Validate input fields
    if (!qvite.userName || !qvite.usersPassword) {
      errorMessage.value = "Please fill in both username and password.";
      return;
    }

    // Find user by username
    const user = usersInfo.users.find((u) => u.usersName === qvite.userName);

    if (!user) {
      errorMessage.value = "Username does not exist.";
      return;
    }

    // Check password
    if (user.usersPassword !== qvite.usersPassword) {
      errorMessage.value = "Incorrect password.";
      return;
    }

    // Login successful
    qvite.loggedInUser = user.usersName;
    qvite.loggedInEmail = user.usersEmail;
    qvite.loggedInTotallyNotPassword = user.usersPassword;
    console.log("Credentials are correct!");
    router.push("/home"); // Navigate to home page
  } catch (error) {
    console.error("Login error:", error);
    errorMessage.value = "An error occurred. Please try again.";
  }
};
// Load and initialize BG-Animation
onMounted(() => {
  const script = document.createElement("script");
  script.src = "/finisher-header.es5.min.js";
  script.type = "text/javascript";
  script.onload = () => {
    new window.FinisherHeader({
      count: 860,
      size: {
        min: 1,
        max: 31,
        pulse: 0,
      },
      speed: {
        x: {
          min: 0,
          max: 0.5,
        },
        y: {
          min: 0,
          max: 0.5,
        },
      },
      colors: {
        background: "#ebe3d5",
        particles: [
          "#b0a695",
          "#776b5d",
          "#a4967e",
          "#c7b196",
          "#a09582",
          "#676260",
        ],
      },
      blending: "screen",
      opacity: {
        center: 0.8,
        edge: 0.8,
      },
      skew: 0,
      shapes: ["s"],
    });
  };
  document.body.appendChild(script);
});
</script>

<style scoped>
.splash-box {
  position: relative;
  z-index: 10;
  padding: 2rem;
  border-radius: 12px;
  display: inline-block;
}

.logo-splash {
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

.lower-header {
  font-family: "Cal Sans", sans-serif;
  font-weight: 400;
  font-style: bolder;
  color: #2c2a29;
}

.form-input {
  width: auto;
  height: 48px;
  margin: 12px;
  padding: 12px;
  place-content: center;
  z-index: 10;
  position: relative;
}

#login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
}

#login-button {
  display: inline-block;
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
  border: none;
  cursor: pointer;
}

#login-button:disabled {
  background-color: #a0a0a0;
  cursor: not-allowed;
}

.bottom-links-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  margin-top: 10px;
  z-index: 10;
  position: relative;
}

.bottom-links {
  color: #2c2a29;
  font-weight: bold;
  font-family: "Cal Sans", sans-serif;
  text-decoration: underline;
  text-decoration-thickness: 2px;
  text-underline-offset: 2px;
  z-index: 10;
  cursor: pointer;
}

.error-message {
  color: red;
  font-family: "Cal Sans", sans-serif;
  margin-bottom: 12px;
  z-index: 10;
  position: relative;
}
</style>
