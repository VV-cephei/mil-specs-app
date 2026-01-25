import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { useDataPersistence } from '@/composables/useDataPersistence.js'

export const useFormsStore = defineStore('forms', () => {
  // Persistence composable
  const persistence = useDataPersistence({ prefix: 'mil-specs-forms-' })
  
  // State
  const currentForm = ref(null)
  const savedForms = ref([])
  const decodedResults = ref([])
  const formTemplates = ref([])
  
  // Storage key
  const STORAGE_KEY = 'forms-data'
  
  // Initialize from localStorage
  function initialize() {
    const stored = persistence.loadFromStorage(STORAGE_KEY)
    if (stored) {
      savedForms.value = stored.savedForms || []
      decodedResults.value = stored.decodedResults || []
      formTemplates.value = stored.formTemplates || []
    }
  }
  
  // Persist state
  function persist() {
    persistence.saveToStorage(STORAGE_KEY, {
      savedForms: savedForms.value,
      decodedResults: decodedResults.value,
      formTemplates: formTemplates.value
    })
  }
  
  // Auto-initialize on store creation
  initialize()
  
  // Auto-save changes
  watch(
    [savedForms, decodedResults, formTemplates],
    () => persist(),
    { deep: true }
  )
  
  // Actions
  
  /**
   * Save a form
   * @param {object} formData - Form data
   * @param {object} metadata - Optional metadata
   * @returns {string} Form ID
   */
  function saveForm(formData, metadata = {}) {
    const form = {
      id: generateId(),
      specId: metadata.specId || 'dd2326',
      data: { ...formData },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      name: metadata.name || 'Untitled Form'
    }
    
    savedForms.value.push(form)
    persist()
    
    return form.id
  }
  
  /**
   * Update an existing form
   * @param {string} id - Form ID
   * @param {object} formData - Updated form data
   */
  function updateForm(id, formData) {
    const index = savedForms.value.findIndex(f => f.id === id)
    if (index !== -1) {
      savedForms.value[index] = {
        ...savedForms.value[index],
        data: { ...formData },
        updatedAt: new Date().toISOString()
      }
      persist()
    }
  }
  
  /**
   * Delete a form
   * @param {string} id - Form ID
   */
  function deleteForm(id) {
    const index = savedForms.value.findIndex(f => f.id === id)
    if (index !== -1) {
      savedForms.value.splice(index, 1)
      persist()
    }
  }
  
  /**
   * Get a form by ID
   * @param {string} id - Form ID
   * @returns {object|null} Form or null
   */
  function getForm(id) {
    return savedForms.value.find(f => f.id === id)
  }
  
  /**
   * Get forms by spec ID
   * @param {string} specId - Spec ID
   * @returns {array} Matching forms
   */
  function getFormsBySpec(specId) {
    return savedForms.value.filter(f => f.specId === specId)
  }
  
  /**
   * Duplicate a form
   * @param {string} id - Form ID to duplicate
   * @param {string} newName - Name for the duplicate
   * @returns {string|null} New form ID or null
   */
  function duplicateForm(id, newName = null) {
    const form = getForm(id)
    if (!form) return null
    
    const duplicate = {
      ...form,
      id: generateId(),
      name: newName || `${form.name} (Copy)`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    }
    
    savedForms.value.push(duplicate)
    persist()
    
    return duplicate.id
  }
  
  /**
   * Save a decoded result
   * @param {object} result - Decoded result
   * @param {object} metadata - Optional metadata
   * @returns {string} Result ID
   */
  function saveDecodedResult(result, metadata = {}) {
    const decoded = {
      id: generateId(),
      specId: metadata.specId || 'dd2326',
      data: result,
      createdAt: new Date().toISOString(),
      source: metadata.source || 'manual'
    }
    
    decodedResults.value.push(decoded)
    persist()
    
    return decoded.id
  }
  
  /**
   * Get a decoded result by ID
   * @param {string} id - Result ID
   * @returns {object|null} Result or null
   */
  function getDecodedResult(id) {
    return decodedResults.value.find(r => r.id === id)
  }
  
  /**
   * Clear all decoded results
   */
  function clearDecodedResults() {
    decodedResults.value = []
    persist()
  }
  
  /**
   * Delete a decoded result
   * @param {string} id - Result ID
   */
  function deleteDecodedResult(id) {
    const index = decodedResults.value.findIndex(r => r.id === id)
    if (index !== -1) {
      decodedResults.value.splice(index, 1)
      persist()
    }
  }
  
  /**
   * Save a form template
   * @param {object} template - Template data
   * @returns {string} Template ID
   */
  function saveTemplate(template) {
    const t = {
      id: generateId(),
      ...template,
      createdAt: new Date().toISOString()
    }
    
    formTemplates.value.push(t)
    persist()
    
    return t.id
  }
  
  /**
   * Get templates by spec ID
   * @param {string} specId - Spec ID
   * @returns {array} Matching templates
   */
  function getTemplatesBySpec(specId) {
    return formTemplates.value.filter(t => t.specId === specId)
  }
  
  /**
   * Get a template by ID
   * @param {string} id - Template ID
   * @returns {object|null} Template or null
   */
  function getTemplate(id) {
    return formTemplates.value.find(t => t.id === id)
  }
  
  /**
   * Delete a template
   * @param {string} id - Template ID
   */
  function deleteTemplate(id) {
    const index = formTemplates.value.findIndex(t => t.id === id)
    if (index !== -1) {
      formTemplates.value.splice(index, 1)
      persist()
    }
  }
  
  /**
   * Update a template
   * @param {string} id - Template ID
   * @param {object} templateData - Updated template data
   */
  function updateTemplate(id, templateData) {
    const index = formTemplates.value.findIndex(t => t.id === id)
    if (index !== -1) {
      formTemplates.value[index] = {
        ...formTemplates.value[index],
        ...templateData,
        updatedAt: new Date().toISOString()
      }
      persist()
    }
  }
  
  /**
   * Set current form
   * @param {string|null} id - Form ID or null
   */
  function setCurrentForm(id) {
    currentForm.value = id
  }
  
  /**
   * Clear all data (forms, results, templates)
   */
  function clearAll() {
    savedForms.value = []
    decodedResults.value = []
    formTemplates.value = []
    currentForm.value = null
    persistence.clearStorage()
  }
  
  /**
   * Export all data
   * @returns {object} All store data
   */
  function exportData() {
    return {
      savedForms: savedForms.value,
      decodedResults: decodedResults.value,
      formTemplates: formTemplates.value,
      exportedAt: new Date().toISOString()
    }
  }
  
  /**
   * Import data
   * @param {object} data - Data to import
   */
  function importData(data) {
    if (data.savedForms) savedForms.value = data.savedForms
    if (data.decodedResults) decodedResults.value = data.decodedResults
    if (data.formTemplates) formTemplates.value = data.formTemplates
    persist()
  }
  
  // Helper function to generate unique IDs
  function generateId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 9)
  }
  
  return {
    // State
    currentForm,
    savedForms,
    decodedResults,
    formTemplates,
    // Actions
    saveForm,
    updateForm,
    deleteForm,
    getForm,
    getFormsBySpec,
    duplicateForm,
    saveDecodedResult,
    getDecodedResult,
    clearDecodedResults,
    deleteDecodedResult,
    saveTemplate,
    getTemplatesBySpec,
    getTemplate,
    deleteTemplate,
    updateTemplate,
    setCurrentForm,
    clearAll,
    exportData,
    importData
  }
})
