<template>
  <v-container class="d-flex justify-center min-height-screen py-8">
    <v-stepper
      v-model="step"
      class="elevation-2 register-form"
      alt-labels
      linear
    >
      <v-stepper-header class="stepper-header">
        <v-stepper-item
          title="Informations de base"
          :value="1"
          :complete="step > 1"
          :color="step >= 1 ? 'primary' : 'grey-400'"
        >
          <template #icon>
            <v-icon>mdi-account-outline</v-icon>
          </template>
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Mot de passe"
          :value="2"
          :complete="step > 2"
          :color="step >= 2 ? 'primary' : 'grey-400'"
        >
          <template #icon>
            <v-icon>mdi-lock-outline</v-icon>
          </template>
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Infos personnelles"
          :value="3"
          :complete="step > 3"
          :color="step >= 3 ? 'primary' : 'grey-400'"
        >
          <template #icon>
            <v-icon>mdi-card-account-details-outline</v-icon>
          </template>
        </v-stepper-item>

        <v-divider></v-divider>

        <v-stepper-item
          title="Infos médicales"
          :value="4"
          :complete="step > 4"
          :color="step >= 4 ? 'primary' : 'grey-400'"
        >
          <template #icon>
            <v-icon>mdi-medical-bag</v-icon>
          </template>
        </v-stepper-item>
      </v-stepper-header>

      <v-stepper-window>
        <!-- Étape 1: Informations de base -->
        <v-stepper-window-item :value="1">
          <v-card class="pa-6 pa-sm-8 step-card" flat>
            <div class="step-header">
              <v-icon color="primary" size="48" class="mb-3"
                >mdi-account-plus</v-icon
              >
              <h1 class="title_02 text-h5 text-sm-h4 mb-2">
                Informations de base
              </h1>
              <p class="text-grey-600 mb-6">
                Commençons par vos informations essentielles
              </p>
            </div>

            <FormKit
              type="form"
              :actions="false"
              @submit="(data) => validateStep(1, data)"
            >
              <div class="form-content">
                <v-row>
                  <v-col cols="12">
                    <FormKit
                      type="text"
                      name="username"
                      label="Nom d'utilisateur"
                      validation="required"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                    />
                  </v-col>
                  <v-col cols="12">
                    <FormKit
                      type="email"
                      name="email"
                      label="Adresse email"
                      validation="required|email"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                      help="Nous utiliserons cette adresse pour vous contacter"
                    />
                  </v-col>
                </v-row>
              </div>

              <div class="button-container">
                <FormKit
                  type="submit"
                  label="Continuer"
                  input-class="primary-btn"
                />
              </div>
            </FormKit>
          </v-card>
        </v-stepper-window-item>

        <!-- Étape 2: Mot de passe -->
        <v-stepper-window-item :value="2">
          <v-card class="pa-6 pa-sm-8 step-card" flat>
            <div class="step-header">
              <v-icon color="primary" size="48" class="mb-3"
                >mdi-shield-lock</v-icon
              >
              <h1 class="title_02 text-h5 text-sm-h4 mb-2">Sécurisation</h1>
              <p class="text-grey-600 mb-6">
                Choisissez un mot de passe sécurisé
              </p>
            </div>

            <FormKit
              type="form"
              :actions="false"
              @submit="(data) => validateStep(2, data)"
            >
              <div class="form-content">
                <v-row>
                
                    <v-col cols="12" md="6">
                    <FormKit
                      type="text"
                      name="firstname"
                      label="firstname"
                      validation="required"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                    />
                    
                  </v-col>
                  <v-col cols="12" md="6">
                    <FormKit
                      type="text"
                      name="lastname"
                      label="lastname"
                      validation="required"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                    />
                    
                  </v-col>
                  <v-col  cols="12" md="6">  
                    <FormKit
                      type="password"
                      name="password"
                      label="Mot de passe"
                      validation="required|length:4..16"
                      autocomplete="new-password"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                      help="Entre 4 et 16 caractères"
                    />
                  </v-col>
                  
                </v-row>
              </div>

              <div class="button-container">
                <v-btn
                  class="secondary-btn me-4"
                  variant="outlined"
                  @click="step--"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Retour
                </v-btn>
                <FormKit
                  type="submit"
                  label="Continuer"
                  input-class="primary-btn"
                />
              </div>
            </FormKit>
          </v-card>
        </v-stepper-window-item>

        <!-- Étape 3: Informations personnelles -->
        <v-stepper-window-item :value="3">
          <v-card class="pa-6 pa-sm-8 step-card" flat>
            <div class="step-header">
              <v-icon color="primary" size="48" class="mb-3"
                >mdi-account-details</v-icon
              >
              <h1 class="title_02 text-h5 text-sm-h4 mb-2">
                Informations personnelles
              </h1>
              <p class="text-grey-600 mb-6">Complétez votre profil personnel</p>
            </div>

            <FormKit
              type="form"
              :actions="false"
              @submit="(data) => validateStep(3, data)"
            >
              <div class="form-content">
                <v-row>
                  <v-col cols="12" md="6">
                    <FormKit
                      type="text"
                      name="phone_number"
                      label="Numéro de téléphone"
                      validation="required|matches:/^\+213[5-7]\d{8}$/"
                      :validation-messages="{
                        matches: 'Format invalide. Ex: +213612345678',
                      }"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                      help="Format international recommandé"
                    />
                  </v-col>
                  <v-col cols="12" md="6">
                    <FormKit
                      type="date"
                      name="birth_date"
                      label="Date de naissance"
                      validation="required"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                    />
                  </v-col>
                  <v-col cols="12">
                    <FormKit
                      type="text"
                      name="wilaya"
                      label="Wilaya de résidence"
                      validation="required"
                      class="mb-4 enhanced-input"
                      :wrapper-class="'input-wrapper'"
                    />
                  </v-col>
                </v-row>
              </div>

              <div class="button-container">
                <v-btn
                  class="secondary-btn me-4"
                  variant="outlined"
                  @click="step--"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Retour
                </v-btn>
                <FormKit
                  type="submit"
                  label="Continuer"
                  input-class="primary-btn"
                />
              </div>
            </FormKit>
          </v-card>
        </v-stepper-window-item>

        <!-- Étape 4: Informations médicales -->
        <v-stepper-window-item :value="4">
          <v-card class="pa-6 pa-sm-8 step-card" flat>
            <div class="step-header">
              <v-icon color="primary" size="48" class="mb-3"
                >mdi-heart-pulse</v-icon
              >
              <h1 class="title_02 text-h5 text-sm-h4 mb-2">
                Informations médicales
              </h1>
              <p class="text-grey-600 mb-6">
                Dernière étape pour finaliser votre inscription
              </p>
            </div>

            <FormKit type="form" :actions="false" @submit="handleSubmit">
              <div class="form-content">
                <!-- Section Don de sang avec design amélioré -->
                <v-card class="donor-card mb-6" variant="outlined">
                  <v-card-text class="pb-2">
                    <div class="donor-section">
                      <div class="donor-header">
                        <v-icon color="error" class="me-3">mdi-water</v-icon>
                        <div>
                          <h3 class="text-h6 mb-1">Don de sang</h3>
                          <p class="text-caption text-grey-600 mb-0">
                            Aidez à sauver des vies
                          </p>
                        </div>
                      </div>

                      <FormKit
                        type="hidden"
                        name="is_donor"
                        v-model="isDonor"
                      />
                      <v-switch
                        v-model="isDonor"
                        color="primary"
                        label="Je souhaite être donneur de sang"
                        hide-details
                        inset
                        class="donor-switch"
                      ></v-switch>
                    </div>
                  </v-card-text>
                </v-card>

                <!-- Groupe sanguin avec transition -->
                <v-expand-transition>
                  <div v-show="isDonor">
                    <v-row>
                      <v-col cols="12" md="6">
                        <FormKit
                          type="select"
                          name="blood_type"
                          label="Groupe sanguin"
                          :options="bloodTypes"
                          validation="required_if:is_donor"
                          class="mb-4 enhanced-input"
                          :wrapper-class="'input-wrapper'"
                          help="Votre groupe sanguin ABO"
                        />
                      </v-col>
                    </v-row>
                  </div>
                </v-expand-transition>
              </div>

              <v-divider class="my-6"></v-divider>

              <div class="button-container final-step">
                <v-btn
                  class="secondary-btn me-4"
                  variant="outlined"
                  @click="step--"
                >
                  <v-icon start>mdi-arrow-left</v-icon>
                  Retour
                </v-btn>
                <FormKit
                  type="submit"
                  label="Finaliser l'inscription"
                  input-class="success-btn"
                />
              </div>
            </FormKit>
          </v-card>
        </v-stepper-window-item>
      </v-stepper-window>
    </v-stepper>
  </v-container>
