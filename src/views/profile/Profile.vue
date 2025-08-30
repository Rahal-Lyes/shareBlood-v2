<template>
  <v-container fluid class="accounts-container">
    <!-- Header avec animation -->
    <div class="page-header">
      <div class="header-content">
        <v-icon 
          icon="mdi-account-multiple" 
          size="32" 
          class="header-icon"
          color="primary"
        ></v-icon>
        <div class="header-text">
          <h1 class="display-6 font-weight-bold text-primary mb-1">
            Comptes Patients
          </h1>
          <p class="text-subtitle-1 text-medium-emphasis mb-0">
            Gestion et suivi des données patients
          </p>
        </div>
      </div>
      <v-divider class="my-4"></v-divider>
    </div>

    <!-- Contenu principal avec Suspense amélioré -->
    <div class="content-wrapper">
      <Suspense>
        <template #default>
          <v-fade-transition>
            <div class="accounts-content">
              <AccountsData />
            </div>
          </v-fade-transition>
        </template>
        
        <!-- Fallback amélioré avec skeleton loader -->
        <template #fallback>
          <div class="loading-container">
            <!-- Animation de chargement principale -->
            <div class="loading-header">
              <v-skeleton-loader
                type="avatar, heading"
                class="mb-4"
              ></v-skeleton-loader>
            </div>

            <!-- Barre de progression stylisée -->
            <v-card 
              class="loading-card mb-6" 
              elevation="2"
              rounded="xl"
            >
              <v-card-text class="pa-6">
                <div class="d-flex align-center mb-4">
                  <v-avatar 
                    color="primary" 
                    size="48"
                    class="loading-pulse mr-4"
                  >
                    <v-icon color="white">mdi-loading</v-icon>
                  </v-avatar>
                  <div>
                    <h3 class="text-h6 mb-1">Chargement des données</h3>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      Récupération des informations patients en cours...
                    </p>
                  </div>
                </div>
                
                <v-progress-linear
                  color="primary"
                  height="6"
                  indeterminate
                  rounded
                  class="mb-2"
                ></v-progress-linear>
                
                <div class="text-center">
                  <small class="text-caption text-medium-emphasis">
                    Veuillez patienter quelques instants
                  </small>
                </div>
              </v-card-text>
            </v-card>

            <!-- Skeleton cards pour prévisualiser le contenu -->
            <v-row>
              <v-col 
                v-for="i in 3" 
                :key="i" 
                cols="12" 
                md="4"
              >
                <v-card 
                  class="skeleton-card" 
                  elevation="2"
                  rounded="lg"
                >
                  <v-card-text>
                    <v-skeleton-loader
                      type="card-avatar, article"
                    ></v-skeleton-loader>
                  </v-card-text>
                </v-card>
              </v-col>
            </v-row>
          </div>
        </template>
      </Suspense>
    </div>
  </v-container>
</template>

<script setup>
import AccountsData from "@/pages-components/Patient/AccountsData.vue";
</script>

<style scoped>
.accounts-container {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  padding: 24px;
}

.page-header {
  margin-bottom: 32px;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 16px;
  animation: slideInFromTop 0.8s ease-out;
}

.header-icon {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  border-radius: 12px;
  padding: 8px;
  color: white !important;
  box-shadow: 0 4px 12px rgba(25, 118, 210, 0.3);
}

.header-text h1 {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.content-wrapper {
  position: relative;
}

.accounts-content {
  animation: fadeInUp 0.6s ease-out 0.2s both;
}

.loading-container {
  padding: 24px 0;
}

.loading-header {
  animation: pulse 2s ease-in-out infinite;
}

.loading-card {
  background: linear-gradient(135deg, #ffffff 0%, #f8f9ff 100%);
  border: 1px solid rgba(25, 118, 210, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  transition: all 0.3s ease;
}

.loading-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 12px 40px rgba(0, 0, 0, 0.12);
}

.loading-pulse {
  animation: pulse 2s ease-in-out infinite;
}

.skeleton-card {
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  animation: shimmer 2s ease-in-out infinite;
}

/* Animations */
@keyframes slideInFromTop {
  from {
    opacity: 0;
    transform: translateY(-30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
    transform: scale(1);
  }
  50% {
    opacity: 0.8;
    transform: scale(1.05);
  }
}

@keyframes shimmer {
  0% {
    opacity: 0.5;
  }
  50% {
    opacity: 0.8;
  }
  100% {
    opacity: 0.5;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .accounts-container {
    padding: 16px;
  }
  
  .header-content {
    flex-direction: column;
    text-align: center;
    gap: 12px;
  }
  
  .loading-card {
    margin: 0 -8px;
  }
}

/* Mode sombre */
@media (prefers-color-scheme: dark) {
  .accounts-container {
    background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }
  
  .loading-card {
    background: linear-gradient(135deg, #2d3748 0%, #1a202c 100%);
    border-color: rgba(255, 255, 255, 0.1);
  }
  
  .skeleton-card {
    background: rgba(45, 55, 72, 0.8);
    border-color: rgba(255, 255, 255, 0.1);
  }
}
</style>