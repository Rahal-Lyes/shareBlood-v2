// plugins/vuetify.js
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from 'vuetify/iconsets/mdi'
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";
import defaults from "@/plugins/vuetify/defaults";
import theme from './themes'
import "@mdi/font/css/materialdesignicons.css";

const vuetify = createVuetify({
  components,
  directives,
  defaults,
  theme,

icons: {
  defaultSet: 'mdi',
  aliases,
  sets: {
    mdi
  },
},


});

export default vuetify;
