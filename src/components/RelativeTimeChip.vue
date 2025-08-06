<template>
  <VChip 
    :color="color" 
    variant="elevated"
    class="time-chip"
    size="default"
  >
    <v-tooltip location="top" :text="absoluteTime">
      <template #activator="{ props }">
        <div v-bind="props" class="d-flex align-center ga-2">
          <v-icon v-if="icon" size="16">{{ icon }}</v-icon>
          <span class="font-weight-medium">{{ relativeTime }}</span>
        </div>
      </template>
    </v-tooltip>
  </VChip>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'

const props = defineProps({
  date: {
    type: [String, Date],
    required: true
  },
  color: {
    type: String,
    default: 'primary'
  },
  icon: {
    type: String,
    default: null
  }
})

const now = ref(new Date())
const dateObj = computed(() => new Date(props.date))

// Mise à jour dynamique du temps
let timer
onMounted(() => {
  timer = setInterval(() => {
    now.value = new Date()
  }, 60000) // Mise à jour chaque minute
})

onUnmounted(() => {
  clearInterval(timer)
})

// Formatage absolu
const absoluteTime = computed(() => 
  dateObj.value.toLocaleString('fr-FR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  })
)

// Formatage relatif
const relativeTime = computed(() => {
  const diff = dateObj.value - now.value
  const minutes = Math.floor(diff / 60000)
  const hours = Math.floor(minutes / 60)
  const days = Math.floor(hours / 24)

  if (days > 0) return `Dans ${days}j`
  if (hours > 0) return `Dans ${hours}h`
  if (minutes > 0) return `Dans ${minutes}min`
  if (minutes < 0) return `Maintenant`
  
  return dateObj.value.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit'
  })
})
</script>