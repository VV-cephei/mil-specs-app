<template>
  <div class="form-generator-view">
    <!-- Page Header -->
    <div class="page-header">
      <div class="page-header-content container">
        <nav class="breadcrumb">
          <span class="breadcrumb-item">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
          </span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-item">
            <router-link to="/tools" class="breadcrumb-link">Tools</router-link>
          </span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">Form Generator</span>
        </nav>
        <div class="page-header-row">
          <div class="page-header-info">
            <h1 class="page-title">DD Form 2326 Generator</h1>
            <p class="page-description">Create Military Packaging Data forms from MIL-STD-2073 codes</p>
          </div>
          <div class="page-actions">
            <div class="btn-group">
              <button 
                :class="['btn', viewMode === 'form' ? 'btn-primary' : 'btn-outlined']"
                @click="viewMode = 'form'"
              >
                Form
              </button>
              <button 
                :class="['btn', viewMode === 'wizard' ? 'btn-primary' : 'btn-outlined']"
                @click="viewMode = 'wizard'"
              >
                Wizard
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="page-body">
      <div class="page-body-content container">
        <!-- Form Card -->
        <div class="card card-elevated">
          <div class="card-body">
            <form ref="form" @submit.prevent="handleSubmit">
              <div class="form-grid">
                <!-- Quality per Unit Pack (QUP) -->
                <div class="input-wrapper">
                  <label class="input-label input-label-required" for="qup">Quality per Unit Pack (QUP)</label>
                  <input 
                    id="qup"
                    v-model="formData.qup"
                    type="text"
                    class="input"
                    maxlength="4"
                    placeholder="e.g., 001"
                  >
                  <span class="input-helper">1-4 alphanumeric characters per MIL-STD-2073</span>
                </div>
                
                <!-- Method of Preservation -->
                <div class="input-wrapper">
                  <label class="input-label input-label-required" for="preservation">Method of Preservation</label>
                  <select 
                    id="preservation"
                    v-model="formData.methodOfPreservation"
                    class="select"
                  >
                    <option value="">-- Select method --</option>
                    <option 
                      v-for="method in preservationMethods" 
                      :key="method.code" 
                      :value="method"
                    >
                      {{ method.code }} - {{ method.description }}
                    </option>
                  </select>
                </div>
                
                <!-- Cleaning & Drying -->
                <div class="input-wrapper">
                  <label class="input-label" for="cleaning">Cleaning & Drying</label>
                  <select 
                    id="cleaning"
                    v-model="formData.cleaningDrying"
                    class="select"
                  >
                    <option value="">-- Select code --</option>
                    <option 
                      v-for="code in cleaningCodes" 
                      :key="code.code" 
                      :value="code"
                    >
                      {{ code.code }} - {{ code.description }}
                    </option>
                  </select>
                </div>
                
                <!-- Preservative Materials -->
                <div class="input-wrapper">
                  <label class="input-label" for="preservative">Preservative Materials</label>
                  <select 
                    id="preservative"
                    v-model="formData.preservativeMaterial"
                    class="select"
                  >
                    <option value="">-- Select material --</option>
                    <option 
                      v-for="code in preservativeCodes" 
                      :key="code.code" 
                      :value="code"
                    >
                      {{ code.code }} - {{ code.description }}
                    </option>
                  </select>
                </div>
                
                <!-- Wrapping Material -->
                <div class="input-wrapper">
                  <label class="input-label" for="wrapping">Wrapping Material</label>
                  <input 
                    id="wrapping"
                    v-model="formData.wrappingMaterial"
                    type="text"
                    class="input"
                    placeholder="Material specification or code"
                  >
                </div>
                
                <!-- Cushioning Material -->
                <div class="input-wrapper">
                  <label class="input-label" for="cushioning">Cushioning Material</label>
                  <input 
                    id="cushioning"
                    v-model="formData.cushioningMaterial"
                    type="text"
                    class="input"
                    placeholder="Material specification or code"
                  >
                </div>
                
                <!-- Cushioning Thickness -->
                <div class="input-wrapper">
                  <label class="input-label" for="thickness">Cushioning Thickness</label>
                  <input 
                    id="thickness"
                    v-model="formData.cushioningThickness"
                    type="number"
                    step="0.125"
                    class="input"
                    placeholder="Thickness in inches"
                  >
                </div>
                
                <!-- Unit/Intermediate Container -->
                <div class="input-wrapper">
                  <label class="input-label" for="container">Unit/Intermediate Container</label>
                  <select 
                    id="container"
                    v-model="formData.unitIntermediateContainer"
                    class="select"
                  >
                    <option value="">-- Select container --</option>
                    <option v-for="type in containerTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>
                
                <!-- Packing Code -->
                <div class="input-wrapper">
                  <label class="input-label" for="packing">Packing Code</label>
                  <input 
                    id="packing"
                    v-model="formData.packingCode"
                    type="text"
                    class="input"
                    maxlength="4"
                    placeholder="1-4 alphanumeric characters"
                  >
                </div>
                
                <!-- Hazardous Material -->
                <div class="input-wrapper">
                  <label class="input-label" for="hazardous">Hazardous Material</label>
                  <select 
                    id="hazardous"
                    v-model="formData.hazardousMaterial"
                    class="select"
                  >
                    <option value="">-- Select --</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>
                
                <!-- Unit Container Level -->
                <div class="input-wrapper">
                  <label class="input-label" for="level">Unit Container Level</label>
                  <select 
                    id="level"
                    v-model="formData.unitContainerLevel"
                    class="select"
                  >
                    <option value="">-- Select level --</option>
                    <option v-for="level in containerLevels" :key="level" :value="level">
                      {{ level }}
                    </option>
                  </select>
                </div>
                
                <!-- Shelf-Life -->
                <div class="input-wrapper">
                  <label class="input-label" for="shelflife">Shelf-Life</label>
                  <input 
                    id="shelflife"
                    v-model="formData.shelfLife"
                    type="text"
                    class="input"
                    placeholder="e.g., 12/15 or 24 months"
                  >
                </div>
                
                <!-- Shelf-Life Action -->
                <div class="input-wrapper">
                  <label class="input-label" for="shelfaction">Shelf-Life Action</label>
                  <select 
                    id="shelfaction"
                    v-model="formData.shelfLifeAction"
                    class="select"
                  >
                    <option value="">-- Select action --</option>
                    <option v-for="action in shelfLifeActions" :key="action" :value="action">
                      {{ action }}
                    </option>
                  </select>
                </div>
                
                <!-- Type of Storage -->
                <div class="input-wrapper">
                  <label class="input-label" for="storage">Type of Storage</label>
                  <select 
                    id="storage"
                    v-model="formData.typeOfStorage"
                    class="select"
                  >
                    <option value="">-- Select storage --</option>
                    <option v-for="type in storageTypes" :key="type" :value="type">
                      {{ type }}
                    </option>
                  </select>
                </div>
                
                <!-- Special Material Content (full width) -->
                <div class="input-wrapper col-span-full">
                  <label class="input-label" for="special">Special Material Content</label>
                  <textarea 
                    id="special"
                    v-model="formData.specialMaterialContent"
                    class="textarea"
                    rows="2"
                    placeholder="Describe any special material requirements"
                  ></textarea>
                </div>
                
                <!-- Special Marking (full width) -->
                <div class="input-wrapper col-span-full">
                  <label class="input-label" for="marking">Special Marking</label>
                  <textarea 
                    id="marking"
                    v-model="formData.specialMarking"
                    class="textarea"
                    rows="2"
                    placeholder="Any special marking requirements"
                  ></textarea>
                </div>
                
                <!-- Optional Procedures (full width) -->
                <div class="input-wrapper col-span-full">
                  <label class="input-label" for="procedures">Optional Procedures</label>
                  <textarea 
                    id="procedures"
                    v-model="formData.optionalProcedures"
                    class="textarea"
                    rows="2"
                    placeholder="Describe any optional procedures"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
          
          <hr class="card-divider">
          
          <!-- Action Buttons -->
          <div class="card-footer card-footer-actions card-footer-actions-spread">
            <div class="btn-group-left">
              <button type="button" class="btn btn-outlined" @click="resetForm">
                Reset
              </button>
              <button type="button" class="btn btn-outlined" @click="saveForm">
                Save
              </button>
            </div>
            <div class="btn-group-right">
              <button type="button" class="btn btn-outlined" @click="previewForm">
                Preview
              </button>
              <button type="button" class="btn btn-primary" @click="exportForm" :disabled="!isFormValid">
                Export PDF
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Preview Modal -->
    <div v-if="previewDialog" class="modal-overlay" @click.self="previewDialog = false">
      <div class="modal card card-elevated">
        <div class="card-header card-header-with-actions">
          <h3 class="card-header-title">DD Form 2326 Preview</h3>
          <button class="btn btn-ghost btn-icon" @click="previewDialog = false">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"/>
              <line x1="6" y1="6" x2="18" y2="18"/>
            </svg>
          </button>
        </div>
        <div class="card-body">
          <div class="table-wrapper">
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>Field</th>
                  <th>Value</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(value, key) in formData" :key="key">
                  <td class="table-cell-nowrap"><strong>{{ formatLabel(key) }}</strong></td>
                  <td>{{ formatValue(value) }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div class="card-footer card-footer-actions card-footer-actions-spread">
          <button class="btn btn-outlined" @click="previewDialog = false">Close</button>
          <button class="btn btn-primary" @click="exportForm">Export PDF</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useSpecsStore } from '@/stores/specs'
