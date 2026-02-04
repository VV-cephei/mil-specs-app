<template>
  <section id="visual-inspection" class="wb-section">
    <div class="section-header">
      <h2 class="section-title">Visual Inspection Criteria</h2>
      <p class="section-description">
        Visual inspection is critical for identifying wire bond defects. Understanding acceptance 
        criteria helps ensure consistent quality and reliability.
      </p>
    </div>
    
    <div v-if="data" class="inspection-content">
      <!-- Ball Bond Criteria -->
      <AccordionPanel
        title="Ball Bond Criteria"
        subtitle="Squash ratio, golf club, centering, shape"
        variant="bordered"
        :expanded="true"
      >
        <div class="criteria-grid">
          <!-- Squash Ratio -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.ballBondCriteria?.squashRatio?.parameter }}</h4>
            <p class="criteria-definition">{{ data.ballBondCriteria?.squashRatio?.definition }}</p>
            
            <div class="acceptable-range">
              <h5>Acceptable Range</h5>
              <div class="range-values">
                <div class="range-item">
                  <span class="range-label">Minimum:</span>
                  <span class="range-value">{{ data.ballBondCriteria?.squashRatio?.acceptable?.minimum }}</span>
                </div>
                <div class="range-item">
                  <span class="range-label">Maximum:</span>
                  <span class="range-value">{{ data.ballBondCriteria?.squashRatio?.acceptable?.maximum }}</span>
                </div>
                <div class="range-item range-item--optimal">
                  <span class="range-label">Optimal:</span>
                  <span class="range-value">{{ data.ballBondCriteria?.squashRatio?.acceptable?.optimal }}</span>
                </div>
              </div>
            </div>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div class="defect-item defect-item--warning">
                <span class="defect-name">Undersquash (&lt;{{ data.ballBondCriteria?.squashRatio?.defects?.undersquash?.ratio }})</span>
                <p class="defect-indication">{{ data.ballBondCriteria?.squashRatio?.defects?.undersquash?.indication }}</p>
                <p class="defect-risk">Risk: {{ data.ballBondCriteria?.squashRatio?.defects?.undersquash?.risk }}</p>
              </div>
              <div class="defect-item defect-item--warning">
                <span class="defect-name">Oversquash (&gt;{{ data.ballBondCriteria?.squashRatio?.defects?.oversquash?.ratio }})</span>
                <p class="defect-indication">{{ data.ballBondCriteria?.squashRatio?.defects?.oversquash?.indication }}</p>
                <p class="defect-risk">Risk: {{ data.ballBondCriteria?.squashRatio?.defects?.oversquash?.risk }}</p>
              </div>
            </div>
          </div>
          
          <!-- Golf Club -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.ballBondCriteria?.golfClub?.parameter }}</h4>
            <p class="criteria-definition">{{ data.ballBondCriteria?.golfClub?.definition }}</p>
            
            <div class="classification-badge classification-badge--reject">
              {{ data.ballBondCriteria?.golfClub?.classification }}
            </div>
            
            <div class="causes-section">
              <h5>Causes</h5>
              <ul class="causes-list">
                <li v-for="(cause, i) in data.ballBondCriteria?.golfClub?.causes" :key="i">{{ cause }}</li>
              </ul>
            </div>
            
            <p class="acceptance-note">
              <strong>Acceptance:</strong> {{ data.ballBondCriteria?.golfClub?.acceptanceCriteria }}
            </p>
          </div>
          
          <!-- Centering -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.ballBondCriteria?.centering?.parameter }}</h4>
            
            <div class="requirements-section">
              <h5>Requirements</h5>
              <div class="requirement-item">
                <span class="req-label">Minimum:</span>
                <span class="req-value">{{ data.ballBondCriteria?.centering?.requirements?.minimum }}</span>
              </div>
              <div class="requirement-item requirement-item--optimal">
                <span class="req-label">Optimal:</span>
                <span class="req-value">{{ data.ballBondCriteria?.centering?.requirements?.optimal }}</span>
              </div>
            </div>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div class="defect-item defect-item--critical">
                <span class="defect-name">Off Pad</span>
                <p class="defect-description">{{ data.ballBondCriteria?.centering?.defects?.offPad?.description }}</p>
                <span class="defect-classification">{{ data.ballBondCriteria?.centering?.defects?.offPad?.classification }}</span>
              </div>
              <div class="defect-item defect-item--minor">
                <span class="defect-name">Off Center</span>
                <p class="defect-description">{{ data.ballBondCriteria?.centering?.defects?.offCenter?.description }}</p>
                <span class="defect-classification">{{ data.ballBondCriteria?.centering?.defects?.offCenter?.classification }}</span>
              </div>
            </div>
          </div>
          
          <!-- Ball Shape -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.ballBondCriteria?.ballShape?.parameter }}</h4>
            <p class="acceptable-value">Acceptable: {{ data.ballBondCriteria?.ballShape?.acceptable }}</p>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div 
                v-for="(defect, key) in data.ballBondCriteria?.ballShape?.defects" 
                :key="key"
                class="defect-item"
                :class="getDefectClass(defect.classification)"
              >
                <span class="defect-name">{{ formatDefectName(key) }}</span>
                <p class="defect-description">{{ defect.description }}</p>
                <span class="defect-classification">{{ defect.classification }}</span>
              </div>
            </div>
          </div>
        </div>
      </AccordionPanel>
      
      <!-- Stitch Bond Criteria -->
      <AccordionPanel
        title="Stitch Bond Criteria"
        subtitle="Heel condition, tail length, bond footprint"
        variant="bordered"
      >
        <div class="criteria-grid">
          <!-- Heel Condition -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.stitchBondCriteria?.heelCondition?.parameter }}</h4>
            <p class="criteria-definition">{{ data.stitchBondCriteria?.heelCondition?.definition }}</p>
            <p class="acceptable-value">Acceptable: {{ data.stitchBondCriteria?.heelCondition?.acceptable }}</p>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div 
                v-for="(defect, key) in data.stitchBondCriteria?.heelCondition?.defects" 
                :key="key"
                class="defect-item"
                :class="getDefectClass(defect.classification)"
              >
                <span class="defect-name">{{ formatDefectName(key) }}</span>
                <p class="defect-description">{{ defect.description }}</p>
                <span class="defect-classification">{{ defect.classification }}</span>
                <div v-if="defect.causes" class="defect-causes">
                  <span>Causes: </span>
                  <span v-for="(cause, i) in defect.causes" :key="i" class="cause-tag">{{ cause }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Tail Length -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.stitchBondCriteria?.tailLength?.parameter }}</h4>
            <p class="criteria-definition">{{ data.stitchBondCriteria?.tailLength?.definition }}</p>
            
            <div class="acceptable-range">
              <h5>Acceptable Range</h5>
              <div class="range-values">
                <div class="range-item">
                  <span class="range-label">Minimum:</span>
                  <span class="range-value">{{ data.stitchBondCriteria?.tailLength?.acceptable?.minimum }}</span>
                </div>
                <div class="range-item">
                  <span class="range-label">Maximum:</span>
                  <span class="range-value">{{ data.stitchBondCriteria?.tailLength?.acceptable?.maximum }}</span>
                </div>
                <div class="range-item range-item--optimal">
                  <span class="range-label">Optimal:</span>
                  <span class="range-value">{{ data.stitchBondCriteria?.tailLength?.acceptable?.optimal }}</span>
                </div>
              </div>
            </div>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div 
                v-for="(defect, key) in data.stitchBondCriteria?.tailLength?.defects" 
                :key="key"
                class="defect-item"
                :class="getDefectClass(defect.classification)"
              >
                <span class="defect-name">{{ formatDefectName(key) }}</span>
                <p class="defect-description">{{ defect.description }}</p>
                <span class="defect-classification">{{ defect.classification }}</span>
              </div>
            </div>
          </div>
          
          <!-- Bond Footprint -->
          <div class="criteria-card criteria-card--wide">
            <h4 class="criteria-title">{{ data.stitchBondCriteria?.bondFootprint?.parameter }}</h4>
            
            <div class="footprint-specs">
              <div class="spec-group">
                <h5>Acceptable Dimensions</h5>
                <div class="spec-item">
                  <span class="spec-label">Width:</span>
                  <span class="spec-value">{{ data.stitchBondCriteria?.bondFootprint?.acceptable?.width }}</span>
                </div>
                <div class="spec-item">
                  <span class="spec-label">Length:</span>
                  <span class="spec-value">{{ data.stitchBondCriteria?.bondFootprint?.acceptable?.length }}</span>
                </div>
              </div>
              <div class="spec-group">
                <h5>Coverage</h5>
                <p class="coverage-value">{{ data.stitchBondCriteria?.bondFootprint?.coverage }}</p>
              </div>
            </div>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div class="defects-row">
                <div 
                  v-for="(defect, key) in data.stitchBondCriteria?.bondFootprint?.defects" 
                  :key="key"
                  class="defect-item"
                  :class="getDefectClass(defect.classification)"
                >
                  <span class="defect-name">{{ formatDefectName(key) }}</span>
                  <p class="defect-description">{{ defect.description }}</p>
                  <span class="defect-classification">{{ defect.classification }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </AccordionPanel>
      
      <!-- Loop Criteria -->
      <AccordionPanel
        title="Loop Criteria"
        subtitle="Height, sweep, sag, shape"
        variant="bordered"
      >
        <div class="criteria-grid">
          <!-- Loop Height -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.loopCriteria?.loopHeight?.parameter }}</h4>
            <p class="criteria-definition">{{ data.loopCriteria?.loopHeight?.definition }}</p>
            
            <div class="typical-values">
              <h5>Typical Values</h5>
              <div class="typical-item">
                <span class="typical-label">Standard:</span>
                <span class="typical-value">{{ data.loopCriteria?.loopHeight?.typical?.standard }}</span>
              </div>
              <div class="typical-item">
                <span class="typical-label">Low Loop:</span>
                <span class="typical-value">{{ data.loopCriteria?.loopHeight?.typical?.lowLoop }}</span>
              </div>
              <div class="typical-item">
                <span class="typical-label">Ultra Low:</span>
                <span class="typical-value">{{ data.loopCriteria?.loopHeight?.typical?.ultraLow }}</span>
              </div>
            </div>
            
            <p class="tolerance-note">Tolerance: {{ data.loopCriteria?.loopHeight?.tolerance }}</p>
          </div>
          
          <!-- Wire Sweep -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.loopCriteria?.wireSweep?.parameter }}</h4>
            <p class="criteria-definition">{{ data.loopCriteria?.wireSweep?.definition }}</p>
            
            <div class="acceptable-range">
              <h5>Acceptable</h5>
              <div class="range-item">
                <span class="range-label">Maximum:</span>
                <span class="range-value">{{ data.loopCriteria?.wireSweep?.acceptable?.maximum }}</span>
              </div>
              <div class="range-item">
                <span class="range-label">Percentage:</span>
                <span class="range-value">{{ data.loopCriteria?.wireSweep?.acceptable?.percentage }}</span>
              </div>
            </div>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div 
                v-for="(defect, key) in data.loopCriteria?.wireSweep?.defects" 
                :key="key"
                class="defect-item"
                :class="getDefectClass(defect.classification)"
              >
                <span class="defect-name">{{ formatDefectName(key) }}</span>
                <p class="defect-description">{{ defect.description }}</p>
                <span class="defect-classification">{{ defect.classification }}</span>
                <p v-if="defect.risk" class="defect-risk">Risk: {{ defect.risk }}</p>
              </div>
            </div>
          </div>
          
          <!-- Sag -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.loopCriteria?.sag?.parameter }}</h4>
            <p class="criteria-definition">{{ data.loopCriteria?.sag?.definition }}</p>
            <p class="acceptable-value">Acceptable: {{ data.loopCriteria?.sag?.acceptable }}</p>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div 
                v-for="(defect, key) in data.loopCriteria?.sag?.defects" 
                :key="key"
                class="defect-item"
                :class="getDefectClass(defect.classification)"
              >
                <span class="defect-name">{{ formatDefectName(key) }}</span>
                <p class="defect-description">{{ defect.description }}</p>
                <span class="defect-classification">{{ defect.classification }}</span>
              </div>
            </div>
          </div>
          
          <!-- Loop Shape -->
          <div class="criteria-card">
            <h4 class="criteria-title">{{ data.loopCriteria?.loopShape?.parameter }}</h4>
            <p class="acceptable-value">Acceptable: {{ data.loopCriteria?.loopShape?.acceptable }}</p>
            
            <div class="defects-section">
              <h5>Defects</h5>
              <div 
                v-for="(defect, key) in data.loopCriteria?.loopShape?.defects" 
                :key="key"
                class="defect-item"
                :class="getDefectClass(defect.classification)"
              >
                <span class="defect-name">{{ formatDefectName(key) }}</span>
                <p class="defect-description">{{ defect.description }}</p>
                <span class="defect-classification">{{ defect.classification }}</span>
              </div>
            </div>
          </div>
        </div>
      </AccordionPanel>
      
      <!-- Intermetallic Coverage -->
      <AccordionPanel
        title="Intermetallic Coverage (IMC)"
        subtitle="Coverage requirements and evaluation"
        variant="bordered"
      >
        <div class="imc-content">
          <p class="imc-definition">{{ data.intermetallicCoverage?.definition }}</p>
          <p class="imc-note">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            {{ data.intermetallicCoverage?.note }}
          </p>
          
          <div class="imc-grid">
            <div class="imc-requirements">
              <h5>Requirements</h5>
              <div class="req-item">
                <span class="req-label">Minimum:</span>
                <span class="req-value">{{ data.intermetallicCoverage?.requirements?.minimum }}</span>
              </div>
              <div class="req-item">
                <span class="req-label">Qualification:</span>
                <span class="req-value">{{ data.intermetallicCoverage?.requirements?.qualification }}</span>
              </div>
              <div class="req-item">
                <span class="req-label">Automotive:</span>
                <span class="req-value">{{ data.intermetallicCoverage?.requirements?.automotive }}</span>
              </div>
            </div>
            
            <div class="imc-evaluation">
              <h5>Evaluation Method</h5>
              <ol class="evaluation-steps">
                <li v-for="(step, i) in data.intermetallicCoverage?.evaluationMethod?.procedure" :key="i">
                  {{ step }}
                </li>
              </ol>
              <p class="equipment-note">
                <strong>Equipment:</strong> {{ data.intermetallicCoverage?.evaluationMethod?.equipment }}
              </p>
            </div>
            
            <div class="imc-phases">
              <h5>Intermetallic Phases</h5>
              <div class="phase-group">
                <span class="phase-label">Gold-Aluminum:</span>
                <div class="phase-tags">
                  <span 
                    v-for="(phase, i) in data.intermetallicCoverage?.intermetallicPhases?.goldAluminum" 
                    :key="i"
                    class="phase-tag"
                  >{{ phase }}</span>
                </div>
              </div>
              <div class="phase-group">
                <span class="phase-label">Copper-Aluminum:</span>
                <div class="phase-tags">
                  <span 
                    v-for="(phase, i) in data.intermetallicCoverage?.intermetallicPhases?.copperAluminum" 
                    :key="i"
                    class="phase-tag"
                  >{{ phase }}</span>
                </div>
              </div>
              <p class="phase-note">{{ data.intermetallicCoverage?.intermetallicPhases?.note }}</p>
            </div>
          </div>
        </div>
      </AccordionPanel>
      
      <!-- Defect Classifications -->
      <div class="defect-classifications">
        <h3 class="classifications-title">{{ data.defectClassifications?.title }}</h3>
        
        <div class="classifications-grid">
          <div 
            v-for="category in data.defectClassifications?.categories" 
            :key="category.classification"
            class="classification-card"
            :class="getClassificationCardClass(category.classification)"
          >
            <div class="classification-header">
              <span class="classification-name">{{ category.classification }}</span>
            </div>
            <p class="classification-definition">{{ category.definition }}</p>
            <p class="classification-action"><strong>Action:</strong> {{ category.action }}</p>
            <div class="examples-section">
              <h5>Examples</h5>
              <ul class="examples-list">
                <li v-for="(example, i) in category.examples" :key="i">{{ example }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- AOI Parameters -->
      <AccordionPanel
        title="AOI Inspection Parameters"
        subtitle="Automated optical inspection system requirements"
        variant="bordered"
      >
        <div class="aoi-content">
          <div class="aoi-requirements">
            <h5>System Requirements</h5>
            <div class="aoi-specs">
              <div class="aoi-spec">
                <span class="aoi-label">Resolution:</span>
                <span class="aoi-value">{{ data.aoiInspectionParameters?.systemRequirements?.resolution }}</span>
              </div>
              <div class="aoi-spec">
                <span class="aoi-label">Magnification:</span>
                <span class="aoi-value">{{ data.aoiInspectionParameters?.systemRequirements?.magnification }}</span>
              </div>
              <div class="aoi-spec">
                <span class="aoi-label">Lighting:</span>
                <span class="aoi-value">{{ data.aoiInspectionParameters?.systemRequirements?.lighting }}</span>
              </div>
              <div class="aoi-spec">
                <span class="aoi-label">Throughput:</span>
                <span class="aoi-value">{{ data.aoiInspectionParameters?.systemRequirements?.throughput }}</span>
              </div>
            </div>
          </div>
          
          <div class="aoi-grid">
            <div class="aoi-measured">
              <h5>Measured Parameters</h5>
              <div class="measured-list">
                <div 
                  v-for="param in data.aoiInspectionParameters?.measuredParameters" 
                  :key="param.parameter"
                  class="measured-item"
                >
                  <span class="measured-param">{{ param.parameter }}</span>
                  <span class="measured-method">{{ param.method }}</span>
                  <span class="measured-tolerance">{{ param.tolerance }}</span>
                </div>
              </div>
            </div>
            
            <div class="aoi-detection">
              <h5>Defect Detection</h5>
              <ul class="detection-list">
                <li v-for="(defect, i) in data.aoiInspectionParameters?.defectDetection" :key="i">
                  {{ defect }}
                </li>
              </ul>
            </div>
            
            <div class="aoi-limitations">
              <h5>Limitations</h5>
              <ul class="limitations-list">
                <li v-for="(limitation, i) in data.aoiInspectionParameters?.limitations" :key="i">
                  {{ limitation }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AccordionPanel>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading visual inspection data...</p>
    </div>
  </section>
</template>

<script setup>
import AccordionPanel from '@/components/shared/AccordionPanel.vue'
import { computed } from 'vue'

const props = defineProps({
  visualInspection: {
    type: Object,
    default: () => null
  },
  glossary: {
    type: Array,
    default: () => []
  }
})

// Alias for easier access in template
const data = computed(() => props.visualInspection)

function formatDefectName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}

function getDefectClass(classification) {
  if (!classification) return ''
  const lower = classification.toLowerCase()
  if (lower.includes('reject') || lower.includes('critical')) return 'defect-item--critical'
  if (lower.includes('major')) return 'defect-item--major'
  if (lower.includes('minor')) return 'defect-item--minor'
  return ''
}

function getClassificationCardClass(classification) {
  const lower = classification.toLowerCase()
  if (lower.includes('critical') || lower.includes('reject')) return 'classification-card--critical'
  if (lower.includes('major')) return 'classification-card--major'
  if (lower.includes('minor')) return 'classification-card--minor'
  if (lower.includes('cosmetic')) return 'classification-card--cosmetic'
  return ''
}
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

.inspection-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

/* Criteria Grid */
.criteria-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
}

