<template>
  <div class="tools-layout">
    <!-- Mobile Toggle Button -->
    <button
      v-if="isMobile"
      class="mobile-sidebar-toggle btn btn-primary"
      @click="drawer = !drawer"
      aria-label="Toggle tools menu"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
      </svg>
    </button>

    <!-- Tools Sidebar -->
    <aside 
      class="tools-sidebar" 
      :class="{ 'is-open': drawer, 'is-mobile': isMobile }"
    >
      <div class="sidebar-header">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
        </svg>
        <span>Tools</span>
      </div>

      <nav class="sidebar-nav-list">
        <!-- Available Tools Section -->
        <div class="sidebar-section" v-if="availableTools.length > 0">
          <div class="sidebar-section-title">Available Tools</div>
          <router-link
            v-for="tool in availableTools"
            :key="tool.path"
            :to="tool.path"
            class="sidebar-nav-item"
            :class="{ 'is-active': $route.path === tool.path }"
            @click="isMobile && (drawer = false)"
          >
            <svg class="sidebar-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
            <div class="sidebar-nav-content">
              <span class="sidebar-nav-title">{{ tool.meta?.title || tool.name }}</span>
              <span class="sidebar-nav-subtitle">{{ tool.meta?.description || tool.description || 'Tool' }}</span>
            </div>
          </router-link>
        </div>

        <!-- Coming Soon Section -->
        <div class="sidebar-section" v-if="upcomingTools.length > 0">
          <div class="sidebar-section-title">Coming Soon</div>
          <div
            v-for="tool in upcomingTools"
            :key="tool.id"
            class="sidebar-nav-item is-disabled"
          >
            <svg class="sidebar-nav-icon" xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
            <div class="sidebar-nav-content">
              <span class="sidebar-nav-title">{{ tool.name }}</span>
              <span class="sidebar-nav-subtitle">{{ tool.description }}</span>
            </div>
          </div>
        </div>
      </nav>
    </aside>

    <!-- Overlay for mobile -->
    <div 
      v-if="isMobile && drawer" 
      class="sidebar-overlay"
      @click="drawer = false"
    ></div>

    <!-- Tool Content -->
    <main class="tools-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRoute } from 'vue-router'
import { specRegistry } from '@/plugins/specs/registry.js'

const route = useRoute()
const drawer = ref(false)
const isMobile = ref(false)

// Check if mobile
const checkMobile = () => {
  isMobile.value = window.innerWidth < 768
  if (!isMobile.value) {
    drawer.value = false
  }
}

onMounted(() => {
  checkMobile()
  window.addEventListener('resize', checkMobile)
})

onUnmounted(() => {
  window.removeEventListener('resize', checkMobile)
})

// Get available tools from registry
const availableTools = computed(() => {
  const tools = specRegistry.getAllRoutes()
    .filter(r => r.path.startsWith('/tools/'))
    .map(r => ({
      ...r,
      specId: extractSpecId(r.path)
    }))
  
  return tools
})

// Upcoming tools (not yet implemented)
const upcomingTools = computed(() => [
  { id: 'form-compare', name: 'Form Compare', description: 'Compare DD Form 2326 documents' },
  { id: 'batch-generator', name: 'Batch Generator', description: 'Generate multiple forms at once' },
  { id: 'export-tool', name: 'Export Tool', description: 'Export forms to PDF/Excel' }
])

// Helper to extract spec ID from path
function extractSpecId(path) {
  const match = path.match(/^\/tools\/([^/]+)/)
  return match ? match[1] : null
}
</script>

<style scoped>
.tools-layout {
  display: flex;
  min-height: calc(100vh - 64px);
  background-color: var(--color-surface);
}

/* Sidebar Styles */
.tools-sidebar {
  width: 280px;
  min-width: 280px;
  background: linear-gradient(180deg, var(--color-primary-900) 0%, var(--color-primary-800) 100%);
  color: var(--color-white);
  display: flex;
  flex-direction: column;
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
  z-index: 100;
}

.tools-sidebar.is-mobile {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  transform: translateX(-100%);
  transition: transform var(--transition-normal);
  box-shadow: var(--shadow-xl);
}

.tools-sidebar.is-mobile.is-open {
  transform: translateX(0);
}

.sidebar-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-5) var(--space-4);
  background: rgba(0, 0, 0, 0.2);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.sidebar-header svg {
  color: var(--color-accent-400);
}

/* Sidebar Navigation */
.sidebar-nav-list {
  flex: 1;
  padding: var(--space-4) 0;
  overflow-y: auto;
}

.sidebar-section {
  margin-bottom: var(--space-4);
}

.sidebar-section-title {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  color: rgba(255, 255, 255, 0.5);
}

.sidebar-nav-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3) var(--space-4);
  margin: var(--space-1) var(--space-2);
  border-radius: var(--radius-md);
  color: rgba(255, 255, 255, 0.85);
  text-decoration: none;
  transition: all var(--transition-fast);
  cursor: pointer;
}

.sidebar-nav-item:hover {
  background: rgba(255, 255, 255, 0.1);
  color: var(--color-white);
}

.sidebar-nav-item.is-active {
  background: rgba(255, 255, 255, 0.15);
  color: var(--color-white);
  border-left: 3px solid var(--color-accent-400);
  margin-left: calc(var(--space-2) - 3px);
}

.sidebar-nav-item.is-active .sidebar-nav-icon {
  color: var(--color-accent-400);
}

.sidebar-nav-item.is-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.sidebar-nav-item.is-disabled:hover {
  background: transparent;
}

.sidebar-nav-icon {
  flex-shrink: 0;
  margin-top: 2px;
  color: rgba(255, 255, 255, 0.6);
}

.sidebar-nav-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-0-5);
  min-width: 0;
}

.sidebar-nav-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  line-height: 1.3;
}

.sidebar-nav-subtitle {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.5);
  line-height: 1.4;
}

/* Mobile Toggle Button */
.mobile-sidebar-toggle {
  position: fixed;
  bottom: var(--space-4);
  left: var(--space-4);
  z-index: 200;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: var(--shadow-lg);
}

/* Overlay */
.sidebar-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 99;
  backdrop-filter: blur(2px);
}

/* Main Content */
.tools-content {
  flex: 1;
  padding: var(--space-6);
  min-width: 0;
  background-color: var(--color-surface);
}

/* Transitions */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Responsive */
@media (max-width: 767px) {
  .tools-sidebar:not(.is-mobile) {
    display: none;
  }
  
  .tools-content {
    padding: var(--space-4);
  }
}

/* Dark mode adjustments */
[data-theme="dark"] .tools-sidebar {
  background: linear-gradient(180deg, var(--color-neutral-900) 0%, var(--color-neutral-800) 100%);
}

[data-theme="dark"] .sidebar-header {
  background: rgba(0, 0, 0, 0.3);
}
</style>
