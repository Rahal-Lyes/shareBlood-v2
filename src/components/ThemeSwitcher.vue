<template>
  <v-btn @click="onToggleTheme" icon>
    <v-icon>{{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
       <VTooltip
      activator="parent"
      open-delay="1000"
      scroll-strategy="close"
    >
      <span class="text-capitalize">{{ isDark ? "light":"dark" }}</span>
  </VTooltip>
  </v-btn>
</template>

<script setup>
import { useTheme } from 'vuetify'
import { usePreferencesStore } from '@/stores/preferenceStore'
import { computed } from 'vue'

const theme = useTheme()
const preferences = usePreferencesStore()

const isDark = computed(() => preferences.theme === 'dark')

function onToggleTheme() {
  preferences.toggleTheme()
  theme.global.name.value = preferences.theme
}
</script>
