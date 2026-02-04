<template>
  <div class="reflow-builder">
    <div class="builder-header">
      <h3 class="builder-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 3v18h18"/>
          <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"/>
        </svg>
        Reflow Profile Builder
      </h3>
      <p class="builder-description">
        Design and visualize reflow soldering temperature profiles
      </p>
    </div>

    <div class="builder-body">
      <!-- Configuration Section -->
      <div class="config-section">
        <h4 class="section-label">Profile Configuration</h4>
        
        <!-- Solder Alloy -->
        <div class="input-group">
          <label for="solder-alloy" class="input-label">Solder Alloy</label>
          <select 
            id="solder-alloy" 
            v-model="selectedAlloy"
            class="input-select"
            @change="applyAlloyPreset"
          >
            <option v-for="alloy in solderAlloys" :key="alloy.id" :value="alloy.id">
              {{ alloy.name }}
            </option>
          </select>
          <span class="input-help">Liquidus: {{ currentAlloy.liquidus }}°C</span>
        </div>

        <!-- Board Complexity -->
        <div class="input-group">
          <label for="board-complexity" class="input-label">Board Complexity</label>
          <select 
            id="board-complexity" 
            v-model="boardComplexity"
            class="input-select"
          >
            <option value="simple">Simple (2-layer, low mass)</option>
            <option value="medium">Medium (4-layer, standard)</option>
            <option value="complex">Complex (6+ layer, high mass)</option>
          </select>
          <span class="input-help">{{ complexityDescription }}</span>
        </div>

        <!-- Component Sensitivity -->
        <div class="input-group">
          <label for="component-sensitivity" class="input-label">Component Sensitivity</label>
          <select 
            id="component-sensitivity" 
            v-model="componentSensitivity"
            class="input-select"
          >
            <option value="standard">Standard</option>
            <option value="moisture">Moisture Sensitive (MSL 3+)</option>
            <option value="heat">Heat Sensitive</option>
          </select>
          <span class="input-help">{{ sensitivityDescription }}</span>
        </div>

        <div class="divider"></div>

        <h4 class="section-label">Profile Parameters</h4>

        <!-- Preheat Ramp Rate -->
        <div class="input-group">
          <label class="input-label">
            Preheat Ramp Rate
            <span class="input-value">{{ preheatRamp.toFixed(1) }} °C/sec</span>
          </label>
          <input 
            type="range" 
            v-model.number="preheatRamp"
            min="0.5"
            max="3.0"
            step="0.1"
            class="input-slider"
          />
          <div class="slider-labels">
            <span>0.5</span>
            <span>3.0</span>
          </div>
          <span class="input-help" :class="{ 'input-help--warning': preheatRamp > 2.5 }">
            {{ preheatRamp > 2.5 ? '⚠️ High ramp may cause thermal shock' : 'Recommended: 1.0-2.5 °C/sec' }}
          </span>
        </div>

        <!-- Soak Temperature -->
        <div class="input-group">
          <label class="input-label">
            Soak Temperature
            <span class="input-value">{{ soakTemp }} °C</span>
          </label>
          <input 
            type="range" 
            v-model.number="soakTemp"
            min="140"
            max="200"
            step="5"
            class="input-slider"
          />
          <div class="slider-labels">
            <span>140°C</span>
            <span>200°C</span>
          </div>
          <span class="input-help">Flux activation zone</span>
        </div>

        <!-- Soak Duration -->
        <div class="input-group">
          <label class="input-label">
            Soak Duration
            <span class="input-value">{{ soakDuration }} sec</span>
          </label>
          <input 
            type="range" 
            v-model.number="soakDuration"
            min="30"
            max="180"
            step="10"
            class="input-slider"
          />
          <div class="slider-labels">
            <span>30s</span>
            <span>180s</span>
          </div>
          <span class="input-help">{{ soakDuration < 60 ? '⚠️ May have insufficient flux activation' : 'Recommended: 60-120 sec' }}</span>
        </div>

        <!-- Peak Temperature -->
        <div class="input-group">
          <label class="input-label">
            Peak Temperature
            <span class="input-value">{{ peakTemp }} °C</span>
          </label>
          <input 
            type="range" 
            v-model.number="peakTemp"
            :min="currentAlloy.liquidus + 10"
            :max="currentAlloy.liquidus + 50"
            step="5"
            class="input-slider"
          />
          <div class="slider-labels">
            <span>{{ currentAlloy.liquidus + 10 }}°C</span>
            <span>{{ currentAlloy.liquidus + 50 }}°C</span>
          </div>
          <span class="input-help" :class="{ 'input-help--warning': peakTemp > currentAlloy.maxPeak }">
            {{ peakTemp > currentAlloy.maxPeak ? `⚠️ Exceeds max recommended (${currentAlloy.maxPeak}°C)` : `Recommended: ${currentAlloy.liquidus + 20}-${currentAlloy.maxPeak}°C` }}
          </span>
        </div>

        <!-- Time Above Liquidus -->
        <div class="input-group">
          <label class="input-label">
            Time Above Liquidus (TAL)
            <span class="input-value">{{ timeAboveLiquidus }} sec</span>
          </label>
          <input 
            type="range" 
            v-model.number="timeAboveLiquidus"
            min="20"
            max="120"
            step="5"
            class="input-slider"
          />
          <div class="slider-labels">
            <span>20s</span>
            <span>120s</span>
          </div>
          <span class="input-help" :class="{ 'input-help--warning': timeAboveLiquidus < 30 || timeAboveLiquidus > 90 }">
            {{ timeAboveLiquidus < 30 ? '⚠️ May have insufficient wetting' : timeAboveLiquidus > 90 ? '⚠️ Risk of intermetallic growth' : 'Recommended: 30-90 sec' }}
          </span>
        </div>

        <!-- Cooling Rate -->
        <div class="input-group">
          <label class="input-label">
            Cooling Rate
            <span class="input-value">{{ coolingRate.toFixed(1) }} °C/sec</span>
          </label>
          <input 
            type="range" 
            v-model.number="coolingRate"
            min="1.0"
            max="6.0"
            step="0.5"
            class="input-slider"
          />
          <div class="slider-labels">
            <span>1.0</span>
            <span>6.0</span>
          </div>
          <span class="input-help" :class="{ 'input-help--warning': coolingRate > 4.0 }">
            {{ coolingRate > 4.0 ? '⚠️ Fast cooling may cause thermal stress' : 'Recommended: 2.0-4.0 °C/sec' }}
          </span>
        </div>
      </div>

      <!-- Profile Visualization -->
      <div class="profile-section">
        <h4 class="section-label">Temperature Profile</h4>
        
        <div class="profile-chart">
          <svg :viewBox="chartViewBox" class="chart-svg" ref="chartSvg">
            <!-- Grid lines -->
            <g class="grid-lines">
              <line 
                v-for="temp in gridTemps" 
                :key="'h-' + temp"
                :x1="chartPadding.left"
                :y1="tempToY(temp)"
                :x2="chartWidth - chartPadding.right"
                :y2="tempToY(temp)"
                class="grid-line"
              />
              <line 
                v-for="time in gridTimes" 
                :key="'v-' + time"
                :x1="timeToX(time)"
                :y1="chartPadding.top"
                :x2="timeToX(time)"
                :y2="chartHeight - chartPadding.bottom"
                class="grid-line"
              />
            </g>

            <!-- Liquidus line -->
            <line 
              :x1="chartPadding.left"
              :y1="tempToY(currentAlloy.liquidus)"
              :x2="chartWidth - chartPadding.right"
              :y2="tempToY(currentAlloy.liquidus)"
              class="liquidus-line"
            />
            <text 
              :x="chartWidth - chartPadding.right + 5"
              :y="tempToY(currentAlloy.liquidus)"
              class="liquidus-label"
            >
              Liquidus {{ currentAlloy.liquidus }}°C
            </text>

            <!-- Ideal profile (reference) -->
            <path 
              :d="idealProfilePath"
              class="ideal-profile"
            />

            <!-- Actual profile -->
            <path 
              :d="profilePath"
              class="actual-profile"
            />

            <!-- Zone labels -->
            <g class="zone-labels">
              <text :x="zonePositions.preheat" :y="chartHeight - 5" class="zone-label">Preheat</text>
              <text :x="zonePositions.soak" :y="chartHeight - 5" class="zone-label">Soak</text>
              <text :x="zonePositions.reflow" :y="chartHeight - 5" class="zone-label">Reflow</text>
              <text :x="zonePositions.cooling" :y="chartHeight - 5" class="zone-label">Cooling</text>
            </g>

            <!-- Axis labels -->
            <g class="axis-labels">
              <text 
                v-for="temp in gridTemps" 
                :key="'label-' + temp"
                :x="chartPadding.left - 5"
                :y="tempToY(temp) + 4"
                class="y-axis-label"
              >
                {{ temp }}°C
              </text>
              <text 
                v-for="time in gridTimes" 
                :key="'time-' + time"
                :x="timeToX(time)"
                :y="chartHeight - chartPadding.bottom + 15"
                class="x-axis-label"
              >
                {{ time }}s
              </text>
            </g>
          </svg>

          <div class="chart-legend">
            <span class="legend-item">
              <span class="legend-line legend-line--actual"></span>
              Your Profile
            </span>
            <span class="legend-item">
              <span class="legend-line legend-line--ideal"></span>
              Ideal Reference
            </span>
            <span class="legend-item">
              <span class="legend-line legend-line--liquidus"></span>
              Liquidus Temperature
            </span>
          </div>
        </div>

        <!-- Zone Breakdown -->
        <div class="zone-breakdown">
          <h5 class="breakdown-title">Zone-by-Zone Breakdown</h5>
          <div class="zone-cards">
            <div class="zone-card">
              <div class="zone-header zone-header--preheat">
                <span class="zone-name">Preheat</span>
                <span class="zone-time">{{ preheatTime }}s</span>
              </div>
              <div class="zone-details">
                <div class="zone-detail">
                  <span class="detail-label">Start</span>
                  <span class="detail-value">25°C</span>
                </div>
                <div class="zone-detail">
                  <span class="detail-label">End</span>
                  <span class="detail-value">{{ soakTemp }}°C</span>
                </div>
                <div class="zone-detail">
                  <span class="detail-label">Rate</span>
                  <span class="detail-value">{{ preheatRamp }}°C/s</span>
                </div>
              </div>
            </div>

            <div class="zone-card">
              <div class="zone-header zone-header--soak">
                <span class="zone-name">Soak</span>
                <span class="zone-time">{{ soakDuration }}s</span>
              </div>
              <div class="zone-details">
                <div class="zone-detail">
                  <span class="detail-label">Temp Range</span>
                  <span class="detail-value">{{ soakTemp }}-{{ soakTemp + 20 }}°C</span>
                </div>
                <div class="zone-detail">
                  <span class="detail-label">Purpose</span>
                  <span class="detail-value">Flux activation</span>
                </div>
              </div>
            </div>

            <div class="zone-card">
              <div class="zone-header zone-header--reflow">
                <span class="zone-name">Reflow</span>
                <span class="zone-time">{{ reflowTime }}s</span>
              </div>
              <div class="zone-details">
                <div class="zone-detail">
                  <span class="detail-label">Peak</span>
                  <span class="detail-value">{{ peakTemp }}°C</span>
                </div>
                <div class="zone-detail">
                  <span class="detail-label">TAL</span>
                  <span class="detail-value">{{ timeAboveLiquidus }}s</span>
                </div>
              </div>
            </div>

            <div class="zone-card">
              <div class="zone-header zone-header--cooling">
                <span class="zone-name">Cooling</span>
                <span class="zone-time">{{ coolingTime }}s</span>
              </div>
              <div class="zone-details">
                <div class="zone-detail">
                  <span class="detail-label">Rate</span>
                  <span class="detail-value">{{ coolingRate }}°C/s</span>
                </div>
                <div class="zone-detail">
                  <span class="detail-label">End</span>
                  <span class="detail-value">~50°C</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Warnings -->
        <div v-if="warnings.length > 0" class="warnings-section">
          <h5 class="warnings-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/>
              <line x1="12" y1="9" x2="12" y2="13"/>
              <line x1="12" y1="17" x2="12.01" y2="17"/>
            </svg>
            Profile Warnings
          </h5>
          <ul class="warnings-list">
            <li v-for="(warning, index) in warnings" :key="index">{{ warning }}</li>
          </ul>
        </div>

        <!-- Total Cycle Time -->
        <div class="cycle-time">
          <span class="cycle-label">Total Cycle Time:</span>
          <span class="cycle-value">{{ totalCycleTime }} seconds</span>
          <span class="cycle-note">({{ (totalCycleTime / 60).toFixed(1) }} minutes)</span>
        </div>
      </div>
    </div>

    <!-- Export Section -->
    <div class="export-section">
      <button class="export-btn" @click="exportProfile">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export Profile Data
      </button>
      <button class="export-btn" @click="copyProfile">
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
import { ref, computed, watch } from 'vue'

