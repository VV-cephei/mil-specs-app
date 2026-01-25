<template>
  <div class="dd2326-form-container">
    <div class="dd2326-form">
      <!-- Header -->
      <DD2326Header />
      
      <!-- Top Fields -->
      <DD2326TopFields v-model="formData.topFields" />
      
      <!-- Part A: Item Identification Data -->
      <div class="part-section">
        <div class="section-header">ITEM IDENTIFICATION DATA (PART A)</div>
        <div class="form-table-wrapper">
          <table class="form-table">
            <!-- Column Headers -->
            <thead>
              <tr>
                <th colspan="6" class="column-header">DOC CON</th>
                <th colspan="15" class="column-header">NATIONAL STOCK NUMBER</th>
                <th colspan="5" class="column-header">ITEM WEIGHT</th>
                <th colspan="4" class="column-header">LENGTH</th>
                <th colspan="4" class="column-header">WIDTH</th>
                <th colspan="4" class="column-header">DEPTH</th>
                <th colspan="2" class="column-header">CAT</th>
              </tr>
              <tr>
                <th colspan="6" class="column-header sub-header"></th>
                <th colspan="4" class="column-header sub-header">FSC</th>
                <th colspan="9" class="column-header sub-header">NIIN</th>
                <th colspan="2" class="column-header sub-header">ADDL</th>
                <th colspan="4" class="column-header sub-header">POUNDS</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="3" class="column-header sub-header">INCHES</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="3" class="column-header sub-header">INCHES</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="3" class="column-header sub-header">INCHES</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="2" class="column-header sub-header">P/C</th>
              </tr>
            </thead>
            <tbody>
              <!-- Row A (cells 1-40) -->
              <tr>
                <td v-for="i in 40" :key="`a-${i}`" 
                    :class="getCellClass('A', i)">
                  <div class="cell-number">{{ i }}</div>
                  <input 
                    v-if="i === 1"
                    value="A"
                    readonly
                    class="row-label-input"
                  />
                  <input 
                    v-else
                    v-model="formData.partA[i-1]"
                    maxlength="1"
                    :disabled="isDisabledCell('A', i)"
                    @input="handleInput('partA', i-1)"
                    @keydown="handleKeydown($event, 'partA', i-1)"
                    :ref="el => setCellRef(el, 'partA', i-1)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Part A Second Row (cells 41-80) -->
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="2" class="column-header">CODE<br/>WSF</th>
                <th colspan="2" class="column-header disabled-header"></th>
                <th colspan="3" class="column-header">QUP</th>
                <th colspan="3" class="column-header">ICQ</th>
                <th colspan="5" class="column-header">CAGE</th>
                <th colspan="24" class="column-header">DRAWING OR PART NUMBER</th>
                <th colspan="1" class="column-header">PI</th>
              </tr>
              <tr>
                <th colspan="1" class="column-header sub-header">WSF</th>
                <th colspan="1" class="column-header sub-header">P</th>
                <th colspan="2" class="column-header sub-header disabled-header"></th>
                <th colspan="3" class="column-header sub-header"></th>
                <th colspan="3" class="column-header sub-header"></th>
                <th colspan="5" class="column-header sub-header"></th>
                <th colspan="24" class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`a2-${i}`" 
                    :class="getCellClass('A', i + 40)">
                  <div class="cell-number">{{ i + 40 }}</div>
                  <input 
                    v-model="formData.partA[i+39]"
                    maxlength="1"
                    :disabled="isDisabledCell('A', i + 40)"
                    @input="handleInput('partA', i+39)"
                    @keydown="handleKeydown($event, 'partA', i+39)"
                    :ref="el => setCellRef(el, 'partA', i+39)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Part B: Preservation-Packing Data -->
      <div class="part-section">
        <div class="section-header">PRESERVATION - PACKING DATA (PART B)</div>
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="6" class="column-header">DOC CON</th>
                <th colspan="15" class="column-header">NATIONAL STOCK NUMBER</th>
                <th colspan="7" class="column-header disabled-header"></th>
                <th colspan="2" class="column-header">PRES<br/>METH</th>
                <th class="column-header">C</th>
                <th colspan="2" class="column-header">PRES<br/>MTL</th>
                <th colspan="2" class="column-header">WRAP<br/>MTL</th>
                <th colspan="2" class="column-header">CUSH<br/>DUNN</th>
                <th class="column-header">C<br/>T</th>
                <th colspan="2" class="column-header">UNIT<br/>CONT</th>
              </tr>
              <tr>
                <th colspan="6" class="column-header sub-header"></th>
                <th colspan="4" class="column-header sub-header">FSC</th>
                <th colspan="9" class="column-header sub-header">NIIN</th>
                <th colspan="2" class="column-header sub-header">ADDL</th>
                <th colspan="7" class="column-header sub-header disabled-header"></th>
                <th colspan="2" class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
                <th colspan="2" class="column-header sub-header"></th>
                <th colspan="2" class="column-header sub-header"></th>
                <th colspan="2" class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
                <th colspan="2" class="column-header sub-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`b-${i}`" 
                    :class="getCellClass('B', i)">
                  <div class="cell-number">{{ i }}</div>
                  <input 
                    v-if="i === 1"
                    value="B"
                    readonly
                    class="row-label-input"
                  />
                  <input 
                    v-else
                    v-model="formData.partB[i-1]"
                    maxlength="1"
                    :disabled="isDisabledCell('B', i)"
                    @input="handleInput('partB', i-1)"
                    @keydown="handleKeydown($event, 'partB', i-1)"
                    :ref="el => setCellRef(el, 'partB', i-1)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Part B Second Row (cells 41-80) -->
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="2" class="column-header">INT<br/>CTR</th>
                <th class="column-header">U<br/>C<br/>L</th>
                <th class="column-header"></th>
                <th colspan="2" class="column-header">SPEC<br/>MKG</th>
                <th colspan="3" class="column-header">PACKING</th>
                <th colspan="5" class="column-header">UNIT PACK<br/>WEIGHT (LBS.)</th>
                <th colspan="12" class="column-header">UNIT PACK SIZE (IN.)</th>
                <th colspan="7" class="column-header">UNIT PACK CUBE<br/>(CU. FT.)</th>
                <th colspan="5" class="column-header disabled-header"></th>
                <th class="column-header">O<br/>P<br/>I</th>
                <th class="column-header">P<br/>I</th>
              </tr>
              <tr>
                <th colspan="2" class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
                <th colspan="2" class="column-header sub-header"></th>
                <th class="column-header sub-header">A</th>
                <th class="column-header sub-header">B</th>
                <th class="column-header sub-header">C</th>
                <th colspan="4" class="column-header sub-header">WEIGHT</th>
                <th class="column-header sub-header">UNIT</th>
                <th colspan="3" class="column-header sub-header">LENGTH</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="3" class="column-header sub-header">WIDTH</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="3" class="column-header sub-header">DEPTH</th>
                <th class="column-header sub-header">10th</th>
                <th colspan="3" class="column-header sub-header">WHOLE CUBE</th>
                <th colspan="4" class="column-header sub-header">1000th</th>
                <th colspan="5" class="column-header sub-header disabled-header"></th>
                <th class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`b2-${i}`" 
                    :class="getCellClass('B', i + 40)">
                  <div class="cell-number">{{ i + 40 }}</div>
                  <input 
                    v-model="formData.partB[i+39]"
                    maxlength="1"
                    :disabled="isDisabledCell('B', i + 40)"
                    @input="handleInput('partB', i+39)"
                    @keydown="handleKeydown($event, 'partB', i+39)"
                    :ref="el => setCellRef(el, 'partB', i+39)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Part C: Supplemental Data -->
      <div class="part-section">
        <div class="section-header">SUPPLEMENTAL DATA (PART C)</div>
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="6" class="column-header">DOC CON</th>
                <th colspan="15" class="column-header">NATIONAL STOCK NUMBER</th>
                <th colspan="19" class="column-header">SUPPLEMENTAL INSTRUCTIONS</th>
              </tr>
              <tr>
                <th colspan="6" class="column-header sub-header"></th>
                <th colspan="4" class="column-header sub-header">FSC</th>
                <th colspan="9" class="column-header sub-header">NIIN</th>
                <th colspan="2" class="column-header sub-header">ADDL</th>
                <th colspan="19" class="column-header sub-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`c-${i}`" 
                    :class="getCellClass('C', i)">
                  <div class="cell-number">{{ i }}</div>
                  <input 
                    v-if="i === 1"
                    value="C"
                    readonly
                    class="row-label-input"
                  />
                  <input 
                    v-else
                    v-model="formData.partC[i-1]"
                    maxlength="1"
                    :disabled="isDisabledCell('C', i)"
                    @input="handleInput('partC', i-1)"
                    @keydown="handleKeydown($event, 'partC', i-1)"
                    :ref="el => setCellRef(el, 'partC', i-1)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Part C Second Row (cells 41-80) -->
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="40" class="column-header">SUPPLEMENTAL INSTRUCTIONS</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`c2-${i}`" class="data-cell">
                  <div class="cell-number">{{ i + 40 }}</div>
                  <input 
                    v-model="formData.partC[i+39]"
                    maxlength="1"
                    @input="handleInput('partC', i+39)"
                    @keydown="handleKeydown($event, 'partC', i+39)"
                    :ref="el => setCellRef(el, 'partC', i+39)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Part D: Special Packaging Instruction Data -->
      <div class="part-section">
        <div class="section-header">SPECIAL PACKAGING INSTRUCTION DATA (PART D)</div>
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="6" class="column-header">DOC CON</th>
                <th colspan="15" class="column-header">NATIONAL STOCK NUMBER</th>
                <th colspan="5" class="column-header">PKG DESIGN<br/>ACT CAGE</th>
                <th colspan="9" class="column-header">SPI NUMBER</th>
                <th class="column-header">R<br/>E<br/>V</th>
                <th colspan="4" class="column-header disabled-header"></th>
              </tr>
              <tr>
                <th colspan="6" class="column-header sub-header"></th>
                <th colspan="4" class="column-header sub-header">FSC</th>
                <th colspan="9" class="column-header sub-header">NIIN</th>
                <th colspan="2" class="column-header sub-header">ADDL</th>
                <th colspan="5" class="column-header sub-header"></th>
                <th colspan="9" class="column-header sub-header"></th>
                <th class="column-header sub-header"></th>
                <th colspan="4" class="column-header sub-header disabled-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`d-${i}`" 
                    :class="getCellClass('D', i)">
                  <div class="cell-number">{{ i }}</div>
                  <input 
                    v-if="i === 1"
                    value="D"
                    readonly
                    class="row-label-input"
                  />
                  <input 
                    v-else
                    v-model="formData.partD[i-1]"
                    maxlength="1"
                    :disabled="isDisabledCell('D', i)"
                    @input="handleInput('partD', i-1)"
                    @keydown="handleKeydown($event, 'partD', i-1)"
                    :ref="el => setCellRef(el, 'partD', i-1)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <!-- Part D Second Row (cells 41-80) -->
        <div class="form-table-wrapper">
          <table class="form-table">
            <thead>
              <tr>
                <th colspan="6" class="column-header">SPI DATE</th>
                <th colspan="15" class="column-header">CONTAINER NATIONAL STOCK NUMBER</th>
                <th colspan="19" class="column-header disabled-header"></th>
              </tr>
              <tr>
                <th colspan="6" class="column-header sub-header"></th>
                <th colspan="4" class="column-header sub-header">FSC</th>
                <th colspan="9" class="column-header sub-header">NIIN</th>
                <th colspan="2" class="column-header sub-header">ADDL</th>
                <th colspan="19" class="column-header sub-header disabled-header"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td v-for="i in 40" :key="`d2-${i}`" 
                    :class="getCellClass('D', i + 40)">
                  <div class="cell-number">{{ i + 40 }}</div>
                  <input 
                    v-model="formData.partD[i+39]"
                    maxlength="1"
                    :disabled="isDisabledCell('D', i + 40)"
                    @input="handleInput('partD', i+39)"
                    @keydown="handleKeydown($event, 'partD', i+39)"
                    :ref="el => setCellRef(el, 'partD', i+39)"
                  />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Footer -->
      <DD2326Footer @reset="handleReset" />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import DD2326Header from './DD2326Header.vue'
