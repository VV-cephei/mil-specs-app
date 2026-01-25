<template>
  <div class="top-fields">
    <table>
      <tbody>
        <tr>
          <td class="field-label">NOMENCLATURE</td>
          <td class="field-label">DESIGN ACTIVITY'S PART NUMBER</td>
        </tr>
        <tr>
          <td class="field-input">
            <input
              v-model="localValue.nomenclature"
              @input="emitUpdate"
              type="text"
            />
          </td>
          <td class="field-input">
            <input
              v-model="localValue.designActivityPartNumber"
              @input="emitUpdate"
              type="text"
            />
          </td>
        </tr>
        <tr>
          <td class="field-label">MANUFACTURER'S CAGE CODE</td>
          <td class="field-label">CONFIGURATION ITEM SPECIFICATION NUMBER</td>
        </tr>
        <tr>
          <td class="field-input">
            <input
              v-model="localValue.manufacturersCageCode"
              @input="emitUpdate"
              type="text"
            />
          </td>
          <td class="field-input">
            <input
              v-model="localValue.configurationItemSpecNumber"
              @input="emitUpdate"
              type="text"
            />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { reactive, watch } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({
      nomenclature: '',
      designActivityPartNumber: '',
      manufacturersCageCode: '',
      configurationItemSpecNumber: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])

const localValue = reactive({ ...props.modelValue })

watch(() => props.modelValue, (newVal) => {
  Object.assign(localValue, newVal)
}, { deep: true })

function emitUpdate() {
  emit('update:modelValue', { ...localValue })
}
</script>

<style scoped>
.top-fields {
  border-bottom: 2px solid black;
}

.top-fields table {
  width: 100%;
  border-collapse: collapse;
}

.field-label {
  background: #e8e8e8;
  border: 1px solid black;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: bold;
  width: 50%;
}

.field-input {
  border: 1px solid black;
  padding: 2px;
}

.field-input input {
  width: 100%;
  border: none;
  padding: 4px;
  font-family: 'Courier New', Courier, monospace;
  font-size: 12px;
  outline: none;
  text-transform: uppercase;
}

.field-input input:focus {
  background: #e3f2fd;
}
</style>
