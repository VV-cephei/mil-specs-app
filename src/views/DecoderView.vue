<template>
  <div class="decoder-view">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12">
          <!-- Page Header -->
          <v-card class="mb-4" elevation="2">
            <v-card-title class="d-flex align-center flex-wrap ga-4 pa-4">
              <v-icon icon="mdi-file-document" size="32" color="primary" class="mr-2"></v-icon>
              <div>
                <h1 class="text-h5 font-weight-bold">DD Form 2326 Decoder</h1>
                <p class="text-body-2 text-grey mb-0">Official DD Form 2326 - Preservation and Packing Data</p>
              </div>
            </v-card-title>
          </v-card>
          
          <!-- Input Section -->
          <v-card class="mb-4" elevation="2">
            <v-card-title class="pa-4">
              <v-icon icon="mdi-pencil" class="mr-2"></v-icon>
              Input Form Data
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="viewMode" mandatory density="compact">
                <v-btn value="form" size="small">
                  <v-icon icon="mdi-file-document" class="mr-1"></v-icon>
                  Form View
                </v-btn>
                <v-btn value="grid" size="small">
                  <v-icon icon="mdi-grid" class="mr-1"></v-icon>
                  Grid View
                </v-btn>
              </v-btn-toggle>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-4">
              <v-row>
                <v-col cols="12">
                  <!-- Form View -->
                  <div v-if="viewMode === 'form'">
                    <DD2326Form v-model="formData" />
                  </div>
                  
                  <!-- Grid View (Legacy) -->
                  <div v-else>
                    <v-tabs v-model="inputTab" color="primary">
                      <v-tab value="raw">Raw Data Grid</v-tab>
                      <v-tab value="paste">Paste Data</v-tab>
                      <v-tab value="json">JSON Input</v-tab>
                      <v-tab value="file">File Upload</v-tab>
                    </v-tabs>
                    
                    <v-window v-model="inputTab" class="mt-4">
                      <v-window-item value="raw">
                        <div class="d-flex justify-center overflow-x-auto py-4">
                          <RawDataGrid v-model="rawGridData" />
                        </div>
                        <p class="text-caption text-center text-grey mt-2">
                          Enter data into the 4 sections (80 characters each). Section 1 contains the primary packaging codes.
                        </p>
                      </v-window-item>

                      <v-window-item value="paste">
                      <v-textarea
                        v-model="inputData"
                        label="Paste DD Form 2326 data"
                        hint="Enter form data in key: value format"
                        persistent-hint
                        rows="10"
                        auto-grow
                      ></v-textarea>
                      </v-window-item>
                      
                      <v-window-item value="json">
                      <v-textarea
                        v-model="jsonInput"
                        label="Enter JSON data"
                        hint="Valid JSON object with form fields"
                        persistent-hint
                        rows="10"
                        auto-grow
                        :error-messages="jsonError"
                      ></v-textarea>
                      </v-window-item>
                      
                      <v-window-item value="file">
                      <v-file-input
                        v-model="fileInput"
                        label="Upload DD Form 2326 file"
                        accept=".json,.txt"
                        prepend-icon="mdi-upload"
                        show-size
                      ></v-file-input>
                      <p class="text-caption text-grey mt-2">
                        Upload a JSON or text file containing DD Form 2326 data
                      </p>
                      </v-window-item>
                    </v-window>
                  </div>
                </v-col>
              </v-row>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-4">
              <v-btn variant="outlined" @click="clearInput">
                <v-icon icon="mdi-clear" class="mr-1"></v-icon>
                Clear
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="decodeData" :loading="decoding">
                <v-icon icon="mdi-search" class="mr-1"></v-icon>
                Decode
              </v-btn>
            </v-card-actions>
          </v-card>
          
          <!-- Results Section -->
          <v-card v-if="decodedData" elevation="2">
            <v-card-title class="d-flex align-center pa-4">
              <v-icon icon="mdi-table-large" class="mr-2"></v-icon>
              Decoded Results
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                label="Search..."
                single-line
                hide-details
                density="compact"
                variant="outlined"
                style="max-width: 250px"
              ></v-text-field>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text class="pa-4">
              <!-- Human Readable Summary -->
              <v-alert
                v-if="decodedData"
                color="info"
                variant="tonal"
                class="mb-4"
                border="start"
              >
                <div class="text-h6 mb-2">Packaging Requirement Summary</div>
                <div v-html="generatedSummary"></div>
              </v-alert>

              <!-- Decoded Data Table -->
              <v-table density="compact" class="decoded-table">
                <thead>
                  <tr>
                    <th style="width: 35%">Field</th>
                    <th>Value</th>
                    <th>MIL-STD Reference</th>
                    <th style="width: 80px">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="field in filteredDecodedFields" :key="field.key">
                    <td class="font-weight-medium">{{ field.label }}</td>
                    <td>
                      <template v-if="field.value">
                        <v-chip
                          v-if="field.isCode"
                          :color="getCodeColor(field.key)"
                          size="small"
                          class="mr-1"
                        >
                          {{ field.value }}
                        </v-chip>
                        <span>{{ field.displayValue }}</span>
                      </template>
                      <span v-else class="text-grey">-</span>
                    </td>
                    <td>
                      <a
                        v-if="field.reference"
                        :href="`/specs?section=${field.referenceSection}&search=${field.value}`"
                        class="text-decoration-none"
                      >
                        <v-icon icon="mdi-link" size="small" class="mr-1"></v-icon>
                        {{ field.reference }}
                      </a>
                      <span v-else class="text-grey">-</span>
                    </td>
                    <td>
                      <v-btn
                        icon="mdi-content-copy"
                        size="x-small"
                        variant="text"
                        @click="copyField(field)"
                        title="Copy value"
                      ></v-btn>
                    </td>
                  </tr>
                </tbody>
              </v-table>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions class="pa-4">
              <v-btn variant="outlined" @click="exportJSON">
                <v-icon icon="mdi-code-json" class="mr-1"></v-icon>
                Export JSON
              </v-btn>
              <v-btn variant="outlined" @click="exportCSV">
                <v-icon icon="mdi-table" class="mr-1"></v-icon>
                Export CSV
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn color="primary" @click="createNewForm">
                <v-icon icon="mdi-plus" class="mr-1"></v-icon>
                Create New Form
              </v-btn>
            </v-card-actions>
          </v-card>
          
          <!-- Empty State -->
          <v-card v-else elevation="2">
            <v-card-text class="text-center py-12">
              <v-icon icon="mdi-code-json" size="64" color="grey-lighten-1"></v-icon>
              <h3 class="text-h6 mt-4 text-grey">No Decoded Data</h3>
              <p class="text-body-2 text-grey">
                Enter DD Form 2326 data above and click Decode to see results
              </p>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import { useUIStore } from '@/stores/ui'
