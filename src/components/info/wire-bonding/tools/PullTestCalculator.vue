<template>
  <div class="pull-test-calculator">
    <div class="calculator-header">
      <h3 class="calculator-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 2v20M2 12h20M12 2a10 10 0 0 1 10 10M12 2a10 10 0 0 0-10 10"/>
        </svg>
        Wire Bond Pull Test Calculator
      </h3>
      <p class="calculator-description">
        Calculate minimum pull force requirements based on MIL-STD-883 Method 2011
      </p>
    </div>

    <div class="calculator-body">
      <!-- Input Section -->
      <div class="input-section">
        <h4 class="section-label">Test Parameters</h4>
        
        <!-- Wire Diameter -->
        <div class="input-group">
          <label for="wire-diameter" class="input-label">
            Wire Diameter
            <span class="input-hint">(µm)</span>
          </label>
          <div class="input-row">
            <select 
              id="wire-diameter" 
              v-model="selectedDiameter"
              class="input-select"
              aria-describedby="diameter-help"
            >
              <option value="">Select diameter...</option>
              <option v-for="d in standardDiameters" :key="d.value" :value="d.value">
                {{ d.label }}
              </option>
              <option value="custom">Custom...</option>
            </select>
            <input
              v-if="selectedDiameter === 'custom'"
              v-model.number="customDiameter"
              type="number"
              min="10"
              max="500"
              step="1"
              class="input-number"
              placeholder="Enter µm"
              aria-label="Custom wire diameter in micrometers"
            />
          </div>
          <span id="diameter-help" class="input-help">
            Common sizes: 25µm (1.0 mil), 33µm (1.3 mil), 50µm (2.0 mil)
          </span>
        </div>

        <!-- Wire Material -->
        <div class="input-group">
          <label for="wire-material" class="input-label">Wire Material</label>
          <select 
            id="wire-material" 
            v-model="selectedMaterial"
            class="input-select"
          >
            <option v-for="m in materials" :key="m.id" :value="m.id">
              {{ m.name }} ({{ m.symbol }})
            </option>
          </select>
          <span class="input-help">{{ materialDescription }}</span>
        </div>

        <!-- Test Standard -->
        <div class="input-group">
          <label for="test-standard" class="input-label">Test Standard</label>
          <select 
            id="test-standard" 
            v-model="selectedStandard"
            class="input-select"
          >
            <option v-for="s in standards" :key="s.id" :value="s.id">
              {{ s.name }}
            </option>
          </select>
          <span class="input-help">{{ standardDescription }}</span>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" :class="{ 'results-section--active': hasValidInput }">
        <h4 class="section-label">Calculated Results</h4>
        
        <div v-if="hasValidInput" class="results-grid">
          <!-- Minimum Pull Force -->
          <div class="result-card result-card--primary">
            <div class="result-label">Minimum Pull Force</div>
            <div class="result-value">
              <span class="result-number">{{ calculatedMinForce.toFixed(1) }}</span>
              <span class="result-unit">gf</span>
            </div>
            <div class="result-note">Per {{ selectedStandardName }}</div>
          </div>

          <!-- Recommended Range -->
          <div class="result-card">
            <div class="result-label">Recommended Range</div>
            <div class="result-value result-value--range">
              <span class="result-number">{{ calculatedTypicalMin.toFixed(1) }}</span>
              <span class="result-separator">–</span>
              <span class="result-number">{{ calculatedTypicalMax.toFixed(1) }}</span>
              <span class="result-unit">gf</span>
            </div>
            <div class="result-note">Typical production values</div>
          </div>

          <!-- Expected Failure Mode -->
          <div class="result-card result-card--full">
            <div class="result-label">Expected Failure Mode</div>
            <div class="failure-mode">
              <div class="failure-mode-item failure-mode-item--ideal">
                <span class="failure-mode-code">Code 2</span>
                <span class="failure-mode-name">Neck Break</span>
                <span class="failure-mode-badge">IDEAL</span>
              </div>
              <p class="failure-mode-description">
                Wire breaks just above the ball at the heat-affected zone. 
                This indicates the bond is stronger than the wire itself.
              </p>
            </div>
          </div>

          <!-- Pass/Fail Indicator -->
          <div class="threshold-indicator">
            <div class="threshold-bar">
              <div class="threshold-zone threshold-zone--fail" :style="{ width: '30%' }">
                <span class="threshold-label">FAIL</span>
              </div>
              <div class="threshold-marker" :style="{ left: thresholdPosition + '%' }">
                <span class="threshold-value">{{ calculatedMinForce.toFixed(1) }}gf</span>
              </div>
              <div class="threshold-zone threshold-zone--pass" :style="{ width: '70%' }">
                <span class="threshold-label">PASS</span>
              </div>
            </div>
            <div class="threshold-legend">
              <span>0 gf</span>
              <span>{{ (calculatedMinForce * 3).toFixed(0) }} gf</span>
            </div>
          </div>
        </div>

        <div v-else class="results-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>Select wire diameter and material to calculate pull test requirements</p>
        </div>
      </div>
    </div>

    <!-- Formula Section (Collapsible) -->
    <div class="formula-section">
      <button 
        class="formula-toggle"
        :class="{ 'formula-toggle--open': showFormula }"
        @click="showFormula = !showFormula"
        aria-expanded="showFormula"
        aria-controls="formula-content"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
        </svg>
        Formula & Reference Information
        <svg class="chevron" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"/>
        </svg>
      </button>
      
      <div v-show="showFormula" id="formula-content" class="formula-content">
        <div class="formula-block">
          <h5>Scaling Formula</h5>
          <div class="formula-equation">
            F<sub>min</sub> = F<sub>ref</sub> × (D / D<sub>ref</sub>)²
          </div>
          <p class="formula-explanation">
            Pull force scales with wire cross-sectional area. The reference values are based on 
            25µm wire diameter from MIL-STD-883 Method 2011.
          </p>
        </div>

        <div class="formula-block">
          <h5>Reference Values (25µm wire)</h5>
          <table class="reference-table">
            <thead>
              <tr>
                <th>Material</th>
                <th>Min Force</th>
                <th>Typical Range</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Gold (Au)</td>
                <td>3.0 gf</td>
                <td>4.0–6.0 gf</td>
              </tr>
              <tr>
                <td>Copper (Cu)</td>
                <td>4.0 gf</td>
                <td>5.0–7.5 gf</td>
              </tr>
              <tr>
                <td>Pd-Cu</td>
                <td>4.2 gf</td>
                <td>5.5–8.0 gf</td>
              </tr>
              <tr>
                <td>Aluminum (Al)</td>
                <td>2.5 gf</td>
                <td>3.5–5.0 gf</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="formula-block">
          <h5>MIL-STD-883 Method 2011 Requirements</h5>
          <ul class="reference-list">
            <li>Hook must be placed at loop apex (highest point)</li>
            <li>Pull speed: 0.5–2.0 mm/sec</li>
            <li>Minimum 10 wires per lot for qualification</li>
            <li>Acceptable failure modes: Neck break (ideal), Wire break, Heel break</li>
            <li>Reject failure modes: Ball lift, Stitch lift</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const selectedDiameter = ref('')
