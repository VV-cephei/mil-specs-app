<template>
  <section id="quality-testing" class="wb-section wb-section--alt">
    <div class="section-header">
      <h2 class="section-title">Quality Testing Deep Dive</h2>
      <p class="section-description">
        Comprehensive testing methods ensure wire bond reliability. Understanding these tests 
        is essential for qualification and production monitoring.
      </p>
    </div>
    
    <TabContainer
      v-if="data"
      :tabs="testTabs"
      v-model="activeTab"
      variant="underline"
      aria-label="Quality testing methods"
    >
      <!-- Pull Test Tab -->
      <template #pull-test>
        <div class="tab-content-section">
          <div class="test-header">
            <h3 class="test-title">{{ data.milStd883Method2011?.title }}</h3>
            <p class="test-description">{{ data.milStd883Method2011?.description }}</p>
          </div>
          
          <div class="test-content-grid">
            <div class="test-images">
              <ImageViewer
                :src="data.milStd883Method2011?.images?.hookPlacement"
                alt="Pull test hook placement location"
                caption="Bond pull hook placement at loop apex"
                :zoomable="true"
              />
              <ImageViewer
                :src="data.milStd883Method2011?.images?.flatLoopTesting"
                alt="Flat loop wire pull testing"
                caption="Flat loop wire pull testing configuration"
                :zoomable="true"
              />
            </div>
            
            <div class="test-details">
              <!-- Hook Placement -->
              <div class="detail-card">
                <h4 class="detail-title">Hook Placement Requirements</h4>
                <div class="detail-content">
                  <p><strong>Requirement:</strong> {{ data.milStd883Method2011?.hookPlacement?.requirement }}</p>
                  <p class="warning-text">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    {{ data.milStd883Method2011?.hookPlacement?.warning }}
                  </p>
                  <p><strong>Tolerance:</strong> {{ data.milStd883Method2011?.hookPlacement?.tolerance }}</p>
                </div>
              </div>
              
              <!-- Failure Codes -->
              <div class="failure-codes">
                <h4 class="detail-title">Failure Codes</h4>
                <AccordionPanel
                  v-for="code in data.milStd883Method2011?.failureCodes"
                  :key="code.code"
                  :title="`Code ${code.code}: ${code.name}`"
                  :subtitle="code.assessment"
                  variant="bordered"
                >
                  <div class="failure-code-content">
                    <p class="failure-description">{{ code.description }}</p>
                    <div class="failure-assessment" :class="getAssessmentClass(code.assessment)">
                      <span class="assessment-label">Assessment:</span>
                      <span class="assessment-value">{{ code.assessment }}</span>
                    </div>
                    <p class="failure-indication"><strong>Indication:</strong> {{ code.indication }}</p>
                  </div>
                </AccordionPanel>
              </div>
            </div>
          </div>
          
          <!-- Failure Locations Image -->
          <div class="failure-locations">
            <h4 class="detail-title">Wire Bond Failure Locations</h4>
            <div class="failure-locations-content">
              <ImageViewer
                :src="data.failureLocations?.image"
                alt="Wire bond failure locations and descriptions"
                caption="Wire bond failure locations and their descriptions"
                :zoomable="true"
              />
              <div class="failure-locations-list">
                <div 
                  v-for="loc in data.failureLocations?.locations" 
                  :key="loc.location"
                  class="failure-location-item"
                  :class="getSeverityClass(loc.severity)"
                >
                  <div class="location-header">
                    <span class="location-name">{{ loc.location }}</span>
                    <span class="severity-badge">{{ loc.severity }}</span>
                  </div>
                  <p class="failure-type">{{ loc.failureType }}</p>
                  <div class="causes-list">
                    <span class="causes-label">Causes:</span>
                    <span v-for="(cause, i) in loc.causes" :key="i" class="cause-tag">{{ cause }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Minimum Pull Forces Table -->
          <div class="pull-forces-section">
            <h4 class="detail-title">Minimum Pull Force Requirements</h4>
            <div class="material-tabs">
              <button 
                v-for="material in ['goldWire', 'copperWire', 'aluminumWire']" 
                :key="material"
                class="material-tab"
                :class="{ 'material-tab--active': activeMaterial === material }"
                @click="activeMaterial = material"
              >
                {{ formatMaterialName(material) }}
              </button>
            </div>
            <ComparisonTable
              :columns="pullForceColumns"
              :rows="pullForceRows"
              :striped="true"
              :hoverable="true"
            />
          </div>
        </div>
      </template>
      
      <!-- Shear Test Tab -->
      <template #shear-test>
        <div class="tab-content-section">
          <div class="test-header">
            <h3 class="test-title">{{ data.milStd883Method2023?.title }}</h3>
            <p class="test-description">{{ data.milStd883Method2023?.description }}</p>
            <p class="test-purpose"><strong>Purpose:</strong> {{ data.milStd883Method2023?.purpose }}</p>
          </div>
          
          <div class="test-content-grid">
            <div class="test-images">
              <ImageViewer
                :src="data.milStd883Method2023?.image"
                alt="Ball shear test cross-section"
                caption="Ball shear test cross-section showing chisel position"
                :zoomable="true"
              />
            </div>
            
            <div class="test-details">
              <!-- Shear Height -->
              <div class="detail-card">
                <h4 class="detail-title">Shear Height Requirements</h4>
                <div class="shear-height-specs">
                  <div class="shear-spec">
                    <span class="shear-label">Requirement:</span>
                    <span class="shear-value">{{ data.milStd883Method2023?.shearHeight?.requirement }}</span>
                  </div>
                  <div class="shear-spec shear-spec--warning">
                    <span class="shear-label">Too High:</span>
                    <span class="shear-value">{{ data.milStd883Method2023?.shearHeight?.tooHigh }}</span>
                  </div>
                  <div class="shear-spec shear-spec--warning">
                    <span class="shear-label">Too Low:</span>
                    <span class="shear-value">{{ data.milStd883Method2023?.shearHeight?.tooLow }}</span>
                  </div>
                  <div class="shear-spec">
                    <span class="shear-label">Typical:</span>
                    <span class="shear-value">{{ data.milStd883Method2023?.shearHeight?.typical }}</span>
                  </div>
                </div>
              </div>
              
              <!-- Success Criteria -->
              <div class="detail-card">
                <h4 class="detail-title">Success Criteria</h4>
                <div class="success-criteria">
                  <div class="criteria-item">
                    <h5>Shear Force</h5>
                    <p><strong>Minimum:</strong> {{ data.milStd883Method2023?.successCriteria?.shearForce?.minimum }}</p>
                    <p class="formula"><strong>Formula:</strong> {{ data.milStd883Method2023?.successCriteria?.shearForce?.formula }}</p>
                  </div>
                  <div class="criteria-item">
                    <h5>Shear Mode</h5>
                    <p class="pass-mode"><strong>Pass:</strong> {{ data.milStd883Method2023?.successCriteria?.shearMode?.pass }}</p>
                    <p class="fail-mode"><strong>Fail:</strong> {{ data.milStd883Method2023?.successCriteria?.shearMode?.fail }}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Minimum Shear Forces Table -->
          <div class="shear-forces-section">
            <h4 class="detail-title">Minimum Shear Force Requirements</h4>
            <ComparisonTable
              :columns="shearForceColumns"
              :rows="shearForceRows"
              :striped="true"
              :hoverable="true"
            />
          </div>
          
          <!-- Cratering Test -->
          <div class="cratering-section">
            <h4 class="detail-title">{{ data.crateringTest?.title }}</h4>
            <p class="cratering-description">{{ data.crateringTest?.description }}</p>
            <div class="cratering-issue">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
              <p>{{ data.crateringTest?.issue }}</p>
            </div>
            <div class="cratering-details">
              <div class="procedure-list">
                <h5>Procedure</h5>
                <ol>
                  <li v-for="(step, i) in data.crateringTest?.procedure" :key="i">{{ step }}</li>
                </ol>
              </div>
              <div class="prevention-list">
                <h5>Prevention Methods</h5>
                <ul>
                  <li v-for="(method, i) in data.crateringTest?.preventionMethods" :key="i">{{ method }}</li>
                </ul>
              </div>
            </div>
            <p class="acceptance-criteria"><strong>Acceptance Criteria:</strong> {{ data.crateringTest?.acceptanceCriteria }}</p>
          </div>
        </div>
      </template>
      
      <!-- JEDEC Tab -->
      <template #jedec>
        <div class="tab-content-section">
          <div class="test-header">
            <h3 class="test-title">{{ data.jedecTestMethods?.title }}</h3>
            <p class="test-description">{{ data.jedecTestMethods?.description }}</p>
          </div>
          
          <div class="standards-grid">
            <div 
              v-for="standard in data.jedecTestMethods?.standards" 
              :key="standard.id"
              class="standard-card"
            >
              <div class="standard-id">{{ standard.id }}</div>
              <h4 class="standard-name">{{ standard.name }}</h4>
              <p class="standard-description">{{ standard.description }}</p>
            </div>
          </div>
          
          <div class="copper-concerns">
            <h4 class="detail-title">Copper Wire Specific Concerns</h4>
            <ul class="concerns-list">
              <li v-for="(concern, i) in data.jedecTestMethods?.copperSpecificConcerns" :key="i">
                {{ concern }}
              </li>
            </ul>
          </div>
        </div>
      </template>
      
      <!-- IPC Tab -->
      <template #ipc>
        <div class="tab-content-section">
          <div class="test-header">
            <h3 class="test-title">{{ data.ipcTm650Methods?.title }}</h3>
            <p class="test-description">{{ data.ipcTm650Methods?.description }}</p>
          </div>
          
          <div class="standards-grid">
            <div 
              v-for="method in data.ipcTm650Methods?.relevantMethods" 
              :key="method.id"
              class="standard-card"
            >
              <div class="standard-id">{{ method.id }}</div>
              <h4 class="standard-name">{{ method.name }}</h4>
              <p class="standard-description">{{ method.description }}</p>
            </div>
          </div>
          
          <!-- Sample Size Requirements -->
          <div class="sample-size-section">
            <h4 class="detail-title">Sample Size Requirements</h4>
            <div class="sample-size-grid">
              <div class="sample-category">
                <h5>MIL-STD-883</h5>
                <div class="sample-details">
                  <div class="sample-item">
                    <span class="sample-label">Qualification Pull Test:</span>
                    <span class="sample-value">{{ data.sampleSizeRequirements?.milStd883?.qualification?.pullTest }}</span>
                  </div>
                  <div class="sample-item">
                    <span class="sample-label">Qualification Shear Test:</span>
                    <span class="sample-value">{{ data.sampleSizeRequirements?.milStd883?.qualification?.shearTest }}</span>
                  </div>
                </div>
              </div>
              <div class="sample-category">
                <h5>Automotive</h5>
                <div class="sample-details">
                  <div class="sample-item">
                    <span class="sample-label">Qualification Pull Test:</span>
                    <span class="sample-value">{{ data.sampleSizeRequirements?.automotive?.qualification?.pullTest }}</span>
                  </div>
                  <div class="sample-item">
                    <span class="sample-label">Production:</span>
                    <span class="sample-value">{{ data.sampleSizeRequirements?.automotive?.production?.pullTest }}</span>
                  </div>
                </div>
              </div>
              <div class="sample-category">
                <h5>Statistical Requirements</h5>
                <div class="sample-details">
                  <div class="sample-item">
                    <span class="sample-label">Cpk:</span>
                    <span class="sample-value">{{ data.sampleSizeRequirements?.statisticalRequirements?.cpk }}</span>
                  </div>
                  <div class="sample-item">
                    <span class="sample-label">Defect Rate:</span>
                    <span class="sample-value">{{ data.sampleSizeRequirements?.statisticalRequirements?.defectRate }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Test Equipment -->
          <div class="equipment-section">
            <h4 class="detail-title">Test Equipment Requirements</h4>
            <div class="equipment-grid">
              <div class="equipment-card">
                <h5>Pull Tester</h5>
                <dl class="equipment-specs">
                  <div class="equip-spec">
                    <dt>Force Range</dt>
                    <dd>{{ data.testEquipmentRequirements?.pullTester?.forceRange }}</dd>
                  </div>
                  <div class="equip-spec">
                    <dt>Resolution</dt>
                    <dd>{{ data.testEquipmentRequirements?.pullTester?.resolution }}</dd>
                  </div>
                  <div class="equip-spec">
                    <dt>Accuracy</dt>
                    <dd>{{ data.testEquipmentRequirements?.pullTester?.accuracy }}</dd>
                  </div>
                  <div class="equip-spec">
                    <dt>Pull Speed</dt>
                    <dd>{{ data.testEquipmentRequirements?.pullTester?.pullSpeed }}</dd>
                  </div>
                </dl>
              </div>
              <div class="equipment-card">
                <h5>Shear Tester</h5>
                <dl class="equipment-specs">
                  <div class="equip-spec">
                    <dt>Force Range</dt>
                    <dd>{{ data.testEquipmentRequirements?.shearTester?.forceRange }}</dd>
                  </div>
                  <div class="equip-spec">
                    <dt>Resolution</dt>
                    <dd>{{ data.testEquipmentRequirements?.shearTester?.resolution }}</dd>
                  </div>
                  <div class="equip-spec">
                    <dt>Accuracy</dt>
                    <dd>{{ data.testEquipmentRequirements?.shearTester?.accuracy }}</dd>
                  </div>
                  <div class="equip-spec">
                    <dt>Height Control</dt>
                    <dd>{{ data.testEquipmentRequirements?.shearTester?.heightControl }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>
      </template>
    </TabContainer>
    
    <div v-else class="loading-placeholder">
      <p>Loading quality testing data...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabContainer from '@/components/shared/TabContainer.vue'
import ImageViewer from '@/components/shared/ImageViewer.vue'
import ComparisonTable from '@/components/shared/ComparisonTable.vue'
import AccordionPanel from '@/components/shared/AccordionPanel.vue'

const props = defineProps({
  qualityTesting: {
    type: Object,
    default: () => null
  },
  glossary: {
    type: Array,
    default: () => []
  }
})

// Alias for easier access in template
const data = computed(() => props.qualityTesting)

const activeTab = ref('pull-test')
const activeMaterial = ref('goldWire')

const testTabs = [
  { id: 'pull-test', label: 'Pull Test (2011)' },
  { id: 'shear-test', label: 'Shear Test (2023)' },
  { id: 'jedec', label: 'JEDEC Methods' },
  { id: 'ipc', label: 'IPC Methods' }
]

// Pull force table
const pullForceColumns = [
  { key: 'diameter', label: 'Wire Diameter' },
  { key: 'minForce', label: 'Minimum Force' },
  { key: 'typical', label: 'Typical Range' }
]

const pullForceRows = computed(() => {
  if (!props.qualityTesting?.milStd883Method2011?.minimumPullForces?.[activeMaterial.value]) return []
  return props.qualityTesting.milStd883Method2011.minimumPullForces[activeMaterial.value]
})

// Shear force table
const shearForceColumns = [
  { key: 'ballDiameter', label: 'Ball Diameter' },
  { key: 'minForce', label: 'Minimum Force' },
  { key: 'typical', label: 'Typical Range' }
]

const shearForceRows = computed(() => {
  if (!props.qualityTesting?.milStd883Method2023?.minimumShearForces) return []
  return props.qualityTesting.milStd883Method2023.minimumShearForces
})

function formatMaterialName(material) {
  const names = {
    goldWire: 'Gold Wire',
    copperWire: 'Copper Wire',
    aluminumWire: 'Aluminum Wire'
  }
  return names[material] || material
}

function getAssessmentClass(assessment) {
  if (assessment === 'IDEAL') return 'assessment--ideal'
  if (assessment === 'ACCEPTABLE' || assessment.includes('ACCEPTABLE')) return 'assessment--acceptable'
  if (assessment === 'FAILURE') return 'assessment--failure'
  return ''
}

function getSeverityClass(severity) {
  if (severity === 'Critical') return 'severity--critical'
  if (severity === 'Marginal') return 'severity--marginal'
  if (severity.includes('Acceptable') || severity.includes('ideal')) return 'severity--acceptable'
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

.test-header {
  margin-bottom: var(--space-6);
}

.test-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.test-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-2);
}

.test-purpose {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.test-content-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.test-images {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.test-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.detail-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.detail-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.detail-content p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-relaxed);
}

.warning-text {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--color-warning-50);
  border-radius: var(--radius-default);
  color: var(--color-warning-700);
}

.warning-text svg {
  flex-shrink: 0;
  margin-top: 2px;
}

/* Failure Codes */
.failure-codes {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.failure-code-content {
  padding: var(--space-2) 0;
}

.failure-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.failure-assessment {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-2);
}

.assessment--ideal {
  background-color: var(--color-success-50);
  color: var(--color-success-700);
}

.assessment--acceptable {
  background-color: var(--color-accent-50);
  color: var(--color-accent-700);
}

.assessment--failure {
  background-color: var(--color-error-50);
  color: var(--color-error-700);
}

.failure-indication {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Failure Locations */
.failure-locations {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.failure-locations-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
}

.failure-locations-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.failure-location-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  border-left: 3px solid var(--color-neutral-400);
}

.failure-location-item.severity--critical {
  border-left-color: var(--color-error-500);
}

.failure-location-item.severity--marginal {
  border-left-color: var(--color-warning-500);
}

.failure-location-item.severity--acceptable {
  border-left-color: var(--color-success-500);
}

.location-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-2);
}

