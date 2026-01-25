/**
 * useMilSpec Composable
 * MIL-STD-2073 specific composable for data loading and utilities
 */

import { ref, computed, onMounted } from 'vue'
import { useSpecsStore } from '@/stores/specs'
import { specRegistry } from '@/plugins/specs/registry.js'

export function useMilSpec() {
  const specsStore = useSpecsStore()
  const loading = ref(false)
  const error = ref(null)

  // Get the adapter for mil-std-2073
  const adapter = computed(() => {
    const spec = specRegistry.get('mil-std-2073')
    return spec?.adapter || null
  })

  // Available sections
  const sections = [
    { id: 'methods', name: 'Methods of Preservation', icon: 'mdi-cog' },
    { id: 'cleaning', name: 'Cleaning & Drying', icon: 'mdi-broom' },
    { id: 'preservation', name: 'Preservative Materials', icon: 'mdi-shield-outline' },
    { id: 'wrapping', name: 'Wrapping Materials', icon: 'mdi-wrap' },
    { id: 'cushioning', name: 'Cushioning Materials', icon: 'mdi-cushion' },
    { id: 'containers', name: 'Containers', icon: 'mdi-box' }
  ]

  // Current section
  const currentSection = computed(() => specsStore.currentSection)

  // Loading state
  const isLoading = computed(() => loading.value || specsStore.loading)

  // Error state
  const hasError = computed(() => error.value !== null)

  /**
   * Load data for a specific section
   * @param {string} sectionId - Section to load
   */
  async function loadSection(sectionId) {
    loading.value = true
    error.value = null

    try {
      await specsStore.loadSpecSection('mil-std-2073', sectionId)
    } catch (e) {
      error.value = e.message
      console.error('[useMilSpec] Error loading section:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Load all sections
   */
  async function loadAllSections() {
    loading.value = true
    error.value = null

    try {
      for (const section of sections) {
        await specsStore.loadSpecSection('mil-std-2073', section.id)
      }
    } catch (e) {
      error.value = e.message
      console.error('[useMilSpec] Error loading all sections:', e)
    } finally {
      loading.value = false
    }
  }

  /**
   * Set the current section
   * @param {string} sectionId - Section ID
   */
  function setSection(sectionId) {
    specsStore.setCurrentSection(sectionId)
  }

  /**
   * Search within a section
   * @param {string} query - Search query
   */
  function search(query) {
    specsStore.setSearchQuery(query)
  }

  /**
   * Get data for the current section
   * @returns {array} Section data
   */
  function getCurrentSectionData() {
    if (!currentSection.value) return []
    return specsStore.getFilteredData('mil-std-2073', currentSection.value)
  }

  /**
   * Get an item by code from a section
   * @param {string} sectionId - Section ID
   * @param {string} code - Item code
   * @returns {object|null} Item or null
   */
  function getItemByCode(sectionId, code) {
    return specsStore.getItemByCode('mil-std-2073', sectionId, code)
  }

  /**
   * Export section data to specified format
   * @param {string} sectionId - Section ID
   * @param {string} format - Export format (json, csv)
   * @returns {string} Exported data
   */
  function exportSection(sectionId, format = 'json') {
    const data = specsStore.getSpecData('mil-std-2073', sectionId)
    if (!adapter.value) {
      return format === 'json' ? JSON.stringify(data, null, 2) : data
    }
    return adapter.value.export(data, format)
  }

  // Auto-load default section on mount
  onMounted(() => {
    if (!currentSection.value) {
      setSection('methods')
    }
  })

  return {
    // State
    loading,
    error,
    currentSection,
    sections,
    adapter,
    // Computed
    isLoading,
    hasError,
    // Methods
    loadSection,
    loadAllSections,
    setSection,
    search,
    getCurrentSectionData,
    getItemByCode,
    exportSection
  }
}
