<template>
  <div class="stencil-calculator">
    <div class="calculator-header">
      <h3 class="calculator-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
          <rect x="7" y="7" width="3" height="3"/>
          <rect x="14" y="7" width="3" height="3"/>
          <rect x="7" y="14" width="3" height="3"/>
          <rect x="14" y="14" width="3" height="3"/>
        </svg>
        Stencil Aperture Calculator
      </h3>
      <p class="calculator-description">
        Calculate area ratio and aspect ratio for optimal solder paste release
      </p>
    </div>

    <div class="calculator-body">
      <!-- Input Section -->
      <div class="input-section">
        <h4 class="section-label">Aperture Parameters</h4>
        
        <!-- Component Type Preset -->
        <div class="input-group">
          <label for="component-type" class="input-label">Component Type</label>
          <select 
            id="component-type" 
            v-model="selectedComponent"
            class="input-select"
            @change="applyPreset"
          >
            <option value="">Custom dimensions...</option>
            <option v-for="comp in componentPresets" :key="comp.id" :value="comp.id">
              {{ comp.name }}
            </option>
          </select>
          <span class="input-help">{{ componentDescription }}</span>
        </div>

        <!-- Pad Width -->
        <div class="input-group">
          <label for="pad-width" class="input-label">
            Pad Width
            <span class="input-hint">(mm)</span>
          </label>
          <input
            id="pad-width"
            v-model.number="padWidth"
            type="number"
            min="0.1"
            max="10"
            step="0.05"
            class="input-number"
            placeholder="Enter width"
          />
          <span class="input-help">Aperture width (shorter dimension)</span>
        </div>

        <!-- Pad Length -->
        <div class="input-group">
          <label for="pad-length" class="input-label">
            Pad Length
            <span class="input-hint">(mm)</span>
          </label>
          <input
            id="pad-length"
            v-model.number="padLength"
            type="number"
            min="0.1"
            max="10"
            step="0.05"
            class="input-number"
            placeholder="Enter length"
          />
          <span class="input-help">Aperture length (longer dimension)</span>
        </div>

        <!-- Stencil Thickness -->
        <div class="input-group">
          <label for="stencil-thickness" class="input-label">
            Stencil Thickness
            <span class="input-hint">(µm)</span>
          </label>
          <select 
            id="stencil-thickness" 
            v-model.number="stencilThickness"
            class="input-select"
          >
            <option v-for="t in thicknessOptions" :key="t.value" :value="t.value">
              {{ t.label }}
            </option>
          </select>
          <span class="input-help">{{ thicknessDescription }}</span>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section" :class="{ 'results-section--active': hasValidInput }">
        <h4 class="section-label">Calculated Results</h4>
        
        <div v-if="hasValidInput" class="results-grid">
          <!-- Area Ratio -->
          <div class="result-card" :class="areaRatioClass">
            <div class="result-label">Area Ratio</div>
            <div class="result-value">
              <span class="result-number">{{ areaRatio.toFixed(2) }}</span>
            </div>
            <div class="result-status">
              <span class="status-badge" :class="areaRatioStatusClass">
                {{ areaRatioStatus }}
              </span>
            </div>
            <div class="result-note">Target: ≥ 0.66 (min), ≥ 0.75 (recommended)</div>
          </div>

          <!-- Aspect Ratio -->
          <div class="result-card" :class="aspectRatioClass">
            <div class="result-label">Aspect Ratio</div>
            <div class="result-value">
              <span class="result-number">{{ aspectRatio.toFixed(2) }}</span>
            </div>
            <div class="result-status">
              <span class="status-badge" :class="aspectRatioStatusClass">
                {{ aspectRatioStatus }}
              </span>
            </div>
            <div class="result-note">Target: ≥ 1.5</div>
          </div>

          <!-- Recommended Thickness -->
          <div class="result-card result-card--full">
            <div class="result-label">Recommended Stencil Thickness</div>
            <div class="recommendation-content">
              <div class="recommendation-value">
                <span class="result-number">{{ recommendedThickness }}</span>
                <span class="result-unit">µm</span>
              </div>
              <p class="recommendation-note">{{ thicknessRecommendation }}</p>
            </div>
          </div>

          <!-- Aperture Modifications -->
          <div class="result-card result-card--full">
            <div class="result-label">Aperture Modification Suggestions</div>
            <div class="modifications-list">
              <div 
                v-for="(mod, index) in apertureModifications" 
                :key="index"
                class="modification-item"
              >
                <div class="modification-icon" :class="mod.iconClass">
                  <svg v-if="mod.type === 'homeplate'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <polygon points="12 2 22 8.5 22 15.5 12 22 2 15.5 2 8.5 12 2"/>
                  </svg>
                  <svg v-else-if="mod.type === 'rounded'" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <rect x="3" y="3" width="18" height="18" rx="4" ry="4"/>
                  </svg>
                  <svg v-else xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                    <circle cx="12" cy="12" r="10"/>
                    <path d="M12 16v-4M12 8h.01"/>
                  </svg>
                </div>
                <div class="modification-content">
                  <span class="modification-name">{{ mod.name }}</span>
                  <span class="modification-description">{{ mod.description }}</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Visual Diagram -->
          <div class="result-card result-card--full">
            <div class="result-label">Aperture Visualization</div>
            <div class="aperture-diagram">
              <svg :viewBox="diagramViewBox" class="diagram-svg">
                <!-- Stencil background -->
                <rect 
                  x="10" y="10" 
                  :width="diagramWidth - 20" 
                  :height="diagramHeight - 20" 
                  fill="var(--color-neutral-200)"
                  stroke="var(--color-neutral-400)"
                  stroke-width="1"
                />
                <!-- Aperture opening -->
                <rect 
                  :x="apertureX" 
                  :y="apertureY" 
                  :width="apertureDisplayWidth" 
                  :height="apertureDisplayHeight"
                  :rx="apertureRadius"
                  :ry="apertureRadius"
                  fill="var(--color-surface)"
                  stroke="var(--color-primary-500)"
                  stroke-width="2"
                />
                <!-- Dimension lines -->
                <g class="dimension-lines">
                  <!-- Width dimension -->
                  <line 
                    :x1="apertureX" 
                    :y1="apertureY + apertureDisplayHeight + 15" 
                    :x2="apertureX + apertureDisplayWidth" 
                    :y2="apertureY + apertureDisplayHeight + 15"
                    stroke="var(--color-text-secondary)"
                    stroke-width="1"
                    marker-start="url(#arrowStart)"
                    marker-end="url(#arrowEnd)"
                  />
                  <text 
                    :x="apertureX + apertureDisplayWidth / 2" 
                    :y="apertureY + apertureDisplayHeight + 28"
                    text-anchor="middle"
                    class="dimension-text"
                  >
                    W: {{ padWidth }}mm
                  </text>
                  <!-- Length dimension -->
                  <line 
                    :x1="apertureX + apertureDisplayWidth + 15" 
                    :y1="apertureY" 
                    :x2="apertureX + apertureDisplayWidth + 15" 
                    :y2="apertureY + apertureDisplayHeight"
                    stroke="var(--color-text-secondary)"
                    stroke-width="1"
                    marker-start="url(#arrowStart)"
                    marker-end="url(#arrowEnd)"
                  />
                  <text 
                    :x="apertureX + apertureDisplayWidth + 28" 
                    :y="apertureY + apertureDisplayHeight / 2"
                    text-anchor="start"
                    dominant-baseline="middle"
                    class="dimension-text"
                  >
                    L: {{ padLength }}mm
                  </text>
                </g>
                <!-- Arrow markers -->
                <defs>
                  <marker id="arrowStart" markerWidth="6" markerHeight="6" refX="0" refY="3" orient="auto">
                    <path d="M6,0 L0,3 L6,6" fill="none" stroke="var(--color-text-secondary)" stroke-width="1"/>
                  </marker>
                  <marker id="arrowEnd" markerWidth="6" markerHeight="6" refX="6" refY="3" orient="auto">
                    <path d="M0,0 L6,3 L0,6" fill="none" stroke="var(--color-text-secondary)" stroke-width="1"/>
                  </marker>
                </defs>
              </svg>
              <div class="diagram-legend">
                <span class="legend-item">
                  <span class="legend-color" style="background: var(--color-neutral-200)"></span>
                  Stencil ({{ stencilThickness }}µm)
                </span>
                <span class="legend-item">
                  <span class="legend-color" style="background: var(--color-surface); border: 2px solid var(--color-primary-500)"></span>
                  Aperture Opening
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="results-placeholder">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"/>
            <path d="M12 16v-4M12 8h.01"/>
          </svg>
          <p>Enter pad dimensions to calculate stencil aperture ratios</p>
        </div>
      </div>
    </div>

    <!-- Formula Section -->
    <div class="formula-section">
      <button 
        class="formula-toggle"
        :class="{ 'formula-toggle--open': showFormula }"
        @click="showFormula = !showFormula"
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
      
      <div v-show="showFormula" class="formula-content">
        <div class="formula-block">
          <h5>Area Ratio Formula</h5>
          <div class="formula-equation">
            Area Ratio = (L × W) / (2 × T × (L + W))
          </div>
          <p class="formula-explanation">
            The area ratio compares the aperture opening area to the aperture wall area. 
            Higher ratios indicate better paste release. IPC-7525 recommends ≥ 0.66 minimum, 
            with ≥ 0.75 preferred for optimal transfer efficiency.
          </p>
        </div>

        <div class="formula-block">
          <h5>Aspect Ratio Formula</h5>
          <div class="formula-equation">
            Aspect Ratio = W / T
          </div>
          <p class="formula-explanation">
            The aspect ratio compares the smallest aperture dimension to stencil thickness.
            A ratio ≥ 1.5 ensures the paste can release cleanly from the aperture walls.
          </p>
        </div>

        <div class="formula-block">
          <h5>Component Presets Reference</h5>
          <table class="reference-table">
            <thead>
              <tr>
                <th>Component</th>
                <th>Typical Pad (mm)</th>
                <th>Recommended Stencil</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>0201</td>
                <td>0.25 × 0.25</td>
                <td>75-100 µm</td>
              </tr>
              <tr>
                <td>0402</td>
                <td>0.35 × 0.50</td>
                <td>100-125 µm</td>
              </tr>
              <tr>
                <td>0603</td>
                <td>0.50 × 0.80</td>
                <td>100-150 µm</td>
              </tr>
              <tr>
                <td>BGA (0.5mm pitch)</td>
                <td>0.25 × 0.25</td>
                <td>75-100 µm</td>
              </tr>
              <tr>
                <td>QFN</td>
                <td>0.30 × 0.80</td>
                <td>100-125 µm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>

    <!-- Export Section -->
    <div class="export-section">
      <button class="export-btn" @click="copyResults" :disabled="!hasValidInput">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
          <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
        </svg>
        {{ copyButtonText }}
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// Reactive state
const selectedComponent = ref('')
const padWidth = ref(0.5)
const padLength = ref(0.8)
const stencilThickness = ref(125)
const showFormula = ref(false)
const copyButtonText = ref('Copy Results')

