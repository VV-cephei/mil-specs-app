<template>
  <div class="spec-superseding-tool">
    <!-- Tool Header -->
    <div class="card">
      <div class="card-header card-header-accent">
        <h2 class="card-header-title">Spec Superseding Lookup</h2>
        <p class="card-header-subtitle">Find replacement specifications for cancelled documents</p>
      </div>
      
      <div class="card-body">
        <!-- Search Input -->
        <div class="input-wrapper search-wrapper">
          <label class="input-label" for="spec-search">Search Specifications</label>
          <div class="input-with-icon">
            <span class="input-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"/>
                <line x1="21" y1="21" x2="16.65" y2="16.65"/>
              </svg>
            </span>
            <input 
              id="spec-search"
              v-model="search"
              type="text"
              class="input"
              placeholder="Search by spec number or description..."
            >
          </div>
          <span class="input-helper">{{ filteredSpecs.length }} specifications found</span>
        </div>

        <!-- Loading State -->
        <div v-if="loading" class="page-loading">
          <div class="loading-spinner"></div>
          <p>Loading specifications...</p>
        </div>

        <!-- Data Table -->
        <div v-else class="table-wrapper table-wrapper-elevated table-fixed-header">
          <table class="table table-striped table-hover">
            <thead>
              <tr>
                <th class="table-cell-nowrap">Original Spec</th>
                <th>Description</th>
                <th class="table-cell-center">Status</th>
                <th>Superseded By</th>
                <th>Notes</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="spec in filteredSpecs" :key="spec.original">
                <td class="table-cell-nowrap">
                  <strong>{{ spec.original }}</strong>
                </td>
                <td class="table-cell-truncate">{{ spec.description }}</td>
                <td class="table-cell-center">
                  <span :class="['table-status-badge', getStatusBadgeClass(spec.status)]">
                    {{ spec.status }}
                  </span>
                </td>
                <td>
                  <span v-if="spec.replacement" class="replacement-spec">
                    {{ spec.replacement }}
                  </span>
                  <span v-else class="no-replacement">None</span>
                </td>
                <td class="table-cell-truncate">{{ spec.notes || '-' }}</td>
              </tr>
              <tr v-if="filteredSpecs.length === 0">
                <td colspan="5">
                  <div class="table-empty">
                    <div class="table-empty-icon">
                      <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="11" cy="11" r="8"/>
                        <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                      </svg>
                    </div>
                    <p class="table-empty-text">No specifications found</p>
                    <p class="table-empty-subtext">Try adjusting your search terms</p>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const loading = ref(false)
const search = ref('')
const specs = ref([])

const filteredSpecs = computed(() => {
  if (!search.value) return specs.value
  const query = search.value.toLowerCase()
  return specs.value.filter(spec => 
    spec.original?.toLowerCase().includes(query) ||
    spec.description?.toLowerCase().includes(query) ||
    spec.replacement?.toLowerCase().includes(query) ||
    spec.notes?.toLowerCase().includes(query)
  )
})

function getStatusBadgeClass(status) {
  if (!status) return 'table-status-badge-neutral'
  const s = status.toLowerCase()
  if (s.includes('superseded') || s.includes('cancelled') || s.includes('canceled')) return 'table-status-badge-warning'
  if (s.includes('active')) return 'table-status-badge-success'
  return 'table-status-badge-info'
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('/data/specs/superseding.json')
    specs.value = await response.json()
  } catch (e) {
    console.error('Failed to load superseding specs data', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.spec-superseding-tool {
  min-height: 400px;
}

.search-wrapper {
  margin-bottom: var(--space-6);
  max-width: 400px;
}

.table-fixed-header {
  max-height: 600px;
}

.replacement-spec {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-500);
}

.no-replacement {
  color: var(--color-text-disabled);
  font-style: italic;
}

.page-loading {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid var(--color-border-light);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-4);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style>