<template>
  <div class="tools-navigation-view">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Tools Sidebar -->
        <v-col cols="12" md="3" lg="2" class="sidebar-col">
          <v-card class="rounded-0 h-100" elevation="2">
            <v-card-title class="text-subtitle-1 font-weight-bold pa-4 bg-primary" style="color: white;">
              <v-icon icon="mdi-tools" class="mr-2"></v-icon>
              Tools
            </v-card-title>
            <v-divider></v-divider>
            <v-list nav density="compact">
              <v-list-subheader v-if="availableTools.length > 0">
                Available Tools
              </v-list-subheader>
              <v-list-item
                v-for="tool in availableTools"
                :key="tool.path"
                :to="tool.path"
                :active="$route.path === tool.path"
                prepend-icon="mdi-wrench"
                class="tool-item"
              >
                <v-list-item-title>{{ tool.meta?.title || tool.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ tool.meta?.description || tool.description || 'Tool' }}
                </v-list-item-subtitle>
              </v-list-item>
              
              <!-- Coming Soon Placeholders -->
              <v-list-subheader v-if="upcomingTools.length > 0">
                Coming Soon
              </v-list-subheader>
              <v-list-item
                v-for="tool in upcomingTools"
                :key="tool.id"
                disabled
                prepend-icon="mdi-lock"
              >
                <v-list-item-title>{{ tool.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ tool.description }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Tool Content -->
        <v-col cols="12" md="9" lg="10" class="pa-4">
          <router-view v-slot="{ Component }">
            <transition name="fade" mode="out-in">
              <component :is="Component" />
            </transition>
          </router-view>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { specRegistry } from '@/plugins/specs/registry.js'

const route = useRoute()

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
.tools-navigation-view {
  min-height: calc(100vh - 64px);
  background-color: rgb(var(--v-theme-surface));
}

.sidebar-col {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.tool-item {
  margin: 4px 8px;
  border-radius: 8px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
