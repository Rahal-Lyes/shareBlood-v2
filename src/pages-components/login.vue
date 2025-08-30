<template>
  <div class="login-page">
    <div class="login-container">
      <!-- Decoration elements -->
      <div class="decoration-circle circle-1"></div>
      <div class="decoration-circle circle-2"></div>
      <div class="decoration-circle circle-3"></div>
      
      <div class="login-form">
        <div class="form-header">
          <div class="logo-container">
            <div class="logo-icon">
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" fill="currentColor" opacity="0.2"/>
                <path d="M12 2L2 7V10C2 16 6 20.5 12 22C18 20.5 22 16 22 10V7L12 2Z" stroke="currentColor" stroke-width="2" fill="none"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </div>
          </div>
          <h1 class="title">Bienvenue</h1>
          <p class="subtitle">Connectez-vous à votre compte</p>
        </div>

        <FormKit
          type="form"
          id="login-form"
          :actions="false"
          @submit="handleSubmit"
          method="POST"
        >
          <div class="form-group">
            <FormKit
              type="text"
              name="username"
              label="Nom d'utilisateur"
              help="Entrez votre nom d'utilisateur"
              placeholder="admin"
              validation="required"
              :disabled="isLoading"
              autocomplete="username"
              class="form-input"
            />
          </div>

          <div class="form-group">
            <FormKit
              type="password"
              name="password"
              label="Mot de passe"
              help="Minimum 4 caractères"
              placeholder="admin"
              validation="required|length:4..16"
              :disabled="isLoading"
              autocomplete="current-password"
              class="form-input"
            />
          </div>

          <div class="form-actions">
            <FormKit 
              type="submit" 
              label="Se connecter" 
              :disabled="isLoading"
              class="submit-btn"
            />
          </div>
        </FormKit>

        <div class="form-footer">
          <a href="#" class="forgot-password">Mot de passe oublié ?</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { FormKit } from "@formkit/vue";
import { useAuthStore } from "@/stores/AuthStore";
import { useToastStore } from "@/stores/ToastStore.js";
import router from "@/router/index.js";
import { onMounted, ref } from "vue";

const auth = useAuthStore();
const toast = useToastStore();
const isLoading = ref(false);

const handleSubmit = async (formData) => {
  isLoading.value = true;
  try {
    const response = await auth.login(formData.username, formData.password);

    toast.ToastSuccess({
      message: "Connecté avec succès : " + response.username,
      icon: "mdi-check",
    });

    router.push("/");
  } catch (err) {
    toast.ToastError({
      message: err?.response?.data?.message || "Erreur de connexion",
      icon: "mdi-alert-circle",
    });
    console.error(err?.response?.data?.message || err);
  } finally {
    isLoading.value = false;
  }
};

onMounted(() => {
  if (auth.isAuthenticated) {
    router.push("/");
  }
});
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: linear-gradient(135deg, 
    rgba(var(--v-theme-primary), 0.1) 0%, 
    rgba(var(--v-theme-secondary), 0.05) 50%, 
    rgba(var(--v-theme-info), 0.1) 100%);
  font-family: "Inter", sans-serif;
  padding: 20px;
  position: relative;
  overflow: hidden;
}

.login-container {
  position: relative;
  z-index: 2;
  width: 100%;
  max-width: 520px;
}

/* Éléments décoratifs */
.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: linear-gradient(45deg, 
    rgba(var(--v-theme-primary), 0.1), 
    rgba(var(--v-theme-info), 0.05));
  backdrop-filter: blur(10px);
  animation: float 6s ease-in-out infinite;
}

.circle-1 {
  width: 200px;
  height: 200px;
  top: -100px;
  left: -100px;
  animation-delay: 0s;
}

.circle-2 {
  width: 150px;
  height: 150px;
  top: 60%;
  right: -75px;
  animation-delay: 2s;
}

.circle-3 {
  width: 100px;
  height: 100px;
  bottom: 20%;
  left: 10%;
  animation-delay: 4s;
}