import { useFormsStore } from '@/stores/forms'
import { useUIStore } from '@/stores/ui'
import jsPDF from 'jspdf'
import 'jspdf-autotable'

const specsStore = useSpecsStore()
const formsStore = useFormsStore()
const uiStore = useUIStore()

// Form state
const form = ref(null)
const viewMode = ref('form')
const previewDialog = ref(false)

const formData = reactive({
  qup: '',
  methodOfPreservation: null,
  cleaningDrying: null,
  preservativeMaterial: null,
  wrappingMaterial: '',
  cushioningMaterial: '',
  cushioningThickness: '',
  unitIntermediateContainer: null,
  packingCode: '',
  specialMaterialContent: '',
  hazardousMaterial: null,
  specialMarking: '',
  unitContainerLevel: null,
  optionalProcedures: '',
  shelfLife: '',
  shelfLifeAction: null,
  typeOfStorage: null
})

// Form validation
const isFormValid = computed(() => {
  return formData.qup && formData.methodOfPreservation
})

// Dropdown options
const preservationMethods = computed(() => specsStore.methods)
const cleaningCodes = computed(() => specsStore.cleaning)
const preservativeCodes = computed(() => specsStore.preservation)

const containerTypes = [
  'Fiberboard Box (PPP-B-636)',
  'Wood Box (PPP-B-621)',
  'Metal Container',
  'Plastic Container',
  'Watervaporproof Bag',
  'Greaseproof Bag',
  'Other'
]

