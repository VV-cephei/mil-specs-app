<template>
  <section id="materials" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">Materials & Substrates</h2>
      <p class="section-description">
        Understanding PCB substrates, solder alloys, and surface finishes is critical for 
        selecting the right materials for your application.
      </p>
    </div>
    
    <TabContainer
      v-if="hasData"
      :tabs="materialTabs"
      v-model="activeTab"
      variant="pills"
      aria-label="Material categories"
    >
      <!-- Substrates Tab -->
      <template #substrates>
        <div class="tab-content">
          <div v-for="category in substrates.categories" :key="category.id" class="material-category">
            <div class="category-header">
              <h3 class="category-name">{{ category.name }}</h3>
              <p v-if="category.description" class="category-description">{{ category.description }}</p>
            </div>
            
            <div class="variants-grid">
              <div 
                v-for="variant in category.variants" 
                :key="variant.id" 
                class="variant-card"
              >
                <div class="variant-header">
                  <h4 class="variant-name">{{ variant.name }}</h4>
                  <span 
                    v-if="variant.costLevel" 
                    class="cost-chip"
                    :class="`cost-chip--${variant.costLevel}`"
                  >
                    {{ formatCostLevel(variant.costLevel) }}
                  </span>
                </div>
                
                <dl class="variant-properties">
                  <div v-if="variant.tg" class="property-item">
                    <dt>Tg</dt>
                    <dd>{{ variant.tg }}</dd>
                  </div>
                  <div v-if="variant.dk" class="property-item">
                    <dt>Dk</dt>
                    <dd>{{ variant.dk }}</dd>
                  </div>
                  <div v-if="variant.thermalConductivity" class="property-item">
                    <dt>Thermal</dt>
                    <dd>{{ variant.thermalConductivity }}</dd>
                  </div>
                </dl>
                
                <div v-if="variant.examples?.length" class="variant-examples">
                  <span class="examples-label">Examples:</span>
                  <span class="examples-list">{{ variant.examples.join(', ') }}</span>
                </div>
                
                <div v-if="variant.applications?.length" class="variant-applications">
                  <span 
                    v-for="app in variant.applications" 
                    :key="app" 
                    class="app-tag"
                  >
                    {{ app }}
                  </span>
                </div>
                
                <div v-if="variant.limitations?.length" class="variant-limitations">
                  <ul>
                    <li v-for="(limit, idx) in variant.limitations" :key="idx">{{ limit }}</li>
                  </ul>
                </div>
                
                <div v-if="variant.trenchInsight" class="trench-insight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>{{ variant.trenchInsight }}</span>
                </div>
                
                <div v-if="variant.processControl" class="process-control">
                  <strong>Process Control:</strong> {{ variant.processControl }}
                </div>
              </div>
            </div>
          </div>
          
          <!-- Key Parameters Reference -->
          <div v-if="substrates.keyParameters" class="key-parameters">
            <h4 class="parameters-title">Key Parameters Reference</h4>
            <div class="parameters-grid">
              <div 
                v-for="(param, key) in substrates.keyParameters" 
                :key="key" 
                class="parameter-item"
              >
                <dt>{{ param.name }} ({{ key.toUpperCase() }})</dt>
                <dd>{{ param.description }}</dd>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Solder Alloys Tab -->
      <template #alloys>
        <div class="tab-content">
          <div v-for="category in solderAlloys.categories" :key="category.id" class="material-category">
            <div class="category-header">
              <h3 class="category-name">{{ category.name }}</h3>
              <p v-if="category.description" class="category-description">{{ category.description }}</p>
            </div>
            
            <div class="alloys-grid">
              <div 
                v-for="alloy in category.alloys" 
                :key="alloy.id" 
                class="alloy-card"
              >
                <div class="alloy-header">
                  <h4 class="alloy-name">{{ alloy.name }}</h4>
                  <span 
                    class="compliance-badge"
                    :class="alloy.compliance === 'RoHS' ? 'compliance-badge--rohs' : 'compliance-badge--non-rohs'"
                  >
                    {{ alloy.compliance }}
                  </span>
                </div>
                
                <div class="alloy-composition" v-if="alloy.composition">
                  <span class="composition-label">Composition:</span>
                  <span class="composition-values">
                    <span v-for="(value, element) in alloy.composition" :key="element" class="element">
                      {{ element }}: {{ value }}{{ typeof value === 'number' ? '%' : '' }}
                    </span>
                  </span>
                </div>
                
                <dl class="alloy-properties">
                  <div v-if="alloy.meltingPoint" class="property-item">
                    <dt>Melting Point</dt>
                    <dd>{{ alloy.meltingPoint }}</dd>
                  </div>
                  <div v-if="alloy.meltingRange" class="property-item">
                    <dt>Melting Range</dt>
                    <dd>{{ alloy.meltingRange }}</dd>
                  </div>
                  <div v-if="alloy.meltingType" class="property-item">
                    <dt>Type</dt>
                    <dd class="melting-type">{{ alloy.meltingType }}</dd>
                  </div>
                </dl>
                
                <div v-if="alloy.characteristics?.length" class="alloy-characteristics">
                  <ul>
                    <li v-for="(char, idx) in alloy.characteristics" :key="idx">{{ char }}</li>
                  </ul>
                </div>
                
                <div v-if="alloy.advantages?.length" class="alloy-pros">
                  <h5>Advantages</h5>
                  <ul>
                    <li v-for="(adv, idx) in alloy.advantages" :key="idx">{{ adv }}</li>
                  </ul>
                </div>
                
                <div v-if="alloy.disadvantages?.length" class="alloy-cons">
                  <h5>Considerations</h5>
                  <ul>
                    <li v-for="(dis, idx) in alloy.disadvantages" :key="idx">{{ dis }}</li>
                  </ul>
                </div>
                
                <div v-if="alloy.warnings?.length" class="alloy-warnings">
                  <div v-for="(warning, idx) in alloy.warnings" :key="idx" class="warning-item">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>{{ warning }}</span>
                  </div>
                </div>
                
                <div v-if="alloy.applications?.length" class="alloy-applications">
                  <span v-for="app in alloy.applications" :key="app" class="app-tag">{{ app }}</span>
                </div>
                
                <div v-if="alloy.trenchInsight" class="trench-insight">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                  <span>{{ alloy.trenchInsight }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Surface Finishes Tab -->
      <template #finishes>
        <div class="tab-content">
          <!-- Comparison Table -->
          <div v-if="surfaceFinishes.comparisonTable" class="comparison-table-wrapper">
            <h3 class="comparison-title">Surface Finish Comparison</h3>
            <div class="table-scroll">
              <table class="comparison-table">
                <thead>
                  <tr>
                    <th v-for="header in surfaceFinishes.comparisonTable.headers" :key="header">
                      {{ header }}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(row, idx) in surfaceFinishes.comparisonTable.rows" :key="idx">
                    <td v-for="(cell, cellIdx) in row" :key="cellIdx">
                      <span v-if="cellIdx === 0" class="finish-name">{{ cell }}</span>
                      <span v-else-if="cell === 'Yes'" class="check-yes">✓</span>
                      <span v-else-if="cell === 'No'" class="check-no">✗</span>
                      <span v-else>{{ cell }}</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
          
          <!-- Detailed Finish Cards -->
          <div class="finishes-grid">
            <div 
              v-for="finish in surfaceFinishes.finishes" 
              :key="finish.id" 
              class="finish-card"
            >
              <div class="finish-header">
                <div class="finish-names">
                  <h4 class="finish-abbr">{{ finish.name }}</h4>
                  <span class="finish-full">{{ finish.fullName }}</span>
                </div>
                <span 
                  class="cost-chip"
                  :class="`cost-chip--${finish.costLevel}`"
                >
                  {{ formatCostLevel(finish.costLevel) }}
                </span>
              </div>
              
              <p class="finish-description">{{ finish.description }}</p>
              
              <dl class="finish-properties">
                <div class="property-item">
                  <dt>Shelf Life</dt>
                  <dd>{{ finish.shelfLife }}</dd>
                </div>
                <div class="property-item">
                  <dt>Fine Pitch</dt>
                  <dd>
                    <span :class="finish.finePitchCapable ? 'check-yes' : 'check-no'">
                      {{ finish.finePitchCapable ? '✓ Yes' : '✗ No' }}
                    </span>
                  </dd>
                </div>
                <div v-if="finish.reflows" class="property-item">
                  <dt>Reflows</dt>
                  <dd>{{ finish.reflows }}</dd>
                </div>
              </dl>
              
              <div v-if="finish.thickness" class="finish-thickness">
                <span class="thickness-label">Thickness:</span>
                <span v-for="(value, layer) in finish.thickness" :key="layer" class="thickness-item">
                  {{ layer }}: {{ value }}
                </span>
              </div>
              
              <div class="finish-pros-cons">
                <div class="pros-list">
                  <h5>Pros</h5>
                  <ul>
                    <li v-for="(pro, idx) in finish.pros" :key="idx">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons-list">
                  <h5>Cons</h5>
                  <ul>
                    <li v-for="(con, idx) in finish.cons" :key="idx">{{ con }}</li>
                  </ul>
                </div>
              </div>
              
              <div v-if="finish.issues" class="finish-issues">
                <div v-for="(issue, issueKey) in finish.issues" :key="issueKey" class="issue-item">
                  <strong>{{ formatIssueKey(issueKey) }}:</strong>
                  <span>{{ issue.cause }} → {{ issue.effect }}</span>
                </div>
              </div>
              
              <div v-if="finish.applications?.length" class="finish-applications">
                <span v-for="app in finish.applications" :key="app" class="app-tag">{{ app }}</span>
              </div>
              
              <div v-if="finish.trenchNote" class="trench-insight">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                  <line x1="12" y1="17" x2="12.01" y2="17"></line>
                </svg>
                <span>{{ finish.trenchNote }}</span>
              </div>
            </div>
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
  substrates: {
    type: Object,
    default: () => ({})
  },
  solderAlloys: {
    type: Object,
    default: () => ({})
  },
  surfaceFinishes: {
    type: Object,
    default: () => ({})
  }
})

