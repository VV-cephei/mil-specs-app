<template>
  <div class="specs-navigation-view">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Specs Sidebar -->
        <v-col cols="12" md="3" lg="2" class="sidebar-col">
          <v-card class="rounded-0 h-100" elevation="2">
            <v-card-title class="text-subtitle-1 font-weight-bold pa-4 bg-primary" style="color: white;">
              <v-icon icon="mdi-book-open-variant" class="mr-2"></v-icon>
              Specifications
            </v-card-title>
            <v-divider></v-divider>
            <v-list nav density="compact">
              <v-list-subheader v-if="availableSpecs.length > 1">
                Available Specifications
              </v-list-subheader>
              <v-list-item
                v-for="spec in availableSpecs"
                :key="spec.id"
                :to="getSpecRoute(spec.id)"
                :active="$route.params.specId === spec.id || $route.path === getSpecRoute(spec.id)"
                prepend-icon="mdi-document"
                class="spec-item"
              >
                <v-list-item-title>{{ spec.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  v{{ spec.version }}
                </v-list-item-subtitle>
              </v-list-item>
              
              <!-- Coming Soon Placeholders -->
              <v-list-subheader v-if="upcomingSpecs.length > 0">
                Coming Soon
              </v-list-subheader>
              <v-list-item
                v-for="spec in upcomingSpecs"
                :key="spec.id"
                disabled
                prepend-icon="mdi-lock"
              >
                <v-list-item-title>{{ spec.name }}</v-list-item-title>
                <v-list-item-subtitle class="text-caption">
                  {{ spec.description }}
                </v-list-item-subtitle>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Spec Content -->
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

// Get available specs from registry
const availableSpecs = computed(() => {
  return specRegistry.getAll().map(spec => ({
    id: spec.id,
    name: spec.name,
    version: spec.version,
    description: spec.description,
    icon: spec.icon
  }))
})

// Upcoming specs (not yet implemented)
const upcomingSpecs = computed(() => [
  { id: 'mil-std-129', name: 'MIL-STD-129', description: 'Military Marking for Shipment and Storage' },
  { id: 'mil-std-130', name: 'MIL-STD-130', description: 'NATO Identification Marking' },
  { id: 'astm-d3951', name: 'ASTM D3951', description: 'Standard Practice for Packaging' },
  { id: 'stp-reference', name: 'STP Reference', description: 'Standard Technical Procedures' }
])

// Get route for a spec
function getSpecRoute(specId) {
  return `/specs/${specId}`
}
</script>

<style scoped>
.specs-navigation-view {
  min-height: calc(100vh - 64px);
  background-color: rgb(var(--v-theme-surface));
}

.sidebar-col {
  position: sticky;
  top: 64px;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

.spec-item {
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
