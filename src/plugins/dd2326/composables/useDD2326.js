/**
 * useDD2326 Composable
 * DD Form 2326 specific composable for form handling
 */

import { ref, computed, watch } from 'vue'
import { useFormsStore } from '@/stores/forms'
import { useDataPersistence } from '@/composables/useDataPersistence.js'
import { specRegistry } from '@/plugins/specs/registry.js'

export function useDD2326(options = {}) {
  const formsStore = useFormsStore()
  const { saveToStorage, loadFromStorage } = useDataPersistence()

  // Get the adapter for dd2326
  const adapter = computed(() => {
    const spec = specRegistry.get('dd2326')
    return spec?.adapter || null
  })

  // Form data state
  const formData = ref({
    topFields: {},
    partA: {},
    partB: {},
    partC: {},
    partD: {}
  })

  // Raw data for decoder
  const rawData = ref('')

  // Loading and validation state
  const loading = ref(false)
  const error = ref(null)
  const validationErrors = ref([])

  // Storage key for persistence
  const STORAGE_KEY = 'dd2326-form-data'

  // Load persisted data on init
  function loadPersistedData() {
    try {
      const stored = loadFromStorage(STORAGE_KEY)
      if (stored && stored.formData) {
        formData.value = stored.formData
      }
    } catch (e) {
      console.warn('[useDD2326] Could not load persisted data:', e)
    }
  }

  // Save form data to storage
  function persistData() {
    try {
      saveToStorage(STORAGE_KEY, {
        formData: formData.value,
        updatedAt: new Date().toISOString()
      })
    } catch (e) {
      console.warn('[useDD2326] Could not persist data:', e)
    }
  }

  // Watch for changes and auto-save
  if (options.autoSave !== false) {
    watch(formData, () => {
      persistData()
    }, { deep: true })
  }

  /**
   * Update a specific field
   * @param {string} part - Form part (topFields, partA, partB, partC, partD)
   * @param {string} key - Field key
   * @param {any} value - Field value
   */
  function updateField(part, key, value) {
    if (!formData.value[part]) {
      formData.value[part] = {}
    }
    formData.value[part][key] = value
  }

  /**
   * Update multiple fields at once
   * @param {string} part - Form part
   * @param {object} data - Object with field key-value pairs
   */
  function updateFields(part, data) {
    if (!formData.value[part]) {
      formData.value[part] = {}
    }
    Object.assign(formData.value[part], data)
  }

  /**
   * Validate the form
   * @returns {boolean} True if valid
   */
  function validate() {
    if (!adapter.value) {
      validationErrors.value = []
      return true
    }

    const result = adapter.value.validate(formData.value)
    validationErrors.value = result.errors
    return result.valid
  }

  /**
   * Get validation errors for a specific part
   * @param {string} part - Form part
   * @returns {array} Errors for the part
   */
  function getErrorsForPart(part) {
    return validationErrors.value.filter(err => err.startsWith(`${part}.`))
  }

  /**
   * Clear all form data
   */
  function clearForm() {
    formData.value = {
      topFields: {},
      partA: {},
      partB: {},
      partC: {},
      partD: {}
    }
    rawData.value = ''
    validationErrors.value = []
    persistData()
  }

  /**
   * Generate raw data string from form
   * @returns {string} Raw data
   */
  function generateRawData() {
    if (!adapter.value) {
      return ''
    }
    rawData.value = adapter.value.generateRawData(formData.value)
    return rawData.value
  }

  /**
   * Decode raw data string to form data
   * @param {string} data - Raw data string
   */
  function decodeRawData(data) {
    if (!adapter.value) {
      return
    }
    const parsed = adapter.value.decodeRawData(data)
    if (parsed) {
      formData.value = parsed
    }
  }

  /**
   * Save the form
   * @param {string} name - Optional form name
   * @returns {string} Form ID
   */
  function saveForm(name = 'Untitled Form') {
    const id = formsStore.saveForm(formData.value, {
      specId: 'dd2326',
      name
    })
    return id
  }

  /**
   * Load a saved form
   * @param {string} id - Form ID
   */
  function loadForm(id) {
    const form = formsStore.getForm(id)
    if (form) {
      formData.value = { ...form.data }
    }
  }

  /**
   * Export form data to JSON
   * @returns {string} JSON string
   */
  function exportToJson() {
    return JSON.stringify(formData.value, null, 2)
  }

  /**
   * Import form data from JSON
   * @param {string} json - JSON string
   */
  function importFromJson(json) {
    try {
      const data = JSON.parse(json)
      formData.value = { ...data }
    } catch (e) {
      throw new Error('Invalid JSON format')
    }
  }

  /**
   * Copy raw data to clipboard
   */
  async function copyRawData() {
    const data = generateRawData()
    if (data) {
      await navigator.clipboard.writeText(data)
    }
  }

  // Initialize persisted data
  loadPersistedData()

  return {
    // State
    formData,
    rawData,
    loading,
    error,
    validationErrors,
    adapter,
    // Computed
    isValid: computed(() => validationErrors.value.length === 0),
    // Methods
    updateField,
    updateFields,
    validate,
    getErrorsForPart,
    clearForm,
    generateRawData,
    decodeRawData,
    saveForm,
    loadForm,
    exportToJson,
    importFromJson,
    copyRawData,
    persistData
  }
}
