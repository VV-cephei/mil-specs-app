/**
 * Spec Registry
 * Manages registration and retrieval of specification plugins
 */

export class SpecRegistry {
  constructor() {
    this.plugins = new Map()
    this.components = new Map()
    this.composables = new Map()
    this.dataLoaders = new Map()
    this.routes = []
    this.defaultSpec = null
  }

  /**
   * Register a specification plugin
   * @param {object} spec - Specification plugin definition
   */
  register(spec) {
    if (!spec || !spec.id) {
      console.warn('[SpecRegistry] Attempted to register invalid spec:', spec)
      return
    }

    if (this.plugins.has(spec.id)) {
      console.warn(`[SpecRegistry] Overwriting existing plugin: ${spec.id}`)
    }

    // Store the plugin
    this.plugins.set(spec.id, {
      id: spec.id,
      name: spec.name || spec.id,
      version: spec.version || '1.0',
      description: spec.description || '',
      icon: spec.icon || 'mdi-file-document',
      routes: spec.routes || [],
      components: spec.components || {},
      composables: spec.composables || {},
      dataLoader: spec.dataLoader || null,
      fieldDefinitions: spec.fieldDefinitions || {},
      adapter: spec.adapter || null,
      registeredAt: new Date().toISOString()
    })

    // Register components
    if (spec.components) {
      this._registerComponents(spec.id, spec.components)
    }

    // Register composables
    if (spec.composables) {
      this._registerComposables(spec.id, spec.composables)
    }

    // Register data loader
    if (spec.dataLoader) {
      this.dataLoaders.set(spec.id, spec.dataLoader)
    }

    // Register routes
    if (spec.routes && Array.isArray(spec.routes)) {
      this.routes.push(...spec.routes)
    }

    // Set as default if specified
    if (spec.isDefault) {
      this.defaultSpec = spec.id
    }

    console.log(`[SpecRegistry] Registered plugin: ${spec.name || spec.id} v${spec.version || '1.0'}`)
  }

  /**
   * Register components from a plugin
   * @param {string} specId - Spec ID
   * @param {object} components - Components object
   */
  _registerComponents(specId, components) {
    Object.entries(components).forEach(([name, loader]) => {
      const key = `${specId}/${name}`
      this.components.set(key, {
        specId,
        name,
        loader,
        loaded: false,
        component: null
      })
    })
  }

  /**
   * Register composables from a plugin
   * @param {string} specId - Spec ID
   * @param {object} composables - Composables object
   */
  _registerComposables(specId, composables) {
    Object.entries(composables).forEach(([name, loader]) => {
      const key = `${specId}/${name}`
      this.composables.set(key, {
        specId,
        name,
        loader,
        loaded: false,
        composable: null
      })
    })
  }

  /**
   * Get a registered spec by ID
   * @param {string} specId - Spec ID
   * @returns {object|null} Spec definition or null
   */
  get(specId) {
    return this.plugins.get(specId) || null
  }

  /**
   * Get all registered specs
   * @returns {array} Array of spec definitions
   */
  getAll() {
    return Array.from(this.plugins.values())
  }

  /**
   * Get the default spec
   * @returns {object|null} Default spec or null
   */
  getDefaultSpec() {
    if (this.defaultSpec) {
      return this.get(this.defaultSpec)
    }
    // Return first registered spec
    const all = this.getAll()
    return all.length > 0 ? all[0] : null
  }

  /**
   * Get a component from a spec
   * @param {string} specId - Spec ID
   * @param {string} componentName - Component name
   * @returns {object|null} Component definition or null
   */
  getComponent(specId, componentName) {
    const key = `${specId}/${componentName}`
    return this.components.get(key) || null
  }

  /**
   * Load and return a component
   * @param {string} specId - Spec ID
   * @param {string} componentName - Component name
   * @returns {Promise<component>|null} Loaded component or null
   */
  async loadComponent(specId, componentName) {
    const componentDef = this.getComponent(specId, componentName)
    if (!componentDef) {
      console.warn(`[SpecRegistry] Component not found: ${specId}/${componentName}`)
      return null
    }

    if (componentDef.loaded && componentDef.component) {
      return componentDef.component
    }

    try {
      if (typeof componentDef.loader === 'function') {
        const module = await componentDef.loader()
        componentDef.component = module.default || module
        componentDef.loaded = true
        return componentDef.component
      } else {
        // Assume it's already a component
        return componentDef.loader
      }
    } catch (error) {
      console.error(`[SpecRegistry] Error loading component ${specId}/${componentName}:`, error)
      return null
    }
  }

