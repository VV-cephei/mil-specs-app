<template>
  <section id="design-principles" class="wb-section">
    <div class="section-header">
      <h2 class="section-title">Design Principles & Guidelines</h2>
      <p class="section-description">
        Proper pad layout and design rules are critical for achieving reliable wire bonds. 
        These guidelines help ensure optimal bond quality and manufacturability.
      </p>
    </div>
    
    <TabContainer
      v-if="data"
      :tabs="designTabs"
      v-model="activeTab"
      variant="pills"
      aria-label="Design guidelines topics"
    >
      <!-- Pad Layout Tab -->
      <template #pad-layout>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.padLocationGuidelines?.title }}</h3>
          
          <div class="content-with-image">
            <div class="image-container">
              <ImageViewer
                :src="data.padLocationGuidelines?.image"
                alt="Wire bond pad location guidelines"
                caption="General guidelines for wire bond pad locations"
                :zoomable="true"
              />
            </div>
            
            <div class="rules-list">
              <div 
                v-for="rule in data.padLocationGuidelines?.rules" 
                :key="rule.id"
                class="rule-card"
              >
                <h4 class="rule-title">{{ rule.rule }}</h4>
                <p class="rule-description">{{ rule.description }}</p>
                
                <div v-if="rule.ballBonding || rule.wedgeBonding" class="rule-specs">
                  <div v-if="rule.ballBonding" class="spec-item">
                    <span class="spec-label">Ball Bonding:</span>
                    <span class="spec-value">{{ rule.ballBonding.value }}</span>
                    <span v-if="rule.ballBonding.typical" class="spec-typical">({{ rule.ballBonding.typical }})</span>
                  </div>
                  <div v-if="rule.wedgeBonding" class="spec-item">
                    <span class="spec-label">Wedge Bonding:</span>
                    <span class="spec-value">{{ rule.wedgeBonding.value }}</span>
                    <span v-if="rule.wedgeBonding.typical" class="spec-typical">({{ rule.wedgeBonding.typical }})</span>
                  </div>
                </div>
                
                <div v-if="rule.minimum || rule.recommended" class="rule-specs">
                  <div v-if="rule.minimum" class="spec-item">
                    <span class="spec-label">Minimum:</span>
                    <span class="spec-value">{{ rule.minimum }}</span>
                  </div>
                  <div v-if="rule.recommended" class="spec-item">
                    <span class="spec-label">Recommended:</span>
                    <span class="spec-value">{{ rule.recommended }}</span>
                  </div>
                  <div v-if="rule.guideline" class="spec-item spec-item--full">
                    <span class="spec-value">{{ rule.guideline }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Distances Tab -->
      <template #distances>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.bondDistanceSpecifications?.title }}</h3>
          
          <div class="content-with-image">
            <div class="image-container">
              <ImageViewer
                :src="data.bondDistanceSpecifications?.image"
                alt="Bond distance and location requirements"
                caption="Bond distance specifications and location requirements"
                :zoomable="true"
              />
            </div>
            
            <div class="specs-table-container">
              <ComparisonTable
                :columns="distanceColumns"
                :rows="distanceRows"
                :striped="true"
                :hoverable="true"
              />
            </div>
          </div>
        </div>
      </template>
      
      <!-- Dimensions Tab -->
      <template #dimensions>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.padDimensionsBySubstrate?.title }}</h3>
          
          <div class="content-with-image">
            <div class="image-container">
              <ImageViewer
                :src="data.padDimensionsBySubstrate?.image"
                alt="Pad dimensions by substrate type"
                caption="Typical substrate and IC pad dimensions"
                :zoomable="true"
              />
            </div>
            
            <div class="substrate-cards">
              <div 
                v-for="substrate in data.padDimensionsBySubstrate?.substrates" 
                :key="substrate.type"
                class="substrate-card"
              >
                <h4 class="substrate-type">{{ substrate.type }}</h4>
                <dl class="substrate-specs">
                  <div class="spec-row">
                    <dt>Pad Size</dt>
                    <dd>
                      <span v-if="substrate.padSize.minimum">Min: {{ substrate.padSize.minimum }}</span>
                      <span v-if="substrate.padSize.typical">Typical: {{ substrate.padSize.typical }}</span>
                      <span v-if="substrate.padSize.recommended">Rec: {{ substrate.padSize.recommended }}</span>
                    </dd>
                  </div>
                  <div class="spec-row">
                    <dt>Pitch</dt>
                    <dd>
                      <span v-if="substrate.pitch.minimum">Min: {{ substrate.pitch.minimum }}</span>
                      <span v-if="substrate.pitch.typical">Typical: {{ substrate.pitch.typical }}</span>
                    </dd>
                  </div>
                  <div class="spec-row">
                    <dt>Metallization</dt>
                    <dd>{{ substrate.metallization }}</dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
          
          <!-- Wire Bond Coverage -->
          <div class="coverage-section">
            <h3 class="content-title">{{ data.wireBondCoverage?.title }}</h3>
            <div class="content-with-image">
              <div class="image-container">
                <ImageViewer
                  :src="data.wireBondCoverage?.image"
                  alt="Wire bond coverage requirements"
                  caption="Wire bond coverage requirements"
                  :zoomable="true"
                />
              </div>
              
              <div class="coverage-requirements">
                <div 
                  v-for="req in data.wireBondCoverage?.requirements" 
                  :key="req.parameter"
                  class="coverage-item"
                >
                  <h4 class="coverage-param">{{ req.parameter }}</h4>
                  <div class="coverage-specs">
                    <div v-if="req.minimum" class="coverage-spec">
                      <span class="coverage-label">Minimum:</span>
                      <span class="coverage-value">{{ req.minimum }}</span>
                    </div>
                    <div v-if="req.optimal || req.qualification" class="coverage-spec">
                      <span class="coverage-label">{{ req.optimal ? 'Optimal:' : 'Qualification:' }}</span>
                      <span class="coverage-value">{{ req.optimal || req.qualification }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </template>
      
      <!-- Pitch Tab -->
      <template #pitch>
        <div class="tab-content-section">
          <h3 class="content-title">{{ data.pitchLimitations?.title }}</h3>
          
          <div class="pitch-comparison">
            <ComparisonTable
              :columns="pitchColumns"
              :rows="pitchRows"
              :striped="true"
              :hoverable="true"
            />
            
            <div v-if="data.pitchLimitations?.notes" class="pitch-note">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <p>{{ data.pitchLimitations.notes }}</p>
            </div>
          </div>
          
          <!-- Design Rules by Wire Diameter -->
          <div class="wire-diameter-section">
            <h3 class="content-title">{{ data.designRulesByWireDiameter?.title }}</h3>
            
            <div class="wire-rules-grid">
              <div 
                v-for="rule in data.designRulesByWireDiameter?.rules" 
                :key="rule.wireDiameter"
                class="wire-rule-card"
              >
                <div class="wire-rule-header">
                  <span class="wire-diameter">{{ rule.wireDiameter }}</span>
                  <span class="wire-application">{{ rule.application }}</span>
                </div>
                <dl class="wire-rule-specs">
                  <div class="wire-spec">
                    <dt>Min Pad Size</dt>
                    <dd>{{ rule.minPadSize }}</dd>
                  </div>
                  <div class="wire-spec">
                    <dt>Min Pitch</dt>
                    <dd>{{ rule.minPitch }}</dd>
                  </div>
                  <div class="wire-spec">
                    <dt>Ball Diameter</dt>
                    <dd>{{ rule.ballDiameter }}</dd>
                  </div>
                  <div class="wire-spec">
                    <dt>Pull Strength</dt>
                    <dd>{{ rule.pullStrength }}</dd>
                  </div>
                </dl>
                <p v-if="rule.notes" class="wire-rule-notes">{{ rule.notes }}</p>
              </div>
            </div>
          </div>
        </div>
      </template>
    </TabContainer>
    
    <div v-else class="loading-placeholder">
      <p>Loading design guidelines data...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import TabContainer from '@/components/shared/TabContainer.vue'
import ImageViewer from '@/components/shared/ImageViewer.vue'
import ComparisonTable from '@/components/shared/ComparisonTable.vue'

const props = defineProps({
  designGuidelines: {
    type: Object,
    default: () => null
  },
  glossary: {
    type: Array,
    default: () => []
  }
})

// Alias for easier access in template
const data = computed(() => props.designGuidelines)

const activeTab = ref('pad-layout')

const designTabs = [
  { id: 'pad-layout', label: 'Pad Layout' },
  { id: 'distances', label: 'Distances' },
  { id: 'dimensions', label: 'Dimensions' },
  { id: 'pitch', label: 'Pitch & Wire Rules' }
]

// Distance specifications table columns and rows
const distanceColumns = [
  { key: 'parameter', label: 'Parameter' },
  { key: 'ballBonding', label: 'Ball Bonding' },
  { key: 'wedgeBonding', label: 'Wedge Bonding' },
  { key: 'notes', label: 'Notes' }
]

const distanceRows = computed(() => {
  if (!props.data?.bondDistanceSpecifications?.specifications) return []
  return props.data.bondDistanceSpecifications.specifications.map(spec => ({
    parameter: spec.parameter,
    ballBonding: spec.ballBonding || spec.standard || '-',
    wedgeBonding: spec.wedgeBonding || spec.extended || spec.lowLoop || '-',
    notes: spec.notes || '-'
  }))
})

// Pitch comparison table columns and rows
const pitchColumns = [
  { key: 'bondType', label: 'Bond Type' },
  { key: 'minimumPitch', label: 'Minimum Pitch' },
  { key: 'typicalPitch', label: 'Typical Pitch' },
  { key: 'limitingFactor', label: 'Limiting Factor' },
  { key: 'wireRange', label: 'Wire Range' }
]

const pitchRows = computed(() => {
  if (!props.data?.pitchLimitations?.comparison) return []
  return props.data.pitchLimitations.comparison
})
</script>

<style scoped>
.wb-section {
  padding: var(--space-12) var(--space-6);
  max-width: 1200px;
  margin: 0 auto;
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
  margin-bottom: var(--space-6);
}

.content-with-image {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-8);
  margin-bottom: var(--space-8);
}

.image-container {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

/* Rules List */
.rules-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.rule-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.rule-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.rule-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
  line-height: var(--line-height-relaxed);
}

.rule-specs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  padding-top: var(--space-3);
  border-top: 1px solid var(--color-border-light);
}

