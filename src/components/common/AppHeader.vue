<template>
  <v-app-bar color="primary" elevation="2">
    <!-- Logo and Title -->
    <v-app-bar-title class="font-weight-bold d-flex align-center">
      <v-icon icon="mdi-shield-air" size="28" class="mr-2"></v-icon>
      <span class="d-none d-sm-inline">mil-specs.com</span>
      <span class="d-sm-none">mil-specs</span>
    </v-app-bar-title>
    
    <!-- Global Search -->
    <v-text-field
      v-model="searchQuery"
      prepend-inner-icon="mdi-magnify"
      label="Search specifications..."
      single-line
      hide-details
      density="compact"
      variant="outlined"
      class="mx-4"
      style="max-width: 400px"
      @keyup.enter="handleSearch"
    ></v-text-field>
    
    <v-spacer></v-spacer>
    
    <!-- Theme Toggle -->
    <v-btn icon @click="uiStore.toggleTheme" class="mr-2">
      <v-icon>{{ uiStore.theme === 'light' ? 'mdi-weather-sunny' : 'mdi-weather-night' }}</v-icon>
    </v-btn>
    
    <!-- Navigation Links (Desktop) -->
    <div class="d-none d-md-flex align-center">
      <v-btn to="/" variant="text" class="mx-1">Home</v-btn>
      <v-btn to="/specs" variant="text" class="mx-1">MIL-STD-2073</v-btn>
      <v-btn to="/form-generator" variant="text" class="mx-1">DD Form 2326</v-btn>
      <v-btn to="/decoder" variant="text" class="mx-1">Decoder</v-btn>
    </div>
    
    <!-- Mobile Menu Button -->
    <v-btn icon @click="$emit('menu-toggle')" class="d-md-none">
      <v-icon>mdi-menu</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'

const emit = defineEmits(['menu-toggle'])
const router = useRouter()
const uiStore = useUIStore()
const searchQuery = ref('')

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/specs',
      query: { search: searchQuery.value.trim() }
    })
  }
}
</script>

<style scoped>
.v-app-bar {
  background: linear-gradient(135deg, #1a237e 0%, #283593 100%) !important;
}
</style>
