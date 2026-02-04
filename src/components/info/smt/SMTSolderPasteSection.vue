<template>
  <section id="solder-paste" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">Solder Paste</h2>
      <p class="section-description">
        Solder paste is a complex non-Newtonian fluid. Understanding its composition, 
        rheology, and handling is critical for successful printing.
      </p>
    </div>
    
    <div v-if="hasData" class="paste-content">
      <!-- Overview Card -->
      <div class="overview-card">
        <h3 class="card-title">Paste Composition</h3>
        <p class="overview-description">{{ solderPaste.overview?.description }}</p>
        
        <div class="composition-visual">
          <div class="composition-bar">
            <div class="bar-segment bar-segment--metal" style="width: 50%">
              <span class="segment-label">Metal Powder</span>
              <span class="segment-value">~50% vol / ~90% wt</span>
            </div>
            <div class="bar-segment bar-segment--flux" style="width: 50%">
              <span class="segment-label">Flux Vehicle</span>
              <span class="segment-value">~50% vol / ~10% wt</span>
            </div>
          </div>
        </div>
        
        <div class="key-property">
          <span class="property-label">Key Property:</span>
          <span class="property-value">{{ solderPaste.overview?.keyProperty }}</span>
        </div>
      </div>
      
      <!-- Rheology Section -->
      <div v-if="solderPaste.rheology" class="rheology-section">
        <h3 class="subsection-title">Thixotropic Behavior</h3>
        <p class="subsection-description">
          Solder paste must be shear-thinning (thixotropic) to flow through stencil apertures 
          but hold its shape after printing.
        </p>
        
        <div class="rheology-cards">
          <div class="rheology-card">
            <div class="rheology-icon rheology-icon--rest">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="8" x2="12" y2="12"></line>
                <line x1="12" y1="16" x2="12.01" y2="16"></line>
              </svg>
            </div>
            <h4>At Rest</h4>
            <p class="viscosity">{{ solderPaste.rheology.atRest?.viscosity }} Viscosity</p>
            <p class="purpose">{{ solderPaste.rheology.atRest?.purpose }}</p>
          </div>
          
          <div class="rheology-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          
          <div class="rheology-card">
            <div class="rheology-icon rheology-icon--stress">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path>
              </svg>
            </div>
            <h4>Under Stress</h4>
            <p class="viscosity">{{ solderPaste.rheology.underStress?.viscosity }} Viscosity</p>
            <p class="purpose">{{ solderPaste.rheology.underStress?.purpose }}</p>
          </div>
          
          <div class="rheology-arrow">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </div>
          
          <div class="rheology-card">
            <div class="rheology-icon rheology-icon--recovery">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 4 23 10 17 10"></polyline>
                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10"></path>
              </svg>
            </div>
            <h4>Recovery</h4>
            <p class="viscosity">Instant Return</p>
            <p class="purpose">{{ solderPaste.rheology.recovery?.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Powder Types Section -->
      <div v-if="solderPaste.powderTypes" class="powder-section">
        <h3 class="subsection-title">Powder Types ({{ solderPaste.powderTypes.standard }})</h3>
        
        <div class="powder-table-wrapper">
          <table class="powder-table">
            <thead>
              <tr>
                <th>Type</th>
                <th>Particle Size</th>
                <th>Stencil Thickness</th>
                <th>Applications</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="type in solderPaste.powderTypes.types" :key="type.id">
                <td class="type-name">{{ type.name }}</td>
                <td class="particle-size">{{ type.particleSize }}</td>
                <td class="stencil-thickness">{{ type.stencilThickness }}</td>
                <td class="applications">
                  <span v-for="app in type.applications" :key="app" class="app-tag">
                    {{ app }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        
        <div v-if="solderPaste.powderTypes.trenchInsight" class="trench-insight">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
            <line x1="12" y1="17" x2="12.01" y2="17"></line>
          </svg>
          <span>{{ solderPaste.powderTypes.trenchInsight }}</span>
        </div>
      </div>
      
      <!-- Flux Types Section -->
      <div v-if="solderPaste.fluxTypes" class="flux-section">
        <h3 class="subsection-title">Flux Classifications ({{ solderPaste.fluxTypes.standard }})</h3>
        
        <div class="flux-categories">
          <div 
            v-for="category in solderPaste.fluxTypes.categories" 
            :key="category.id" 
            class="flux-category"
          >
            <h4 class="flux-category-name">{{ category.name }}</h4>
            
            <div class="flux-types-grid">
              <div 
                v-for="subcat in category.subcategories" 
                :key="subcat.id" 
                class="flux-type-card"
              >
                <div class="flux-type-header">
                  <span class="flux-type-id">{{ subcat.id.toUpperCase() }}</span>
                  <span class="flux-type-name">{{ subcat.name }}</span>
                </div>
                
                <dl class="flux-properties">
                  <div class="property-row">
                    <dt>Activity</dt>
                    <dd>{{ subcat.activity }}</dd>
                  </div>
                  <div class="property-row">
                    <dt>Residue</dt>
                    <dd>{{ subcat.residue }}</dd>
                  </div>
                  <div class="property-row">
                    <dt>Cleaning</dt>
                    <dd :class="getCleaningClass(subcat.cleaning)">{{ subcat.cleaning }}</dd>
                  </div>
                </dl>
                
                <div class="flux-applications">
                  <span v-for="app in subcat.applications" :key="app" class="app-tag">
                    {{ app }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Storage Section -->
      <div v-if="solderPaste.storage" class="storage-section">
        <h3 class="subsection-title">Storage & Handling</h3>
        
        <div class="storage-grid">
          <div class="storage-card">
            <div class="storage-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
              </svg>
            </div>
            <h4>Temperature</h4>
            <p class="storage-value">{{ solderPaste.storage.temperature }}</p>
          </div>
          
          <div class="storage-card">
            <div class="storage-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                <line x1="16" y1="2" x2="16" y2="6"></line>
                <line x1="8" y1="2" x2="8" y2="6"></line>
                <line x1="3" y1="10" x2="21" y2="10"></line>
              </svg>
            </div>
            <h4>Shelf Life</h4>
            <p class="storage-value">{{ solderPaste.storage.shelfLife }}</p>
          </div>
          
          <div class="storage-card">
            <div class="storage-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h4>Working Life</h4>
            <p class="storage-value">{{ solderPaste.storage.workingLife }}</p>
          </div>
          
          <div class="storage-card">
            <div class="storage-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 8h1a4 4 0 0 1 0 8h-1"></path>
                <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z"></path>
                <line x1="6" y1="1" x2="6" y2="4"></line>
                <line x1="10" y1="1" x2="10" y2="4"></line>
                <line x1="14" y1="1" x2="14" y2="4"></line>
              </svg>
            </div>
            <h4>Warm-up Time</h4>
            <p class="storage-value">{{ solderPaste.storage.warmupTime }}</p>
          </div>
        </div>
        
        <div v-if="solderPaste.storage.warnings?.length" class="storage-warnings">
          <h4 class="warnings-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
              <line x1="12" y1="9" x2="12" y2="13"></line>
              <line x1="12" y1="17" x2="12.01" y2="17"></line>
            </svg>
            Important Warnings
          </h4>
          <ul class="warnings-list">
            <li v-for="(warning, idx) in solderPaste.storage.warnings" :key="idx">
              {{ warning }}
            </li>
          </ul>
        </div>
      </div>
      
      <!-- Printing Parameters Section -->
      <div v-if="solderPaste.printingParameters" class="printing-section">
        <h3 class="subsection-title">Printing Parameters</h3>
        
        <div class="printing-grid">
          <div class="printing-card">
            <h4>Squeegee Angle</h4>
            <p class="param-value">{{ solderPaste.printingParameters.squeegeeAngle }}</p>
          </div>
          
          <div class="printing-card">
            <h4>Squeegee Pressure</h4>
            <p class="param-value">{{ solderPaste.printingParameters.squeegePressure }}</p>
          </div>
          
          <div class="printing-card">
            <h4>Print Speed</h4>
            <p class="param-value">{{ solderPaste.printingParameters.printSpeed }}</p>
          </div>
          
          <div class="printing-card">
            <h4>Separation Speed</h4>
            <p class="param-value">{{ solderPaste.printingParameters.separationSpeed }}</p>
          </div>
        </div>
        
        <div v-if="solderPaste.printingParameters.issues" class="printing-issues">
          <h4 class="issues-title">Common Issues</h4>
          <div class="issues-grid">
            <div class="issue-card issue-card--warning">
              <span class="issue-cause">Too High Pressure</span>
              <span class="issue-effect">{{ solderPaste.printingParameters.issues.tooHighPressure }}</span>
            </div>
            <div class="issue-card issue-card--warning">
              <span class="issue-cause">Too Low Pressure</span>
              <span class="issue-effect">{{ solderPaste.printingParameters.issues.tooLowPressure }}</span>
            </div>
            <div class="issue-card issue-card--warning">
              <span class="issue-cause">Too Fast Separation</span>
              <span class="issue-effect">{{ solderPaste.printingParameters.issues.tooFastSeparation }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading solder paste data...</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  solderPaste: {
    type: Object,
    default: () => ({})
  }
})

const hasData = computed(() => {
  return props.solderPaste?.overview || 
         props.solderPaste?.powderTypes?.types?.length > 0
})

function getCleaningClass(cleaning) {
  if (cleaning?.toLowerCase().includes('required') || cleaning?.toLowerCase().includes('mandatory')) {
    return 'cleaning-required'
  }
  if (cleaning?.toLowerCase().includes('optional')) {
    return 'cleaning-optional'
  }
  return ''
}
</script>

<style scoped>
.smt-section {
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
  max-width: 600px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

.paste-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

/* Overview Card */
.overview-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-6);
}

.card-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.overview-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6) 0;
}

