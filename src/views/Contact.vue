<template>
  <div class="contact-page">
    <!-- Hero Section -->
    <section class="hero-section">
      <v-container>
        <v-row align="center" justify="center" class="min-height-hero">
          <v-col cols="12" md="8" class="text-center">
            <div class="hero-content">
              <v-avatar size="120" class="hero-avatar mb-6" color="primary">
                <v-icon size="60" color="white">mdi-phone</v-icon>
              </v-avatar>

              <h1 class="display-4 font-weight-bold text-white mb-4">
                Contactez-Nous
              </h1>

              <p class="text-h6 text-white mb-8 max-width-text opacity-90">
                Nous sommes là pour vous aider. N'hésitez pas à nous contacter
                pour toute question ou demande d'information.
              </p>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Contact Cards Section -->
    <section class="contact-cards-section">
      <v-container>
        <v-row class="contact-cards-row">
          <!-- Contact Info Card -->
          <v-col cols="12" lg="4">
            <v-card class="contact-info-card h-100" elevation="12" rounded="xl">
              <div class="contact-header">
                <v-icon size="40" color="white">mdi-information</v-icon>
                <h3 class="text-h5 font-weight-bold text-white mt-2">
                  Informations de Contact
                </h3>
              </div>

              <v-card-text class="pa-6">
                <!-- Email -->
                <div class="contact-item">
                  <v-icon color="primary" class="contact-icon"
                    >mdi-email</v-icon
                  >
                  <div class="contact-details">
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">Email</h4>
                    <p class="text-body-1 text-medium-emphasis mb-0">
                      <a
                        href="mailto:lyes.postavo@gmail.com"
                        class="contact-link"
                      >
                        lyes.postavo@gmail.com
                      </a>
                    </p>
                  </div>
                </div>

                <!-- Téléphone -->
                <div class="contact-item">
                  <v-icon color="success" class="contact-icon"
                    >mdi-phone</v-icon
                  >
                  <div class="contact-details">
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">
                      Téléphone
                    </h4>
                    <p class="text-body-1 text-medium-emphasis mb-0">
                      <a href="tel:+213779694795" class="contact-link">
                        +213 779 694 795
                      </a>
                    </p>
                  </div>
                </div>

                <!-- Adresse -->
                <div class="contact-item">
                  <v-icon color="error" class="contact-icon"
                    >mdi-map-marker</v-icon
                  >
                  <div class="contact-details">
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">
                      Adresse
                    </h4>
                    <p class="text-body-1 text-medium-emphasis mb-0">
                      El Esnam, Bouira<br />
                      Algérie
                    </p>
                  </div>
                </div>

                <!-- Horaires -->
                <div class="contact-item">
                  <v-icon color="warning" class="contact-icon"
                    >mdi-clock</v-icon
                  >
                  <div class="contact-details">
                    <h4 class="text-subtitle-1 font-weight-bold mb-1">
                      Horaires
                    </h4>
                    <p class="text-body-2 text-medium-emphasis mb-1">
                      Lundi - Vendredi: 08:00 - 18:00
                    </p>
                    <p class="text-body-2 text-medium-emphasis mb-0">
                      Samedi: 09:00 - 14:00
                    </p>
                  </div>
                </div>
              </v-card-text>
            </v-card>
          </v-col>

          <!-- Contact Form -->
          <v-col cols="12" lg="8">
            <v-card class="contact-form-card h-100" elevation="8" rounded="xl">
              <v-card-title class="pa-6 pb-0">
                <h3 class="text-h5 font-weight-bold text-primary">
                  Envoyez-nous un message
                </h3>
                <p class="text-body-2 text-medium-emphasis mt-2 mb-0">
                  Remplissez le formulaire ci-dessous et nous vous répondrons
                  dans les plus brefs délais.
                </p>
              </v-card-title>

              <v-card-text class="pa-6">
                <v-form
                  ref="contactForm"
                  v-model="formValid"
                  @submit.prevent="submitForm"
                >
                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.firstName"
                        label="Prénom"
                        :rules="nameRules"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-account"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.lastName"
                        label="Nom"
                        :rules="nameRules"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-account-outline"
                        required
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-row>
                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.email"
                        label="Email"
                        :rules="emailRules"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-email"
                        type="email"
                        required
                      ></v-text-field>
                    </v-col>

                    <v-col cols="12" sm="6">
                      <v-text-field
                        v-model="form.phone"
                        label="Téléphone"
                        variant="outlined"
                        color="primary"
                        prepend-inner-icon="mdi-phone"
                        type="tel"
                      ></v-text-field>
                    </v-col>
                  </v-row>

                  <v-text-field
                    v-model="form.subject"
                    label="Sujet"
                    :rules="subjectRules"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-format-title"
                    required
                  ></v-text-field>

                  <v-textarea
                    v-model="form.message"
                    label="Message"
                    :rules="messageRules"
                    variant="outlined"
                    color="primary"
                    prepend-inner-icon="mdi-message-text"
                    rows="4"
                    required
                  ></v-textarea>

                  <div class="form-actions">
                    <v-btn
                      type="submit"
                      :disabled="!formValid || loading"
                      :loading="loading"
                      color="primary"
                      size="large"
                      rounded="pill"
                      elevation="4"
                    >
                      <v-icon start>mdi-send</v-icon>
                      Envoyer le message
                    </v-btn>
                  </div>
                </v-form>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <!-- Map Section -->
    <section class="map-section">
      <v-container>
        <div class="text-center mb-8">
          <h2 class="text-h4 font-weight-bold text-primary mb-4">
            Où nous trouver
          </h2>
          <p class="text-h6 text-medium-emphasis">
            Notre bureau à El Esnam, Bouira
          </p>
        </div>

        <v-card class="map-card" elevation="8" rounded="xl">
          <div class="map-placeholder">
            <v-icon size="100" color="primary" class="mb-4">
              mdi-map-marker-radius
            </v-icon>
            <h3 class="text-h6 font-weight-bold text-primary mb-2">
              El Esnam, Bouira
            </h3>
            <p class="text-body-1 text-medium-emphasis mb-4">Algérie</p>
            <v-btn
              color="primary"
              variant="elevated"
              rounded="pill"
              href="https://maps.google.com/?q=El+Esnam+Bouira+Algeria"
              target="_blank"
            >
              <v-icon start>mdi-map-search</v-icon>
              Voir sur Google Maps
            </v-btn>
          </div>
        </v-card>
      </v-container>
    </section>

    <!-- Success Snackbar -->
    <v-snackbar
      v-model="showSnackbar"
      :color="snackbarColor"
      timeout="5000"
      location="top"
    >
      <v-icon start>{{ snackbarIcon }}</v-icon>
      {{ snackbarMessage }}

      <template v-slot:actions>
        <v-btn variant="text" @click="showSnackbar = false"> Fermer </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";