import DD2326TopFields from './DD2326TopFields.vue'
import DD2326Footer from './DD2326Footer.vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  }
})

const emit = defineEmits(['update:modelValue'])

// Form data structure
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

// Set row labels
formData.partA[0] = 'A'
formData.partB[0] = 'B'
formData.partC[0] = 'C'
formData.partD[0] = 'D'

// Define disabled cells (greyed out cells that shouldn't be edited)
// Based on the detailed breakdown provided
const disabledCells = {
  A: [43, 44], // Part A: Cells 43-44 (P section - purposefully empty/shaded)
  B: [22, 23, 24, 25, 26, 27, 28, 74, 75, 76, 77, 78], // Part B: Cells 22-28 and 74-78 (empty/shaded sections)
  C: [], // Part C: No disabled cells
  D: [37, 38, 39, 40, 62, 63, 64, 65, 66, 67, 68, 69, 70, 71, 72, 73, 74, 75, 76, 77, 78, 79, 80] // Part D: Cells 37-40 and 62-80 (empty/shaded sections)
}

// Cell references for navigation
const cellRefs = ref({
  partA: {},
  partB: {},
  partC: {},
  partD: {}
})

function isDisabledCell(part, cellNumber) {
  return disabledCells[part].includes(cellNumber)
}

function getCellClass(part, cellNumber) {
  const classes = ['data-cell']
  if (cellNumber === 1) classes.push('row-label-cell')
  if (isDisabledCell(part, cellNumber)) classes.push('disabled-cell')
  return classes
}

