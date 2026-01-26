import { specRegistry } from '@/plugins/specs/registry.js'

const toolsExpansionPlugin = {
  id: 'tools-expansion',
  name: 'Tools Expansion',
  description: 'Additional utility tools for MIL-STD-202 and Spec Superseding',
  version: '1.0',
  icon: 'mdi-toolbox',
  routes: [
    {
      path: '/tools/mil-std-202',
      name: 'mil-std-202-tool',
      component: () => import('@/components/tools/MilStd202Tool.vue'),
      meta: { 
        title: 'MIL-STD-202 Viewer',
        description: 'Test Method Standard for Electronic Parts'
      }
    },
    {
      path: '/tools/mil-std-883',
      name: 'mil-std-883',
      component: () => import('@/components/tools/MilStd883Tool.vue'),
      meta: { 
        title: 'MIL-STD-883',
        description: 'Test Methods and Procedures for Microelectronics'
      }
    },
    {
      path: '/tools/superseding-lookup',
      name: 'superseding-lookup',
      component: () => import('@/components/tools/SpecSupersedingTool.vue'),
      meta: { 
        title: 'Spec Superseding Lookup',
        description: 'Check if a specification has been superseded'
      }
    }
  ]
}

// Register the plugin
specRegistry.register(toolsExpansionPlugin)

export default toolsExpansionPlugin