@keyframes float {
  0%, 100% {
    transform: translateY(0) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

.login-form {
  background-color: rgba(var(--v-theme-background));
  backdrop-filter: blur(20px);
  padding: 40px;
  border-radius: 20px;
  box-shadow: 
    0 20px 40px rgba(0, 0, 0, 0.1),
    0 1px 2px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(var(--v-theme-outline), 0.1);
  position: relative;
  overflow: hidden;
}

.login-form::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(90deg, 
    transparent, 
    rgba(var(--v-theme-primary), 0.5), 
    transparent);
}

.form-header {
  text-align: center;
  margin-bottom: 32px;
}

.logo-container {
  margin-bottom: 16px;
}

.logo-icon {
  display: inline-flex;
  padding: 12px;
  background: linear-gradient(135deg, 
    rgba(var(--v-theme-primary), 0.1), 
    rgba(var(--v-theme-info), 0.1));
  border-radius: 16px;
  color: rgba(var(--v-theme-primary));
  margin-bottom: 8px;
  transition: transform 0.3s ease;
}

.logo-icon:hover {
  transform: scale(1.05);
}

.title {
  margin: 0 0 8px 0;
  color: rgba(var(--v-theme-on-surface));
  font-weight: 700;
  font-size: 2rem;
  background: linear-gradient(135deg, 
    rgba(var(--v-theme-primary)), 
    rgba(var(--v-theme-info)));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.subtitle {
  margin: 0;
  color: rgba(var(--v-theme-on-surface), 0.7);
  font-size: 0.95rem;
  font-weight: 400;
}

.form-group {
  margin-bottom: 24px;
  position: relative;
}

.form-actions {
  margin: 32px 0 24px 0;
}

.form-footer {
  text-align: center;
  border-top: 1px solid rgba(var(--v-theme-outline), 0.1);
  padding-top: 20px;
}

.forgot-password {
  color: rgba(var(--v-theme-primary));
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 500;
  transition: color 0.3s ease;
}

.forgot-password:hover {
  color: rgba(var(--v-theme-primary-darken-1));
  text-decoration: underline;
}

/* FormKit Styles */
:deep(.formkit-wrapper) {
  position: relative;
}

:deep(.formkit-label) {
  display: block;
  margin-bottom: 8px;
  font-weight: 600;
  color: rgba(var(--v-theme-on-surface)) !important;
  font-size: 0.9rem;
  transition: color 0.3s ease;
}

:deep(.formkit-input) {
  width: 100%;
  padding: 14px 16px;
  border: 2px solid rgba(var(--v-theme-outline), 0.3);
  border-radius: 12px;
  font-size: 1rem;
  color: rgba(var(--v-theme-on-surface));
  background-color: rgba(var(--v-theme-surface)) !important;
  transition: all 0.3s ease;
  box-sizing: border-box;
}

:deep(.formkit-input:focus) {
  border-color: rgba(var(--v-theme-primary));
  outline: none;
  box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.1);
  transform: translateY(-1px);
}

:deep(.formkit-input:hover:not(:focus)) {
  border-color: rgba(var(--v-theme-outline), 0.5);
}

:deep(.formkit-input[type="submit"]) {
  width: 100%;
  padding: 16px 0;
  background: linear-gradient(135deg, 
    rgba(var(--v-theme-primary)), 
    rgba(var(--v-theme-primary-darken-1)));
  color: rgba(var(--v-theme-on-primary));
  border: none;
  border-radius: 12px;
  font-weight: 700;
  font-size: 1.1rem;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

:deep(.formkit-input[type="submit"]:hover:not(:disabled)) {
  transform: translateY(-2px);
  box-shadow: 0 8px 25px rgba(var(--v-theme-primary), 0.3);
}

:deep(.formkit-input[type="submit"]:active) {
  transform: translateY(0);
}

:deep(.formkit-input[type="submit"]:disabled) {
  background: rgba(var(--v-theme-outline), 0.3);
  cursor: not-allowed;
  transform: none;
  box-shadow: none;
}

:deep(.formkit-help) {
  display: block;
  margin-top: 6px;
  font-size: 0.8rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-weight: 400;
}

:deep(.formkit-messages) {
  margin-top: 8px;
}

:deep(.formkit-message) {
  color: rgba(var(--v-theme-error));
  font-size: 0.8rem;
  font-weight: 500;
}

/* Animation pour le chargement */
:deep(.formkit-input[type="submit"]:disabled)::after {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 20px;
  height: 20px;
  margin: -10px 0 0 -10px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

/* Responsive */
@media (max-width: 480px) {
  .login-form {
    padding: 28px 24px;
    border-radius: 16px;
  }
  
  .title {
    font-size: 1.75rem;
  }
  
  .form-group {
    margin-bottom: 20px;
  }
  
  :deep(.formkit-input) {
    padding: 12px 14px;
  }
}
</style>