import { useSpecsStore } from '@/stores/specs'
import RawDataGrid from '@/components/dd2326/RawDataGrid.vue'
import DD2326Form from '@/components/dd2326/DD2326Form.vue'

const router = useRouter()
const uiStore = useUIStore()
const specsStore = useSpecsStore()

// View mode
const viewMode = ref('form')

// Input state
const inputTab = ref('raw')
const inputData = ref('')
const jsonInput = ref('')
const fileInput = ref(null)
const jsonError = ref('')

// 4 rows x 80 cols (for grid view)
const rawGridData = reactive(Array(4).fill(null).map(() => Array(80).fill('')))

// Form data (for form view)
const formData = reactive({
  topFields: {
    nomenclature: '',
    designActivityPartNumber: '',
    manufacturersCageCode: '',
    configurationItemSpecNumber: ''
  },
  partA: Array(80).fill(''),
  partB: Array(80).fill(''),
  partC: Array(80).fill(''),
  partD: Array(80).fill('')
})

// Watch for changes in form data and sync to grid
watch(() => formData, (newVal) => {
  if (viewMode.value === 'form') {
    // Sync form data to raw grid for decoding
    for (let i = 0; i < 80; i++) {
      rawGridData[0][i] = newVal.partA[i] || ''
      rawGridData[1][i] = newVal.partB[i] || ''
      rawGridData[2][i] = newVal.partC[i] || ''
      rawGridData[3][i] = newVal.partD[i] || ''
    }
  }
}, { deep: true })

