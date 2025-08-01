const theme = {
  defaultTheme: 'light',
  themes: {
    light: {
      dark: false,
      colors: {
        'primary': '#1caa1c',
        'secondary': '#828385',
        'on-secondary': '#000000',
        'success': '#56CA00',
        'info': '#16B1FF',
        'warning': '#FFB400',
        'error': '#FF4C51',
        'on-primary': '#000000',
        'on-success': '#FFFFFF',
        'on-warning': '#FFFFFF',
        'background': '#FFFFFF',
        'on-background': '#1d1921',
        'surface' : "#FFFFFF",
        'on-surface': '#000000',
        'grey-50': '#FAFAFA',
        'grey-100': '#F5F5F5',
        'grey-200': '#EEEEEE',
        'grey-300': '#E0E0E0',
        'grey-400': '#BDBDBD',
        'grey-500': '#9E9E9E',
        'grey-600': '#757575',
        'grey-700': '#616161',
        'grey-800': '#424242',
        'grey-900': '#212121',
        'mail-read': '#E0E0E0',
        'mail-not-read': '#FAFAFA',
        'icon-shadow':'#555555cc',
        'primary-blue': "#0083C9",
        'dark-blue': "#162D4A" 
        
      },
      variables: {
        'border-color': '#3A3541',
        'medium-emphasis-opacity': 0.68,
        'opacity': 0.7,
        'disabled-opacity':.68,
        // Shadows
        'shadow-key-umbra-opacity': 'rgba(var(--v-theme-on-surface), 0.08)',
        'shadow-key-penumbra-opacity': 'rgba(var(--v-theme-on-surface), 0.12)',
        'shadow-key-ambient-opacity': 'rgba(var(--v-theme-on-surface), 0.04)',
      },
    },
    dark: {
      dark: true,
      colors: {
        'primary': '#FF6F61',
        'secondary': '#F48FB1',
        'on-secondary': '#fff',
        'success': '#56CA00',
        'info': '#12B1FF',
        'warning': '#FFB400',
        'error': '#FF4C51',
        'on-primary': '#FFFFFF',
        'on-success': '#FFFFFF',
        'on-warning': '#FFFFFF',
        'background': '#212946',
        'on-background': '#F5E8D8',
        'surface': '#111111',
        'on-surface': '#E7E3FC',
        'grey-50': '#2A2E42',
        'grey-100': '#2F3349',
        'grey-200': '#4A5072',
        'grey-300': '#5E6692',
        'grey-400': '#7983BB',
        'grey-500': '#8692D0',
        'grey-600': '#AAB3DE',
        'grey-700': 'B6BEE3',
        'grey-800': '#CFD3EC',
        'grey-900': '#E7E9F6',
        'mail-read': '#111111',
        'mail-not-read': '#303030',
        'icon-shadow':'#333333',
        'primary-blue': "#0083C9",
      

      },
      variables: {
        'font-size' : '30px',
        'border-color': '#E7E3FC',
        'medium-emphasis-opacity': 0.68,
        'disabled-opacity':.68,
        'opacity': 0.7,
        // Shadows
        'shadow-key-umbra-opacity': 'rgba(100, 100, 100, 0.08)',
        'shadow-key-penumbra-opacity': 'rgba(100, 100, 100, 0.12)',
        'shadow-key-ambient-opacity': 'rgba(100, 100, 100, 0.04)',
      },
    },
  },
}
export default theme