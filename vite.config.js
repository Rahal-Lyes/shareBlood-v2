// vite.config.js

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import path from "path";
import vuetify from 'vite-plugin-vuetify'


export default defineConfig({
  
  plugins: [
    vue(),
    vuetify({
      autoImport: true, // ← utile pour éviter d'importer manuellement les composants
    }), 
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
       @use "@/styles/index.scss" as *;
      `
        
      },
    },
  },
});