// Reactive state
const selectedAlloy = ref('sac305')
const boardComplexity = ref('medium')
const componentSensitivity = ref('standard')
const preheatRamp = ref(2.0)
const soakTemp = ref(160)
const soakDuration = ref(90)
const peakTemp = ref(245)
const timeAboveLiquidus = ref(60)
const coolingRate = ref(3.0)
const copyButtonText = ref('Copy Profile')

// Solder alloy data
const solderAlloys = [
  { 
    id: 'sac305', 
    name: 'SAC305 (Sn96.5/Ag3.0/Cu0.5)', 
    liquidus: 217, 
    maxPeak: 260,
    idealPeak: 245,
    description: 'Most common lead-free alloy'
  },
  { 
    id: 'sac387', 
    name: 'SAC387 (Sn95.5/Ag3.8/Cu0.7)', 
    liquidus: 217, 
    maxPeak: 260,
    idealPeak: 245,
    description: 'Higher silver content for better fatigue resistance'
  },
  { 
    id: 'snpb', 
    name: 'Sn63/Pb37 (Eutectic)', 
    liquidus: 183, 
    maxPeak: 235,
    idealPeak: 215,
    description: 'Traditional leaded solder'
  },
  { 
    id: 'snbi', 
    name: 'SnBi (Low-Temp)', 
    liquidus: 138, 
    maxPeak: 180,
    idealPeak: 165,
    description: 'Low temperature for heat-sensitive components'
  }
]

