<template>
  <section id="methods" class="wb-section">
    <div class="section-header">
      <h2 class="section-title">Application Methods</h2>
      <p class="section-description">
        Three primary bonding methods exist, each using different combinations of 
        heat, pressure, and ultrasonic energy.
      </p>
    </div>
    
    <!-- Comparison Table -->
    <ComparisonTable
      v-if="methods.length > 0"
      :columns="tableColumns"
      :rows="tableRows"
      :sortable="true"
      :striped="true"
      :hoverable="true"
    >
      <template #cell-name="{ row }">
        <div class="method-name-cell">
          <span class="method-name">{{ row.name }}</span>
          <span v-if="row.status" class="method-status" :class="getStatusClass(row.status)">
            {{ row.status }}
          </span>
        </div>
      </template>
      
      <template #cell-energySources="{ value }">
        <div class="energy-badges">
          <span 
            v-for="source in value" 
            :key="source" 
            class="energy-badge"
            :class="getEnergyClass(source)"
          >
            {{ source }}
          </span>
        </div>
      </template>
      
      <template #cell-wireTypes="{ value }">
        <div class="wire-types">
          <span v-for="wire in value" :key="wire" class="wire-type">{{ wire }}</span>
        </div>
      </template>
    </ComparisonTable>
    
    <!-- Method Details Cards -->
    <div class="methods-details">
      <div 
        v-for="method in methods" 
        :key="method.id"
        class="method-card"
        :class="{ 'method-card--featured': method.id === 'thermosonic' }"
      >
        <div class="method-header">
          <h3 class="method-title">{{ method.name }}</h3>
          <span v-if="method.id === 'thermosonic'" class="featured-tag">Industry Standard</span>
        </div>
        
        <div class="method-energy">
          <span class="energy-label">Energy Sources:</span>
          <div class="energy-icons">
            <span 
              v-for="source in method.energySources" 
              :key="source"
              class="energy-icon"
              :class="getEnergyClass(source)"
              :title="source"
            >
              <svg v-if="source === 'Heat'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v10"></path>
                <path d="M18.4 6.6a9 9 0 1 1-12.77.04"></path>
              </svg>
              <svg v-else-if="source === 'Pressure'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2v20"></path>
                <path d="M17 7l-5-5-5 5"></path>
                <path d="M17 17l-5 5-5-5"></path>
              </svg>
              <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="M6 12a6 6 0 0 1 12 0"></path>
                <path d="M12 2v2"></path>
                <path d="M12 18v4"></path>
              </svg>
              <span class="energy-name">{{ source }}</span>
            </span>
          </div>
        </div>
        
        <div class="method-specs">
          <div class="spec-row">
            <span class="spec-label">Temperature</span>
            <span class="spec-value">{{ method.temperature }}</span>
          </div>
          <div v-if="method.frequency" class="spec-row">
            <span class="spec-label">Frequency</span>
            <span class="spec-value">{{ method.frequency }}</span>
          </div>
          <div class="spec-row">
            <span class="spec-label">Wire Types</span>
            <span class="spec-value">{{ method.wireTypes.join(', ') }}</span>
          </div>
        </div>
        
        <div class="method-pros-cons">
          <div class="pros">
            <h4>Advantages</h4>
            <ul>
              <li v-for="(pro, index) in method.pros" :key="index">{{ pro }}</li>
            </ul>
          </div>
          <div class="cons">
            <h4>Considerations</h4>
            <ul>
              <li v-for="(con, index) in method.cons" :key="index">{{ con }}</li>
            </ul>
          </div>
        </div>
        
        <!-- Frequency Details for Thermosonic -->
        <div v-if="method.frequencyDetails" class="frequency-details">
          <h4>Frequency Options</h4>
          <div class="freq-options">
            <div class="freq-option">
              <span class="freq-value">{{ method.frequencyDetails.standard.frequency }}</span>
              <span class="freq-label">Standard</span>
              <p class="freq-desc">{{ method.frequencyDetails.standard.description }}</p>
            </div>
            <div class="freq-option freq-option--highlight">
              <span class="freq-value">{{ method.frequencyDetails.highFrequency.frequency }}</span>
              <span class="freq-label">High Frequency</span>
              <p class="freq-desc">{{ method.frequencyDetails.highFrequency.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ComparisonTable from '@/components/shared/ComparisonTable.vue'

const props = defineProps({
  methods: {
    type: Array,
    default: () => []
  }
})

const tableColumns = [
  { key: 'name', label: 'Method', sortable: true },
  { key: 'energySources', label: 'Energy Sources', sortable: false },
  { key: 'wireTypes', label: 'Wire Types', sortable: false },
  { key: 'temperature', label: 'Temperature', sortable: true },
  { key: 'frequency', label: 'Frequency', sortable: false }
]

const tableRows = computed(() => 
  props.methods.map(m => ({
    id: m.id,
    name: m.name,
    energySources: m.energySources,
    wireTypes: m.wireTypes,
    temperature: m.temperature,
    frequency: m.frequency || 'N/A',
    status: m.id === 'thermosonic' ? 'Industry Standard' : 
            m.id === 'thermocompression' ? 'Legacy' : null
  }))
)

function getStatusClass(status) {
  if (status === 'Industry Standard') return 'status--primary'
  if (status === 'Legacy') return 'status--muted'
  return ''
}

function getEnergyClass(source) {
  const classes = {
    'Heat': 'energy--heat',
    'Pressure': 'energy--pressure',
    'Ultrasonic': 'energy--ultrasonic',
    'Ultrasonic Vibration': 'energy--ultrasonic'
  }
  return classes[source] || ''
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

/* Table Cell Styles */
.method-name-cell {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.method-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.method-status {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-0-5) var(--space-2);
  border-radius: var(--radius-full);
  width: fit-content;
}

.status--primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.status--muted {
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
}

.energy-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.energy-badge {
  padding: var(--space-0-5) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
}

.energy--heat {
  background-color: var(--color-error-light);
  color: var(--color-error-dark);
}

.energy--pressure {
  background-color: var(--color-info-light);
  color: var(--color-info-dark);
}

.energy--ultrasonic {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.wire-types {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.wire-type {
  padding: var(--space-0-5) var(--space-2);
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  border-radius: var(--radius-full);
}

/* Method Details Cards */
.methods-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-top: var(--space-8);
}

.method-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-6);
  transition: transform var(--transition-default), box-shadow var(--transition-default);
}

.method-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.method-card--featured {
  border-color: var(--color-primary-300);
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-50) 100%);
}

