<template>
  <section id="reliability" class="wb-section wb-section--alt">
    <div class="section-header">
      <h2 class="section-title">Reliability & Failure Modes</h2>
      <p class="section-description">
        Understanding common failure modes and their root causes is essential for 
        developing robust wire bonding processes.
      </p>
    </div>
    
    <div v-if="failureModes.length > 0" class="failure-modes">
      <AccordionPanel
        v-for="failure in failureModes"
        :key="failure.id"
        :title="failure.name"
        :subtitle="getFailureSeverity(failure)"
        variant="bordered"
      >
        <div class="failure-content">
          <div class="failure-description">
            <p>{{ failure.description }}</p>
          </div>
          
          <!-- Failure Images -->
          <div v-if="failure.images && failure.images.length > 0" class="failure-images">
            <h4 class="failure-section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                <circle cx="8.5" cy="8.5" r="1.5"></circle>
                <polyline points="21 15 16 10 5 21"></polyline>
              </svg>
              Failure Examples
            </h4>
            <div class="failure-images-grid">
              <div 
                v-for="(image, index) in failure.images" 
                :key="index"
                class="failure-image-item"
              >
                <ImageViewer
                  :src="image.src"
                  :alt="image.alt"
                  :caption="image.caption"
                  :zoomable="true"
                />
              </div>
            </div>
          </div>
          
          <!-- Root Causes -->
          <div class="failure-section">
            <h4 class="failure-section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              Root Causes
            </h4>
            <div class="root-causes">
              <div 
                v-for="(cause, index) in failure.rootCauses" 
                :key="index"
                class="cause-card"
              >
                <h5 class="cause-name">{{ cause.cause }}</h5>
                <p class="cause-mechanism">{{ cause.mechanism }}</p>
              </div>
            </div>
          </div>
          
          <!-- Symptoms -->
          <div v-if="failure.symptoms" class="failure-section">
            <h4 class="failure-section-title">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                <circle cx="12" cy="12" r="3"></circle>
              </svg>
              Symptoms
            </h4>
            <ul class="symptom-list">
              <li v-for="(symptom, index) in failure.symptoms" :key="index">
                {{ symptom }}
              </li>
            </ul>
          </div>
          
          <!-- Prevention & Fixes -->
          <div class="prevention-fixes">
            <div class="prevention">
              <h4 class="failure-section-title failure-section-title--success">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                </svg>
                Prevention
              </h4>
              <ul class="action-list action-list--prevention">
                <li v-for="(item, index) in failure.prevention" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
            <div class="fixes">
              <h4 class="failure-section-title failure-section-title--info">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
                </svg>
                Corrective Actions
              </h4>
              <ul class="action-list action-list--fixes">
                <li v-for="(item, index) in failure.fixes" :key="index">
                  {{ item }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </AccordionPanel>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading failure modes data...</p>
    </div>
    
    <!-- Severity Legend -->
    <div class="severity-legend">
      <h4>Severity Levels</h4>
      <div class="legend-items">
        <div class="legend-item">
          <span class="severity-indicator severity-indicator--critical"></span>
          <span class="legend-label">Critical</span>
          <span class="legend-desc">Immediate action required, potential for catastrophic failure</span>
        </div>
        <div class="legend-item">
          <span class="severity-indicator severity-indicator--high"></span>
          <span class="legend-label">High</span>
          <span class="legend-desc">Significant impact on reliability, requires process adjustment</span>
        </div>
        <div class="legend-item">
          <span class="severity-indicator severity-indicator--medium"></span>
          <span class="legend-label">Medium</span>
          <span class="legend-desc">Moderate impact, should be addressed in process optimization</span>
        </div>
      </div>
    </div>
    
    <!-- Related Standards -->
    <div class="related-standards">
      <h3 class="standards-title">Related Test Standards</h3>
      <div class="standards-grid">
        <div class="standard-card">
          <div class="standard-id">MIL-STD-883</div>
          <div class="standard-method">Method 2011</div>
          <div class="standard-name">Wire Pull Test</div>
          <p class="standard-desc">
            Hook pulls wire loop upwards until break or lift. Critical for validating bond strength.
          </p>
        </div>
        <div class="standard-card">
          <div class="standard-id">MIL-STD-883</div>
          <div class="standard-method">Method 2023</div>
          <div class="standard-name">Ball Shear Test</div>
          <p class="standard-desc">
            Chisel pushes against ball to shear it off pad. Tests actual weld interface strength.
          </p>
        </div>
        <div class="standard-card">
          <div class="standard-id">JEDEC</div>
          <div class="standard-method">JESD22-A104</div>
          <div class="standard-name">Temperature Cycling</div>
          <p class="standard-desc">
            Thermal stress testing to evaluate bond reliability under temperature extremes.
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import AccordionPanel from '@/components/shared/AccordionPanel.vue'
import ImageViewer from '@/components/shared/ImageViewer.vue'

const props = defineProps({
  failureModes: {
    type: Array,
    default: () => []
  }
})

function getFailureSeverity(failure) {
  // Determine severity based on failure type
  const severityMap = {
    'cratering': 'Critical',
    'kirkendall-voids': 'Critical (latent failure)',
    'heel-cracking': 'High',
    'lift-off': 'High'
  }
  return severityMap[failure.id] || 'Medium'
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
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Failure Modes */
.failure-modes {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  margin-bottom: var(--space-10);
}

.failure-content {
  padding: var(--space-2) 0;
}

.failure-description {
  margin-bottom: var(--space-5);
}

.failure-description p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.failure-section {
  margin-bottom: var(--space-5);
}

.failure-section-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-3);
}

