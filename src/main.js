import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router, { registerPluginRoutes } from './router'

// Import plugins to register them
import '@/plugins/specs'
import '@/plugins/mil-std-2073'
import '@/plugins/dd2326'
import '@/plugins/tools-expansion'

// Vuetify
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives,
  theme: {
    defaultTheme: 'light',
    themes: {
      light: {
        dark: false,
        colors: {
          primary: '#1a237e',
          secondary: '#37474f',
          accent: '#0288d1',
          warning: '#f57c00',
          success: '#2e7d32',
          error: '#c62828',
          background: '#f5f5f5',
          surface: '#ffffff'
        }
      },
      dark: {
        dark: true,
        colors: {
          primary: '#3949ab',
          secondary: '#546e7a',
          accent: '#03a9f4',
          warning: '#ff9800',
          success: '#4caf50',
          error: '#f44336',
          background: '#121212',
          surface: '#1e1e1e'
        }
      }
    }
  }
})

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(vuetify)

// Register plugin routes after router is ready
registerPluginRoutes()

app.mount('#app')
