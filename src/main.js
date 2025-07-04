import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { createPinia } from 'pinia'
// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import defaults from '@/plugins/vuetify/defaults'
const pinia = createPinia()

const vuetify = createVuetify({
  components,
  directives,
  defaults
})

createApp(App).use(vuetify).use(pinia).mount('#app')
