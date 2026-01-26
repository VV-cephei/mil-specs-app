<template>
  <div class="mil-std-883-tool">
    <!-- Tool Header -->
    <div class="card">
      <div class="card-header card-header-primary">
        <h2 class="card-header-title">MIL-STD-883 Method Viewer</h2>
        <p class="card-header-subtitle">Microcircuit Test Methods and Procedures</p>
      </div>
      
      <div class="card-body">
        <!-- Selection Controls -->
        <div class="form-row">
          <div class="input-wrapper">
            <label class="input-label" for="method-select-883">Select Method</label>
            <select 
              id="method-select-883"
              v-model="selectedMethodId"
              class="select"
              :disabled="loading"
            >
              <option value="">-- Select a method --</option>
              <option 
                v-for="method in methods" 
                :key="method.id" 
                :value="method.id"
              >
                {{ method.displayText }} ({{ method.category }})
              </option>
            </select>
            <span v-if="loading" class="input-helper">Loading methods...</span>
          </div>
          
          <div class="input-wrapper">
            <label class="input-label" for="condition-select-883">Select Condition</label>
            <select 
              id="condition-select-883"
              v-model="selectedConditionName"
              class="select"
              :disabled="!selectedMethod || availableConditions.length === 0"
            >
              <option value="">-- Select a condition --</option>
              <option 
                v-for="condition in availableConditions" 
                :key="condition.name" 
                :value="condition.name"
              >
                {{ condition.name }}
              </option>
            </select>
            <span v-if="!selectedMethod" class="input-helper">Select a method first</span>
            <span v-else-if="availableConditions.length === 0" class="input-helper">No conditions available</span>
          </div>
        </div>

        <hr class="card-divider">

        <!-- Method Details -->
        <div v-if="selectedMethod" class="method-details">
          <div class="method-header">
            <div class="method-title-row">
              <h3 class="method-title">{{ selectedMethod.id }} - {{ selectedMethod.title }}</h3>
              <span class="category-badge">{{ selectedMethod.category }}</span>
            </div>
            <div v-if="selectedMethod.status || selectedMethod.date" class="method-meta">
              <span v-if="selectedMethod.status" :class="['table-status-badge', getStatusBadgeClass(selectedMethod.status)]">
                {{ selectedMethod.status }}
              </span>
              <span v-if="selectedMethod.date" class="method-date">Date: {{ selectedMethod.date }}</span>
            </div>
          </div>

          <!-- Method Information Sections -->
          <div class="method-sections">
            <div v-if="selectedMethod.description" class="method-section">
              <h4 class="method-section-title">Description</h4>
              <p class="method-section-text">{{ selectedMethod.description }}</p>
            </div>

            <div v-if="selectedMethod.purpose" class="method-section">
              <h4 class="method-section-title">Purpose</h4>
              <p class="method-section-text">{{ selectedMethod.purpose }}</p>
            </div>

            <div v-if="selectedMethod.apparatus" class="method-section">
              <h4 class="method-section-title">Apparatus</h4>
              <p class="method-section-text">{{ selectedMethod.apparatus }}</p>
            </div>

            <div v-if="selectedMethod.procedure" class="method-section">
              <h4 class="method-section-title">Procedure</h4>
              <p class="method-section-text">{{ selectedMethod.procedure }}</p>
            </div>

            <div v-if="selectedMethod.summary" class="method-section">
              <h4 class="method-section-title">Summary</h4>
              <p class="method-section-text">{{ selectedMethod.summary }}</p>
            </div>
          </div>

          <!-- Condition Details Table -->
          <div v-if="selectedCondition" class="table-wrapper table-wrapper-elevated">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Parameter</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td class="table-cell-nowrap"><strong>Condition Name</strong></td>
                  <td>{{ selectedCondition.name }}</td>
                </tr>
                <tr>
                  <td class="table-cell-nowrap"><strong>Requirements</strong></td>
                  <td>{{ selectedCondition.requirements }}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
          <!-- Info Messages -->
          <div v-else-if="availableConditions.length === 0" class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>No specific test conditions defined for this method in the database.</span>
          </div>
          
          <div v-else class="alert alert-info">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            <span>Please select a test condition to view requirements.</span>
          </div>
        </div>
        
        <!-- Empty State -->
        <div v-else class="page-empty">
          <div class="page-empty-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              <line x1="11" y1="8" x2="11" y2="14"/>
              <line x1="8" y1="11" x2="14" y2="11"/>
            </svg>
          </div>
          <p class="page-empty-text">Select a method to view details</p>
          <p class="page-empty-subtext">Choose from the dropdown above to get started</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'

const loading = ref(false)
const methods = ref([])
const selectedMethodId = ref('')
const selectedConditionName = ref('')

const selectedMethod = computed(() => {
  if (!selectedMethodId.value) return null
  return methods.value.find(m => m.id === selectedMethodId.value) || null
})

const selectedCondition = computed(() => {
  if (!selectedConditionName.value || !selectedMethod.value?.conditions) return null
  return selectedMethod.value.conditions.find(c => c.name === selectedConditionName.value) || null
})

const availableConditions = computed(() => {
  if (!selectedMethod.value || !selectedMethod.value.conditions) return []
  return selectedMethod.value.conditions
})

// Reset condition when method changes
watch(selectedMethodId, () => {
  selectedConditionName.value = ''
})

function getStatusBadgeClass(status) {
  if (!status) return 'table-status-badge-neutral'
  const s = status.toLowerCase()
  if (s.includes('canceled') || s.includes('cancelled')) return 'table-status-badge-error'
  if (s.includes('active')) return 'table-status-badge-success'
  return 'table-status-badge-info'
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('/data/mil-std-883/methods.json')
    const data = await response.json()
    methods.value = data.methods.map(m => ({
      ...m,
      displayText: `${m.id} - ${m.title}`
    }))
  } catch (e) {
    console.error('Failed to load MIL-STD-883 data', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.mil-std-883-tool {
  min-height: 400px;
}

.method-details {
  margin-top: var(--space-4);
}

.method-header {
  margin-bottom: var(--space-4);
}

.method-title-row {
  display: flex;
  align-items: center;
  gap: var(--space-4);
  flex-wrap: wrap;
  margin-bottom: var(--space-2);
}

.method-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.category-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-accent-100);
  color: var(--color-accent-700);
  border-radius: var(--radius-full);
}

.method-meta {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  flex-wrap: wrap;
}

.method-date {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.method-sections {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.method-section-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-500);
  margin: 0 0 var(--space-1);
}

.method-section-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.alert {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  border-radius: var(--radius-default);
  margin-top: var(--space-4);
}

.alert-info {
  background-color: var(--color-info-light);
  color: var(--color-info-dark);
}

.card-divider {
  margin: var(--space-6) 0;
}
</style>