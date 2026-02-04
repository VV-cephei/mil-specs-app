<template>
  <section id="stencil-design" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">Stencil Design</h2>
      <p class="section-description">
        Stencil printing deposits solder paste onto PCB pads. It is the single biggest 
        source of defects in SMT assembly.
      </p>
    </div>
    
    <div v-if="hasData" class="stencil-content">
      <!-- Stencil Types Section -->
      <div class="stencil-types-section">
        <h3 class="subsection-title">Stencil Types</h3>
        
        <div class="types-comparison">
          <div class="type-card">
            <div class="type-image">
              <img 
                src="/images/smt/framed-frameless-stencil.jpg" 
                alt="Framed vs Frameless Stencils"
                loading="lazy"
              />
            </div>
            <div class="type-content">
              <h4>{{ stencilDesign.stencilTypes?.framed?.name || 'Framed Stencil' }}</h4>
              <p class="type-description">
                {{ stencilDesign.stencilTypes?.framed?.description }}
              </p>
              <div class="type-features">
                <div class="feature-list feature-list--pros">
                  <h5>Advantages</h5>
                  <ul>
                    <li v-for="(adv, idx) in stencilDesign.stencilTypes?.framed?.advantages" :key="idx">
                      {{ adv }}
                    </li>
                  </ul>
                </div>
                <div class="feature-list feature-list--cons">
                  <h5>Disadvantages</h5>
                  <ul>
                    <li v-for="(dis, idx) in stencilDesign.stencilTypes?.framed?.disadvantages" :key="idx">
                      {{ dis }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <div class="type-card">
            <div class="type-content">
              <h4>{{ stencilDesign.stencilTypes?.frameless?.name || 'Frameless Stencil' }}</h4>
              <p class="type-description">
                {{ stencilDesign.stencilTypes?.frameless?.description }}
              </p>
              <div class="type-features">
                <div class="feature-list feature-list--pros">
                  <h5>Advantages</h5>
                  <ul>
                    <li v-for="(adv, idx) in stencilDesign.stencilTypes?.frameless?.advantages" :key="idx">
                      {{ adv }}
                    </li>
                  </ul>
                </div>
                <div class="feature-list feature-list--cons">
                  <h5>Disadvantages</h5>
                  <ul>
                    <li v-for="(dis, idx) in stencilDesign.stencilTypes?.frameless?.disadvantages" :key="idx">
                      {{ dis }}
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Stencil Materials -->
      <div v-if="stencilDesign.overview?.materials" class="materials-section">
        <h3 class="subsection-title">Stencil Materials</h3>
        
        <div class="materials-grid">
          <div 
            v-for="(material, key) in stencilDesign.overview.materials" 
            :key="key" 
            class="material-card"
          >
            <h4>{{ material.name }}</h4>
            <p class="material-description">{{ material.description }}</p>
            
            <div class="material-features">
              <div v-if="material.advantages?.length" class="feature-list feature-list--pros">
                <h5>Pros</h5>
                <ul>
                  <li v-for="(adv, idx) in material.advantages" :key="idx">{{ adv }}</li>
                </ul>
              </div>
              <div v-if="material.disadvantages?.length" class="feature-list feature-list--cons">
                <h5>Cons</h5>
                <ul>
                  <li v-for="(dis, idx) in material.disadvantages" :key="idx">{{ dis }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Design Rules Section -->
      <div v-if="stencilDesign.designRules" class="design-rules-section">
        <h3 class="subsection-title">Design Rules</h3>
        
        <div class="rules-grid">
          <!-- Aspect Ratio -->
          <div v-if="stencilDesign.designRules.aspectRatio" class="rule-card">
            <div class="rule-header">
              <h4>{{ stencilDesign.designRules.aspectRatio.name }}</h4>
              <span class="rule-minimum">Min: {{ stencilDesign.designRules.aspectRatio.minimum }}</span>
            </div>
            
            <div class="rule-formula">
              <code>{{ stencilDesign.designRules.aspectRatio.formula }}</code>
            </div>
            
            <p class="rule-description">{{ stencilDesign.designRules.aspectRatio.description }}</p>
            
            <div v-if="stencilDesign.designRules.aspectRatio.example" class="rule-example">
              <h5>Example</h5>
              <dl>
                <div class="example-row">
                  <dt>Aperture Width</dt>
                  <dd>{{ stencilDesign.designRules.aspectRatio.example.apertureWidth }}</dd>
                </div>
                <div class="example-row">
                  <dt>Stencil Thickness</dt>
                  <dd>{{ stencilDesign.designRules.aspectRatio.example.stencilThickness }}</dd>
                </div>
                <div class="example-row example-row--result">
                  <dt>Ratio</dt>
                  <dd>{{ stencilDesign.designRules.aspectRatio.example.ratio }}</dd>
                </div>
                <div class="example-row">
                  <dt>Result</dt>
                  <dd class="result-pass">{{ stencilDesign.designRules.aspectRatio.example.result }}</dd>
                </div>
              </dl>
            </div>
          </div>
          
          <!-- Area Ratio -->
          <div v-if="stencilDesign.designRules.areaRatio" class="rule-card rule-card--highlight">
            <div class="rule-header">
              <h4>{{ stencilDesign.designRules.areaRatio.name }}</h4>
              <span class="rule-minimum">Min: {{ stencilDesign.designRules.areaRatio.minimum }}</span>
            </div>
            
            <div class="rule-formula">
              <code>{{ stencilDesign.designRules.areaRatio.formula }}</code>
            </div>
            
            <p class="rule-description">{{ stencilDesign.designRules.areaRatio.description }}</p>
            
            <div v-if="stencilDesign.designRules.areaRatio.calculation" class="rule-calculations">
              <h5>Calculations</h5>
              <div class="calculation-item">
                <span class="calc-label">Rectangular:</span>
                <code>{{ stencilDesign.designRules.areaRatio.calculation.rectangular }}</code>
              </div>
              <div class="calculation-item">
                <span class="calc-label">Circular:</span>
                <code>{{ stencilDesign.designRules.areaRatio.calculation.circular }}</code>
              </div>
            </div>
            
            <div v-if="stencilDesign.designRules.areaRatio.trenchInsight" class="trench-insight">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>{{ stencilDesign.designRules.areaRatio.trenchInsight }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Thickness Guide Section -->
      <div v-if="stencilDesign.thicknessGuide?.length" class="thickness-section">
        <h3 class="subsection-title">Stencil Thickness Selection Guide</h3>
        
        <div class="thickness-table-wrapper">
          <table class="thickness-table">
            <thead>
              <tr>
                <th>Thickness</th>
                <th>Applications</th>
                <th>Paste Type</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(guide, idx) in stencilDesign.thicknessGuide" :key="idx">
                <td class="thickness-value">{{ guide.thickness }}</td>
                <td class="thickness-apps">
                  <span v-for="app in guide.applications" :key="app" class="app-tag">
                    {{ app }}
                  </span>
                </td>
                <td class="paste-type">{{ guide.pasteType }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Aperture Modifications Section -->
      <div v-if="stencilDesign.apertureModifications" class="modifications-section">
        <h3 class="subsection-title">Aperture Modifications</h3>
        
        <div class="modifications-grid">
          <div 
            v-for="(mod, key) in stencilDesign.apertureModifications" 
            :key="key" 
            class="modification-card"
          >
            <h4>{{ mod.name }}</h4>
            <p class="mod-description">{{ mod.description }}</p>
            <p class="mod-purpose">
              <strong>Purpose:</strong> {{ mod.purpose }}
            </p>
            <p v-if="mod.typical" class="mod-typical">
              <strong>Typical:</strong> {{ mod.typical }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Stencil Images Gallery -->
      <div class="stencil-gallery">
        <h3 class="subsection-title">Stencil Manufacturing</h3>
        
        <div class="gallery-grid">
          <div class="gallery-item">
            <img 
              src="/images/smt/stencils.jpg" 
              alt="SMT Stencils"
              loading="lazy"
            />
            <span class="gallery-caption">SMT Stencils</span>
          </div>
          <div class="gallery-item">
            <img 
              src="/images/smt/stencil-laser.jpg" 
              alt="Laser Cut Stencil"
              loading="lazy"
            />
            <span class="gallery-caption">Laser Cut Stencil</span>
          </div>
        </div>
      </div>
      
      <!-- Process Parameters Section -->
      <div v-if="stencilDesign.processParameters" class="process-section">
        <h3 class="subsection-title">Process Parameters</h3>
        
        <div class="process-grid">
          <!-- Squeegee Parameters -->
          <div v-if="stencilDesign.processParameters.squeegee" class="process-card">
            <h4>Squeegee Settings</h4>
            
            <dl class="process-params">
              <div v-if="stencilDesign.processParameters.squeegee.angle" class="param-row">
                <dt>Angle</dt>
                <dd>
                  {{ stencilDesign.processParameters.squeegee.angle.standard }}
                  <span v-if="stencilDesign.processParameters.squeegee.angle.alternative" class="param-alt">
                    (or {{ stencilDesign.processParameters.squeegee.angle.alternative }})
                  </span>
                </dd>
              </div>
              
              <div v-if="stencilDesign.processParameters.squeegee.pressure" class="param-row">
                <dt>Pressure</dt>
                <dd>{{ stencilDesign.processParameters.squeegee.pressure.value }}</dd>
              </div>
              
              <div v-if="stencilDesign.processParameters.squeegee.speed" class="param-row">
                <dt>Speed</dt>
                <dd>{{ stencilDesign.processParameters.squeegee.speed.range }}</dd>
              </div>
            </dl>
            
            <div v-if="stencilDesign.processParameters.squeegee.pressure" class="param-issues">
              <div class="issue-item issue-item--high">
                <span class="issue-label">Too High:</span>
                <span class="issue-effect">{{ stencilDesign.processParameters.squeegee.pressure.tooHigh }}</span>
              </div>
              <div class="issue-item issue-item--low">
                <span class="issue-label">Too Low:</span>
                <span class="issue-effect">{{ stencilDesign.processParameters.squeegee.pressure.tooLow }}</span>
              </div>
            </div>
          </div>
          
          <!-- Separation Parameters -->
          <div v-if="stencilDesign.processParameters.separation" class="process-card">
            <h4>Separation Settings</h4>
            
            <dl class="process-params">
              <div class="param-row">
                <dt>Speed</dt>
                <dd>{{ stencilDesign.processParameters.separation.speed }}</dd>
              </div>
              <div class="param-row">
                <dt>Purpose</dt>
                <dd>{{ stencilDesign.processParameters.separation.purpose }}</dd>
              </div>
            </dl>
            
            <div class="param-issues">
              <div class="issue-item issue-item--high">
                <span class="issue-label">Too Fast:</span>
                <span class="issue-effect">{{ stencilDesign.processParameters.separation.tooFast }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading stencil design data...</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  stencilDesign: {
    type: Object,
    default: () => ({})
  }
})

const hasData = computed(() => {
  return props.stencilDesign?.designRules || 
         props.stencilDesign?.thicknessGuide?.length > 0
})
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

.stencil-content {
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

/* Stencil Types */
.types-comparison {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-6);
}

.type-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.type-image {
  width: 100%;
  height: 200px;
  overflow: hidden;
}

.type-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.type-content {
  padding: var(--space-5);
}

.type-content h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.type-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4) 0;
}

.type-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-4);
}

