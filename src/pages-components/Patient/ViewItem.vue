<template>
  <v-dialog v-model="show" max-width="600" persistent>
    <v-card elevation="8" class="rounded-lg overflow-hidden">
      <!-- En-tête avec gradient -->
      <div class="profile-header pa-6 text-white position-relative">
        <div class="d-flex align-center justify-space-between">
          <div class="d-flex align-center">
            <v-avatar size="64" class="mr-4 elevation-3">
              <v-icon size="32" color="white">mdi-account-circle</v-icon>
            </v-avatar>
            <div>
              <h2 class="text-h4 font-weight-bold mb-1">
                {{ user.first_name }} {{ user.last_name }}
              </h2>
              <p class="text-subtitle1 opacity-90 mb-0">@{{ user.username }}</p>
            </div>
          </div>
          <v-btn 
            icon 
            variant="text" 
            size="large"
            @click="show = false"
            class="text-white"
          >
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </div>
        
        <!-- Badge donneur -->
        <div class="mt-4">
          <v-chip 
            :color="user.is_donor ? 'success' : 'error'" 
            :prepend-icon="user.is_donor ? 'mdi-heart' : 'mdi-heart-outline'"
            variant="elevated"
            size="large"
            class="font-weight-medium"
          >
            {{ user.is_donor ? 'Donneur Actif' : 'Non Donneur' }}
          </v-chip>
        </div>
      </div>

      <v-card-text class="pa-0">
        <!-- Informations principales -->
        <div class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4 text-primary">
            <v-icon class="mr-2">mdi-information</v-icon>
            Informations Personnelles
          </h3>
          
          <div class="info-grid">
            <div class="info-item">
              <div class="info-label">
                <v-icon size="20" class="mr-2 text-primary">mdi-email</v-icon>
                Email
              </div>
              <div class="info-value">{{ user.email }}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">
                <v-icon size="20" class="mr-2 text-primary">mdi-phone</v-icon>
                Téléphone
              </div>
              <div class="info-value">{{ user.phone_number }}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">
                <v-icon size="20" class="mr-2 text-primary">mdi-calendar</v-icon>
                Date de naissance
              </div>
              <div class="info-value">{{ formatDate(user.birth_date) }}</div>
            </div>
            
            <div class="info-item">
              <div class="info-label">
                <v-icon size="20" class="mr-2 text-primary">mdi-map-marker</v-icon>
                Wilaya
              </div>
              <div class="info-value">{{ user.wilaya }}</div>
            </div>
          </div>
        </div>

        <v-divider></v-divider>

        <!-- Informations médicales -->
        <div class="pa-6">
          <h3 class="text-h6 font-weight-bold mb-4 text-error">
            <v-icon class="mr-2">mdi-medical-bag</v-icon>
            Informations Médicales
          </h3>
          
          <div class="d-flex align-center">
            <v-icon size="24" class="mr-3 text-error">mdi-water</v-icon>
            <div>
              <div class="text-subtitle2 text-medium-emphasis">Type de sang</div>
              <v-chip 
                :color="getBloodTypeColor(user.blood_type)" 
                variant="elevated"
                size="large"
                class="font-weight-bold"
              >
                {{ user.blood_type }}
              </v-chip>
            </div>
          </div>
        </div>
      </v-card-text>

      <!-- Actions -->
      <v-card-actions class="pa-6 pt-0">
        <v-spacer></v-spacer>
        <v-btn 
          variant="outlined" 
          color="primary" 
          @click="show = false"
          size="large"
          class="px-6"
        >
          Fermer
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  user: {
    type: Object,
    default: () => ({})
  }
})

const show = defineModel({ default: false })

// Fonction pour formater la date
const formatDate = (dateString) => {
  if (!dateString) return 'Non renseigné'
  const date = new Date(dateString)
  return date.toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric'
  })
}

// Fonction pour obtenir la couleur du type de sang
const getBloodTypeColor = (bloodType) => {
  const colors = {
    'A+': 'red',
    'A-': 'red-darken-2',
    'B+': 'blue',
    'B-': 'blue-darken-2',
    'AB+': 'purple',
    'AB-': 'purple-darken-2',
    'O+': 'orange',
    'O-': 'orange-darken-2'
  }
  return colors[bloodType] || 'grey'
}
</script>

<style scoped>
.profile-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  position: relative;
}

.profile-header::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.1);
  pointer-events: none;
}

.info-grid {
  display: grid;
  grid-template-columns: 1fr;
  gap: 20px;
}

@media (min-width: 600px) {
  .info-grid {
    grid-template-columns: 1fr 1fr;
  }
}

.info-item {
  padding: 16px;
  border-radius: 8px;
  background: rgba(var(--v-theme-surface), 0.5);
  border: 1px solid rgba(var(--v-theme-outline), 0.2);
  transition: all 0.2s ease;
}

.info-item:hover {
  background: rgba(var(--v-theme-primary), 0.05);
  border-color: rgba(var(--v-theme-primary), 0.3);
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.info-label {
  display: flex;
  align-items: center;
  font-size: 0.875rem;
  font-weight: 500;
  color: rgba(var(--v-theme-on-surface), 0.7);
  margin-bottom: 4px;
}

.info-value {
  font-size: 1rem;
  font-weight: 600;
  color: rgb(var(--v-theme-on-surface));
}

.v-card {
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.12) !important;
}

.v-chip {
  transition: all 0.2s ease;
}

.v-chip:hover {
  transform: scale(1.05);
}
</style>