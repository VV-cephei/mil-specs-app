<template>
  <section id="inspection" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">Quality Standards</h2>
      <p class="section-description">
        IPC standards define the requirements for soldered assemblies and provide 
        visual acceptance criteria for inspection.
      </p>
    </div>
    
    <div v-if="hasData" class="standards-content">
      <!-- IPC Standards Overview -->
      <div class="standards-overview">
        <h3 class="subsection-title">Key IPC Standards</h3>
        
        <div class="standards-grid">
          <div 
            v-for="standard in glossary.standards" 
            :key="standard.id"
            class="standard-card"
            :class="{ 'standard-card--primary': isPrimaryStandard(standard.id) }"
          >
            <div class="standard-header">
              <span class="standard-id">{{ standard.name }}</span>
              <span v-if="isPrimaryStandard(standard.id)" class="primary-badge">Primary</span>
            </div>
            <h4 class="standard-title">{{ standard.title }}</h4>
            <p class="standard-description">{{ standard.description }}</p>
          </div>
        </div>
      </div>
      
      <!-- Class Definitions -->
      <div class="classes-section">
        <h3 class="subsection-title">IPC Class Definitions</h3>
        <p class="classes-intro">
          IPC-A-610 and J-STD-001 define three classes of electronic products based on 
          their intended end-use environment and reliability requirements.
        </p>
        
        <div class="classes-comparison">
          <div class="class-card class-card--class1">
            <div class="class-header">
              <div class="class-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                  <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                </svg>
              </div>
              <div class="class-badge">CLASS 1</div>
            </div>
            <h4 class="class-name">General Electronic Products</h4>
            <p class="class-subtitle">Consumer Electronics</p>
            
            <div class="class-details">
              <div class="detail-item">
                <span class="detail-label">Examples</span>
                <span class="detail-value">Toys, remote controls, basic appliances</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Reliability</span>
                <span class="detail-value">Function is the main requirement</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Cosmetics</span>
                <span class="detail-value">Minimal requirements</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Inspection</span>
                <span class="detail-value">Visual only, sampling acceptable</span>
              </div>
            </div>
            
            <div class="class-criteria">
              <h5>Acceptance Criteria</h5>
              <ul>
                <li>Solder joints must be functional</li>
                <li>Cosmetic defects acceptable if function not affected</li>
                <li>Wider tolerances on placement</li>
              </ul>
            </div>
          </div>
          
          <div class="class-card class-card--class2">
            <div class="class-header">
              <div class="class-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
                  <rect x="9" y="9" width="6" height="6"></rect>
                  <line x1="9" y1="1" x2="9" y2="4"></line>
                  <line x1="15" y1="1" x2="15" y2="4"></line>
                  <line x1="9" y1="20" x2="9" y2="23"></line>
                  <line x1="15" y1="20" x2="15" y2="23"></line>
                  <line x1="20" y1="9" x2="23" y2="9"></line>
                  <line x1="20" y1="14" x2="23" y2="14"></line>
                  <line x1="1" y1="9" x2="4" y2="9"></line>
                  <line x1="1" y1="14" x2="4" y2="14"></line>
                </svg>
              </div>
              <div class="class-badge">CLASS 2</div>
            </div>
            <h4 class="class-name">Dedicated Service Products</h4>
            <p class="class-subtitle">Industrial & Commercial</p>
            
            <div class="class-details">
              <div class="detail-item">
                <span class="detail-label">Examples</span>
                <span class="detail-value">Laptops, servers, industrial controls</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Reliability</span>
                <span class="detail-value">Extended life, uninterrupted service</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Cosmetics</span>
                <span class="detail-value">Moderate requirements</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Inspection</span>
                <span class="detail-value">AOI + sampling AXI for BGAs</span>
              </div>
            </div>
            
            <div class="class-criteria">
              <h5>Acceptance Criteria</h5>
              <ul>
                <li>Solder joints must meet defined criteria</li>
                <li>Limited cosmetic defects allowed</li>
                <li>Tighter placement tolerances</li>
                <li>Process documentation required</li>
              </ul>
            </div>
          </div>
          
          <div class="class-card class-card--class3">
            <div class="class-header">
              <div class="class-icon">
                <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                  <path d="M2 17l10 5 10-5"></path>
                  <path d="M2 12l10 5 10-5"></path>
                </svg>
              </div>
              <div class="class-badge">CLASS 3</div>
            </div>
            <h4 class="class-name">High Performance Products</h4>
            <p class="class-subtitle">Aerospace, Medical, Military</p>
            
            <div class="class-details">
              <div class="detail-item">
                <span class="detail-label">Examples</span>
                <span class="detail-value">Avionics, pacemakers, satellites</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Reliability</span>
                <span class="detail-value">Failure is not an option</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Cosmetics</span>
                <span class="detail-value">Stringent requirements</span>
              </div>
              <div class="detail-item">
                <span class="detail-label">Inspection</span>
                <span class="detail-value">100% AOI + AXI, cross-sectioning</span>
              </div>
            </div>
            
            <div class="class-criteria">
              <h5>Acceptance Criteria</h5>
              <ul>
                <li>Zero defects tolerance</li>
                <li>Full traceability required</li>
                <li>Strictest placement tolerances</li>
                <li>Environmental testing required</li>
                <li>Lot-by-lot qualification</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Inspection Methods -->
      <div class="inspection-section">
        <h3 class="subsection-title">Inspection Methods</h3>
        
        <div class="inspection-grid">
          <div class="inspection-card">
            <div class="inspection-icon inspection-icon--spi">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </div>
            <h4>SPI</h4>
            <p class="inspection-full">Solder Paste Inspection</p>
            <p class="inspection-desc">3D inspection of paste deposits after printing. Measures height, volume, and area.</p>
            <div class="inspection-when">
              <strong>When:</strong> After stencil printing, before placement
            </div>
            <div class="inspection-detects">
              <strong>Detects:</strong> Insufficient paste, bridging, misalignment, slump
            </div>
          </div>
          
          <div class="inspection-card">
            <div class="inspection-icon inspection-icon--aoi">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <circle cx="12" cy="12" r="4"></circle>
                <line x1="21.17" y1="8" x2="12" y2="8"></line>
                <line x1="3.95" y1="6.06" x2="8.54" y2="14"></line>
                <line x1="10.88" y1="21.94" x2="15.46" y2="14"></line>
              </svg>
            </div>
            <h4>AOI</h4>
            <p class="inspection-full">Automated Optical Inspection</p>
            <p class="inspection-desc">Camera-based inspection of assembled boards. Uses pattern matching and algorithms.</p>
            <div class="inspection-when">
              <strong>When:</strong> After reflow (post-reflow AOI)
            </div>
            <div class="inspection-detects">
              <strong>Detects:</strong> Missing parts, polarity, tombstoning, solder bridges
            </div>
          </div>
          
          <div class="inspection-card">
            <div class="inspection-icon inspection-icon--axi">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="14.31" y1="8" x2="20.05" y2="17.94"></line>
                <line x1="9.69" y1="8" x2="21.17" y2="8"></line>
                <line x1="7.38" y1="12" x2="13.12" y2="2.06"></line>
                <line x1="9.69" y1="16" x2="3.95" y2="6.06"></line>
                <line x1="14.31" y1="16" x2="2.83" y2="16"></line>
                <line x1="16.62" y1="12" x2="10.88" y2="21.94"></line>
              </svg>
            </div>
            <h4>AXI</h4>
            <p class="inspection-full">Automated X-ray Inspection</p>
            <p class="inspection-desc">X-ray imaging for hidden solder joints. Essential for BGAs, QFNs, and bottom-terminated components.</p>
            <div class="inspection-when">
              <strong>When:</strong> After reflow for hidden joints
            </div>
            <div class="inspection-detects">
              <strong>Detects:</strong> BGA voids, head-in-pillow, opens under QFNs
            </div>
          </div>
          
          <div class="inspection-card">
            <div class="inspection-icon inspection-icon--ict">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M18 3a3 3 0 0 0-3 3v12a3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3H6a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3V6a3 3 0 0 0-3-3 3 3 0 0 0-3 3 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 3 3 0 0 0-3-3z"></path>
              </svg>
            </div>
            <h4>ICT</h4>
            <p class="inspection-full">In-Circuit Test</p>
            <p class="inspection-desc">Electrical testing using bed-of-nails fixture. Tests component values and connectivity.</p>
            <div class="inspection-when">
              <strong>When:</strong> After assembly, before functional test
            </div>
            <div class="inspection-detects">
              <strong>Detects:</strong> Wrong values, opens, shorts, missing components
            </div>
          </div>
        </div>
      </div>
      
      <!-- Acceptance Criteria Quick Reference -->
      <div class="criteria-section">
        <h3 class="subsection-title">Solder Joint Acceptance Criteria</h3>
        
        <div class="criteria-table-wrapper">
          <table class="criteria-table">
            <thead>
              <tr>
                <th>Criteria</th>
                <th>Class 1</th>
                <th>Class 2</th>
                <th>Class 3</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="criteria-name">Solder Fillet Height (min)</td>
                <td>Wetting visible</td>
                <td>≥ 25% lead height</td>
                <td>≥ 50% lead height</td>
              </tr>
              <tr>
                <td class="criteria-name">Heel Fillet</td>
                <td>Not required</td>
                <td>Preferred</td>
                <td>Required</td>
              </tr>
              <tr>
                <td class="criteria-name">Solder Coverage on Pad</td>
                <td>≥ 50%</td>
                <td>≥ 75%</td>
                <td>100%</td>
              </tr>
              <tr>
                <td class="criteria-name">BGA Voiding (max)</td>
                <td>≤ 50% ball area</td>
                <td>≤ 30% ball area</td>
                <td>≤ 25% ball area</td>
              </tr>
              <tr>
                <td class="criteria-name">Component Offset (max)</td>
                <td>50% off pad</td>
                <td>25% off pad</td>
                <td>No overhang</td>
              </tr>
              <tr>
                <td class="criteria-name">Tombstoning</td>
                <td>Reject if open</td>
                <td>Reject</td>
                <td>Reject</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading standards data...</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  glossary: {
    type: Object,
    default: () => ({})
  }
})

