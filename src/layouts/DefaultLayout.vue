<template>
  <VLayout class="enhanced-layout">
    <!-- Sidebar -->
    <AppNavigationDrawer v-model:drawer="drawer">
      <template #navigation-drawer-content>
        <DrawerContent />
      </template>
    </AppNavigationDrawer>

    <AppBar :drawer="drawer" :mdAndDown="mdAndDown">
      <template #navbar>
        <ThemeSwitcher />
        <VBtn icon="mdi-bell-outline" variant="text" />
        <VBtn icon="mdi-account" variant="text" />
      </template>
    </AppBar>

    <AppMain>
      <template #main>
        <VBtn class="btn-1">click</VBtn>
        <VBtn class="custom-fieldset">click</VBtn>
          <VBtn>click mmee</VBtn>
        
      </template>
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
import AppBar from "@/@layouts/components/AppBar.vue";
import ThemeSwitcher  from '@/components/ThemeSwitcher.vue'
const props = defineProps({
  breadcrumbs: Array,
  pageTitle: String,
});

const { mdAndDown } = useDisplay();
// const drawer = ref(!mdAndDown.value);
const drawer = ref(true);

watch(mdAndDown, (val) => {
  if (!val) drawer.value = true;
});
</script>
<style lang="scss" scoped>

.btn-1{
background-color:var(--v-theme-primary);
}
</style>