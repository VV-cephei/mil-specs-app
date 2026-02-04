<template>
  <div class="home-view">
    <!-- Hero Section -->
    <section class="hero hero-gradient hero-pattern">
      <div class="hero-content">
        <span class="hero-badge">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12,1L3,5V11C3,16.55 6.84,21.74 12,23C17.16,21.74 21,16.55 21,11V5L12,1Z" />
          </svg>
          Trusted Defense Resource
        </span>
        <h1 class="hero-title">The Premier Hub for Military Specifications</h1>
        <p class="hero-subtitle">
          Access critical defense tools, standards, and documentation. From MIL-STD-202 test methods to DD Form 2326 decoding — everything you need for defense industry compliance.
        </p>
        <p class="hero-curator">Curated by David Kueper</p>
        <div class="hero-actions">
          <router-link to="/tools" class="btn btn-accent btn-lg">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z" />
            </svg>
            Open Tools Hub
          </router-link>
          <router-link to="/specs" class="btn btn-outlined btn-lg btn-inverse">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M19 2L14 6.5V17.5L19 13V2M6.5 5C4.55 5 2.45 5.4 1 6.5V21.16C1 21.41 1.25 21.66 1.5 21.66C1.6 21.66 1.65 21.59 1.75 21.59C3.1 20.94 5.05 20.5 6.5 20.5C8.45 20.5 10.55 20.9 12 22C13.35 21.15 15.8 20.5 17.5 20.5C19.15 20.5 20.85 20.81 22.25 21.56C22.35 21.61 22.4 21.59 22.5 21.59C22.75 21.59 23 21.34 23 21.09V6.5C22.4 6.05 21.75 5.75 21 5.5V19C19.9 18.65 18.7 18.5 17.5 18.5C15.8 18.5 13.35 19.15 12 20V6.5C10.55 5.4 8.45 5 6.5 5Z" />
            </svg>
            Browse Specifications
          </router-link>
        </div>
        
        <!-- Hero Stats -->
        <div class="hero-stats">
          <div class="hero-stat">
            <span class="hero-stat-value">500+</span>
            <span class="hero-stat-label">Test Methods</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">1000+</span>
            <span class="hero-stat-label">Specifications</span>
          </div>
          <div class="hero-stat">
            <span class="hero-stat-value">24/7</span>
            <span class="hero-stat-label">Access</span>
          </div>
        </div>
      </div>
    </section>
    
    <!-- Features Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Featured Tools</span>
          <h2 class="section-title">Essential Defense Industry Tools</h2>
          <p class="section-description">
            Streamline your compliance workflow with our comprehensive suite of military specification tools.
          </p>
        </div>
        
        <div class="feature-grid-3">
          <router-link 
            v-for="feature in features" 
            :key="feature.title"
            :to="feature.to"
            class="card card-interactive"
          >
            <div class="card-body" style="text-align: center; padding: 2rem;">
              <div class="feature-icon">
                <component :is="feature.iconComponent" />
              </div>
              <h3 class="card-title" style="font-size: 1.25rem;">{{ feature.title }}</h3>
              <p class="card-text" style="color: var(--color-text-secondary);">{{ feature.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Quick Access Section -->
    <section class="section section-alt">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Quick Access</span>
          <h2 class="section-title">Jump Right In</h2>
          <p class="section-description">
            Get instant access to our most popular tools and resources.
          </p>
        </div>
        
        <div class="four-col">
          <router-link 
            v-for="link in quickLinks" 
            :key="link.title"
            :to="link.to"
            class="card card-interactive card-status card-accent"
          >
            <div class="card-body" style="text-align: center;">
              <div class="quick-link-icon">
                <component :is="link.iconComponent" />
              </div>
              <h4 class="card-title" style="font-size: 1rem; margin-bottom: 0.25rem;">{{ link.title }}</h4>
              <p class="card-meta" style="justify-content: center;">{{ link.description }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- Technical Resources Section -->
    <section class="section">
      <div class="container">
        <div class="section-header">
          <span class="section-eyebrow">Technical Resources</span>
          <h2 class="section-title">In-Depth Technical Guides</h2>
          <p class="section-description">
            Comprehensive technical documentation and guides for semiconductor and defense industry professionals.
          </p>
        </div>
        
        <div class="resource-grid">
          <router-link 
            to="/resources/wire-bonding"
            class="card card-interactive resource-card"
          >
            <div class="resource-card-content">
              <div class="resource-icon">
                <component :is="WireBondingIcon" />
              </div>
              <div class="resource-info">
                <span class="resource-badge">New</span>
                <h3 class="card-title" style="font-size: 1.25rem; margin-bottom: 0.5rem;">Wire Bonding Technology</h3>
                <p class="card-text" style="color: var(--color-text-secondary); margin-bottom: 1rem;">
                  Comprehensive guide covering bond types, wire materials, loop profiles, and quality control for semiconductor interconnects.
                </p>
                <div class="resource-topics">
                  <span class="resource-topic">Ball Bonding</span>
                  <span class="resource-topic">Wedge Bonding</span>
                  <span class="resource-topic">Materials</span>
                  <span class="resource-topic">Quality Control</span>
                </div>
              </div>
              <div class="resource-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </div>
            </div>
          </router-link>
          
          <router-link 
            to="/resources/smt-manufacturing"
            class="card card-interactive resource-card"
          >
            <div class="resource-card-content">
              <div class="resource-icon">
                <component :is="SMTIcon" />
              </div>
              <div class="resource-info">
                <span class="resource-badge">New</span>
                <h3 class="card-title" style="font-size: 1.25rem; margin-bottom: 0.5rem;">SMT Manufacturing</h3>
                <p class="card-text" style="color: var(--color-text-secondary); margin-bottom: 1rem;">
                  Complete guide to Surface Mount Technology covering solder paste, stencil design, reflow profiles, and defect troubleshooting.
                </p>
                <div class="resource-topics">
                  <span class="resource-topic">Solder Paste</span>
                  <span class="resource-topic">Stencil Design</span>
                  <span class="resource-topic">Reflow</span>
                  <span class="resource-topic">Defects</span>
                </div>
              </div>
              <div class="resource-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </div>
            </div>
          </router-link>

          <router-link 
            to="/resources/die-attach"
            class="card card-interactive resource-card"
          >
            <div class="resource-card-content">
              <div class="resource-icon">
                <component :is="DieAttachIcon" />
              </div>
              <div class="resource-info">
                <span class="resource-badge">New</span>
                <h3 class="card-title" style="font-size: 1.25rem; margin-bottom: 0.5rem;">Die Attach Technology</h3>
                <p class="card-text" style="color: var(--color-text-secondary); margin-bottom: 1rem;">
                  Definitive guide to die attach processes, materials, and reliability for RF and power electronics.
                </p>
                <div class="resource-topics">
                  <span class="resource-topic">Eutectic</span>
                  <span class="resource-topic">Ag Sintering</span>
                  <span class="resource-topic">Epoxy</span>
                  <span class="resource-topic">RF Performance</span>
                </div>
              </div>
              <div class="resource-arrow">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M4,11V13H16L10.5,18.5L11.92,19.92L19.84,12L11.92,4.08L10.5,5.5L16,11H4Z" />
                </svg>
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>
    
    <!-- About/CTA Section -->
    <section class="section section-primary hero-gradient hero-pattern">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title" style="color: var(--color-text-inverse);">Your Trusted Defense Resource</h2>
          <p class="section-description" style="color: rgba(255, 255, 255, 0.85);">
            mil-specs.com is your comprehensive hub for military and aerospace specifications.
            We provide easy access to documentation, tools, and guidance to ensure defense
            industry compliance across multiple standards.
          </p>
        </div>
        <div class="section-actions">
          <router-link to="/specs" class="btn btn-accent btn-lg">
            Explore All Specifications
          </router-link>
          <router-link to="/about" class="btn btn-outlined btn-lg btn-inverse">
            Learn More About Us
          </router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { h } from 'vue'

// Icon components for features
const MicroscopeIcon = {
  render() {
    return h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M9.46,6.28L11.05,9C8.47,9.26 6.5,11.41 6.5,14A5,5 0 0,0 11.5,19C13.55,19 15.31,17.77 16.08,16H13.5V14H21.5V16H19.25C18.84,17.57 17.97,18.96 16.79,20H19.5V22H3.5V20H6.21C4.55,18.53 3.5,16.39 3.5,14C3.5,10.37 5.96,7.2 9.46,6.28M12.74,2.07L13.5,3.37L14.36,2.87L17.86,8.93L14.39,10.93L10.89,4.87L11.76,4.37L11,3.07L12.74,2.07Z' })
    ])
  }
}

const FileReplaceIcon = {
  render() {
    return h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M14,12H19.5L14,6.5V12M8,5H15L21,11V21A2,2 0 0,1 19,23H8C6.89,23 6,22.1 6,21V18H8V21H19V13H13V7H8V13H6V7A2,2 0 0,1 8,5M4,14H2V16H4V14M4,10H2V12H4V10M4,18H2V20H4V18Z' })
    ])
  }
}

