<template>
  <section id="process-optimization" class="wb-section wb-section--alt">
    <div class="section-header">
      <h2 class="section-title">Process Optimization & Control</h2>
      <p class="section-description">
        Optimizing wire bonding parameters and implementing statistical process control 
        ensures consistent, high-quality bonds and minimizes defects.
      </p>
    </div>
    
    <TabContainer
      v-if="data"
      :tabs="optimizationTabs"
      v-model="activeTab"
      variant="pills"
      aria-label="Process optimization topics"
    >
      <!-- Parameters Tab -->
      <template #parameters>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.processParameters?.title }}</h3>
          <p class="content-description">{{ data.processParameters?.description }}</p>
          
          <!-- Primary Parameters -->
          <div class="parameters-section">
            <h4 class="subsection-title">Primary Parameters</h4>
            <div class="parameters-grid">
              <div 
                v-for="param in data.processParameters?.primaryParameters" 
                :key="param.parameter"
                class="parameter-card"
              >
                <div class="parameter-header">
                  <span class="parameter-symbol">{{ param.symbol }}</span>
                  <div class="parameter-info">
                    <h5 class="parameter-name">{{ param.parameter }}</h5>
                    <span class="parameter-unit">{{ param.unit }}</span>
                  </div>
                </div>
                
                <p class="parameter-description">{{ param.description }}</p>
                
                <div class="parameter-effects">
                  <div class="effect-item effect-item--low">
                    <span class="effect-label">Too Low:</span>
                    <span class="effect-value">{{ param.effect?.tooLow }}</span>
                  </div>
                  <div class="effect-item effect-item--high">
                    <span class="effect-label">Too High:</span>
                    <span class="effect-value">{{ param.effect?.tooHigh }}</span>
                  </div>
                </div>
                
                <div v-if="param.typicalRanges" class="typical-ranges">
                  <h6>Typical Ranges</h6>
                  <div class="ranges-list">
                    <template v-if="param.typicalRanges.ballBond">
                      <div class="range-group">
                        <span class="range-type">Ball Bond</span>
                        <div class="range-values">
                          <span v-if="param.typicalRanges.ballBond.finePitch">Fine: {{ param.typicalRanges.ballBond.finePitch }}</span>
                          <span v-if="param.typicalRanges.ballBond.standard">Std: {{ param.typicalRanges.ballBond.standard }}</span>
                          <span v-if="param.typicalRanges.ballBond.power">Power: {{ param.typicalRanges.ballBond.power }}</span>
                        </div>
                      </div>
                    </template>
                    <template v-if="param.typicalRanges.goldWire">
                      <div class="range-item">
                        <span class="range-label">Gold:</span>
                        <span class="range-value">{{ param.typicalRanges.goldWire }}</span>
                      </div>
                      <div class="range-item">
                        <span class="range-label">Copper:</span>
                        <span class="range-value">{{ param.typicalRanges.copperWire }}</span>
                      </div>
                      <div class="range-item">
                        <span class="range-label">Aluminum:</span>
                        <span class="range-value">{{ param.typicalRanges.aluminumWire }}</span>
                      </div>
                    </template>
                    <template v-if="param.typicalRanges.thermosonic">
                      <div class="range-group">
                        <span class="range-type">Thermosonic</span>
                        <div class="range-values">
                          <span>Au: {{ param.typicalRanges.thermosonic.gold }}</span>
                          <span>Cu: {{ param.typicalRanges.thermosonic.copper }}</span>
                        </div>
                      </div>
                    </template>
                  </div>
                </div>
                
                <div v-if="param.frequency" class="frequency-info">
                  <span class="freq-label">Standard:</span>
                  <span class="freq-value">{{ param.frequency.standard }}</span>
                  <span class="freq-label">High Freq:</span>
                  <span class="freq-value">{{ param.frequency.highFrequency }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Secondary Parameters -->
          <div class="parameters-section">
            <h4 class="subsection-title">Secondary Parameters</h4>
            <div class="secondary-params-grid">
              <div 
                v-for="param in data.processParameters?.secondaryParameters" 
                :key="param.parameter"
                class="secondary-param-card"
              >
                <h5 class="secondary-param-name">{{ param.parameter }}</h5>
                <p class="secondary-param-desc">{{ param.description }}</p>
                <span v-if="param.typical" class="secondary-param-typical">Typical: {{ param.typical }}</span>
                <span v-if="param.effect" class="secondary-param-effect">{{ param.effect }}</span>
              </div>
            </div>
          </div>
          
          <!-- Parameter Windows by Material -->
          <div class="material-windows-section">
            <h4 class="subsection-title">Parameter Windows by Material</h4>
            <div class="material-selector">
              <button 
                v-for="material in materialOptions" 
                :key="material.key"
                class="material-btn"
                :class="{ 'material-btn--active': selectedMaterial === material.key }"
                @click="selectedMaterial = material.key"
              >
                {{ material.label }}
              </button>
            </div>
            
            <div v-if="selectedMaterialData" class="material-window-content">
              <div class="material-window-header">
                <h5>{{ selectedMaterialData.material }}</h5>
                <span class="wire-diameter">{{ selectedMaterialData.wireDiameter }}</span>
                <span class="process-window" :class="getProcessWindowClass(selectedMaterialData.processWindow)">
                  {{ selectedMaterialData.processWindow }}
                </span>
              </div>
              
              <div class="parameters-table">
                <ComparisonTable
                  :columns="parameterWindowColumns"
                  :rows="parameterWindowRows"
                  :striped="true"
                  :hoverable="true"
                />
              </div>
              
              <div v-if="selectedMaterialData.specialRequirements" class="special-requirements">
                <h6>Special Requirements</h6>
                <ul>
                  <li v-for="(req, i) in selectedMaterialData.specialRequirements" :key="i">{{ req }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- DOE Tab -->
      <template #doe>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.doeApproach?.title }}</h3>
          <p class="content-description">{{ data.doeApproach?.description }}</p>
          
          <div class="doe-methodology">
            <div class="doe-phase">
              <div class="phase-header">
                <span class="phase-number">1</span>
                <h4 class="phase-title">Screening</h4>
              </div>
              <div class="phase-content">
                <p><strong>Purpose:</strong> {{ data.doeApproach?.methodology?.screening?.purpose }}</p>
                <p><strong>Design:</strong> {{ data.doeApproach?.methodology?.screening?.design }}</p>
                <div class="phase-lists">
                  <div class="phase-list">
                    <h5>Factors</h5>
                    <ul>
                      <li v-for="(factor, i) in data.doeApproach?.methodology?.screening?.factors" :key="i">{{ factor }}</li>
                    </ul>
                  </div>
                  <div class="phase-list">
                    <h5>Responses</h5>
                    <ul>
                      <li v-for="(response, i) in data.doeApproach?.methodology?.screening?.responses" :key="i">{{ response }}</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="doe-phase">
              <div class="phase-header">
                <span class="phase-number">2</span>
                <h4 class="phase-title">Optimization</h4>
              </div>
              <div class="phase-content">
                <p><strong>Purpose:</strong> {{ data.doeApproach?.methodology?.optimization?.purpose }}</p>
                <p><strong>Design:</strong> {{ data.doeApproach?.methodology?.optimization?.design }}</p>
                <p><strong>Goal:</strong> {{ data.doeApproach?.methodology?.optimization?.goal }}</p>
              </div>
            </div>
            
            <div class="doe-phase">
              <div class="phase-header">
                <span class="phase-number">3</span>
                <h4 class="phase-title">Confirmation</h4>
              </div>
              <div class="phase-content">
                <p><strong>Purpose:</strong> {{ data.doeApproach?.methodology?.confirmation?.purpose }}</p>
                <p><strong>Method:</strong> {{ data.doeApproach?.methodology?.confirmation?.method }}</p>
                <p><strong>Criteria:</strong> {{ data.doeApproach?.methodology?.confirmation?.criteria }}</p>
              </div>
            </div>
          </div>
          
          <div class="doe-factors">
            <h4 class="subsection-title">Typical DOE Factors</h4>
            <div class="factors-grid">
              <div 
                v-for="factor in data.doeApproach?.typicalDOEFactors" 
                :key="factor.factor"
                class="factor-card"
              >
                <h5 class="factor-name">{{ factor.factor }}</h5>
                <div class="factor-details">
                  <span class="factor-levels">{{ factor.levels }} Levels</span>
                  <span class="factor-range">{{ factor.range }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="sample-sizes">
            <h4 class="subsection-title">Sample Size Guidelines</h4>
            <div class="sample-grid">
              <div class="sample-card">
                <h5>Screening</h5>
                <p>{{ data.doeApproach?.sampleSize?.screening }}</p>
              </div>
              <div class="sample-card">
                <h5>Optimization</h5>
                <p>{{ data.doeApproach?.sampleSize?.optimization }}</p>
              </div>
              <div class="sample-card">
                <h5>Confirmation</h5>
                <p>{{ data.doeApproach?.sampleSize?.confirmation }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- SPC Tab -->
      <template #spc>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.spcMetrics?.title }}</h3>
          <p class="content-description">{{ data.spcMetrics?.description }}</p>
          
          <div class="control-charts">
            <h4 class="subsection-title">Control Charts</h4>
            <div class="charts-grid">
              <div 
                v-for="chart in data.spcMetrics?.controlCharts" 
                :key="chart.chart"
                class="chart-card"
              >
                <h5 class="chart-name">{{ chart.chart }}</h5>
                <p class="chart-application"><strong>Application:</strong> {{ chart.application }}</p>
                <p v-if="chart.subgroupSize" class="chart-subgroup"><strong>Subgroup:</strong> {{ chart.subgroupSize }}</p>
                <p class="chart-frequency"><strong>Frequency:</strong> {{ chart.frequency }}</p>
              </div>
            </div>
          </div>
          
          <div class="key-metrics">
            <h4 class="subsection-title">Key Metrics</h4>
            <div class="metrics-table">
              <ComparisonTable
                :columns="metricsColumns"
                :rows="metricsRows"
                :striped="true"
                :hoverable="true"
              />
            </div>
          </div>
          
          <div class="ooc-rules">
            <h4 class="subsection-title">Out-of-Control Rules</h4>
            <div class="rules-list">
              <div 
                v-for="(rule, i) in data.spcMetrics?.outOfControlRules" 
                :key="i"
                class="rule-item"
              >
                <span class="rule-number">{{ i + 1 }}</span>
                <span class="rule-text">{{ rule }}</span>
              </div>
            </div>
          </div>
          
          <!-- Cpk Requirements -->
          <div class="cpk-section">
            <h4 class="subsection-title">{{ data.cpkRequirements?.title }}</h4>
            <p class="cpk-definition">{{ data.cpkRequirements?.definition }}</p>
            <p class="cpk-formula"><strong>Formula:</strong> <code>{{ data.cpkRequirements?.formula }}</code></p>
            
            <div class="cpk-requirements-grid">
              <div 
                v-for="(req, industry) in data.cpkRequirements?.requirements" 
                :key="industry"
                class="cpk-card"
              >
                <h5 class="cpk-industry">{{ formatIndustryName(industry) }}</h5>
                <div class="cpk-values">
                  <div class="cpk-value">
                    <span class="cpk-label">Minimum:</span>
                    <span class="cpk-number">{{ req.minimum }}</span>
                  </div>
                  <div class="cpk-value">
                    <span class="cpk-label">Target:</span>
                    <span class="cpk-number cpk-number--target">{{ req.target }}</span>
                  </div>
                  <div class="cpk-value">
                    <span class="cpk-label">Defect Rate:</span>
                    <span class="cpk-rate">{{ req.defectRate }}</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div class="cpk-interpretation">
              <h5>Interpretation</h5>
              <div class="interpretation-grid">
                <div class="interp-item interp-item--bad">
                  <span class="interp-range">Cpk &lt; 1.0</span>
                  <span class="interp-text">{{ data.cpkRequirements?.interpretation?.cpkLessThan1 }}</span>
                </div>
                <div class="interp-item interp-item--marginal">
                  <span class="interp-range">1.0 - 1.33</span>
                  <span class="interp-text">{{ data.cpkRequirements?.interpretation?.cpk1to1_33 }}</span>
                </div>
                <div class="interp-item interp-item--good">
                  <span class="interp-range">1.33 - 1.67</span>
                  <span class="interp-text">{{ data.cpkRequirements?.interpretation?.cpk1_33to1_67 }}</span>
                </div>
                <div class="interp-item interp-item--excellent">
                  <span class="interp-range">Cpk &gt; 1.67</span>
                  <span class="interp-text">{{ data.cpkRequirements?.interpretation?.cpkGreaterThan1_67 }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Troubleshooting Tab -->
      <template #troubleshooting>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.troubleshootingGuide?.title }}</h3>
          
          <div class="troubleshooting-list">
            <AccordionPanel
              v-for="issue in data.troubleshootingGuide?.issues"
              :key="issue.problem"
              :title="issue.problem"
              :subtitle="`${issue.symptoms?.length || 0} symptoms, ${issue.solutions?.length || 0} solutions`"
              variant="bordered"
            >
              <div class="issue-content">
                <div class="issue-symptoms">
                  <h5>Symptoms</h5>
                  <ul>
                    <li v-for="(symptom, i) in issue.symptoms" :key="i">{{ symptom }}</li>
                  </ul>
                </div>
                
                <div class="issue-causes">
                  <h5>Possible Causes</h5>
                  <ul>
                    <li v-for="(cause, i) in issue.possibleCauses" :key="i">{{ cause }}</li>
                  </ul>
                </div>
                
                <div class="issue-solutions">
                  <h5>Solutions</h5>
                  <ol>
                    <li v-for="(solution, i) in issue.solutions" :key="i">{{ solution }}</li>
                  </ol>
                </div>
              </div>
            </AccordionPanel>
          </div>
          
          <!-- Process Image -->
          <div class="process-image-section">
            <ImageViewer
              :src="data.images?.pullStrengthDeformation"
              alt="Pull strength vs wire deformation relationship"
              caption="Relationship between pull strength and wire deformation during bonding"
              :zoomable="true"
            />
          </div>
        </div>
      </template>
    </TabContainer>
    
    <div v-else class="loading-placeholder">
      <p>Loading process optimization data...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabContainer from '@/components/shared/TabContainer.vue'
import ComparisonTable from '@/components/shared/ComparisonTable.vue'
import AccordionPanel from '@/components/shared/AccordionPanel.vue'
import ImageViewer from '@/components/shared/ImageViewer.vue'

const props = defineProps({
  processOptimization: {
    type: Object,
    default: () => null
  },
  glossary: {
    type: Array,
    default: () => []
  }
})

// Alias for easier access
const data = computed(() => props.processOptimization)

const activeTab = ref('parameters')
const selectedMaterial = ref('goldWire')

const optimizationTabs = [
  { id: 'parameters', label: 'Parameters' },
  { id: 'doe', label: 'DOE Methodology' },
  { id: 'spc', label: 'SPC Metrics' },
  { id: 'troubleshooting', label: 'Troubleshooting' }
]

const materialOptions = [
  { key: 'goldWire', label: 'Gold Wire' },
  { key: 'copperWire', label: 'Copper Wire' },
  { key: 'palladiumCoatedCopper', label: 'Pd-Coated Cu' },
  { key: 'aluminumWire', label: 'Aluminum Wire' },
  { key: 'heavyAluminumWire', label: 'Heavy Al Wire' }
]

const selectedMaterialData = computed(() => {
  if (!data.value?.parameterWindowsByMaterial) return null
  return data.value.parameterWindowsByMaterial[selectedMaterial.value]
})

const parameterWindowColumns = [
  { key: 'parameter', label: 'Parameter' },
  { key: 'min', label: 'Min' },
  { key: 'nominal', label: 'Nominal' },
  { key: 'max', label: 'Max' },
  { key: 'unit', label: 'Unit' }
]

const parameterWindowRows = computed(() => {
  if (!selectedMaterialData.value?.parameters) return []
  const params = selectedMaterialData.value.parameters
  return Object.entries(params).map(([key, value]) => ({
    parameter: formatParameterName(key),
    min: value.min,
    nominal: value.nominal,
    max: value.max,
    unit: value.unit
  }))
})

const metricsColumns = [
  { key: 'metric', label: 'Metric' },
  { key: 'target', label: 'Target' },
  { key: 'controlLimits', label: 'Control Limits' },
  { key: 'specLimits', label: 'Spec Limits' }
]

const metricsRows = computed(() => {
  if (!data.value?.spcMetrics?.keyMetrics) return []
  return data.value.spcMetrics.keyMetrics.map(m => ({
    metric: m.metric,
    target: m.target,
    controlLimits: m.controlLimits || m.controlLimit,
    specLimits: m.specLimits || m.action || '-'
  }))
})

function formatParameterName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function formatIndustryName(key) {
  const names = {
    commercial: 'Commercial',
    industrial: 'Industrial',
    automotive: 'Automotive',
    aerospace: 'Aerospace',
    medical: 'Medical'
  }
  return names[key] || key
}

function getProcessWindowClass(window) {
  if (!window) return ''
  const lower = window.toLowerCase()
  if (lower.includes('wide')) return 'process-window--wide'
  if (lower.includes('narrow')) return 'process-window--narrow'
  if (lower.includes('moderate')) return 'process-window--moderate'
  return ''
}
</script>

<style scoped>
.wb-section {
  padding: var(--space-12) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
}

.wb-section--alt {
  background-color: var(--color-surface-elevated);
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-title {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.section-description {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  max-width: 700px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.tab-content-section {
  padding: var(--space-4) 0;
}

.content-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.content-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
  line-height: var(--line-height-relaxed);
}

.subsection-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

/* Parameters Section */
.parameters-section {
  margin-bottom: var(--space-8);
}

.parameters-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.parameter-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.parameter-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

.parameter-symbol {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-default);
}

.parameter-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.parameter-unit {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.parameter-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
  line-height: var(--line-height-relaxed);
}

.parameter-effects {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.effect-item {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  border-radius: var(--radius-default);
}

.effect-item--low {
  background-color: var(--color-accent-50);
}

.effect-item--high {
  background-color: var(--color-warning-50);
}

.effect-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  min-width: 70px;
}

.effect-value {
  color: var(--color-text-primary);
}

.typical-ranges {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  margin-bottom: var(--space-3);
}

.typical-ranges h6 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.ranges-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.range-group {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.range-type {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.range-values {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.range-values span {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

.range-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.range-label {
  color: var(--color-text-secondary);
}

.range-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.frequency-info {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  padding: var(--space-2);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-default);
}

.freq-label {
  color: var(--color-primary-600);
}

.freq-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-700);
}

/* Secondary Parameters */
.secondary-params-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.secondary-param-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  padding: var(--space-3);
}

.secondary-param-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.secondary-param-desc {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.secondary-param-typical,
.secondary-param-effect {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* Material Windows */
.material-windows-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.material-selector {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.material-btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.material-btn:hover {
  background-color: var(--color-surface-hover);
}

.material-btn--active {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-color: var(--color-primary-500);
}

.material-window-content {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.material-window-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

.material-window-header h5 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.wire-diameter {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.process-window {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  margin-left: auto;
}

.process-window--wide {
  background-color: var(--color-success-100);
  color: var(--color-success-700);
}

.process-window--narrow {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}

.process-window--moderate {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.parameters-table {
  margin-bottom: var(--space-4);
}

.special-requirements {
  padding: var(--space-3);
  background-color: var(--color-accent-50);
  border-radius: var(--radius-default);
}

.special-requirements h6 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-700);
  margin-bottom: var(--space-2);
}

.special-requirements ul {
  padding-left: var(--space-4);
  margin: 0;
}

.special-requirements li {
  font-size: var(--font-size-sm);
  color: var(--color-accent-800);
  margin-bottom: var(--space-1);
}

/* DOE Section */
.doe-methodology {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.doe-phase {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.phase-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface-elevated);
}

.phase-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-inverse);
  background-color: var(--color-primary-500);
  border-radius: var(--radius-full);
}

.phase-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.phase-content {
  padding: var(--space-4);
}

.phase-content p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.phase-lists {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-top: var(--space-3);
}

.phase-list h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.phase-list ul {
  padding-left: var(--space-4);
  margin: 0;
}

.phase-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.doe-factors {
  margin-bottom: var(--space-8);
}

.factors-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.factor-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  padding: var(--space-3);
  text-align: center;
}

.factor-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.factor-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.factor-levels {
  font-size: var(--font-size-xs);
  color: var(--color-primary-600);
  font-weight: var(--font-weight-medium);
}

.factor-range {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.sample-sizes {
  margin-bottom: var(--space-8);
}

.sample-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.sample-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  padding: var(--space-4);
}

.sample-card h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-2);
}

.sample-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* SPC Section */
.control-charts {
  margin-bottom: var(--space-8);
}

.charts-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.chart-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.chart-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.chart-application,
.chart-subgroup,
.chart-frequency {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.key-metrics {
  margin-bottom: var(--space-8);
}

.metrics-table {
  overflow-x: auto;
}

.ooc-rules {
  margin-bottom: var(--space-8);
}

.rules-list {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.rule-item {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
}

.rule-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.rule-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Cpk Section */
.cpk-section {
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.cpk-definition {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.cpk-formula {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-6);
}

.cpk-formula code {
  font-family: var(--font-family-mono);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.cpk-requirements-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: var(--space-3);
  margin-bottom: var(--space-6);
}

.cpk-card {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  padding: var(--space-3);
  text-align: center;
}

.cpk-industry {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.cpk-values {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.cpk-value {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
}

.cpk-label {
  color: var(--color-text-tertiary);
}

.cpk-number {
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.cpk-number--target {
  color: var(--color-primary-600);
}

.cpk-rate {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.cpk-interpretation h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.interpretation-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-3);
}

.interp-item {
  padding: var(--space-3);
  border-radius: var(--radius-default);
  text-align: center;
}

.interp-item--bad {
  background-color: var(--color-error-50);
}

.interp-item--marginal {
  background-color: var(--color-warning-50);
}

.interp-item--good {
  background-color: var(--color-accent-50);
}

.interp-item--excellent {
  background-color: var(--color-success-50);
}

.interp-range {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-1);
}

.interp-text {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Troubleshooting */
.troubleshooting-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-8);
}

.issue-content {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-4);
}

.issue-symptoms,
.issue-causes,
.issue-solutions {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.issue-symptoms h5,
.issue-causes h5,
.issue-solutions h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.issue-symptoms ul,
.issue-causes ul,
.issue-solutions ol {
  padding-left: var(--space-4);
  margin: 0;
}

.issue-symptoms li,
.issue-causes li,
.issue-solutions li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.issue-symptoms {
  border-left: 3px solid var(--color-warning-500);
}

.issue-causes {
  border-left: 3px solid var(--color-error-500);
}

.issue-solutions {
  border-left: 3px solid var(--color-success-500);
}

.process-image-section {
  max-width: 600px;
  margin: 0 auto;
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .parameters-grid {
    grid-template-columns: 1fr;
  }
  
  .secondary-params-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .factors-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .charts-grid {
    grid-template-columns: 1fr;
  }
  
  .cpk-requirements-grid {
    grid-template-columns: repeat(3, 1fr);
  }
  
  .interpretation-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .issue-content {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .secondary-params-grid {
    grid-template-columns: 1fr;
  }
  
  .phase-lists {
    grid-template-columns: 1fr;
  }
  
  .factors-grid {
    grid-template-columns: 1fr;
  }
  
  .sample-grid {
    grid-template-columns: 1fr;
  }
  
  .rules-list {
    grid-template-columns: 1fr;
  }
  
  .cpk-requirements-grid {
    grid-template-columns: 1fr;
  }
  
  .interpretation-grid {
    grid-template-columns: 1fr;
  }
}
</style>