const customDiameter = ref(null)
const selectedMaterial = ref('gold')
const selectedStandard = ref('mil-std-883')
const showFormula = ref(false)

// Standard wire diameters
const standardDiameters = [
  { value: 15, label: '15 µm (0.6 mil)' },
  { value: 18, label: '18 µm (0.7 mil)' },
  { value: 20, label: '20 µm (0.8 mil)' },
  { value: 23, label: '23 µm (0.9 mil)' },
  { value: 25, label: '25 µm (1.0 mil)' },
  { value: 33, label: '33 µm (1.3 mil)' },
  { value: 38, label: '38 µm (1.5 mil)' },
  { value: 50, label: '50 µm (2.0 mil)' },
  { value: 75, label: '75 µm (3.0 mil)' }
]

// Wire materials with reference values at 25µm
const materials = [
  { 
    id: 'gold', 
    name: 'Gold', 
    symbol: 'Au',
    refMin: 3.0,
    refTypicalMin: 4.0,
    refTypicalMax: 6.0,
    description: 'Excellent oxidation resistance, soft material'
  },
  { 
    id: 'copper', 
    name: 'Copper', 
    symbol: 'Cu',
    refMin: 4.0,
    refTypicalMin: 5.0,
    refTypicalMax: 7.5,
    description: 'Cost-effective, requires forming gas'
  },
  { 
    id: 'pd-cu', 
    name: 'Palladium-Coated Copper', 
    symbol: 'Pd-Cu',
    refMin: 4.2,
    refTypicalMin: 5.5,
    refTypicalMax: 8.0,
    description: 'Oxidation resistant copper alternative'
  },
  { 
    id: 'aluminum', 
    name: 'Aluminum', 
    symbol: 'Al',
    refMin: 2.5,
    refTypicalMin: 3.5,
    refTypicalMax: 5.0,
    description: 'Used for wedge bonding, hermetic packages'
  }
]

