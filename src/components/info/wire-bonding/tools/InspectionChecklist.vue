<template>
  <div class="inspection-checklist">
    <div class="checklist-header">
      <h3 class="checklist-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M9 11l3 3L22 4"/>
          <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/>
        </svg>
        Visual Inspection Checklist
      </h3>
      <p class="checklist-description">
        MIL-STD-883 compliant wire bond inspection criteria
      </p>
    </div>

    <!-- Summary Bar -->
    <div class="summary-bar">
      <div class="summary-stats">
        <div class="stat-item">
          <span class="stat-value">{{ totalChecked }}</span>
          <span class="stat-label">Checked</span>
        </div>
        <div class="stat-item stat-item--pass">
          <span class="stat-value">{{ passCount }}</span>
          <span class="stat-label">Pass</span>
        </div>
        <div class="stat-item stat-item--fail">
          <span class="stat-value">{{ failCount }}</span>
          <span class="stat-label">Fail</span>
        </div>
        <div class="stat-item stat-item--na">
          <span class="stat-value">{{ naCount }}</span>
          <span class="stat-label">N/A</span>
        </div>
      </div>
      <div class="overall-status" :class="overallStatusClass">
        <svg v-if="overallStatus === 'pass'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        <svg v-else-if="overallStatus === 'fail'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="15" y1="9" x2="9" y2="15"/>
          <line x1="9" y1="9" x2="15" y2="15"/>
        </svg>
        <svg v-else-if="overallStatus === 'conditional'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
          <line x1="12" y1="9" x2="12" y2="13"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <line x1="12" y1="8" x2="12" y2="12"/>
          <line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        <span class="status-text">{{ overallStatusText }}</span>
      </div>
    </div>

    <!-- Checklist Categories -->
    <div class="checklist-body">
      <div 
        v-for="category in categories" 
        :key="category.id"
        class="category-section"
      >
        <button 
          class="category-header"
          :class="{ 'category-header--expanded': expandedCategories[category.id] }"
          @click="toggleCategory(category.id)"
          :aria-expanded="expandedCategories[category.id]"
          :aria-controls="`category-${category.id}`"
        >
          <div class="category-info">
            <h4 class="category-title">{{ category.name }}</h4>
            <span class="category-progress">
              {{ getCategoryProgress(category.id) }}
            </span>
          </div>
          <svg class="category-chevron" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="6 9 12 15 18 9"/>
          </svg>
        </button>

        <div 
          v-show="expandedCategories[category.id]"
          :id="`category-${category.id}`"
          class="category-content"
        >
          <div 
            v-for="item in category.items" 
            :key="item.id"
            class="checklist-item"
            :class="{ 
              'checklist-item--checked': checklistState[item.id],
              [`checklist-item--${checklistState[item.id]}`]: checklistState[item.id]
            }"
          >
            <div class="item-main">
              <div class="item-header">
                <span class="item-criteria">{{ item.criteria }}</span>
                <span 
                  class="severity-badge"
                  :class="`severity-badge--${item.severity.toLowerCase()}`"
                >
                  {{ item.severity }}
                </span>
              </div>
              <p class="item-spec">{{ item.specification }}</p>
            </div>
            
            <div class="item-controls">
              <div class="radio-group" role="radiogroup" :aria-label="`Status for ${item.criteria}`">
                <label class="radio-option radio-option--pass">
                  <input 
                    type="radio" 
                    :name="`item-${item.id}`"
                    value="pass"
                    :checked="checklistState[item.id] === 'pass'"
                    @change="setItemStatus(item.id, 'pass')"
                  />
                  <span class="radio-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Pass
                  </span>
                </label>
                <label class="radio-option radio-option--fail">
                  <input 
                    type="radio" 
                    :name="`item-${item.id}`"
                    value="fail"
                    :checked="checklistState[item.id] === 'fail'"
                    @change="setItemStatus(item.id, 'fail')"
                  />
                  <span class="radio-label">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Fail
                  </span>
                </label>
                <label class="radio-option radio-option--na">
                  <input 
                    type="radio" 
                    :name="`item-${item.id}`"
                    value="na"
                    :checked="checklistState[item.id] === 'na'"
                    @change="setItemStatus(item.id, 'na')"
                  />
                  <span class="radio-label">N/A</span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div class="checklist-actions">
      <button class="action-button action-button--secondary" @click="resetChecklist">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Reset
      </button>
      <button class="action-button action-button--primary" @click="exportSummary">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export Summary
      </button>
    </div>

    <!-- Export Modal -->
    <div v-if="showExportModal" class="modal-overlay" @click.self="showExportModal = false">
      <div class="modal-content">
        <div class="modal-header">
          <h4 class="modal-title">Inspection Summary</h4>
          <button class="modal-close" @click="showExportModal = false" aria-label="Close">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="modal-body">
          <pre class="export-content">{{ exportContent }}</pre>
        </div>
        <div class="modal-footer">
          <button class="action-button action-button--secondary" @click="copyToClipboard">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
            </svg>
            {{ copyButtonText }}
          </button>
          <button class="action-button action-button--primary" @click="printSummary">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="6 9 6 2 18 2 18 9"/>
              <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"/>
              <rect x="6" y="14" width="12" height="8"/>
            </svg>
            Print
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