// Decoding state
const decoding = ref(false)
const decodedData = ref(null)
const searchQuery = ref('')

// Field definitions with labels and references
const fieldDefinitions = [
  { key: 'nomenclature', label: 'Nomenclature', reference: null, referenceSection: null },
  { key: 'designActivityPartNumber', label: 'Design Activity Part Number', reference: null, referenceSection: null },
  { key: 'manufacturersCageCode', label: 'Manufacturer\'s CAGE Code', reference: null, referenceSection: null },
  { key: 'configurationItemSpecNumber', label: 'Configuration Item Specification Number', reference: null, referenceSection: null },
  { key: 'methodOfPreservation', label: 'Method of Preservation (PRES METH)', reference: 'MIL-STD-2073-1', referenceSection: 'methods' },
  { key: 'qup', label: 'Quality per Unit Pack (QUP)', reference: 'Appendix E, Section 1', referenceSection: 'methods' },
  { key: 'cleaningDrying', label: 'Cleaning & Drying', reference: 'Appendix E, Section 3', referenceSection: 'cleaning' },
  { key: 'preservativeMaterial', label: 'Preservative Materials', reference: 'Appendix E, Section 4', referenceSection: 'preservation' },
  { key: 'wrappingMaterial', label: 'Wrapping Material', reference: 'Appendix E, Section 5', referenceSection: 'wrapping' },
  { key: 'cushioningMaterial', label: 'Cushioning Material', reference: 'Appendix E, Section 6', referenceSection: 'cushioning' },
  { key: 'cushioningThickness', label: 'Cushioning Thickness', reference: 'Appendix E, Section 7', referenceSection: 'cushioning' },
  { key: 'unitIntermediateContainer', label: 'Unit/Intermediate Container', reference: 'Appendix E, Section 8', referenceSection: 'containers' },
  { key: 'packingCode', label: 'Packing Code', reference: 'Appendix E, Section 9', referenceSection: 'methods' },
  { key: 'specialMarking', label: 'Special Marking', reference: 'Appendix E, Section 12', referenceSection: null },
  { key: 'unitContainerLevel', label: 'Unit Container Level', reference: 'Appendix E, Section 13', referenceSection: null }
]

// Computed
const generatedSummary = computed(() => {
  if (!decodedData.value) return ''
  
  const d = decodedData.value
  let summary = ''
  
  // QUP
  summary += `<p class="mb-2"><strong>Quantity:</strong> Pack <strong>${d.qup || '1'}</strong> item(s) per unit container.</p>`
  
  // Method
  const method = specsStore.getMethodByCode(d.methodOfPreservation)
  const methodDesc = method ? method.description : 'Unknown Method'
  summary += `<p class="mb-2"><strong>Preservation Method ${d.methodOfPreservation || '?'}:</strong> ${methodDesc}</p>`
  
  // Cleaning
  if (d.cleaningDrying) {
    const cleaning = specsStore.getCleaningByCode(d.cleaningDrying)
    const cleaningDesc = cleaning ? cleaning.description : 'Unknown Procedure'
    summary += `<p class="mb-2"><strong>Cleaning:</strong> ${cleaningDesc} (Code ${d.cleaningDrying})</p>`
  }
  
  // Preservative
  if (d.preservativeMaterial && d.preservativeMaterial !== '00') {
    const pres = specsStore.getPreservationByCode(d.preservativeMaterial)
    const presDesc = pres ? pres.description : 'Unknown Material'
    summary += `<p class="mb-2"><strong>Preservative:</strong> ${presDesc} (Code ${d.preservativeMaterial})</p>`
  }
  
  // Wrapping/Cushioning
  if (d.wrappingMaterial || d.cushioningMaterial) {
    summary += `<p class="mb-2"><strong>Materials:</strong> `
    if (d.wrappingMaterial) summary += `Wrap with code <strong>${d.wrappingMaterial}</strong>. `
    if (d.cushioningMaterial) summary += `Cushion with code <strong>${d.cushioningMaterial}</strong>`
    if (d.cushioningThickness) summary += ` (${d.cushioningThickness} inch thick)`
    summary += `.</p>`
  }
  
  // Container
  if (d.unitIntermediateContainer) {
    summary += `<p class="mb-0"><strong>Container:</strong> Use container code <strong>${d.unitIntermediateContainer}</strong>`
    if (d.unitContainerLevel) summary += ` at Level <strong>${d.unitContainerLevel}</strong>`
    summary += `.</p>`
  }
  
  return summary
})