const activeTab = ref('substrates')

const materialTabs = [
  { id: 'substrates', label: 'Substrates' },
  { id: 'alloys', label: 'Solder Alloys' },
  { id: 'finishes', label: 'Surface Finishes' }
]

const hasData = computed(() => {
  return props.substrates?.categories?.length > 0 ||
         props.solderAlloys?.categories?.length > 0 ||
         props.surfaceFinishes?.finishes?.length > 0
})

function formatCostLevel(level) {
  const labels = {
    'low': 'Low Cost',
    'medium': 'Medium',
    'medium-high': 'Med-High',
    'high': 'High Cost',
    'very-high': 'Very High'
  }
  return labels[level] || level
}

function formatIssueKey(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}
</script>

<style scoped>
.smt-section {
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

.tab-content {
  padding: var(--space-4) 0;
}

/* Material Category */
.material-category {
  margin-bottom: var(--space-8);
}

.category-header {
  margin-bottom: var(--space-4);
}

.category-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.category-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Variants Grid */
.variants-grid,
.alloys-grid,
.finishes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--space-4);
}

/* Variant Card */
.variant-card,
.alloy-card,
.finish-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.variant-header,
.alloy-header,
.finish-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-2);
}

.variant-name,
.alloy-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.finish-names {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.finish-abbr {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin: 0;
}

.finish-full {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.finish-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

/* Cost Chip */
.cost-chip {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
  white-space: nowrap;
}

.cost-chip--low {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.cost-chip--medium {
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
}

.cost-chip--medium-high {
  background-color: #fef3c7;
  color: #92400e;
}

.cost-chip--high {
  background-color: #fed7aa;
  color: #c2410c;
}

.cost-chip--very-high {
  background-color: #fecaca;
  color: #b91c1c;
}

/* Properties */
.variant-properties,
.alloy-properties,
.finish-properties {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-3);
}

.property-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
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
  margin: 0;
}

.melting-type {
  text-transform: capitalize;
}

/* Examples */
.variant-examples {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.examples-label {
  font-weight: var(--font-weight-medium);
}

/* Applications */
.variant-applications,
.alloy-applications,
.finish-applications {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.app-tag {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-full);
}

/* Limitations */
.variant-limitations ul,
.alloy-characteristics ul,
.alloy-pros ul,
.alloy-cons ul {
  margin: 0;
  padding-left: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.variant-limitations li,
.alloy-characteristics li,
.alloy-pros li,
.alloy-cons li {
  margin-bottom: var(--space-1);
}

.alloy-pros h5,
.alloy-cons h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.alloy-pros {
  border-left: 3px solid var(--color-success-main);
  padding-left: var(--space-3);
}

.alloy-cons {
  border-left: 3px solid var(--color-warning-main);
  padding-left: var(--space-3);
}

/* Warnings */
.alloy-warnings {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.warning-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-error-light);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  color: var(--color-error-dark);
}

.warning-item svg {
  flex-shrink: 0;
  margin-top: 2px;
}

/* Compliance Badge */
.compliance-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-default);
}

