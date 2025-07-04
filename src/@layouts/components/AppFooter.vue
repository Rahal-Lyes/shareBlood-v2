<template>
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
</template>

