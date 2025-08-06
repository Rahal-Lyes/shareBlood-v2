<template>
    <VChip small 
color="primary"
  class="text-overline font-weight-medium">
    <slot />


  <v-tooltip location="top">
    <template #activator="{ props }">
      <span v-bind="props" class="text-blue-600 font-medium cursor-help">
        {{ timeAgo }}
      </span>
    </template>
    <span>Créé le {{ fullDate }}</span>
  </v-tooltip>
    </VChip>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  from: {
    type: Date,
    required: true
  }
})

const timeAgo = computed(() => {
  const now = new Date()
  const diffMs = now - new Date(props.from)

  const minutes = Math.floor(diffMs / 60000)
  const hours = Math.floor(minutes / 60)
  const remainingMinutes = minutes % 60

  if (hours > 0) {
    return `il y a ${hours}h ${remainingMinutes}min`
  } else {
    return `il y a ${minutes}min`
  }
})

const fullDate = computed(() =>
  new Date(props.from).toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long'
  })
)
</script>