import { createApp } from 'vue'
import i18n from './i18n'
import App from './App.vue'
import { createPinia } from 'pinia'
import vuetify from './plugins/vuetify/vuetify'
import '@/styles/main.scss'
import router from './router'
const pinia = createPinia()


createApp(App).use(i18n).use(vuetify).use(pinia).use(router).mount('#app')


