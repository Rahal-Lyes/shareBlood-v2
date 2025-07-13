<template>
  <div class="login-page">
    <form @submit.prevent="handleLogin" class="login-form">
      <h2 class="title">Connexion</h2>
      
      <div class="input-group">
        <label for="email">Email</label>
        <input 
          id="email" 
          type="email" 
          v-model="email" 
          required 
          autocomplete="username"
          placeholder="Votre email"
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
import { ref } from 'vue';
import instance from '@/http/index.js';
import { useToastStore } from "@/stores/ToastStore";

const toast = useToastStore();
instance.get('products/').then(() => {
  toast.ToastSuccess({
    message: "login Success!",
    icon: "mdi-check-circle",
  });
}).catch(() => {
  toast.ToastError({
    message: "Une erreur est survenue.",   
     icon: "mdi-check-circle",
  });
});
const email = ref('');
const password = ref('');

function handleLogin() {
  // Simple example: just log credentials
  console.log('Email:', email.value);
  console.log('Password:', password.value);
  // Here you can add actual login logic (API call, validation, etc.)
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
  color: var(--v-theme-on-surface);
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
  color: var(--v-theme-on-surface);
}

input {
  padding: 10px 14px;
  border: 1.5px solid var(--v-theme-outline, #ccc);
  border-radius: 6px;
  font-size: 1rem;
  color: var(--v-theme-on-surface);
  background-color: var(--v-theme-background);
  transition: border-color 0.3s ease;
}

input:focus {
  border-color: var(--v-theme-primary);
  outline: none;
}

.btn-login {
  width: 100%;
  padding: 12px 0;
  background-color: var(--v-theme-primary);
  color: var(--v-theme-on-primary);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

.btn-login:hover {
  background-color: var(--v-theme-primary-darken-1, #1565c0);
}
</style>
