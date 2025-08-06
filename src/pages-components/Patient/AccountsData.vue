<template>
  <v-app>
    <v-container fluid class="pa-6">
      <!-- En-tête avec actions -->
      <DataTableSuspense
        verboseName_01="Construction Site"
        verboseName_02="list des projets"
        verboseName_03="Add new Projets"
        :add_data="() => console.log('clicked')"
        @showFilters="handleShowFilters"
      >
      </DataTableSuspense>


      <v-card class="elevation-4 rounded-xl overflow-hidden pa-3">
        <v-data-table
          :headers="headers"
          :items="filteredItems"
          :search="search"
          item-key="name"
          density="comfortable"
          hover
          class="modern-table"
          :items-per-page="10"
          show-select
          v-model="selectedItems"
        >
    <template #headers="{ columns, toggleSort, sortBy }">
      {{ console.log(toggleSort) }}
  <tr>
    <th v-for="column in columns" :key="column.key">
      <v-btn
        
        @click="toggleSort(column)"
        :color="sortBy.some(s => s.key === column.key) ? 'primary' : undefined"
        variant="text"
      >
        {{ column.title }}
        <v-icon end>mdi-chevron-down</v-icon>
      </v-btn>
    </th>
  </tr>
</template>

          <template #top>
            <div class="pa-4 bg-surface">
              <div class="d-flex align-center justify-space-between">
                <div class="d-flex align-center ga-3">
                  <v-chip
                    v-if="selectedItems.length > 0"
                    color="primary"
                    variant="flat"
                    prepend-icon="mdi-check"
                  >
                    {{ selectedItems.length }} sélectionnée(s)
                  </v-chip>
                </div>
                <div class="d-flex ga-2">
                  <v-btn
                    v-if="selectedItems.length > 0"
                    variant="outlined"
                    size="small"
                    @click="deleteItem(item)"
                    prepend-icon="mdi-delete"
                    color="error"
                  >
                    Supprimer
                  </v-btn>
                  <v-btn
                    variant="text"
                    size="small"
                    icon="mdi-refresh"
                    @click="refreshData"
                  />
                </div>
              </div>
            </div>
          </template>

          <!-- Nom avec avatar -->
          <template #item.name="{ item }">
            <div class="d-flex align-center ga-3 py-2">
              <v-avatar
                :color="getPlantColor(item.name)"
                size="40"
                class="plant-avatar"
              >
                <v-icon color="white">{{ getPlantIcon(item.name) }}</v-icon>
              </v-avatar>
              <div>
                <div class="font-weight-medium">{{ item.name }}</div>
                <div class="text-caption text-medium-emphasis">
                  Plante d'intérieur
                </div>
              </div>
            </div>
          </template>

          <!-- Niveau de lumière avec indicateur visuel -->
          <template #item.light="{ item }">
            <div class="d-flex align-center ga-2">
              <v-progress-circular
                :model-value="getLightLevel(item.light)"
                :color="getLightColor(item.light)"
                size="24"
                width="3"
              />
              <div>
                <div class="font-weight-medium">{{ item.light }}</div>
                <div class="text-caption text-medium-emphasis">
                  {{ getLightDescription(item.light) }}
                </div>
              </div>
            </div>
          </template>

          <!-- Hauteur avec barre de progression -->
          <template #item.height="{ item }">
            <div class="height-cell">
              <div class="font-weight-medium mb-1">{{ item.height }}</div>
              <v-progress-linear
                :model-value="getHeightPercentage(item.height)"
                color="success"
                height="4"
                rounded
              />
            </div>
          </template>

          <!-- Pet Friendly avec badge -->
          <template #item.petFriendly="{ item }">
            <v-chip
              :color="item.petFriendly === 'Yes' ? 'success' : 'error'"
              variant="flat"
              size="small"
              :prepend-icon="
                item.petFriendly === 'Yes' ? 'mdi-check' : 'mdi-close'
              "
              class="font-weight-bold"
            >
              {{ item.petFriendly === "Yes" ? "Oui" : "Non" }}
            </v-chip>
          </template>

          <!-- Prix avec mise en forme -->
          <template #item.price="{ item }">
            <div class="text-right">
              <div class="text-h6 font-weight-bold text-success">
                ${{ item.price }}
              </div>
              <div class="text-caption text-medium-emphasis">USD</div>
            </div>
          </template>

          <!-- Actions avec menu -->
          <template #item.actions="{ item }">
            <div class="d-flex ga-1">
              <v-btn
                icon="mdi-eye"
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
                  <v-list-item @click="duplicateItem(item)">
                    <template #prepend>
                      <v-icon>mdi-content-copy</v-icon>
                    </template>
                    <v-list-item-title>Dupliquer</v-list-item-title>
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

          <!-- Date avec tooltip -->
          <template #item.createdAt="{ item }">
            <v-tooltip>
              <template #activator="{ props }">
                <div v-bind="props" class="text-center">
                  <v-chip
                    variant="outlined"
                    size="small"
                    color="info"
                    class="mb-1"
                  >
                    {{ item.createdAt.timeAgo }} ago
                  </v-chip>
                  <div class="text-caption text-medium-emphasis">
                    {{ item.createdAt.date }}
                  </div>
                </div>
              </template>
              <span
                >Créée le {{ item.createdAt.date }} à
                {{ item.createdAt.hour }}</span
              >
            </v-tooltip>
          </template>

          <!-- Footer personnalisé -->
          <template #bottom>
            <div class="pa-4 bg-surface border-t">
              <div class="d-flex align-center justify-space-between">
                <div class="text-caption text-medium-emphasis">
                  Affichage de {{ filteredItems.length }} plante(s)
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
    </v-container>
  </v-app>