// Test standards
const standards = [
  { 
    id: 'mil-std-883', 
    name: 'MIL-STD-883 Method 2011',
    multiplier: 1.0,
    description: 'Military standard for microelectronics'
  },
  { 
    id: 'jedec', 
    name: 'JEDEC JESD22-B125',
    multiplier: 1.0,
    description: 'Industry standard for copper wire'
  },
  { 
    id: 'ipc', 
    name: 'IPC-TM-650 2.4.42',
    multiplier: 0.95,
    description: 'PCB assembly test method'
  },
  { 
    id: 'custom', 
    name: 'Custom / Internal',
    multiplier: 1.1,
    description: 'Typically 10% above MIL-STD'
  }
]

// Computed values
const effectiveDiameter = computed(() => {
  if (selectedDiameter.value === 'custom') {
    return customDiameter.value || 0
  }
  return Number(selectedDiameter.value) || 0
})

const hasValidInput = computed(() => {
  return effectiveDiameter.value > 0
})

const currentMaterial = computed(() => {
  return materials.find(m => m.id === selectedMaterial.value) || materials[0]
})

const currentStandard = computed(() => {
  return standards.find(s => s.id === selectedStandard.value) || standards[0]
})

const materialDescription = computed(() => currentMaterial.value.description)
const standardDescription = computed(() => currentStandard.value.description)
const selectedStandardName = computed(() => currentStandard.value.name)

// Calculate pull force based on wire cross-sectional area scaling
// F = F_ref * (D / D_ref)^2
const referenceDiameter = 25 // µm

const calculatedMinForce = computed(() => {
  if (!hasValidInput.value) return 0
  const scaleFactor = Math.pow(effectiveDiameter.value / referenceDiameter, 2)
  return currentMaterial.value.refMin * scaleFactor * currentStandard.value.multiplier
})

const calculatedTypicalMin = computed(() => {
  if (!hasValidInput.value) return 0
  const scaleFactor = Math.pow(effectiveDiameter.value / referenceDiameter, 2)
  return currentMaterial.value.refTypicalMin * scaleFactor
})

const calculatedTypicalMax = computed(() => {
  if (!hasValidInput.value) return 0
  const scaleFactor = Math.pow(effectiveDiameter.value / referenceDiameter, 2)
  return currentMaterial.value.refTypicalMax * scaleFactor
})

const thresholdPosition = computed(() => {
  // Position the threshold marker at ~30% of the bar
  return 30
})
</script>

<style scoped>
.pull-test-calculator {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.calculator-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  color: var(--color-text-inverse);
}

.calculator-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.calculator-title svg {
  opacity: 0.9;
}

.calculator-description {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

.calculator-body {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  padding: var(--space-5);
}

.section-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin: 0 0 var(--space-4) 0;
}

/* Input Section */
.input-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-hint {
  font-weight: var(--font-weight-normal);
  color: var(--color-text-tertiary);
}

.input-row {
  display: flex;
  gap: var(--space-2);
}

