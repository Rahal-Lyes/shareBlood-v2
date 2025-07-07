<template>
  <VLayout class="enhanced-layout">
    <!-- Sidebar -->
    <AppNavigationDrawer v-model:drawer="drawer">
      <template #navigation-drawer-content>
        <DrawerContent  />
      </template>
    </AppNavigationDrawer>

    <AppBar v-model:drawer="drawer" :mdAndDown="mdAndDown"/>
    
  

    <AppMain>
      <template #main>

        <VBtn class="custom-fieldset">click</VBtn>
        
        
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
<style>


.enhanced-layout {
  background-color: aqua;
  width: 100%;
  height: 100%;
}</style>