// Component presets
const componentPresets = [
  { id: 'bga-05', name: 'BGA (0.5mm pitch)', width: 0.25, length: 0.25, description: 'Fine-pitch BGA packages' },
  { id: 'bga-08', name: 'BGA (0.8mm pitch)', width: 0.40, length: 0.40, description: 'Standard BGA packages' },
  { id: 'qfn', name: 'QFN', width: 0.30, length: 0.80, description: 'Quad Flat No-lead packages' },
  { id: '0201', name: '0201', width: 0.25, length: 0.25, description: 'Ultra-miniature chip components' },
  { id: '0402', name: '0402', width: 0.35, length: 0.50, description: 'Miniature chip components' },
  { id: '0603', name: '0603', width: 0.50, length: 0.80, description: 'Small chip components' },
  { id: '0805', name: '0805', width: 0.80, length: 1.25, description: 'Standard chip components' },
  { id: '1206', name: '1206', width: 1.60, length: 3.20, description: 'Large chip components' },
  { id: 'soic', name: 'SOIC', width: 0.60, length: 1.50, description: 'Small Outline IC packages' },
  { id: 'qfp', name: 'QFP', width: 0.30, length: 1.50, description: 'Quad Flat Package' }
]

// Stencil thickness options
const thicknessOptions = [
  { value: 75, label: '75 µm (3 mil) - Ultra-fine pitch' },
  { value: 100, label: '100 µm (4 mil) - Fine pitch' },
  { value: 125, label: '125 µm (5 mil) - Standard' },
  { value: 150, label: '150 µm (6 mil) - Standard/Large' },
  { value: 200, label: '200 µm (8 mil) - Large components' }
]