const hasData = computed(() => {
  return props.glossary?.standards?.length > 0
})

const primaryStandards = ['j-std-001', 'ipc-a-610', 'ipc-7525', 'ipc-7527']

function isPrimaryStandard(id) {
  return primaryStandards.includes(id)
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

.standards-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

/* Subsection Titles */
.subsection-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

/* Standards Grid */
.standards-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--space-4);
}

.standard-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: border-color var(--transition-fast);
}

.standard-card:hover {
  border-color: var(--color-primary-300);
}

.standard-card--primary {
  border-left: 4px solid var(--color-primary-500);
}

.standard-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: var(--space-2);
}

.standard-id {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  font-family: var(--font-family-mono);
  color: var(--color-primary-600);
}

.primary-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: var(--radius-full);
}

.standard-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
  line-height: var(--line-height-snug);
}

.standard-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Classes Section */
.classes-intro {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-6) 0;
  line-height: var(--line-height-relaxed);
}

.classes-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--space-6);
}

.class-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  border-top: 4px solid var(--color-border-light);
}

.class-card--class1 {
  border-top-color: #10b981;
}

.class-card--class2 {
  border-top-color: #f59e0b;
}

.class-card--class3 {
  border-top-color: #ef4444;
}

.class-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.class-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  border-radius: var(--radius-lg);
}