// Checklist categories and items based on MIL-STD-883 visual inspection criteria
const categories = [
  {
    id: 'ball-bond',
    name: 'Ball Bond Inspection',
    items: [
      {
        id: 'bb-1',
        criteria: 'Ball Squash Ratio',
        specification: '2.0x - 3.5x wire diameter (optimal: 2.5x - 3.0x)',
        severity: 'Major'
      },
      {
        id: 'bb-2',
        criteria: 'Ball Centering on Pad',
        specification: 'Ball 100% contained within pad boundaries',
        severity: 'Critical'
      },
      {
        id: 'bb-3',
        criteria: 'Ball Shape/Symmetry',
        specification: 'Round to slightly oval (aspect ratio ≤1.2:1)',
        severity: 'Major'
      },
      {
        id: 'bb-4',
        criteria: 'Golf Club Defect',
        specification: 'Ball must be concentric with wire stem within 10%',
        severity: 'Critical'
      },
      {
        id: 'bb-5',
        criteria: 'Neck/HAZ Condition',
        specification: 'Smooth transition, no visible cracks or damage',
        severity: 'Critical'
      },
      {
        id: 'bb-6',
        criteria: 'Ball Surface Condition',
        specification: 'No cracks, voids, or contamination visible',
        severity: 'Major'
      }
    ]
  },
  {
    id: 'stitch-bond',
    name: 'Stitch Bond Inspection',
    items: [
      {
        id: 'sb-1',
        criteria: 'Heel Condition',
        specification: 'Smooth transition, no visible cracks or thinning >20%',
        severity: 'Critical'
      },
      {
        id: 'sb-2',
        criteria: 'Tail Length',
        specification: '0.5x - 3.0x wire diameter (optimal: 1.0x - 2.0x)',
        severity: 'Minor'
      },
      {
        id: 'sb-3',
        criteria: 'Bond Footprint Width',
        specification: '1.5x - 2.5x wire diameter',
        severity: 'Major'
      },
      {
        id: 'sb-4',
        criteria: 'Bond Footprint Coverage',
        specification: '≥80% of footprint on pad (100% preferred)',
        severity: 'Critical'
      },
      {
        id: 'sb-5',
        criteria: 'Stitch Bond Alignment',
        specification: 'Aligned with wire direction, no twisting',
        severity: 'Major'
      }
    ]
  },
  {
    id: 'loop',
    name: 'Loop Inspection',
    items: [
      {
        id: 'lp-1',
        criteria: 'Loop Height',
        specification: 'Within ±10% of specified height',
        severity: 'Major'
      },
      {
        id: 'lp-2',
        criteria: 'Wire Sweep',
        specification: '<3x wire diameter lateral displacement (<15% span)',
        severity: 'Major'
      },
      {
        id: 'lp-3',
        criteria: 'Wire Sag',
        specification: 'No contact with die surface or other features',
        severity: 'Critical'
      },
      {
        id: 'lp-4',
        criteria: 'Loop Shape/Profile',
        specification: 'Smooth, consistent arc matching specification',
        severity: 'Minor'
      },
      {
        id: 'lp-5',
        criteria: 'Wire-to-Wire Spacing',
        specification: 'No contact between adjacent wires',
        severity: 'Critical'
      }
    ]
  },
  {
    id: 'general',
    name: 'General Inspection',
    items: [
      {
        id: 'gn-1',
        criteria: 'Foreign Material',
        specification: 'No contamination on bonds or wires',
        severity: 'Major'
      },
      {
        id: 'gn-2',
        criteria: 'Wire Damage',
        specification: 'No nicks, scratches, or kinks in wire',
        severity: 'Major'
      },
      {
        id: 'gn-3',
        criteria: 'Pad Damage',
        specification: 'No cratering, peeling, or delamination',
        severity: 'Critical'
      },
      {
        id: 'gn-4',
        criteria: 'Bond Count',
        specification: 'All required bonds present',
        severity: 'Critical'
      }
    ]
  }
]

// State
const checklistState = reactive({})
const expandedCategories = reactive({
  'ball-bond': true,
  'stitch-bond': true,
  'loop': true,
  'general': true
})
const showExportModal = ref(false)
const copyButtonText = ref('Copy')

