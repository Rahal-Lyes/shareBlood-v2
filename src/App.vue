<template>
  <DefaultLayout>    
  </DefaultLayout>
</template>

<script setup>
import { onMounted,watchEffect,ref} from "vue";
import { usePreferencesStore } from "@/stores/PreferenceStore";
import { useTheme } from "vuetify";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
const infoColor = ref(null);
const theme = useTheme();
onMounted(() => {
  const preferences = usePreferencesStore();

  theme.global.name.value = preferences.theme;
  
});
watchEffect(() => {
 infoColor.value = theme.current.value.colors.info;
  
});

const snackbar=ref(false)

</script>
<style>

</style>
