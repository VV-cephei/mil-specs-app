<template>
  <div class="tools-hub">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-content container">
        <nav class="breadcrumb">
          <span class="breadcrumb-item">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
          </span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Tools</span>
        </nav>
        <h1 class="page-title">Tools Hub</h1>
        <p class="page-description">
          Access our suite of military specification tools and utilities.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="page-body">
      <div class="page-body-content container">
        <!-- Available Tools Section -->
        <section class="section-sm">
          <div class="section-header section-header-left">
            <span class="section-eyebrow">Ready to Use</span>
            <h2 class="section-title section-title-sm">Available Tools</h2>
          </div>
          
          <div class="feature-grid-3">
            <router-link 
              v-for="tool in availableTools" 
              :key="tool.path"
              :to="tool.path"
              class="card card-interactive tool-card"
            >
              <div class="card-body">
                <div class="tool-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                  </svg>
                </div>
                <h3 class="card-title">{{ tool.meta?.title || tool.name }}</h3>
                <p class="card-text">{{ tool.meta?.description || tool.description || 'No description available.' }}</p>
                <div class="tool-action">
                  <span class="btn btn-primary btn-sm">Launch Tool</span>
                </div>
              </div>
            </router-link>
          </div>
        </section>

        <!-- Coming Soon Section -->
        <section class="section-sm">
          <div class="section-header section-header-left">
            <span class="section-eyebrow">In Development</span>
            <h2 class="section-title section-title-sm">Coming Soon</h2>
          </div>
          
          <div class="feature-grid-3">
            <div 
              v-for="tool in upcomingTools" 
              :key="tool.id"
              class="card card-disabled"
            >
              <div class="card-body">
                <div class="tool-icon tool-icon-disabled">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                  </svg>
                </div>
                <h3 class="card-title card-title-disabled">{{ tool.name }}</h3>
                <p class="card-text card-text-disabled">{{ tool.description }}</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { specRegistry } from '@/plugins/specs/registry.js'

// Get available tools from registry
const availableTools = computed(() => {
  return specRegistry.getAllRoutes()
    .filter(r => r.path.startsWith('/tools/'))
    .map(r => ({
      ...r,
      // Ensure we have a title and description
      name: r.name,
      path: r.path,
      meta: r.meta || {}
    }))
})

// Upcoming tools
const upcomingTools = computed(() => [
  { id: 'form-compare', name: 'Form Compare', description: 'Compare DD Form 2326 documents' },
  { id: 'batch-generator', name: 'Batch Generator', description: 'Generate multiple forms at once' },
  { id: 'export-tool', name: 'Export Tool', description: 'Export forms to PDF/Excel' }
])
</script>

<style scoped>
.tools-hub {
  min-height: 100vh;
  background-color: var(--color-background);
}

.tool-card {
  text-decoration: none;
  display: block;
  height: 100%;
}

.tool-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin-bottom: var(--space-4);
  background-color: var(--color-primary-50);
  color: var(--color-primary-500);
  border-radius: var(--radius-lg);
}

.tool-icon-disabled {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-400);
}

.tool-action {
  margin-top: var(--space-4);
}

.card-disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.card-title-disabled {
  color: var(--color-text-secondary);
}

.card-text-disabled {
  color: var(--color-text-disabled);
}
</style>