// Computed values
const hasValidInput = computed(() => {
  return padWidth.value > 0 && padLength.value > 0 && stencilThickness.value > 0
})

const componentDescription = computed(() => {
  if (!selectedComponent.value) return 'Select a component for preset dimensions'
  const comp = componentPresets.find(c => c.id === selectedComponent.value)
  return comp ? comp.description : ''
})

const thicknessDescription = computed(() => {
  const t = thicknessOptions.find(opt => opt.value === stencilThickness.value)
  return t ? t.label.split(' - ')[1] || '' : ''
})

// Convert stencil thickness from µm to mm for calculations
const stencilThicknessMm = computed(() => stencilThickness.value / 1000)

// Area Ratio = (L × W) / (2 × T × (L + W))
const areaRatio = computed(() => {
  if (!hasValidInput.value) return 0
  const L = padLength.value
  const W = padWidth.value
  const T = stencilThicknessMm.value
  return (L * W) / (2 * T * (L + W))
})

// Aspect Ratio = W / T (using smaller dimension)
const aspectRatio = computed(() => {
  if (!hasValidInput.value) return 0
  const smallerDim = Math.min(padWidth.value, padLength.value)
  return smallerDim / stencilThicknessMm.value
})

// Status calculations
const areaRatioStatus = computed(() => {
  if (areaRatio.value >= 0.75) return 'PASS'
  if (areaRatio.value >= 0.66) return 'MARGINAL'
  return 'FAIL'
})

