<template>
  <div class="die-attach-view">
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner-icon">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        <span>Loading Die Attach Guide...</span>
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
      <DAHeroSection />
      
      <!-- Table of Contents -->
      <DATableOfContents
        :sections="sections"
        :active-section="activeSection"
        @navigate="handleNavigate"
      />
      
      <!-- Main Content Area - 12 Part Deep Dive Structure -->
      <main class="die-attach-content">
        <!-- Part 1: Role of Die Attach in RF vs Digital -->
        <DAOverviewSection
          :overview="overview"
        />
        
        <!-- Part 2: Material Science - Three Main Technologies -->
        <DAMaterialsSection
          :materials="materials"
        />
        
        <!-- Part 3: Process Flow (Generic) -->
        <DAProcessFlowSection
          :process-flow="processFlow"
        />
        
        <!-- Part 4: Tooling & Collet Design -->
        <DAToolingSection
          :tooling="tooling"
        />
        
        <!-- Part 5: Eutectic Bonding Deep Dive -->
        <DAEutecticSection
          :eutectic-bonding="eutecticBonding"
        />
        
        <!-- Part 6: Silver Sintering Process -->
        <DASinteringSection
          :sintering="sintering"
        />
        
        <!-- Part 7: Black Epoxy Phenomenon -->
        <DABlackEpoxySection
          :black-epoxy="blackEpoxy"
        />
        
        <!-- Part 8: Resin Bleed & Bond Line Control -->
        <DABondLineSection
          :bond-line-control="bondLineControl"
        />
        
        <!-- Part 9: RF Quality Standards (MIL-STD-883) -->
        <DAQualityStandardsSection
          :specifications="specifications"
        />
        
        <!-- Part 10: DFM Rules -->
        <DADFMRulesSection
          :dfm-rules="dfmRules"
        />
        
        <!-- Part 11: RF Performance Metrics & Failure Modes -->
        <DAFailureModesSection
          :failure-modes="failureModes"
        />
        
        <!-- Part 12: Future Trends -->
        <DAFutureTrendsSection
          :future-trends="futureTrends"
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
import { useDieAttachData } from '@/composables/useDieAttachData'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

// Components - 12 Part Structure
import {
  DAHeroSection,
  DATableOfContents,
  DAOverviewSection,
  DAMaterialsSection,
  DAProcessFlowSection,
  DAToolingSection,
  DAEutecticSection,
  DASinteringSection,
  DABlackEpoxySection,
  DABondLineSection,
  DAQualityStandardsSection,
  DADFMRulesSection,
  DAFailureModesSection,
  DAFutureTrendsSection
} from '@/components/info/die-attach'

// Section definitions for navigation - 12 Parts
const sections = [
  { id: 'hero', title: 'Overview' },
  { id: 'overview', title: 'Part 1: RF vs Digital' },
  { id: 'materials', title: 'Part 2: Materials' },
  { id: 'process-flow', title: 'Part 3: Process Flow' },
  { id: 'tooling', title: 'Part 4: Tooling' },
  { id: 'eutectic-bonding', title: 'Part 5: Eutectic' },
  { id: 'sintering', title: 'Part 6: Sintering' },
  { id: 'black-epoxy', title: 'Part 7: Black Epoxy' },
  { id: 'bond-line-control', title: 'Part 8: Bond Line' },
  { id: 'quality-standards', title: 'Part 9: Standards' },
  { id: 'dfm-rules', title: 'Part 10: DFM Rules' },
  { id: 'failure-modes', title: 'Part 11: Failures' },
  { id: 'future-trends', title: 'Part 12: Future' }
]

const sectionIds = sections.map(s => s.id)

// Composables - All 12 data sources
const {
  overview,
  materials,
  processFlow,
  tooling,
  eutecticBonding,
  sintering,
  blackEpoxy,
  bondLineControl,
  specifications,
  dfmRules,
  failureModes,
  futureTrends,
  loading,
  error,
  loadData
} = useDieAttachData()

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
.die-attach-view {
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

/* Main Content */
.die-attach-content {
  /* Sections handle their own max-width and padding */
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
  .back-to-top {
    bottom: var(--space-4);
    right: var(--space-4);
    width: 44px;
    height: 44px;
  }
}
</style>
