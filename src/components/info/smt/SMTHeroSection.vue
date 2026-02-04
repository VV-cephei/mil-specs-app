<template>
  <section class="smt-hero" id="hero">
    <div class="hero-background">
      <img src="/images/smt/background.jpg" alt="" aria-hidden="true" />
      <div class="hero-overlay"></div>
    </div>
    <div class="hero-content">
      <h1 class="hero-title">SMT Manufacturing Guide</h1>
      <p class="hero-subtitle">
        Surface Mount Technology - From Paste to Product
      </p>
      <p class="hero-description">
        The definitive reference for PCB assembly engineers covering materials, 
        solder paste, stencil design, reflow profiles, and defect analysis.
      </p>
      <p class="hero-curator">Curated by David Kueper</p>
    </div>
    
    <div class="hero-stats">
      <div class="stat-card stat-card--printing">
        <span class="stat-value">60%</span>
        <span class="stat-label">Defects from Printing</span>
        <span class="stat-detail">Stencil & paste issues</span>
      </div>
      <div class="stat-card stat-card--reflow">
        <span class="stat-value">30%</span>
        <span class="stat-label">Defects from Reflow</span>
        <span class="stat-detail">Profile & thermal issues</span>
      </div>
      <div class="stat-card stat-card--placement">
        <span class="stat-value">10%</span>
        <span class="stat-label">Defects from Placement</span>
        <span class="stat-detail">Pick & place errors</span>
      </div>
    </div>
    
    <div class="hero-rule">
      <span class="rule-label">The 60-30-10 Rule</span>
      <span class="rule-description">Understanding defect sources is key to process improvement</span>
    </div>
  </section>
</template>

<script setup>
// No props or state needed for hero section
</script>

<style scoped>
.smt-hero {
  position: relative;
  min-height: 500px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: var(--space-16) var(--space-6);
  overflow: hidden;
}

.hero-background {
  position: absolute;
  inset: 0;
  z-index: 0;
}

.hero-background img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    135deg,
    rgba(15, 23, 42, 0.95) 0%,
    rgba(30, 41, 59, 0.9) 50%,
    rgba(51, 65, 85, 0.85) 100%
  );
}

.hero-content {
  position: relative;
  z-index: 1;
  max-width: 800px;
  margin: 0 auto var(--space-12);
  text-align: center;
}

.hero-title {
  font-size: var(--font-size-5xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-4);
  letter-spacing: var(--letter-spacing-tight);
  color: #ffffff;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

.hero-subtitle {
  font-size: var(--font-size-xl);
  color: #ffd54f;
  margin-bottom: var(--space-4);
  font-weight: var(--font-weight-medium);
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.2);
}

.hero-description {
  font-size: var(--font-size-lg);
  color: rgba(255, 255, 255, 0.95);
  line-height: var(--line-height-relaxed);
  max-width: 600px;
  margin: 0 auto;
}

.hero-curator {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
  margin-top: var(--space-4);
  font-style: italic;
  letter-spacing: var(--letter-spacing-wide);
}

.hero-stats {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-4);
  max-width: 900px;
  margin: 0 auto var(--space-8);
}

.stat-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  align-items: center;
  transition: transform var(--transition-default), background-color var(--transition-default);
  border: 1px solid rgba(255, 255, 255, 0.1);
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.stat-card--printing {
  border-top: 3px solid #ef4444;
}

.stat-card--printing .stat-value {
  color: #fca5a5;
}

.stat-card--reflow {
  border-top: 3px solid #f59e0b;
}

.stat-card--reflow .stat-value {
  color: #fcd34d;
}

.stat-card--placement {
  border-top: 3px solid #22c55e;
}

.stat-card--placement .stat-value {
  color: #86efac;
}

.stat-value {
  font-size: var(--font-size-3xl);
  font-weight: var(--font-weight-bold);
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #ffffff;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-1);
  text-align: center;
}

.stat-detail {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.7);
  text-align: center;
}

.hero-rule {
  position: relative;
  z-index: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.rule-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: #ffd54f;
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.rule-description {
  font-size: var(--font-size-sm);
  color: rgba(255, 255, 255, 0.8);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-stats {
    grid-template-columns: repeat(3, 1fr);
    gap: var(--space-3);
  }
}

@media (max-width: 768px) {
  .smt-hero {
    padding: var(--space-12) var(--space-4);
    min-height: auto;
  }
  
  .hero-title {
    font-size: var(--font-size-4xl);
  }
  
  .hero-subtitle {
    font-size: var(--font-size-lg);
  }
  
  .hero-description {
    font-size: var(--font-size-base);
  }
  
  .hero-stats {
    grid-template-columns: 1fr;
    max-width: 300px;
  }
  
  .stat-card {
    padding: var(--space-4);
  }
  
  .stat-value {
    font-size: var(--font-size-2xl);
  }
}

@media (max-width: 480px) {
  .hero-title {
    font-size: var(--font-size-3xl);
  }
}
</style>