// Computed values
const currentAlloy = computed(() => {
  return solderAlloys.find(a => a.id === selectedAlloy.value) || solderAlloys[0]
})

const complexityDescription = computed(() => {
  const descriptions = {
    simple: 'Faster ramp rates acceptable, shorter soak times',
    medium: 'Standard profile parameters recommended',
    complex: 'Slower ramps, longer soak for thermal uniformity'
  }
  return descriptions[boardComplexity.value]
})

const sensitivityDescription = computed(() => {
  const descriptions = {
    standard: 'Normal reflow parameters',
    moisture: 'Requires proper baking, watch for popcorning',
    heat: 'Minimize peak temperature and TAL'
  }
  return descriptions[componentSensitivity.value]
})

// Time calculations
const preheatTime = computed(() => {
  return Math.round((soakTemp.value - 25) / preheatRamp.value)
})

const reflowTime = computed(() => {
  // Time to go from soak to peak and back to liquidus
  const rampToPeak = (peakTemp.value - soakTemp.value - 20) / 1.5 // Slower ramp to peak
  return Math.round(rampToPeak + timeAboveLiquidus.value)
})

const coolingTime = computed(() => {
  return Math.round((peakTemp.value - 50) / coolingRate.value)
})

const totalCycleTime = computed(() => {
  return preheatTime.value + soakDuration.value + reflowTime.value + coolingTime.value
})

