<template>
  <div class="smt-manufacturing-view">
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner-icon">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        <span>Loading SMT Manufacturing Guide...</span>
      </div>
    </div>
    
    <!-- Error State -->
    <div v-else-if="error" class="error-state">
      <div class="error-content">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="8" x2="12" y2="12"></line>
          <line x1="12" y1="16" x2="12.01" y2="16"></line>
        </svg>
        <h2>Error Loading Data</h2>
        <p>{{ error.message }}</p>
        <button @click="retryLoad" class="retry-btn">Try Again</button>
      </div>
    </div>
    
    <!-- Main Content -->
    <template v-else>
      <!-- Hero Section -->
      <SMTHeroSection />
      
      <!-- Table of Contents -->
      <SMTTableOfContents 
        :sections="sections"
        :activeSection="activeSection"
        @navigate="handleNavigate"
      />
      
      <!-- Process Overview Section -->
      <div class="smt-content">
        <SMTOverviewSection />
      </div>
      
      <!-- Main Content Area -->
      <main class="smt-content">
        <!-- Materials Section -->
        <SMTMaterialsSection 
          :substrates="substrates"
          :solderAlloys="solderAlloys"
          :surfaceFinishes="surfaceFinishes"
        />
        
        <!-- Solder Paste Section -->
        <SMTSolderPasteSection 
          :solderPaste="solderPaste"
        />
        
        <!-- Stencil Design Section -->
        <SMTStencilSection 
          :stencilDesign="stencilDesign"
        />
        
        <!-- Reflow Section -->
        <SMTReflowSection 
          :reflowProfiles="reflowProfiles"
        />
        
        <!-- Defects Section -->
        <SMTDefectsSection 
          :defects="defects"
        />
        
        <!-- Tools Section -->
        <SMTToolsSection />
        
        <!-- Standards Section -->
        <SMTStandardsSection 
          :glossary="glossary"
        />
        
        <!-- Glossary Section -->
        <SMTGlossarySection 
          :glossary="glossary"
        />
      </main>
      
      <!-- Back to Top Button -->
      <button 
        v-show="showBackToTop"
        class="back-to-top"
        @click="scrollToTop"
        aria-label="Back to top"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useSMTData } from '@/composables/useSMTData'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

// Import SMT components
import {
  SMTHeroSection,
  SMTOverviewSection,
  SMTTableOfContents,
  SMTMaterialsSection,
  SMTSolderPasteSection,
  SMTStencilSection,
  SMTReflowSection,
  SMTDefectsSection,
  SMTStandardsSection,
  SMTToolsSection,
  SMTGlossarySection
} from '@/components/info/smt'

// Section definitions for navigation
const sections = [
  { id: 'hero', title: 'Overview' },
  { id: 'process-overview', title: 'Process Flow' },
  { id: 'materials', title: 'Materials' },
  { id: 'solder-paste', title: 'Solder Paste' },
  { id: 'stencil-design', title: 'Stencil Design' },
  { id: 'reflow', title: 'Reflow' },
  { id: 'defects', title: 'Defects' },
  { id: 'tools', title: 'Tools' },
  { id: 'inspection', title: 'Standards' },
  { id: 'glossary', title: 'Glossary' }
]

const sectionIds = sections.map(s => s.id)

// Composables
const {
  // Raw data objects
  substrates,
  solderAlloys,
  surfaceFinishes,
  solderPaste,
  stencilDesign,
  reflowProfiles,
  defects,
  glossary,
  // State
  loading,
  error,
  loadData
} = useSMTData()

const { activeSection } = useScrollSpy(sectionIds, {
  offset: 120,
  rootMargin: '-120px 0px -50% 0px'
})

const { scrollToSection, scrollToTop: smoothScrollToTop } = useSmoothScroll({
  duration: 600,
  offset: 100
})

// Back to top button visibility
const showBackToTop = ref(false)

function handleScroll() {
  showBackToTop.value = window.scrollY > 500
}

function handleNavigate(sectionId) {
  scrollToSection(sectionId)
}

function scrollToTop() {
  smoothScrollToTop()
}

async function retryLoad() {
  await loadData(true)
}