const areaRatioClass = computed(() => {
  if (areaRatio.value >= 0.75) return 'result-card--success'
  if (areaRatio.value >= 0.66) return 'result-card--warning'
  return 'result-card--error'
})

const areaRatioStatusClass = computed(() => {
  if (areaRatio.value >= 0.75) return 'status-badge--success'
  if (areaRatio.value >= 0.66) return 'status-badge--warning'
  return 'status-badge--error'
})

const aspectRatioStatus = computed(() => {
  if (aspectRatio.value >= 1.5) return 'PASS'
  if (aspectRatio.value >= 1.2) return 'MARGINAL'
  return 'FAIL'
})

const aspectRatioClass = computed(() => {
  if (aspectRatio.value >= 1.5) return 'result-card--success'
  if (aspectRatio.value >= 1.2) return 'result-card--warning'
  return 'result-card--error'
})

const aspectRatioStatusClass = computed(() => {
  if (aspectRatio.value >= 1.5) return 'status-badge--success'
  if (aspectRatio.value >= 1.2) return 'status-badge--warning'
  return 'status-badge--error'
})

// Recommended thickness calculation
const recommendedThickness = computed(() => {
  if (!hasValidInput.value) return 125
  const smallerDim = Math.min(padWidth.value, padLength.value)
  // For aspect ratio of 1.5, T = W / 1.5
  const maxThicknessForAspect = (smallerDim / 1.5) * 1000
  // For area ratio of 0.75
  const L = padLength.value
  const W = padWidth.value
  const maxThicknessForArea = ((L * W) / (2 * 0.75 * (L + W))) * 1000
  
  const recommended = Math.min(maxThicknessForAspect, maxThicknessForArea)
  
  // Round to nearest standard thickness
  const standards = [75, 100, 125, 150, 200]
  return standards.reduce((prev, curr) => 
    Math.abs(curr - recommended) < Math.abs(prev - recommended) ? curr : prev
  )
})

const thicknessRecommendation = computed(() => {
  if (stencilThickness.value === recommendedThickness.value) {
    return 'Current thickness is optimal for these pad dimensions.'
  }
  if (stencilThickness.value > recommendedThickness.value) {
    return `Consider reducing to ${recommendedThickness.value}µm for better paste release.`
  }
  return `Current thickness provides good paste release. ${recommendedThickness.value}µm is the maximum recommended.`
})

// Aperture modifications
const apertureModifications = computed(() => {
  const mods = []
  
  if (areaRatio.value < 0.75) {
    mods.push({
      type: 'homeplate',
      name: 'Home Plate Design',
      description: 'Reduce aperture corners to increase area ratio while maintaining paste volume',
      iconClass: 'mod-icon--primary'
    })
  }
  
  if (aspectRatio.value < 1.5) {
    mods.push({
      type: 'rounded',
      name: 'Rounded Corners',
      description: 'Add corner radius (0.05-0.1mm) to improve paste release',
      iconClass: 'mod-icon--accent'
    })
  }
  
  if (areaRatio.value >= 0.75 && aspectRatio.value >= 1.5) {
    mods.push({
      type: 'info',
      name: 'No Modifications Needed',
      description: 'Current aperture design meets all requirements for optimal paste release',
      iconClass: 'mod-icon--success'
    })
  }
  
  return mods
})

