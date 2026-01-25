<template>
  <div class="raw-data-grid">
    <div class="grid-container">
      <!-- Ruler -->
      <div class="ruler-row d-flex">
        <div class="section-label"></div>
        <div class="ruler-cells d-flex">
          <div 
            v-for="i in 80" 
            :key="i" 
            class="ruler-cell"
            :class="{ 'major-tick': i % 10 === 0, 'minor-tick': i % 5 === 0 }"
          >
            <span v-if="i % 10 === 0" class="tick-label">{{ i }}</span>
            <span v-else-if="i === 1" class="tick-label">1</span>
          </div>
        </div>
      </div>

      <!-- Rows -->
      <div v-for="(row, rowIndex) in 4" :key="rowIndex" class="data-row d-flex align-center mb-2">
        <div class="section-label font-weight-bold mr-2">
          Section {{ rowIndex + 1 }}
        </div>
        <div class="input-cells d-flex">
          <input
            v-for="(col, colIndex) in 80"
            :key="colIndex"
            :ref="el => setInputRef(el, rowIndex, colIndex)"
            v-model="gridData[rowIndex][colIndex]"
            class="grid-input"
            maxlength="1"
            @input="handleInput($event, rowIndex, colIndex)"
            @keydown="handleKeydown($event, rowIndex, colIndex)"
            @focus="handleFocus(rowIndex, colIndex)"
            :title="`Section ${rowIndex + 1}, Column ${colIndex + 1}`"
          >
        </div>
      </div>
    </div>

    <!-- Field Legend (Dynamic based on focus) -->
    <div class="field-legend mt-4 pa-2 bg-grey-lighten-4 rounded">
      <div class="text-subtitle-2 font-weight-bold mb-1">Current Field:</div>
      <div class="text-body-2">
        {{ currentFieldInfo || 'Hover or select a cell to see field info' }}
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, watch, onMounted } from 'vue'

const props = defineProps({
  modelValue: {
    type: Array,
    default: () => Array(4).fill('').map(() => Array(80).fill(''))
  }
})

const emit = defineEmits(['update:modelValue'])

// State
const gridData = reactive(Array(4).fill(null).map(() => Array(80).fill('')))
const inputRefs = ref({})
const currentFieldInfo = ref('')

// Field Mappings (Hypothetical - to be adjusted based on real specs)
// Format: { sectionIndex: { startIndex: { length: N, name: 'Name' } } }
const fieldMap = {
  0: { // Section 1
    0: { length: 3, name: 'Quality per Unit Pack (QUP)' },
    3: { length: 2, name: 'Method of Preservation' },
    5: { length: 1, name: 'Cleaning & Drying' },
    6: { length: 2, name: 'Preservative Material' },
    8: { length: 2, name: 'Wrapping Material' },
    10: { length: 2, name: 'Cushioning Material' },
    12: { length: 1, name: 'Cushioning Thickness' },
    13: { length: 2, name: 'Unit Container' },
    15: { length: 2, name: 'Intermediate Container' },
    17: { length: 1, name: 'Unit Container Level' },
    18: { length: 1, name: 'Packing Code' },
    19: { length: 2, name: 'Special Marking' }
  }
}

// Methods
function setInputRef(el, row, col) {
  if (!inputRefs.value[row]) inputRefs.value[row] = {}
  inputRefs.value[row][col] = el
}

function handleInput(event, row, col) {
  const val = event.target.value
  
  // Auto-advance
  if (val && col < 79) {
    const nextInput = inputRefs.value[row][col + 1]
    if (nextInput) nextInput.focus()
  }
  
  emitUpdate()
}

function handleKeydown(event, row, col) {
  // Backspace: move back if empty
  if (event.key === 'Backspace' && !gridData[row][col] && col > 0) {
    const prevInput = inputRefs.value[row][col - 1]
    if (prevInput) {
      prevInput.focus()
    }
  }
  // Arrows
  if (event.key === 'ArrowRight' && col < 79) {
    inputRefs.value[row][col + 1]?.focus()
  }
  if (event.key === 'ArrowLeft' && col > 0) {
    inputRefs.value[row][col - 1]?.focus()
  }
  if (event.key === 'ArrowDown' && row < 3) {
    inputRefs.value[row + 1][col]?.focus()
  }
  if (event.key === 'ArrowUp' && row > 0) {
    inputRefs.value[row - 1][col]?.focus()
  }
}

function handleFocus(row, col) {
  // Find which field this column belongs to
  let info = `Section ${row + 1}, Column ${col + 1}`
  
  if (fieldMap[row]) {
    // Check if this col is within a defined field
    for (const startIdx in fieldMap[row]) {
      const start = parseInt(startIdx)
      const field = fieldMap[row][start]
      if (col >= start && col < start + field.length) {
        info = `${field.name} (Cols ${start + 1}-${start + field.length})`
        break
      }
    }
  }
  currentFieldInfo.value = info
}

function emitUpdate() {
  // Convert grid arrays to strings for easier consumption? 
  // Or keep as arrays. Let's emit the arrays.
  emit('update:modelValue', gridData)
}

// Initialize
onMounted(() => {
  // Copy props to local state if needed
  if (props.modelValue) {
    props.modelValue.forEach((row, rIdx) => {
      if (row) {
        row.forEach((val, cIdx) => {
          if (gridData[rIdx] && cIdx < 80) {
            gridData[rIdx][cIdx] = val
          }
        })
      }
    })
  }
})

watch(() => props.modelValue, (newVal) => {
  // Sync back if changed externally
  // (Implementation omitted to avoid loops, assuming one-way flow mostly)
}, { deep: true })

</script>

<style scoped>
.raw-data-grid {
  overflow-x: auto;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
}

.grid-container {
  min-width: 1600px; /* Ensure enough space for 80 cols */
}

.section-label {
  width: 80px;
  flex-shrink: 0;
}

.ruler-cells {
  flex-grow: 1;
}

.ruler-cell {
  width: 20px;
  height: 20px;
  border-left: 1px solid #eee;
  position: relative;
  font-size: 10px;
  color: #888;
}

.ruler-cell.major-tick {
  border-left: 1px solid #000;
}

.ruler-cell.minor-tick {
  border-left: 1px solid #ccc;
}

.tick-label {
  position: absolute;
  top: -15px;
  left: -5px;
}

.input-cells {
  flex-grow: 1;
}

.grid-input {
  width: 20px;
  height: 24px;
  border: 1px solid #ddd;
  border-right: none;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-size: 14px;
  outline: none;
  padding: 0;
}

.grid-input:last-child {
  border-right: 1px solid #ddd;
}

.grid-input:focus {
  background-color: #e3f2fd;
  border-color: #2196f3;
  z-index: 1;
}
</style>