.composition-visual {
  margin-bottom: var(--space-4);
}

.composition-bar {
  display: flex;
  height: 80px;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.bar-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-2);
}

.bar-segment--metal {
  background: linear-gradient(135deg, #64748b 0%, #475569 100%);
  color: white;
}

.bar-segment--flux {
  background: linear-gradient(135deg, #fbbf24 0%, #f59e0b 100%);
  color: #78350f;
}

.segment-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.segment-value {
  font-size: var(--font-size-xs);
  opacity: 0.9;
}

.key-property {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-default);
}

.property-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-700);
}

.property-value {
  font-size: var(--font-size-sm);
  color: var(--color-primary-600);
}

/* Subsection Titles */
.subsection-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.subsection-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6) 0;
}

/* Rheology Section */
.rheology-cards {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--space-4);
  flex-wrap: wrap;
}

.rheology-card {
  flex: 1;
  min-width: 180px;
  max-width: 220px;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
}

.rheology-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-3);
  border-radius: var(--radius-full);
}

.rheology-icon--rest {
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
}

.rheology-icon--stress {
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
}

.rheology-icon--recovery {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.rheology-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.viscosity {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-600);
  margin: 0 0 var(--space-1) 0;
}

.purpose {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.rheology-arrow {
  color: var(--color-text-tertiary);
}

/* Powder Table */
.powder-table-wrapper {
  overflow-x: auto;
  margin-bottom: var(--space-4);
}

.powder-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.powder-table th,
.powder-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.powder-table th {
  background-color: var(--color-surface-elevated);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.type-name {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
}

.particle-size,
.stencil-thickness {
  font-family: var(--font-family-mono);
  color: var(--color-text-secondary);
}

.applications {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.app-tag {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-primary-50);
  color: var(--color-primary-700);
  border-radius: var(--radius-full);
}

/* Trench Insight */
.trench-insight {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  background: linear-gradient(135deg, var(--color-accent-50) 0%, var(--color-accent-100) 100%);
  border: 1px solid var(--color-accent-200);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  color: var(--color-accent-900);
}

.trench-insight svg {
  flex-shrink: 0;
  color: var(--color-accent-600);
  margin-top: 2px;
}

/* Flux Section */
.flux-categories {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.flux-category-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.flux-types-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-4);
}

.flux-type-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.flux-type-header {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.flux-type-id {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: var(--radius-default);
}

.flux-type-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.flux-properties {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.property-row {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.property-row dt {
  color: var(--color-text-secondary);
}

.property-row dd {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.cleaning-required {
  color: var(--color-error-main);
}

.cleaning-optional {
  color: var(--color-success-main);
}

.flux-applications {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

/* Storage Section */
.storage-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.storage-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
}

.storage-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-3);
  background-color: var(--color-primary-50);
  color: var(--color-primary-600);
  border-radius: var(--radius-full);
}

.storage-card h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.storage-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.storage-warnings {
  background-color: var(--color-error-light);
  border: 1px solid var(--color-error-main);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.warnings-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-error-dark);
  margin: 0 0 var(--space-3) 0;
}

.warnings-list {
  margin: 0;
  padding-left: var(--space-5);
  color: var(--color-error-dark);
}

.warnings-list li {
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
}

.warnings-list li:last-child {
  margin-bottom: 0;
}

/* Printing Section */
.printing-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.printing-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.printing-card h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.param-value {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.printing-issues {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.issues-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.issues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--space-3);
}

.issue-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  border-radius: var(--radius-default);
}

.issue-card--warning {
  background-color: var(--color-warning-light);
}

.issue-cause {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-warning-dark);
}

.issue-effect {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

/* Loading */
.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 768px) {
  .smt-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .rheology-cards {
    flex-direction: column;
  }
  
  .rheology-arrow {
    transform: rotate(90deg);
  }
  
  .rheology-card {
    max-width: 100%;
  }
  
  .storage-grid,
  .printing-grid,
  .issues-grid {
    grid-template-columns: 1fr;
  }
  
  .flux-types-grid {
    grid-template-columns: 1fr;
  }
}
</style>