.class-card--class1 .class-icon {
  background-color: #d1fae5;
  color: #059669;
}

.class-card--class2 .class-icon {
  background-color: #fef3c7;
  color: #d97706;
}

.class-card--class3 .class-icon {
  background-color: #fecaca;
  color: #dc2626;
}

.class-badge {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-default);
  background-color: var(--color-surface-elevated);
  color: var(--color-text-secondary);
}

.class-name {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.class-subtitle {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: var(--space-1) 0 var(--space-4) 0;
}

.class-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.detail-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.detail-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.detail-value {
  color: var(--color-text-primary);
  text-align: right;
}

.class-criteria {
  border-top: 1px solid var(--color-border-light);
  padding-top: var(--space-4);
}

.class-criteria h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.class-criteria ul {
  margin: 0;
  padding-left: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.class-criteria li {
  margin-bottom: var(--space-1);
}

/* Inspection Grid */
.inspection-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--space-4);
}

.inspection-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
}

.inspection-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 56px;
  height: 56px;
  margin: 0 auto var(--space-3);
  border-radius: var(--radius-full);
}

.inspection-icon--spi {
  background-color: #dbeafe;
  color: #2563eb;
}

.inspection-icon--aoi {
  background-color: #d1fae5;
  color: #059669;
}

.inspection-icon--axi {
  background-color: #fef3c7;
  color: #d97706;
}

.inspection-icon--ict {
  background-color: #ede9fe;
  color: #7c3aed;
}

.inspection-card h4 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0;
}

.inspection-full {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
  margin: var(--space-1) 0 var(--space-3) 0;
}

.inspection-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4) 0;
  line-height: var(--line-height-relaxed);
  text-align: left;
}

.inspection-when,
.inspection-detects {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: left;
  margin-bottom: var(--space-2);
}

.inspection-when strong,
.inspection-detects strong {
  color: var(--color-text-primary);
}

/* Criteria Table */
.criteria-table-wrapper {
  overflow-x: auto;
}

.criteria-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.criteria-table th,
.criteria-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.criteria-table th {
  background-color: var(--color-surface-elevated);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.criteria-table th:nth-child(2) {
  background-color: #d1fae5;
  color: #065f46;
}

.criteria-table th:nth-child(3) {
  background-color: #fef3c7;
  color: #92400e;
}

.criteria-table th:nth-child(4) {
  background-color: #fecaca;
  color: #991b1b;
}

.criteria-table td {
  color: var(--color-text-secondary);
}

.criteria-name {
  font-weight: var(--font-weight-medium);
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
  
  .standards-grid {
    grid-template-columns: 1fr;
  }
  
  .classes-comparison {
    grid-template-columns: 1fr;
  }
  
  .inspection-grid {
    grid-template-columns: 1fr;
  }
  
  .detail-item {
    flex-direction: column;
    gap: var(--space-1);
  }
  
  .detail-value {
    text-align: left;
  }
}
</style>
