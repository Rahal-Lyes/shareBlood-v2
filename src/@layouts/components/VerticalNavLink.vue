<template>
  <li class="nav-link">
    <RouterLink
      :to="item.to"
      class="nav-link-item"
      :class="[{ 'has-badge': item.badge }, `variant-${item.variant || 'primary'}`]"
    >
      <div class="link-content">
        <VIcon :icon="item.icon" class="nav-item-icon" />
        <span class="nav-item-title">{{ item.title }}</span>
      </div>

      <span
        v-if="item.badge"
        class="nav-badge"
        :class="`badge-${item.badgeVariant || 'primary'}`"
      >
        {{ item.badge }}
      </span>

      <VIcon
        v-if="item.external"
        icon="mdi-open-in-new"
        class="external-icon"
      />
    </RouterLink>
  </li>
</template>

<script setup>
defineProps({
  item: {
    type: Object,
    required: true,
  },
});
</script>

<style lang="scss" scoped>
.nav-link {
  margin-bottom: 1px;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
  animation: slideInFromLeft 0.3s ease forwards;

  .nav-link-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 16px;
    text-decoration: none;
    color: rgba(var(--v-theme-on-surface), 0.7);
    font-weight: 500;
    font-size: 0.9rem;
    border-radius: 8px;
    position: relative;
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
    transition: all 0.25s ease;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, rgba(var(--v-theme-primary), 1), rgba(var(--v-theme-primary-darken-2, var(--v-theme-primary)), 1));
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
      background: linear-gradient(90deg, transparent 0%, rgba(var(--v-theme-primary), 0.05) 50%, transparent 100%);
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
      color: rgba(var(--v-theme-on-surface), 0.7);
      flex-shrink: 0;
    }

    .nav-item-title {
      letter-spacing: 0.025em;
      line-height: 1.4;
      transition: all 0.25s ease;
    }

    .nav-badge {
      padding: 2px 8px;
      border-radius: 12px;
      font-size: 0.7rem;
      font-weight: 600;
      letter-spacing: 0.05em;
      transition: all 0.25s ease;

      &.badge-primary {
        background: rgba(var(--v-theme-primary), 0.15);
        color: rgba(var(--v-theme-primary-darken-2, var(--v-theme-primary)), 1);
      }
      &.badge-success {
        background: rgba(var(--v-theme-success), 0.15);
        color: rgba(var(--v-theme-success-darken-1, var(--v-theme-success)), 1);
      }
      &.badge-warning {
        background: rgba(var(--v-theme-warning), 0.15);
        color: rgba(var(--v-theme-warning-darken-1, var(--v-theme-warning)), 1);
      }
      &.badge-danger {
        background: rgba(var(--v-theme-error), 0.15);
        color: rgba(var(--v-theme-error-darken-1, var(--v-theme-error)), 1);
      }
      &.badge-info {
        background: rgba(var(--v-theme-info), 0.15);
        color: rgba(var(--v-theme-info-darken-1, var(--v-theme-info)), 1);
      }
    }

    .external-icon {
      width: 14px;
      height: 14px;
      color: rgba(var(--v-theme-on-surface), 0.5);
      transition: all 0.25s ease;
      flex-shrink: 0;
    }

    &:hover {
      background: linear-gradient(135deg, rgba(var(--v-theme-surface), 1), rgba(var(--v-theme-surface), 0.95));
      color: rgba(var(--v-theme-on-surface), 0.9);
      transform: translateX(4px);
      box-shadow: 0 4px 12px rgba(var(--v-theme-on-surface), 0.1);

      &::before {
        transform: scaleY(1);
      }

      &::after {
        opacity: 1;
      }

      .nav-item-icon {
        color: rgba(var(--v-theme-primary), 1);
        transform: scale(1.1);
      }

      .nav-item-title {
        color: rgba(var(--v-theme-on-surface), 1);
        font-weight: 600;
      }

      .nav-badge {
        transform: scale(1.05);
      }

      .external-icon {
        color: rgba(var(--v-theme-primary), 1);
        transform: translateX(2px) translateY(-2px);
      }
    }

    &.router-link-active,
    &.router-link-exact-active {
      background: linear-gradient(135deg, rgba(var(--v-theme-primary), 0.15), rgba(var(--v-theme-primary), 0.1));
      color: rgba(var(--v-theme-primary), 1);

      &::before {
        transform: scaleY(1);
        background: linear-gradient(180deg, rgba(var(--v-theme-primary), 1), rgba(var(--v-theme-primary-darken-2, var(--v-theme-primary)), 1));
      }

      .nav-item-icon {
        color: rgba(var(--v-theme-primary), 1);
        transform: scale(1.05);
      }

      .nav-item-title {
        color: rgba(var(--v-theme-primary), 1);
      }

      .nav-badge {
        background: rgba(var(--v-theme-primary), 1);
        color: rgba(var(--v-theme-on-primary), 1);
      }

      .external-icon {
        color: rgba(var(--v-theme-primary), 1);
      }
    }

    &:focus {
      outline: 2px solid rgba(var(--v-theme-primary), 0.8);
      outline-offset: 2px;
    }

    &:active {
      transform: translateX(2px) scale(0.98);
    }
  }
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
</style>