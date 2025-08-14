<template>
  <v-app>
    <v-container fluid class="pa-6">
      <DataTableSuspense
        verboseName_01="Banque de Sang"
        verboseName_02="Liste des donneurs"
        verboseName_03="Ajouter nouveau donneur"
        :add_data="() => console.log('clicked')"
        @showFilters="handleShowFilters"
      >
      </DataTableSuspense>

      <v-card class="elevation-4 rounded-xl overflow-hidden pa-3">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          item-key="id"
          density="comfortable"
          hover
          class="modern-table"
          :items-per-page="10"
          show-select
          v-model="selectedItems"
        >
          <template #item.donor_info="{ item }">
            
            <div class="d-flex align-center ga-3 py-2">
              <v-avatar
                :color="getBloodTypeColor(item.blood_type)"
                size="40"
                class="donor-avatar"
              >
                <v-icon color="white">mdi-account</v-icon>
              </v-avatar>
              <div>
                <div class="font-weight-medium">
                  {{ item.first_name }} {{ item.last_name }}
                </div>
                 <div class="text-caption text-medium-emphasis">
                  {{ item.email }}
                </div>
              </div>
            </div>
          </template>

        

          <template #item.blood_type="{ item }">
            <v-chip
              :color="getBloodTypeColor(item.blood_type)"
              variant="flat"
              size="small"
              class="font-weight-bold text-white"
            >
              {{ item.blood_type }}
            </v-chip>
          </template>

          <template #item.is_donor="{ item }">
            <v-chip
              :color="item.is_donor ? 'success' : 'error'"
              variant="flat"
              size="small"
              :prepend-icon="item.is_donor ? 'mdi-check' : 'mdi-close'"
              class="font-weight-bold"
            >
              {{ item.is_donor ? "Oui" : "Non" }}
            </v-chip>
          </template>

          <template #item.wilaya="{ item }">
            <div class="text-center">
              <div class="font-weight-medium">
                {{ item.wilaya }}
              </div>
            </div>
          </template>

          <template #item.birth_date="{ item }">
            <div class="text-center">
              <div class="font-weight-medium">
                {{ formatDate(item.birth_date) }}
              </div>
              <div class="text-caption text-medium-emphasis">
                {{ calculateAge(item.birth_date) }} ans
              </div>
            </div>
          </template>

          <template #item.phone_number="{item}">

             <div class=" text-medium-emphasis">
                  {{ item.phone_number }}
                </div>
          </template>

          <template #item.actions="{ item }">
            <div class="d-flex ga-1">
              <v-btn
                icon="mdi-account-eye"
                variant="text"
                size="small"
                color="primary"
                @click="viewItem(item)"
              />
              <v-btn
                icon="mdi-pencil"
                variant="text"
                size="small"
                color="warning"
                @click="editItem(item)"
              />
              <v-menu>
                <template #activator="{ props }">
                  <v-btn
                    icon="mdi-dots-vertical"
                    variant="text"
                    size="small"
                    v-bind="props"
                  />
                </template>
                <v-list density="compact">
                  <v-list-item
                    @click="scheduleDonation(item)"
                    v-if="item.is_donor"
                  >
                    <template #prepend>
                      <v-icon>mdi-water-plus</v-icon>
                    </template>
                    <v-list-item-title>Programmer don</v-list-item-title>
                  </v-list-item>
                  <v-list-item
                    @click="viewDonationHistory(item)"
                    v-if="item.is_donor"
                  >
                    <template #prepend>
                      <v-icon>mdi-history</v-icon>
                    </template>
                    <v-list-item-title>Historique</v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="toggleDonorStatus(item)">
                    <template #prepend>
                      <v-icon>{{
                        item.is_donor ? "mdi-account-minus" : "mdi-account-plus"
                      }}</v-icon>
                    </template>
                    <v-list-item-title>
                      {{
                        item.is_donor ? "Retirer donneur" : "Ajouter donneur"
                      }}
                    </v-list-item-title>
                  </v-list-item>
                  <v-list-item @click="deleteItem(item)" class="text-error">
                    <template #prepend>
                      <v-icon>mdi-delete</v-icon>
                    </template>
                    <v-list-item-title>Supprimer</v-list-item-title>
                  </v-list-item>
                </v-list>
              </v-menu>
            </div>
          </template>

          <template #bottom>
            <div class="pa-4 bg-surface border-t">
              <div class="d-flex align-center justify-space-between">
                <div class="text-caption text-medium-emphasis">
                  Affichage de {{ filteredItems.length }} compte(s) -
                  {{ donorsCount }} donneur(s)
                </div>
                <div class="d-flex align-center ga-2">
                  <v-chip variant="outlined" size="small">
                    Dernière mise à jour: maintenant
                  </v-chip>
                </div>
              </div>
            </div>
          </template>
        </v-data-table>
      </v-card>
      
      <ViewItem :user="selectedUser" v-model="show" />
    </v-container>
  </v-app>
</template>