</template>

<script setup>
import { ref, computed } from "vue";
import DataTableSuspense from "@/pages-components/Patient/DataTableSuspense.vue";
// État réactif
const showFilters = ref(false);
const search = ref("");
const lightFilter = ref(null);
const petFriendlyFilter = ref(null);
const priceRange = ref([0, 100]);
const selectedItems = ref([]);
function handleShowFilters(value) {
  console.log(value, showFilters.value);
  showFilters.value = value;
}
// Configuration des colonnes
const headers = [
  {
    title: "Plante",
    align: "start",
    sortable: true,
    key: "name",
    width: "200px",
  },
  { title: "Lumière", align: "center", key: "light", width: "180px" },
  { title: "Hauteur", align: "center", key: "height", width: "120px" },
  {
    title: "Pet-Friendly",
    align: "center",
    key: "petFriendly",
    width: "130px",
  },
  { title: "Prix", align: "center", key: "price", width: "100px" },
  {
    title: "Actions",
    key: "actions",
    align: "center",
    sortable: false,
    width: "120px",
  },
  {
    title: "Créée",
    key: "createdAt",
    align: "center",
    sortable: true,
    width: "140px",
  },
];

const lightLevels = ["Low", "Medium", "Bright, indirect", "Low to medium"];

// Fonctions utilitaires
function getRandomPastDate() {
  const now = new Date();
  const pastMilliseconds = Math.floor(Math.random() * 6 * 60 * 60 * 1000);
  return new Date(now.getTime() - pastMilliseconds);
}

function formatDateInfo(date) {
  const now = new Date();
  const diffMs = now - date;
  const minutes = Math.floor(diffMs / 60000);
  const hours = Math.floor(minutes / 60);
  const remainingMinutes = minutes % 60;
  const timeAgo =
    hours > 0 ? `${hours}h ${remainingMinutes}min` : `${minutes}min`;

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const year = date.getFullYear();
  const dateStr = `${day}/${month}/${year}`;

  const hour = String(date.getHours()).padStart(2, "0");
  const min = String(date.getMinutes()).padStart(2, "0");
  const hourStr = `${hour}:${min}`;

  return { date: dateStr, hour: hourStr, timeAgo, timestamp: date.getTime() };
}

function getPlantColor(name) {
  const colors = [
    "success",
    "primary",
    "secondary",
    "info",
    "warning",
    "error",
  ];
  return colors[name.length % colors.length];
}

