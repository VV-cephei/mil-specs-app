/**
 * useSpecRegistry Composable
 * Core composable for interacting with the spec registry
 */

import { ref, computed, onMounted } from 'vue'
import { specRegistry, SpecRegistry } from '@/plugins/specs/registry.js'
import { loadSpecPlugins } from '@/plugins/specs/index.js'

export function useSpecRegistry() {
  const initialized = ref(false)
  const initializing = ref(false)
  const error = ref(null)

  // All registered specs
  const specs = computed(() => specRegistry.getAll())

  // Available specs (with routes)
  const availableSpecs = computed(() => {
    return specs.value.filter(spec => spec.routes && spec.routes.length > 0)
  })

  // All registered routes
  const routes = computed(() => specRegistry.getAllRoutes())

  // Tools (routes starting with /tools/)
  const tools = computed(() => {
    return routes.value.filter(r => r.path.startsWith('/tools/'))
  })

  // Spec views (routes starting with /specs/)
  const specViews = computed(() => {
    return routes.value.filter(r => r.path.startsWith('/specs/'))
  })

  // Registry stats
  const stats = computed(() => specRegistry.getStats())

  /**
   * Initialize the spec registry by loading all plugins
   */
  async function initialize() {
    if (initialized.value || initializing.value) {
      return
    }

    initializing.value = true
    error.value = null

    try {
      await loadSpecPlugins()
      initialized.value = true
      console.log('[useSpecRegistry] Registry initialized with', specs.value.length, 'specs')
    } catch (e) {
      error.value = e.message
      console.error('[useSpecRegistry] Initialization error:', e)
    } finally {
      initializing.value = false
    }
  }

  /**
   * Get a spec by ID
   * @param {string} specId - Spec ID
   * @returns {object|null} Spec or null
   */
  function getSpec(specId) {
    return specRegistry.get(specId)
  }

  /**
   * Get a component from a spec
   * @param {string} specId - Spec ID
   * @param {string} componentName - Component name
   * @returns {object|null} Component definition or null
   */
  function getComponent(specId, componentName) {
    return specRegistry.getComponent(specId, componentName)
  }

  /**
   * Load a component from a spec
   * @param {string} specId - Spec ID
   * @param {string} componentName - Component name
   * @returns {Promise<component>|null} Loaded component
   */
  async function loadComponent(specId, componentName) {
    return specRegistry.loadComponent(specId, componentName)
  }

  /**
   * Get a composable from a spec
   * @param {string} specId - Spec ID
   * @param {string} composableName - Composable name
   * @returns {object|null} Composable definition or null
   */
  function getComposable(specId, composableName) {
    return specRegistry.getComposable(specId, composableName)
  }

  /**
   * Load a composable from a spec
   * @param {string} specId - Spec ID
   * @param {string} composableName - Composable name
   * @returns {Promise<function>|null} Loaded composable
   */
  async function loadComposable(specId, composableName) {
    return specRegistry.loadComposable(specId, composableName)
  }

  /**
   * Get the data loader for a spec
   * @param {string} specId - Spec ID
   * @returns {object|null} Data loader or null
   */
  function getDataLoader(specId) {
    return specRegistry.getDataLoader(specId)
  }

  /**
   * Register a new spec plugin
   * @param {object} plugin - Plugin definition
   */
  function registerSpec(plugin) {
    specRegistry.register(plugin)
  }

  /**
   * Check if a spec is registered
   * @param {string} specId - Spec ID
   * @returns {boolean} True if registered
   */
  function hasSpec(specId) {
    return specRegistry.has(specId)
  }

  /**
   * Get routes for a specific spec
   * @param {string} specId - Spec ID
   * @returns {array} Array of route definitions
   */
  function getRoutesForSpec(specId) {
    return specRegistry.getRoutesForSpec(specId)
  }

  /**
   * Get tools for a specific spec
   * @param {string} specId - Spec ID
   * @returns {array} Array of tool routes
   */
  function getToolsForSpec(specId) {
    return routes.value.filter(r => {
      const match = r.path.match(/^\/tools\/([^/]+)/)
      return match && match[1] === specId
    })
  }

  // Auto-initialize on mount if not already initialized
  onMounted(() => {
    if (!initialized.value) {
      initialize()
    }
  })

  return {
    // State
    initialized,
    initializing,
    error,
    // Computed
    specs,
    availableSpecs,
    routes,
    tools,
    specViews,
    stats,
    // Methods
    initialize,
    getSpec,
    getComponent,
    loadComponent,
    getComposable,
    loadComposable,
    getDataLoader,
    registerSpec,
    hasSpec,
    getRoutesForSpec,
    getToolsForSpec
  }
}