// Lifecycle
onMounted(async () => {
  await loadData()
  window.addEventListener('scroll', handleScroll, { passive: true })
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
.smt-manufacturing-view {
  min-height: 100vh;
  background-color: var(--color-background);
}

/* Loading State */
.loading-overlay {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-background);
}

.loading-spinner {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  color: var(--color-text-secondary);
}

.spinner-icon {
  animation: spin 1s linear infinite;
  color: var(--color-primary-500);
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* Error State */
.error-state {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: var(--color-background);
}

.error-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  text-align: center;
  padding: var(--space-8);
  max-width: 400px;
}

.error-content svg {
  color: var(--color-error-main);
}

.error-content h2 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.error-content p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
}

.retry-btn {
  padding: var(--space-3) var(--space-6);
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  border: none;
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.retry-btn:hover {
  background-color: var(--color-primary-600);
}

.retry-btn:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

/* Hero Section */
.smt-hero {
  position: relative;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 50%,
    rgba(51, 65, 85, 0.85) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  text-align: center;
  padding: var(--space-8);
  max-width: 800px;
}

.hero-content h1 {
  font-size: var(--font-size-4xl);
  font-weight: var(--font-weight-bold);
  color: white;
  margin: 0 0 var(--space-4) 0;
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: rgba(255, 255, 255, 0.9);
  margin: 0 0 var(--space-8) 0;
}

.hero-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  flex-wrap: wrap;
}

.stat {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-400);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}

/* Table of Contents */
.smt-toc {
  position: sticky;
  top: 0;
  z-index: 40;
  background-color: var(--color-surface);
  border-bottom: 1px solid var(--color-border);
  box-shadow: var(--shadow-sm);
}

.toc-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-3) var(--space-6);
  display: flex;
  align-items: center;
  gap: var(--space-6);
  overflow-x: auto;
}

.toc-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0;
  white-space: nowrap;
}

.toc-list {
  display: flex;
  gap: var(--space-1);
  list-style: none;
  margin: 0;
  padding: 0;
}

.toc-list a {
  display: block;
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-decoration: none;
  border-radius: var(--radius-default);
  white-space: nowrap;
  transition: all var(--transition-fast);
}

.toc-list a:hover {
  color: var(--color-text-primary);
  background-color: var(--color-background-alt);
}

.toc-list a.active {
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  font-weight: var(--font-weight-medium);
}

/* Main Content */
.smt-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: var(--space-8) var(--space-6);
}

/* Sections */
.smt-section {
  margin-bottom: var(--space-12);
  scroll-margin-top: 80px;
}

.section-header {
  margin-bottom: var(--space-6);
}

.section-header h2 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.section-header p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Placeholder styling for Phase 1 */
.section-placeholder {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.section-placeholder p {
  margin: 0 0 var(--space-4) 0;
  color: var(--color-text-secondary);
}

.section-placeholder ul {
  margin: 0 0 var(--space-4) 0;
  padding-left: var(--space-6);
  color: var(--color-text-secondary);
}

.section-placeholder li {
  margin-bottom: var(--space-2);
}

.section-placeholder .data-loaded {
  color: var(--color-success-main);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  margin: 0;
  padding-top: var(--space-4);
  border-top: 1px solid var(--color-border);
}

/* Back to Top Button */
.back-to-top {
  position: fixed;
  bottom: var(--space-6);
  right: var(--space-6);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  box-shadow: var(--shadow-lg);
  transition: all var(--transition-default);
  z-index: 50;
}

.back-to-top:hover {
  background-color: var(--color-primary-600);
  transform: translateY(-2px);
}

.back-to-top:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content h1 {
    font-size: var(--font-size-2xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-base);
  }
  
  .hero-stats {
    gap: var(--space-4);
  }
  
  .stat-value {
    font-size: var(--font-size-2xl);
  }
  
  .back-to-top {
    bottom: var(--space-4);
    right: var(--space-4);
    width: 44px;
    height: 44px;
  }
  
  .smt-content {
    padding: var(--space-6) var(--space-4);
  }
  
  .section-header h2 {
    font-size: var(--font-size-xl);
  }
  
  .section-header p {
    font-size: var(--font-size-base);
  }
}
</style>