.compliance-badge--rohs {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.compliance-badge--non-rohs {
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
}

/* Alloy Composition */
.alloy-composition {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.composition-label {
  font-weight: var(--font-weight-medium);
}

.composition-values {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-1);
}

.element {
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
}

/* Trench Insight */
.trench-insight {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  background: linear-gradient(135deg, var(--color-accent-50) 0%, var(--color-accent-100) 100%);
  border: 1px solid var(--color-accent-200);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  color: var(--color-accent-900);
}

.trench-insight svg {
  flex-shrink: 0;
  color: var(--color-accent-600);
  margin-top: 2px;
}

/* Process Control */
.process-control {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.process-control strong {
  color: var(--color-text-primary);
}

/* Key Parameters */
.key-parameters {
  margin-top: var(--space-8);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.parameters-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.parameters-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
}

.parameter-item dt {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

.parameter-item dd {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Comparison Table */
.comparison-table-wrapper {
  margin-bottom: var(--space-8);
}

.comparison-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.table-scroll {
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.comparison-table th,
.comparison-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.comparison-table th {
  background-color: var(--color-surface-elevated);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  white-space: nowrap;
}

.comparison-table td {
  color: var(--color-text-secondary);
}

.finish-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
}

.check-yes {
  color: var(--color-success-main);
  font-weight: var(--font-weight-bold);
}

.check-no {
  color: var(--color-error-main);
  font-weight: var(--font-weight-bold);
}

/* Finish Thickness */
.finish-thickness {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
}

.thickness-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.thickness-item {
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  color: var(--color-text-primary);
}

/* Finish Pros/Cons */
.finish-pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.pros-list,
.cons-list {
  font-size: var(--font-size-sm);
}

.pros-list h5,
.cons-list h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.pros-list ul,
.cons-list ul {
  margin: 0;
  padding-left: var(--space-4);
  color: var(--color-text-secondary);
}

.pros-list li,
.cons-list li {
  margin-bottom: var(--space-1);
}

.pros-list {
  border-left: 3px solid var(--color-success-main);
  padding-left: var(--space-3);
}

.cons-list {
  border-left: 3px solid var(--color-warning-main);
  padding-left: var(--space-3);
}

/* Finish Issues */
.finish-issues {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.issue-item {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.issue-item strong {
  color: var(--color-text-primary);
}

/* Loading */
.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .smt-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .variants-grid,
  .alloys-grid,
  .finishes-grid {
    grid-template-columns: 1fr;
  }
  
  .finish-pros-cons {
    grid-template-columns: 1fr;
  }
  
  .parameters-grid {
    grid-template-columns: 1fr;
  }
}
</style>
