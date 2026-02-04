<template>
  <div class="wire-bonding-view">
    <!-- Loading State -->
    <div v-if="loading" class="loading-overlay">
      <div class="loading-spinner">
        <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="spinner-icon">
          <path d="M21 12a9 9 0 1 1-6.219-8.56"></path>
        </svg>
        <span>Loading Wire Bonding Guide...</span>
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
      <WBHeroSection />
      
      <!-- Table of Contents -->
      <WBTableOfContents
        :sections="sections"
        :active-section="activeSection"
        @navigate="handleNavigate"
      />
      
      <!-- Main Content Area -->
      <main class="wire-bonding-content">
        <!-- Design Principles Section (NEW - Before you bond) -->
        <WBDesignPrinciplesSection
          :design-guidelines="designGuidelines"
        />
        
        <!-- Materials Section -->
        <WBMaterialsSection
          :materials="materials"
          :glossary="glossary"
        />
        
        <!-- Shapes Section -->
        <WBShapesSection />
        
        <!-- Bond Types Section -->
        <WBBondTypesSection
          :bond-types="bondTypes"
        />
        
        <!-- Methods Section -->
        <WBMethodsSection
          :methods="applicationMethods"
        />
        
        <!-- Loop Profiles Section -->
        <WBLoopProfilesSection
          :loop-profiles="loopProfiles"
        />
        
        <!-- Process Optimization Section (NEW - How to optimize) -->
        <WBProcessOptimizationSection
          :process-optimization="processOptimization"
        />
        
        <!-- Quality Testing Section (NEW - MIL-STD-883, JEDEC, IPC) -->
        <WBQualityTestingSection
          :quality-testing="qualityTesting"
        />
        
        <!-- Visual Inspection Section (NEW - Inspection criteria) -->
        <WBVisualInspectionSection
          :visual-inspection="visualInspection"
        />
        
        <!-- Reliability Section -->
        <WBReliabilitySection
          :failure-modes="failureModes"
        />
        
        <!-- Industry Applications Section (NEW - RF, Power, Auto, etc.) -->
        <WBIndustryApplicationsSection
          :industry-applications="industryApplications"
        />
        
        <!-- Interactive Tools Section (NEW) -->
        <section id="interactive-tools" class="wb-section">
          <div class="section-header">
            <h2>Interactive Tools</h2>
            <p>Practical calculators and wizards to assist with wire bonding decisions</p>
          </div>
          <TabContainer :tabs="toolTabs" v-model="activeToolTab" variant="pills">
            <template #pull-calculator>
              <PullTestCalculator />
            </template>
            <template #wire-wizard>
              <WireSelectionWizard />
            </template>
            <template #inspection-checklist>
              <InspectionChecklist />
            </template>
          </TabContainer>
        </section>
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
import { useWireBondingData } from '@/composables/useWireBondingData'
import { useScrollSpy } from '@/composables/useScrollSpy'
import { useSmoothScroll } from '@/composables/useSmoothScroll'

// Components
import {
  WBHeroSection,
  WBTableOfContents,
  WBMaterialsSection,
  WBShapesSection,
  WBMethodsSection,
  WBBondTypesSection,
  WBLoopProfilesSection,
  WBReliabilitySection,
  // New expansion components
  WBDesignPrinciplesSection,
  WBQualityTestingSection,
  WBVisualInspectionSection,
  WBProcessOptimizationSection,
  WBIndustryApplicationsSection,
  // Interactive tool components
  PullTestCalculator,
  WireSelectionWizard,
  InspectionChecklist
} from '@/components/info/wire-bonding'

import TabContainer from '@/components/shared/TabContainer.vue'

// Section definitions for navigation (new logical flow: Design → Application → Quality)
const sections = [
  { id: 'hero', title: 'Overview' },
  { id: 'design-principles', title: 'Design Principles' },
  { id: 'materials', title: 'Wire Materials' },
  { id: 'shapes', title: 'Wire Shapes' },
  { id: 'bond-types', title: 'Bond Types' },
  { id: 'methods', title: 'Application Methods' },
  { id: 'loop-profiles', title: 'Loop Profiles' },
  { id: 'process-optimization', title: 'Process Optimization' },
  { id: 'quality-testing', title: 'Quality Testing' },
  { id: 'visual-inspection', title: 'Visual Inspection' },
  { id: 'reliability', title: 'Reliability & Failures' },
  { id: 'industry-applications', title: 'Industry Applications' },
  { id: 'interactive-tools', title: 'Interactive Tools' }
]

const sectionIds = sections.map(s => s.id)

// Interactive tools tabs
const toolTabs = [
  { id: 'pull-calculator', label: 'Pull Test Calculator' },
  { id: 'wire-wizard', label: 'Wire Selection Wizard' },
  { id: 'inspection-checklist', label: 'Inspection Checklist' }
]

const activeToolTab = ref('pull-calculator')

// Composables
const {
  materials,
  bondTypes,
  loopProfiles,
  applicationMethods,
  failureModes,
  glossary,
  // New data
  designGuidelines,
  qualityTesting,
  visualInspection,
  processOptimization,
  industryApplications,
  // State
  loading,
  error,
  loadData
} = useWireBondingData()

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
.wire-bonding-view {
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
.wire-bonding-content {
  /* Sections handle their own max-width and padding */
}

/* Interactive Tools Section */
.wb-section {
  padding: var(--space-12) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
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
  
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .section-header h2 {
    font-size: var(--font-size-xl);
  }
  
  .section-header p {
    font-size: var(--font-size-base);
  }
}
</style>
