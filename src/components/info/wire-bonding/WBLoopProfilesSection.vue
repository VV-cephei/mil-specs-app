<template>
  <section id="loop-profiles" class="wb-section">
    <div class="section-header">
      <h2 class="section-title">Loop Profiles & Trajectories</h2>
      <p class="section-description">
        The wire loop trajectory significantly impacts bond reliability, wire sweep resistance, 
        and package height requirements.
      </p>
    </div>
    
    <div v-if="loopProfiles.length > 0" class="loop-viewer">
      <!-- Thumbnail Selector -->
      <div class="loop-thumbnails">
        <button
          v-for="profile in loopProfiles"
          :key="profile.id"
          class="thumbnail-btn"
          :class="{ 'thumbnail-btn--active': selectedProfile?.id === profile.id }"
          @click="selectProfile(profile)"
          :aria-pressed="selectedProfile?.id === profile.id"
        >
          <img 
            :src="profile.image" 
            :alt="profile.name"
            class="thumbnail-img"
            loading="lazy"
          />
          <span class="thumbnail-label">{{ profile.name }}</span>
        </button>
      </div>
      
      <!-- Main Display -->
      <div v-if="selectedProfile" class="loop-display">
        <div class="loop-image-container">
          <ImageViewer
            :src="selectedProfile.image"
            :alt="selectedProfile.name"
            :caption="selectedProfile.name"
            :zoomable="true"
          />
        </div>
        
        <div class="loop-details">
          <h3 class="loop-name">{{ selectedProfile.name }}</h3>
          <p class="loop-description">{{ selectedProfile.description }}</p>
          
          <div class="loop-path">
            <h4>Trajectory Path</h4>
            <div class="path-display">
              <code>{{ selectedProfile.path }}</code>
            </div>
          </div>
          
          <div class="loop-characteristics">
            <h4>Characteristics</h4>
            <dl class="characteristics-grid">
              <div class="char-item">
                <dt>Speed</dt>
                <dd :class="getSpeedClass(selectedProfile.characteristics.speed)">
                  {{ selectedProfile.characteristics.speed }}
                </dd>
              </div>
              <div class="char-item">
                <dt>Stability</dt>
                <dd :class="getStabilityClass(selectedProfile.characteristics.stability)">
                  {{ selectedProfile.characteristics.stability }}
                </dd>
              </div>
              <div class="char-item">
                <dt>Complexity</dt>
                <dd>{{ selectedProfile.characteristics.complexity }}</dd>
              </div>
              <div class="char-item">
                <dt>Loop Height</dt>
                <dd>{{ selectedProfile.characteristics.loopHeight }}</dd>
              </div>
              <div v-if="selectedProfile.characteristics.wireLength" class="char-item">
                <dt>Wire Length</dt>
                <dd>{{ selectedProfile.characteristics.wireLength }}</dd>
              </div>
              <div v-if="selectedProfile.characteristics.profile" class="char-item">
                <dt>Profile Shape</dt>
                <dd>{{ selectedProfile.characteristics.profile }}</dd>
              </div>
            </dl>
          </div>
          
          <div class="loop-applications">
            <h4>Applications</h4>
            <ul>
              <li v-for="(app, index) in selectedProfile.applications" :key="index">
                {{ app }}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading loop profiles data...</p>
    </div>
    
    <!-- Loop Selection Guide -->
    <div class="loop-guide">
      <h3 class="guide-title">Loop Profile Selection Guide</h3>
      <div class="guide-cards">
        <div class="guide-card">
          <div class="guide-icon guide-icon--speed">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
            </svg>
          </div>
          <h4>Need Speed?</h4>
          <p>Use <strong>Basic Loop</strong> for short bonds and high-throughput production where stability is less critical.</p>
        </div>
        <div class="guide-card">
          <div class="guide-icon guide-icon--height">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M21 3H3v18h18V3z"></path>
              <path d="M21 9H3"></path>
              <path d="M21 15H3"></path>
            </svg>
          </div>
          <h4>Low Profile Package?</h4>
          <p>Use <strong>Reverse Loop</strong> for thin packages requiring reduced loop height.</p>
        </div>
        <div class="guide-card">
          <div class="guide-icon guide-icon--stability">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
            </svg>
          </div>
          <h4>Maximum Stability?</h4>
          <p>Use <strong>Double Reverse Loop</strong> for long wires (&gt;3mm) or plastic molding to prevent wire sweep.</p>
        </div>
        <div class="guide-card">
          <div class="guide-icon guide-icon--length">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
            </svg>
          </div>
          <h4>Very Long Wires?</h4>
          <p>Use <strong>Long Loop</strong> with special algorithms for wire spans &gt;5mm.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from 'vue'