  /**
   * Get a composable from a spec
   * @param {string} specId - Spec ID
   * @param {string} composableName - Composable name
   * @returns {object|null} Composable definition or null
   */
  getComposable(specId, composableName) {
    const key = `${specId}/${composableName}`
    return this.composables.get(key) || null
  }

  /**
   * Load and return a composable
   * @param {string} specId - Spec ID
   * @param {string} composableName - Composable name
   * @returns {Promise<function>|null} Loaded composable or null
   */
  async loadComposable(specId, composableName) {
    const composableDef = this.getComposable(specId, composableName)
    if (!composableDef) {
      console.warn(`[SpecRegistry] Composable not found: ${specId}/${composableName}`)
      return null
    }

    if (composableDef.loaded && composableDef.composable) {
      return composableDef.composable
    }

    try {
      if (typeof composableDef.loader === 'function') {
        const module = await composableDef.loader()
        composableDef.composable = module.default || module
        composableDef.loaded = true
        return composableDef.composable
      } else {
        return composableDef.composable
      }
    } catch (error) {
      console.error(`[SpecRegistry] Error loading composable ${specId}/${composableName}:`, error)
      return null
    }
  }

  /**
   * Get the data loader for a spec
   * @param {string} specId - Spec ID
   * @returns {object|null} Data loader or null
   */
  getDataLoader(specId) {
    return this.dataLoaders.get(specId) || null
  }

  /**
   * Get all registered routes
   * @returns {array} Array of route definitions
   */
  getAllRoutes() {
    return this.routes
  }

  /**
   * Get routes for a specific spec
   * @param {string} specId - Spec ID
   * @returns {array} Array of route definitions
   */
  getRoutesForSpec(specId) {
    const spec = this.get(specId)
    return spec ? spec.routes : []
  }

  /**
   * Get tools (routes starting with /tools/)
   * @returns {array} Array of tool definitions
   */
  getTools() {
    return this.routes
      .filter(route => route.path.startsWith('/tools/'))
      .map(route => ({
        ...route,
        specId: this._getSpecIdForRoute(route.path)
      }))
  }

  /**
   * Get specs (routes starting with /specs/)
   * @returns {array} Array of spec definitions
   */
  getSpecs() {
    return this.getAll()
  }

  /**
   * Helper to get spec ID from route path
   * @param {string} path - Route path
   * @returns {string} Spec ID
   */
  _getSpecIdForRoute(path) {
    // Extract spec ID from paths like /tools/dd2326/generator or /specs/mil-std-2073
    const match = path.match(/^\/(tools|specs)\/([^/]+)/)
    if (match) {
      return match[2]
    }
    return null
  }

  /**
   * Check if a spec is registered
   * @param {string} specId - Spec ID
   * @returns {boolean} True if registered
   */
  has(specId) {
    return this.plugins.has(specId)
  }

  /**
   * Unregister a spec
   * @param {string} specId - Spec ID
   */
  unregister(specId) {
    const spec = this.plugins.get(specId)
    if (!spec) return

    // Remove components
    for (const [key, comp] of this.components) {
      if (comp.specId === specId) {
        this.components.delete(key)
      }
    }

    // Remove composables
    for (const [key, comp] of this.composables) {
      if (comp.specId === specId) {
        this.composables.delete(key)
      }
    }

    // Remove data loader
    this.dataLoaders.delete(specId)

    // Remove routes
    this.routes = this.routes.filter(route => {
      const routeSpecId = this._getSpecIdForRoute(route.path)
      return routeSpecId !== specId
    })

    // Remove plugin
    this.plugins.delete(specId)

    if (this.defaultSpec === specId) {
      this.defaultSpec = null
    }

    console.log(`[SpecRegistry] Unregistered plugin: ${specId}`)
  }

  /**
   * Get statistics about registered specs
   * @returns {object} Stats object
   */
  getStats() {
    return {
      totalSpecs: this.plugins.size,
      totalComponents: this.components.size,
      totalComposables: this.composables.size,
      totalRoutes: this.routes.length,
      specs: Array.from(this.plugins.keys())
    }
  }
}

// Export singleton instance
export const specRegistry = new SpecRegistry()
