<template>
  <section id="materials" class="wb-section">
    <div class="section-header">
      <h2 class="section-title">Wire Materials</h2>
      <p class="section-description">
        Understanding wire material properties is critical for selecting the right interconnect 
        solution for your application.
      </p>
    </div>
    
    <TabContainer
      v-if="materials.length > 0"
      :tabs="materialTabs"
      v-model="activeTab"
      variant="pills"
      aria-label="Wire material types"
    >
      <template v-for="material in materials" :key="material.id" #[material.id]>
        <div class="material-content">
          <div class="material-header">
            <div class="material-symbol">{{ material.symbol }}</div>
            <div class="material-info">
              <h3 class="material-name">{{ material.name }}</h3>
              <p class="material-purity">{{ material.purity }}</p>
            </div>
          </div>
          
          <div class="material-grid">
            <!-- Properties Card -->
            <div class="material-card">
              <h4 class="card-title">Properties</h4>
              <dl class="properties-list">
                <div class="property-item">
                  <dt>Conductivity</dt>
                  <dd>{{ material.conductivity }}</dd>
                </div>
                <div class="property-item">
                  <dt>Hardness</dt>
                  <dd>{{ material.hardness }}</dd>
                </div>
                <div class="property-item">
                  <dt>Cost</dt>
                  <dd>{{ material.cost }}</dd>
                </div>
                <div v-if="material.dopants?.length" class="property-item property-item--full">
                  <dt>Dopants</dt>
                  <dd>{{ material.dopants.join(', ') }}</dd>
                </div>
              </dl>
            </div>
            
            <!-- Pros Card -->
            <div class="material-card material-card--pros">
              <h4 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="20 6 9 17 4 12"></polyline>
                </svg>
                Advantages
              </h4>
              <ul class="feature-list">
                <li v-for="(pro, index) in material.pros" :key="index">
                  {{ pro }}
                </li>
              </ul>
            </div>
            
            <!-- Cons Card -->
            <div class="material-card material-card--cons">
              <h4 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="12" y1="8" x2="12" y2="12"></line>
                  <line x1="12" y1="16" x2="12.01" y2="16"></line>
                </svg>
                Considerations
              </h4>
              <ul class="feature-list">
                <li v-for="(con, index) in material.cons" :key="index">
                  <span v-html="highlightTerms(con)"></span>
                </li>
              </ul>
            </div>
            
            <!-- Applications Card -->
            <div class="material-card">
              <h4 class="card-title">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
                Applications
              </h4>
              <ul class="feature-list feature-list--tags">
                <li v-for="(app, index) in material.applications" :key="index" class="tag">
                  {{ app }}
                </li>
              </ul>
            </div>
          </div>
          
          <!-- Trench Insights -->
          <div v-if="material.trenchInsights" class="trench-insights">
            <h4 class="insights-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Trench Insights
            </h4>
            <p class="insights-text">{{ material.trenchInsights }}</p>
          </div>
        </div>
      </template>
    </TabContainer>
    
    <div v-else class="loading-placeholder">
      <p>Loading materials data...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabContainer from '@/components/shared/TabContainer.vue'

const props = defineProps({
  materials: {
    type: Array,
    default: () => []
  },
  glossary: {
    type: Array,
    default: () => []
  }
})

const activeTab = ref('gold')

const materialTabs = computed(() => 
  props.materials.map(m => ({
    id: m.id,
    label: m.symbol,
    badge: null
  }))
)

// Highlight glossary terms in text
function highlightTerms(text) {
  if (!props.glossary.length) return text
  
  let result = text
  const termsToHighlight = ['Purple Plague', 'White Plague', 'HAZ', 'EFO', 'Forming Gas', 'Cratering']
  
  termsToHighlight.forEach(term => {
    const regex = new RegExp(`(${term})`, 'gi')
    result = result.replace(regex, '<span class="term-highlight">$1</span>')
  })
  
  return result
}
</script>

<style scoped>
.wb-section {
  padding: var(--space-12) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
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

.material-content {
  padding: var(--space-4) 0;
}

.material-header {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
  padding-bottom: var(--space-4);
  border-bottom: 1px solid var(--color-border-light);
}

.material-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-lg);
}

.material-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.material-purity {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.material-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.material-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.material-card--pros {
  border-left: 3px solid var(--color-success-main);
}

.material-card--cons {
  border-left: 3px solid var(--color-warning-main);
}

.card-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.card-title svg {
  color: var(--color-primary-500);
}

.material-card--pros .card-title svg {
  color: var(--color-success-main);
}

.material-card--cons .card-title svg {
  color: var(--color-warning-main);
}

.properties-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.property-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.property-item--full {
  grid-column: 1 / -1;
}

.property-item dt {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.property-item dd {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.feature-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-list li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.feature-list li:last-child {
  margin-bottom: 0;
}

.feature-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background-color: var(--color-primary-400);
  border-radius: var(--radius-full);
}

.material-card--pros .feature-list li::before {
  background-color: var(--color-success-main);
}

.material-card--cons .feature-list li::before {
  background-color: var(--color-warning-main);
}

.feature-list--tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.feature-list--tags li {
  padding: var(--space-1) var(--space-3);
  margin-bottom: 0;
}

.feature-list--tags li::before {
  display: none;
}

.tag {
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.trench-insights {
  background: linear-gradient(135deg, var(--color-accent-50) 0%, var(--color-accent-100) 100%);
  border: 1px solid var(--color-accent-200);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.insights-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-800);
  margin-bottom: var(--space-3);
}

.insights-title svg {
  color: var(--color-accent-600);
}

.insights-text {
  font-size: var(--font-size-sm);
  color: var(--color-accent-900);
  line-height: var(--line-height-relaxed);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Term highlighting */
:deep(.term-highlight) {
  color: var(--color-accent-700);
  font-weight: var(--font-weight-medium);
  border-bottom: 1px dashed var(--color-accent-500);
  cursor: help;
}

/* Responsive */
@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .material-grid {
    grid-template-columns: 1fr;
  }
  
  .material-header {
    flex-direction: column;
    text-align: center;
  }
  
  .properties-list {
    grid-template-columns: 1fr;
  }
}
</style>