// Initialize checklist state
categories.forEach(cat => {
  cat.items.forEach(item => {
    checklistState[item.id] = null
  })
})

// Computed
const totalItems = computed(() => {
  return categories.reduce((sum, cat) => sum + cat.items.length, 0)
})

const totalChecked = computed(() => {
  return Object.values(checklistState).filter(v => v !== null).length
})

const passCount = computed(() => {
  return Object.values(checklistState).filter(v => v === 'pass').length
})

const failCount = computed(() => {
  return Object.values(checklistState).filter(v => v === 'fail').length
})

const naCount = computed(() => {
  return Object.values(checklistState).filter(v => v === 'na').length
})

const criticalFailCount = computed(() => {
  let count = 0
  categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.severity === 'Critical' && checklistState[item.id] === 'fail') {
        count++
      }
    })
  })
  return count
})

const majorFailCount = computed(() => {
  let count = 0
  categories.forEach(cat => {
    cat.items.forEach(item => {
      if (item.severity === 'Major' && checklistState[item.id] === 'fail') {
        count++
      }
    })
  })
  return count
})

const overallStatus = computed(() => {
  if (totalChecked.value === 0) return 'pending'
  if (criticalFailCount.value > 0) return 'fail'
  if (majorFailCount.value > 2) return 'fail'
  if (majorFailCount.value > 0) return 'conditional'
  if (failCount.value > 0) return 'conditional'
  return 'pass'
})

const overallStatusText = computed(() => {
  const statusMap = {
    pending: 'Not Started',
    pass: 'PASS',
    fail: 'FAIL',
    conditional: 'Conditional'
  }
  return statusMap[overallStatus.value]
})

const overallStatusClass = computed(() => {
  return `overall-status--${overallStatus.value}`
})

const exportContent = computed(() => {
  const date = new Date().toISOString().split('T')[0]
  const time = new Date().toLocaleTimeString()
  
  let content = `WIRE BOND VISUAL INSPECTION REPORT
=====================================
Date: ${date}
Time: ${time}

SUMMARY
-------
Total Items: ${totalItems.value}
Checked: ${totalChecked.value}
Pass: ${passCount.value}
Fail: ${failCount.value}
N/A: ${naCount.value}

Overall Status: ${overallStatusText.value}
${criticalFailCount.value > 0 ? `Critical Failures: ${criticalFailCount.value}` : ''}
${majorFailCount.value > 0 ? `Major Failures: ${majorFailCount.value}` : ''}

DETAILED RESULTS
----------------
`

  categories.forEach(cat => {
    content += `\n${cat.name.toUpperCase()}\n`
    cat.items.forEach(item => {
      const status = checklistState[item.id] || 'Not checked'
      const statusSymbol = status === 'pass' ? '✓' : status === 'fail' ? '✗' : status === 'na' ? '—' : '○'
      content += `  [${statusSymbol}] ${item.criteria} (${item.severity})\n`
      if (status === 'fail') {
        content += `      Spec: ${item.specification}\n`
      }
    })
  })

  content += `\n=====================================
Reference: MIL-STD-883 Method 2010
Generated by Wire Bonding Inspection Tool
`

  return content
})

// Methods
function toggleCategory(categoryId) {
  expandedCategories[categoryId] = !expandedCategories[categoryId]
}

function setItemStatus(itemId, status) {
  checklistState[itemId] = status
}

function getCategoryProgress(categoryId) {
  const category = categories.find(c => c.id === categoryId)
  if (!category) return '0/0'
  
  const checked = category.items.filter(item => checklistState[item.id] !== null).length
  return `${checked}/${category.items.length}`
}

function resetChecklist() {
  Object.keys(checklistState).forEach(key => {
    checklistState[key] = null
  })
}

function exportSummary() {
  showExportModal.value = true
}

