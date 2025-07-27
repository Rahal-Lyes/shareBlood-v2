<template>
  <div class="login-page">
    <div class="login-form">
      <FormKit
        type="form"
        id="register-form"
        :actions="false"
        @submit="handleSubmit"
      >
        <FormKit
          type="text"
          name="username"
          label="Nom d'utilisateur"
          help="Entrez votre nom d'utilisateur."
          validation="required"
          autocomplete="username"
        />

        <FormKit
          type="email"
          name="email"
          label="Email"
          help="Entrez votre adresse email."
          validation="required|email"
          autocomplete="email"
        />

        <FormKit
          type="password"
          name="password"
          label="Mot de passe"
          help="Entrez votre mot de passe."
          validation="required|length:4..16"
          autocomplete="new-password"
        />

        <FormKit type="submit" label="S'inscrire" />
      </FormKit>
    </div>
  </div>
</template>

<script setup>
import { FormKit } from "@formkit/vue";
import router from "@/router/index.js";
import { useAuthStore } from "@/stores/AuthStore";

const auth = useAuthStore();

const handleSubmit = async (formData) => {
  try {
    const response = await auth.register(
      formData.username,
      formData.email,
      formData.password
    );

  } catch (error) {
    console.error("Erreur d'inscription :", error);
  }
};
</script>

<style scoped>
.login-page {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(var(--v-theme-background));
  font-family: "Inter", sans-serif;
  padding: 20px;
  scroll-behavior: smooth;
}

.login-form {
  background-color: rgba(var(--v-theme-background));
  padding: 32px 40px;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(var(--v-theme-on-secondary));
  width: 100%;
  max-width: 400px;
  box-sizing: border-box;
}

.title_02 {
  margin-bottom: 25px;
  color: rgba(var(--v-theme-primary-darken-1));
  font-weight: 700;
  font-size: 1.8rem;
  text-align: center;
}

/* Styles globaux pour tous les inputs */
:deep(.formkit-input) {
  padding: 10px 14px;
  border: 1.5px solid rgba(var(--v-theme-on-secondary));
  border-radius: 6px;
  font-size: 1rem;
  color: rgba(var(--v-theme-primary));
  background-color: rgba(var(--v-theme-background)) !important;
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
}

:deep(.formkit-input:focus) {
  border-color: rgba(var(--v-theme-primary));
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
}

:deep(.formkit-input) {
  padding: 10px 14px;
  border: 1.5px solid rgba(var(--v-theme-on-secondary));
  border-radius: 6px;
  font-size: 1rem;
  color: rgba(var(--v-theme-on-primary));
  transition: border-color 0.3s ease;
  width: 100%;
  box-sizing: border-box;
  background-color: rgba(var(--v-theme-background)) !important;
}
:deep(.formkit-input:focus) {
  border-color: rgba(var(--v-theme-primary));
  outline: none;
  box-shadow: 0 0 0 2px rgba(var(--v-theme-primary), 0.2);
}

/* Styles globaux pour tous les labels */
:deep(.formkit-label) {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgba(var(--v-theme-info)) !important;
  font-size: 0.9rem;
}

/* Style spécifique pour le bouton submit */
:deep(.formkit-input[type="submit"]) {
  width: 100%;
  padding: 12px 0;
  background-color: rgb(var(--v-theme-info)) !important;
  color: var(--v-theme-dark-blue);
  border: none;
  border-radius: 8px;
  font-weight: 700;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.25s ease;
}

:deep(.formkit-input[type="submit"]:hover) {
  background-color: rgba(var(--v-theme-primary-darken-1));
}

:deep(.formkit-input[type="submit"]:disabled) {
  background-color: rgba(var(--v-theme-on-secondary), 0.5);
  cursor: not-allowed;
}

/* Style pour les messages d'aide */
:deep(.formkit-help) {
  display: block;
  margin-top: 4px;
  font-size: 0.8rem;
  color: rgba(var(--v-theme-on-surface), 0.7);
}
</style>
