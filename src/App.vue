<template>
  <v-app :theme="uiStore.theme" class="page-wrapper" :data-theme="uiStore.theme">
    <!-- Header -->
    <AppHeader />
    
    <!-- Main Content -->
    <main class="main-content">
      <router-view v-slot="{ Component }">
        <transition name="fade" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    
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
import AppFooter from '@/components/common/AppFooter.vue'

const uiStore = useUIStore()
const specsStore = useSpecsStore()

onMounted(async () => {
  // Load MIL-STD-2073 data on app mount
  try {
    await specsStore.loadAllSections('mil-std-2073')
  } catch (error) {
    console.warn('[App] Could not preload spec data:', error)
  }
})
</script>

<style>
/* Import the design system styles */
@import '@/assets/styles/main.css';

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
  font-family: var(--font-family-sans, 'Inter', 'Roboto', 'Open Sans', sans-serif);
}

.v-card {
  border-radius: var(--radius-lg, 8px) !important;
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
  background: var(--color-neutral-100, #f1f1f1);
}

::-webkit-scrollbar-thumb {
  background: var(--color-neutral-400, #888);
  border-radius: var(--radius-sm, 4px);
}

::-webkit-scrollbar-thumb:hover {
  background: var(--color-neutral-600, #555);
}

/* Ensure page wrapper works with Vuetify */
.v-application.page-wrapper {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.v-application .main-content {
  flex: 1 0 auto;
}
</style>
