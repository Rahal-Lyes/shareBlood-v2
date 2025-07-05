<template>
  <VAppBar
    app
    flat
    class="layout-navbar"
  
    elevation="1"
  >
   <div class="d-flex align-center ml-auto">
      <slot name="navbar" />
    </div>
  </VAppBar>
</template>

<script setup>
const props = defineProps({
  drawer: String,
  mdAndDown: Boolean,
});
</script>
<style lang="scss" scoped>

</style>