const containerLevels = ['Level A', 'Level B', 'Level C']

const shelfLifeActions = ['Use First', 'Inspect/Test', 'Dispose', 'Return to Supplier']

const storageTypes = ['Controlled Humidity', 'Refrigerated', 'Frozen', 'Shelter', 'Open']

// Methods
function formatLabel(key) {
  const labels = {
    qup: 'Quality per Unit Pack (QUP)',
    methodOfPreservation: 'Method of Preservation',
    cleaningDrying: 'Cleaning & Drying',
    preservativeMaterial: 'Preservative Materials',
    wrappingMaterial: 'Wrapping Material',
    cushioningMaterial: 'Cushioning Material',
    cushioningThickness: 'Cushioning Thickness',
    unitIntermediateContainer: 'Unit/Intermediate Container',
    packingCode: 'Packing Code',
    specialMaterialContent: 'Special Material Content',
    hazardousMaterial: 'Hazardous Material',
    specialMarking: 'Special Marking',
    unitContainerLevel: 'Unit Container Level',
    optionalProcedures: 'Optional Procedures',
    shelfLife: 'Shelf-Life',
    shelfLifeAction: 'Shelf-Life Action',
    typeOfStorage: 'Type of Storage'
  }
  return labels[key] || key
}

function formatValue(value) {
  if (!value) return '-'
  if (typeof value === 'object') {
    return value.description || value.code || '-'
  }
  return value
}