function setCellRef(el, part, index) {
  if (el) {
    if (!cellRefs.value[part]) cellRefs.value[part] = {}
    cellRefs.value[part][index] = el
  }
}

function handleInput(part, index) {
  // Skip cell 0 (row label)
  if (index === 0) return
  
  // Auto-advance to next cell
  if (formData[part][index] && index < 79) {
    // Skip disabled cells
    let nextIndex = index + 1
    const partLetter = part.replace('part', '').toUpperCase()
    while (nextIndex < 80 && (nextIndex === 0 || isDisabledCell(partLetter, nextIndex + 1))) {
      nextIndex++
    }
    if (nextIndex < 80) {
      const nextCell = cellRefs.value[part][nextIndex]
      if (nextCell) nextCell.focus()
    }
  }
  emitUpdate()
}

function handleKeydown(event, part, index) {
  // Skip cell 0 (row label)
  if (index === 0) return
  
  const partLetter = part.replace('part', '').toUpperCase()
  
  // Backspace: move back if empty
  if (event.key === 'Backspace' && !formData[part][index] && index > 1) {
    let prevIndex = index - 1
    while (prevIndex > 0 && (prevIndex === 0 || isDisabledCell(partLetter, prevIndex + 1))) {
      prevIndex--
    }
    if (prevIndex > 0) {
      const prevCell = cellRefs.value[part][prevIndex]
      if (prevCell) prevCell.focus()
    }
  }
  // Arrow navigation
  if (event.key === 'ArrowRight' && index < 79) {
    let nextIndex = index + 1
    while (nextIndex < 80 && (nextIndex === 0 || isDisabledCell(partLetter, nextIndex + 1))) {
      nextIndex++
    }
    if (nextIndex < 80) {
      cellRefs.value[part][nextIndex]?.focus()
    }
  }
  if (event.key === 'ArrowLeft' && index > 1) {
    let prevIndex = index - 1
    while (prevIndex > 0 && (prevIndex === 0 || isDisabledCell(partLetter, prevIndex + 1))) {
      prevIndex--
    }
    if (prevIndex > 0) {
      cellRefs.value[part][prevIndex]?.focus()
    }
  }
}