</template>

<script setup>
import { ref } from "vue";
import { useAuthStore } from "@/stores/AuthStore";
import router from "@/router/index.js";
const auth = useAuthStore();
import { useToastStore } from "@/stores/ToastStore.js";
  const toast = useToastStore();
const step = ref(1);
const formData = ref({});
const isDonor = ref(false);
const bloodTypes = [
  { value: "", label: "Sélectionnez votre groupe sanguin..." },
  { value: "A+", label: "A+ (A Rhésus positif)" },
  { value: "A-", label: "A- (A Rhésus négatif)" },
  { value: "B+", label: "B+ (B Rhésus positif)" },
  { value: "B-", label: "B- (B Rhésus négatif)" },
  { value: "AB+", label: "AB+ (AB Rhésus positif)" },
  { value: "AB-", label: "AB- (AB Rhésus négatif)" },
  { value: "O+", label: "O+ (O Rhésus positif)" },
  { value: "O-", label: "O- (O Rhésus négatif)" },
];

function validateStep(index, values) {
  // Fusionner les nouvelles données dans formData
  formData.value = { ...formData.value, ...values };
  step.value++;
}

 async function handleSubmit(values) {
  formData.value = { ...formData.value, ...values };
await auth.register(
  formData.value.username,        // ✅ username
  formData.value.password,        // ✅ password
  formData.value.email,           // ✅ email
  formData.value.firstname,       // ✅ first_name
  formData.value.lastname,        // ✅ last_name
  formData.value.phone_number,    // ✅ phone_number
  formData.value.birth_date,      // ✅ birth_date
  formData.value.blood_type,      // ✅ blood_type
  formData.value.wilaya,          // ✅ wilaya
  formData.value.is_donor         // ✅ is_donor
);



}
</script>

