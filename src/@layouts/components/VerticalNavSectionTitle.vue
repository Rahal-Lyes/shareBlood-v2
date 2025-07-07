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
  image: String,
})
</script>

<style lang="scss" scoped>
.nav-items {
  list-style: none;
  padding: 0;
}

// =====================
// Thémé avec Vuetify
// =====================
.nav-section-title {
  padding: 12px 16px;
  font-weight: 600;
  text-transform: uppercase;
  font-size: 0.75rem;
  letter-spacing: 0.5px;
  color: rgba(var(--v-theme-on-surface), 0.6);
  background: linear-gradient(
    135deg,
    rgba(var(--v-theme-surface), 1) 0%,
    rgba(var(--v-theme-surface), 0.92) 100%
  );
  border-left: 3px solid var(--v-theme-primary);
  margin-bottom: 4px;
  position: relative;
  overflow: hidden;
  transition: all 0.2s ease-in-out;

  &::before {
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
  }

  &:hover {
    color: rgba(var(--v-theme-on-surface), 0.85);
    background: linear-gradient(
      135deg,
      rgba(var(--v-theme-primary), 0.06) 0%,
      rgba(var(--v-theme-primary), 0.03) 100%
    );
    border-left-color: var(--v-theme-primary-darken-1, var(--v-theme-primary));
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
  }

  .title-text {
    font-family: 'Inter', sans-serif;
    font-weight: 700;
    transition: color 0.2s ease;
  }
}

// =====================
// Responsive
// =====================
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