/* Feature Lists */
.feature-list h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.feature-list ul {
  margin: 0;
  padding-left: var(--space-4);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.feature-list li {
  margin-bottom: var(--space-1);
}

.feature-list--pros {
  border-left: 3px solid var(--color-success-main);
  padding-left: var(--space-3);
}

.feature-list--cons {
  border-left: 3px solid var(--color-warning-main);
  padding-left: var(--space-3);
}

/* Materials Grid */
.materials-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
}

.material-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.material-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.material-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4) 0;
}

.material-features {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

/* Design Rules */
.rules-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-6);
}

.rule-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.rule-card--highlight {
  border-color: var(--color-primary-300);
  background-color: var(--color-primary-50);
}

.rule-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--space-3);
}

.rule-header h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.rule-minimum {
  display: inline-flex;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: var(--radius-default);
}

.rule-formula {
  margin-bottom: var(--space-3);
}

.rule-formula code {
  display: inline-block;
  padding: var(--space-2) var(--space-3);
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  color: var(--color-text-primary);
}

.rule-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4) 0;
}

.rule-example {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  padding: var(--space-4);
  margin-bottom: var(--space-4);
}

.rule-example h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.example-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-1) 0;
  font-size: var(--font-size-sm);
}

.example-row dt {
  color: var(--color-text-secondary);
}

