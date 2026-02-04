<template>
  <section id="process-overview" class="smt-section smt-overview">
    <div class="section-header">
      <h2>SMT Assembly Process Overview</h2>
      <p>Understanding the complete surface mount technology workflow from paste to product</p>
    </div>

    <!-- Process Line Image -->
    <div class="process-image-container">
      <img 
        src="/images/smt/process-line.png" 
        alt="Full automatic SMT line diagram showing PCB Loader, Automatic solder printer, Conveyor, SMT machine K1830, Online AOI, Reflow oven T12L, and PCB Unloader"
        class="process-image"
      />
      <p class="image-caption">Full automatic SMT production line with labeled equipment showing the step-by-step process flow</p>
    </div>

    <!-- Process Flow Timeline -->
    <div class="process-flow">
      <div class="flow-header">
        <h3>The 5-Step SMT Assembly Flow</h3>
        <p>Each step is critical to achieving high-quality solder joints</p>
      </div>

      <div class="timeline">
        <!-- Step 1: Stencil Printing -->
        <div class="timeline-step" @click="scrollToSection('stencil-design')">
          <div class="step-number step-number--critical">1</div>
          <div class="step-content">
            <div class="step-header">
              <h4>Stencil Printing</h4>
              <span class="defect-badge defect-badge--high">60% of defects</span>
            </div>
            <p class="step-description">
              Deposits solder paste onto PCB pads through a precision stencil. 
              This is the most critical step in the entire SMT process.
            </p>
            <ul class="step-details">
              <li>Stencil thickness: 100-150µm typical</li>
              <li>Area Ratio must be &gt;0.66 for proper release</li>
              <li>Squeegee angle: 60° standard</li>
            </ul>
            <span class="step-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              View Stencil Design Details
            </span>
          </div>
          <div class="step-connector"></div>
        </div>

        <!-- Step 2: SPI -->
        <div class="timeline-step">
          <div class="step-number">2</div>
          <div class="step-content">
            <div class="step-header">
              <h4>Solder Paste Inspection (SPI)</h4>
              <span class="defect-badge defect-badge--info">Quality Gate</span>
            </div>
            <p class="step-description">
              3D inspection using Moiré interferometry to measure paste volume, 
              height, and detect bridging before component placement.
            </p>
            <ul class="step-details">
              <li>Volume target: 100% (±50% limits)</li>
              <li>Height uniformity critical for coplanarity</li>
              <li>Detects wet bridges before placement</li>
            </ul>
          </div>
          <div class="step-connector"></div>
        </div>

        <!-- Step 3: Pick and Place -->
        <div class="timeline-step">
          <div class="step-number step-number--low">3</div>
          <div class="step-content">
            <div class="step-header">
              <h4>Pick and Place</h4>
              <span class="defect-badge defect-badge--low">10% of defects</span>
            </div>
            <p class="step-description">
              High-speed component placement using vision systems for alignment. 
              Modern machines achieve &gt;99.9% pick rate accuracy.
            </p>
            <ul class="step-details">
              <li>Turret heads for chip shooters (fast)</li>
              <li>Gantry heads for precision placement</li>
              <li>Fiducials for coordinate calibration</li>
            </ul>
          </div>
          <div class="step-connector"></div>
        </div>

        <!-- Step 4: Reflow Soldering -->
        <div class="timeline-step" @click="scrollToSection('reflow')">
          <div class="step-number step-number--medium">4</div>
          <div class="step-content">
            <div class="step-header">
              <h4>Reflow Soldering</h4>
              <span class="defect-badge defect-badge--medium">30% of defects</span>
            </div>
            <p class="step-description">
              Convection oven with 8-12 zones creates the thermal profile. 
              Four critical zones: Preheat, Soak, Reflow, and Cooling.
            </p>
            <ul class="step-details">
              <li>Preheat: 1-3°C/sec ramp rate</li>
              <li>Soak: 150-180°C for 60-90 seconds</li>
              <li>Peak: 235-250°C (SAC305)</li>
              <li>Cooling: &gt;4°C/sec for fine grain structure</li>
            </ul>
            <span class="step-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              View Reflow Profile Details
            </span>
          </div>
          <div class="step-connector"></div>
        </div>

        <!-- Step 5: Final Inspection -->
        <div class="timeline-step" @click="scrollToSection('inspection')">
          <div class="step-number">5</div>
          <div class="step-content">
            <div class="step-header">
              <h4>Final Inspection</h4>
              <span class="defect-badge defect-badge--info">IPC-A-610</span>
            </div>
            <p class="step-description">
              AOI (Automated Optical Inspection) and X-ray inspection per 
              IPC-A-610 standards. Classification determines acceptance criteria.
            </p>
            <ul class="step-details">
              <li>Class 1: Consumer electronics</li>
              <li>Class 2: Dedicated service equipment</li>
              <li>Class 3: High reliability (Aerospace/Medical)</li>
            </ul>
            <span class="step-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M5 12h14"></path>
                <path d="m12 5 7 7-7 7"></path>
              </svg>
              View Standards & Inspection
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- The 60-30-10 Rule Card -->
    <div class="rule-card">
      <div class="rule-header">
        <h3>The 60-30-10 Rule</h3>
        <p>Understanding defect sources is key to process improvement</p>
      </div>
      <div class="rule-bars">
        <div class="rule-bar rule-bar--printing">
          <div class="bar-fill" style="width: 60%"></div>
          <div class="bar-label">
            <span class="bar-percent">60%</span>
            <span class="bar-source">Stencil Printing</span>
          </div>
        </div>
        <div class="rule-bar rule-bar--reflow">
          <div class="bar-fill" style="width: 30%"></div>
          <div class="bar-label">
            <span class="bar-percent">30%</span>
            <span class="bar-source">Reflow Soldering</span>
          </div>
        </div>
        <div class="rule-bar rule-bar--placement">
          <div class="bar-fill" style="width: 10%"></div>
          <div class="bar-label">
            <span class="bar-percent">10%</span>
            <span class="bar-source">Pick & Place</span>
          </div>
        </div>
      </div>
      <p class="rule-insight">
        <strong>Key Insight:</strong> Focus process improvement efforts on stencil printing 
        and paste deposition to address the majority of SMT defects.
      </p>
    </div>

    <!-- Quick Links to Deep Dive Sections -->
    <div class="deep-dive-links">
      <h3>Explore Detailed Topics</h3>
      <div class="links-grid">
        <button class="link-card" @click="scrollToSection('materials')">
          <div class="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
            </svg>
          </div>
          <span class="link-title">Materials</span>
          <span class="link-desc">Substrates, alloys & finishes</span>
        </button>
        <button class="link-card" @click="scrollToSection('solder-paste')">
          <div class="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14 4h6v6h-6z"></path>
              <path d="M4 14h6v6H4z"></path>
              <path d="M17 17m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
              <path d="M7 7m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0"></path>
            </svg>
          </div>
          <span class="link-title">Solder Paste</span>
          <span class="link-desc">Rheology & powder types</span>
        </button>
        <button class="link-card" @click="scrollToSection('defects')">
          <div class="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="8" x2="12" y2="12"></line>
              <line x1="12" y1="16" x2="12.01" y2="16"></line>
            </svg>
          </div>
          <span class="link-title">Defects</span>
          <span class="link-desc">Analysis & troubleshooting</span>
        </button>
        <button class="link-card" @click="scrollToSection('tools')">
          <div class="link-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
            </svg>
          </div>
          <span class="link-title">Tools</span>
          <span class="link-desc">Calculators & builders</span>
        </button>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useSmoothScroll } from '@/composables/useSmoothScroll'

