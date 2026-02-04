<template>
  <section id="shapes" class="wb-section wb-section--alt">
    <div class="section-header">
      <h2 class="section-title">Wire Shapes</h2>
      <p class="section-description">
        Wire cross-section geometry significantly impacts electrical performance, 
        especially at RF and microwave frequencies.
      </p>
    </div>
    
    <div class="shapes-comparison">
      <!-- Round Wire Card -->
      <div class="shape-card">
        <div class="shape-visual">
          <div class="shape-icon shape-icon--round">
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
              <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="4"/>
              <circle cx="50" cy="50" r="35" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
          <span class="shape-label">Cross Section</span>
        </div>
        
        <div class="shape-content">
          <h3 class="shape-title">Round Wire</h3>
          <div class="shape-badge">99% Market Share</div>
          
          <div class="shape-specs">
            <div class="spec-item">
              <span class="spec-label">Signal Wire</span>
              <span class="spec-value">15-75µm</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Power Wire</span>
              <span class="spec-value">up to 500µm</span>
            </div>
          </div>
          
          <div class="shape-features">
            <h4>Characteristics</h4>
            <ul>
              <li>Standard inductance profile</li>
              <li>Universal tooling compatibility</li>
              <li>Well-established process parameters</li>
              <li>
                <TechnicalTooltip 
                  term="Skin Effect" 
                  definition="At high frequencies (>10 GHz), current flows only on the surface (skin) of the conductor. Round wires have higher impedance due to skin effect."
                >
                  <span class="term-highlight">Skin effect</span>
                </TechnicalTooltip>
                increases impedance at &gt;10 GHz
              </li>
            </ul>
          </div>
          
          <div class="shape-applications">
            <h4>Applications</h4>
            <div class="app-tags">
              <span class="app-tag">General IC Bonding</span>
              <span class="app-tag">Signal Connections</span>
              <span class="app-tag">Power Connections</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Ribbon Wire Card -->
      <div class="shape-card shape-card--featured">
        <div class="featured-badge">RF/Microwave Preferred</div>
        
        <div class="shape-visual">
          <div class="shape-icon shape-icon--ribbon">
            <svg viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="15" width="80" height="30" rx="4" fill="none" stroke="currentColor" stroke-width="4"/>
              <rect x="14" y="19" width="72" height="22" rx="2" fill="currentColor" opacity="0.2"/>
            </svg>
          </div>
          <span class="shape-label">Cross Section</span>
        </div>
        
        <div class="shape-content">
          <h3 class="shape-title">Ribbon Wire</h3>
          <div class="shape-badge shape-badge--accent">Specialized</div>
          
          <div class="shape-specs">
            <div class="spec-item">
              <span class="spec-label">Cross Section</span>
              <span class="spec-value">Rectangular (flat)</span>
            </div>
            <div class="spec-item">
              <span class="spec-label">Bonding</span>
              <span class="spec-value">Wedge Only</span>
            </div>
          </div>
          
          <div class="shape-features">
            <h4>Advantages</h4>
            <ul>
              <li class="highlight">
                <strong>Reduced skin effect losses</strong> - Large surface area
              </li>
              <li class="highlight">
                <strong>Significantly lower inductance</strong> than round wire
              </li>
              <li>Better heat dissipation (larger contact area)</li>
              <li>Stronger heel (stress distributed across width)</li>
              <li>Reduced fatigue failures</li>
            </ul>
          </div>
          
          <div class="shape-applications">
            <h4>Applications</h4>
            <div class="app-tags">
              <span class="app-tag app-tag--primary">RF Devices</span>
              <span class="app-tag app-tag--primary">Microwave Devices</span>
              <span class="app-tag">GaAs Chips</span>
              <span class="app-tag">GaN Chips</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Skin Effect Explanation -->
    <div class="skin-effect-explainer">
      <div class="explainer-icon">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
      </div>
      <div class="explainer-content">
        <h4>Understanding Skin Effect</h4>
        <p>
          At high frequencies (&gt;10 GHz), electrical current tends to flow near the surface 
          of a conductor rather than through its entire cross-section. This phenomenon, called 
          <strong>skin effect</strong>, effectively reduces the usable conductor area and 
          increases resistance.
        </p>
        <p>
          <strong>Why ribbon wire helps:</strong> The flat, rectangular cross-section of ribbon 
          wire provides a much larger surface area relative to its cross-sectional area compared 
          to round wire. This larger "skin" allows more current to flow at high frequencies, 
          reducing losses and improving RF performance.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import TechnicalTooltip from '@/components/shared/TechnicalTooltip.vue'
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
  margin-bottom: var(--space-10);
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

