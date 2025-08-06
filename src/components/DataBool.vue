<!-- components/DataBool.vue -->
<template>
  <div>
    <v-icon
      size="large"
      :color="modelValue ? 'success' : 'error'"
      :icon="modelValue ? 'mdi-check-circle' : 'mdi-close-circle'"
    />
  </div>
</template>

<script setup>
const modelValue = defineModel()
</script>