const { scrollToSection } = useSmoothScroll({
  duration: 600,
  offset: 100
})
</script>

<style scoped>
.smt-overview {
  scroll-margin-top: 80px;
}

.section-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.section-header h2 {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.section-header p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
}

/* Process Image */
.process-image-container {
  margin-bottom: var(--space-10);
  border-radius: var(--radius-lg);
  overflow: hidden;
  background-color: var(--color-surface);
  box-shadow: var(--shadow-md);
}

.process-image {
  width: 100%;
  height: auto;
  display: block;
}

.image-caption {
  padding: var(--space-3) var(--space-4);
  margin: 0;
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  background-color: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border-light);
}

/* Process Flow */
.process-flow {
  margin-bottom: var(--space-10);
}

.flow-header {
  text-align: center;
  margin-bottom: var(--space-8);
}

.flow-header h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.flow-header p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Timeline */
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

.timeline::before {
  content: '';
  position: absolute;
  left: 24px;
  top: 48px;
  bottom: 48px;
  width: 2px;
  background: linear-gradient(
    to bottom,
    var(--color-error-main) 0%,
    var(--color-error-main) 20%,
    var(--color-primary-500) 20%,
    var(--color-primary-500) 40%,
    var(--color-success-main) 40%,
    var(--color-success-main) 60%,
    var(--color-warning-main) 60%,
    var(--color-warning-main) 80%,
    var(--color-primary-500) 80%,
    var(--color-primary-500) 100%
  );
}

.timeline-step {
  position: relative;
  display: flex;
  gap: var(--space-4);
  padding-left: var(--space-2);
  cursor: pointer;
  transition: transform var(--transition-fast);
}

.timeline-step:hover {
  transform: translateX(4px);
}

