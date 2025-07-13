<template>
  <VSnackbar
    v-model="show"
    :color="color"
    :timeout="timer"
    location="bottom end"
  >
    <VIcon start :icon="icon" />
  {{ message }}
  </VSnackbar>
</template>

<script setup>
import { useToastStore } from "@/stores/ToastStore"; // Assure-toi que le chemin est correct
import { storeToRefs } from "pinia";
import { computed } from "vue";

const toast_store = useToastStore();
const { message, color, timer, icon, show } = storeToRefs(toast_store);


</script>