.criteria-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.criteria-card--wide {
  grid-column: 1 / -1;
}

.criteria-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.criteria-definition {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
  line-height: var(--line-height-relaxed);
}

/* Acceptable Range */
.acceptable-range,
.typical-values {
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.acceptable-range h5,
.typical-values h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-2);
}

.range-values,
.typical-values {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.range-item,
.typical-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.range-item--optimal,
.typical-item--optimal {
  padding: var(--space-2);
  background-color: var(--color-success-50);
  border-radius: var(--radius-sm);
}

.range-label,
.typical-label {
  color: var(--color-text-secondary);
}

.range-value,
.typical-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.acceptable-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.tolerance-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-top: var(--space-2);
}

/* Classification Badge */
.classification-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-3);
}

.classification-badge--reject {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}

/* Causes Section */
.causes-section {
  margin-bottom: var(--space-3);
}

.causes-section h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.causes-list {
  padding-left: var(--space-4);
  margin: 0;
}

.causes-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.acceptance-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

/* Requirements Section */
.requirements-section {
  margin-bottom: var(--space-4);
}

.requirements-section h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.requirement-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-1);
}

.requirement-item--optimal {
  background-color: var(--color-success-50);
}

.req-label {
  color: var(--color-text-secondary);
}

.req-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

/* Defects Section */
.defects-section {
  margin-top: var(--space-3);
}