.spec-item {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
}

.spec-item--full {
  flex-direction: column;
}

.spec-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.spec-value {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-medium);
}

.spec-typical {
  color: var(--color-text-tertiary);
  font-size: var(--font-size-xs);
}

/* Specs Table */
.specs-table-container {
  overflow-x: auto;
}

/* Substrate Cards */
.substrate-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.substrate-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.substrate-type {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid var(--color-border-light);
}

.substrate-specs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.spec-row {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.spec-row dt {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.spec-row dd {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.spec-row dd span {
  background-color: var(--color-surface-elevated);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

/* Coverage Section */
.coverage-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.coverage-requirements {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.coverage-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.coverage-param {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.coverage-specs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.coverage-spec {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
}

.coverage-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  min-width: 100px;
}

.coverage-value {
  color: var(--color-text-primary);
}

/* Pitch Section */
.pitch-comparison {
  margin-bottom: var(--space-8);
}

.pitch-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-3);
  margin-top: var(--space-4);
  padding: var(--space-4);
  background-color: var(--color-accent-50);
  border: 1px solid var(--color-accent-200);
  border-radius: var(--radius-lg);
}

.pitch-note svg {
  flex-shrink: 0;
  color: var(--color-accent-600);
}

.pitch-note p {
  font-size: var(--font-size-sm);
  color: var(--color-accent-800);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

/* Wire Diameter Section */
.wire-diameter-section {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.wire-rules-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.wire-rule-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: box-shadow var(--transition-fast);
}

.wire-rule-card:hover {
  box-shadow: var(--shadow-md);
}

.wire-rule-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
  padding-bottom: var(--space-3);
  border-bottom: 1px solid var(--color-border-light);
}

.wire-diameter {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

.wire-application {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.wire-rule-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.wire-spec {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.wire-spec dt {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.wire-spec dd {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.wire-rule-notes {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-style: italic;
  margin: 0;
  padding-top: var(--space-2);
  border-top: 1px dashed var(--color-border-light);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .wire-rules-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .content-with-image {
    grid-template-columns: 1fr;
  }
  
  .substrate-cards {
    grid-template-columns: 1fr;
  }
  
  .wire-rules-grid {
    grid-template-columns: 1fr;
  }
}
</style>