.failure-section-title svg {
  color: var(--color-primary-500);
}

.failure-section-title--success svg {
  color: var(--color-success-main);
}

.failure-section-title--info svg {
  color: var(--color-info-main);
}

/* Root Causes */
.root-causes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.cause-card {
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-left: 3px solid var(--color-error-main);
  border-radius: var(--radius-default);
}

.cause-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.cause-mechanism {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

/* Symptoms */
.symptom-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-2);
}

.symptom-list li {
  position: relative;
  padding: var(--space-3) var(--space-3) var(--space-3) var(--space-8);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.symptom-list li::before {
  content: '';
  position: absolute;
  left: var(--space-3);
  top: 50%;
  transform: translateY(-50%);
  width: 8px;
  height: 8px;
  background-color: var(--color-warning-main);
  border-radius: var(--radius-full);
}

/* Prevention & Fixes */
.prevention-fixes {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.action-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.action-list li {
  position: relative;
  padding-left: var(--space-6);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.action-list li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  border-radius: var(--radius-full);
}

.action-list--prevention li::before {
  background-color: var(--color-success-main);
}

.action-list--fixes li::before {
  background-color: var(--color-info-main);
}

/* Severity Legend */
.severity-legend {
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  margin-bottom: var(--space-10);
}

.severity-legend h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-4);
}

.legend-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.legend-item {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.severity-indicator {
  width: 12px;
  height: 12px;
  border-radius: var(--radius-full);
  flex-shrink: 0;
}

.severity-indicator--critical {
  background-color: var(--color-error-main);
}

.severity-indicator--high {
  background-color: var(--color-warning-main);
}

.severity-indicator--medium {
  background-color: var(--color-accent-500);
}

.legend-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  min-width: 80px;
}

.legend-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Related Standards */
.related-standards {
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.standards-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-6);
}

.standards-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
}

.standard-card {
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  transition: transform var(--transition-default), box-shadow var(--transition-default);
}

.standard-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.standard-id {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-1);
}

.standard-method {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.standard-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.standard-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Failure Images */
.failure-images {
  margin-bottom: var(--space-5);
}

.failure-images-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.failure-image-item {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-3);
  transition: box-shadow var(--transition-default);
}

.failure-image-item:hover {
  box-shadow: var(--shadow-md);
}

/* Responsive */
@media (max-width: 1024px) {
  .standards-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .prevention-fixes {
    grid-template-columns: 1fr;
  }
  
  .legend-item {
    flex-wrap: wrap;
  }
  
  .legend-desc {
    width: 100%;
    padding-left: calc(12px + var(--space-3));
  }
}
</style>
