import { defineStore } from 'pinia'

export const usePreferencesStore = defineStore('preferences', {
  state: () => ({
    theme: localStorage.getItem('theme') || 'light',
  }),

  actions: {
    setTheme(themeName) {
      this.theme = themeName
      localStorage.setItem('theme', themeName)
    },
    // toggleTheme() {
    //   this.setTheme(this.theme === 'light' ? 'dark' : 'light')
    // },
    toggleTheme() {
      if (this.theme === 'light') {
        this.setTheme('dark')
      } else {
        this.setTheme('light')
      }
    }
  },
})
