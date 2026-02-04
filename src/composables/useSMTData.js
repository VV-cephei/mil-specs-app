/**
 * useSMTData Composable
 * Loads and manages SMT manufacturing data from JSON files
 * Provides reactive data objects with loading and error states
 */

import { ref, readonly, computed } from 'vue'

// Data file paths
const DATA_BASE_PATH = '/data/smt'
const DATA_FILES = {
  substrates: `${DATA_BASE_PATH}/substrates.json`,
  solderAlloys: `${DATA_BASE_PATH}/solder-alloys.json`,
  surfaceFinishes: `${DATA_BASE_PATH}/surface-finishes.json`,
  solderPaste: `${DATA_BASE_PATH}/solder-paste.json`,
  reflowProfiles: `${DATA_BASE_PATH}/reflow-profiles.json`,
  defects: `${DATA_BASE_PATH}/defects.json`,
  stencilDesign: `${DATA_BASE_PATH}/stencil-design.json`,
  glossary: `${DATA_BASE_PATH}/glossary.json`
}

// Singleton state for caching
let cachedData = null
let loadPromise = null

/**
 * @returns {Object} - Reactive data objects and loading utilities
 */
export function useSMTData() {
  // Reactive state
  const substrates = ref({})
  const solderAlloys = ref({})
  const surfaceFinishes = ref({})
  const solderPaste = ref({})
  const reflowProfiles = ref({})
  const defects = ref({})
  const stencilDesign = ref({})
  const glossary = ref({})
  
  const loading = ref(false)
  const error = ref(null)
  const loaded = ref(false)

  /**
   * Fetch a single JSON file
   * @param {string} url - URL to fetch
   * @returns {Promise<Object>} - Parsed JSON data
   */
  async function fetchJson(url) {
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch ${url}: ${response.status} ${response.statusText}`)
    }
    return response.json()
  }

  /**
   * Load all SMT data files
   * @param {boolean} force - Force reload even if cached
   * @returns {Promise<void>}
   */
  async function loadData(force = false) {
    // Return cached data if available and not forcing reload
    if (cachedData && !force) {
      applyData(cachedData)
      loaded.value = true
      return
    }

    // If already loading, wait for the existing promise
    if (loadPromise && !force) {
      await loadPromise
      return
    }

    loading.value = true
    error.value = null

    loadPromise = (async () => {
      try {
        const [
          substratesData,
          solderAlloysData,
          surfaceFinishesData,
          solderPasteData,
          reflowProfilesData,
          defectsData,
          stencilDesignData,
          glossaryData
        ] = await Promise.all([
          fetchJson(DATA_FILES.substrates),
          fetchJson(DATA_FILES.solderAlloys),
          fetchJson(DATA_FILES.surfaceFinishes),
          fetchJson(DATA_FILES.solderPaste),
          fetchJson(DATA_FILES.reflowProfiles),
          fetchJson(DATA_FILES.defects),
          fetchJson(DATA_FILES.stencilDesign),
          fetchJson(DATA_FILES.glossary)
        ])

        // Cache the data
        cachedData = {
          substrates: substratesData || {},
          solderAlloys: solderAlloysData || {},
          surfaceFinishes: surfaceFinishesData || {},
          solderPaste: solderPasteData || {},
          reflowProfiles: reflowProfilesData || {},
          defects: defectsData || {},
          stencilDesign: stencilDesignData || {},
          glossary: glossaryData || {}
        }

        applyData(cachedData)
        loaded.value = true
      } catch (err) {
        console.error('[useSMTData] Error loading data:', err)
        error.value = err
        throw err
      } finally {
        loading.value = false
        loadPromise = null
      }
    })()

    await loadPromise
  }

  /**
   * Apply cached data to reactive refs
   * @param {Object} data - Cached data object
   */
  function applyData(data) {
    substrates.value = data.substrates
    solderAlloys.value = data.solderAlloys
    surfaceFinishes.value = data.surfaceFinishes
    solderPaste.value = data.solderPaste
    reflowProfiles.value = data.reflowProfiles
    defects.value = data.defects
    stencilDesign.value = data.stencilDesign
    glossary.value = data.glossary
  }

  /**
   * Get a glossary term definition
   * @param {string} term - Term to look up
   * @returns {Object|null} - Term object or null if not found
   */
  function getGlossaryTerm(term) {
    const terms = glossary.value.terms || []
    return terms.find(
      t => t.term.toLowerCase() === term.toLowerCase()
    ) || null
  }

  /**
   * Get a substrate category by ID
   * @param {string} id - Substrate category ID
   * @returns {Object|null} - Substrate category or null if not found
   */
  function getSubstrateCategory(id) {
    const categories = substrates.value.categories || []
    return categories.find(c => c.id === id) || null
  }

  /**
   * Get a solder alloy by ID
   * @param {string} id - Solder alloy ID
   * @returns {Object|null} - Solder alloy or null if not found
   */
  function getSolderAlloy(id) {
    const categories = solderAlloys.value.categories || []
    for (const category of categories) {
      const alloy = category.alloys?.find(a => a.id === id)
      if (alloy) return { ...alloy, category: category.name }
    }
    return null
  }

  /**
   * Get a surface finish by ID
   * @param {string} id - Surface finish ID
   * @returns {Object|null} - Surface finish or null if not found
   */
  function getSurfaceFinish(id) {
    const finishes = surfaceFinishes.value.finishes || []
    return finishes.find(f => f.id === id) || null
  }

  /**
   * Get a defect by ID
   * @param {string} id - Defect ID
   * @returns {Object|null} - Defect or null if not found
   */
  function getDefect(id) {
    const categories = defects.value.categories || []
    for (const category of categories) {
      const defect = category.defects?.find(d => d.id === id)
      if (defect) return { ...defect, category: category.name }
    }
    return null
  }

  /**
   * Get a reflow zone by ID
   * @param {string} id - Zone ID
   * @returns {Object|null} - Zone or null if not found
   */
  function getReflowZone(id) {
    const zones = reflowProfiles.value.zones || []
    return zones.find(z => z.id === id) || null
  }

  /**
   * Get a standard by ID
   * @param {string} id - Standard ID
   * @returns {Object|null} - Standard or null if not found
   */
  function getStandard(id) {
    const standards = glossary.value.standards || []
    return standards.find(s => s.id === id) || null
  }

  /**
   * Clear cached data (useful for testing or forced refresh)
   */
  function clearCache() {
    cachedData = null
    loadPromise = null
    loaded.value = false
  }

  // Computed properties for convenience
  const substrateCategories = computed(() => substrates.value.categories || [])
  const alloyCategories = computed(() => solderAlloys.value.categories || [])
  const finishesList = computed(() => surfaceFinishes.value.finishes || [])
  const defectCategories = computed(() => defects.value.categories || [])
  const reflowZones = computed(() => reflowProfiles.value.zones || [])
  const glossaryTerms = computed(() => glossary.value.terms || [])
  const standards = computed(() => glossary.value.standards || [])
  const powderTypes = computed(() => solderPaste.value.powderTypes?.types || [])

  return {
    // Data (readonly to prevent external mutation)
    substrates: readonly(substrates),
    solderAlloys: readonly(solderAlloys),
    surfaceFinishes: readonly(surfaceFinishes),
    solderPaste: readonly(solderPaste),
    reflowProfiles: readonly(reflowProfiles),
    defects: readonly(defects),
    stencilDesign: readonly(stencilDesign),
    glossary: readonly(glossary),
    
    // State
    loading: readonly(loading),
    error: readonly(error),
    loaded: readonly(loaded),
    
    // Methods
    loadData,
    clearCache,
    getGlossaryTerm,
    getSubstrateCategory,
    getSolderAlloy,
    getSurfaceFinish,
    getDefect,
    getReflowZone,
    getStandard,
    
    // Computed
    substrateCategories,
    alloyCategories,
    finishesList,
    defectCategories,
    reflowZones,
    glossaryTerms,
    standards,
    powderTypes
  }
}

export default useSMTData