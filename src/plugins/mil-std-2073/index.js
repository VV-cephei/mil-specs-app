/**
 * MIL-STD-2073 Plugin
 * Plugin entry point for Military Packaging Standard
 */

import { MilSpecAdapter } from '@/plugins/specs/adapter.js'
import { specRegistry } from '@/plugins/specs/registry.js'

const milStd2073Plugin = {
  id: 'mil-std-2073',
  name: 'MIL-STD-2073',
  version: '1E',
  description: 'Military Packaging Standard - Preservation, Packing, and Marking',
  icon: 'mdi-package-variant',
  isDefault: true,

  routes: [
    {
      path: '/specs/mil-std-2073',
      name: 'mil-std-2073',
      component: () => import('@/views/specs/MilSpecView.vue'),
      meta: {
        title: 'MIL-STD-2073 Viewer',
        specId: 'mil-std-2073'
      }
    }
  ],

  components: {
    SpecTable: () => import('@/components/milspec/SpecTable.vue')
  },

  composables: {
    useMilSpec: () => import('./composables/useMilSpec.js')
  },

  dataLoader: {
    async loadSection(sectionId) {
      const sectionMap = {
        methods: '/data/mil-std-2073/methods.json',
        cleaning: '/data/mil-std-2073/cleaning.json',
        preservation: '/data/mil-std-2073/preservation.json',
        wrapping: '/data/mil-std-2073/wrapping.json',
        cushioning: '/data/mil-std-2073/cushioning.json',
        containers: '/data/mil-std-2073/containers.json'
      }

      const url = sectionMap[sectionId]
      if (!url) {
        throw new Error(`Unknown section: ${sectionId}`)
      }

      const response = await fetch(url)
      if (!response.ok) {
        throw new Error(`Failed to load ${sectionId}: ${response.statusText}`)
      }
      return response.json()
    }
  },

  adapter: new MilSpecAdapter(),

  fieldDefinitions: {
    methods: [
      { key: 'code', label: 'Method Code', width: '100px' },
      { key: 'description', label: 'Description', width: '400px' },
      { key: 'category', label: 'Category', width: '120px' },
      { key: 'specReference', label: 'MIL-STD Reference', width: '120px' }
    ],
    cleaning: [
      { key: 'code', label: 'Code', width: '100px' },
      { key: 'description', label: 'Description', width: '500px' },
      { key: 'type', label: 'Type', width: '150px' }
    ],
    preservation: [
      { key: 'code', label: 'Code', width: '100px' },
      { key: 'description', label: 'Description', width: '400px' },
      { key: 'materialType', label: 'Material Type', width: '150px' },
      { key: 'application', label: 'Application', width: '200px' }
    ]
  }
}

// Register the plugin
specRegistry.register(milStd2073Plugin)

export default milStd2073Plugin