// Diagram calculations
const diagramWidth = 200
const diagramHeight = 150
const diagramViewBox = computed(() => `0 0 ${diagramWidth} ${diagramHeight}`)

const maxApertureSize = 80
const apertureScale = computed(() => {
  const maxDim = Math.max(padWidth.value, padLength.value)
  return maxApertureSize / maxDim
})

const apertureDisplayWidth = computed(() => padWidth.value * apertureScale.value)
const apertureDisplayHeight = computed(() => padLength.value * apertureScale.value)
const apertureX = computed(() => (diagramWidth - apertureDisplayWidth.value) / 2 - 15)
const apertureY = computed(() => (diagramHeight - apertureDisplayHeight.value) / 2 - 10)
const apertureRadius = computed(() => aspectRatio.value < 1.5 ? 4 : 0)

// Methods
function applyPreset() {
  if (!selectedComponent.value) return
  const preset = componentPresets.find(c => c.id === selectedComponent.value)
  if (preset) {
    padWidth.value = preset.width
    padLength.value = preset.length
  }
}

async function copyResults() {
  if (!hasValidInput.value) return
  
  const results = `Stencil Aperture Calculator Results
=====================================
Pad Dimensions: ${padWidth.value}mm × ${padLength.value}mm
Stencil Thickness: ${stencilThickness.value}µm

Area Ratio: ${areaRatio.value.toFixed(3)} (${areaRatioStatus.value})
Aspect Ratio: ${aspectRatio.value.toFixed(3)} (${aspectRatioStatus.value})

Recommended Thickness: ${recommendedThickness.value}µm
${thicknessRecommendation.value}

Modifications: ${apertureModifications.value.map(m => m.name).join(', ')}
`
  
  try {
    await navigator.clipboard.writeText(results)
    copyButtonText.value = 'Copied!'
    setTimeout(() => {
      copyButtonText.value = 'Copy Results'
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}
</script>

<style scoped>
.stencil-calculator {
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

.input-select,
.input-number {
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
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

.result-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  padding: var(--space-4);
}

.result-card--full {
  grid-column: 1 / -1;
}

.result-card--success {
  border-color: var(--color-success-300);
  background-color: var(--color-success-50);
}

.result-card--warning {
  border-color: var(--color-warning-300);
  background-color: var(--color-warning-50);
}

.result-card--error {
  border-color: var(--color-error-300);
  background-color: var(--color-error-50);
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

.result-number {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.result-unit {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.result-status {
  margin: var(--space-2) 0;
}

.status-badge {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
}

.status-badge--success {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}

.status-badge--warning {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.status-badge--error {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}

.result-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-1);
}

/* Recommendation */
.recommendation-content {
  display: flex;
  align-items: center;
  gap: var(--space-4);
}

.recommendation-value {
  display: flex;
  align-items: baseline;
  gap: var(--space-1);
}

.recommendation-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Modifications */
.modifications-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.modification-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
}

.modification-icon {
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-default);
}

.mod-icon--primary {
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
}

.mod-icon--accent {
  background-color: var(--color-accent-100);
  color: var(--color-accent-600);
}

.mod-icon--success {
  background-color: var(--color-success-100);
  color: var(--color-success-600);
}

.modification-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.modification-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.modification-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Aperture Diagram */
.aperture-diagram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-3);
}

.diagram-svg {
  width: 100%;
  max-width: 300px;
  height: auto;
}

.dimension-text {
  font-size: 10px;
  fill: var(--color-text-secondary);
  font-family: var(--font-family-mono);
}

.diagram-legend {
  display: flex;
  gap: var(--space-4);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.legend-color {
  width: 16px;
  height: 16px;
  border-radius: var(--radius-sm);
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

/* Export Section */
.export-section {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
}

.export-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.export-btn:hover:not(:disabled) {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

.export-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

/* Responsive */
@media (max-width: 768px) {
  .calculator-body {
    grid-template-columns: 1fr;
  }
  
  .results-grid {
    grid-template-columns: 1fr;
  }
  
  .recommendation-content {
    flex-direction: column;
    align-items: flex-start;
  }
}
</style>
