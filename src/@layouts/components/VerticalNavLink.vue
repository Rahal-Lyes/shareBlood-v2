<template>
  <li class="nav-link">
    <RouterLink :to="item.to" class="nav-link-item" :class="{ 'has-badge': item.badge }">
      <div class="link-content">
        <VIcon :icon="item.icon" class="nav-item-icon" />
        <span class="nav-item-title">{{ item.title }}</span>
      </div>
      
      <!-- Badge optionnel -->
      <span v-if="item.badge" class="nav-badge" :class="`badge-${item.badgeVariant || 'primary'}`">
        {{ item.badge }}
      </span>
      
      <!-- Indicateur de lien externe -->
      <VIcon v-if="item.external" icon="mdi-open-in-new" class="external-icon" />
    </RouterLink>
  </li>
</template>

<script setup>
defineProps({
  item: { 
    type: Object, 
    required: true 
  }
});
</script>

<style lang="scss" scoped>
.nav-link {
  margin-bottom: 1px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  
  .nav-link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    text-decoration: none;
    color:var(--v-theme-secondary);
    font-weight: 500;
    font-size: 0.9rem;
    transition: all 0.25s cubic-bezier(0.4, 0, 0.2, 1);
    position: relative;
    border-radius: 8px;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    
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
    
    &::after {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 8px;
    }
    
    .link-content {
      display: flex;
      align-items: center;
      gap: 12px;
      flex: 1;
    }
    
    .nav-item-icon {
      width: 20px;
      height: 20px;
      transition: all 0.25s ease;
      color: #000000;
      flex-shrink: 0;
    }
    
    .nav-item-title {
      transition: all 0.25s ease;
      letter-spacing: 0.025em;
      line-height: 1.4;
    }
    
    .nav-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      transition: all 0.25s ease;
      
      &.badge-primary {
        background: #dbeafe;
        color: #1e40af;
      }
      
      &.badge-success {
        background: #d1fae5;
        color: #065f46;
      }
      
      &.badge-warning {
        background: #fef3c7;
        color: #92400e;
      }
      
      &.badge-danger {
        background: #fee2e2;
        color: #991b1b;
      }
      
      &.badge-info {
        background: #e0f2fe;
        color: #0c4a6e;
      }
    }
    
    .external-icon {
      width: 14px;
      height: 14px;
      color: #9ca3af;
      transition: all 0.25s ease;
      flex-shrink: 0;
    }
    
    // États de hover
    &:hover {
      background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
      color: #374151;
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
      
      &::before {
        transform: scaleY(1);
      }
      
      &::after {
        opacity: 1;
      }
      
      .nav-item-icon {
        color: #3b82f6;
        transform: scale(1.1);
      }
      
      .nav-item-title {
        color: #1f2937;
        font-weight: 600;
      }
      
      .nav-badge {
        transform: scale(1.05);
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
      }
      
      .external-icon {
        color: #3b82f6;
        transform: translateX(2px) translateY(-2px);
      }
    }
    
    // État actif (lien actuel)
    &.router-link-active,
    &.router-link-exact-active {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      color: #1e40af;
      font-weight: 600;
      
      &::before {
        transform: scaleY(1);
        background: linear-gradient(180deg, #2563eb, #1d4ed8);
      }
      
      .nav-item-icon {
        color: #2563eb;
        transform: scale(1.05);
      }
      
      .nav-item-title {
        color: #1e40af;
      }
      
      .nav-badge {
        background: #1e40af;
        color: white;
        box-shadow: 0 2px 4px rgba(30, 64, 175, 0.3);
      }
      
      .external-icon {
        color: #2563eb;
      }
    }
    
    // État de focus pour l'accessibilité
    &:focus {
      outline: 2px solid #3b82f6;
      outline-offset: 2px;
    }
    
    // Animation au clic
    &:active {
      transform: translateX(2px) scale(0.98);
    }
  }
}

