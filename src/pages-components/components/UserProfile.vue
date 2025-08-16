<template>
  <VMenu offset-y>
    <template v-slot:activator="{ props }">
      <VBtn icon variant="text" class="navbar-profile-btn" v-bind="props">
        <VAvatar size="36" class="user-avatar">
          <VIcon v-if="!auth.user.avatar">mdi-account</VIcon>
          <img v-else :src="auth.user.avatar" alt="Avatar" />
        </VAvatar>
      </VBtn>
    </template>

    <VList class="user-menu">
      <!-- En-tête du menu -->
      <div class="menu-header">
        <VAvatar size="48" class="user-avatar-large">
          <img :src="auth.user.avatar" alt="Avatar" />
        </VAvatar>
        <div class="user-info">
          <h4>{{ auth.user.username }}</h4>
          <small>{{ auth.user.email }}</small>
        </div>
      </div>

      <VDivider />

      <!-- Liste des actions -->
      <VListItem
        v-for="item in userMenu"
        :key="item.name"
        @click="handleMenuClick(item)"
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
import { useRouter } from "vue-router";
import { useAuthStore } from "@/stores/AuthStore";

const router = useRouter();
const auth = useAuthStore();

const userMenu = ref([
  { name: "Settings", path: "/settings", icon: "mdi-cog" },
  { name: "Déconnexion", path: null, icon: "mdi-logout", action: "logout" },
]);

function handleMenuClick(item) {
  if (item.action === "logout") {
    auth.logout();
    router.push("/login"); // redirection après déconnexion
  } else if (item.path) {
    router.push(item.path);
  }
}
</script>

<style lang="scss" scoped>
/* Zone header dans le menu */
.menu-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background-color: rgba(var(--v-theme-primary), 0.05);
}

.user-info h4 {
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
}

.user-info small {
  color: rgba(var(--v-theme-on-surface), 0.6);
  font-size: 0.8rem;
}

/* Style icônes + hover */
.v-menu-user {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.5rem 0;

  .v-icon {
    font-size: 20px;
    opacity: 0.7;
  }

  &:hover {
    background-color: rgba(var(--v-theme-primary), 0.08);
    color: rgba(var(--v-theme-primary));
    cursor: pointer;

    .v-icon {
      opacity: 1;
      color: rgba(var(--v-theme-primary));
    }
  }
}

/* Bouton profil navbar */
.navbar-profile-btn {
  margin: 0.3rem;

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

.user-avatar-large {
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-primary)),
    rgba(var(--v-theme-secondary))
  );
  color: white;
  border: 2px solid rgba(var(--v-theme-primary), 0.2);
}
</style>
