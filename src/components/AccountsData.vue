<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold">Liste des utilisateurs</h2>
      </v-col>

      <v-col
        v-for="user in data.results"
        :key="user.username"
        cols="12"
        md="6"
        lg="4"
      >
        <v-card class="mx-auto mb-4" elevation="2">
          <v-card-title>
            {{ user.first_name }} {{ user.last_name }}
          </v-card-title>

          <v-card-subtitle>
            {{ user.email }}
          </v-card-subtitle>

          <v-card-text>
            <v-list dense>
              <v-list-item>
                <v-list-item-title>📱 {{ user.phone_number }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>🎂 {{ user.birth_date }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>🩸 Groupe sanguin : {{ user.blood_type }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>📍 Wilaya : {{ user.wilaya }}</v-list-item-title>
              </v-list-item>
              <v-list-item>
                <v-list-item-title>
                  🤝 Donneur :
                  <v-chip
                    :color="user.is_donor ? 'green' : 'red'"
                    class="ml-2"
                    small
                    text-color="white"
                  >
                    {{ user.is_donor ? 'Oui' : 'Non' }}
                  </v-chip>
                </v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions>
            <v-btn
              color="primary"
              variant="text"
              :to="`/accounts/${user.id}`"
            >
              Voir détails
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import api from "@/http";

const data = ref({ results: [] });

onMounted(async () => {
  try {
    const response = await api.get("/accounts/?page=1&page_size=5");
    data.value = response.data;
  } catch (error) {
    console.error("Erreur lors du chargement des utilisateurs :", error);
  }
});
</script>