const CodeJsonIcon = {
  render() {
    return h('svg', { width: '32', height: '32', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M5,3H7V5H5V10A2,2 0 0,1 3,12A2,2 0 0,1 5,14V19H7V21H5C3.93,20.73 3,20.1 3,19V15A2,2 0 0,0 1,13H0V11H1A2,2 0 0,0 3,9V5A2,2 0 0,1 5,3M19,3A2,2 0 0,1 21,5V9A2,2 0 0,0 23,11H24V13H23A2,2 0 0,0 21,15V19A2,2 0 0,1 19,21H17V19H19V14A2,2 0 0,1 21,12A2,2 0 0,1 19,10V5H17V3H19M12,15A1,1 0 0,1 13,16A1,1 0 0,1 12,17A1,1 0 0,1 11,16A1,1 0 0,1 12,15M8,15A1,1 0 0,1 9,16A1,1 0 0,1 8,17A1,1 0 0,1 7,16A1,1 0 0,1 8,15M16,15A1,1 0 0,1 17,16A1,1 0 0,1 16,17A1,1 0 0,1 15,16A1,1 0 0,1 16,15Z' })
    ])
  }
}

const ToolsIcon = {
  render() {
    return h('svg', { width: '28', height: '28', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M21.71 20.29L20.29 21.71A1 1 0 0 1 18.88 21.71L7 9.85A3.81 3.81 0 0 1 6 10A4 4 0 0 1 2.22 4.7L4.76 7.24L5.29 6.71L6.71 5.29L7.24 4.76L4.7 2.22A4 4 0 0 1 10 6A3.81 3.81 0 0 1 9.85 7L21.71 18.88A1 1 0 0 1 21.71 20.29M2.29 18.88A1 1 0 0 0 2.29 20.29L3.71 21.71A1 1 0 0 0 5.12 21.71L10.59 16.25L7.76 13.42M20 2L16 4V6L13.83 8.17L15.83 10.17L18 8H20L22 4Z' })
    ])
  }
}

