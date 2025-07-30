<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h2 class="text-h5 font-weight-bold">Détails du compte : {{ user.username }}</h2>

        <v-data-table
          :headers="headers"
          :items="[user]"
          class="elevation-1"
          disable-pagination
          hide-default-footer
        >
          <template #item.is_donor="{ item }">
            <v-chip :color="item.is_donor ? 'green' : 'red'" text-color="white" small>
              {{ item.is_donor ? 'Oui' : 'Non' }}
            </v-chip>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import api from "@/http";

const route = useRoute();
const id = route.params.id;

const user = ref({});

const headers = [
  { title: "Nom d'utilisateur", value: "username" },
  { title: "Email", value: "email" },
  { title: "Prénom", value: "first_name" },
  { title: "Nom", value: "last_name" },
  { title: "Téléphone", value: "phone_number" },
  { title: "Date de naissance", value: "birth_date" },
  { title: "Groupe sanguin", value: "blood_type" },
  { title: "Wilaya", value: "wilaya" },
  { title: "Donneur", value: "is_donor" },
];

onMounted(async () => {
  try {
    const response = await api.get(`/accounts/${id}/`);
    user.value = response.data;
  } catch (err) {
    console.error("Erreur de chargement du compte :", err);
  }
});
</script>
