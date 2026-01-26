<template>
  <header class="app-header">
    <div class="app-header-content">
      <!-- Logo and Title -->
      <router-link to="/" class="app-logo">
        <svg class="app-logo-icon" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1M12,5A3,3 0 0,1 15,8A3,3 0 0,1 12,11A3,3 0 0,1 9,8A3,3 0 0,1 12,5M17.13,17C15.92,18.85 14.11,20.24 12,20.92C9.89,20.24 8.08,18.85 6.87,17C6.53,16.5 6.24,16 6,15.47C6,13.82 8.71,12.47 12,12.47C15.29,12.47 18,13.79 18,15.47C17.76,16 17.47,16.5 17.13,17Z" />
        </svg>
        <span class="app-logo-text">
          <span class="app-logo-title">mil-specs.com</span>
          <span class="app-logo-subtitle">Military Specifications Hub</span>
        </span>
      </router-link>

      <!-- Desktop Search -->
      <div class="header-search" v-if="!mobile">
        <div class="input-group">
          <span class="input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search specifications..."
            class="input"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <!-- Desktop Navigation -->
      <nav class="nav-links" v-if="!mobile">
        <router-link to="/" class="nav-link" exact-active-class="nav-link-active">Home</router-link>
        <router-link to="/tools" class="nav-link" active-class="nav-link-active">Tools</router-link>
        <router-link :to="{ name: 'dd2326-decoder' }" class="nav-link" active-class="nav-link-active">Decoder</router-link>
        <router-link :to="{ name: 'mil-std-202' }" class="nav-link" active-class="nav-link-active">MIL-STD-202</router-link>
        <router-link :to="{ name: 'superseding-lookup' }" class="nav-link" active-class="nav-link-active">Superseding</router-link>
      </nav>

      <!-- Header Actions -->
      <div class="header-actions">
        <!-- Theme Toggle -->
        <button class="header-action-btn" @click="uiStore.toggleTheme" aria-label="Toggle theme">
          <svg v-if="uiStore.theme === 'light'" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,7A5,5 0 0,1 17,12A5,5 0 0,1 12,17A5,5 0 0,1 7,12A5,5 0 0,1 12,7M12,9A3,3 0 0,0 9,12A3,3 0 0,0 12,15A3,3 0 0,0 15,12A3,3 0 0,0 12,9M12,2L14.39,5.42C13.65,5.15 12.84,5 12,5C11.16,5 10.35,5.15 9.61,5.42L12,2M3.34,7L7.5,6.65C6.9,7.16 6.36,7.78 5.94,8.5C5.5,9.24 5.25,10 5.11,10.79L3.34,7M3.36,17L5.12,13.23C5.26,14 5.53,14.78 5.95,15.5C6.37,16.24 6.91,16.86 7.5,17.37L3.36,17M20.65,7L18.88,10.79C18.74,10 18.47,9.23 18.05,8.5C17.63,7.78 17.1,7.15 16.5,6.64L20.65,7M20.64,17L16.5,17.36C17.09,16.85 17.62,16.22 18.04,15.5C18.46,14.77 18.73,14 18.87,13.21L20.64,17M12,22L9.59,18.56C10.33,18.83 11.14,19 12,19C12.82,19 13.63,18.83 14.37,18.56L12,22Z" />
          </svg>
          <svg v-else width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
            <path d="M17.75,4.09L15.22,6.03L16.13,9.09L13.5,7.28L10.87,9.09L11.78,6.03L9.25,4.09L12.44,4L13.5,1L14.56,4L17.75,4.09M21.25,11L19.61,12.25L20.2,14.23L18.5,13.06L16.8,14.23L17.39,12.25L15.75,11L17.81,10.95L18.5,9L19.19,10.95L21.25,11M18.97,15.95C19.8,15.87 20.69,17.05 20.16,17.8C19.84,18.25 19.5,18.67 19.08,19.07C15.17,23 8.84,23 4.94,19.07C1.03,15.17 1.03,8.83 4.94,4.93C5.34,4.53 5.76,4.17 6.21,3.85C6.96,3.32 8.14,4.21 8.06,5.04C7.79,7.9 8.75,10.87 10.95,13.06C13.14,15.26 16.1,16.22 18.97,15.95Z" />
          </svg>
        </button>

        <!-- Mobile Menu Toggle -->
        <button 
          class="mobile-menu-toggle" 
          v-if="mobile"
          @click="mobileMenuOpen = !mobileMenuOpen"
          :aria-expanded="mobileMenuOpen"
          aria-label="Toggle navigation menu"
        >
          <span class="hamburger-icon">
            <span></span>
            <span></span>
            <span></span>
          </span>
        </button>
      </div>
    </div>

    <!-- Mobile Navigation -->
    <nav class="mobile-nav" :class="{ 'is-open': mobileMenuOpen }" v-if="mobile">
      <!-- Mobile Search -->
      <div class="header-search">
        <div class="input-group">
          <span class="input-icon">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M9.5,3A6.5,6.5 0 0,1 16,9.5C16,11.11 15.41,12.59 14.44,13.73L14.71,14H15.5L20.5,19L19,20.5L14,15.5V14.71L13.73,14.44C12.59,15.41 11.11,16 9.5,16A6.5,6.5 0 0,1 3,9.5A6.5,6.5 0 0,1 9.5,3M9.5,5C7,5 5,7 5,9.5C5,12 7,14 9.5,14C12,14 14,12 14,9.5C14,7 12,5 9.5,5Z" />
            </svg>
          </span>
          <input
            type="text"
            v-model="searchQuery"
            placeholder="Search specifications..."
            class="input"
            @keyup.enter="handleSearch"
          />
        </div>
      </div>

      <ul class="nav-links">
        <li><router-link to="/" class="nav-link" @click="mobileMenuOpen = false">Home</router-link></li>
        <li><router-link to="/tools" class="nav-link" @click="mobileMenuOpen = false">Tools</router-link></li>
        <li><router-link :to="{ name: 'dd2326-decoder' }" class="nav-link" @click="mobileMenuOpen = false">Decoder</router-link></li>
        <li><router-link :to="{ name: 'mil-std-202' }" class="nav-link" @click="mobileMenuOpen = false">MIL-STD-202</router-link></li>
        <li><router-link :to="{ name: 'superseding-lookup' }" class="nav-link" @click="mobileMenuOpen = false">Spec Superseding</router-link></li>
      </ul>
    </nav>
  </header>
