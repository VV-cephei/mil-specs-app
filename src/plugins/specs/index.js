/**
 * Spec Plugin System Entry Point
 * Exports all spec-related utilities
 */

export { SpecRegistry, specRegistry } from './registry.js'
export { BaseSpecAdapter, MilSpecAdapter, DD2326Adapter } from './adapter.js'

/**
 * Load and register all spec plugins
 * @returns {Promise<array>} Array of registered specs
 */
export async function loadSpecPlugins() {
  const plugins = []
  
  try {
    // Dynamically import all spec plugins
    const [milStdPlugin, dd2326Plugin] = await Promise.all([
      import('@/plugins/mil-std-2073/index.js'),
      import('@/plugins/dd2326/index.js')
    ])
    
    // Register plugins
    if (milStdPlugin.default) {
      plugins.push(milStdPlugin.default)
      specRegistry.register(milStdPlugin.default)
    }
    
    if (dd2326Plugin.default) {
      plugins.push(dd2326Plugin.default)
      specRegistry.register(dd2326Plugin.default)
    }
    
  } catch (error) {
    console.error('[SpecPlugins] Error loading plugins:', error)
  }
  
  return plugins
}

/**
 * Register a single spec plugin
 * @param {object} plugin - Plugin definition
 */
export function registerSpecPlugin(plugin) {
  specRegistry.register(plugin)
}