const filteredDecodedFields = computed(() => {
  if (!decodedData.value) return []
  
  return fieldDefinitions
    .map(field => {
      const value = decodedData.value[field.key]
      let displayValue = formatValue(value, field.key)
      
      return {
        ...field,
        value,
        displayValue,
        isCode: isCodeField(field.key)
      }
    })
    .filter(field => {
      if (!searchQuery.value) return true
      const query = searchQuery.value.toLowerCase()
      return (
        field.label.toLowerCase().includes(query) ||
        (field.value && field.value.toString().toLowerCase().includes(query)) ||
        (field.displayValue && field.displayValue.toString().toLowerCase().includes(query))
      )
    })
})

// Methods
function formatValue(value, key) {
  if (!value) return '-'
  
  // Special handling for methodOfPreservation
  if (key === 'methodOfPreservation' && value) {
    const method = specsStore.getMethodByCode(value)
    if (method) {
      return method.description
    }
  }
  
  if (typeof value === 'object') {
    return value.description || value.code || JSON.stringify(value)
  }
  return value
}

function isCodeField(key) {
  const codeFields = ['qup', 'methodOfPreservation', 'cleaningDrying', 'preservativeMaterial', 'packingCode']
  return codeFields.includes(key)
}

function getCodeColor(key) {
  const colors = {
    qup: 'primary',
    methodOfPreservation: 'success',
    cleaningDrying: 'warning',
    preservativeMaterial: 'info',
    packingCode: 'secondary'
  }
  return colors[key] || 'grey'
}

function clearInput() {
  inputData.value = ''
  jsonInput.value = ''
  fileInput.value = null
  decodedData.value = null
  jsonError.value = ''
}

