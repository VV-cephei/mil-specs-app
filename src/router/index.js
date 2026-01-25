import { createRouter, createWebHistory } from 'vue-router'
import { specRegistry } from '@/plugins/specs/registry.js'

// Define routes with lazy loading
const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('@/views/HomeView.vue'),
    meta: { title: 'Home - mil-specs.com' }
  },
  
  // Tools section with nested routes
  {
    path: '/tools',
    name: 'tools',
    component: () => import('@/views/tools/index.vue'),
    meta: { title: 'Tools - mil-specs.com' },
    children: [
      {
        path: '',
        name: 'tools-index',
        component: () => import('@/views/tools/index.vue'),
        meta: { title: 'Select a Tool' }
      },
      {
        path: 'dd2326/generator',
        name: 'dd2326-generator',
        component: () => import('@/views/FormGeneratorView.vue'),
        meta: { title: 'DD Form 2326 Generator - mil-specs.com' }
      },
      {
        path: 'dd2326/decoder',
        name: 'dd2326-decoder',
        component: () => import('@/views/DecoderView.vue'),
        meta: { title: 'DD Form 2326 Decoder - mil-specs.com' }
      }
    ]
  },
  
  // Specs section with nested routes
  {
    path: '/specs',
    name: 'specs',
    component: () => import('@/views/specs/index.vue'),
    meta: { title: 'Specifications - mil-specs.com' },
    children: [
      {
        path: '',
        name: 'specs-index',
        component: () => import('@/views/specs/index.vue'),
        meta: { title: 'Select a Specification' }
      },
      {
        path: 'mil-std-2073',
        name: 'mil-std-2073',
        component: () => import('@/views/MilSpecView.vue'),
        meta: { title: 'MIL-STD-2073 Viewer - mil-specs.com' }
      },
      {
        path: 'mil-std-2073/:section?',
        name: 'mil-std-2073-section',
        component: () => import('@/views/MilSpecView.vue'),
        meta: { title: 'MIL-STD-2073 Viewer' }
      },
      {
        path: 'dd2326',
        name: 'dd2326-spec',
        component: () => import('@/components/dd2326/DD2326Form.vue'),
        meta: { title: 'DD Form 2326 Reference - mil-specs.com' }
      },
      {
        path: 'stp',
        name: 'stp-reference',
        component: () => import('@/views/NotFoundView.vue'),
        meta: { title: 'STP Reference - Coming Soon', disabled: true }
      }
    ]
  },
  
  // Legacy routes for backward compatibility (redirect to new routes)
  {
    path: '/specs',
    redirect: '/specs/mil-std-2073'
  },
  {
    path: '/specs/:section',
    redirect: (to) => `/specs/mil-std-2073?section=${to.params.section}`
  },
  {
    path: '/form-generator',
    redirect: '/tools/dd2326/generator'
  },
  {
    path: '/decoder',
    redirect: '/tools/dd2326/decoder'
  },
  
  // About page
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About - mil-specs.com' }
  },
  
  // 404 catch-all
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/NotFoundView.vue'),
    meta: { title: 'Page Not Found - mil-specs.com' }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  }
})

// Navigation guard for dynamic title and route validation
router.beforeEach((to, from, next) => {
  // Update document title
  document.title = to.meta.title || 'mil-specs.com'
  
  // Check if route is disabled
  if (to.meta.disabled) {
    next({ name: 'not-found' })
    return
  }
  
  next()
})

// Register dynamic routes from plugins after initial setup
export function registerPluginRoutes() {
  try {
    const allRoutes = specRegistry.getAllRoutes()
    
    allRoutes.forEach(route => {
      // Add route to specs or tools section based on path
      if (route.path.startsWith('/specs/')) {
        const parentRoute = router.getRoutes().find(r => r.name === 'specs')
        if (parentRoute) {
          // Check if route already exists
          const existingRoute = parentRoute.children.find(r => r.path === route.path)
          if (!existingRoute) {
            parentRoute.children.push(route)
          }
        }
      } else if (route.path.startsWith('/tools/')) {
        const parentRoute = router.getRoutes().find(r => r.name === 'tools')
        if (parentRoute) {
          const existingRoute = parentRoute.children.find(r => r.path === route.path)
          if (!existingRoute) {
            parentRoute.children.push(route)
          }
        }
      }
    })
    
    console.log('[Router] Registered plugin routes')
  } catch (error) {
    console.error('[Router] Error registering plugin routes:', error)
  }
}

export default router