// Variantes de couleurs pour les liens
.nav-link {
  &.variant-success {
    .nav-link-item {
      &::before {
        background: linear-gradient(180deg, #10b981, #059669);
      }
      
      &:hover {
        .nav-item-icon {
          color: #10b981;
        }
      }
      
      &.router-link-active,
      &.router-link-exact-active {
        background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
        color: #065f46;
        
        .nav-item-icon {
          color: #059669;
        }
        
        .nav-item-title {
          color: #065f46;
        }
      }
    }
  }
  
  &.variant-warning {
    .nav-link-item {
      &::before {
        background: linear-gradient(180deg, #f59e0b, #d97706);
      }
      
      &:hover {
        .nav-item-icon {
          color: #f59e0b;
        }
      }
      
      &.router-link-active,
      &.router-link-exact-active {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        color: #92400e;
        
        .nav-item-icon {
          color: #d97706;
        }
        
        .nav-item-title {
          color: #92400e;
        }
      }
    }
  }
  
  &.variant-danger {
    .nav-link-item {
      &::before {
        background: linear-gradient(180deg, #ef4444, #dc2626);
      }
      
      &:hover {
        .nav-item-icon {
          color: #ef4444;
        }
      }
      
      &.router-link-active,
      &.router-link-exact-active {
        background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
        color: #991b1b;
        
        .nav-item-icon {
          color: #dc2626;
        }
        
        .nav-item-title {
          color: #991b1b;
        }
      }
    }
  }
}

// États de chargement
.nav-link {
  &.loading {
    .nav-link-item {
      pointer-events: none;
      opacity: 0.6;
      
      .nav-item-icon {
        animation: pulse 2s infinite;
      }
    }
  }
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .nav-link {
    .nav-link-item {
      color: #9ca3af;
      
      &:hover {
        background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
        color: #d1d5db;
        
        .nav-item-title {
          color: #f3f4f6;
        }
      }
      
      &.router-link-active,
      &.router-link-exact-active {
        background: linear-gradient(135deg, #1e3a8a 0%, #1e40af 100%);
        color: #bfdbfe;
        
        .nav-item-title {
          color: #bfdbfe;
        }
        
        .nav-badge {
          background: #bfdbfe;
          color: #1e40af;
        }
      }
      
      .nav-item-icon {
        color: #6b7280;
      }
      
      .nav-badge {
        &.badge-primary {
          background: #1e3a8a;
          color: #bfdbfe;
        }
        
        &.badge-success {
          background: #065f46;
          color: #a7f3d0;
        }
        
        &.badge-warning {
          background: #92400e;
          color: #fde68a;
        }
        
        &.badge-danger {
          background: #991b1b;
          color: #fecaca;
        }
      }
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .nav-link {
    .nav-link-item {
      padding: 10px 14px;
      
      .link-content {
        gap: 10px;
      }
      
      .nav-item-icon {
        width: 18px;
        height: 18px;
      }
      
      .nav-item-title {
        font-size: 0.85rem;
      }
      
      .nav-badge {
        font-size: 0.65rem;
        padding: 1px 6px;
      }
      
      .external-icon {
        width: 12px;
        height: 12px;
      }
    }
  }
}

// Animation d'entrée pour les liens
.nav-link {
  animation: slideInFromLeft 0.3s ease forwards;
}

@keyframes slideInFromLeft {
  from {
    opacity: 0;
    transform: translateX(-15px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

// Délai progressif pour les liens multiples
.nav-link:nth-child(1) { animation-delay: 0.05s; }
.nav-link:nth-child(2) { animation-delay: 0.1s; }
.nav-link:nth-child(3) { animation-delay: 0.15s; }
.nav-link:nth-child(4) { animation-delay: 0.2s; }
.nav-link:nth-child(5) { animation-delay: 0.25s; }
.nav-link:nth-child(6) { animation-delay: 0.3s; }
.nav-link:nth-child(7) { animation-delay: 0.35s; }
.nav-link:nth-child(8) { animation-delay: 0.4s; }

// Effet de survol pour les groupes de liens
.nav-group:hover .nav-link {
  .nav-link-item:not(:hover) {
    opacity: 0.7;
    transform: scale(0.98);
  }
}
</style>