// Chart dimensions
const chartWidth = 500
const chartHeight = 300
const chartPadding = { top: 20, right: 80, bottom: 40, left: 50 }
const chartViewBox = computed(() => `0 0 ${chartWidth} ${chartHeight}`)

// Grid lines
const gridTemps = [50, 100, 150, 200, 250, 300]
const gridTimes = computed(() => {
  const maxTime = totalCycleTime.value
  const step = Math.ceil(maxTime / 5 / 30) * 30 // Round to nearest 30s
  return Array.from({ length: 6 }, (_, i) => i * step)
})

// Coordinate conversion
const tempToY = (temp) => {
  const minTemp = 0
  const maxTemp = 320
  const plotHeight = chartHeight - chartPadding.top - chartPadding.bottom
  return chartPadding.top + plotHeight * (1 - (temp - minTemp) / (maxTemp - minTemp))
}

const timeToX = (time) => {
  const maxTime = Math.max(totalCycleTime.value, 300)
  const plotWidth = chartWidth - chartPadding.left - chartPadding.right
  return chartPadding.left + plotWidth * (time / maxTime)
}

// Profile path generation
const profilePath = computed(() => {
  const points = []
  let currentTime = 0
  
  // Start point
  points.push({ time: 0, temp: 25 })
  
  // End of preheat
  currentTime += preheatTime.value
  points.push({ time: currentTime, temp: soakTemp.value })
  
  // End of soak (slight rise during soak)
  currentTime += soakDuration.value
  points.push({ time: currentTime, temp: soakTemp.value + 20 })
  
  // Ramp to peak
  const rampToPeakTime = (peakTemp.value - soakTemp.value - 20) / 1.5
  currentTime += rampToPeakTime
  points.push({ time: currentTime, temp: peakTemp.value })
  
  // TAL - time at peak
  currentTime += timeAboveLiquidus.value - rampToPeakTime
  points.push({ time: currentTime, temp: peakTemp.value - 10 })
  
  // Cooling
  currentTime += coolingTime.value
  points.push({ time: currentTime, temp: 50 })
  
  // Generate SVG path
  return points.map((p, i) => {
    const x = timeToX(p.time)
    const y = tempToY(p.temp)
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
  }).join(' ')
})