const WireBondingIcon = {
  render() {
    return h('svg', { width: '40', height: '40', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M2,5.27L3.28,4L20,20.72L18.73,22L15.73,19H7V17H13.73L9.73,13H7V11H7.73L5.73,9H2V7H3.73L2,5.27M7,5H9V7H7V5M11,5H13V7H11V5M15,5H17V7H15V5M19,5H21V7H19V5M19,9H21V11H19V9M19,13H21V15H19V13M15,17H17V19H15V17M19,17H21V19H19V17Z' })
    ])
  }
}

const SMTIcon = {
  render() {
    return h('svg', { width: '40', height: '40', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M17,14H19V17H22V19H19V22H17V19H14V17H17V14M11,16L2,9L11,2L20,9L11,16M11,18.54L12,17.75V18C12,18.71 12.12,19.39 12.35,20L11,21.07L2,14.07L3.62,12.81L11,18.54Z' })
    ])
  }
}

const DieAttachIcon = {
  render() {
    return h('svg', { width: '40', height: '40', viewBox: '0 0 24 24', fill: 'currentColor' }, [
      h('path', { d: 'M17,17H7V7H17M21,11V9H19V7C19,5.89 18.1,5 17,5H15V3H13V5H11V3H9V5H7C5.89,5 5,5.89 5,7V9H3V11H5V13H3V15H5V17C5,18.1 5.89,19 7,19H9V21H11V19H13V21H15V19H17C18.1,19 19,18.1 19,17V15H21V13H19V11H21Z' })
    ])
  }
}

const features = [
  {
    iconComponent: MicroscopeIcon,
    title: 'MIL-STD-202 Viewer',
    description: 'Browse and search test methods for electronic and electrical component parts with detailed specifications.',
    to: '/tools/mil-std-202'
  },
  {
    iconComponent: FileReplaceIcon,
    title: 'Spec Superseding Lookup',
    description: 'Instantly check if a military specification has been superseded, cancelled, or replaced.',
    to: '/tools/superseding-lookup'
  },
  {
    iconComponent: CodeJsonIcon,
    title: 'DD Form 2326 Decoder',
    description: 'Decode MIL-STD-2073 preservation and packing codes with our comprehensive decoder tool.',
    to: '/tools/dd2326/decoder'
  }
]

