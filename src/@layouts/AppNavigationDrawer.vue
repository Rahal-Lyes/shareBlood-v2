<template>
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
          <img src="@/assets/tafsutcms2.png" height="82" />
        </div>
        <div class="logo-text">
          <h3 class="app-title text-green-accent-3">TafsutCMS</h3>
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
</template>

<script setup>
import { watch } from "vue";
import { useDisplay } from "vuetify";

const { mdAndDown } = useDisplay();
const drawer = defineModel("drawer", { type: Boolean });

watch(mdAndDown, (val) => {
  if (!val) drawer.value = true;
});
</script>

<style lang="scss" scoped>
.custom-drawer {
  background-color: rgba(var(--v-theme-background)) !important;

  color: rgba(var(--v-theme-on-background)) !important;
  border-right: 1px solid rgba(var(--v-theme-on-surface), 0.12);
  @include transition-smooth;

  .drawer-header {
    @include nav-spacing;
    @include flex-between(0.75rem);
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;
    border-bottom: 1px solid rgba(var(--v-theme-on-surface), 0.08);
    position: relative;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      height: 4px;
      @include gradient-background(
        var(--v-theme-primary),
        rgba(var(--v-theme-primary), 0.6)
      );
    }

    .logo-section {
      @include flex-center(row, 0.75rem);
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction:column;

      .logo-icon {
        @include flex-center;
        @include border-radius(12px);
        @include hover-elevation(3);
        width: 48px;
        height: 48px;
        @include gradient-background(
          var(--v-theme-primary),
          rgba(var(--v-theme-primary), 0.8)
        );
        color: var(--v-theme-on-primary);
        box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.3);
        position: relative;

      

        &:hover::after {
          opacity: 1;
        }
      }

      .logo-text {
        @include flex-center(column, 0.125rem);
        align-items: flex-start;
        min-width: 0;

        .app-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: var(--v-theme-on-surface);
          margin: 0;
          line-height: 1.2;
          @include text-truncate;
          @include transition-smooth(color);
        }

        .app-subtitle {
          font-size: 0.875rem;
          color: rgba(
            var(--v-theme-on-surface),
            var(--v-medium-emphasis-opacity, 0.68)
          );
          font-weight: 400;
          @include text-truncate;
          @include transition-smooth(color);
        }
      }
    }

    .close-btn {
      @include border-radius(6px);
      @include transition-smooth;
      color: rgba(
        var(--v-theme-on-surface),
        var(--v-medium-emphasis-opacity, 0.68)
      );

      &:hover {
        color: var(--v-theme-on-surface);
        background-color: rgba(var(--v-theme-background), 0.08);
        transform: scale(1.05);
      }

      &:active {
        transform: scale(0.95);
      }
    }
  }

  .navigation-content {
    flex: 1;
    overflow-y: auto;
    overflow-x: hidden;
    padding: 0.5rem 0;

    &::-webkit-scrollbar {
      width: 4px;
    }

    &::-webkit-scrollbar-track {
      background: rgba(var(--v-theme-on-surface), 0.05);
    }

    &::-webkit-scrollbar-thumb {
      background: rgba(var(--v-theme-on-surface), 0.2);
      @include border-radius(2px);

      &:hover {
        background: rgba(var(--v-theme-on-surface), 0.3);
      }
    }

    &::before,
    &::after {
      content: "";
      position: sticky;
      display: block;
      height: 8px;
      z-index: 1;
      pointer-events: none;
    }

    &::before {
      top: 0;
      background: linear-gradient(
        to bottom,
        var(--v-theme-surface),
        transparent
      );
    }

    &::after {
      bottom: 0;
      background: linear-gradient(to top, var(--v-theme-surface), transparent);
    }
  }
}

@media (max-width: 960px) {
  .custom-drawer {
    .drawer-header {
      .logo-section {
        .logo-text {
          .app-title {
            font-size: 1.125rem;
          }
          .app-subtitle {
            font-size: 0.8125rem;
          }
        }
      }
    }
  }
}

.v-theme--dark {
  .custom-drawer {
    border-right-color: rgba(var(--v-theme-on-surface), 0.2);

    .drawer-header {
      border-bottom-color: rgba(var(--v-theme-on-surface), 0.12);

      .logo-section {
        .logo-icon {
          box-shadow: 0 4px 12px rgba(var(--v-theme-primary), 0.4);
        }
      }
    }

    .navigation-content {
      &::-webkit-scrollbar-track {
        background: rgba(var(--v-theme-on-surface), 0.12);
      }

      &::-webkit-scrollbar-thumb {
        background: rgba(var(--v-theme-on-surface), 0.3);

        &:hover {
          background: rgba(var(--v-theme-on-surface), 0.4);
        }
      }
    }
  }
}

.custom-drawer {
  &.v-navigation-drawer--is-mobile {
    .drawer-header {
      animation: slideInLeft 0.3s ease-out;
    }

    .navigation-content {
      animation: fadeIn 0.4s ease-out 0.1s both;
    }
  }
}

@keyframes slideInLeft {
  from {
    transform: translateX(-100%);
    opacity: 0;
  }
  to {
    transform: translateX(0);
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.custom-drawer {
  .close-btn {
    &:focus-visible {
      outline: 2px solid var(--v-theme-primary);
      outline-offset: 2px;
    }
  }
}

@media print {
  .custom-drawer {
    display: none;
  }
}

.brand-icon {
  color: rgba(var(--v-theme-primary));
  filter: drop-shadow(0 2px 4px rgba(var(--v-theme-primary), 0.3));
  transition: all 0.3s ease;

  &:hover {
    transform: rotate(10deg) scale(1.1);
  }
}
</style>