async function copyToClipboard() {
  try {
    await navigator.clipboard.writeText(exportContent.value)
    copyButtonText.value = 'Copied!'
    setTimeout(() => {
      copyButtonText.value = 'Copy'
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

function printSummary() {
  const printWindow = window.open('', '_blank')
  printWindow.document.write(`
    <html>
      <head>
        <title>Wire Bond Inspection Report</title>
        <style>
          body { font-family: monospace; white-space: pre-wrap; padding: 20px; }
        </style>
      </head>
      <body>${exportContent.value}</body>
    </html>
  `)
  printWindow.document.close()
  printWindow.print()
}
</script>

<style scoped>
.inspection-checklist {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.checklist-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-success-600), var(--color-success-700));
  color: var(--color-text-inverse);
}

.checklist-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.checklist-title svg {
  opacity: 0.9;
}

.checklist-description {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

/* Summary Bar */
.summary-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-elevated);
  border-bottom: 1px solid var(--color-border-light);
}

.summary-stats {
  display: flex;
  gap: var(--space-6);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.stat-value {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.stat-item--pass .stat-value {
  color: var(--color-success-600);
}

.stat-item--fail .stat-value {
  color: var(--color-error-600);
}

.stat-item--na .stat-value {
  color: var(--color-text-tertiary);
}

.stat-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.overall-status {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-weight: var(--font-weight-semibold);
  font-size: var(--font-size-sm);
}

.overall-status--pending {
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
}

.overall-status--pass {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}

.overall-status--fail {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}

.overall-status--conditional {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

/* Checklist Body */
.checklist-body {
  max-height: 500px;
  overflow-y: auto;
}

.category-section {
  border-bottom: 1px solid var(--color-border-light);
}

.category-section:last-child {
  border-bottom: none;
}

.category-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface);
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.category-header:hover {
  background-color: var(--color-surface-hover);
}

.category-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.category-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.category-progress {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.category-chevron {
  color: var(--color-text-tertiary);
  transition: transform var(--transition-fast);
}

.category-header--expanded .category-chevron {
  transform: rotate(180deg);
}

.category-content {
  padding: 0 var(--space-5) var(--space-4);
}

/* Checklist Item */
.checklist-item {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--space-4);
  padding: var(--space-3);
  margin-bottom: var(--space-2);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  transition: all var(--transition-fast);
}

.checklist-item:last-child {
  margin-bottom: 0;
}

.checklist-item--pass {
  border-color: var(--color-success-200);
  background-color: var(--color-success-50);
}

.checklist-item--fail {
  border-color: var(--color-error-200);
  background-color: var(--color-error-50);
}

.checklist-item--na {
  opacity: 0.7;
}

.item-main {
  flex: 1;
}

.item-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-1);
}

.item-criteria {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.severity-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.severity-badge--critical {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}

.severity-badge--major {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.severity-badge--minor {
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
}

.item-spec {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Radio Controls */
.item-controls {
  flex-shrink: 0;
}

.radio-group {
  display: flex;
  gap: var(--space-1);
}

.radio-option {
  cursor: pointer;
}

.radio-option input {
  position: absolute;
  opacity: 0;
  pointer-events: none;
}

.radio-label {
  display: inline-flex;
  align-items: center;
  gap: var(--space-1);
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  transition: all var(--transition-fast);
}

.radio-option:hover .radio-label {
  background-color: var(--color-surface-hover);
}

.radio-option--pass input:checked + .radio-label {
  background-color: var(--color-success-500);
  border-color: var(--color-success-500);
  color: white;
}

.radio-option--fail input:checked + .radio-label {
  background-color: var(--color-error-500);
  border-color: var(--color-error-500);
  color: white;
}

.radio-option--na input:checked + .radio-label {
  background-color: var(--color-neutral-400);
  border-color: var(--color-neutral-400);
  color: white;
}

/* Actions */
.checklist-actions {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border-light);
}

.action-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.action-button--primary {
  background-color: var(--color-primary-500);
  color: white;
  border: none;
}

.action-button--primary:hover {
  background-color: var(--color-primary-600);
}

.action-button--secondary {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-default);
}

.action-button--secondary:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Modal */
.modal-overlay {
  position: fixed;
  inset: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal-content {
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  display: flex;
  flex-direction: column;
  box-shadow: var(--shadow-xl);
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-4) var(--space-5);
  border-bottom: 1px solid var(--color-border-light);
}

.modal-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.modal-close {
  padding: var(--space-2);
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: var(--radius-default);
  transition: all var(--transition-fast);
}

.modal-close:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

.modal-body {
  flex: 1;
  overflow-y: auto;
  padding: var(--space-4) var(--space-5);
}

.export-content {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  line-height: var(--line-height-relaxed);
  white-space: pre-wrap;
  background-color: var(--color-surface-elevated);
  padding: var(--space-4);
  border-radius: var(--radius-default);
  margin: 0;
  overflow-x: auto;
}

.modal-footer {
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border-light);
}

/* Responsive */
@media (max-width: 768px) {
  .summary-bar {
    flex-direction: column;
    gap: var(--space-4);
  }
  
  .summary-stats {
    width: 100%;
    justify-content: space-around;
  }
  
  .checklist-item {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .item-controls {
    width: 100%;
  }
  
  .radio-group {
    justify-content: stretch;
  }
  
  .radio-option {
    flex: 1;
  }
  
  .radio-label {
    justify-content: center;
    width: 100%;
  }
}
</style>