.input-select,
.input-number {
  flex: 1;
  padding: var(--space-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
}

.input-select:focus,
.input-number:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input-number {
  max-width: 120px;
}

.input-help {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* Results Section */
.results-section {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: background-color var(--transition-fast);
}

.results-section--active {
  background-color: var(--color-primary-50);
}

.results-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.result-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  padding: var(--space-4);
}

.result-card--primary {
  background-color: var(--color-primary-600);
  border-color: var(--color-primary-600);
  color: var(--color-text-inverse);
}

.result-card--primary .result-label {
  color: var(--color-primary-100);
}

.result-card--primary .result-note {
  color: var(--color-primary-200);
}

.result-card--full {
  grid-column: 1 / -1;
}

.result-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  margin-bottom: var(--space-2);
}

.result-value {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.result-value--range {
  gap: var(--space-2);
}

.result-number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
}

.result-separator {
  font-size: var(--font-size-lg);
  color: var(--color-text-tertiary);
}

.result-unit {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  opacity: 0.8;
}

.result-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-1);
}

/* Failure Mode */
.failure-mode-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-2);
}

.failure-mode-code {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
}

.failure-mode-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.failure-mode-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-success-100);
  color: var(--color-success-700);
  border-radius: var(--radius-full);
}

.failure-mode-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Threshold Indicator */
.threshold-indicator {
  margin-top: var(--space-2);
}

.threshold-bar {
  position: relative;
  display: flex;
  height: 32px;
  border-radius: var(--radius-default);
  overflow: hidden;
}

.threshold-zone {
  display: flex;
  align-items: center;
  justify-content: center;
}

.threshold-zone--fail {
  background-color: var(--color-error-100);
}

.threshold-zone--pass {
  background-color: var(--color-success-100);
}

.threshold-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  letter-spacing: 0.05em;
}

.threshold-zone--fail .threshold-label {
  color: var(--color-error-700);
}

.threshold-zone--pass .threshold-label {
  color: var(--color-success-700);
}

.threshold-marker {
  position: absolute;
  top: -4px;
  bottom: -4px;
  width: 3px;
  background-color: var(--color-text-primary);
  transform: translateX(-50%);
}

.threshold-marker::before {
  content: '';
  position: absolute;
  top: -6px;
  left: 50%;
  transform: translateX(-50%);
  border-left: 6px solid transparent;
  border-right: 6px solid transparent;
  border-top: 8px solid var(--color-text-primary);
}

.threshold-value {
  position: absolute;
  top: -24px;
  left: 50%;
  transform: translateX(-50%);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  white-space: nowrap;
}

.threshold-legend {
  display: flex;
  justify-content: space-between;
  margin-top: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* Results Placeholder */
.results-placeholder {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: var(--space-8);
  color: var(--color-text-tertiary);
}

.results-placeholder svg {
  margin-bottom: var(--space-3);
  opacity: 0.5;
}

.results-placeholder p {
  font-size: var(--font-size-sm);
  margin: 0;
}

/* Formula Section */
.formula-section {
  border-top: 1px solid var(--color-border-light);
}

.formula-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  width: 100%;
  padding: var(--space-4) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.formula-toggle:hover {
  background-color: var(--color-surface-hover);
}

.formula-toggle .chevron {
  margin-left: auto;
  transition: transform var(--transition-fast);
}

.formula-toggle--open .chevron {
  transform: rotate(180deg);
}

.formula-content {
  padding: 0 var(--space-5) var(--space-5);
}

.formula-block {
  margin-bottom: var(--space-5);
}

.formula-block:last-child {
  margin-bottom: 0;
}

.formula-block h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.formula-equation {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-lg);
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  text-align: center;
  margin-bottom: var(--space-2);
}

.formula-explanation {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.reference-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.reference-table th,
.reference-table td {
  padding: var(--space-2) var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.reference-table th {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  background-color: var(--color-surface-elevated);
}

.reference-table td {
  color: var(--color-text-primary);
}

.reference-list {
  margin: 0;
  padding-left: var(--space-5);
}

.reference-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
  line-height: var(--line-height-relaxed);
}

/* Responsive */
@media (max-width: 768px) {
  .calculator-body {
    grid-template-columns: 1fr;
  }
  
  .input-row {
    flex-direction: column;
  }
  
  .input-number {
    max-width: none;
  }
}
</style>