.method-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-4);
}

.method-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.featured-tag {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
}

.method-energy {
  margin-bottom: var(--space-4);
}

.energy-label {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-2);
}

.energy-icons {
  display: flex;
  gap: var(--space-3);
}

.energy-icon {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2);
  border-radius: var(--radius-default);
}

.energy-icon.energy--heat {
  background-color: var(--color-error-light);
  color: var(--color-error-dark);
}

.energy-icon.energy--pressure {
  background-color: var(--color-info-light);
  color: var(--color-info-dark);
}

.energy-icon.energy--ultrasonic {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.energy-name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.method-specs {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
}

.spec-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-light);
}

.spec-row:last-child {
  border-bottom: none;
}

.spec-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.spec-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.method-pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.pros h4,
.cons h4 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-2);
}

.pros h4 {
  color: var(--color-success-main);
}

.cons h4 {
  color: var(--color-warning-main);
}

.pros ul,
.cons ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.pros li,
.cons li {
  position: relative;
  padding-left: var(--space-4);
  margin-bottom: var(--space-1);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.pros li::before,
.cons li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 6px;
  width: 4px;
  height: 4px;
  border-radius: var(--radius-full);
}

.pros li::before {
  background-color: var(--color-success-main);
}

.cons li::before {
  background-color: var(--color-warning-main);
}

/* Frequency Details */
.frequency-details {
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--space-4);
}

.frequency-details h4 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.freq-options {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.freq-option {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  text-align: center;
}

.freq-option--highlight {
  background-color: var(--color-accent-50);
  border: 1px solid var(--color-accent-200);
}

.freq-value {
  display: block;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

.freq-option--highlight .freq-value {
  color: var(--color-accent-700);
}

.freq-label {
  display: block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.freq-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
  margin: 0;
}

/* Responsive */
@media (max-width: 1024px) {
  .methods-details {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .method-pros-cons {
    grid-template-columns: 1fr;
  }
  
  .freq-options {
    grid-template-columns: 1fr;
  }
}
</style>
