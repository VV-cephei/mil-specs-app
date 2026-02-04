<template>
  <div class="alloy-selector">
    <div class="selector-header">
      <h3 class="selector-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>
        </svg>
        Solder Alloy Selector
      </h3>
      <p class="selector-description">
        Find the optimal solder alloy for your application requirements
      </p>
    </div>

    <div class="selector-body">
      <!-- Requirements Section -->
      <div class="requirements-section">
        <h4 class="section-label">Application Requirements</h4>
        
        <!-- Application Type -->
        <div class="input-group">
          <label for="app-type" class="input-label">Application Type</label>
          <select id="app-type" v-model="applicationType" class="input-select">
            <option value="consumer">Consumer Electronics</option>
            <option value="industrial">Industrial</option>
            <option value="automotive">Automotive</option>
            <option value="aerospace">Aerospace / Military</option>
            <option value="medical">Medical</option>
          </select>
          <span class="input-help">{{ applicationDescription }}</span>
        </div>

        <!-- Operating Temperature -->
        <div class="input-group">
          <label class="input-label">Operating Temperature Range</label>
          <div class="temp-range">
            <div class="temp-input">
              <label class="temp-label">Min</label>
              <input 
                type="number" 
                v-model.number="tempMin" 
                class="input-number"
                min="-65"
                max="150"
              />
              <span class="temp-unit">°C</span>
            </div>
            <span class="temp-separator">to</span>
            <div class="temp-input">
              <label class="temp-label">Max</label>
              <input 
                type="number" 
                v-model.number="tempMax" 
                class="input-number"
                min="-40"
                max="200"
              />
              <span class="temp-unit">°C</span>
            </div>
          </div>
          <span class="input-help">{{ tempRangeDescription }}</span>
        </div>

        <!-- Lead-Free Requirement -->
        <div class="input-group">
          <label class="input-label">Lead-Free Requirement</label>
          <div class="radio-group">
            <label class="radio-option" :class="{ 'radio-option--selected': leadFree === 'required' }">
              <input type="radio" v-model="leadFree" value="required" />
              <span class="radio-indicator"></span>
              <span class="radio-text">Required (RoHS)</span>
            </label>
            <label class="radio-option" :class="{ 'radio-option--selected': leadFree === 'preferred' }">
              <input type="radio" v-model="leadFree" value="preferred" />
              <span class="radio-indicator"></span>
              <span class="radio-text">Preferred</span>
            </label>
            <label class="radio-option" :class="{ 'radio-option--selected': leadFree === 'no' }">
              <input type="radio" v-model="leadFree" value="no" />
              <span class="radio-indicator"></span>
              <span class="radio-text">Not Required</span>
            </label>
          </div>
        </div>

        <!-- Reliability Requirements -->
        <div class="input-group">
          <label for="reliability" class="input-label">Reliability Requirements</label>
          <select id="reliability" v-model="reliability" class="input-select">
            <option value="standard">Standard (Consumer grade)</option>
            <option value="high">High (Industrial/Automotive)</option>
            <option value="extreme">Extreme (Aerospace/Military)</option>
          </select>
          <span class="input-help">{{ reliabilityDescription }}</span>
        </div>

        <!-- Cost Sensitivity -->
        <div class="input-group">
          <label for="cost" class="input-label">Cost Sensitivity</label>
          <select id="cost" v-model="costSensitivity" class="input-select">
            <option value="high">High (Cost is primary driver)</option>
            <option value="medium">Medium (Balance cost/performance)</option>
            <option value="low">Low (Performance over cost)</option>
          </select>
        </div>

        <!-- Special Requirements -->
        <div class="input-group">
          <label class="input-label">Special Requirements</label>
          <div class="checkbox-group">
            <label class="checkbox-option" v-for="req in specialRequirements" :key="req.id">
              <input type="checkbox" v-model="selectedRequirements" :value="req.id" />
              <span class="checkbox-indicator"></span>
              <span class="checkbox-text">{{ req.label }}</span>
            </label>
          </div>
        </div>
      </div>

      <!-- Results Section -->
      <div class="results-section">
        <h4 class="section-label">Recommended Alloys</h4>
        
        <div v-if="rankedAlloys.length > 0" class="alloys-list">
          <div 
            v-for="(alloy, index) in rankedAlloys" 
            :key="alloy.id"
            class="alloy-card"
            :class="{ 
              'alloy-card--recommended': index === 0,
              'alloy-card--expanded': expandedAlloy === alloy.id 
            }"
          >
            <div class="alloy-header" @click="toggleAlloy(alloy.id)">
              <div class="alloy-rank" :class="'alloy-rank--' + (index + 1)">
                {{ index === 0 ? '★' : index + 1 }}
              </div>
              <div class="alloy-main">
                <span class="alloy-name">{{ alloy.name }}</span>
                <span class="alloy-composition">{{ alloy.composition }}</span>
              </div>
              <div class="alloy-score">
                <span class="score-value">{{ alloy.score }}%</span>
                <span class="score-label">Match</span>
              </div>
              <svg class="expand-icon" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="6 9 12 15 18 9"/>
              </svg>
            </div>
            
            <div v-show="expandedAlloy === alloy.id" class="alloy-details">
              <div class="details-grid">
                <div class="detail-item">
                  <span class="detail-label">Melting Point</span>
                  <span class="detail-value">{{ alloy.meltingPoint }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Liquidus</span>
                  <span class="detail-value">{{ alloy.liquidus }}°C</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Peak Reflow</span>
                  <span class="detail-value">{{ alloy.peakReflow }}</span>
                </div>
                <div class="detail-item">
                  <span class="detail-label">Compliance</span>
                  <span class="detail-value">{{ alloy.compliance }}</span>
                </div>
              </div>

              <div class="pros-cons">
                <div class="pros">
                  <h6 class="pros-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <polyline points="20 6 9 17 4 12"/>
                    </svg>
                    Advantages
                  </h6>
                  <ul class="pros-list">
                    <li v-for="(pro, i) in alloy.pros" :key="i">{{ pro }}</li>
                  </ul>
                </div>
                <div class="cons">
                  <h6 class="cons-title">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                      <line x1="18" y1="6" x2="6" y2="18"/>
                      <line x1="6" y1="6" x2="18" y2="18"/>
                    </svg>
                    Considerations
                  </h6>
                  <ul class="cons-list">
                    <li v-for="(con, i) in alloy.cons" :key="i">{{ con }}</li>
                  </ul>
                </div>
              </div>

              <div class="compatibility-section">
                <h6 class="compatibility-title">Surface Finish Compatibility</h6>
                <div class="compatibility-tags">
                  <span 
                    v-for="finish in alloy.compatibleFinishes" 
                    :key="finish"
                    class="compatibility-tag"
                  >
                    {{ finish }}
                  </span>
                </div>
              </div>

              <div class="flux-section">
                <h6 class="flux-title">Recommended Flux Types</h6>
                <div class="flux-tags">
                  <span 
                    v-for="flux in alloy.recommendedFlux" 
                    :key="flux"
                    class="flux-tag"
                  >
                    {{ flux }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Comparison Table -->
        <div class="comparison-section">
          <button 
            class="comparison-toggle"
            @click="showComparison = !showComparison"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <line x1="3" y1="9" x2="21" y2="9"/>
              <line x1="3" y1="15" x2="21" y2="15"/>
              <line x1="9" y1="3" x2="9" y2="21"/>
            </svg>
            {{ showComparison ? 'Hide' : 'Show' }} Comparison Table
          </button>
          
          <div v-show="showComparison" class="comparison-table-wrapper">
            <table class="comparison-table">
              <thead>
                <tr>
                  <th>Property</th>
                  <th v-for="alloy in rankedAlloys.slice(0, 4)" :key="alloy.id">
                    {{ alloy.name }}
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Liquidus (°C)</td>
                  <td v-for="alloy in rankedAlloys.slice(0, 4)" :key="alloy.id + '-liq'">
                    {{ alloy.liquidus }}
                  </td>
                </tr>
                <tr>
                  <td>Lead-Free</td>
                  <td v-for="alloy in rankedAlloys.slice(0, 4)" :key="alloy.id + '-pb'">
                    <span :class="alloy.leadFree ? 'badge-yes' : 'badge-no'">
                      {{ alloy.leadFree ? 'Yes' : 'No' }}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td>Thermal Fatigue</td>
                  <td v-for="alloy in rankedAlloys.slice(0, 4)" :key="alloy.id + '-fatigue'">
                    {{ alloy.thermalFatigue }}
                  </td>
                </tr>
                <tr>
                  <td>Wetting</td>
                  <td v-for="alloy in rankedAlloys.slice(0, 4)" :key="alloy.id + '-wet'">
                    {{ alloy.wetting }}
                  </td>
                </tr>
                <tr>
                  <td>Relative Cost</td>
                  <td v-for="alloy in rankedAlloys.slice(0, 4)" :key="alloy.id + '-cost'">
                    {{ alloy.relativeCost }}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>

    <!-- Export Section -->
    <div class="export-section">
      <button class="export-btn" @click="exportResults">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export Comparison
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const applicationType = ref('consumer')
const tempMin = ref(-20)
const tempMax = ref(85)
const leadFree = ref('required')
const reliability = ref('standard')
const costSensitivity = ref('medium')
const selectedRequirements = ref([])
const expandedAlloy = ref(null)
const showComparison = ref(false)

// Special requirements options
const specialRequirements = [
  { id: 'low-temp', label: 'Low temperature processing' },
  { id: 'high-strength', label: 'High mechanical strength' },
  { id: 'thermal-cycling', label: 'Thermal cycling resistance' },
  { id: 'drop-shock', label: 'Drop/shock resistance' },
  { id: 'fine-pitch', label: 'Fine pitch components' },
  { id: 'rework', label: 'Easy rework capability' }
]

// Alloy database
const alloys = [
  {
    id: 'sac305',
    name: 'SAC305',
    composition: 'Sn96.5/Ag3.0/Cu0.5',
    liquidus: 217,
    meltingPoint: '217-220°C',
    peakReflow: '235-250°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Good',
    wetting: 'Good',
    relativeCost: '$$',
    pros: [
      'Industry standard lead-free alloy',
      'Good balance of properties',
      'Wide process window',
      'Excellent availability'
    ],
    cons: [
      'Higher melting point than SnPb',
      'Can form tin whiskers',
      'Moderate drop shock resistance'
    ],
    compatibleFinishes: ['ENIG', 'OSP', 'Immersion Sn', 'HASL'],
    recommendedFlux: ['No-Clean', 'Water Soluble', 'Rosin'],
    scores: {
      consumer: 90,
      industrial: 85,
      automotive: 80,
      aerospace: 70,
      medical: 85
    }
  },
  {
    id: 'sac387',
    name: 'SAC387',
    composition: 'Sn95.5/Ag3.8/Cu0.7',
    liquidus: 217,
    meltingPoint: '217-219°C',
    peakReflow: '235-250°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Excellent',
    wetting: 'Good',
    relativeCost: '$$$',
    pros: [
      'Superior thermal fatigue resistance',
      'Higher silver content for reliability',
      'Good for automotive applications',
      'Excellent creep resistance'
    ],
    cons: [
      'Higher cost due to silver content',
      'Slightly narrower process window',
      'Can be more brittle'
    ],
    compatibleFinishes: ['ENIG', 'OSP', 'Immersion Sn', 'HASL'],
    recommendedFlux: ['No-Clean', 'Water Soluble'],
    scores: {
      consumer: 80,
      industrial: 90,
      automotive: 95,
      aerospace: 80,
      medical: 90
    }
  },
  {
    id: 'sac105',
    name: 'SAC105',
    composition: 'Sn98.5/Ag1.0/Cu0.5',
    liquidus: 217,
    meltingPoint: '217-227°C',
    peakReflow: '235-250°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Moderate',
    wetting: 'Good',
    relativeCost: '$',
    pros: [
      'Lower cost than SAC305',
      'Better drop shock resistance',
      'Good for portable electronics',
      'Reduced silver content'
    ],
    cons: [
      'Lower thermal fatigue resistance',
      'Wider melting range',
      'Not ideal for high-reliability'
    ],
    compatibleFinishes: ['ENIG', 'OSP', 'Immersion Sn'],
    recommendedFlux: ['No-Clean', 'Water Soluble'],
    scores: {
      consumer: 95,
      industrial: 70,
      automotive: 60,
      aerospace: 50,
      medical: 70
    }
  },
  {
    id: 'snpb',
    name: 'Sn63/Pb37',
    composition: 'Sn63/Pb37 (Eutectic)',
    liquidus: 183,
    meltingPoint: '183°C (Eutectic)',
    peakReflow: '210-225°C',
    compliance: 'Non-RoHS (Exempt uses)',
    leadFree: false,
    thermalFatigue: 'Excellent',
    wetting: 'Excellent',
    relativeCost: '$',
    pros: [
      'Excellent wetting and flow',
      'Lower processing temperature',
      'Proven long-term reliability',
      'Easy rework',
      'Best overall workability'
    ],
    cons: [
      'Contains lead (RoHS restricted)',
      'Limited to exempt applications',
      'Environmental concerns'
    ],
    compatibleFinishes: ['HASL', 'ENIG', 'OSP', 'Immersion Sn', 'Immersion Ag'],
    recommendedFlux: ['No-Clean', 'Water Soluble', 'Rosin'],
    scores: {
      consumer: 30,
      industrial: 60,
      automotive: 50,
      aerospace: 95,
      medical: 80
    }
  },
  {
    id: 'snbi',
    name: 'SnBi (Low-Temp)',
    composition: 'Sn42/Bi58',
    liquidus: 138,
    meltingPoint: '138°C (Eutectic)',
    peakReflow: '160-180°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Poor',
    wetting: 'Moderate',
    relativeCost: '$$',
    pros: [
      'Very low processing temperature',
      'Ideal for heat-sensitive components',
      'Energy savings in reflow',
      'Good for step soldering'
    ],
    cons: [
      'Brittle joints',
      'Poor thermal fatigue',
      'Limited operating temperature',
      'Not for high-reliability'
    ],
    compatibleFinishes: ['ENIG', 'OSP', 'Immersion Sn'],
    recommendedFlux: ['No-Clean', 'Low-Residue'],
    scores: {
      consumer: 70,
      industrial: 50,
      automotive: 30,
      aerospace: 20,
      medical: 60
    }
  },
  {
    id: 'snag',
    name: 'SnAg3.5',
    composition: 'Sn96.5/Ag3.5',
    liquidus: 221,
    meltingPoint: '221°C',
    peakReflow: '240-255°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Good',
    wetting: 'Good',
    relativeCost: '$$$',
    pros: [
      'Good thermal fatigue resistance',
      'No copper dissolution issues',
      'Suitable for die attach',
      'High strength'
    ],
    cons: [
      'Higher melting point',
      'More expensive',
      'Narrower process window'
    ],
    compatibleFinishes: ['ENIG', 'Immersion Ag'],
    recommendedFlux: ['No-Clean', 'Water Soluble'],
    scores: {
      consumer: 60,
      industrial: 75,
      automotive: 70,
      aerospace: 75,
      medical: 80
    }
  },
  {
    id: 'sncuniag',
    name: 'SN100C',
    composition: 'Sn/Cu0.7/Ni0.05/Ag',
    liquidus: 227,
    meltingPoint: '227°C',
    peakReflow: '245-260°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Good',
    wetting: 'Good',
    relativeCost: '$',
    pros: [
      'Low cost (minimal silver)',
      'Good reliability',
      'Bright shiny joints',
      'Reduced copper dissolution'
    ],
    cons: [
      'Higher melting point',
      'Requires higher reflow temps',
      'Less forgiving process'
    ],
    compatibleFinishes: ['ENIG', 'OSP', 'HASL'],
    recommendedFlux: ['No-Clean', 'Water Soluble'],
    scores: {
      consumer: 85,
      industrial: 80,
      automotive: 75,
      aerospace: 60,
      medical: 75
    }
  },
  {
    id: 'innolot',
    name: 'Innolot',
    composition: 'Sn/Ag3.8/Cu0.7/Bi3/Sb1.4/Ni0.15',
    liquidus: 206,
    meltingPoint: '206-218°C',
    peakReflow: '235-250°C',
    compliance: 'RoHS, REACH',
    leadFree: true,
    thermalFatigue: 'Excellent',
    wetting: 'Good',
    relativeCost: '$$$$',
    pros: [
      'Exceptional thermal cycling performance',
      'Designed for automotive',
      'High creep resistance',
      'Extended reliability'
    ],
    cons: [
      'Premium cost',
      'Complex composition',
      'Limited suppliers'
    ],
    compatibleFinishes: ['ENIG', 'OSP'],
    recommendedFlux: ['No-Clean'],
    scores: {
      consumer: 50,
      industrial: 85,
      automotive: 98,
      aerospace: 85,
      medical: 80
    }
  }
]

// Computed values
const applicationDescription = computed(() => {
  const descriptions = {
    consumer: 'Smartphones, tablets, wearables - cost-sensitive, standard reliability',
    industrial: 'Factory equipment, controls - extended temperature, high reliability',
    automotive: 'Under-hood, infotainment - extreme temps, vibration, long life',
    aerospace: 'Avionics, satellites - highest reliability, often leaded allowed',
    medical: 'Implants, diagnostics - biocompatibility, high reliability'
  }
  return descriptions[applicationType.value]
})

const tempRangeDescription = computed(() => {
  if (tempMax.value > 125) return 'Extended temperature range - consider high-reliability alloys'
  if (tempMax.value > 85) return 'Industrial temperature range'
  return 'Commercial temperature range'
})

const reliabilityDescription = computed(() => {
  const descriptions = {
    standard: '3-5 year product life, normal operating conditions',
    high: '10+ year life, thermal cycling, vibration exposure',
    extreme: '20+ year life, harsh environments, mission-critical'
  }
  return descriptions[reliability.value]
})

// Scoring and ranking
const rankedAlloys = computed(() => {
  return alloys
    .map(alloy => {
      let score = alloy.scores[applicationType.value] || 50
      
      // Adjust for lead-free requirement
      if (leadFree.value === 'required' && !alloy.leadFree) {
        score -= 50
      } else if (leadFree.value === 'no' && !alloy.leadFree) {
        score += 10
      }
      
      // Adjust for temperature range
      if (tempMax.value > 125 && alloy.thermalFatigue === 'Excellent') {
        score += 10
      }
      if (tempMax.value > 150 && alloy.id === 'snbi') {
        score -= 30 // SnBi not suitable for high temps
      }
      
      // Adjust for reliability
      if (reliability.value === 'extreme') {
        if (alloy.thermalFatigue === 'Excellent') score += 15
        if (alloy.thermalFatigue === 'Poor') score -= 20
      }
      
      // Adjust for cost sensitivity
      if (costSensitivity.value === 'high') {
        if (alloy.relativeCost === '$') score += 15
        if (alloy.relativeCost === '$$$$') score -= 15
      }
      
      // Adjust for special requirements
      if (selectedRequirements.value.includes('low-temp') && alloy.id === 'snbi') {
        score += 20
      }
      if (selectedRequirements.value.includes('thermal-cycling') && alloy.thermalFatigue === 'Excellent') {
        score += 15
      }
      if (selectedRequirements.value.includes('drop-shock') && alloy.id === 'sac105') {
        score += 15
      }
      if (selectedRequirements.value.includes('rework') && alloy.id === 'snpb') {
        score += 15
      }
      
      return {
        ...alloy,
        score: Math.max(0, Math.min(100, score))
      }
    })
    .filter(alloy => alloy.score > 20)
    .sort((a, b) => b.score - a.score)
})

// Methods
function toggleAlloy(alloyId) {
  expandedAlloy.value = expandedAlloy.value === alloyId ? null : alloyId
}

function exportResults() {
  const report = `Solder Alloy Selection Report
==============================
Date: ${new Date().toLocaleString()}

REQUIREMENTS:
- Application: ${applicationType.value}
- Temperature Range: ${tempMin.value}°C to ${tempMax.value}°C
- Lead-Free: ${leadFree.value}
- Reliability: ${reliability.value}
- Cost Sensitivity: ${costSensitivity.value}
- Special Requirements: ${selectedRequirements.value.join(', ') || 'None'}

RECOMMENDED ALLOYS:
${rankedAlloys.value.slice(0, 5).map((alloy, i) => `
${i + 1}. ${alloy.name} (${alloy.score}% match)
   Composition: ${alloy.composition}
   Liquidus: ${alloy.liquidus}°C
   Peak Reflow: ${alloy.peakReflow}
   Compliance: ${alloy.compliance}
   
   Advantages:
   ${alloy.pros.map(p => '   - ' + p).join('\n')}
   
   Considerations:
   ${alloy.cons.map(c => '   - ' + c).join('\n')}
`).join('\n')}

COMPARISON:
Alloy          | Liquidus | Lead-Free | Fatigue  | Cost
---------------|----------|-----------|----------|------
${rankedAlloys.value.slice(0, 5).map(a => 
  `${a.name.padEnd(14)} | ${String(a.liquidus).padEnd(8)} | ${(a.leadFree ? 'Yes' : 'No').padEnd(9)} | ${a.thermalFatigue.padEnd(8)} | ${a.relativeCost}`
).join('\n')}
`

  const blob = new Blob([report], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `solder-alloy-selection-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.alloy-selector {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.selector-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-accent-600), var(--color-accent-700));
  color: var(--color-text-inverse);
}

.selector-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.selector-title svg {
  opacity: 0.9;
}

.selector-description {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

.selector-body {
  display: grid;
  grid-template-columns: 350px 1fr;
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

/* Requirements Section */
.requirements-section {
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

.input-help {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* Temperature Range */
.temp-range {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.temp-input {
  display: flex;
  align-items: center;
  gap: var(--space-2);
}

.temp-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.input-number {
  width: 80px;
  padding: var(--space-2);
  font-size: var(--font-size-sm);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  text-align: center;
}

.temp-unit {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.temp-separator {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

/* Radio Group */
.radio-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.radio-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.radio-option:hover {
  border-color: var(--color-primary-300);
}

.radio-option--selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.radio-option input {
  display: none;
}

.radio-indicator {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border-default);
  border-radius: 50%;
  position: relative;
}

.radio-option--selected .radio-indicator {
  border-color: var(--color-primary-500);
}

.radio-option--selected .radio-indicator::after {
  content: '';
  position: absolute;
  top: 3px;
  left: 3px;
  width: 8px;
  height: 8px;
  background-color: var(--color-primary-500);
  border-radius: 50%;
}

.radio-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

/* Checkbox Group */
.checkbox-group {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2);
}

.checkbox-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2);
  cursor: pointer;
}

.checkbox-option input {
  display: none;
}

.checkbox-indicator {
  width: 18px;
  height: 18px;
  border: 2px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  position: relative;
  transition: all var(--transition-fast);
}

.checkbox-option input:checked + .checkbox-indicator {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
}

.checkbox-option input:checked + .checkbox-indicator::after {
  content: '';
  position: absolute;
  top: 2px;
  left: 5px;
  width: 4px;
  height: 8px;
  border: solid white;
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.checkbox-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Results Section */
.results-section {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.alloys-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.alloy-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  transition: all var(--transition-fast);
}

.alloy-card--recommended {
  border-color: var(--color-primary-300);
  box-shadow: 0 0 0 1px var(--color-primary-100);
}

.alloy-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.alloy-header:hover {
  background-color: var(--color-surface-hover);
}

.alloy-rank {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.alloy-rank--1 {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.alloy-rank--2 {
  background-color: var(--color-accent-100);
  color: var(--color-accent-700);
}

.alloy-rank--3 {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-600);
}

.alloy-rank--4,
.alloy-rank--5 {
  background-color: var(--color-neutral-50);
  color: var(--color-neutral-500);
}

.alloy-main {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.alloy-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.alloy-composition {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-family: var(--font-family-mono);
}

.alloy-score {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.score-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

.score-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.expand-icon {
  color: var(--color-text-tertiary);
  transition: transform var(--transition-fast);
}

.alloy-card--expanded .expand-icon {
  transform: rotate(180deg);
}

/* Alloy Details */
.alloy-details {
  padding: 0 var(--space-4) var(--space-4);
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-surface-elevated);
}

.details-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
  padding: var(--space-4) 0;
}

.detail-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.detail-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.detail-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

/* Pros/Cons */
.pros-cons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  padding: var(--space-3) 0;
}

.pros-title,
.cons-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.pros-title {
  color: var(--color-success-600);
}

.cons-title {
  color: var(--color-warning-600);
}

.pros-list,
.cons-list {
  margin: 0;
  padding-left: var(--space-4);
}

.pros-list li,
.cons-list li {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

/* Compatibility */
.compatibility-section,
.flux-section {
  padding: var(--space-3) 0;
}

.compatibility-title,
.flux-title {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.compatibility-tags,
.flux-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.compatibility-tag,
.flux-tag {
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Comparison Section */
.comparison-section {
  margin-top: var(--space-4);
}

.comparison-toggle {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  width: 100%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.comparison-toggle:hover {
  background-color: var(--color-surface-hover);
}

.comparison-table-wrapper {
  margin-top: var(--space-3);
  overflow-x: auto;
}

.comparison-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.comparison-table th,
.comparison-table td {
  padding: var(--space-3);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.comparison-table th {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  background-color: var(--color-surface-elevated);
}

.comparison-table td {
  color: var(--color-text-primary);
}

.badge-yes {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-success-100);
  color: var(--color-success-700);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
}

.badge-no {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-600);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
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

.export-btn:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 900px) {
  .selector-body {
    grid-template-columns: 1fr;
  }
  
  .details-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .pros-cons {
    grid-template-columns: 1fr;
  }
  
  .checkbox-group {
    grid-template-columns: 1fr;
  }
}
</style>
