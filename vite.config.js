// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vuetify from "vite-plugin-vuetify"; // ← ici
export default defineConfig({
  plugins: [
    vue(),
    vuetify({ autoImport: true }), // ← ici
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  css: {
    preprocessorOptions: {
      scss: {
      additionalData: `
          @use "@/styles/variables.scss" as *;
          @use "@/styles/mixins.scss" as *;
          @use "@/styles/global.scss" as *;
          @use "@/styles/main.scss" as *;
        `
      },
    },
  },
});
