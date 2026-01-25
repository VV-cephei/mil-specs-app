<template>
  <div class="form-grid-input">
    <div class="d-flex flex-wrap align-start form-row">
      <!-- QUP -->
      <div class="form-field-box" style="width: 60px">
        <label>QUP</label>
        <input 
          v-model="modelValue.qup" 
          @input="updateValue" 
          maxlength="3"
          placeholder="001"
        >
      </div>

      <!-- Method of Preservation -->
      <div class="form-field-box" style="width: 60px">
        <label>METH</label>
        <input 
          v-model="modelValue.methodOfPreservation" 
          @input="updateValue" 
          maxlength="2"
          placeholder="20"
        >
      </div>

      <!-- Cleaning -->
      <div class="form-field-box" style="width: 60px">
        <label>CLNG</label>
        <input 
          v-model="modelValue.cleaningDrying" 
          @input="updateValue" 
          maxlength="1"
          placeholder="1"
        >
      </div>

      <!-- Preservative -->
      <div class="form-field-box" style="width: 60px">
        <label>PRES</label>
        <input 
          v-model="modelValue.preservativeMaterial" 
          @input="updateValue" 
          maxlength="2"
          placeholder="00"
        >
      </div>

      <!-- Wrapping -->
      <div class="form-field-box" style="width: 60px">
        <label>WRAP</label>
        <input 
          v-model="modelValue.wrappingMaterial" 
          @input="updateValue" 
          maxlength="2"
          placeholder="GB"
        >
      </div>

      <!-- Cushioning -->
      <div class="form-field-box" style="width: 60px">
        <label>CUSH</label>
        <input 
          v-model="modelValue.cushioningMaterial" 
          @input="updateValue" 
          maxlength="2"
          placeholder="NA"
        >
      </div>

      <!-- Thickness -->
      <div class="form-field-box" style="width: 60px">
        <label>THK</label>
        <input 
          v-model="modelValue.cushioningThickness" 
          @input="updateValue" 
          maxlength="1"
          placeholder="A"
        >
      </div>

      <!-- Unit Container -->
      <div class="form-field-box" style="width: 60px">
        <label>UNIT</label>
        <input 
          v-model="modelValue.unitIntermediateContainer" 
          @input="updateValue" 
          maxlength="2"
          placeholder="D3"
        >
      </div>

      <!-- Intermediate Container -->
      <div class="form-field-box" style="width: 60px">
        <label>INT</label>
        <input 
          v-model="modelValue.intermediateContainer" 
          @input="updateValue" 
          maxlength="2"
          placeholder="00"
        >
      </div>

      <!-- Unit Container Level -->
      <div class="form-field-box" style="width: 60px">
        <label>UCL</label>
        <input 
          v-model="modelValue.unitContainerLevel" 
          @input="updateValue" 
          maxlength="1"
          placeholder="B"
        >
      </div>

      <!-- Packing Code -->
      <div class="form-field-box" style="width: 60px">
        <label>PACK</label>
        <input 
          v-model="modelValue.packingCode" 
          @input="updateValue" 
          maxlength="1"
          placeholder="A"
        >
      </div>

      <!-- Special Marking -->
      <div class="form-field-box" style="width: 60px">
        <label>MKG</label>
        <input 
          v-model="modelValue.specialMarking" 
          @input="updateValue" 
          maxlength="2"
          placeholder="00"
        >
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'

const props = defineProps({
  modelValue: {
    type: Object,
    required: true,
    default: () => ({
      qup: '',
      methodOfPreservation: '',
      cleaningDrying: '',
      preservativeMaterial: '',
      wrappingMaterial: '',
      cushioningMaterial: '',
      cushioningThickness: '',
      unitIntermediateContainer: '',
      intermediateContainer: '',
      unitContainerLevel: '',
      packingCode: '',
      specialMarking: ''
    })
  }
})

const emit = defineEmits(['update:modelValue'])

function updateValue() {
  emit('update:modelValue', props.modelValue)
}
</script>

<style scoped>
.form-grid-input {
  overflow-x: auto;
  padding: 10px;
  background: #fff;
  border: 1px solid #ccc;
}

.form-row {
  min-width: 800px;
  border: 2px solid #000;
}

.form-field-box {
  border-right: 1px solid #000;
  display: flex;
  flex-direction: column;
  height: 60px;
}

.form-field-box:last-child {
  border-right: none;
}

.form-field-box label {
  font-size: 10px;
  font-weight: bold;
  text-align: center;
  border-bottom: 1px solid #000;
  background: #f0f0f0;
  padding: 2px 0;
  height: 20px;
}

.form-field-box input {
  border: none;
  text-align: center;
  font-family: 'Courier New', monospace;
  font-weight: bold;
  font-size: 16px;
  height: 40px;
  width: 100%;
  outline: none;
  text-transform: uppercase;
}

.form-field-box input:focus {
  background-color: #e3f2fd;
}
</style>