function handleReset() {
  formData.topFields = {
    nomenclature: '',
    designActivityPartNumber: '',
    manufacturersCageCode: '',
    configurationItemSpecNumber: ''
  }
  formData.partA = Array(80).fill('')
  formData.partB = Array(80).fill('')
  formData.partC = Array(80).fill('')
  formData.partD = Array(80).fill('')
  // Reset row labels
  formData.partA[0] = 'A'
  formData.partB[0] = 'B'
  formData.partC[0] = 'C'
  formData.partD[0] = 'D'
  emitUpdate()
}

function emitUpdate() {
  emit('update:modelValue', { ...formData })
}
</script>

<style scoped>
@import './styles/dd2326-form.css';

.dd2326-form-container {
  width: 100%;
  overflow-x: auto;
  padding: 10px;
  background: #f5f5f5;
}

.dd2326-form {
  background: white;
  border: 3px solid black;
  min-width: 1000px;
  max-width: 1400px;
  margin: 0 auto;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.part-section {
  border-bottom: 2px solid black;
}

.part-section:last-of-type {
  border-bottom: none;
}

.form-table-wrapper {
  overflow-x: auto;
}

.form-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
}

.column-header {
  background: #e8e8e8;
  border: 1px solid black;
  padding: 3px 1px;
  font-size: 8px;
  font-weight: bold;
  text-align: center;
  vertical-align: middle;
  line-height: 1.1;
  white-space: nowrap;
  overflow: hidden;
}

.disabled-header {
  background: #d0d0d0;
}

.sub-header {
  font-size: 7px;
  padding: 2px 1px;
}

.data-cell {
  border: 1px solid black;
  padding: 0;
  position: relative;
  min-width: 20px;
  width: 20px;
  height: 30px;
  vertical-align: middle;
}

.row-label-cell {
  background: #e8e8e8;
  font-weight: bold;
}

.disabled-cell {
  background: #d0d0d0;
}

.data-cell input {
  width: 100%;
  height: 100%;
  border: none;
  text-align: center;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  padding: 15px 0 0 0;
  background: transparent;
  outline: none;
  text-transform: uppercase;
}

.row-label-input {
  font-weight: bold;
  font-size: 16px;
  padding: 0 !important;
  cursor: default;
}

.data-cell input:disabled {
  background: #d0d0d0;
  cursor: not-allowed;
}

.data-cell input:focus:not(:disabled) {
  background: #e3f2fd;
  outline: 2px solid #2196f3;
  outline-offset: -2px;
  z-index: 10;
}

.cell-number {
  position: absolute;
  top: 2px;
  left: 3px;
  font-size: 7px;
  color: #666;
  pointer-events: none;
  font-family: Arial, Helvetica, sans-serif;
  line-height: 1;
  font-weight: normal;
}
</style>