// Ideal profile path (reference)
const idealProfilePath = computed(() => {
  const alloy = currentAlloy.value
  const points = []
  let currentTime = 0
  
  // Ideal profile based on alloy
  points.push({ time: 0, temp: 25 })
  
  // Preheat (2°C/s)
  currentTime += 75
  points.push({ time: currentTime, temp: 150 })
  
  // Soak
  currentTime += 90
  points.push({ time: currentTime, temp: 180 })
  
  // Ramp to peak
  currentTime += 40
  points.push({ time: currentTime, temp: alloy.idealPeak })
  
  // TAL
  currentTime += 50
  points.push({ time: currentTime, temp: alloy.idealPeak - 10 })
  
  // Cooling
  currentTime += 60
  points.push({ time: currentTime, temp: 50 })
  
  return points.map((p, i) => {
    const x = timeToX(p.time)
    const y = tempToY(p.temp)
    return i === 0 ? `M ${x} ${y}` : `L ${x} ${y}`
  }).join(' ')
})

// Zone positions for labels
const zonePositions = computed(() => {
  return {
    preheat: timeToX(preheatTime.value / 2),
    soak: timeToX(preheatTime.value + soakDuration.value / 2),
    reflow: timeToX(preheatTime.value + soakDuration.value + reflowTime.value / 2),
    cooling: timeToX(preheatTime.value + soakDuration.value + reflowTime.value + coolingTime.value / 2)
  }
})

// Warnings
const warnings = computed(() => {
  const w = []
  
  if (preheatRamp.value > 2.5) {
    w.push('Preheat ramp rate exceeds 2.5°C/sec - risk of thermal shock to components')
  }
  
  if (soakDuration.value < 60) {
    w.push('Soak duration under 60 seconds may result in insufficient flux activation')
  }
  
  if (peakTemp.value > currentAlloy.value.maxPeak) {
    w.push(`Peak temperature exceeds maximum recommended (${currentAlloy.value.maxPeak}°C) for ${currentAlloy.value.name}`)
  }
  
  if (timeAboveLiquidus.value < 30) {
    w.push('Time above liquidus under 30 seconds may result in poor wetting')
  }
  
  if (timeAboveLiquidus.value > 90) {
    w.push('Time above liquidus over 90 seconds increases risk of intermetallic compound growth')
  }
  
  if (coolingRate.value > 4.0) {
    w.push('Cooling rate exceeds 4°C/sec - risk of thermal stress and solder joint cracking')
  }
  
  if (componentSensitivity.value === 'moisture' && peakTemp.value > 245) {
    w.push('High peak temperature with moisture-sensitive components - ensure proper baking')
  }
  
  if (componentSensitivity.value === 'heat' && peakTemp.value > 240) {
    w.push('Consider reducing peak temperature for heat-sensitive components')
  }
  
  return w
})

