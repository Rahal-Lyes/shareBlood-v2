<template>
  <li class="nav-section-title">
    <div class="title-wrapper">
      <img v-if="image" :src="image" alt="Section Icon" class="title-icon" />
      <span class="title-text">{{ title }}</span>
    </div>
  </li>
</template>

<script setup>
defineProps({
  title: String,
  image: {
    type: String,
    required: false
  }
});
</script>

<style lang="scss" scoped>
.nav-items {
  list-style: none;
  padding: 0;
  
  .nav-section-title {
    padding: 12px 16px;
    font-weight: 600;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.5px;
    color: #6b7280;
    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
    border-left: 3px solid #3b82f6;
    margin-bottom: 4px;
    transition: all 0.2s ease-in-out;
    position: relative;
    overflow: hidden;
    
    &::before {
      content: '';
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.05) 50%, transparent 100%);
      opacity: 0;
      transition: opacity 0.3s ease;
    }
    
    &:hover {
      color: #374151;
      background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%);
      border-left-color: #2563eb;
      transform: translateX(2px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
      
      &::before {
        opacity: 1;
      }
      
      .title-icon {
        transform: scale(1.1);
      }
    }
    
    .title-wrapper {
      display: flex;
      align-items: center;
      gap: 10px;
      position: relative;
      z-index: 1;
    }
    
    .title-icon {
      width: 18px;
      height: 18px;
      transition: all 0.2s ease;
      filter: brightness(0.8);
      
      &:hover {
        filter: brightness(1);
      }
    }
    
    .title-text {
      font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      font-weight: 700;
      transition: all 0.2s ease;
    }
  }
}

// Variantes de couleurs
.nav-section-title {
  &.primary {
    border-left-color: #3b82f6;
    
    &:hover {
      background: linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%);
      border-left-color: #2563eb;
    }
  }
  
  &.success {
    border-left-color: #10b981;
    
    &:hover {
      background: linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%);
      border-left-color: #059669;
    }
  }
  
  &.warning {
    border-left-color: #f59e0b;
    
    &:hover {
      background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
      border-left-color: #d97706;
    }
  }
  
  &.danger {
    border-left-color: #ef4444;
    
    &:hover {
      background: linear-gradient(135deg, #fee2e2 0%, #fecaca 100%);
      border-left-color: #dc2626;
    }
  }
}

// Mode sombre
@media (prefers-color-scheme: dark) {
  .nav-section-title {
    color: #9ca3af;
    background: linear-gradient(135deg, #1f2937 0%, #111827 100%);
    
    &:hover {
      color: #d1d5db;
      background: linear-gradient(135deg, #374151 0%, #1f2937 100%);
    }
    
    &::before {
      background: linear-gradient(90deg, transparent 0%, rgba(59, 130, 246, 0.1) 50%, transparent 100%);
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .nav-section-title {
    padding: 10px 12px;
    font-size: 0.7rem;
    
    .title-icon {
      width: 16px;
      height: 16px;
    }
  }
}
</style>