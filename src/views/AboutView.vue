<template>
  <div class="about-view">
    <!-- Page Header -->
    <div class="page-header page-header-gradient">
      <div class="page-header-content container">
        <nav class="breadcrumb">
          <span class="breadcrumb-item">
            <router-link to="/" class="breadcrumb-link">Home</router-link>
          </span>
          <span class="breadcrumb-separator">/</span>
          <span class="breadcrumb-current">About</span>
        </nav>
        <h1 class="page-title">About mil-specs.com</h1>
        <p class="page-description">
          Your comprehensive resource for military specifications and packaging data.
        </p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="page-body">
      <div class="page-body-content container container-narrow">
        <!-- Introduction Card -->
        <div class="card card-elevated">
          <div class="card-body card-body-spacious">
            <h2 class="section-title section-title-sm">Your Comprehensive Resource for Military Specifications</h2>
            
            <p class="card-text">
              mil-specs.com is a dedicated platform for aerospace professionals and enthusiasts
              to view, analyze, and create workflows based on military and aerospace specifications.
            </p>
          </div>
        </div>

        <!-- Curator Section -->
        <section class="section-sm">
          <div class="card card-curator">
            <div class="card-body card-body-spacious">
              <div class="curator-content">
                <div class="curator-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                    <circle cx="12" cy="7" r="4"/>
                  </svg>
                </div>
                <div class="curator-info">
                  <h3 class="curator-title">Curated by David Kueper</h3>
                  <p class="curator-description">
                    mil-specs.com is curated and maintained by David Kueper, a professional with deep expertise 
                    in military specifications, semiconductor technology, and aerospace standards. With years of 
                    experience in the defense industry, David has compiled this comprehensive resource to help 
                    engineers, technicians, and professionals navigate the complex world of military specifications.
                  </p>
                  <p class="curator-description">
                    The goal of this platform is to make military and aerospace specifications more accessible 
                    and easier to understand, providing practical tools and detailed technical guides for 
                    everyday use in the defense and semiconductor industries.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- Capabilities Section -->
        <section class="section-sm">
          <div class="section-header section-header-left">
            <h3 class="section-title section-title-sm">Current Capabilities</h3>
          </div>
          
          <div class="capabilities-list">
            <div class="capability-item card">
              <div class="card-body">
                <div class="capability-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/>
                    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
                  </svg>
                </div>
                <div class="capability-content">
                  <h4 class="capability-title">MIL-STD-2073 Viewer</h4>
                  <p class="capability-description">
                    Browse preservation methods, cleaning procedures, and material specifications
                  </p>
                </div>
              </div>
            </div>
            
            <div class="capability-item card">
              <div class="card-body">
                <div class="capability-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="16" y1="13" x2="8" y2="13"/>
                    <line x1="16" y1="17" x2="8" y2="17"/>
                    <polyline points="10 9 9 9 8 9"/>
                  </svg>
                </div>
                <div class="capability-content">
                  <h4 class="capability-title">DD Form 2326 Generator</h4>
                  <p class="capability-description">
                    Create Military Packaging Data forms with validation and export
                  </p>
                </div>
              </div>
            </div>
            
            <div class="capability-item card">
              <div class="card-body">
                <div class="capability-icon">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <polyline points="16 18 22 12 16 6"/>
                    <polyline points="8 6 2 12 8 18"/>
                  </svg>
                </div>
                <div class="capability-content">
                  <h4 class="capability-title">DD Form 2326 Decoder</h4>
                  <p class="capability-description">
                    Parse and display form data in structured, searchable tables
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <!-- About MIL-STD-2073 Section -->
        <section class="section-sm">
          <div class="card">
            <div class="card-body card-body-spacious">
              <h3 class="card-title">About MIL-STD-2073</h3>
              <p class="card-text">
                MIL-STD-2073 governs the general requirements for military packaging and the
                development of packaging instructions. It establishes uniform methods for
                preserving, wrapping, cushioning, and packing military materiel.
              </p>
            </div>
          </div>
        </section>

        <!-- Disclaimer Alert -->
        <div class="alert alert-info">
          <div class="alert-icon">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
          </div>
          <div class="alert-content">
            <h4 class="alert-title">Disclaimer</h4>
            <p class="alert-text">
              This platform is a reference tool and does not replace official military
              documentation. Always consult the latest official specifications for
              procurement and compliance.
            </p>
          </div>
        </div>

        <!-- Technology Section -->
        <section class="section-sm">
          <div class="card">
            <div class="card-body card-body-spacious">
              <h3 class="card-title">Technology</h3>
              <p class="card-text">
                Built with Vue.js 3 and modern web technologies, mil-specs.com provides a modern,
                responsive interface that works across all devices. The application
                follows best practices for performance, accessibility, and user experience.
              </p>
              
              <div class="tech-badges">
                <span class="tech-badge">Vue.js 3</span>
                <span class="tech-badge">Modern CSS</span>
                <span class="tech-badge">Responsive Design</span>
                <span class="tech-badge">Accessible</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<script setup>
// About page component
</script>

<style scoped>
.about-view {
  min-height: 100vh;
  background-color: var(--color-background);
}

.capabilities-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.capability-item .card-body {
  display: flex;
  align-items: flex-start;
  gap: var(--space-4);
}

.capability-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  background-color: var(--color-primary-50);
  color: var(--color-primary-500);
  border-radius: var(--radius-lg);
  flex-shrink: 0;
}

.capability-content {
  flex: 1;
}

.capability-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-1);
}

.capability-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.alert {
  display: flex;
  gap: var(--space-4);
  padding: var(--space-5);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-6);
}

.alert-info {
  background-color: var(--color-info-light);
  border-left: 4px solid var(--color-info-main);
}

.alert-icon {
  color: var(--color-info-main);
  flex-shrink: 0;
}

.alert-content {
  flex: 1;
}

.alert-title {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-info-dark);
  margin: 0 0 var(--space-1);
}

.alert-text {
  font-size: var(--font-size-sm);
  color: var(--color-info-dark);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.tech-badges {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  margin-top: var(--space-4);
}

.tech-badge {
  display: inline-flex;
  padding: var(--space-1) var(--space-3);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-neutral-100);
  color: var(--color-text-secondary);
  border-radius: var(--radius-full);
}

/* Curator Section Styles */
.card-curator {
  border-left: 4px solid var(--color-accent-500, #c9a227);
  background: linear-gradient(135deg, var(--color-surface) 0%, var(--color-primary-50, #e8eaf6) 100%);
}

.curator-content {
  display: flex;
  gap: var(--space-6);
  align-items: flex-start;
}

.curator-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80px;
  height: 80px;
  min-width: 80px;
  background-color: var(--color-primary-100, #c5cae9);
  color: var(--color-primary-600, #1a3050);
  border-radius: var(--radius-full);
}

.curator-info {
  flex: 1;
}

.curator-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600, #1a3050);
  margin: 0 0 var(--space-3);
}

.curator-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0 0 var(--space-3);
}

.curator-description:last-child {
  margin-bottom: 0;
}

@media (max-width: 640px) {
  .curator-content {
    flex-direction: column;
    align-items: center;
    text-align: center;
  }
}
</style>
