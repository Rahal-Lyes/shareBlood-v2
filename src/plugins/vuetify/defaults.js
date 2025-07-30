// plugins/vuetify/defaults.js
export default {
  global: {
    ripple: true, // Effet visuel sur clic
  },
  VBtn: {
    color: 'primary',
    variant: 'flat',
    rounded: 'lg',
    elevation: 2,
  },
  VTextField: {
    variant: 'outlined',
    density: 'comfortable',
    hideDetails: 'auto',
  },
  VCard: {
    elevation: 4,
    rounded: 'md',
  },
  VSwitch: {
    color: 'primary',
    inset: true, // switch aligné au label
    hideDetails: 'auto',
    density: 'comfortable',
    class: 'custom-switch', // facultatif pour styles CSS
  },
}
