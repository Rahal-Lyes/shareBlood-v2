<template>
  <v-container>
    <!-- Onglets -->
    <v-tabs v-model="tab" color="primary" grow>
      <v-tab value="settings">⚙️ Settings</v-tab>
      <v-tab value="profile">👤 Profile</v-tab>
    </v-tabs>

    <!-- Contenu des onglets -->
    <v-tabs-window v-model="tab">
      <!-- SETTINGS -->
      <v-tabs-window-item value="settings">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h6">Paramètres</v-card-title>
          <v-divider class="mb-4"></v-divider>

          <v-text-field label="Langue" v-model="settings.language" />
    <v-switch
  label="Mode sombre"
  v-model="darkMode"
  true-value="dark"
  false-value="light"
  @change="localStorage.setItem('theme', darkMode)"
/>
        </v-card>
      </v-tabs-window-item>

      <!-- PROFILE -->
      <v-tabs-window-item value="profile">
        <v-card class="pa-4" elevation="2">
          <v-card-title class="text-h5">Profil Utilisateur</v-card-title>
          <v-divider class="mb-4"></v-divider>

          <v-row>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Nom complet :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.first_name }} {{ profile.last_name }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Nom d'utilisateur :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.username }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Email :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.email }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Téléphone :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.phone_number }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Date de naissance :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.birth_date }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Type sanguin :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.blood_type || 'Non renseigné' }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>

          <v-row>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Wilaya :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.wilaya }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
            <v-col cols="12" md="6">
              <v-list-item>
                <v-list-item-title><strong>Donneur :</strong></v-list-item-title>
                <v-list-item-subtitle>{{ profile.is_donor ? 'Oui' : 'Non' }}</v-list-item-subtitle>
              </v-list-item>
            </v-col>
          </v-row>
        </v-card>
      </v-tabs-window-item>
    </v-tabs-window>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";

const tab = ref("settings");
const darkMode = ref(localStorage.getItem('theme') || 'light');

const settings = ref({
  language: "Français",
  darkMode: false
});

const profile = ref({});

onMounted(() => {
  profile.value = {
    id: 1,
    first_name: "LYES",
    last_name: "RAHAL",
    username: "admin",
    email: "lyesrahal.cs@gmail.com",
    phone_number: "+213779694795",
    birth_date: "2025-08-06",
    blood_type: "",
    wilaya: "bouira,el esnam",
    is_donor: false
  };
});
</script>