function getPlantIcon(name) {
  const icons = {
    Fern: "mdi-leaf",
    "Snake Plant": "mdi-cactus",
    Monstera: "mdi-sprout",
    Pothos: "mdi-vine",
    "ZZ Plant": "mdi-tree",
    "Spider Plant": "mdi-spider-web",
    "Air Plant": "mdi-air-filter",
    Peperomia: "mdi-flower",
  };
  return icons[name] || "mdi-leaf";
}

function getLightColor(lightLevel) {
  const level = lightLevel.toLowerCase();
  if (level.includes("low")) return "success";
  if (level.includes("medium")) return "warning";
  if (level.includes("bright")) return "error";
  return "info";
}

function getLightLevel(lightLevel) {
  const level = lightLevel.toLowerCase();
  if (level.includes("low")) return 30;
  if (level.includes("medium")) return 60;
  if (level.includes("bright")) return 90;
  return 45;
}

function getLightDescription(lightLevel) {
  const level = lightLevel.toLowerCase();
  if (level.includes("low")) return "Peu de lumière";
  if (level.includes("medium")) return "Lumière modérée";
  if (level.includes("bright")) return "Lumière vive";
  return "Variable";
}

function getHeightPercentage(height) {
  const num = parseInt(height);
  return Math.min((num / 100) * 100, 100);
}

// Actions
function viewItem(item) {
  console.log("Voir:", item.name);
}

function editItem(item) {
  console.log("Éditer:", item.name);
}

function duplicateItem(item) {
  console.log("Dupliquer:", item.name);
}

function deleteItem(item) {
  console.log("Supprimer:", item.name);
}

function refreshData() {
  console.log("Actualiser les données");
}

// Données
const items = ref([
  {
    name: "Fern",
    light: "Low",
    height: "20cm",
    petFriendly: "Yes",
    price: 20,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "Snake Plant",
    light: "Low",
    height: "50cm",
    petFriendly: "No",
    price: 35,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "Monstera",
    light: "Medium",
    height: "60cm",
    petFriendly: "No",
    price: 50,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "Pothos",
    light: "Low to medium",
    height: "40cm",
    petFriendly: "Yes",
    price: 25,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "ZZ Plant",
    light: "Low to medium",
    height: "90cm",
    petFriendly: "Yes",
    price: 30,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "Spider Plant",
    light: "Bright, indirect",
    height: "30cm",
    petFriendly: "Yes",
    price: 15,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "Air Plant",
    light: "Bright, indirect",
    height: "15cm",
    petFriendly: "Yes",
    price: 10,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
  {
    name: "Peperomia",
    light: "Bright, indirect",
    height: "25cm",
    petFriendly: "Yes",
    price: 20,
    createdAt: formatDateInfo(getRandomPastDate()),
  },
]);

// Propriétés calculées
const filteredItems = computed(() => {
  return items.value.filter((item) => {
    const matchesLight = !lightFilter.value || item.light === lightFilter.value;
    const matchesPetFriendly =
      !petFriendlyFilter.value ||
      (petFriendlyFilter.value === "Oui"
        ? item.petFriendly === "Yes"
        : item.petFriendly === "No");
    const matchesPrice =
      item.price >= priceRange.value[0] && item.price <= priceRange.value[1];

    return matchesLight && matchesPetFriendly && matchesPrice;
  });
});

const selectedCount = computed(() => selectedItems.value.length);

const averagePrice = computed(() => {
  const sum = items.value.reduce((acc, item) => acc + item.price, 0);
  return Math.round(sum / items.value.length);
});

const petFriendlyCount = computed(() => {
  return items.value.filter((item) => item.petFriendly === "Yes").length;
});
</script>

<style lang="scss" scoped>
.bg {
  background-color: rgb(227, 159, 159) !important;
}
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

.plant-avatar {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  transition: transform 0.2s ease;

  &:hover {
    transform: scale(1.1);
  }
}

.height-cell {
  min-width: 80px;
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
