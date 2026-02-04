<template>
  <div class="comparison-table-wrapper">
    <div class="table-scroll-container">
      <table 
        class="comparison-table" 
        :class="{ 
          'comparison-table--striped': striped,
          'comparison-table--hoverable': hoverable,
          'comparison-table--compact': compact
        }"
      >
        <thead>
          <tr>
            <th 
              v-for="column in columns" 
              :key="column.key"
              :class="getHeaderClass(column)"
              :style="column.width ? { width: column.width } : {}"
              @click="column.sortable ? handleSort(column.key) : null"
            >
              <div class="th-content">
                <span class="th-label">{{ column.label }}</span>
                <span 
                  v-if="column.sortable" 
                  class="sort-indicator"
                  :class="getSortClass(column.key)"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 5v14M5 12l7-7 7 7" v-if="sortState.key === column.key && sortState.direction === 'asc'" />
                    <path d="M12 19V5M5 12l7 7 7-7" v-else-if="sortState.key === column.key && sortState.direction === 'desc'" />
                    <path d="M12 5v14M5 12l7-7 7 7" v-else class="sort-inactive" />
                  </svg>
                </span>
              </div>
            </th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="(row, index) in sortedRows" 
            :key="row.id || index"
            :class="{ 'row-highlighted': highlightedRow === index }"
            @mouseenter="hoverable ? highlightedRow = index : null"
            @mouseleave="hoverable ? highlightedRow = null : null"
            @click="$emit('row-click', row)"
          >
            <td 
              v-for="column in columns" 
              :key="column.key"
              :class="getCellClass(column)"
            >
              <slot :name="`cell-${column.key}`" :row="row" :value="row[column.key]">
                <span v-if="column.formatter">
                  {{ column.formatter(row[column.key], row) }}
                </span>
                <span v-else-if="Array.isArray(row[column.key])">
                  <ul class="cell-list">
                    <li v-for="(item, i) in row[column.key]" :key="i">{{ item }}</li>
                  </ul>
                </span>
                <span v-else>
                  {{ row[column.key] ?? '-' }}
                </span>
              </slot>
            </td>
          </tr>
          <tr v-if="sortedRows.length === 0">
            <td :colspan="columns.length" class="empty-cell">
              <slot name="empty">
                <div class="empty-state">
                  <span>No data available</span>
                </div>
              </slot>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  columns: {
    type: Array,
    required: true,
    validator: (value) => value.every(col => col.key && col.label)
  },
  rows: {
    type: Array,
    required: true,
    default: () => []
  },
  sortable: {
    type: Boolean,
    default: false
  },
  striped: {
    type: Boolean,
    default: true
  },
  hoverable: {
    type: Boolean,
    default: true
  },
  compact: {
    type: Boolean,
    default: false
  },
  defaultSort: {
    type: Object,
    default: null,
    validator: (value) => !value || (value.key && value.direction)
  }
})

const emit = defineEmits(['sort', 'row-click'])

const sortState = ref(props.defaultSort || { key: null, direction: null })
const highlightedRow = ref(null)

const sortedRows = computed(() => {
  if (!sortState.value.key || !sortState.value.direction) {
    return props.rows
  }
  
  const key = sortState.value.key
  const direction = sortState.value.direction
  
  return [...props.rows].sort((a, b) => {
    let aVal = a[key]
    let bVal = b[key]
    
    // Handle null/undefined
    if (aVal == null) return direction === 'asc' ? 1 : -1
    if (bVal == null) return direction === 'asc' ? -1 : 1
    
    // Handle arrays (compare by length or first element)
    if (Array.isArray(aVal)) aVal = aVal.length
    if (Array.isArray(bVal)) bVal = bVal.length
    
    // Handle strings
    if (typeof aVal === 'string' && typeof bVal === 'string') {
      const comparison = aVal.localeCompare(bVal)
      return direction === 'asc' ? comparison : -comparison
    }
    
    // Handle numbers
    if (direction === 'asc') {
      return aVal > bVal ? 1 : -1
    } else {
      return aVal < bVal ? 1 : -1
    }
  })
})

function handleSort(key) {
  if (!props.sortable) return
  
  const column = props.columns.find(col => col.key === key)
  if (!column?.sortable) return
  
  if (sortState.value.key === key) {
    // Toggle direction or reset
    if (sortState.value.direction === 'asc') {
      sortState.value.direction = 'desc'
    } else if (sortState.value.direction === 'desc') {
      sortState.value = { key: null, direction: null }
    }
  } else {
    sortState.value = { key, direction: 'asc' }
  }
  
  emit('sort', { ...sortState.value })
}

function getHeaderClass(column) {
  const classes = ['th']
  if (column.align) classes.push(`th--${column.align}`)
  if (column.sortable) classes.push('th--sortable')
  return classes.join(' ')
}

function getCellClass(column) {
  const classes = ['td']
  if (column.align) classes.push(`td--${column.align}`)
  return classes.join(' ')
}

function getSortClass(key) {
  if (sortState.value.key !== key) return 'sort-indicator--inactive'
  return `sort-indicator--${sortState.value.direction}`
}
</script>

<style scoped>
.comparison-table-wrapper {
  width: 100%;
  background-color: var(--color-surface);
  border-radius: var(--radius-default);
  overflow: hidden;
}

.table-scroll-container {
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.th,
.td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.th {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  background-color: var(--color-surface-elevated);
  white-space: nowrap;
}

.th--sortable {
  cursor: pointer;
  user-select: none;
}

.th--sortable:hover {
  background-color: var(--color-surface-hover);
}

.th-content {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.th-label {
  flex: 1;
}

.sort-indicator {
  display: flex;
  align-items: center;
  color: var(--color-text-secondary);
  transition: color var(--transition-fast);
}

.sort-indicator--inactive {
  opacity: 0.3;
}

.sort-indicator--asc,
.sort-indicator--desc {
  color: var(--color-primary-500);
  opacity: 1;
}

.td {
  color: var(--color-text-secondary);
  vertical-align: top;
}

/* Alignment */
.th--center,
.td--center {
  text-align: center;
}

.th--right,
.td--right {
  text-align: right;
}

/* Striped */
.comparison-table--striped tbody tr:nth-child(even) {
  background-color: var(--color-surface-elevated);
}

/* Hoverable */
.comparison-table--hoverable tbody tr {
  transition: background-color var(--transition-fast);
}

.comparison-table--hoverable tbody tr:hover,
.row-highlighted {
  background-color: var(--color-surface-hover);
}

/* Compact */
.comparison-table--compact .th,
.comparison-table--compact .td {
  padding: var(--space-2) var(--space-3);
}

/* Cell list */
.cell-list {
  margin: 0;
  padding-left: var(--space-4);
  list-style-type: disc;
}

.cell-list li {
  margin-bottom: var(--space-1);
}

.cell-list li:last-child {
  margin-bottom: 0;
}

/* Empty state */
.empty-cell {
  text-align: center;
  padding: var(--space-8) var(--space-4);
}

.empty-state {
  color: var(--color-text-disabled);
  font-style: italic;
}

/* Responsive */
@media (max-width: 768px) {
  .th,
  .td {
    padding: var(--space-2) var(--space-3);
  }
  
  .comparison-table--compact .th,
  .comparison-table--compact .td {
    padding: var(--space-1) var(--space-2);
    font-size: var(--font-size-xs);
  }
}
</style>
