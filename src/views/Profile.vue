<template>
  <v-container>
    <Suspense>
      <template #default>
        <AccountsData />
      </template>
      <template #fallback>
       <v-progress-linear
      color="green"
      indeterminate
    ></v-progress-linear>
      </template>
    </Suspense>
  </v-container>
</template>

<script setup>
import AccountsData from "@/components/AccountsData.vue";
</script>
