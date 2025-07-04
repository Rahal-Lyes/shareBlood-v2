<template>
  <ul class="nav-items">
    <template v-for="(item, index) in navItems" :key="index">
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
import { navItems as rawNavItems } from "@/utils/drawerContents.js";

const navItems = computed(() => rawNavItems);

function hasGroupPermissions(group) {
  return group.children.some((child) => isAuthorizedRoute(child));
}
</script>