const quickLinks = [
  {
    iconComponent: ToolsIcon,
    title: 'Tools Hub',
    description: 'Access All Tools',
    to: '/tools'
  },
  {
    iconComponent: MicroscopeIcon,
    title: 'MIL-STD-202',
    description: 'Test Methods',
    to: '/tools/mil-std-202'
  },
  {
    iconComponent: FileReplaceIcon,
    title: 'Superseding',
    description: 'Lookup Status',
    to: '/tools/superseding-lookup'
  },
  {
    iconComponent: CodeJsonIcon,
    title: 'Decoder',
    description: 'Decode Codes',
    to: '/tools/dd2326/decoder'
  }
]
</script>

<style scoped>
/* Button inverse variant for use on dark backgrounds */
.btn-inverse {
  color: var(--color-text-inverse, #fff);
  border-color: rgba(255, 255, 255, 0.5);
}

.btn-inverse:hover {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.8);
}

/* Hero curator branding */
.hero-curator {
  font-size: var(--font-size-sm, 0.875rem);
  color: rgba(255, 255, 255, 0.75);
  margin-bottom: var(--space-6, 1.5rem);
  font-style: italic;
  letter-spacing: var(--letter-spacing-wide, 0.025em);
}

/* Feature icon styling */
.feature-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  margin-bottom: var(--space-4, 1rem);
  background-color: var(--color-primary-50, #e8eaf6);
  color: var(--color-primary-500, #1e3a5f);
  border-radius: var(--radius-lg, 12px);
}

/* Quick link icon styling */
.quick-link-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin-bottom: var(--space-3, 0.75rem);
  color: var(--color-accent-500, #c9a227);
}

/* Ensure cards have proper link styling */
.card {
  text-decoration: none;
  color: inherit;
  display: block;
}

.card:hover {
  text-decoration: none;
}

/* Section primary background override */
.section-primary {
  background: linear-gradient(135deg, var(--color-primary-500, #1e3a5f) 0%, var(--color-primary-700, #0f1f33) 100%);
}

/* Resource section styles */
.resource-grid {
  display: grid;
  gap: var(--space-6, 1.5rem);
}

.resource-card {
  background: var(--color-surface, #fff);
  border: 1px solid var(--color-border, #e0e0e0);
  border-radius: var(--radius-lg, 12px);
  overflow: hidden;
  transition: all 0.3s ease;
}

.resource-card:hover {
  border-color: var(--color-primary-300, #5c7a9a);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  transform: translateY(-2px);
}

.resource-card-content {
  display: flex;
  align-items: center;
  gap: var(--space-6, 1.5rem);
  padding: var(--space-6, 1.5rem);
}

.resource-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  min-width: 80px;
  background: linear-gradient(135deg, var(--color-primary-50, #e8eaf6) 0%, var(--color-primary-100, #c5cae9) 100%);
  color: var(--color-primary-500, #1e3a5f);
  border-radius: var(--radius-lg, 12px);
}

.resource-info {
  flex: 1;
}

.resource-badge {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background: var(--color-accent-500, #c9a227);
  color: var(--color-primary-900, #0a1929);
  font-size: var(--font-size-xs, 0.75rem);
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  border-radius: var(--radius-full, 9999px);
  margin-bottom: var(--space-2, 0.5rem);
}

.resource-topics {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2, 0.5rem);
}

.resource-topic {
  display: inline-block;
  padding: 0.25rem 0.5rem;
  background: var(--color-primary-50, #e8eaf6);
  color: var(--color-primary-600, #1a3050);
  font-size: var(--font-size-xs, 0.75rem);
  border-radius: var(--radius-default, 6px);
}

.resource-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  min-width: 48px;
  color: var(--color-primary-400, #7b9ab8);
  transition: all 0.3s ease;
}

.resource-card:hover .resource-arrow {
  color: var(--color-primary-500, #1e3a5f);
  transform: translateX(4px);
}

@media (max-width: 768px) {
  .resource-card-content {
    flex-direction: column;
    text-align: center;
  }
  
  .resource-topics {
    justify-content: center;
  }
  
  .resource-arrow {
    display: none;
  }
}
</style>
