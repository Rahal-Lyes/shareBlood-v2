import { createApp } from "vue";
import i18n from "./i18n";
import App from "./App.vue";
import { createPinia } from "pinia";
import vuetify from "@/plugins/vuetify/vuetify";
import "@/styles/main.scss";
import router from "@/router";
import { plugin, defaultConfig } from "@formkit/vue";
import "@formkit/themes/genesis";

const pinia = createPinia();

createApp(App)
  .use(i18n)
  .use(vuetify)
  .use(pinia)
  .use(router)
  .use(plugin, defaultConfig({theme:'genesis'}))
  .mount("#app");
