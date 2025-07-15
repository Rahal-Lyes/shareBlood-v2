<template>
  <VLayout class="enhanced-layout">
    <!-- Sidebar -->
    <AppNavigationDrawer v-model:drawer="drawer">
      <template #navigation-drawer-content>
        <DrawerContent />
      </template>
    </AppNavigationDrawer>

    <AppBar v-model:drawer="drawer" :mdAndDown="mdAndDown" />

    <AppMain>
      <template #main>
      
        <router-view />
      
      </template>
    </AppMain>
     <GlobalSnackbar />
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
import GlobalSnackbar from "@/components/GlobalSnackbar.vue";
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

