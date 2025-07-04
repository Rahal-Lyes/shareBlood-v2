<template>
  <li class="nav-group">
  
    <div @click="toggleGroup" class="group-header" :class="{ 'is-open': isOpen }">
      <div class="header-content">
    
        <VIcon :icon="item.icon" class="group-icon" />
        <span class="group-title">{{ item.title }}</span>
      </div>
      <VIcon 
        :icon="isOpen ? 'mdi-chevron-up' : 'mdi-chevron-down'" 
        class="chevron-icon"
      />
    </div>
    
    <transition name="slide-fade">
      <ul v-show="isOpen" class="sub-items">
    
        <VerticalNavLink 
          v-for="(subItem, index) in item.children"
          :key="index"
          :item="subItem"
          class="sub-item"
        />
      </ul>
    </transition>
  </li>
</template>

<script setup>
import { ref } from 'vue';
import VerticalNavLink from '@/@layouts/components/VerticalNavLink.vue';

defineProps({
  item: Object
});

const isOpen = ref(false);

const toggleGroup = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
.nav-group {
  margin-bottom: 2px;
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(0, 0, 0, 0.02);
  }
  
  .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    cursor: pointer;
    position: relative;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    border-radius: 8px;
    user-select: none;
    
    
    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #3b82f6, #1d4ed8);
      transform: scaleY(0);
      transition: transform 0.3s ease;
      border-radius: 0 2px 2px 0;
    }
    
    &:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      transform: translateX(2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
      
      &::before {
        transform: scaleY(1);
      }
      
      .group-icon {
        transform: scale(1.1);
        color: #3b82f6;
      }
      
      .chevron-icon {
        color: #3b82f6;
      }
    }
    
    &.is-open {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      color: #1e40af;
      
      &::before {
        transform: scaleY(1);
      }
      
      .group-icon {
        color: #2563eb;
        transform: scale(1.05);
      }
      
      .chevron-icon {
        color: #2563eb;
        transform: rotate(180deg);
      }
      
      .group-title {
        font-weight: 600;
      }
    }
    
    &:active {
      transform: translateX(1px) scale(0.98);
    }
    
    .header-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    
    .group-icon {
      width: 20px;
      height: 20px;
      transition: all 0.25s ease;
      color: #6b7280;
      flex-shrink: 0;
    }
    
    .group-title {
      font-size: 0.9rem;
      font-weight: 500;
      color: #374151;
      transition: all 0.25s ease;
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
      letter-spacing: 0.025em;
    }
    
    .chevron-icon {
      width: 16px;
      height: 16px;
      color: #9ca3af;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
      flex-shrink: 0;
    }
  }
  
  .sub-items {
    list-style: none;
    padding: 0;
    margin: 0;
    background: linear-gradient(180deg, #fafbfc 0%, #f8fafc 100%);
    border-left: 2px solid #e5e7eb;
    margin-left: 3px;
    border-radius: 0 0 6px 6px;
    
    .sub-item {
      position: relative;
      
      &::before {
        content: '';
        position: absolute;
        left: -2px;
        top: 0;
        bottom: 0;
        width: 2px;
        background: #3b82f6;
        transform: scaleY(0);
        transition: transform 0.2s ease;
      }
      
      &:hover::before {
        transform: scaleY(1);
      }
      
      &:first-child {
        border-radius: 6px 6px 0 0;
      }
      
      &:last-child {
        border-radius: 0 0 6px 6px;
      }
      
      &:only-child {
        border-radius: 6px;
      }
    }
  }
}

// Animations de transition
.slide-fade-enter-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.slide-fade-enter-from {
  opacity: 0;
  transform: translateY(-10px);
  max-height: 0;
}

.slide-fade-leave-to {
  opacity: 0;
  transform: translateY(-5px);
  max-height: 0;
}

.slide-fade-enter-to,
.slide-fade-leave-from {
  opacity: 1;
  transform: translateY(0);
  max-height: 500px;
}

// Variantes de couleurs
.nav-group {
  &.variant-success {
    .group-header {
      &::before {
        background: linear-gradient(180deg, #10b981, #059669);
      }
      
      &:hover {
        .group-icon,
        .chevron-icon {
          color: #10b981;
        }
      }
      
      &.is-open {
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        color: #065f46;
        
        .group-icon,
        .chevron-icon {
          color: #059669;
        }
      }
    }
    
    .sub-items {
      border-left-color: #10b981;
      
      .sub-item::before {
        background: #10b981;
      }
    }
  }
  
  &.variant-warning {
    .group-header {
      &::before {
        background: linear-gradient(180deg, #f59e0b, #d97706);
      }
      
      &:hover {
        .group-icon,
        .chevron-icon {
          color: #f59e0b;
        }
      }
      
      &.is-open {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #92400e;
        
        .group-icon,
        .chevron-icon {
          color: #d97706;
        }
      }
    }
    
    .sub-items {
      border-left-color: #f59e0b;
      
      .sub-item::before {
        background: #f59e0b;
      }
    }
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .nav-group {
    &:hover {
      background-color: rgba(255, 255, 255, 0.05);
    }
    
    .group-header {
      &:hover {
        background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
      }
      
      &.is-open {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        color: #bfdbfe;
      }
      
      .group-title {
        color: #000307;
      }
      
      .group-icon {
        color: #9ca3af;
      }
      
      .chevron-icon {
        color: #6b7280;
      }
    }
    
    .sub-items {
      background: linear-gradient(180deg, #1f2937 0%, #111827 100%);
      border-left-color: #4b5563;
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .nav-group {
    .group-header {
      padding: 12px 14px;
      
      .header-content {
        gap: 10px;
      }
      
      .group-icon {
        width: 18px;
        height: 18px;
      }
      
      .group-title {
        font-size: 0.85rem;
      }
      
      .chevron-icon {
        width: 14px;
        height: 14px;
      }
    }
    
    .sub-items {
      margin-left: 14px;
    }
  }
}

// États de focus pour l'accessibilité
.group-header:focus {
  outline: 2px solid #3b82f6;
  outline-offset: 2px;
}

// Animation de chargement pour les sous-éléments
.sub-items .sub-item {
  animation: slideInFromLeft 0.3s ease forwards;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-10px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Délai progressif pour chaque sous-élément
.sub-items .sub-item:nth-child(1) { animation-delay: 0.05s; }
.sub-items .sub-item:nth-child(2) { animation-delay: 0.1s; }
.sub-items .sub-item:nth-child(3) { animation-delay: 0.15s; }
.sub-items .sub-item:nth-child(4) { animation-delay: 0.2s; }
.sub-items .sub-item:nth-child(5) { animation-delay: 0.25s; }
</style>