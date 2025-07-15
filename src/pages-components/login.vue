<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2 class="title">Connexion</h2>

      <div class="input-group">
        <label for="username">username</label>
        <input
          type="text"
          v-model="username"
          required
          autocomplete="username"
          placeholder="Username"
        />
      </div>

      <div class="input-group">
        <label for="password">Mot de passe</label>
        <input
          id="password"
          type="password"
          v-model="password"
          required
          autocomplete="current-password"
          placeholder="Votre mot de passe"
        />
      </div>

      <button type="submit" class="btn-login">Se connecter</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from "vue";
import instance from "@/http/index.js";
import { useToastStore } from "@/stores/ToastStore";
import router from "@/router/index.js";
const toast = useToastStore();

const username = ref("");
const password = ref("");

function handleLogin() {
  instance
    .post("login/", {
      username: username.value,
      password: password.value,
    })
    .then((response) => {
      const token = response.data.token;
      localStorage.setItem("token", token);

      toast.ToastSuccess({
        message: "Welcome " + response.data.user.username,
        icon: "mdi-check-circle",
      });
      router.push("/");
    })
    .catch((error) => {
      toast.ToastError({
        message: error.response.data.detail,
        icon: "mdi-check-circle",
      });
    });
}
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--v-theme-background);
  font-family: "Inter", sans-serif;
  padding: 20px;
}

.login-form {
  background-color: var(--v-theme-surface, white);
  padding: 32px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.title {
  margin-bottom: 24px;
  color: rgb(var(--v-theme-primary-darken-1));
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
}

.input-group {
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}

label {
  margin-bottom: 6px;
  font-weight: 600;
  /* color: var(--v-theme-info) !important; */
  color: rgb(var(--v-theme-primary-darken-1));
}

input {
  padding: 10px 14px;
  border: 1.5px solid var(--v-theme-outline, #ccc);
  border-radius: 6px;
  font-size: 1rem;
  color: rgb(var(--v-theme-primary-darken-1));
  background-color: var(--v-theme-background);
  transition: border-color 0.3s ease;
  color: rgb(var(--v-theme-primary-darken-1));
}

input:focus {
  border-color: var(--v-theme-primary);
  outline: none;
}

.btn-login {
  width: 100%;
  padding: 12px 0;
  background-color: rgb(var(--v-theme-primary));
  color: var(--v-theme-on-primary);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.btn-login:hover {
  background-color: rgba(var(--v-theme-primary-darken-1, #1565c0));
}
</style>
