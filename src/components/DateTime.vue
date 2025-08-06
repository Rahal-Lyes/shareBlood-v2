<template>
  <div v-if="from">
    <v-tooltip>
      <template #activator="{ props }">
        <div
          v-bind="props"
          class="text-center"
          style="max-width: 175px; white-space: nowrap; cursor: pointer"
        >
          <div>
            <v-icon class="icons">mdi-calendar-range</v-icon>
            {{ from.date }}
          </div>
          <div class="text-disabled">
            <v-icon class="icons">mdi-clock</v-icon>
            {{ from.hour }}
          </div>
        </div>
      </template>
      <span>Il y a {{ from.timeAgo }}</span>
      
    </v-tooltip>
  </div>
</template>

<script setup>
defineProps({
  from: Object,
});
</script>

<style scoped>
.icons {
  font-size: 1.2em;
  vertical-align: middle;
  margin-right: 4px;
}
</style>