function decodeData() {
  decoding.value = true
  jsonError.value = ''
  
  try {
    let data = {}
    
    if (viewMode.value === 'form' || inputTab.value === 'raw') {
      // Parse from Part B (Section 2) for preservation method
      const partB = rawGridData[1] // Part B array of chars
      
      // Helper to join chars
      const getVal = (arr, start, len) => {
        const val = arr.slice(start, start + len).join('').trim()
        return val || ''
      }
      
      // Extract PRES METH from Part B cells 29-30 (index 28-29)
      const presMeth = getVal(partB, 28, 2)
      
      // Parse other fields from Part A (for backward compatibility)
      const partA = rawGridData[0]
      
      data = {
        // From Part B
        methodOfPreservation: presMeth,
        
        // Legacy fields (keeping for compatibility)
        qup: getVal(partA, 0, 3),
        cleaningDrying: getVal(partA, 5, 1),
        preservativeMaterial: getVal(partA, 6, 2),
        wrappingMaterial: getVal(partA, 8, 2),
        cushioningMaterial: getVal(partA, 10, 2),
        cushioningThickness: getVal(partA, 12, 1),
        unitIntermediateContainer: getVal(partA, 13, 2),
        intermediateContainer: getVal(partA, 15, 2),
        unitContainerLevel: getVal(partA, 17, 1),
        packingCode: getVal(partA, 18, 1),
        specialMarking: getVal(partA, 19, 2)
      }
      
      // Add top fields if in form view
      if (viewMode.value === 'form') {
        data.nomenclature = formData.topFields.nomenclature
        data.designActivityPartNumber = formData.topFields.designActivityPartNumber
        data.manufacturersCageCode = formData.topFields.manufacturersCageCode
        data.configurationItemSpecNumber = formData.topFields.configurationItemSpecNumber
      }
      
      // Filter out empty values
      Object.keys(data).forEach(key => {
        if (!data[key]) delete data[key]
      })
    } else if (inputTab.value === 'paste') {
      // Parse key: value format
      const lines = inputData.value.split('\n')
      lines.forEach(line => {
        const colonIndex = line.indexOf(':')
        if (colonIndex > 0) {
          const key = line.substring(0, colonIndex).trim()
          const value = line.substring(colonIndex + 1).trim()
          if (key && value) {
            data[key] = value
          }
        }
      })
    } else if (inputTab.value === 'json') {
      data = JSON.parse(jsonInput.value)
    } else if (inputTab.value === 'file') {
      if (fileInput.value) {
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            data = JSON.parse(e.target.result)
            decodedData.value = data
            decoding.value = false
          } catch (error) {
            // Try parsing as key: value format
            const lines = e.target.result.split('\n')
            lines.forEach(line => {
              const colonIndex = line.indexOf(':')
              if (colonIndex > 0) {
                const key = line.substring(0, colonIndex).trim()
                const value = line.substring(colonIndex + 1).trim()
                if (key && value) {
                  data[key] = value
                }
              }
            })
            decodedData.value = data
            decoding.value = false
          }
        }
        reader.readAsText(fileInput.value)
        return
      }
    }
    
    decodedData.value = data
    uiStore.showSnackbar('Data decoded successfully', 'success')
  } catch (error) {
    jsonError.value = 'Invalid JSON format'
    uiStore.showSnackbar('Error decoding data', 'error')
  } finally {
    decoding.value = false
  }
}

function copyField(field) {
  navigator.clipboard.writeText(field.value)
  uiStore.showSnackbar('Value copied to clipboard', 'success')
}

function exportJSON() {
  if (!decodedData.value) return
  
  const dataStr = JSON.stringify(decodedData.value, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'DD2326_decoded.json'
  link.click()
  URL.revokeObjectURL(url)
  
  uiStore.showSnackbar('JSON exported successfully', 'success')
}

function exportCSV() {
  if (!decodedData.value) return
  
  const headers = ['Field', 'Value', 'MIL-STD Reference']
  const rows = fieldDefinitions.map(field => {
    const value = decodedData.value[field.key]
    return [
      field.label,
      formatValue(value),
      field.reference || ''
    ]
  })
  
  const csv = [headers.join(','), ...rows.map(row => row.map(cell => `"${cell}"`).join(','))].join('\n')
  
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = 'DD2326_decoded.csv'
  link.click()
  URL.revokeObjectURL(url)
  
  uiStore.showSnackbar('CSV exported successfully', 'success')
}

function createNewForm() {
  router.push('/form-generator')
}

onMounted(async () => {
  if (specsStore.methods.length === 0) {
    await specsStore.loadSpecData()
  }
})
</script>

<style scoped>
.decoder-view {
  background-color: #f5f5f5;
  min-height: 100vh;
  padding-bottom: 40px;
}

.decoded-table {
  border: 1px solid #e0e0e0;
  border-radius: 4px;
}

/* Ensure form view has proper spacing */
:deep(.dd2326-form-container) {
  margin: 0;
  padding: 0;
}
</style>
