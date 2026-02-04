/**
 * useWireBondingData Composable
 * Loads and manages wire bonding data from JSON files
 * Provides reactive data objects with loading and error states
 */

import { ref, readonly, computed } from 'vue'

// Data file paths
const DATA_BASE_PATH = '/data/wire-bonding'
const DATA_FILES = {
  materials: `${DATA_BASE_PATH}/materials.json`,
  bondTypes: `${DATA_BASE_PATH}/bond-types.json`,
  loopProfiles: `${DATA_BASE_PATH}/loop-profiles.json`,
  applicationMethods: `${DATA_BASE_PATH}/application-methods.json`,
  failureModes: `${DATA_BASE_PATH}/failure-modes.json`,
  glossary: `${DATA_BASE_PATH}/glossary.json`,
  // New data files
  designGuidelines: `${DATA_BASE_PATH}/design-guidelines.json`,
  qualityTesting: `${DATA_BASE_PATH}/quality-testing.json`,
  visualInspection: `${DATA_BASE_PATH}/visual-inspection.json`,
  processOptimization: `${DATA_BASE_PATH}/process-optimization.json`,
  industryApplications: `${DATA_BASE_PATH}/industry-applications.json`
}

// Singleton state for caching
let cachedData = null
let loadPromise = null

/**
 * @returns {Object} - Reactive data objects and loading utilities
 */
export function useWireBondingData() {
  // Reactive state
  const materials = ref([])
  const bondTypes = ref([])
  const loopProfiles = ref([])
  const applicationMethods = ref([])
  const failureModes = ref([])
  const glossary = ref([])
  
  // New reactive state for expansion data
  const designGuidelines = ref({})
  const qualityTesting = ref({})
  const visualInspection = ref({})
  const processOptimization = ref({})
  const industryApplications = ref({})
  
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
   * Load all wire bonding data files
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
          materialsData,
          bondTypesData,
          loopProfilesData,
          applicationMethodsData,
          failureModesData,
          glossaryData,
          // New data files
          designGuidelinesData,
          qualityTestingData,
          visualInspectionData,
          processOptimizationData,
          industryApplicationsData
        ] = await Promise.all([
          fetchJson(DATA_FILES.materials),
          fetchJson(DATA_FILES.bondTypes),
          fetchJson(DATA_FILES.loopProfiles),
          fetchJson(DATA_FILES.applicationMethods),
          fetchJson(DATA_FILES.failureModes),
          fetchJson(DATA_FILES.glossary),
          // New data files
          fetchJson(DATA_FILES.designGuidelines),
          fetchJson(DATA_FILES.qualityTesting),
          fetchJson(DATA_FILES.visualInspection),
          fetchJson(DATA_FILES.processOptimization),
          fetchJson(DATA_FILES.industryApplications)
        ])

        // Cache the data
        cachedData = {
          materials: materialsData.materials || [],
          bondTypes: bondTypesData.bondTypes || [],
          loopProfiles: loopProfilesData.loopProfiles || [],
          applicationMethods: applicationMethodsData.methods || [],
          failureModes: failureModesData.failureModes || [],
          glossary: glossaryData.terms || [],
          // New data (stored as full objects)
          designGuidelines: designGuidelinesData || {},
          qualityTesting: qualityTestingData || {},
          visualInspection: visualInspectionData || {},
          processOptimization: processOptimizationData || {},
          industryApplications: industryApplicationsData || {}
        }

        applyData(cachedData)
        loaded.value = true
      } catch (err) {
        console.error('[useWireBondingData] Error loading data:', err)
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
    materials.value = data.materials
    bondTypes.value = data.bondTypes
    loopProfiles.value = data.loopProfiles
    applicationMethods.value = data.applicationMethods
    failureModes.value = data.failureModes
    glossary.value = data.glossary
    // New data
    designGuidelines.value = data.designGuidelines
    qualityTesting.value = data.qualityTesting
    visualInspection.value = data.visualInspection
    processOptimization.value = data.processOptimization
    industryApplications.value = data.industryApplications
  }

  /**
   * Get a glossary term definition
   * @param {string} term - Term to look up
   * @returns {Object|null} - Term object or null if not found
   */
  function getGlossaryTerm(term) {
    return glossary.value.find(
      t => t.term.toLowerCase() === term.toLowerCase()
    ) || null
  }

  /**
   * Get a material by ID
   * @param {string} id - Material ID
   * @returns {Object|null} - Material object or null if not found
   */
  function getMaterial(id) {
    return materials.value.find(m => m.id === id) || null
  }

  /**
   * Get a bond type by ID
   * @param {string} id - Bond type ID
   * @returns {Object|null} - Bond type object or null if not found
   */
  function getBondType(id) {
    return bondTypes.value.find(b => b.id === id) || null
  }

  /**
   * Get a loop profile by ID
   * @param {string} id - Loop profile ID
   * @returns {Object|null} - Loop profile object or null if not found
   */
  function getLoopProfile(id) {
    return loopProfiles.value.find(l => l.id === id) || null
  }

  /**
   * Get an application method by ID
   * @param {string} id - Application method ID
   * @returns {Object|null} - Application method object or null if not found
   */
  function getApplicationMethod(id) {
    return applicationMethods.value.find(m => m.id === id) || null
  }

  /**
   * Get a failure mode by ID
   * @param {string} id - Failure mode ID
   * @returns {Object|null} - Failure mode object or null if not found
   */
  function getFailureMode(id) {
    return failureModes.value.find(f => f.id === id) || null
  }

  /**
   * Get an industry application by key
   * @param {string} key - Industry application key (e.g., 'rfMicrowave', 'powerElectronics')
   * @returns {Object|null} - Industry application object or null if not found
   */
  function getIndustryApplication(key) {
    return industryApplications.value[key] || null
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
  const materialIds = computed(() => materials.value.map(m => m.id))
  const bondTypeIds = computed(() => bondTypes.value.map(b => b.id))
  const loopProfileIds = computed(() => loopProfiles.value.map(l => l.id))
  const applicationMethodIds = computed(() => applicationMethods.value.map(m => m.id))
  const failureModeIds = computed(() => failureModes.value.map(f => f.id))
  
  // Computed properties for new data
  const industryApplicationKeys = computed(() => {
    const apps = industryApplications.value
    return Object.keys(apps).filter(key => key !== 'comparisonTables' && key !== 'images')
  })

  return {
    // Data (readonly to prevent external mutation)
    materials: readonly(materials),
    bondTypes: readonly(bondTypes),
    loopProfiles: readonly(loopProfiles),
    applicationMethods: readonly(applicationMethods),
    failureModes: readonly(failureModes),
    glossary: readonly(glossary),
    
    // New data (readonly)
    designGuidelines: readonly(designGuidelines),
    qualityTesting: readonly(qualityTesting),
    visualInspection: readonly(visualInspection),
    processOptimization: readonly(processOptimization),
    industryApplications: readonly(industryApplications),
    
    // State
    loading: readonly(loading),
    error: readonly(error),
    loaded: readonly(loaded),
    
    // Methods
    loadData,
    clearCache,
    getGlossaryTerm,
    getMaterial,
    getBondType,
    getLoopProfile,
    getApplicationMethod,
    getFailureMode,
    getIndustryApplication,
    
    // Computed
    materialIds,
    bondTypeIds,
    loopProfileIds,
    applicationMethodIds,
    failureModeIds,
    industryApplicationKeys
  }
}

export default useWireBondingData