<script setup>
import DataTableSuspense from "@/pages-components/Patient/DataTableSuspense.vue";
import ViewItem from "@/pages-components/Patient/ViewItem.vue";
import api from "@/http";
import { ref, computed } from "vue";
// État réactif
const showFilters = ref(false);
const search = ref("");
const bloodTypeFilter = ref(null);
const isDonorFilter = ref(null);
const wilayaFilter = ref(null);
const selectedItems = ref([]);
const items = ref([]);
const show=ref(false)
const selectedUser = ref(null)

function handleShowFilters(value) {
  console.log(value, showFilters.value);
  showFilters.value = value;
}

// Configuration des colonnes adaptée aux vraies données
const headers = [
  {
    title: "Utilisateur",
    align: "start",
    sortable: true,
    key: "donor_info",
    width: "250px",
  },
  {
    title: "Groupe Sanguin",
    align: "center",
    key: "blood_type",
    width: "120px",
  },
  { title: "Est donneur", align: "center", key: "is_donor", width: "130px" },
  {
    title: "Date naissance",
    align: "center",
    key: "birth_date",
    width: "150px",
  },
  { title: "Wilaya", align: "center", key: "wilaya", width: "140px" },

  {title:'phone number',align:'center',key:'phone_number',width:'140px'},
  {
    title: "Actions",
    key: "actions",
    align: "center",
    sortable: false,
    width: "120px",
  },
];

// Fonctions utilitaires adaptées
function getBloodTypeColor(bloodType) {
  const typeColors = {
    "A+": "red-darken-1",
    "A-": "red-lighten-1",
    "B+": "blue-darken-1",
    "B-": "blue-lighten-1",
    "AB+": "purple-darken-1",
    "AB-": "purple-lighten-1",
    "O+": "green-darken-1",
    "O-": "green-lighten-1",
  };
  return typeColors[bloodType] || "grey";
}

function formatDate(dateString) {
  if (!dateString) return "N/A";
  const date = new Date(dateString);
  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function calculateAge(birthDate) {
  if (!birthDate) return "N/A";
  const birth = new Date(birthDate);
  const today = new Date();
  let age = today.getFullYear() - birth.getFullYear();
  const monthDiff = today.getMonth() - birth.getMonth();

  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
    age--;
  }

  return age;
}

// Actions adaptées
function viewItem(item) {
  selectedUser.value = item
  show.value = true
}

function editItem(item) {
  console.log("Éditer utilisateur:", item.first_name, item.last_name);
}

function scheduleDonation(item) {
  console.log("Programmer don pour:", item.first_name, item.last_name);
}

function viewDonationHistory(item) {
  console.log("Historique de donations de:", item.first_name, item.last_name);
}

function toggleDonorStatus(item) {
  console.log("Basculer statut donneur pour:", item.first_name, item.last_name);
  // Ici vous pourriez faire un appel API pour mettre à jour le statut
}

function deleteItem(item) {
  console.log("Supprimer utilisateur:", item.first_name, item.last_name);
}

function refreshData() {
  console.log("Actualiser les données");
  getData();
}

// Propriétés calculées adaptées
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesBloodType =
      !bloodTypeFilter.value || item.blood_type === bloodTypeFilter.value;
    const matchesDonor =
      isDonorFilter.value === null ||
      (isDonorFilter.value === "Oui"
        ? item.is_donor === true
        : item.is_donor === false);
    const matchesWilaya =
      !wilayaFilter.value ||
      item.wilaya?.toLowerCase().includes(wilayaFilter.value.toLowerCase());

    return matchesBloodType && matchesDonor && matchesWilaya;
  });
});

const donorsCount = computed(() => {
  return items.value.filter((item) => item.is_donor).length;
});

// Récupération des données adaptée
const getData = async () => {
  try {
    const response = await api.get("accounts/");
    items.value = response.data?.results ?? [];
  } catch (error) {
    console.error("Erreur API:", error);
    // Gestion d'erreur - vous pourriez afficher une notification
  }
};

// Initialisation
await getData();
</script>

<style lang="scss" scoped>


.modern-table {
  background: transparent;

  :deep(.v-data-table__thead th) {
    background: rgba(var(--v-theme-primary), 0.1);
    color: rgb(var(--v-theme-on-surface));
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 1px;
    border-bottom: 2px solid rgb(var(--v-theme-primary));
    height: 56px;
  }

  :deep(.v-data-table__tbody tr) {
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

    &:hover {
      background: rgba(var(--v-theme-primary), 0.08);
      transform: translateY(-1px);
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.12);
    }
  }

  :deep(.v-data-table__tbody td) {
    padding: 16px 12px;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  }
}

.stat-card {
  transition: all 0.3s ease;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.donor-avatar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.v-card {
  transition: all 0.3s ease;
}

.v-chip {
  font-weight: 600;
}

.v-btn {
  transition: all 0.2s ease;

  &:hover {
    transform: translateY(-1px);
  }
}

/* Animations personnalisées */
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

.v-container {
  animation: fadeInUp 0.6s ease-out;
}

/* Responsive design */
@media (max-width: 768px) {
  .modern-table :deep(.v-data-table__tbody td) {
    padding: 12px 8px;
  }

  .stat-card {
    margin-bottom: 1rem;
  }
}
</style>
