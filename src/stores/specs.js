import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { specRegistry } from '@/plugins/specs/registry.js'
import { MilSpecAdapter } from '@/plugins/specs/adapter.js'

export const useSpecsStore = defineStore('specs', () => {
  // State
  const currentSpec = ref('mil-std-2073')
  const currentSection = ref('methods')
  const searchQuery = ref('')
  const loading = ref(false)
  
  // Spec data storage (loaded on demand)
  const specData = ref(new Map())
  const loadedSpecs = ref(new Set())
  
  // Adapter instances
  const adapters = new Map()
  adapters.set('mil-std-2073', new MilSpecAdapter())
  
  // Getters
  const availableSpecs = computed(() => {
    return specRegistry.getAll().map(spec => ({
      id: spec.id,
      name: spec.name,
      version: spec.version,
      description: spec.description,
      icon: spec.icon
    }))
  })
  
  const isSpecLoaded = computed(() => {
    return (specId) => loadedSpecs.value.has(specId)
  })
  
  const getSpecData = computed(() => {
    return (specId, sectionId) => {
      const specDataObj = specData.value.get(specId)
      return specDataObj?.[sectionId] || []
    }
  })
  
  const filteredData = computed(() => {
    return (specId, sectionId) => {
      const data = getSpecData.value(specId, sectionId)
      if (!searchQuery.value || !data.length) return data
      
      const query = searchQuery.value.toLowerCase()
      return data.filter(item => 
        item.code?.toLowerCase().includes(query) ||
        item.description?.toLowerCase().includes(query)
      )
    }
  })
  
  // Actions
  
  /**
   * Register a spec plugin
   * @param {object} plugin - Plugin definition
   */
  function registerSpecPlugin(plugin) {
    specRegistry.register(plugin)
    if (plugin.adapter) {
      adapters.set(plugin.id, plugin.adapter)
    }
  }
  
  /**
   * Load data for a specific spec and section
   * @param {string} specId - Spec ID
   * @param {string} sectionId - Section ID
   */
  async function loadSpecSection(specId, sectionId) {
    if (loading.value) return
    
    loading.value = true
    try {
      // Try to load from adapter first
      const adapter = adapters.get(specId)
      if (adapter && typeof adapter.loadSectionData === 'function') {
        const data = await adapter.loadSectionData(sectionId)
        
        // Initialize spec data storage if needed
        if (!specData.value.has(specId)) {
          specData.value.set(specId, {})
        }
        
        specData.value.get(specId)[sectionId] = data
        loadedSpecs.value.add(specId)
        return data
      }
      
      // Fallback to registry data loader
      const dataLoader = specRegistry.getDataLoader(specId)
      if (dataLoader) {
        const data = await dataLoader.loadSection(sectionId)
        
        if (!specData.value.has(specId)) {
          specData.value.set(specId, {})
        }
        
        specData.value.get(specId)[sectionId] = data
        loadedSpecs.value.add(specId)
        return data
      }
      
      throw new Error(`No data loader found for spec: ${specId}`)
    } catch (error) {
      console.error(`[SpecsStore] Error loading ${specId}/${sectionId}:`, error)
      throw error
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Load all sections for a spec
   * @param {string} specId - Spec ID
   */
  async function loadAllSections(specId) {
    loading.value = true
    try {
      const sections = ['methods', 'cleaning', 'preservation', 'wrapping', 'cushioning', 'containers']
      
      for (const section of sections) {
        await loadSpecSection(specId, section)
      }
    } catch (error) {
      console.error(`[SpecsStore] Error loading all sections for ${specId}:`, error)
    } finally {
      loading.value = false
    }
  }
  
  /**
   * Set the current spec
   * @param {string} specId - Spec ID
   */
  function setCurrentSpec(specId) {
    currentSpec.value = specId
  }
  
  /**
   * Set the current section
   * @param {string} sectionId - Section ID
   */
  function setCurrentSection(sectionId) {
    currentSection.value = sectionId
  }
  
  /**
   * Set the search query
   * @param {string} query - Search query
   */
  function setSearchQuery(query) {
    searchQuery.value = query
  }
  
  /**
   * Get filtered data for current spec and section
   * @returns {array} Filtered data
   */
  function getFilteredData(specId, sectionId) {
    return filteredData.value(specId, sectionId)
  }
  
  /**
   * Get an item by code from a section
   * @param {string} specId - Spec ID
   * @param {string} sectionId - Section ID
   * @param {string} code - Item code
   * @returns {object|null} Item or null
   */
  function getItemByCode(specId, sectionId, code) {
    const data = specData.value.get(specId)?.[sectionId] || []
    return data.find(item => item.code === code)
  }
  
  /**
   * Get data for current spec and section
   * @returns {array} Current section data
   */
  function getCurrentSectionData() {
    return getFilteredData(currentSpec.value, currentSection.value)
  }
  
  /**
   * Clear loaded data for a spec
   * @param {string} specId - Spec ID
   */
  function clearSpecData(specId) {
    specData.value.delete(specId)
    loadedSpecs.value.delete(specId)
  }
  
  /**
   * Clear all loaded data
   */
  function clearAllData() {
    specData.value.clear()
    loadedSpecs.value.clear()
  }

  /**
   * Get a method by code from MIL-STD-2073
   * @param {string} code - Method code
   * @returns {object|null} Method or null
   */
  function getMethodByCode(code) {
    return getItemByCode('mil-std-2073', 'methods', code)
  }
  
  /**
   * Get a cleaning procedure by code from MIL-STD-2073
   * @param {string} code - Cleaning code
   * @returns {object|null} Cleaning procedure or null
   */
  function getCleaningByCode(code) {
    return getItemByCode('mil-std-2073', 'cleaning', code)
  }
  
  /**
   * Get a preservation material by code from MIL-STD-2073
   * @param {string} code - Preservation code
   * @returns {object|null} Preservation material or null
   */
  function getPreservationByCode(code) {
    return getItemByCode('mil-std-2073', 'preservation', code)
  }
  
  return {
    // State
    currentSpec,
    currentSection,
    searchQuery,
    loading,
    specData,
    loadedSpecs,
    // Getters
    availableSpecs,
    isSpecLoaded,
    getSpecData,
    filteredData,
    // Actions
    registerSpecPlugin,
    loadSpecSection,
    loadAllSections,
    setCurrentSpec,
    setCurrentSection,
    setSearchQuery,
    getFilteredData,
    getItemByCode,
    getMethodByCode,
    getCleaningByCode,
    getPreservationByCode,
    getCurrentSectionData,
    clearSpecData,
    clearAllData
  }
})
