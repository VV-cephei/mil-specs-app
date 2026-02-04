<template>
  <div class="wb-toc-wrapper" ref="wrapperRef" :style="placeholderStyle">
    <nav 
      ref="navRef"
      class="wb-toc"
      :class="{ 
        'wb-toc--fixed': isFixed,
        'wb-toc--mobile-open': isMobileOpen 
      }"
      aria-label="Table of contents"
    >
      <!-- Mobile toggle button -->
      <button 
        class="toc-mobile-toggle"
        @click="toggleMobile"
        :aria-expanded="isMobileOpen"
        aria-controls="toc-nav"
      >
        <svg v-if="!isMobileOpen" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="3" y1="12" x2="21" y2="12"></line>
          <line x1="3" y1="6" x2="21" y2="6"></line>
          <line x1="3" y1="18" x2="21" y2="18"></line>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <line x1="18" y1="6" x2="6" y2="18"></line>
          <line x1="6" y1="6" x2="18" y2="18"></line>
        </svg>
        <span class="sr-only">{{ isMobileOpen ? 'Close' : 'Open' }} navigation</span>
      </button>
      
      <!-- Navigation list -->
      <ul id="toc-nav" class="toc-list" :class="{ 'toc-list--visible': isMobileOpen }">
        <li 
          v-for="section in sections" 
          :key="section.id"
          class="toc-item"
        >
          <a
            :href="`#${section.id}`"
            class="toc-link"
            :class="{ 'toc-link--active': activeSection === section.id }"
            @click.prevent="handleNavClick(section.id)"
          >
            <span class="toc-icon" v-if="section.icon" v-html="section.icon"></span>
            <span class="toc-label">{{ section.title }}</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
    validator: (value) => value.every(s => s.id && s.title)
  },
  activeSection: {
    type: String,
    default: ''
  }
})

const emit = defineEmits(['navigate'])

const wrapperRef = ref(null)
const navRef = ref(null)
const isFixed = ref(false)
const isMobileOpen = ref(false)
const navHeight = ref(0)
const originalTop = ref(0)

// Placeholder style to prevent content jump when nav becomes fixed
const placeholderStyle = computed(() => {
  if (isFixed.value && navHeight.value > 0) {
    return { minHeight: `${navHeight.value}px` }
  }
  return {}
})

function handleScroll() {
  if (!wrapperRef.value) return
  
  const wrapperRect = wrapperRef.value.getBoundingClientRect()
  // When the wrapper's top edge reaches the viewport top (or goes above), fix the nav
  isFixed.value = wrapperRect.top <= 0
}

function handleNavClick(sectionId) {
  emit('navigate', sectionId)
  isMobileOpen.value = false
}

function toggleMobile() {
  isMobileOpen.value = !isMobileOpen.value
}

// Close mobile menu on escape
function handleKeydown(event) {
  if (event.key === 'Escape' && isMobileOpen.value) {
    isMobileOpen.value = false
  }
}

function measureNav() {
  if (navRef.value) {
    navHeight.value = navRef.value.offsetHeight
  }
}

onMounted(async () => {
  await nextTick()
  measureNav()
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', measureNav, { passive: true })
  window.addEventListener('keydown', handleKeydown)
  handleScroll() // Check initial position
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', measureNav)
  window.removeEventListener('keydown', handleKeydown)
})
</script>

<style scoped>
.wb-toc-wrapper {
  /* Wrapper maintains space when nav becomes fixed */
}

.wb-toc {
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border-light);
  transition: box-shadow var(--transition-default);
}

.wb-toc--fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 100;
  box-shadow: var(--shadow-md);
}

.toc-mobile-toggle {
  display: none;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  background: transparent;
  border: none;
  color: var(--color-text-primary);
  cursor: pointer;
  border-radius: var(--radius-default);
  transition: background-color var(--transition-fast);
}

.toc-mobile-toggle:hover {
  background-color: var(--color-surface-elevated);
}

.toc-mobile-toggle:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  margin: -1px;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  white-space: nowrap;
  border: 0;
}

.toc-list {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: var(--space-3) var(--space-4);
}

.toc-item {
  margin: 0;
}

.toc-link {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-default);
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.toc-link:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
}

.toc-link:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.toc-link--active {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  font-weight: var(--font-weight-semibold);
}

.toc-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.toc-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

/* Mobile styles */
@media (max-width: 768px) {
  .wb-toc {
    padding: var(--space-2) var(--space-4);
  }
  
  .toc-mobile-toggle {
    display: flex;
  }
  
  .toc-list {
    display: none;
    flex-direction: column;
    align-items: stretch;
    padding: var(--space-4) 0;
    gap: var(--space-1);
  }
  
  .toc-list--visible {
    display: flex;
  }
  
  .toc-link {
    padding: var(--space-3) var(--space-4);
    justify-content: flex-start;
  }
  
  .wb-toc--mobile-open {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: var(--color-surface);
    overflow-y: auto;
    z-index: 1000;
  }
  
  .wb-toc--mobile-open .toc-mobile-toggle {
    position: absolute;
    top: var(--space-2);
    right: var(--space-4);
  }
  
  .wb-toc--mobile-open .toc-list {
    padding-top: var(--space-16);
  }
}
</style>
