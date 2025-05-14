<template>
  <main>
    <div class="name-card">
      <BContainer class="name-top">
        <BRow>
          <BCol><h1 class="calsans-text">Name</h1></BCol> </BRow
        ><BRow>
          <BCol>
            <p>
              This is where we let the user change their name.<br />
              Your current name is
              <span style="font-weight: 600; font-size: larger">{{
                qvite.loggedInUser
              }}</span>
            </p></BCol
          ></BRow
        >
        <BRow class="input-field">
          <BCol>
            <input type="text" placeholder="New name" v-model="newUsersName" />
          </BCol>
          <BCol>
            <button type="submit" @click="submitName">Change Name</button>
          </BCol>
        </BRow>
      </BContainer>
    </div>
    <div class="email-card">
      <BContainer class="email-top">
        <BRow cols="2">
          <BCol><h1 class="calsans-text">Email</h1></BCol>
        </BRow>
        <BRow>
          <BCol>
            <p>
              This is where we change the users Email adress.<br />
              Your current Email is
              <span style="font-weight: 600; font-size: larger">
                {{ qvite.loggedInEmail }}</span
              >
            </p></BCol
          ></BRow
        >
        <BRow class="input-field">
          <BCol>
            <input type="text" placeholder="New email" />
          </BCol>
          <BCol>
            <button type="submit">Change Email</button>
          </BCol>
        </BRow>
      </BContainer>
    </div>

    <div class="password-card">
      <BContainer class="pw-top">
        <BRow cols="2">
          <BCol><h1 class="calsans-text">Password</h1></BCol> </BRow
        ><BRow>
          <BCol>
            <p>This is where we let the user change their password</p></BCol
          ></BRow
        >
        <BRow class="input-field">
          <BCol>
            <input
              type="password"
              placeholder="old password"
              v-model="oldPass"
            />
          </BCol>
          <BCol>
            <input
              type="password"
              placeholder="new password"
              v-model="newPass"
            />
          </BCol>
          <BCol>
            <button
              type="submit"
              :disabled="!isPasswordValid"
              @click="submitPassword"
            >
              Change Password
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

// function to compare old password and new password to enable button
const newPass = ref("");
const oldPass = ref("");
const newUsersName = ref("");
const isPasswordValid = computed(() => {
  // console.log("Checking password validity", oldPass.value, newPass.value);
  return (
    oldPass.value == qvite.loggedInTotallyNotPassword &&
    newPass.value.length >= 7
  );
});
// puts newPass as oldPass in localstorage
const submitPassword = async () => {
  if (!isPasswordValid.value) return;

  try {
    const response = await fetch(
      `http://localhost:3000/api/${qvite.loggedInUser}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          newUsersName: qvite.loggedInUser,
          usersPassword: newPass.value,
          usersEmail: qvite.loggedInEmail,
        }),
      }
    );

    if (!response.ok) throw new Error("Failed to update password");

    localStorage.setItem("loggedInTotallyNotPassword", newPass.value);
    qvite.loggedInTotallyNotPassword = newPass.value;

    oldPass.value = "";
    newPass.value = "";

    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", error);
  }
};

const submitName = async () => {
  try {
    const currentName = qvite.loggedInUser;
    const response = await fetch(`http://localhost:3000/api/${currentName}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ newName: newUsersName.value }),
    });

    if (!response.ok) throw new Error("Failed to update name");

    if (response.status === 204) {
      console.log("Name updated successfully: No Content");
    } else {
      const result = await response.json();
      console.log("Name updated successfully:", result);
    }

    // Update local state
    qvite.loggedInUser = newUsersName.value;
    newUsersName.value = "";
  } catch (error) {
    console.error("Error updating name:", error);
  }
};

const router = useRouter();
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
.name-card {
  max-height: 28vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.email-card {
  max-height: 28vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.password-card {
  max-height: 28vh;
  z-index: 2;
  background-color: #ebe3d5;
  color: #2c2a29;
  border-radius: 12px;
  margin: 20px;
  padding: 6px;
  box-shadow: 0px 7px 15px #2c2a29;
}

.name-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.name-top h1 {
  font-size: 2.5rem;
}
.email-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.email-top h1 {
  font-size: 2.5rem;
}
.pw-top {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.pw-top h1 {
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