// Methods
function applyAlloyPreset() {
  const alloy = currentAlloy.value
  peakTemp.value = alloy.idealPeak
  
  // Adjust soak temp based on alloy
  if (alloy.id === 'snbi') {
    soakTemp.value = 100
  } else if (alloy.id === 'snpb') {
    soakTemp.value = 150
  } else {
    soakTemp.value = 160
  }
}

function exportProfile() {
  const profileData = {
    alloy: currentAlloy.value.name,
    boardComplexity: boardComplexity.value,
    componentSensitivity: componentSensitivity.value,
    parameters: {
      preheatRamp: preheatRamp.value,
      soakTemp: soakTemp.value,
      soakDuration: soakDuration.value,
      peakTemp: peakTemp.value,
      timeAboveLiquidus: timeAboveLiquidus.value,
      coolingRate: coolingRate.value
    },
    timing: {
      preheatTime: preheatTime.value,
      soakTime: soakDuration.value,
      reflowTime: reflowTime.value,
      coolingTime: coolingTime.value,
      totalCycleTime: totalCycleTime.value
    },
    warnings: warnings.value
  }
  
  const blob = new Blob([JSON.stringify(profileData, null, 2)], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `reflow-profile-${selectedAlloy.value}.json`
  a.click()
  URL.revokeObjectURL(url)
}

async function copyProfile() {
  const text = `Reflow Profile - ${currentAlloy.value.name}
==========================================
Board Complexity: ${boardComplexity.value}
Component Sensitivity: ${componentSensitivity.value}

PARAMETERS:
- Preheat Ramp: ${preheatRamp.value} °C/sec
- Soak Temperature: ${soakTemp.value}°C
- Soak Duration: ${soakDuration.value} sec
- Peak Temperature: ${peakTemp.value}°C
- Time Above Liquidus: ${timeAboveLiquidus.value} sec
- Cooling Rate: ${coolingRate.value} °C/sec

TIMING:
- Preheat: ${preheatTime.value}s
- Soak: ${soakDuration.value}s
- Reflow: ${reflowTime.value}s
- Cooling: ${coolingTime.value}s
- Total Cycle: ${totalCycleTime.value}s (${(totalCycleTime.value / 60).toFixed(1)} min)

${warnings.value.length > 0 ? 'WARNINGS:\n' + warnings.value.map(w => '- ' + w).join('\n') : 'No warnings'}
`
  
  try {
    await navigator.clipboard.writeText(text)
    copyButtonText.value = 'Copied!'
    setTimeout(() => {
      copyButtonText.value = 'Copy Profile'
    }, 2000)
  } catch (err) {
    console.error('Failed to copy:', err)
  }
}

// Watch for alloy changes to update peak temp
watch(selectedAlloy, () => {
  applyAlloyPreset()
})
</script>

<style scoped>
.reflow-builder {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.builder-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-error-600), var(--color-error-700));
  color: var(--color-text-inverse);
}

.builder-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.builder-title svg {
  opacity: 0.9;
}

.builder-description {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

.builder-body {
  display: grid;
  grid-template-columns: 320px 1fr;
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

/* Config Section */
.config-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.divider {
  height: 1px;
  background-color: var(--color-border-light);
  margin: var(--space-2) 0;
}

.input-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.input-label {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.input-value {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-primary-600);
  font-weight: var(--font-weight-semibold);
}

.input-select {
  padding: var(--space-3);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
}

.input-select:focus {
  outline: none;
  border-color: var(--color-primary-500);
  box-shadow: 0 0 0 3px var(--color-primary-100);
}

.input-slider {
  width: 100%;
  height: 6px;
  border-radius: var(--radius-full);
  background: var(--color-neutral-200);
  outline: none;
  -webkit-appearance: none;
}

.input-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary-500);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.input-slider::-moz-range-thumb {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--color-primary-500);
  cursor: pointer;
  border: 2px solid white;
  box-shadow: var(--shadow-sm);
}

