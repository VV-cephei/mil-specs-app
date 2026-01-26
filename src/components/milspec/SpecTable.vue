<template>
  <div class="spec-table-component">
    <!-- Table Header -->
    <div class="spec-table-header">
      <h3 class="spec-table-title">{{ title }}</h3>
      <div class="spec-table-controls">
        <div class="input-with-icon search-input">
          <span class="input-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"/>
              <line x1="21" y1="21" x2="16.65" y2="16.65"/>
            </svg>
          </span>
          <input 
            v-model="search"
            type="text"
            class="input input-sm"
            placeholder="Filter..."
          >
        </div>
        <button 
          class="btn btn-ghost btn-sm"
          @click="exportData"
          title="Export to CSV"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
            <polyline points="7 10 12 15 17 10"/>
            <line x1="12" y1="15" x2="12" y2="3"/>
          </svg>
          <span class="btn-text">Export</span>
        </button>
      </div>
    </div>
    
    <!-- Loading State -->
    <div v-if="loading" class="page-loading">
      <div class="loading-spinner"></div>
      <p>Loading...</p>
    </div>

    <!-- Data Table -->
    <div v-else class="table-wrapper table-wrapper-elevated">
      <table class="table table-striped table-hover">
        <thead>
          <tr>
            <th v-for="header in headers" :key="header.key" :class="getHeaderClass(header)">
              {{ header.title }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in filteredItems" :key="item.code || item.id">
            <td v-for="header in headers" :key="header.key" :class="getCellClass(header)">
              <!-- Code column -->
              <template v-if="header.key === 'code'">
                <span class="code-badge">{{ item.code }}</span>
              </template>
              
              <!-- Description column -->
              <template v-else-if="header.key === 'description'">
                <span class="table-cell-truncate">{{ item.description }}</span>
              </template>
              
              <!-- Category column -->
              <template v-else-if="header.key === 'category'">
                <span v-if="item.category" class="category-badge">{{ item.category }}</span>
                <span v-else class="text-muted">-</span>
              </template>
              
              <!-- Specification column -->
              <template v-else-if="header.key === 'specification'">
                <span v-if="item.specification">{{ item.specification }}</span>
                <span v-else class="text-muted">-</span>
              </template>
              
              <!-- Actions column -->
              <template v-else-if="header.key === 'actions'">
                <div class="table-cell-actions">
                  <button 
                    class="btn btn-ghost btn-sm btn-icon"
                    @click="$emit('view', item)"
                    title="View Details"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                      <circle cx="12" cy="12" r="3"/>
                    </svg>
                  </button>
                  <button 
                    class="btn btn-ghost btn-sm btn-icon"
                    @click="$emit('copy', item)"
                    title="Copy Code"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
                    </svg>
                  </button>
                </div>
              </template>
              
              <!-- Default column -->
              <template v-else>
                {{ item[header.key] || '-' }}
              </template>
            </td>
          </tr>
          
          <!-- Empty State -->
          <tr v-if="filteredItems.length === 0">
            <td :colspan="headers.length">
              <div class="table-empty">
                <div class="table-empty-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z"/>
                    <line x1="12" y1="11" x2="12" y2="17"/>
                    <line x1="9" y1="14" x2="15" y2="14"/>
                  </svg>
                </div>
                <p class="table-empty-text">No data available</p>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    
    <!-- Table Footer -->
    <div class="spec-table-footer">
      <span class="result-count">{{ filteredItems.length }} of {{ safeItems.length }} items</span>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true,
    default: () => []
  },
  headers: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view', 'copy'])

const search = ref('')

const safeItems = computed(() => props.items || [])

const filteredItems = computed(() => {
  if (!search.value) return safeItems.value
  const query = search.value.toLowerCase()
  return safeItems.value.filter(item => {
    return props.headers.some(header => {
      const value = item[header.key]
      return value && String(value).toLowerCase().includes(query)
    })
  })
})

function getHeaderClass(header) {
  const classes = []
  if (header.align === 'center') classes.push('table-cell-center')
  if (header.align === 'right') classes.push('table-cell-right')
  if (header.key === 'actions') classes.push('table-cell-actions')
  return classes.join(' ')
}

function getCellClass(header) {
  const classes = []
  if (header.align === 'center') classes.push('table-cell-center')
  if (header.align === 'right') classes.push('table-cell-right')
  return classes.join(' ')
}

function exportData() {
  // Convert data to CSV
  const headerRow = props.headers
    .filter(h => h.key !== 'actions')
    .map(h => h.title)
    .join(',')
  
  const rows = safeItems.value.map(item =>
    props.headers
      .filter(h => h.key !== 'actions')
      .map(h => {
        const value = item[h.key] || ''
        const strValue = String(value)
        // Escape commas and quotes
        if (strValue.includes(',') || strValue.includes('"')) {
          return `"${strValue.replace(/"/g, '""')}"`
        }
        return strValue
      })
      .join(',')
  )
  
  const csv = [headerRow, ...rows].join('\n')
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.title.replace(/\s+/g, '_')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.spec-table-component {
  background-color: var(--color-surface);
}

.spec-table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.spec-table-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.spec-table-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.search-input {
  width: 200px;
}

.btn-text {
  margin-left: var(--space-1);
}

.code-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-radius: var(--radius-default);
}

.category-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: transparent;
  color: var(--color-accent-600);
  border: 1px solid var(--color-accent-500);
  border-radius: var(--radius-full);
}

.text-muted {
  color: var(--color-text-disabled);
}

.spec-table-footer {
  display: flex;
  justify-content: flex-end;
  padding: var(--space-3) 0;
}

.result-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
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
  width: 32px;
  height: 32px;
  border: 3px solid var(--color-border-light);
  border-top-color: var(--color-primary-500);
  border-radius: 50%;
  animation: spin 1s linear infinite;
  margin-bottom: var(--space-3);
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

@media (max-width: 576px) {
  .spec-table-header {
    flex-direction: column;
    align-items: stretch;
  }
  
  .spec-table-controls {
    justify-content: space-between;
  }
  
  .search-input {
    flex: 1;
  }
}
</style>
