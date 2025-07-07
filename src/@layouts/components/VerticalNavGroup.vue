<template>
  <!-- VerticalNavGroup.vue -->
  <li class="nav-group" :class="[`variant-${item.variant || 'primary'}`]">
    <div
      @click="toggleGroup"
      class="group-header"
      :class="{ 'is-open': isOpen }"
    >
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
  item: Object,
});

const isOpen = ref(false);
const toggleGroup = () => {
  isOpen.value = !isOpen.value;
};
</script>

<style lang="scss" scoped>
// ===================================================================
// Colours helpers ----------------------------------------------------
$variants: (
  primary : var(--v-theme-primary),
  success : var(--v-theme-success, #10b981),
  warning : var(--v-theme-warning, #f59e0b),
  danger  : var(--v-theme-error,   #ef4444)
);
// ===================================================================

.nav-group {
  margin-bottom: 2px;
  border-radius: 8px;
  overflow: hidden;
  transition: background 0.2s ease;

  &:hover {
    background: rgba(var(--v-theme-on-surface), 0.04);
  }

  // -------------- Group header ------------------------------------
  .group-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 16px;
    cursor: pointer;
    border-radius: 8px;
    user-select: none;
    position: relative;
    transition: all 0.25s ease;
    color: rgba(var(--v-theme-on-surface), 0.8);

    &::before {
      content: '';
      position: absolute;
      inset-block: 0;
      inset-inline-start: 0;
      width: 3px;
      background: linear-gradient(
        180deg,
        rgba(var(--v-theme-primary), 1),
        rgba(var(--v-theme-primary-darken-2, var(--v-theme-primary)), 1)
      );
      transform: scaleY(0);
      transition: transform 0.3s ease;
      border-radius: 0 2px 2px 0;
    }

    &::after {
      content: '';
      position: absolute;
      inset: 0;
      background: linear-gradient(
        90deg,
        transparent 0%,
        rgba(var(--v-theme-primary), 0.05) 50%,
        transparent 100%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      border-radius: 8px;
    }

    &:hover {
      background: linear-gradient(
        135deg,
        rgba(var(--v-theme-surface), 1) 0%,
        rgba(var(--v-theme-surface), 0.95) 100%
      );
      transform: translateX(2px);
      box-shadow: 0 2px 8px rgba(var(--v-theme-on-surface), 0.08);

      &::before {
        transform: scaleY(1);
      }

      &::after {
        opacity: 1;
      }

      .group-icon {
        color: rgba(var(--v-theme-primary), 1);
        transform: scale(1.1);
      }

      .chevron-icon {
        color: rgba(var(--v-theme-primary), 1);
      }
    }

    &.is-open {
      background: linear-gradient(
        135deg,
        rgba(var(--v-theme-primary), 0.15),
        rgba(var(--v-theme-primary), 0.1)
      );
      color: rgba(var(--v-theme-primary-darken-1, var(--v-theme-primary)), 1);

      &::before {
        transform: scaleY(1);
      }

      .group-icon,
      .chevron-icon {
        color: rgba(var(--v-theme-primary), 1);
      }

      .chevron-icon {
        transform: rotate(180deg);
      }

      .group-title {
        font-weight: 600;
      }
    }

    &:active {
      transform: translateX(1px) scale(0.98);
    }

    // --- inner elements ------------------------------------------
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
      color: rgba(var(--v-theme-on-surface), 0.6);
      flex-shrink: 0;
    }

    .group-title {
      font-size: 0.9rem;
      font-weight: 500;
      letter-spacing: 0.025em;
      font-family: 'Inter', sans-serif;
      transition: color 0.25s ease;
    }

    .chevron-icon {
      width: 16px;
      height: 16px;
      color: rgba(var(--v-theme-on-surface), 0.45);
      transition: all 0.3s ease;
      flex-shrink: 0;
    }
  }

  // -------------- Sub items ---------------------------------------
  .sub-items {
    list-style: none;
    margin: 0;
    padding: 0;
    background: linear-gradient(
      180deg,
      rgba(var(--v-theme-surface), 1) 0%,
      rgba(var(--v-theme-surface), 0.97) 100%
    );
    border-inline-start: 2px solid rgba(var(--v-theme-primary), 0.4);
    margin-inline-start: 3px;
    border-radius: 0 0 6px 6px;

    .sub-item {
      position: relative;

      &::before {
        content: '';
        position: absolute;
        inset-block: 0;
        inset-inline-start: -2px;
        width: 2px;
        background: rgba(var(--v-theme-primary), 1);
        transform: scaleY(0);
        transition: transform 0.2s ease;
      }

      &:hover::before {
        transform: scaleY(1);
      }
    }
  }

  // -------------- Colour variants ---------------------------------
  @each $name, $var in $variants {
    &.variant-#{$name} {
      .group-header::before { background: linear-gradient(180deg, #{$var}, shade($var, 15%)); }
      .sub-items { border-inline-start-color: $var; }
      .sub-items .sub-item::before { background: $var; }

      .group-header:hover .group-icon,
      .group-header:hover .chevron-icon { color: $var; }

      .group-header.is-open {
        background: linear-gradient(135deg, rgba(#{$var}, 0.2), rgba(#{$var}, 0.1));
        color: shade($var, 25%);
        .group-icon, .chevron-icon { color: $var; }
      }
    }
  }
}

// ===================================================================
// Slide‑fade animation (unchanged) ----------------------------------
.slide-fade-enter-active { transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-fade-leave-active { transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1); }
.slide-fade-enter-from  { opacity: 0; transform: translateY(-10px); max-height: 0; }
.slide-fade-leave-to    { opacity: 0; transform: translateY(-5px); max-height: 0; }
.slide-fade-enter-to,
.slide-fade-leave-from  { opacity: 1; transform: translateY(0); max-height: 500px; }

// ===================================================================
// Responsive adjustments -------------------------------------------
@media (max-width: 768px) {
  .nav-group {
    .group-header { padding: 12px 14px; }
    .header-content { gap: 10px; }
    .group-icon { width: 18px; height: 18px; }
    .group-title { font-size: 0.85rem; }
    .chevron-icon { width: 14px; height: 14px; }
    .sub-items { margin-inline-start: 14px; }
  }
}

// ===================================================================
// Accessibility ----------------------------------------------------
.group-header:focus {
  outline: 2px solid rgba(var(--v-theme-primary), 0.8);
  outline-offset: 2px;
}

</style>