.defects-section h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.defects-row {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-3);
}

.defect-item {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  border-left: 3px solid var(--color-neutral-400);
  margin-bottom: var(--space-2);
}

.defect-item--critical {
  border-left-color: var(--color-error-500);
  background-color: var(--color-error-50);
}

.defect-item--major {
  border-left-color: var(--color-warning-500);
  background-color: var(--color-warning-50);
}

.defect-item--minor {
  border-left-color: var(--color-accent-500);
  background-color: var(--color-accent-50);
}

.defect-item--warning {
  border-left-color: var(--color-warning-500);
}

.defect-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  display: block;
  margin-bottom: var(--space-1);
}

.defect-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.defect-indication,
.defect-risk {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-1);
}

.defect-classification {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-secondary);
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border-radius: var(--radius-sm);
}

.defect-causes {
  margin-top: var(--space-2);
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.cause-tag {
  display: inline-block;
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border-radius: var(--radius-sm);
  margin-right: var(--space-1);
  margin-top: var(--space-1);
}

/* Footprint Specs */
.footprint-specs {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.spec-group h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.spec-item {
  display: flex;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  margin-bottom: var(--space-1);
}

.spec-label {
  color: var(--color-text-secondary);
}

.spec-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.coverage-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  padding: var(--space-2);
  background-color: var(--color-success-50);
  border-radius: var(--radius-default);
}

/* IMC Content */
.imc-content {
  padding: var(--space-2) 0;
}

.imc-definition {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
}

.imc-note {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--color-accent-50);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  color: var(--color-accent-700);
  margin-bottom: var(--space-4);
}