.location-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  font-size: var(--font-size-sm);
}

.severity-badge {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-full);
  background-color: var(--color-surface-elevated);
  color: var(--color-text-secondary);
}

.failure-type {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.causes-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  align-items: center;
}

.causes-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.cause-tag {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

/* Pull Forces Section */
.pull-forces-section,
.shear-forces-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.material-tabs {
  display: flex;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.material-tab {
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

.material-tab:hover {
  background-color: var(--color-surface-hover);
}

.material-tab--active {
  background-color: var(--color-primary-500);
  color: var(--color-text-inverse);
  border-color: var(--color-primary-500);
}

/* Shear Test Specifics */
.shear-height-specs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.shear-spec {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.shear-spec--warning {
  background-color: var(--color-warning-50);
}

.shear-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  min-width: 100px;
}

.shear-value {
  color: var(--color-text-primary);
}

.success-criteria {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.criteria-item h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.criteria-item p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.formula {
  font-family: var(--font-family-mono);
  background-color: var(--color-surface-elevated);
  padding: var(--space-2);
  border-radius: var(--radius-default);
}

.pass-mode {
  color: var(--color-success-600);
}

.fail-mode {
  color: var(--color-error-600);
}

/* Cratering Section */
.cratering-section {
  margin-top: var(--space-8);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.cratering-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
}

.cratering-issue {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-error-50);
  border-radius: var(--radius-default);
  margin-bottom: var(--space-4);
}

.cratering-issue svg {
  flex-shrink: 0;
  color: var(--color-error-600);
}

.cratering-issue p {
  font-size: var(--font-size-sm);
  color: var(--color-error-700);
  margin: 0;
}

.cratering-details {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  margin-bottom: var(--space-4);
}

.procedure-list h5,
.prevention-list h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.procedure-list ol,
.prevention-list ul {
  padding-left: var(--space-5);
  margin: 0;
}

.procedure-list li,
.prevention-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.acceptance-criteria {
  font-size: var(--font-size-sm);
  color: var(--color-success-700);
  padding: var(--space-3);
  background-color: var(--color-success-50);
  border-radius: var(--radius-default);
}

/* Standards Grid */
.standards-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  margin-bottom: var(--space-8);
}

.standard-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.standard-id {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  background-color: var(--color-primary-50);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  display: inline-block;
  margin-bottom: var(--space-2);
}

.standard-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.standard-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Copper Concerns */
.copper-concerns {
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.concerns-list {
  padding-left: var(--space-5);
  margin: 0;
}

.concerns-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

/* Sample Size Section */
.sample-size-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.sample-size-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.sample-category {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.sample-category h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border-light);
}

.sample-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.sample-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.sample-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.sample-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

/* Equipment Section */
.equipment-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.equipment-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.equipment-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.equipment-card h5 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.equipment-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.equip-spec {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.equip-spec dt {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
}

.equip-spec dd {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .sample-size-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .test-content-grid {
    grid-template-columns: 1fr;
  }
  
  .failure-locations-content {
    grid-template-columns: 1fr;
  }
  
  .standards-grid {
    grid-template-columns: 1fr;
  }
  
  .cratering-details {
    grid-template-columns: 1fr;
  }
  
  .equipment-grid {
    grid-template-columns: 1fr;
  }
  
  .equipment-specs {
    grid-template-columns: 1fr;
  }
}
</style>