</template>

<script setup>
import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import { useDisplay } from 'vuetify'

const router = useRouter()
const uiStore = useUIStore()
const { mobile } = useDisplay()
const searchQuery = ref('')
const mobileMenuOpen = ref(false)

watch(mobile, (val) => {
  if (!val) mobileMenuOpen.value = false
})

function handleSearch() {
  if (searchQuery.value.trim()) {
    router.push({
      path: '/specs',
      query: { search: searchQuery.value.trim() }
    })
    mobileMenuOpen.value = false
  }
}
</script>

<style scoped>
/* Input group for search */
.input-group {
  position: relative;
  display: flex;
  align-items: center;
}

.input-icon {
  position: absolute;
  left: 12px;
  color: rgba(255, 255, 255, 0.6);
  display: flex;
  align-items: center;
}

.input {
  width: 100%;
  padding: 8px 12px 8px 40px;
  background-color: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-default, 6px);
  color: var(--color-text-inverse, #fff);
  font-size: var(--font-size-sm, 0.875rem);
  transition: all 0.2s ease;
}

.input::placeholder {
  color: rgba(255, 255, 255, 0.6);
}

.input:hover {
  border-color: rgba(255, 255, 255, 0.3);
}

.input:focus {
  outline: none;
  background-color: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.4);
  box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.1);
}

/* Mobile nav list styling */
.mobile-nav .nav-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.mobile-nav .nav-links li {
  margin: 0;
}
</style>