<style scoped lang="scss">
.register-form {
  max-width: 900px;
  width: 100%;
  margin: 0 auto;
  background-color: rgb(var(--v-theme-background));
  border-radius: 16px;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

.stepper-header {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary), 0.05) 0%,
    rgba(var(--v-theme-info), 0.05) 100%
  );
  padding: 24px;
  border-bottom: 1px solid rgba(var(--v-theme-primary), 0.1);
}

.step-card {
  min-height: 500px;
  display: flex;
  flex-direction: column;
  background-color: rgb(var(--v-theme-background));
  align-items: center;

  position: relative;
  padding: 24px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(
      90deg,
      rgb(var(--v-theme-primary)) 0%,
      rgb(var(--v-theme-info)) 100%
    );
  }
}

.step-header {
  text-align: center;
  margin-bottom: 32px;
  .title_02 {
    padding: 0;
    color: rgb(var(--v-theme-primary));
    font-weight: 700;
    border: none;
    margin: 0;
    font-size: 1.8rem;
  }
}

.form-content {
  flex: 1;
  margin-bottom: 32px;
  margin: 0 auto;
}

.input-wrapper {
  margin-bottom: 24px;
}

.button-container {
  display: flex;
  justify-content: center;

  gap: 16px;
  padding-top: 24px;
  flex-wrap: wrap;

  &.final-step {
    background: linear-gradient(
      135deg,
      rgba(var(--v-theme-info), 0.05) 0%,
      rgba(var(--v-theme-primary), 0.05) 100%
    );

    padding: 24px;
    margin: 0 -24px -24px -24px;
    border-radius: 0 0 16px 16px;
    border-top: 1px solid rgba(var(--v-theme-primary), 0.1);
  }
}