.step-number {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-500);
  color: white;
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
  z-index: 1;
  box-shadow: var(--shadow-md);
}

.step-number--critical {
  background-color: var(--color-error-main);
}

.step-number--medium {
  background-color: var(--color-warning-main);
}

.step-number--low {
  background-color: var(--color-success-main);
}

.step-content {
  flex: 1;
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  transition: box-shadow var(--transition-fast), border-color var(--transition-fast);
}

.timeline-step:hover .step-content {
  box-shadow: var(--shadow-md);
  border-color: var(--color-primary-300);
}

.step-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-bottom: var(--space-3);
}

.step-header h4 {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.defect-badge {
  display: inline-flex;
  align-items: center;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  border-radius: var(--radius-full);
  text-transform: uppercase;
  letter-spacing: 0.5px;
}

.defect-badge--high {
  background-color: var(--color-error-light);
  color: var(--color-error-dark);
}

.defect-badge--medium {
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
}

.defect-badge--low {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.defect-badge--info {
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
}

.step-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-3) 0;
}

.step-details {
  margin: 0 0 var(--space-3) 0;
  padding-left: var(--space-5);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.step-details li {
  margin-bottom: var(--space-1);
}

.step-link {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-primary-600);
  transition: color var(--transition-fast);
}

.timeline-step:hover .step-link {
  color: var(--color-primary-700);
}

.step-link svg {
  transition: transform var(--transition-fast);
}

.timeline-step:hover .step-link svg {
  transform: translateX(4px);
}

/* 60-30-10 Rule Card */
.rule-card {
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-surface-elevated) 100%);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-8);
  margin-bottom: var(--space-10);
  box-shadow: var(--shadow-lg);
}

.rule-header {
  text-align: center;
  margin-bottom: var(--space-6);
}

.rule-header h3 {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.rule-header p {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  margin: 0;
}

.rule-bars {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  margin-bottom: var(--space-6);
}

.rule-bar {
  position: relative;
  height: 48px;
  background-color: var(--color-background-alt);
  border-radius: var(--radius-default);
  overflow: hidden;
}

.bar-fill {
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  border-radius: var(--radius-default);
  transition: width 1s ease-out;
}

.rule-bar--printing .bar-fill {
  background: linear-gradient(90deg, var(--color-error-main) 0%, var(--color-error-light) 100%);
}

.rule-bar--reflow .bar-fill {
  background: linear-gradient(90deg, var(--color-warning-main) 0%, var(--color-warning-light) 100%);
}

.rule-bar--placement .bar-fill {
  background: linear-gradient(90deg, var(--color-success-main) 0%, var(--color-success-light) 100%);
}

.bar-label {
  position: absolute;
  top: 50%;
  left: var(--space-4);
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: var(--space-3);
  z-index: 1;
}

.bar-percent {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.bar-source {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
}

.rule-insight {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
  padding: var(--space-4);
  background-color: var(--color-primary-50);
  border-radius: var(--radius-default);
  border-left: 4px solid var(--color-primary-500);
}

.rule-insight strong {
  color: var(--color-primary-700);
}

/* Deep Dive Links */
.deep-dive-links {
  text-align: center;
}

.deep-dive-links h3 {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-6) 0;
}

.links-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.link-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.link-card:hover {
  background-color: var(--color-surface-elevated);
  border-color: var(--color-primary-300);
  transform: translateY(-2px);
  box-shadow: var(--shadow-md);
}

.link-card:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.link-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.link-card:hover .link-icon {
  background-color: var(--color-primary-500);
  color: white;
}

.link-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.link-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .links-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .section-header h2 {
    font-size: var(--font-size-2xl);
  }

  .timeline::before {
    left: 20px;
  }

  .step-number {
    width: 40px;
    height: 40px;
    font-size: var(--font-size-lg);
  }

  .step-content {
    padding: var(--space-4);
  }

  .step-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .step-header h4 {
    font-size: var(--font-size-base);
  }

  .rule-card {
    padding: var(--space-5);
  }

  .rule-header h3 {
    font-size: var(--font-size-xl);
  }

  .bar-percent {
    font-size: var(--font-size-lg);
  }

  .bar-source {
    font-size: var(--font-size-sm);
  }

  .links-grid {
    grid-template-columns: repeat(2, 1fr);
    gap: var(--space-3);
  }

  .link-card {
    padding: var(--space-4);
  }

  .link-icon {
    width: 40px;
    height: 40px;
  }
}

@media (max-width: 480px) {
  .links-grid {
    grid-template-columns: 1fr;
  }

  .link-card {
    flex-direction: row;
    justify-content: flex-start;
    text-align: left;
  }

  .link-icon {
    flex-shrink: 0;
  }
}
</style>