.shapes-comparison {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.shape-card {
  position: relative;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  transition: transform var(--transition-default), box-shadow var(--transition-default);
}

.shape-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.shape-card--featured {
  border-color: var(--color-accent-400);
  box-shadow: var(--shadow-accent);
}

.featured-badge {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-accent-500);
  color: var(--color-text-inverse);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.shape-visual {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: var(--space-8) var(--space-6);
  background: linear-gradient(135deg, var(--color-primary-50) 0%, var(--color-primary-100) 100%);
}

.shape-card--featured .shape-visual {
  background: linear-gradient(135deg, var(--color-accent-50) 0%, var(--color-accent-100) 100%);
}

.shape-icon {
  width: 100px;
  height: 100px;
  color: var(--color-primary-500);
  margin-bottom: var(--space-2);
}

.shape-card--featured .shape-icon {
  color: var(--color-accent-600);
}

.shape-icon--ribbon {
  height: 60px;
}

.shape-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.shape-content {
  padding: var(--space-6);
}

.shape-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.shape-badge {
  display: inline-block;
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  margin-bottom: var(--space-4);
}

.shape-badge--accent {
  background-color: var(--color-accent-100);
  color: var(--color-accent-800);
}

.shape-specs {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  margin-bottom: var(--space-4);
}

.spec-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.spec-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.spec-value {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.shape-features h4,
.shape-applications h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.shape-features ul {
  list-style: none;
  padding: 0;
  margin: 0 0 var(--space-4);
}

.shape-features li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-normal);
}

.shape-features li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background-color: var(--color-primary-400);
  border-radius: var(--radius-full);
}

.shape-card--featured .shape-features li::before {
  background-color: var(--color-accent-500);
}

.shape-features li.highlight {
  color: var(--color-text-primary);
}

.shape-features li.highlight::before {
  background-color: var(--color-success-main);
}

.app-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.app-tag {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-full);
}

.app-tag--primary {
  background-color: var(--color-accent-100);
  color: var(--color-accent-800);
}

.term-highlight {
  color: var(--color-accent-700);
  font-weight: var(--font-weight-medium);
  border-bottom: 1px dashed var(--color-accent-500);
  cursor: help;
}

/* Skin Effect Explainer */
.skin-effect-explainer {
  display: flex;
  gap: var(--space-5);
  padding: var(--space-6);
  background: linear-gradient(135deg, var(--color-info-light) 0%, var(--color-primary-50) 100%);
  border: 1px solid var(--color-primary-200);
  border-radius: var(--radius-xl);
}

.explainer-icon {
  flex-shrink: 0;
  display: flex;
  align-items: flex-start;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  border-radius: var(--radius-full);
  padding: var(--space-2);
}

.explainer-content h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-700);
  margin-bottom: var(--space-3);
}

.explainer-content p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin-bottom: var(--space-3);
}

.explainer-content p:last-child {
  margin-bottom: 0;
}

.explainer-content strong {
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .shapes-comparison {
    grid-template-columns: 1fr;
  }
  
  .shape-specs {
    grid-template-columns: 1fr;
  }
  
  .skin-effect-explainer {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
