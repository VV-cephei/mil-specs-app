/**
 * useDataPersistence Composable
 * Handles data persistence to localStorage with automatic storage availability checking
 */

import { ref, watch, onMounted, onUnmounted } from 'vue'

export function useDataPersistence(options = {}) {
  const storageAvailable = ref(false)
  const lastError = ref(null)
  
  // Default options
  const opts = {
    prefix: 'mil-specs-',
    autoInit: true,
    ...options
  }

  /**
   * Check if localStorage is available
   */
  function checkStorage() {
    try {
      const testKey = `${opts.prefix}storage-test`
      const testValue = 'test'
      localStorage.setItem(testKey, testValue)
      localStorage.removeItem(testKey)
      storageAvailable.value = true
      return true
    } catch (e) {
      console.warn('[useDataPersistence] localStorage not available:', e)
      storageAvailable.value = false
      lastError.value = e.message
      return false
    }
  }

  /**
   * Get the full storage key with prefix
   * @param {string} key - Key without prefix
   * @returns {string} Full key with prefix
   */
  function getStorageKey(key) {
    return `${opts.prefix}${key}`
  }

  /**
   * Save data to localStorage
   * @param {string} key - Storage key
   * @param {any} data - Data to save
   * @returns {boolean} Success status
   */
  function saveToStorage(key, data) {
    if (!storageAvailable.value) {
      lastError.value = 'Storage not available'
      return false
    }

    try {
      const fullKey = getStorageKey(key)
      const serialized = JSON.stringify(data)
      localStorage.setItem(fullKey, serialized)
      return true
    } catch (e) {
      console.error('[useDataPersistence] Error saving:', e)
      lastError.value = e.message
      return false
    }
  }

  /**
   * Load data from localStorage
   * @param {string} key - Storage key
   * @param {any} defaultValue - Default value if not found
   * @returns {any} Loaded data or default
   */
  function loadFromStorage(key, defaultValue = null) {
    if (!storageAvailable.value) {
      return defaultValue
    }

    try {
      const fullKey = getStorageKey(key)
      const serialized = localStorage.getItem(fullKey)
      if (serialized === null) {
        return defaultValue
      }
      return JSON.parse(serialized)
    } catch (e) {
      console.error('[useDataPersistence] Error loading:', e)
      lastError.value = e.message
      return defaultValue
    }
  }

  /**
   * Remove data from localStorage
   * @param {string} key - Storage key
   * @returns {boolean} Success status
   */
  function removeFromStorage(key) {
    if (!storageAvailable.value) {
      return false
    }

    try {
      const fullKey = getStorageKey(key)
      localStorage.removeItem(fullKey)
      return true
    } catch (e) {
      console.error('[useDataPersistence] Error removing:', e)
      lastError.value = e.message
      return false
    }
  }

  /**
   * Clear all data with our prefix
   * @returns {boolean} Success status
   */
  function clearStorage() {
    if (!storageAvailable.value) {
      return false
    }

    try {
      const keysToRemove = []
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i)
        if (key.startsWith(opts.prefix)) {
          keysToRemove.push(key)
        }
      }
      keysToRemove.forEach(key => localStorage.removeItem(key))
      return true
    } catch (e) {
      console.error('[useDataPersistence] Error clearing:', e)
      lastError.value = e.message
      return false
    }
  }

  /**
   * Check if a key exists in storage
   * @param {string} key - Storage key
   * @returns {boolean} True if exists
   */
  function hasStorageKey(key) {
    if (!storageAvailable.value) {
      return false
    }

    try {
      const fullKey = getStorageKey(key)
      return localStorage.getItem(fullKey) !== null
    } catch (e) {
      return false
    }
  }

  /**
   * Watch a reactive object and auto-save changes
   * @param {object} reactiveObj - Reactive object to watch
   * @param {string} key - Storage key
   * @param {object} watchOptions - Vue watch options
   * @returns {function} Unwatch function
   */
  function watchAndSave(reactiveObj, key, watchOptions = { deep: true }) {
    const unwatch = watch(
      () => reactiveObj,
      (newValue) => {
        saveToStorage(key, newValue)
      },
      watchOptions
    )

    // Load initial value
    const loaded = loadFromStorage(key)
    if (loaded !== null) {
      Object.assign(reactiveObj, loaded)
    }

    return unwatch
  }

  /**
   * Create a persisted reactive state
   * @param {string} key - Storage key
   * @param {any} initialValue - Initial value
   * @param {object} options - Watch options
   * @returns {object} Reactive ref with persistence
   */
  function createPersistedState(key, initialValue, options = {}) {
    const loaded = loadFromStorage(key, initialValue)
    const state = ref(loaded)

    const watchOptions = {
      deep: options.deep !== false,
      ...options
    }

    watch(
      () => state.value,
      (newValue) => {
        saveToStorage(key, newValue)
      },
      watchOptions
    )

    return state
  }

  /**
   * Save file content to localStorage (for larger files)
   * @param {string} key - Storage key
   * @param {Blob} blob - File blob
   * @returns {Promise<boolean>} Success status
   */
  async function saveFileToStorage(key, blob) {
    if (!storageAvailable.value) {
      lastError.value = 'Storage not available'
      return false
    }

    try {
      const fullKey = getStorageKey(key)
      // Convert Blob to base64 string for localStorage
      const reader = new FileReader()
      const base64Data = await new Promise((resolve, reject) => {
        reader.onload = () => resolve(reader.result.split(',')[1])
        reader.onerror = reject
        reader.readAsDataURL(blob)
      })
      
      const fileData = {
        type: blob.type,
        size: blob.size,
        data: base64Data
      }
      
      localStorage.setItem(fullKey, JSON.stringify(fileData))
      return true
    } catch (e) {
      console.error('[useDataPersistence] Error saving file:', e)
      lastError.value = e.message
      return false
    }
  }

  /**
   * Load file from localStorage
   * @param {string} key - Storage key
   * @returns {Promise<Blob|null>} File blob or null
   */
  async function loadFileFromStorage(key) {
    if (!storageAvailable.value) {
      return null
    }

    try {
      const fullKey = getStorageKey(key)
      const serialized = localStorage.getItem(fullKey)
      if (!serialized) {
        return null
      }
      
      const fileData = JSON.parse(serialized)
      const byteCharacters = atob(fileData.data)
      const byteNumbers = new Array(byteCharacters.length)
      for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i)
      }
      const byteArray = new Uint8Array(byteNumbers)
      
      return new Blob([byteArray], { type: fileData.type })
    } catch (e) {
      console.error('[useDataPersistence] Error loading file:', e)
      lastError.value = e.message
      return null
    }
  }

  // Auto-initialize
  if (opts.autoInit) {
    onMounted(() => {
      checkStorage()
    })
  }

  return {
    // State
    storageAvailable,
    lastError,
    // Methods
    checkStorage,
    saveToStorage,
    loadFromStorage,
    removeFromStorage,
    clearStorage,
    hasStorageKey,
    watchAndSave,
    createPersistedState,
    saveFileToStorage,
    loadFileFromStorage,
    getStorageKey
  }
}
