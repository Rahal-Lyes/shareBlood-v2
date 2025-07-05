<template>
  <VNavigationDrawer 
    app
    v-model="drawer"
    color="surface"
    width="260"
    elevation="0"
    class="custom-drawer"
    :permanent="!mdAndDown"
    :temporary="mdAndDown"

  >
    <div class="drawer-header">
      <div class="logo-section">
        <div class="logo-icon">
          <VIcon icon="mdi-hexagon-multiple" size="32" />
        </div>
        <div class="logo-text">
          <h3 class="app-title">Dashboard</h3>
          <span class="app-subtitle">Admin Panel</span>
        </div>
      </div>
      <VBtn 
        v-if="mdAndDown" 
        icon="mdi-close" 
        variant="text" 
        size="small"
        class="close-btn"
        @click="drawer = false"
      />
    </div>

    <div class="navigation-content">
      <slot name="navigation-drawer-content" />
    </div>
  </VNavigationDrawer>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useDisplay } from 'vuetify'

const { mdAndDown } = useDisplay()
const drawer = defineModel('drawer', { type: Boolean })

watch(mdAndDown, val => {
  if (!val) drawer.value = true
})


</script>
