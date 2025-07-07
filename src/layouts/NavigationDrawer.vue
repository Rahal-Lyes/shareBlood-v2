<template>
    <AppNavigationDrawer >
    <template #navigation-drawer-content>
      <ul class="nav-items" >
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
  </AppNavigationDrawer>
</template>
<script setup>
import AppNavigationDrawer from "@/@layouts/AppNavigationDrawer.vue";
import VerticalNavSectionTitle from "@/@layouts/components/VerticalNavSectionTitle.vue";
import VerticalNavLink from "@/@layouts/components/VerticalNavLink.vue";
import VerticalNavGroup from "@/@layouts/components/VerticalNavGroup.vue";
import { computed } from "vue";
import { isAuthorizedRoute } from "@/utils/permissions.js";
import { navItems as rawNavItems } from "@/utils/drawerContents.js";

// rend les items réactifs si nécessaire
const navItems = computed(() => rawNavItems);
function hasGroupPermissions(group) {
  return group.children.some((child) => isAuthorizedRoute(child));
}

</script>
<style>
.nvg{
  background-color: blue;
  width: 100px;
  height: 100px;
}

</style>