.imc-note svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.imc-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.imc-requirements,
.imc-evaluation,
.imc-phases {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.imc-requirements h5,
.imc-evaluation h5,
.imc-phases h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.req-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  margin-bottom: var(--space-2);
}

.evaluation-steps {
  padding-left: var(--space-4);
  margin: 0 0 var(--space-3) 0;
}

.evaluation-steps li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.equipment-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.phase-group {
  margin-bottom: var(--space-3);
}

.phase-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  display: block;
  margin-bottom: var(--space-1);
}

.phase-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.phase-tag {
  font-size: var(--font-size-xs);
  font-family: var(--font-family-mono);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-sm);
}

.phase-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  font-style: italic;
  margin: 0;
}

/* Defect Classifications */
.defect-classifications {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.classifications-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-6);
  text-align: center;
}

.classifications-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.classification-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  border-top: 4px solid var(--color-neutral-400);
}

.classification-card--critical {
  border-top-color: var(--color-error-500);
}

.classification-card--major {
  border-top-color: var(--color-warning-500);
}

.classification-card--minor {
  border-top-color: var(--color-accent-500);
}

.classification-card--cosmetic {
  border-top-color: var(--color-success-500);
}

.classification-header {
  margin-bottom: var(--space-3);
}

.classification-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.classification-definition {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
  line-height: var(--line-height-relaxed);
}

