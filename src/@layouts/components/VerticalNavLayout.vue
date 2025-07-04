<template>
  <VLayout class="enhanced-layout">
    <VNavigationDrawer 
      app
      v-model="drawer"
      color="surface"
      width="260"
      elevation="0"
      class="custom-drawer"
      :permanent="!mdAndDown"
      :temporary="mdAndDown"
    >
      <div class="drawer-header">
        <div class="logo-section">
          <div class="logo-icon">
            <VIcon icon="mdi-hexagon-multiple" size="32" />
          </div>
          <div class="logo-text">
            <h3 class="app-title">Dashboard</h3>
            <span class="app-subtitle">Admin Panel</span>
          </div>
        </div>
        <VBtn 
          v-if="mdAndDown" 
          icon="mdi-close" 
          variant="text" 
          size="small"
          class="close-btn"
          @click="drawer = false"
        />
      </div>
      
    
      
      <div class="navigation-content">
        <slot name="navigation-drawer-content" />
      </div>
      
    
    </VNavigationDrawer>

    <VAppBar 
      app 
      flat 
      class="layout-navbar"
      :class="{ 'navbar-expanded': !drawer || mdAndDown }"
      elevation="1"
    >
      <VAppBarNavIcon 
        v-if="mdAndDown" 
        @click="drawer = !drawer"
        class="nav-toggle" 
      />
      
      <div class="navbar-content">
        <div class="navbar-left">
          <VBreadcrumbs 
            v-if="breadcrumbs" 
            :items="breadcrumbs" 
            class="navbar-breadcrumbs"
          />
        </div>
        
        <div class="navbar-right">
          <slot name="navbar" />
          
          <!-- Actions par défaut -->
          <VBtn icon="mdi-magnify" variant="text" class="navbar-action" />
          <VBtn icon="mdi-bell-outline" variant="text" class="navbar-action">
            <VBadge content="3" color="error" floating>
              <VIcon>mdi-bell-outline</VIcon>
            </VBadge>
          </VBtn>
          <VBtn icon="mdi-cog-outline" variant="text" class="navbar-action" />
        </div>
      </div>
    </VAppBar>

    <VMain class="main-content">
      <div class="content-wrapper">
        <div class="page-container">
          <slot />
        </div>
      </div>
    </VMain>

    <VFooter app class="layout-footer">
      <div class="footer-content">
        <div class="footer-left">
          <span class="copyright">© 2025 Dashboard. All rights reserved.</span>
        </div>
        <div class="footer-right">
          <slot name="footer">
            <VBtn variant="text" size="small">Privacy</VBtn>
            <VBtn variant="text" size="small">Terms</VBtn>
            <VBtn variant="text" size="small">Support</VBtn>
          </slot>
        </div>
      </div>
    </VFooter>
  </VLayout>
</template>

<script setup>
import { ref, computed,watch}from 'vue';
import { useDisplay } from 'vuetify';

const props = defineProps({
  pageTitle: {
    type: String,
    default: ''
  },
  breadcrumbs: {
    type: Array,
    default: () => []
  }
});

const { mdAndDown } = useDisplay();
const drawer = ref(!mdAndDown.value);

// Réactivité du drawer selon la taille d'écran
watch(mdAndDown, (newValue) => {
  if (!newValue) {
    drawer.value = true;
  }
});
</script>

<style lang="scss" scoped>
.enhanced-layout {
  min-height: 100vh;
  background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
}

// Navigation Drawer Styles
.custom-drawer {
background-color: rgba(0, 0, 0, 0.8) !important;
  
  border-right: 1px solid rgba(209, 4, 4) !important;
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.3) !important;
  
  .drawer-header {
    padding: 20px 16px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(255, 255, 255, 0.05);
    backdrop-filter: blur(10px);
    
    .logo-section {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
      
      .logo-icon {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 48px;
        height: 48px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        border-radius: 12px;
        color: white;
        box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
      }
      
      .logo-text {
        .app-title {
          color: #100d0d;
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0;
          line-height: 1.2;
        }
        
        .app-subtitle {
          color: #000001;
          font-size: 0.8rem;
          font-weight: 400;
        }
      }
    }
    
    .close-btn {
      color: #a0aec0;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
        color: #ffffff;
      }
    }
  }
  
  .header-divider {
    border-color: rgba(255, 255, 255, 0.1);
    margin: 0;
  }
  
  .navigation-content {
    flex: 1;
    padding: 16px 0;
    overflow-y: auto;
    
    &::-webkit-scrollbar {
      width: 4px;
    }
    
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    
    &::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.2);
      border-radius: 2px;
    }
  }
  
  .drawer-footer {
    padding: 16px;
    background: rgba(0, 0, 0, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    
    .user-profile {
      display: flex;
      align-items: center;
      gap: 12px;
      padding: 8px;
      border-radius: 8px;
      transition: all 0.2s ease;
      
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
      
      .user-avatar {
        border: 2px solid rgba(255, 255, 255, 0.2);
      }
      
      .user-info {
        flex: 1;
        display: flex;
        flex-direction: column;
        
        .user-name {
          color: #ffffff;
          font-size: 0.9rem;
          font-weight: 600;
          line-height: 1.2;
        }
        
        .user-role {
          color: #a0aec0;
          font-size: 0.75rem;
        }
      }
    }
  }
}

