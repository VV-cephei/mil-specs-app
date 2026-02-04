<template>
  <section id="bond-types" class="wb-section wb-section--alt">
    <div class="section-header">
      <h2 class="section-title">Bond Types & Process Mechanics</h2>
      <p class="section-description">
        Understanding the different bonding techniques and their process steps is essential 
        for selecting the right approach for your application.
      </p>
    </div>
    
    <TabContainer
      v-if="bondTypes.length > 0"
      :tabs="bondTypeTabs"
      v-model="activeTab"
      variant="underline"
      aria-label="Bond type selection"
    >
      <template v-for="bondType in bondTypes" :key="bondType.id" #[bondType.id]>
        <div class="bond-type-content">
          <div class="bond-type-header">
            <div class="bond-type-info">
              <h3 class="bond-type-name">{{ bondType.name }}</h3>
              <p class="bond-type-description">{{ bondType.description }}</p>
            </div>
            <div v-if="bondType.parameters" class="bond-type-params">
              <div v-if="bondType.parameters.marketShare" class="param-badge param-badge--primary">
                {{ bondType.parameters.marketShare }}
              </div>
              <div v-if="bondType.parameters.direction" class="param-badge">
                {{ bondType.parameters.direction }}
              </div>
            </div>
          </div>
          
          <!-- Process Steps -->
          <div class="process-steps">
            <h4 class="steps-title">Process Steps</h4>
            <div class="steps-timeline">
              <div 
                v-for="step in bondType.processSteps" 
                :key="step.step"
                class="step-item"
              >
                <div class="step-number">{{ step.step }}</div>
                <div class="step-content">
                  <h5 class="step-name">{{ step.name }}</h5>
                  <p class="step-description">{{ step.description }}</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Advantages & Disadvantages -->
          <div class="bond-type-features">
            <div class="feature-column feature-column--pros">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Advantages
              </h4>
              <ul>
                <li v-for="(adv, index) in bondType.advantages" :key="index">{{ adv }}</li>
              </ul>
            </div>
            <div class="feature-column feature-column--cons">
              <h4>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Considerations
              </h4>
              <ul>
                <li v-for="(dis, index) in bondType.disadvantages" :key="index">{{ dis }}</li>
              </ul>
            </div>
          </div>
          
          <!-- Applications -->
          <div v-if="bondType.applications" class="bond-type-applications">
            <h4>Applications</h4>
            <div class="app-tags">
              <span v-for="(app, index) in bondType.applications" :key="index" class="app-tag">
                {{ app }}
              </span>
            </div>
          </div>
        </div>
      </template>
    </TabContainer>
    
    <div v-else class="loading-placeholder">
      <p>Loading bond types data...</p>
    </div>
    
    <!-- Quick Comparison -->
    <div class="quick-comparison">
      <h3 class="comparison-title">Quick Comparison: Ball vs Wedge</h3>
      <div class="comparison-grid">
        <div class="comparison-card">
          <div class="comparison-header comparison-header--ball">
            <h4>Ball Bonding</h4>
            <span class="comparison-badge">Speed King</span>
          </div>
          <ul class="comparison-list">
            <li><strong>Direction:</strong> Omni-directional</li>
            <li><strong>Speed:</strong> Fastest</li>
            <li><strong>Wire Types:</strong> Au, Cu, Ag</li>
            <li><strong>Market Share:</strong> &gt;90% of ICs</li>
            <li><strong>Pitch:</strong> Limited by ball size</li>
          </ul>
        </div>
        <div class="comparison-card">
          <div class="comparison-header comparison-header--wedge">
            <h4>Wedge Bonding</h4>
            <span class="comparison-badge">Fine Pitch Specialist</span>
          </div>
          <ul class="comparison-list">
            <li><strong>Direction:</strong> Uni-directional</li>
            <li><strong>Speed:</strong> Slower (rotation needed)</li>
            <li><strong>Wire Types:</strong> Al, Ribbon</li>
            <li><strong>Market Share:</strong> Specialized apps</li>
            <li><strong>Pitch:</strong> Finer pitch possible</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabContainer from '@/components/shared/TabContainer.vue'

const props = defineProps({
  bondTypes: {
    type: Array,
    default: () => []
  }
})

const activeTab = ref('ball')

const bondTypeTabs = computed(() => 
  props.bondTypes.map(bt => ({
    id: bt.id,
    label: bt.name.replace(' Bonding', '').replace(' / ', '/'),
    badge: bt.id === 'ball' ? '>90%' : null
  }))
)
</script>

<style scoped>
.wb-section {
  padding: var(--space-12) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.wb-section--alt {
  background-color: var(--color-surface-elevated);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.section-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Bond Type Content */
.bond-type-content {
  padding: var(--space-6) 0;
}

.bond-type-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
}

.bond-type-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.bond-type-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  max-width: 700px;
}

.bond-type-params {
  display: flex;
  gap: var(--space-2);
  flex-shrink: 0;
}

.param-badge {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.param-badge--primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

/* Process Steps */
.process-steps {
  margin-bottom: var(--space-8);
}

.steps-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.steps-timeline {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.step-item {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
  transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.step-item:hover {
  transform: translateX(4px);
  box-shadow: var(--shadow-sm);
}

.step-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.step-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

/* Features */
.bond-type-features {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-6);
}

.feature-column {
  padding: var(--space-5);
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  border: 1px solid var(--color-border-light);
}

.feature-column--pros {
  border-left: 3px solid var(--color-success-main);
}

.feature-column--cons {
  border-left: 3px solid var(--color-warning-main);
}

.feature-column h4 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  margin-bottom: var(--space-3);
}

.feature-column--pros h4 {
  color: var(--color-success-main);
}

.feature-column--cons h4 {
  color: var(--color-warning-main);
}

.feature-column ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-column li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.feature-column li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
}

.feature-column--pros li::before {
  background-color: var(--color-success-main);
}

.feature-column--cons li::before {
  background-color: var(--color-warning-main);
}

/* Applications */
.bond-type-applications h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.app-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.app-tag {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
}

/* Quick Comparison */
.quick-comparison {
  margin-top: var(--space-12);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.comparison-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-6);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.comparison-card {
  background-color: var(--color-surface);
  border-radius: var(--radius-xl);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.comparison-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  color: var(--color-text-inverse);
}

.comparison-header--ball {
  background: linear-gradient(135deg, var(--color-primary-600) 0%, var(--color-primary-500) 100%);
}

.comparison-header--wedge {
  background: linear-gradient(135deg, var(--color-accent-700) 0%, var(--color-accent-500) 100%);
}

.comparison-header h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  margin: 0;
}

.comparison-badge {
  padding: var(--space-1) var(--space-2);
  background-color: rgba(255, 255, 255, 0.2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
}

.comparison-list {
  list-style: none;
  padding: var(--space-5);
  margin: 0;
}

.comparison-list li {
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.comparison-list li:last-child {
  border-bottom: none;
}

.comparison-list strong {
  color: var(--color-text-primary);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .bond-type-header {
    flex-direction: column;
  }
  
  .bond-type-features {
    grid-template-columns: 1fr;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
