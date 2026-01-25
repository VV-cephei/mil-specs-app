<template>
  <v-app :theme="uiStore.theme">
    <!-- Header -->
    <AppHeader @menu-toggle="uiStore.toggleDrawer" />
    
    <!-- Navigation Drawer -->
    <AppNavigation :model-value="uiStore.drawer" @update:model-value="uiStore.setDrawer" />
    
    <!-- Main Content -->
    <v-main>
      <v-container fluid class="pa-0">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </v-container>
    </v-main>
    
    <!-- Footer -->
    <AppFooter />
    
    <!-- Snackbar for notifications -->
    <v-snackbar
      v-model="uiStore.snackbar.show"
      :color="uiStore.snackbar.color"
      :timeout="uiStore.snackbar.timeout"
      location="bottom right"
    >
      {{ uiStore.snackbar.message }}
      <template v-slot:actions>
        <v-btn variant="text" @click="uiStore.hideSnackbar()">
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-app>
</template>

<script setup>
import { onMounted } from 'vue'
import { useUIStore } from '@/stores/ui'
import { useSpecsStore } from '@/stores/specs'
import AppHeader from '@/components/common/AppHeader.vue'
import AppNavigation from '@/components/common/AppNavigation.vue'
import AppFooter from '@/components/common/AppFooter.vue'

const uiStore = useUIStore()
const specsStore = useSpecsStore()

onMounted(async () => {
  // Load MIL-STD-2073 data on app mount
  await specsStore.loadSpecData()
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Global styles */
.v-application {
  font-family: 'Roboto', 'Open Sans', sans-serif;
}

.v-card {
  border-radius: 8px !important;
}

.v-btn {
  text-transform: none !important;
}

/* Custom scrollbar */
::-webkit-scrollbar {
  width: 8px;
  height: 8px;
}

::-webkit-scrollbar-track {
  background: #f1f1f1;
}

::-webkit-scrollbar-thumb {
  background: #888;
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}
</style>