.example-row dd {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.example-row--result {
  border-top: 1px solid var(--color-border-light);
  margin-top: var(--space-2);
  padding-top: var(--space-2);
}

.result-pass {
  color: var(--color-success-main);
}

.rule-calculations {
  margin-bottom: var(--space-4);
}

.rule-calculations h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.calculation-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
}

.calc-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  min-width: 80px;
}

.calculation-item code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  background-color: var(--color-surface);
  padding: var(--space-1) var(--space-2);
  border-radius: var(--radius-default);
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

/* Thickness Table */
.thickness-table-wrapper {
  overflow-x: auto;
}

.thickness-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.thickness-table th,
.thickness-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.thickness-table th {
  background-color: var(--color-surface-elevated);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.thickness-value {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
  font-family: var(--font-family-mono);
}

.thickness-apps {
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

.paste-type {
  font-family: var(--font-family-mono);
  color: var(--color-text-secondary);
}

/* Modifications Grid */
.modifications-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--space-4);
}

.modification-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.modification-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.mod-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.mod-purpose,
.mod-typical {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.mod-purpose strong,
.mod-typical strong {
  color: var(--color-text-primary);
}

/* Gallery */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
}

.gallery-item {
  position: relative;
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.gallery-item img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  display: block;
}

.gallery-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: var(--space-2) var(--space-3);
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  color: white;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
}

/* Process Grid */
.process-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
  gap: var(--space-6);
}

.process-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.process-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

.process-params {
  margin-bottom: var(--space-4);
}

.param-row {
  display: flex;
  justify-content: space-between;
  padding: var(--space-2) 0;
  border-bottom: 1px solid var(--color-border-light);
  font-size: var(--font-size-sm);
}

.param-row:last-child {
  border-bottom: none;
}

.param-row dt {
  color: var(--color-text-secondary);
}

.param-row dd {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  margin: 0;
}

.param-alt {
  font-weight: var(--font-weight-normal);
  color: var(--color-text-secondary);
}

.param-issues {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.issue-item {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
}

.issue-item--high {
  background-color: var(--color-error-light);
}

.issue-item--low {
  background-color: var(--color-warning-light);
}

.issue-label {
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.issue-effect {
  color: var(--color-text-secondary);
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
  
  .types-comparison,
  .rules-grid,
  .process-grid {
    grid-template-columns: 1fr;
  }
  
  .type-features {
    grid-template-columns: 1fr;
  }
  
  .materials-grid,
  .modifications-grid,
  .gallery-grid {
    grid-template-columns: 1fr;
  }
}
</style>