// App Bar Styles
.layout-navbar {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border-bottom: 1px solid rgba(0, 0, 0, 0.05) !important;
  transition: all 0.3s ease !important;
  
  &.navbar-expanded {
    box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08) !important;
  }
  
  .nav-toggle {
    margin-right: 16px;
    color: #4a5568;
    
    &:hover {
      background: rgba(74, 85, 104, 0.1);
    }
  }
  
  .navbar-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    height: 100%;
    .navbar-left {
      display: flex;
      align-items: center;
      gap: 16px;
      
      .page-title {
        color: #2d3748;
        font-size: 1.5rem;
        font-weight: 700;
        margin: 0;
      }
      
      .navbar-breadcrumbs {
        padding: 0;
        
        :deep(.v-breadcrumbs-item) {
          color: #718096;
          font-size: 0.85rem;
        }
        
        :deep(.v-breadcrumbs-divider) {
          color: #cbd5e0;
        }
      }
    }
    
    .navbar-right {
      display: flex;
      align-items: center;
      gap: 8px;
      
      .navbar-action {
        color: #4a5568;
        
        &:hover {
          background: rgba(74, 85, 104, 0.1);
          color: #2d3748;
        }
      }
    }
  }
}

// Main Content Styles
.main-content {
  background: transparent !important;
  
  .content-wrapper {
    min-height: calc(100vh - 128px);
    padding: 24px;
    
    .page-container {
      max-width: 1400px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.8);
      backdrop-filter: blur(20px);
      border-radius: 16px;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
      border: 1px solid rgba(255, 255, 255, 0.2);
      overflow: hidden;
    }
  }
}

// Footer Styles
.layout-footer {
  background: rgba(255, 255, 255, 0.95) !important;
  backdrop-filter: blur(20px) !important;
  border-top: 1px solid rgba(0, 0, 0, 0.05) !important;
  
  .footer-content {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0 8px;
    
    .footer-left {
      .copyright {
        color: #718096;
        font-size: 0.85rem;
      }
    }
    
    .footer-right {
      display: flex;
      gap: 8px;
      
      :deep(.v-btn) {
        color: #718096;
        font-size: 0.8rem;
        
        &:hover {
          color: #4a5568;
        }
      }
    }
  }
}

// Dark Mode Support
@media (prefers-color-scheme: dark) {
  .enhanced-layout {
    background: linear-gradient(135deg, #0f172a 0%, #1e293b 100%);
  }
  
  .layout-navbar {
    background: rgba(15, 23, 42, 0.95) !important;
    border-bottom-color: rgba(255, 255, 255, 0.1) !important;
    
    .navbar-content .navbar-left .page-title {
      color: #f1f5f9;
    }
    
    .nav-toggle,
    .navbar-action {
      color: #cbd5e0;
      
      &:hover {
        background: rgba(203, 213, 224, 0.1);
        color: #f1f5f9;
      }
    }
  }
  
  .main-content {
    .content-wrapper .page-container {
      background: rgba(15, 23, 42, 0.8);
      border-color: rgba(255, 255, 255, 0.1);
    }
  }
  
  .layout-footer {
    background: rgba(15, 23, 42, 0.95) !important;
    border-top-color: rgba(255, 255, 255, 0.1) !important;
    
    .footer-content {
      .footer-left .copyright {
        color: #94a3b8;
      }
      
      .footer-right :deep(.v-btn) {
        color: #94a3b8;
        
        &:hover {
          color: #cbd5e0;
        }
      }
    }
  }
}

// Responsive Design
@media (max-width: 960px) {
  .main-content .content-wrapper {
    padding: 16px;
    
    .page-container {
      border-radius: 12px;
    }
  }
  
  .layout-navbar .navbar-content {
    .navbar-left {
      gap: 8px;
      
      .page-title {
        font-size: 1.25rem;
      }
    }
    
    .navbar-right {
      gap: 4px;
    }
  }
}

@media (max-width: 600px) {
  .custom-drawer .drawer-header .logo-section {
    .logo-text .app-title {
      font-size: 1rem;
    }
  }
  
  .layout-navbar .navbar-content .navbar-left {
    .navbar-breadcrumbs {
      display: none;
    }
  }
  
  .main-content .content-wrapper {
    padding: 12px;
  }
}

// Animations
.custom-drawer {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1) !important;
}

.layout-navbar {
  transition: all 0.3s ease !important;
}

.page-container {
  transition: all 0.3s ease;
}

// Scrollbar personnalisé pour le contenu principal
.main-content {
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.05);
  }
  
  &::-webkit-scrollbar-thumb {
    background: rgba(0, 0, 0, 0.2);
    border-radius: 3px;
    
    &:hover {
      background: rgba(0, 0, 0, 0.3);
    }
  }
}
</style>