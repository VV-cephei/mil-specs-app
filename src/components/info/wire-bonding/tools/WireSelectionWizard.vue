<template>
  <div class="wire-selection-wizard">
    <div class="wizard-header">
      <h3 class="wizard-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
          <polyline points="22 4 12 14.01 9 11.01"/>
        </svg>
        Wire Selection Wizard
      </h3>
      <p class="wizard-description">
        Answer a few questions to get personalized wire bonding recommendations
      </p>
    </div>

    <!-- Progress Indicator -->
    <div class="progress-indicator" role="progressbar" :aria-valuenow="currentStep" aria-valuemin="1" :aria-valuemax="totalSteps">
      <div class="progress-steps">
        <div 
          v-for="step in totalSteps" 
          :key="step"
          class="progress-step"
          :class="{
            'progress-step--completed': step < currentStep,
            'progress-step--active': step === currentStep,
            'progress-step--upcoming': step > currentStep
          }"
        >
          <div class="step-circle">
            <svg v-if="step < currentStep" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="20 6 9 17 4 12"/>
            </svg>
            <span v-else>{{ step }}</span>
          </div>
          <span class="step-label">{{ stepLabels[step - 1] }}</span>
        </div>
      </div>
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: progressPercent + '%' }"></div>
      </div>
    </div>

    <!-- Wizard Content -->
    <div class="wizard-content">
      <!-- Step 1: Application Type -->
      <div v-if="currentStep === 1" class="wizard-step">
        <h4 class="step-title">What is your application type?</h4>
        <p class="step-description">Select the industry or application category for your device</p>
        
        <div class="option-grid">
          <button
            v-for="app in applicationTypes"
            :key="app.id"
            class="option-card"
            :class="{ 'option-card--selected': answers.applicationType === app.id }"
            @click="selectAnswer('applicationType', app.id)"
          >
            <div class="option-icon" v-html="app.icon"></div>
            <div class="option-content">
              <span class="option-name">{{ app.name }}</span>
              <span class="option-description">{{ app.description }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Step 2: Operating Temperature -->
      <div v-if="currentStep === 2" class="wizard-step">
        <h4 class="step-title">What is the operating temperature range?</h4>
        <p class="step-description">Select the expected temperature environment for your device</p>
        
        <div class="option-list">
          <button
            v-for="temp in temperatureRanges"
            :key="temp.id"
            class="option-row"
            :class="{ 'option-row--selected': answers.temperatureRange === temp.id }"
            @click="selectAnswer('temperatureRange', temp.id)"
          >
            <div class="option-indicator"></div>
            <div class="option-content">
              <span class="option-name">{{ temp.name }}</span>
              <span class="option-range">{{ temp.range }}</span>
            </div>
            <span class="option-tag" v-if="temp.tag">{{ temp.tag }}</span>
          </button>
        </div>
      </div>

      <!-- Step 3: Cost Sensitivity -->
      <div v-if="currentStep === 3" class="wizard-step">
        <h4 class="step-title">What is your cost sensitivity?</h4>
        <p class="step-description">This helps balance performance vs. material costs</p>
        
        <div class="option-list">
          <button
            v-for="cost in costLevels"
            :key="cost.id"
            class="option-row"
            :class="{ 'option-row--selected': answers.costSensitivity === cost.id }"
            @click="selectAnswer('costSensitivity', cost.id)"
          >
            <div class="option-indicator"></div>
            <div class="option-content">
              <span class="option-name">{{ cost.name }}</span>
              <span class="option-description">{{ cost.description }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Step 4: Pad Metallization -->
      <div v-if="currentStep === 4" class="wizard-step">
        <h4 class="step-title">What is your pad metallization?</h4>
        <p class="step-description">Select the bond pad surface material on your die/substrate</p>
        
        <div class="option-grid option-grid--compact">
          <button
            v-for="pad in padMetallizations"
            :key="pad.id"
            class="option-card option-card--compact"
            :class="{ 'option-card--selected': answers.padMetallization === pad.id }"
            @click="selectAnswer('padMetallization', pad.id)"
          >
            <span class="option-symbol">{{ pad.symbol }}</span>
            <span class="option-name">{{ pad.name }}</span>
          </button>
        </div>
      </div>

      <!-- Step 5: Frequency Requirements -->
      <div v-if="currentStep === 5" class="wizard-step">
        <h4 class="step-title">What are your frequency requirements?</h4>
        <p class="step-description">Higher frequencies may require specific wire materials and geometries</p>
        
        <div class="option-list">
          <button
            v-for="freq in frequencyRanges"
            :key="freq.id"
            class="option-row"
            :class="{ 'option-row--selected': answers.frequencyRange === freq.id }"
            @click="selectAnswer('frequencyRange', freq.id)"
          >
            <div class="option-indicator"></div>
            <div class="option-content">
              <span class="option-name">{{ freq.name }}</span>
              <span class="option-description">{{ freq.description }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Results Step -->
      <div v-if="currentStep === 6" class="wizard-step wizard-step--results">
        <div class="results-header">
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
            <polyline points="22 4 12 14.01 9 11.01"/>
          </svg>
          <h4 class="results-title">Your Recommendations</h4>
        </div>

        <div class="recommendation-cards">
          <!-- Primary Recommendation -->
          <div class="recommendation-card recommendation-card--primary">
            <div class="recommendation-badge">Recommended</div>
            <h5 class="recommendation-title">{{ recommendation.wireMaterial }}</h5>
            <p class="recommendation-subtitle">{{ recommendation.bondingMethod }}</p>
            
            <div class="recommendation-specs">
              <div class="spec-item">
                <span class="spec-label">Wire Diameter</span>
                <span class="spec-value">{{ recommendation.wireDiameter }}</span>
              </div>
              <div class="spec-item">
                <span class="spec-label">Bond Type</span>
                <span class="spec-value">{{ recommendation.bondType }}</span>
              </div>
            </div>
          </div>

          <!-- Key Considerations -->
          <div class="recommendation-card">
            <h5 class="recommendation-section-title">Key Considerations</h5>
            <ul class="consideration-list">
              <li v-for="(item, index) in recommendation.considerations" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>

          <!-- Relevant Standards -->
          <div class="recommendation-card">
            <h5 class="recommendation-section-title">Relevant Standards</h5>
            <div class="standards-list">
              <span 
                v-for="(standard, index) in recommendation.standards" 
                :key="index"
                class="standard-tag"
              >
                {{ standard }}
              </span>
            </div>
          </div>
        </div>

        <!-- Selection Summary -->
        <div class="selection-summary">
          <h5 class="summary-title">Your Selections</h5>
          <div class="summary-grid">
            <div class="summary-item">
              <span class="summary-label">Application</span>
              <span class="summary-value">{{ getAnswerLabel('applicationType') }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Temperature</span>
              <span class="summary-value">{{ getAnswerLabel('temperatureRange') }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Cost Priority</span>
              <span class="summary-value">{{ getAnswerLabel('costSensitivity') }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Pad Metal</span>
              <span class="summary-value">{{ getAnswerLabel('padMetallization') }}</span>
            </div>
            <div class="summary-item">
              <span class="summary-label">Frequency</span>
              <span class="summary-value">{{ getAnswerLabel('frequencyRange') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="wizard-navigation">
      <button 
        v-if="currentStep > 1"
        class="nav-button nav-button--secondary"
        @click="previousStep"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>
      
      <button 
        v-if="currentStep === 6"
        class="nav-button nav-button--secondary"
        @click="startOver"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Start Over
      </button>

      <button 
        v-if="currentStep < 6"
        class="nav-button nav-button--primary"
        :disabled="!canProceed"
        @click="nextStep"
      >
        {{ currentStep === 5 ? 'Get Recommendations' : 'Continue' }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'

// State
const currentStep = ref(1)
const totalSteps = 5
const stepLabels = ['Application', 'Temperature', 'Cost', 'Pad Metal', 'Frequency']

const answers = ref({
  applicationType: null,
  temperatureRange: null,
  costSensitivity: null,
  padMetallization: null,
  frequencyRange: null
})

// Options data
const applicationTypes = [
  { 
    id: 'consumer', 
    name: 'Consumer Electronics', 
    description: 'Smartphones, tablets, wearables',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="5" y="2" width="14" height="20" rx="2" ry="2"/><line x1="12" y1="18" x2="12.01" y2="18"/></svg>'
  },
  { 
    id: 'automotive', 
    name: 'Automotive', 
    description: 'AEC-Q100 qualified applications',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M14 16H9m10 0h3v-3.15a1 1 0 0 0-.84-.99L16 11l-2.7-3.6a1 1 0 0 0-.8-.4H5.24a2 2 0 0 0-1.8 1.1l-.8 1.63A6 6 0 0 0 2 12.42V16h2"/><circle cx="6.5" cy="16.5" r="2.5"/><circle cx="16.5" cy="16.5" r="2.5"/></svg>'
  },
  { 
    id: 'medical', 
    name: 'Medical', 
    description: 'Implantables, diagnostics',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 12h-4l-3 9L9 3l-3 9H2"/></svg>'
  },
  { 
    id: 'aerospace', 
    name: 'Aerospace/Defense', 
    description: 'MIL-STD qualified, high reliability',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"/></svg>'
  },
  { 
    id: 'rf', 
    name: 'RF/Microwave', 
    description: 'High frequency applications',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12.55a11 11 0 0 1 14.08 0"/><path d="M1.42 9a16 16 0 0 1 21.16 0"/><path d="M8.53 16.11a6 6 0 0 1 6.95 0"/><line x1="12" y1="20" x2="12.01" y2="20"/></svg>'
  },
  { 
    id: 'power', 
    name: 'Power Electronics', 
    description: 'High current, power modules',
    icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg>'
  }
]

const temperatureRanges = [
  { id: 'commercial', name: 'Commercial', range: '0°C to +70°C', tag: null },
  { id: 'industrial', name: 'Industrial', range: '-40°C to +85°C', tag: null },
  { id: 'automotive', name: 'Automotive', range: '-40°C to +125°C', tag: 'AEC-Q100' },
  { id: 'military', name: 'Military', range: '-55°C to +125°C', tag: 'MIL-STD' },
  { id: 'extended', name: 'Extended', range: '-55°C to +175°C', tag: 'High Temp' }
]

const costLevels = [
  { id: 'low', name: 'Low Cost Priority', description: 'Maximize cost savings, standard reliability acceptable' },
  { id: 'medium', name: 'Balanced', description: 'Balance between cost and performance' },
  { id: 'high', name: 'Performance Priority', description: 'Reliability and performance over cost' }
]

const padMetallizations = [
  { id: 'al', name: 'Aluminum', symbol: 'Al' },
  { id: 'au', name: 'Gold', symbol: 'Au' },
  { id: 'cu', name: 'Copper', symbol: 'Cu' },
  { id: 'ni-au', name: 'Nickel/Gold', symbol: 'Ni/Au' }
]

const frequencyRanges = [
  { id: 'dc', name: 'DC / Low Frequency', description: 'Power, analog, digital logic' },
  { id: 'low-rf', name: 'Sub-1 GHz', description: 'IoT, Bluetooth, basic RF' },
  { id: 'mid-rf', name: '1-10 GHz', description: 'WiFi, cellular, radar' },
  { id: 'high-rf', name: '>10 GHz', description: 'mmWave, satellite, 5G' }
]

// Computed
const progressPercent = computed(() => {
  return ((currentStep.value - 1) / totalSteps) * 100
})

const canProceed = computed(() => {
  const stepAnswers = {
    1: answers.value.applicationType,
    2: answers.value.temperatureRange,
    3: answers.value.costSensitivity,
    4: answers.value.padMetallization,
    5: answers.value.frequencyRange
  }
  return stepAnswers[currentStep.value] !== null
})

const recommendation = computed(() => {
  // Decision logic based on answers
  const { applicationType, temperatureRange, costSensitivity, padMetallization, frequencyRange } = answers.value
  
  let wireMaterial = 'Gold (Au)'
  let bondingMethod = 'Thermosonic Ball Bonding'
  let wireDiameter = '25 µm (1.0 mil)'
  let bondType = 'Ball-Stitch'
  let considerations = []
  let standards = ['MIL-STD-883']

  // Material selection logic
  if (costSensitivity === 'low' && applicationType !== 'aerospace' && applicationType !== 'medical') {
    wireMaterial = 'Copper (Cu)'
    considerations.push('Copper requires forming gas (95% N₂ / 5% H₂) during bonding')
    considerations.push('Higher ultrasonic power needed - monitor for cratering')
  } else if (costSensitivity === 'medium' && applicationType !== 'aerospace') {
    wireMaterial = 'Palladium-Coated Copper (Pd-Cu)'
    considerations.push('Pd coating prevents oxidation, wider process window than bare Cu')
  }

  // Pad metallization considerations
  if (padMetallization === 'al' && wireMaterial.includes('Gold')) {
    considerations.push('Au-Al intermetallic formation - avoid prolonged high temperatures')
  }
  if (padMetallization === 'cu') {
    considerations.push('Copper pad requires careful surface preparation to prevent oxidation')
  }

  // Temperature considerations
  if (temperatureRange === 'extended' || temperatureRange === 'military') {
    wireMaterial = 'Gold (Au)'
    considerations.push('Gold recommended for extreme temperature reliability')
    standards.push('MIL-PRF-38535')
  }

  // Application-specific
  if (applicationType === 'automotive') {
    standards = ['AEC-Q100', 'JEDEC JESD22-B116']
    considerations.push('100% SPC monitoring required for automotive qualification')
  }
  if (applicationType === 'aerospace') {
    wireMaterial = 'Gold (Au)'
    standards = ['MIL-STD-883', 'MIL-PRF-38535', 'NASA-STD-8739.3']
    considerations.push('Hermetic package recommended for space applications')
  }
  if (applicationType === 'medical') {
    considerations.push('Biocompatibility requirements may apply for implantables')
    standards.push('ISO 13485')
  }

  // RF considerations
  if (frequencyRange === 'high-rf') {
    bondingMethod = 'Ultrasonic Wedge Bonding'
    bondType = 'Wedge-Wedge'
    wireDiameter = '18-25 µm'
    considerations.push('Ribbon wire may be preferred for lowest inductance at mmWave')
    considerations.push('Minimize loop height for reduced parasitic inductance')
  } else if (frequencyRange === 'mid-rf') {
    considerations.push('Consider low-loop profile to minimize inductance')
  }

  // Power applications
  if (applicationType === 'power') {
    wireMaterial = 'Aluminum (Al)'
    bondingMethod = 'Ultrasonic Wedge Bonding'
    bondType = 'Wedge-Wedge'
    wireDiameter = '125-500 µm (heavy wire)'
    considerations.push('Heavy aluminum wire for high current capacity')
    considerations.push('Multiple parallel wires may be needed for current sharing')
  }

  return {
    wireMaterial,
    bondingMethod,
    wireDiameter,
    bondType,
    considerations,
    standards
  }
})

// Methods
function selectAnswer(field, value) {
  answers.value[field] = value
}

function nextStep() {
  if (canProceed.value && currentStep.value <= totalSteps) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function startOver() {
  currentStep.value = 1
  answers.value = {
    applicationType: null,
    temperatureRange: null,
    costSensitivity: null,
    padMetallization: null,
    frequencyRange: null
  }
}

function getAnswerLabel(field) {
  const value = answers.value[field]
  if (!value) return '—'
  
  const lookups = {
    applicationType: applicationTypes,
    temperatureRange: temperatureRanges,
    costSensitivity: costLevels,
    padMetallization: padMetallizations,
    frequencyRange: frequencyRanges
  }
  
  const item = lookups[field]?.find(i => i.id === value)
  return item?.name || value
}
</script>

<style scoped>
.wire-selection-wizard {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.wizard-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-accent-600), var(--color-accent-700));
  color: var(--color-text-inverse);
}

.wizard-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.wizard-title svg {
  opacity: 0.9;
}

.wizard-description {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

/* Progress Indicator */
.progress-indicator {
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-elevated);
  border-bottom: 1px solid var(--color-border-light);
}

.progress-steps {
  display: flex;
  justify-content: space-between;
  margin-bottom: var(--space-3);
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  flex: 1;
}

.step-circle {
  width: 28px;
  height: 28px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.progress-step--completed .step-circle {
  background-color: var(--color-success-500);
  color: white;
}

.progress-step--active .step-circle {
  background-color: var(--color-primary-500);
  color: white;
  box-shadow: 0 0 0 4px var(--color-primary-100);
}

.progress-step--upcoming .step-circle {
  background-color: var(--color-surface);
  border: 2px solid var(--color-border-default);
  color: var(--color-text-tertiary);
}

.step-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-align: center;
}

.progress-step--active .step-label {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-medium);
}

.progress-bar {
  height: 4px;
  background-color: var(--color-border-light);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.progress-fill {
  height: 100%;
  background-color: var(--color-primary-500);
  transition: width var(--transition-normal);
}

/* Wizard Content */
.wizard-content {
  padding: var(--space-6);
  min-height: 320px;
}

.wizard-step {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.step-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-5) 0;
}

/* Option Grid */
.option-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.option-grid--compact {
  grid-template-columns: repeat(4, 1fr);
}

.option-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.option-card:hover {
  border-color: var(--color-primary-300);
  background-color: var(--color-primary-50);
}

.option-card--selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.option-card--compact {
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: var(--space-4) var(--space-3);
}

.option-icon {
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  color: var(--color-primary-600);
}

.option-card--selected .option-icon {
  background-color: var(--color-primary-100);
}

.option-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.option-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.option-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.option-symbol {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

/* Option List */
.option-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.option-row {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
  width: 100%;
}

.option-row:hover {
  border-color: var(--color-primary-300);
}

.option-row--selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.option-indicator {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  border: 2px solid var(--color-border-default);
  flex-shrink: 0;
  transition: all var(--transition-fast);
}

.option-row--selected .option-indicator {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-500);
  box-shadow: inset 0 0 0 4px white;
}

.option-range {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-family: var(--font-family-mono);
}

.option-tag {
  margin-left: auto;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-accent-100);
  color: var(--color-accent-700);
  border-radius: var(--radius-full);
}

/* Results */
.wizard-step--results {
  padding-top: 0;
}

.results-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-5);
  color: var(--color-success-600);
}

.results-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.recommendation-cards {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-5);
}

.recommendation-card {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.recommendation-card--primary {
  grid-column: 1 / -1;
  background: linear-gradient(135deg, var(--color-primary-600), var(--color-primary-700));
  color: white;
  border: none;
}

.recommendation-badge {
  display: inline-block;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-1) var(--space-2);
  background-color: rgba(255, 255, 255, 0.2);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-2);
}

.recommendation-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  margin: 0 0 var(--space-1) 0;
}

.recommendation-subtitle {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0 0 var(--space-4) 0;
}

.recommendation-specs {
  display: flex;
  gap: var(--space-6);
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.spec-label {
  font-size: var(--font-size-xs);
  opacity: 0.8;
}

.spec-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.recommendation-section-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.consideration-list {
  margin: 0;
  padding-left: var(--space-4);
}

.consideration-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-relaxed);
}

.standards-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.standard-tag {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

/* Selection Summary */
.selection-summary {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.summary-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-3) 0;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-3);
}

.summary-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.summary-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.summary-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

/* Navigation */
.wizard-navigation {
  display: flex;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border-light);
}

.nav-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.nav-button--primary {
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  margin-left: auto;
}

.nav-button--primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.nav-button--primary:disabled {
  background-color: var(--color-neutral-300);
  cursor: not-allowed;
}

.nav-button--secondary {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-default);
}

.nav-button--secondary:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .option-grid {
    grid-template-columns: 1fr;
  }
  
  .option-grid--compact {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .recommendation-cards {
    grid-template-columns: 1fr;
  }
  
  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .progress-steps {
    display: none;
  }
}
</style>
