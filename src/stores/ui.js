import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useUIStore = defineStore('ui', () => {
  // State
  const drawer = ref(true)
  const loading = ref(false)
  const theme = ref('light')
  const notifications = ref([])
  const snackbar = ref({
    show: false,
    message: '',
    color: 'info',
    timeout: 3000
  })
  
  // Initialize theme from localStorage
  const savedTheme = localStorage.getItem('theme') || 'light'
  theme.value = savedTheme
  
  // Watch theme changes and save to localStorage
  watch(theme, (newTheme) => {
    localStorage.setItem('theme', newTheme)
  })
  
  // Actions
  function toggleDrawer() {
    drawer.value = !drawer.value
  }
  
  function setDrawer(value) {
    drawer.value = value
  }
  
  function setLoading(value) {
    loading.value = value
  }
  
  function toggleTheme() {
    theme.value = theme.value === 'light' ? 'dark' : 'light'
  }
  
  function showNotification(message, type = 'info', timeout = 3000) {
    notifications.value.push({
      id: Date.now(),
      message,
      type,
      timeout
    })
  }
  
  function showSnackbar(message, color = 'info', timeout = 3000) {
    snackbar.value = {
      show: true,
      message,
      color,
      timeout
    }
  }
  
  function hideSnackbar() {
    snackbar.value.show = false
  }
  
  function removeNotification(id) {
    const index = notifications.value.findIndex(n => n.id === id)
    if (index !== -1) {
      notifications.value.splice(index, 1)
    }
  }
  
  function clearNotifications() {
    notifications.value = []
  }
  
  return {
    // State
    drawer,
    loading,
    theme,
    notifications,
    snackbar,
    // Actions
    toggleDrawer,
    setDrawer,
    setLoading,
    toggleTheme,
    showNotification,
    showSnackbar,
    hideSnackbar,
    removeNotification,
    clearNotifications
  }
})