.classification-action {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-3);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.examples-section h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.examples-list {
  padding-left: var(--space-4);
  margin: 0;
}

.examples-list li {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  margin-bottom: var(--space-1);
}

/* AOI Content */
.aoi-content {
  padding: var(--space-2) 0;
}

.aoi-requirements {
  margin-bottom: var(--space-6);
}

.aoi-requirements h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.aoi-specs {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.aoi-spec {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
}

.aoi-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
}

.aoi-value {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
  font-weight: var(--font-weight-medium);
}

.aoi-grid {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: var(--space-4);
}

.aoi-measured,
.aoi-detection,
.aoi-limitations {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.aoi-measured h5,
.aoi-detection h5,
.aoi-limitations h5 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-3);
}

.measured-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.measured-item {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: var(--space-2);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.measured-param {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.measured-method {
  color: var(--color-text-secondary);
}

.measured-tolerance {
  color: var(--color-text-tertiary);
}

.detection-list,
.limitations-list {
  padding-left: var(--space-4);
  margin: 0;
}

.detection-list li,
.limitations-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.limitations-list li {
  color: var(--color-warning-700);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .classifications-grid {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .imc-grid {
    grid-template-columns: 1fr;
  }
  
  .aoi-specs {
    grid-template-columns: repeat(2, 1fr);
  }
  
  .aoi-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .criteria-grid {
    grid-template-columns: 1fr;
  }
  
  .defects-row {
    grid-template-columns: 1fr;
  }
  
  .footprint-specs {
    grid-template-columns: 1fr;
  }
  
  .classifications-grid {
    grid-template-columns: 1fr;
  }
  
  .aoi-specs {
    grid-template-columns: 1fr;
  }
}
</style>
