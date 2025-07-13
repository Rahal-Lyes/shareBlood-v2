<template>
  <VMenu offset-y>
    <template v-slot:activator="{ props }">
      <VBtn icon variant="text" class="navbar-profile-btn" v-bind="props">
        <VAvatar size="32" class="user-avatar">
          <VIcon>mdi-account</VIcon>
        </VAvatar>
      </VBtn>
    </template>
    <VList class="user-menu">
      <VListItem
        v-for="item in userMenu"
        :key="item.name"
        @click="$router.push(item.path)"
      >
        <div class="v-menu-user">
          <VIcon>{{ item.icon }}</VIcon>
          <VListItemTitle>{{ item.name }}</VListItemTitle>
        </div>
      </VListItem>
    </VList>
  </VMenu>
</template>
<script setup>
import { ref } from "vue";
const userMenu = ref([
  { name: "Setting", path: "/setting", icon: "mdi-cog" },
  { name: "Profil", path: "/profil", icon: "mdi-account" },
  { name: "Logout", path: "/logout", icon: "mdi-logout" },
]);
</script>
<style lang="scss" scoped>
.v-menu-user {
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
  width: 100%;

  cursor: pointer;

  color: rgba(var(--v-theme-on-surface), 0.87);
  transition: background-color 0.3s ease, color 0.3s ease;

  .v-icon {
    font-size: 20px;
    opacity: 0.7;
    transition: opacity 0.3s ease;

    margin: 0 1rem;
  }
  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.08);
    color: rgba(var(--v-theme-primary));

    .v-icon {
      opacity: 1;
      color: rgba(var(--v-theme-primary));
    }
  }
}

.navbar-profile-btn {
  margin: 0.5rem;

  .user-avatar {
    background: linear-gradient(
      135deg,
      rgba(var(--v-theme-primary)),
      rgba(var(--v-theme-secondary))
    );
    color: white;
    border: 2px solid rgba(var(--v-theme-primary), 0.2);
    transition: all 0.3s ease;

    &:hover {
      transform: scale(1.1);
      box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
    }
  }
}

.user-menu {
  min-width: 200px;
  margin-top: 0.4rem;
  background-color: rgba(var(--v-theme-background)) !important;
  border: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(var(--v-theme-on-surface), 0.12);
  overflow: hidden;

  .v-list-item {
    transition: all 0.3s ease;

    &:hover {
      background: rgba(var(--v-theme-primary), 0.08);
      color: rgba(var(--v-theme-primary));
    }
  }
}
</style>