function handleSubmit() {
  if (isFormValid.value) {
    exportForm()
  }
}

function resetForm() {
  Object.keys(formData).forEach(key => {
    formData[key] = typeof formData[key] === 'string' ? '' : null
  })
  uiStore.showSnackbar('Form reset successfully', 'info')
}

function saveForm() {
  const id = formsStore.saveForm(formData)
  uiStore.showSnackbar('Form saved successfully', 'success')
  console.log('Saved form ID:', id)
}

function previewForm() {
  previewDialog.value = true
}

function exportForm() {
  const doc = new jsPDF()
  
  // Title
  doc.setFontSize(18)
  doc.text('DD Form 2326 - Military Packaging Data', 105, 20, { align: 'center' })
  
  // Form data
  doc.setFontSize(10)
  let y = 35
  
  const entries = Object.entries(formData).filter(([_, value]) => value)
  
  entries.forEach(([key, value]) => {
    const label = formatLabel(key)
    const val = formatValue(value)
    
    doc.setFont(undefined, 'bold')
    doc.text(`${label}:`, 20, y)
    doc.setFont(undefined, 'normal')
    
    // Split long text
    const lines = doc.splitTextToSize(val, 130)
    doc.text(lines, 80, y)
    
    y += lines.length * 5 + 3
    
    // Page break if needed
    if (y > 270) {
      doc.addPage()
      y = 20
    }
  })
  
  // Footer
  doc.setFontSize(8)
  doc.text(`Generated by mil-specs.com on ${new Date().toLocaleDateString()}`, 105, 290, { align: 'center' })
  
  doc.save('DD2326_Military_Packaging_Data.pdf')
  uiStore.showSnackbar('PDF exported successfully', 'success')
}

onMounted(async () => {
  // Load spec data if not already loaded
  if (specsStore.methods.length === 0) {
    await specsStore.loadSpecData()
  }
})
</script>

<style scoped>
.form-generator-view {
  min-height: 100vh;
  background-color: var(--color-background);
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.col-span-full {
  grid-column: 1 / -1;
}

.btn-group-left,
.btn-group-right {
  display: flex;
  gap: var(--space-3);
}

.textarea {
  width: 100%;
  padding: var(--spacing-input-padding-y) var(--spacing-input-padding-x);
  font-family: var(--font-family-sans);
  font-size: var(--font-size-base);
  line-height: var(--line-height-relaxed);
  color: var(--color-text-primary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  resize: vertical;
  min-height: 80px;
}

.textarea:focus {
  outline: none;
  border-color: var(--color-border-focus);
  box-shadow: 0 0 0 3px rgba(30, 58, 95, 0.1);
}

/* Modal styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: var(--space-4);
}

.modal {
  width: 100%;
  max-width: 800px;
  max-height: 90vh;
  overflow-y: auto;
}

@media (max-width: 768px) {
  .form-grid {
    grid-template-columns: 1fr;
  }
  
  .card-footer-actions-spread {
    flex-direction: column;
    gap: var(--space-3);
  }
  
  .btn-group-left,
  .btn-group-right {
    width: 100%;
    justify-content: stretch;
  }
  
  .btn-group-left .btn,
  .btn-group-right .btn {
    flex: 1;
  }
}
</style>
