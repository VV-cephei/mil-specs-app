<template>
  <section class="wb-hero" id="hero">
    <div class="hero-content">
      <h1 class="hero-title">Wire Bonding Technology</h1>
      <p class="hero-subtitle">
        Comprehensive Guide for Semiconductor Interconnects
      </p>
      <p class="hero-description">
        The definitive reference for RF engineers and semiconductor technicians covering 
        materials, methods, bond types, loop profiles, and reliability considerations.
      </p>
      <p class="hero-curator">Curated by David Kueper</p>
    </div>
    
    <div class="hero-stats">
      <div class="stat-card">
        <span class="stat-value">&gt;75%</span>
        <span class="stat-label">Market Share</span>
        <span class="stat-detail">of IC interconnects</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">15-75µm</span>
        <span class="stat-label">Wire Diameter</span>
        <span class="stat-detail">signal applications</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">60-140kHz</span>
        <span class="stat-label">Ultrasonic Freq</span>
        <span class="stat-detail">thermosonic bonding</span>
      </div>
      <div class="stat-card">
        <span class="stat-value">100-220°C</span>
        <span class="stat-label">Bond Temperature</span>
        <span class="stat-detail">industry standard</span>
      </div>
    </div>
  </section>
</template>

<script setup>
// No props or state needed for hero section
</script>

<style scoped>
.wb-hero {
  background: linear-gradient(135deg, var(--color-primary-700) 0%, var(--color-primary-500) 100%);
  color: var(--color-text-inverse);
  padding: var(--space-16) var(--space-6);
  text-align: center;
}

.hero-content {
  max-width: 800px;
  margin: 0 auto var(--space-12);
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
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
  max-width: 1000px;
  margin: 0 auto;
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
}

.stat-card:hover {
  background: rgba(255, 255, 255, 0.15);
  transform: translateY(-2px);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-accent-300);
  margin-bottom: var(--space-1);
}

.stat-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-1);
}

.stat-detail {
  font-size: var(--font-size-xs);
  color: rgba(255, 255, 255, 0.7);
}

/* Responsive */
@media (max-width: 1024px) {
  .hero-stats {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wb-hero {
    padding: var(--space-12) var(--space-4);
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
}

@media (max-width: 480px) {
  .hero-stats {
    grid-template-columns: 1fr;
  }
  
  .hero-title {
    font-size: var(--font-size-3xl);
  }
}
</style>