.slider-labels {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.input-help {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.input-help--warning {
  color: var(--color-warning-600);
}

/* Profile Section */
.profile-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.profile-chart {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.chart-svg {
  width: 100%;
  height: auto;
}

.grid-line {
  stroke: var(--color-border-light);
  stroke-width: 1;
  stroke-dasharray: 4 4;
}

.liquidus-line {
  stroke: var(--color-error-400);
  stroke-width: 2;
  stroke-dasharray: 8 4;
}

.liquidus-label {
  font-size: 10px;
  fill: var(--color-error-600);
}

.ideal-profile {
  fill: none;
  stroke: var(--color-neutral-400);
  stroke-width: 2;
  stroke-dasharray: 6 3;
}

.actual-profile {
  fill: none;
  stroke: var(--color-primary-500);
  stroke-width: 3;
}

.zone-label {
  font-size: 10px;
  fill: var(--color-text-tertiary);
  text-anchor: middle;
}

.y-axis-label {
  font-size: 9px;
  fill: var(--color-text-tertiary);
  text-anchor: end;
}

.x-axis-label {
  font-size: 9px;
  fill: var(--color-text-tertiary);
  text-anchor: middle;
}

.chart-legend {
  display: flex;
  justify-content: center;
  gap: var(--space-4);
  margin-top: var(--space-3);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.legend-line {
  width: 24px;
  height: 3px;
  border-radius: var(--radius-full);
}

.legend-line--actual {
  background-color: var(--color-primary-500);
}

.legend-line--ideal {
  background-color: var(--color-neutral-400);
  background-image: repeating-linear-gradient(
    90deg,
    var(--color-neutral-400) 0px,
    var(--color-neutral-400) 6px,
    transparent 6px,
    transparent 9px
  );
}

.legend-line--liquidus {
  background-color: var(--color-error-400);
  background-image: repeating-linear-gradient(
    90deg,
    var(--color-error-400) 0px,
    var(--color-error-400) 8px,
    transparent 8px,
    transparent 12px
  );
}

/* Zone Breakdown */
.zone-breakdown {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.breakdown-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.zone-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.zone-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  overflow: hidden;
}

.zone-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  color: white;
}

.zone-header--preheat {
  background-color: var(--color-accent-500);
}

.zone-header--soak {
  background-color: var(--color-warning-500);
}

.zone-header--reflow {
  background-color: var(--color-error-500);
}

.zone-header--cooling {
  background-color: var(--color-primary-500);
}

.zone-name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
}

.zone-time {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono);
}

.zone-details {
  padding: var(--space-2) var(--space-3);
}

.zone-detail {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  margin-bottom: var(--space-1);
}

.zone-detail:last-child {
  margin-bottom: 0;
}

.detail-label {
  color: var(--color-text-tertiary);
}

.detail-value {
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

/* Warnings */
.warnings-section {
  background-color: var(--color-warning-50);
  border: 1px solid var(--color-warning-200);
  border-radius: var(--radius-default);
  padding: var(--space-3);
}

.warnings-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-warning-700);
  margin: 0 0 var(--space-2) 0;
}

.warnings-list {
  margin: 0;
  padding-left: var(--space-5);
}

.warnings-list li {
  font-size: var(--font-size-sm);
  color: var(--color-warning-700);
  margin-bottom: var(--space-1);
}

/* Cycle Time */
.cycle-time {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-default);
}

.cycle-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.cycle-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

.cycle-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

/* Export Section */
.export-section {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border-light);
  display: flex;
  justify-content: flex-end;
  gap: var(--space-3);
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

.export-btn:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 900px) {
  .builder-body {
    grid-template-columns: 1fr;
  }
  
  .zone-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .zone-cards {
    grid-template-columns: 1fr;
  }
}
</style>
