
<template>
  <VAppBar
    app
    flat
    class="layout-navbar"
    elevation="0"
    :height="navbarHeight"
  >
    <div class="app-container">
      <!-- Logo/Brand Section -->
      <div class="navbar-brand">
        <VBtn
          icon
          variant="text"
          class="navbar-menu-btn"
          v-if="mdAndDown"
           @click="drawer = !drawer"
        >
          <VIcon>mdi-menu</VIcon>
        </VBtn>
        
        <div class="brand-content">
          <VIcon class="brand-icon" size="32">mdi-leaf</VIcon>
          <span class="brand-text">YourApp</span>
        </div>
      </div>

      <!-- Center Content Slot -->
      <div class="navbar-center">
        <slot name="navbar-center" />
      </div>

      <!-- Right Actions -->
      <div class="navbar-actions">
        <!-- Search -->
        <VBtn
          icon
          variant="text"
          class="navbar-action-btn"
          @click="toggleSearch"
        >
          <VIcon>mdi-magnify</VIcon>
        </VBtn>

        <!-- Notifications -->
        <VBtn
          icon
          variant="text"
          class="navbar-action-btn"
          @click="showNotifications"
        >
          <VBadge
            v-if="notificationCount > 0"
            :content="notificationCount"
            color="error"
            dot
          >
            <VIcon>mdi-bell-outline</VIcon>
          </VBadge>
          <VIcon v-else>mdi-bell-outline</VIcon>
        </VBtn>

        <!-- Theme Toggle -->
        <VBtn
          icon
          variant="text"
          class="navbar-action-btn theme-toggle"
          @click="onToggleTheme"
        >
          <VIcon class="theme-icon">
            {{ isDark ? 'mdi-weather-sunny' : 'mdi-weather-night' }}
          </VIcon>
        </VBtn>

        <!-- User Profile -->
        <VMenu offset-y>
          <template v-slot:activator="{ props }">
            <VBtn
              icon
              variant="text"
              class="navbar-profile-btn"
              v-bind="props"
            >
              <VAvatar size="32" class="user-avatar">
                <VIcon>mdi-account</VIcon>
              </VAvatar>
            </VBtn>
          </template>
          <VList class="user-menu">
            <VListItem>
              <VListItemTitle>Profile</VListItemTitle>
            </VListItem>
            <VListItem>
              <VListItemTitle>Settings</VListItemTitle>
            </VListItem>
            <VDivider />
            <VListItem>
              <VListItemTitle>Logout</VListItemTitle>
            </VListItem>
          </VList>
        </VMenu>

        <!-- Custom Navbar Slot -->
        <slot name="navbar" />
      </div>
    </div>

    <!-- Search Overlay -->
    <VExpandTransition>
      <div v-if="searchVisible" class="search-overlay">
        <VTextField
          v-model="searchQuery"
          placeholder="Search..."
          prepend-inner-icon="mdi-magnify"
          variant="solo"
          flat
          hide-details
          class="search-input"
          @keyup.enter="performSearch"
          @keyup.escape="toggleSearch"
        />
        <VBtn
          icon
          variant="text"
          @click="toggleSearch"
          class="search-close"
        >
          <VIcon>mdi-close</VIcon>
        </VBtn>
      </div>
    </VExpandTransition>
  </VAppBar>
</template>

<script setup>
import { ref, computed ,watch} from 'vue'
import { useTheme } from 'vuetify'
import { useDisplay } from 'vuetify'
import { usePreferencesStore } from '@/stores/preferenceStore'
// Props

const props = defineProps({
  drawer: String,
  mdAndDown: Boolean,
  navbarHeight: {
    type: Number,
    default: 64
  }
})

// Emits
const drawer = defineModel('drawer', { type: Boolean })

// Composables
const theme = useTheme()
const preferences = usePreferencesStore()
// Reactive data
const searchVisible = ref(false)
const searchQuery = ref('')
const notificationCount = ref(3)

// Computed
const isDark = computed(() => preferences.theme === 'dark')

// Methods
const toggleSearch = () => {
  searchVisible.value = !searchVisible.value
  if (!searchVisible.value) {
    searchQuery.value = ''
  }
}

const performSearch = () => {
  if (searchQuery.value.trim()) {
    emit('search', searchQuery.value)
    toggleSearch()
  }
}

const showNotifications = () => {
  // Handle notifications
  console.log('Show notifications')
}

function onToggleTheme() {
  preferences.toggleTheme()
  theme.global.name.value = preferences.theme
}
</script>

