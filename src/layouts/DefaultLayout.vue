<template>
  <VLayout class="enhanced-layout">
    <!-- Sidebar -->
    <AppNavigationDrawer v-model:drawer="drawer">
      <template #navigation-drawer-content>
        <DrawerContent />
      </template>
    </AppNavigationDrawer>

    
    <VAppBar app flat class="layout-navbar"
      :class="{ 'navbar-expanded': !drawer || mdAndDown }"
      elevation="1"
    >
    
      <VAppBarNavIcon v-if="mdAndDown" @click="drawer = !drawer" />
  
      <VBreadcrumbs v-if="breadcrumbs" :items="breadcrumbs" />
      
      <template #append>
        <slot name="navbar" />
        <VBtn icon="mdi-magnify" variant="text" />
        <VBtn icon="mdi-bell-outline" variant="text">
          <VBadge content="3" color="error" floating>
            <VIcon>mdi-bell-outline</VIcon>
          </VBadge>
        </VBtn>
        <VBtn icon="mdi-cog-outline" variant="text" />
      </template>
    </VAppBar>

    <AppMain>
      <slot />
    </AppMain>

  
  </VLayout>
</template>

<script setup>
import { ref, watch } from "vue";
import { useDisplay } from "vuetify";
import AppNavigationDrawer from "@/@layouts/AppNavigationDrawer.vue";
import DrawerContent from "@/@layouts/components/DrawerContent.vue";
import AppMain from "@/@layouts/components/AppMain.vue";
import AppFooter from "@/@layouts/components/AppFooter.vue";

const props = defineProps({
  breadcrumbs: Array,
  pageTitle: String,
});

const { mdAndDown } = useDisplay();
// const drawer = ref(!mdAndDown.value);
const drawer=ref(true)

watch(mdAndDown, (val) => {
  if (!val) drawer.value = true;
});
</script>