import ImageViewer from '@/components/shared/ImageViewer.vue'

const props = defineProps({
  loopProfiles: {
    type: Array,
    default: () => []
  }
})

const selectedProfile = ref(null)

// Select first profile when data loads
watch(() => props.loopProfiles, (profiles) => {
  if (profiles.length > 0 && !selectedProfile.value) {
    selectedProfile.value = profiles[0]
  }
}, { immediate: true })

function selectProfile(profile) {
  selectedProfile.value = profile
}

function getSpeedClass(speed) {
  const classes = {
    'Fast': 'value--success',
    'Moderate': 'value--warning',
    'Slow': 'value--error'
  }
  return classes[speed] || ''
}

function getStabilityClass(stability) {
  const classes = {
    'Highest': 'value--success',
    'Good': 'value--success',
    'Engineered': 'value--info',
    'Low (prone to swaying)': 'value--warning'
  }
  return classes[stability] || ''
}
</script>

<style scoped>
.wb-section {
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

/* Loop Viewer */
.loop-viewer {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  overflow: hidden;
  margin-bottom: var(--space-10);
}

/* Thumbnails */
.loop-thumbnails {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-4);
  background-color: var(--color-surface-elevated);
  border-bottom: 1px solid var(--color-border-light);
  overflow-x: auto;
}

.thumbnail-btn {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 2px solid transparent;
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  min-width: 120px;
}

.thumbnail-btn:hover {
  border-color: var(--color-border-default);
}

.thumbnail-btn--active {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.thumbnail-btn:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.thumbnail-img {
  width: 100px;
  height: 60px;
  object-fit: cover;
  border-radius: var(--radius-default);
}

.thumbnail-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  text-align: center;
}

.thumbnail-btn--active .thumbnail-label {
  color: var(--color-primary-700);
}

/* Main Display */
.loop-display {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-6);
  padding: var(--space-6);
}

.loop-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.loop-details {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.loop-name {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.loop-description {
  font-size: var(--font-size-base);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
}

.loop-path h4,
.loop-characteristics h4,
.loop-applications h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin-bottom: var(--space-2);
}

.path-display {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  overflow-x: auto;
}

.path-display code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-sm);
  color: var(--color-primary-600);
}

.characteristics-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.char-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.char-item dt {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
}

.char-item dd {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.value--success {
  color: var(--color-success-main);
}

.value--warning {
  color: var(--color-warning-main);
}

.value--error {
  color: var(--color-error-main);
}

.value--info {
  color: var(--color-info-main);
}

.loop-applications ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.loop-applications li {
  position: relative;
  padding-left: var(--space-5);
  margin-bottom: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.loop-applications li::before {
  content: '';
  position: absolute;
  left: 0;
  top: 8px;
  width: 6px;
  height: 6px;
  background-color: var(--color-primary-400);
  border-radius: var(--radius-full);
}

/* Loop Guide */
.loop-guide {
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.guide-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-6);
}

.guide-cards {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-4);
}

.guide-card {
  padding: var(--space-5);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  text-align: center;
  transition: transform var(--transition-default), box-shadow var(--transition-default);
}

.guide-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
}

.guide-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-3);
  border-radius: var(--radius-full);
}

.guide-icon--speed {
  background-color: var(--color-warning-light);
  color: var(--color-warning-dark);
}

.guide-icon--height {
  background-color: var(--color-info-light);
  color: var(--color-info-dark);
}

.guide-icon--stability {
  background-color: var(--color-success-light);
  color: var(--color-success-dark);
}

.guide-icon--length {
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
}

.guide-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.guide-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  line-height: var(--line-height-relaxed);
  margin: 0;
}

.guide-card strong {
  color: var(--color-primary-600);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1024px) {
  .guide-cards {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .loop-display {
    grid-template-columns: 1fr;
  }
  
  .characteristics-grid {
    grid-template-columns: 1fr;
  }
  
  .guide-cards {
    grid-template-columns: 1fr;
  }
}
</style>
