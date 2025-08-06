<template>
  <v-container>
    <v-row>
      <v-col>
        <v-col cols="12">
          <div class="d-flex align-center justify-space-between">
            <div>
              <h2 class="text-h4 font-weight-bold mb-1">
                {{ props.verboseName_01 }}
              </h2>
              <p class="text-subtitle-1 text-medium-emphasis">
                {{ props.verboseName_02 }}
              </p>
            </div>
            <div class="d-flex ga-3">
              <v-btn
                color="primary"
                variant="elevated"
                prepend-icon="mdi-plus"
                class="rounded-lg"
                @click="props.add_data"
              >
                {{ props.verboseName_03 }}
              </v-btn>
              <v-btn
                variant="outlined"
                icon="mdi-filter-variant"
                class="rounded-lg bg-red-accent-4"
                @click="showFiltersAction"
              />
              <v-btn
                variant="outlined"
                icon="mdi-download"
                class="rounded-lg"
              />
            </div>
          </div>
        </v-col>
      </v-col>
    </v-row>
    <v-row>
      <v-col col="12">
        <v-expand-transition>
          <v-card v-show="showFilters" class="mb-6 elevation-2 rounded-xl">
            <v-card-text>
              <v-row >
              <v-col cols="12" md="6">
                  <v-text-field
                    v-model="search"
                    label="Rechercher"
                    prepend-inner-icon="mdi-magnify"
                    variant="outlined"
                    density="compact"
                    hide-details
                    clearable
                  />
                </v-col>
            
                <slot name="filter"></slot>
                
                
              </v-row>
            </v-card-text>
          </v-card> </v-expand-transition
      ></v-col>
    </v-row>
  </v-container>
</template>

<script setup>
import { ref, defineProps, defineEmits } from "vue";
const showFilters = ref(false);

const emit = defineEmits(["showFilters"]);
const props = defineProps({
  verboseName_01: {
    type: String,
    required: true,
  },
  verboseName_02: {
    type: String,
  },
  verboseName_03: {
    type: String,
  },
  add_data: {
    type: Function,
    default: undefined,
  },
});

function showFiltersAction() {
  showFilters.value = !showFilters.value;
  emit("showFilters", showFilters.value);
}
</script>
