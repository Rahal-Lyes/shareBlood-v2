<template>
  <div class="login-page">
    <form @submit.prevent="handleRegister" class="login-form">
      <h2 class="title">Créer un compte</h2>

      <div class="input-group">
        <label for="username">Nom d'utilisateur</label>
        <input
          type="text"
          v-model="username"
          required
          placeholder="Nom d'utilisateur"
        />
      </div>

      <div class="input-group">
        <label for="email">Email</label>
        <input
          type="email"
          v-model="email"
          required
          placeholder="Email"
        />
      </div>

      <div class="input-group">
        <label for="password">Mot de passe</label>
        <input
          type="password"
          v-model="password"
          required
          placeholder="Mot de passe"
        />
      </div>

      <button type="submit" class="btn-login">S'inscrire</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import instance from '@/http/index.js';
import { useToastStore } from '@/stores/ToastStore';
import router from '@/router/index.js';

const toast = useToastStore();

const username = ref('');
const email = ref('');
const password = ref('');

function handleRegister() {
  instance.post('signup/', {
    username: username.value,
    email: email.value,
    password: password.value
  })
  .then(response => {
    const token = response.data.token;
    localStorage.setItem('token', token);

    toast.ToastSuccess({
      message: "Bienvenue " + response.data.user.username + " !",
      icon: "mdi-check-circle",
    });

    router.push('/login'); 
  })
  .catch(error => {
    const errors = error.response?.data || {};
    let message = 'Erreur inconnue.';

    if (errors.username) message = "Nom d'utilisateur : " + errors.username[0];
    else if (errors.email) message = "Email : " + errors.email[0];
    else if (errors.password) message = "Mot de passe : " + errors.password[0];

    toast.ToastError({
      message,
      icon: "mdi-alert-circle",
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
  font-family: 'Inter', sans-serif;
  padding: 20px;
}

.login-form {
  background-color: var(--v-theme-surface, white);
  padding: 32px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.title {
  margin-bottom: 24px;
color:rgb(var(--v-theme-primary-darken-1))  ;
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
  color:rgb(var(--v-theme-primary-darken-1))  ;
}

input {
  padding: 10px 14px;
  border: 1.5px solid var(--v-theme-outline, #ccc);
  border-radius: 6px;
  font-size: 1rem;
  color:rgb(var(--v-theme-primary-darken-1))  ;
  background-color: var(--v-theme-background);
  transition: border-color 0.3s ease;
color:rgb(var(--v-theme-primary-darken-1))  ;
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

