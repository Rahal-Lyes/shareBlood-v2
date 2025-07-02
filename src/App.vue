<template>
  <VApp>
    <VMain class="pa-4">
      <VBtn>Je suis stylé par défaut</VBtn>
      <VTextField label="Nom" />
    </VMain>
  </VApp>
</template>


<style lang="scss" scoped>
.v-btn {
  color: $error; // ✅ ça doit maintenant fonctionner
}
</style>