.primary-btn,
.secondary-btn,
.success-btn {
  min-width: 140px;
  height: 48px;
  font-weight: 600;
  letter-spacing: 0.5px;
  border-radius: 12px;
  text-transform: none;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.donor-card {
  border: 2px solid rgba(var(--v-theme-primary), 0.1);
  border-radius: 12px;
  transition: all 0.3s ease;
  padding: 16px;
  margin-bottom: 24px;

  &:hover {
    border-color: rgba(var(--v-theme-primary), 0.2);
    box-shadow: 0 4px 16px rgba(var(--v-theme-primary), 0.1);
  }
}

.donor-section {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  .donor-header {
    display: flex;
    align-items: center;
    flex: 1;
  }

  .donor-switch {
    flex-shrink: 0;
    margin-left: 12px;
  }
}

.password-strength {
  margin-top: 16px;

  .strength-indicators {
    display: flex;
    align-items: center;
    gap: 12px;
  }

  .strength-bar {
    height: 8px;
    width: 150px;
    background-color: rgba(var(--v-theme-grey-300));
    border-radius: 4px;
    overflow: hidden;

    .strength-fill {
      height: 100%;
      transition: all 0.3s ease;
      border-radius: 4px;
    }
  }
}

:deep(.formkit-input) {
  padding: 18px 22px;
  border-radius: 14px;
  font-size: 1.05rem;
  color: rgb(var(--v-theme-on-surface));
  background-color: rgb(var(--v-theme-background)) !important;
  transition: all 0.35s cubic-bezier(0.4, 0, 0.2, 1);
  width: 100%;
  box-sizing: border-box;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(2px);

  /* Effet de profondeur */
  transform: translateY(0);
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}

@keyframes input-enter {
  0% {
    opacity: 0;
    transform: translateY(10px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

:deep(.formkit-label) {
  margin-bottom: 8px;
  font-weight: 600;
  color: rgb(var(--v-theme-info)) !important;
  font-size: 1.2rem;
  display: block;
}

:deep(.formkit-help) {
  display: block;
  margin-top: 6px;
  font-size: 1rem;
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-style: italic;
}

:deep(.formkit-input[type="submit"]) {
  &.primary-btn {
    background: linear-gradient(
      135deg,
      rgb(var(--v-theme-primary)) 0%,
      rgb(var(--v-theme-info)) 100%
    );
    color: white;
    border: none;
    box-shadow: 0 4px 16px rgba(var(--v-theme-primary), 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--v-theme-primary), 0.4);
    }
  }

  &.success-btn {
    background: linear-gradient(
      135deg,
      rgb(var(--v-theme-success)) 0%,
      rgb(var(--v-theme-primary)) 100%
    );
    color: white;
    border: none;
    box-shadow: 0 4px 16px rgba(var(--v-theme-success), 0.3);

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 20px rgba(var(--v-theme-success), 0.4);
    }
  }
}

.secondary-btn {
  background-color: transparent;
  color: rgb(var(--v-theme-primary));
  border: 2px solid rgb(var(--v-theme-primary));

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.05);
    transform: translateY(-1px);
  }
}

// Responsive design
@media (max-width: 768px) {
  .register-form {
    margin: 16px;
    border-radius: 12px;
  }

  .step-card {
    padding: 16px !important;
  }

  .button-container {
    flex-direction: column;
    gap: 12px;

    .primary-btn,
    .secondary-btn,
    .success-btn {
      width: 100%;
      min-width: unset;
      margin-top: 8px;
    }
  }

  .donor-section {
    flex-direction: column;
    align-items: flex-start;
    gap: 16px;

    .donor-switch {
      align-self: flex-start;
      margin-left: 0;
    }
  }

  .stepper-header {
    padding: 16px;

    :deep(.v-stepper-item) {
      padding: 8px;

      .v-stepper-item__title {
        font-size: 0.8rem;
      }
    }
  }

  .title_02 {
    font-size: 1.4rem !important;
  }
}

// Animation pour les transitions
.v-stepper-window-item {
  transition: all 0.3s ease;
}

// Style pour les icônes des étapes
:deep(.v-stepper-item) {
  .v-stepper-item__avatar {
    transition: all 0.3s ease;
    background-color: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-primary));

    .v-icon {
      color: inherit;
    }
  }

  &.v-stepper-item--complete .v-stepper-item__avatar {
    background-color: rgb(var(--v-theme-success)) !important;
    color: white;
  }
}

// Correction pour les champs de date
:deep(input[type="date"]) {
  height: 56px;
  display: flex;
  align-items: center;
}

// Correction pour les sélecteurs
:deep(.formkit-inner) {
  position: relative;

  &:after {
    content: "▼";
    position: absolute;
    right: 16px;
    top: 50%;
    transform: translateY(-50%);
    pointer-events: none;
    color: rgba(var(--v-theme-on-surface), 0.6);
  }
}
</style>