<style lang="scss" scoped>
@use "@/styles/variables.scss" as variables;

.layout-navbar {
  background: rgba(var(--v-theme-surface)) !important;
  border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
      135deg,
      rgba(var(--v-theme-primary), 0.05) 0%,
      rgba(var(--v-theme-secondary), 0.02) 100%
    );
    pointer-events: none;
  }
}

.app-container {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 1.5rem;
  position: relative;
  z-index: 1;
}

.navbar-brand {
  display: flex;
  align-items: center;
  gap: 1rem;
  
  .navbar-menu-btn {
    color: rgba(var(--v-theme-on-surface), 0.8);
    transition: all 0.3s ease;
    
    &:hover {
      color: rgba(var(--v-theme-primary));
      background: rgba(var(--v-theme-primary), 0.08);
      transform: scale(1.05);
    }
  }
  
  .brand-content {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    
    .brand-icon {
      color: rgba(var(--v-theme-primary));
      filter: drop-shadow(0 2px 4px rgba(var(--v-theme-primary), 0.3));
      transition: all 0.3s ease;
      
      &:hover {
        transform: rotate(10deg) scale(1.1);
      }
    }
    
    .brand-text {
      font-size: 1.25rem;
      font-weight: 600;
      color: rgba(var(--v-theme-on-surface));
      background: linear-gradient(
        135deg,
        rgba(var(--v-theme-primary)),
        rgba(var(--v-theme-secondary))
      );
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      letter-spacing: -0.02em;
    }
  }
}

.navbar-center {
  flex: 1;
  display: flex;
  justify-content: center;
  padding: 0 2rem;
}

.navbar-actions {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  .navbar-action-btn {
    color: rgba(var(--v-theme-on-surface), 0.7);
    transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
    
    &:hover {
      color: rgba(var(--v-theme-primary));
      background: rgba(var(--v-theme-primary), 0.08);
      transform: translateY(-2px);
    }
    
    &.theme-toggle {
      .theme-icon {
        transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      &:hover .theme-icon {
        transform: rotate(180deg);
      }
    }
  }
  
  .navbar-profile-btn {
    margin-left: 0.5rem;
    
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
}

.search-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(var(--v-theme-surface), 0.95);
  backdrop-filter: blur(10px);
  display: flex;
  align-items: center;
  padding: 0 1.5rem;
  gap: 1rem;
  z-index: 10;
  
  .search-input {
    flex: 1;
    
    :deep(.v-field) {
      background: rgba(var(--v-theme-surface));
      border: 1px solid rgba(var(--v-theme-on-surface), 0.12);
      border-radius: 12px;
      transition: all 0.3s ease;
      
      &:hover {
        border-color: rgba(var(--v-theme-primary), 0.5);
      }
      
      &.v-field--focused {
        border-color: rgba(var(--v-theme-primary));
        box-shadow: 0 0 0 3px rgba(var(--v-theme-primary), 0.1);
      }
    }
  }
  
  .search-close {
    color: rgba(var(--v-theme-on-surface), 0.7);
    
    &:hover {
      color: rgba(var(--v-theme-error));
      background: rgba(var(--v-theme-error), 0.08);
    }
  }
}

.user-menu {
  min-width: 200px;
  background: rgba(var(--v-theme-surface));
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

// Responsive design
@media (max-width: 768px) {
  .app-container {
    padding: 0 1rem;
  }
  
  .navbar-center {
    padding: 0 1rem;
  }
  
  .brand-text {
    display: none;
  }
  
  .navbar-actions {
    gap: 0.25rem;
  }
}

// Dark theme enhancements
.v-theme--dark {
  .layout-navbar {
    background: rgba(var(--v-theme-surface), 0.9) !important;
    border-bottom-color: rgba(var(--v-theme-on-surface), 0.1);
    
    &::before {
      background: linear-gradient(
        135deg,
        rgba(var(--v-theme-primary), 0.08) 0%,
        rgba(var(--v-theme-secondary), 0.04) 100%
      );
    }
  }
  
  .user-menu {
    background: rgba(var(--v-theme-surface), 0.95);
    border-color: rgba(var(--v-theme-on-surface), 0.1);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.3);
  }
  
  .search-overlay {
    background: rgba(var(--v-theme-surface), 0.98);
  }
}

// Light theme enhancements
.v-theme--light {
  .layout-navbar {
    &::before {
      background: linear-gradient(
        135deg,
        rgba(var(--v-theme-primary), 0.03) 0%,
        rgba(var(--v-theme-secondary), 0.01) 100%
      );
    }
  }
}
</style>