// Refs
const contactForm = ref(null);
const formValid = ref(false);
const loading = ref(false);
const showSnackbar = ref(false);
const snackbarMessage = ref("");
const snackbarColor = ref("success");
const snackbarIcon = ref("mdi-check-circle");

// Form data
const form = reactive({
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  subject: "",
  message: "",
});

// Validation rules
const nameRules = [
  (v) => !!v || "Ce champ est obligatoire",
  (v) => v.length >= 2 || "Minimum 2 caractères",
];

const emailRules = [
  (v) => !!v || "Email obligatoire",
  (v) => /.+@.+\..+/.test(v) || "Email invalide",
];

const subjectRules = [
  (v) => !!v || "Sujet obligatoire",
  (v) => v.length >= 5 || "Minimum 5 caractères",
];

const messageRules = [
  (v) => !!v || "Message obligatoire",
  (v) => v.length >= 10 || "Minimum 10 caractères",
];

// Methods
const submitForm = async () => {
  if (!formValid.value) return;

  loading.value = true;

  try {
    // Simulation d'envoi
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // Success
    snackbarMessage.value =
      "Message envoyé avec succès! Nous vous répondrons bientôt.";
    snackbarColor.value = "success";
    snackbarIcon.value = "mdi-check-circle";
    showSnackbar.value = true;

    // Reset form
    if (contactForm.value) {
      contactForm.value.reset();
    }
    Object.keys(form).forEach((key) => {
      form[key] = "";
    });
  } catch (error) {
    // Error
    snackbarMessage.value = "Erreur lors de l'envoi. Veuillez réessayer.";
    snackbarColor.value = "error";
    snackbarIcon.value = "mdi-alert-circle";
    showSnackbar.value = true;
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped>
.contact-page {
  min-height: 100vh;
}

/* Hero Section */
.hero-section {
  background: linear-gradient(135deg, #1976d2 0%, #42a5f5 100%);
  padding: 100px 0;
  position: relative;
  overflow: hidden;
}

.hero-section::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E");
  animation: float 20s ease-in-out infinite;
}

.min-height-hero {
  min-height: 50vh;
}

.hero-content {
  animation: fadeInUp 1s ease-out;
}

.hero-avatar {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
  animation: bounce 2s ease-in-out infinite;
}

.max-width-text {
  max-width: 600px;
  margin: 0 auto;
}

/* Contact Cards Section */
.contact-cards-section {
  padding: 80px 0;
  background: #f8f9fa;
}

.contact-cards-row {
  margin-top: -60px;
  position: relative;
  z-index: 10;
}

.contact-info-card {
  background: white;
  overflow: hidden;
  animation: slideInLeft 1s ease-out;
}

.contact-header {
  background: linear-gradient(45deg, #1976d2, #42a5f5);
  padding: 30px;
  text-align: center;
  color: white;
}

.contact-item {
  display: flex;
  align-items: flex-start;
  margin-bottom: 32px;
  padding: 16px;
  border-radius: 12px;
  transition: all 0.3s ease;
}

.contact-item:hover {
  background: rgba(25, 118, 210, 0.05);
  transform: translateX(8px);
}

.contact-icon {
  font-size: 24px;
  margin-right: 16px;
  margin-top: 4px;
  flex-shrink: 0;
}

.contact-details {
  flex: 1;
}

.contact-link {
  color: inherit;
  text-decoration: none;
  transition: color 0.3s ease;
}

.contact-link:hover {
  color: #1976d2;
  text-decoration: underline;
}

.contact-form-card {
  background: white;
  animation: slideInRight 1s ease-out;
}

.form-actions {
  text-align: center;
  margin-top: 24px;
}

/* Map Section */
.map-section {
  padding: 80px 0;
  background: white;
}

.map-card {
  background: #f8f9fa;
  overflow: hidden;
}

.map-placeholder {
  padding: 80px;
  text-align: center;
  background: linear-gradient(135deg, #f8f9fa 0%, #e3f2fd 100%);
}

/* Animations */
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(50px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translateX(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes slideInRight {
  from {
    opacity: 0;
    transform: translateX(50px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  50% {
    transform: translateY(-20px) rotate(180deg);
  }
}

/* Responsive */
@media (max-width: 768px) {
  .hero-section {
    padding: 60px 0;
  }

  .contact-cards-section {
    padding: 60px 0;
  }

  .contact-cards-row {
    margin-top: -40px;
  }

  .contact-header {
    padding: 24px;
  }

  .contact-item {
    margin-bottom: 24px;
    padding: 12px;
  }

  .map-placeholder {
    padding: 40px 20px;
  }

  .hero-content h1 {
    font-size: 2.5rem !important;
  }
}

/* Dark theme support */
@media (prefers-color-scheme: dark) {
  .contact-cards-section {
    background: #1e1e1e;
  }

  .contact-info-card,
  .contact-form-card {
    background: #2d2d2d !important;
  }

  .map-section {
    background: #1e1e1e;
  }

  .map-card {
    background: #2d2d2d !important;
  }

  .map-placeholder {
    background: linear-gradient(135deg, #2d2d2d 0%, #1e3a8a 100%);
  }
}
</style>
