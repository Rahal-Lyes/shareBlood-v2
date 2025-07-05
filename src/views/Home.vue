<template>
  <div class="home">
    <SimpleThemeTest />
  </div>
</template>

<script setup>
import SimpleThemeTest from '@/components/SimpleThemeTest.vue'
</script>

<style lang="scss" scoped>
.home {
  min-height: 100vh;
  background-color: var(--v-theme-background);
}
</style> 