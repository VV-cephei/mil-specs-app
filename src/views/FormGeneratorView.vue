<template>
  <div class="form-generator-view">
    <v-container>
      <v-row justify="center">
        <v-col cols="12" lg="10">
          <!-- Page Header -->
          <v-card class="mb-4" elevation="2">
            <v-card-title class="d-flex align-center flex-wrap ga-4 pa-4">
              <v-icon icon="mdi-file-document-edit" size="32" color="primary" class="mr-2"></v-icon>
              <div>
                <h1 class="text-h5 font-weight-bold">DD Form 2326 Generator</h1>
                <p class="text-body-2 text-grey mb-0">Create Military Packaging Data forms from MIL-STD-2073 codes</p>
              </div>
              <v-spacer></v-spacer>
              <v-btn-toggle v-model="viewMode" mandatory>
                <v-btn value="form" size="small">
                  <v-icon icon="mdi-form-textbox" class="mr-1"></v-icon>
                  Form
                </v-btn>
                <v-btn value="wizard" size="small">
                  <v-icon icon="mdi-ray-start" class="mr-1"></v-icon>
                  Wizard
                </v-btn>
              </v-btn-toggle>
            </v-card-title>
          </v-card>
          
          <!-- Form Content -->
          <v-card elevation="2">
            <v-card-text class="pa-4">
              <v-form ref="form" v-model="isValid" @submit.prevent="handleSubmit">
                <v-row>
                  <!-- Quality per Unit Pack (QUP) -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.qup"
                      label="Quality per Unit Pack (QUP)"
                      :rules="[rules.required, rules.code]"
                      hint="1-4 alphanumeric characters per MIL-STD-2073"
                      persistent-hint
                      counter
                      maxlength="4"
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Method of Preservation -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.methodOfPreservation"
                      :items="preservationMethods"
                      item-title="description"
                      item-value="code"
                      label="Method of Preservation"
                      :rules="[rules.required]"
                      return-object
                      clearable
                    >
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props">
                          <template v-slot:prepend>
                            <v-chip color="primary" size="small">{{ item.raw.code }}</v-chip>
                          </template>
                          <v-list-item-subtitle class="text-truncate">
                            {{ item.raw.description }}
                          </v-list-item-subtitle>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <!-- Cleaning & Drying -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.cleaningDrying"
                      :items="cleaningCodes"
                      item-title="description"
                      item-value="code"
                      label="Cleaning & Drying"
                      return-object
                      clearable
                    >
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props">
                          <template v-slot:prepend>
                            <v-chip color="secondary" size="small">{{ item.raw.code }}</v-chip>
                          </template>
                          <v-list-item-subtitle class="text-truncate">
                            {{ item.raw.description }}
                          </v-list-item-subtitle>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <!-- Preservative Materials -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.preservativeMaterial"
                      :items="preservativeCodes"
                      item-title="description"
                      item-value="code"
                      label="Preservative Materials"
                      return-object
                      clearable
                    >
                      <template v-slot:item="{ props, item }">
                        <v-list-item v-bind="props">
                          <template v-slot:prepend>
                            <v-chip color="success" size="small">{{ item.raw.code }}</v-chip>
                          </template>
                          <v-list-item-subtitle class="text-truncate">
                            {{ item.raw.description }}
                          </v-list-item-subtitle>
                        </v-list-item>
                      </template>
                    </v-select>
                  </v-col>
                  
                  <!-- Wrapping Material -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.wrappingMaterial"
                      label="Wrapping Material"
                      hint="Material specification or code"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Cushioning Material -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.cushioningMaterial"
                      label="Cushioning Material"
                      hint="Material specification or code"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Cushioning Thickness -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.cushioningThickness"
                      label="Cushioning Thickness"
                      hint="Thickness in inches"
                      persistent-hint
                      type="number"
                      step="0.125"
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Unit/Intermediate Container -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.unitIntermediateContainer"
                      :items="containerTypes"
                      label="Unit/Intermediate Container"
                      clearable
                    ></v-select>
                  </v-col>
                  
                  <!-- Packing Code -->
                  <v-col cols="12" md="6">
                    <v-text-field
                      v-model="formData.packingCode"
                      label="Packing Code"
                      hint="1-4 alphanumeric characters"
                      persistent-hint
                      counter
                      maxlength="4"
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Special Material Content -->
                  <v-col cols="12">
                    <v-textarea
                      v-model="formData.specialMaterialContent"
                      label="Special Material Content"
                      hint="Describe any special material requirements"
                      persistent-hint
                      rows="2"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  
                  <!-- Hazardous Material -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.hazardousMaterial"
                      :items="['Yes', 'No']"
                      label="Hazardous Material"
                    ></v-select>
                  </v-col>
                  
                  <!-- Special Marking -->
                  <v-col cols="12" md="6">
                    <v-textarea
                      v-model="formData.specialMarking"
                      label="Special Marking"
                      hint="Any special marking requirements"
                      persistent-hint
                      rows="2"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  
                  <!-- Unit Container Level -->
                  <v-col cols="12" md="6">
                    <v-select
                      v-model="formData.unitContainerLevel"
                      :items="containerLevels"
                      label="Unit Container Level"
                    ></v-select>
                  </v-col>
                  
                  <!-- Optional Procedures -->
                  <v-col cols="12" md="6">
                    <v-textarea
                      v-model="formData.optionalProcedures"
                      label="Optional Procedures"
                      hint="Describe any optional procedures"
                      persistent-hint
                      rows="2"
                      auto-grow
                    ></v-textarea>
                  </v-col>
                  
                  <!-- Shelf-Life -->
                  <v-col cols="12" md="4">
                    <v-text-field
                      v-model="formData.shelfLife"
                      label="Shelf-Life"
                      hint="e.g., 12/15 or 24 months"
                      persistent-hint
                    ></v-text-field>
                  </v-col>
                  
                  <!-- Shelf-Life Action -->
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.shelfLifeAction"
                      :items="shelfLifeActions"
                      label="Shelf-Life Action"
                    ></v-select>
                  </v-col>
                  
                  <!-- Type of Storage -->
                  <v-col cols="12" md="4">
                    <v-select
                      v-model="formData.typeOfStorage"
                      :items="storageTypes"
                      label="Type of Storage"
                    ></v-select>
                  </v-col>
                </v-row>
              </v-form>
            </v-card-text>
            
            <v-divider></v-divider>
            
            <!-- Action Buttons -->
            <v-card-actions class="pa-4">
              <v-btn variant="outlined" @click="resetForm">
                <v-icon icon="mdi-refresh" class="mr-1"></v-icon>
                Reset
              </v-btn>
              <v-btn variant="outlined" @click="saveForm">
                <v-icon icon="mdi-content-save" class="mr-1"></v-icon>
                Save
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn variant="outlined" color="info" @click="previewForm">
                <v-icon icon="mdi-eye" class="mr-1"></v-icon>
                Preview
              </v-btn>
              <v-btn color="primary" @click="exportForm" :disabled="!isValid">
                <v-icon icon="mdi-download" class="mr-1"></v-icon>
                Export PDF
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Preview Dialog -->
    <v-dialog v-model="previewDialog" max-width="800">
      <v-card>
        <v-card-title class="d-flex align-center pa-4">
          <v-icon icon="mdi-file-document-preview" class="mr-2"></v-icon>
          DD Form 2326 Preview
          <v-spacer></v-spacer>
          <v-btn icon @click="previewDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <v-table density="compact">
            <thead>
              <tr>
                <th style="width: 40%">Field</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(value, key) in formData" :key="key">
                <td class="font-weight-medium">{{ formatLabel(key) }}</td>
                <td>{{ formatValue(value) }}</td>
              </tr>
            </tbody>
          </v-table>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-btn variant="outlined" @click="previewDialog = false">Close</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="exportForm">
            <v-icon icon="mdi-download" class="mr-1"></v-icon>
            Export PDF
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
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
const isValid = ref(false)
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

// Validation rules
const rules = {
  required: v => !!v || 'Required',
  code: v => /^[A-Z0-9]{1,4}$/.test(v) || 'Must be 1-4 alphanumeric characters'
}

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
  if (isValid.value) {
    exportForm()
  }
}

function resetForm() {
  Object.keys(formData).forEach(key => {
    formData[key] = typeof formData[key] === 'string' ? '' : null
  })
  if (form.value) {
    form.value.resetValidation()
  }
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
  background-color: #f5f5f5;
  min-height: 100vh;
}
</style>
