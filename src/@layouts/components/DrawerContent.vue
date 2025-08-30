<template>
  <ul class="nav-items">
    <template v-for="(item) in navItems" :key="item.title">
      <VerticalNavSectionTitle
        v-if="item.type === 'section'"
        :title="item.title"
        :image="item.image"
      />

      <VerticalNavGroup
        v-else-if="item.type === 'group' && hasGroupPermissions(item)"
        :item="item"
      />

      <VerticalNavLink
        v-else-if="item.type === 'link' && isAuthorizedRoute(item)"
        :item="item"
      />
    </template>
  </ul>
</template>

<script setup>
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLink from "@/@layouts/components/VerticalNavLink.vue";
import VerticalNavGroup from "@/@layouts/components/VerticalNavGroup.vue";
import { computed } from "vue";
import { isAuthorizedRoute } from "@/utils/permissions.js";
import { getNavItems } from "@/utils/drawerContents.js";
import { useAuthStore } from "@/stores/AuthStore";
import { storeToRefs } from "pinia";
const auth = useAuthStore();
const { user } = storeToRefs(auth);
const navItems = computed(() => getNavItems(user.value));

function hasGroupPermissions(group) {
  return group.children.some((child) => isAuthorizedRoute(child));
}
</script>


<style scoped>
.nav-items {
  padding: 0;
  margin: 0;
  list-style: none;
  background-color: rgba(var(--v-theme-background), 1);
}
</style>
