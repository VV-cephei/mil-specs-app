<template>
  <section id="defects" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">Defect Analysis</h2>
      <p class="section-description">
        Understanding defect origins is key to prevention. The 60-30-10 rule: 60% of defects 
        originate in printing, 30% in reflow, 10% in placement.
      </p>
    </div>
    
    <div v-if="hasData" class="defects-content">
      <!-- Defect Distribution Overview -->
      <div class="distribution-section">
        <h3 class="subsection-title">Defect Distribution</h3>
        
        <div class="distribution-bar">
          <div 
            v-for="category in defects.categories" 
            :key="category.id"
            class="distribution-segment"
            :class="`distribution-segment--${category.id}`"
            :style="{ width: category.percentage + '%' }"
          >
            <span class="segment-label">{{ category.name }}</span>
            <span class="segment-value">{{ category.percentage }}%</span>
          </div>
        </div>
        
        <p class="distribution-note">
          <strong>{{ defects.rule }}</strong>
        </p>
      </div>
      
      <!-- Defect Categories Accordion -->
      <div class="categories-section">
        <div 
          v-for="category in defects.categories" 
          :key="category.id" 
          class="category-panel"
        >
          <button 
            class="category-header"
            :class="{ 'category-header--expanded': expandedCategories.includes(category.id) }"
            @click="toggleCategory(category.id)"
            :aria-expanded="expandedCategories.includes(category.id)"
          >
            <div class="category-info">
              <span 
                class="category-badge"
                :class="`category-badge--${category.id}`"
              >
                {{ category.percentage || '—' }}%
              </span>
              <h3 class="category-name">{{ category.name }}</h3>
              <span class="defect-count">{{ category.defects?.length || 0 }} defects</span>
            </div>
            <svg 
              class="expand-icon" 
              xmlns="http://www.w3.org/2000/svg" 
              width="20" 
              height="20" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              stroke-width="2" 
              stroke-linecap="round" 
              stroke-linejoin="round"
            >
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </button>
          
          <div 
            v-show="expandedCategories.includes(category.id)"
            class="category-content"
          >
            <div class="defects-grid">
              <div 
                v-for="defect in category.defects" 
                :key="defect.id" 
                class="defect-card"
              >
                <!-- Defect Image -->
                <div v-if="defect.image" class="defect-image" @click="openImageViewer(defect)">
                  <img 
                    :src="defect.image" 
                    :alt="defect.name"
                    loading="lazy"
                  />
                  <div class="image-overlay">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="11" cy="11" r="8"></circle>
                      <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                      <line x1="11" y1="8" x2="11" y2="14"></line>
                      <line x1="8" y1="11" x2="14" y2="11"></line>
                    </svg>
                  </div>
                </div>
                
                <!-- Defect Info -->
                <div class="defect-info">
                  <h4 class="defect-name">{{ defect.name }}</h4>
                  <p class="defect-description">{{ defect.description }}</p>
                  
                  <!-- Standard Reference -->
                  <div v-if="defect.standard" class="defect-standard">
                    <span class="standard-label">Standard:</span>
                    <span class="standard-value">{{ defect.standard }}</span>
                  </div>
                  
                  <!-- Criteria -->
                  <div v-if="defect.criteria" class="defect-criteria">
                    <span class="criteria-label">Criteria:</span>
                    <span class="criteria-value">{{ defect.criteria }}</span>
                  </div>
                  
                  <!-- Causes -->
                  <div v-if="defect.causes?.length" class="defect-causes">
                    <h5>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      Root Causes
                    </h5>
                    <ul>
                      <li v-for="(cause, idx) in defect.causes" :key="idx">{{ cause }}</li>
                    </ul>
                  </div>
                  
                  <!-- Solutions -->
                  <div v-if="defect.solutions?.length" class="defect-solutions">
                    <h5>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      Solutions
                    </h5>
                    <ul>
                      <li v-for="(solution, idx) in defect.solutions" :key="idx">{{ solution }}</li>
                    </ul>
                  </div>
                  
                  <!-- Trench Insight -->
                  <div v-if="defect.trenchInsight" class="trench-insight">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span>{{ defect.trenchInsight }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Inspection Classes -->
      <div v-if="defects.inspectionClasses" class="inspection-section">
        <h3 class="subsection-title">IPC Inspection Classes</h3>
        
        <div class="classes-grid">
          <div 
            v-for="(classInfo, key) in defects.inspectionClasses" 
            :key="key"
            class="class-card"
            :class="`class-card--${key}`"
          >
            <div class="class-header">
              <span class="class-badge">{{ key.toUpperCase() }}</span>
              <h4 class="class-name">{{ classInfo.name }}</h4>
            </div>
            <p class="class-description">{{ classInfo.description }}</p>
            <p class="class-criteria">
              <strong>Criteria:</strong> {{ classInfo.criteria }}
            </p>
          </div>
        </div>
      </div>
      
      <!-- Image Viewer Modal -->
      <Teleport to="body">
        <div 
          v-if="viewerImage" 
          class="image-viewer-overlay"
          @click="closeImageViewer"
        >
          <div class="image-viewer-content" @click.stop>
            <button class="viewer-close" @click="closeImageViewer">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            <img :src="viewerImage.image" :alt="viewerImage.name" />
            <div class="viewer-caption">
              <h4>{{ viewerImage.name }}</h4>
              <p>{{ viewerImage.description }}</p>
            </div>
          </div>
        </div>
      </Teleport>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading defects data...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  defects: {
    type: Object,
    default: () => ({})
  }
})

const hasData = computed(() => {
  return props.defects?.categories?.length > 0
})

// Expanded categories state - start with first category expanded
const expandedCategories = ref(['printing-defects'])

function toggleCategory(categoryId) {
  const index = expandedCategories.value.indexOf(categoryId)
  if (index === -1) {
    expandedCategories.value.push(categoryId)
  } else {
    expandedCategories.value.splice(index, 1)
  }
}

// Image viewer state
const viewerImage = ref(null)

function openImageViewer(defect) {
  if (defect.image) {
    viewerImage.value = defect
  }
}

function closeImageViewer() {
  viewerImage.value = null
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

.defects-content {
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

/* Distribution Bar */
.distribution-bar {
  display: flex;
  height: 60px;
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-4);
}

.distribution-segment {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: white;
  transition: transform var(--transition-fast);
}

.distribution-segment:hover {
  transform: scaleY(1.05);
}

.distribution-segment--printing-defects {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.distribution-segment--reflow-defects {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.distribution-segment--placement-defects {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
}

.distribution-segment--material-defects {
  background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%);
}

.segment-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-medium);
  opacity: 0.9;
}

.segment-value {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
}

.distribution-note {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
  margin: 0;
}

/* Category Panel */
.category-panel {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
  margin-bottom: var(--space-3);
}

.category-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: var(--space-4) var(--space-5);
  background: none;
  border: none;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.category-header:hover {
  background-color: var(--color-surface-elevated);
}

.category-info {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.category-badge {
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 48px;
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-default);
  color: white;
}

.category-badge--printing-defects {
  background-color: #ef4444;
}

.category-badge--reflow-defects {
  background-color: #f59e0b;
}

.category-badge--placement-defects {
  background-color: #3b82f6;
}

.category-badge--material-defects {
  background-color: #8b5cf6;
}

.category-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.defect-count {
  font-size: var(--font-size-sm);
  color: var(--color-text-tertiary);
}

.expand-icon {
  color: var(--color-text-tertiary);
  transition: transform var(--transition-fast);
}

.category-header--expanded .expand-icon {
  transform: rotate(180deg);
}

.category-content {
  padding: var(--space-4) var(--space-5);
  border-top: 1px solid var(--color-border-light);
  background-color: var(--color-background);
}

/* Defects Grid */
.defects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-4);
}

.defect-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.defect-image {
  position: relative;
  height: 160px;
  overflow: hidden;
  cursor: pointer;
}

.defect-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-default);
}

.defect-image:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.4);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.defect-image:hover .image-overlay {
  opacity: 1;
}

.image-overlay svg {
  color: white;
}

.defect-info {
  padding: var(--space-4);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.defect-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.defect-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

.defect-standard,
.defect-criteria {
  font-size: var(--font-size-sm);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.standard-label,
.criteria-label {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
}

.standard-value,
.criteria-value {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-medium);
}

.defect-causes,
.defect-solutions {
  font-size: var(--font-size-sm);
}

.defect-causes h5,
.defect-solutions h5 {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  text-transform: uppercase;
  letter-spacing: var(--letter-spacing-wide);
  margin: 0 0 var(--space-2) 0;
}

.defect-causes h5 {
  color: var(--color-error-main);
}

.defect-solutions h5 {
  color: var(--color-success-main);
}

.defect-causes ul,
.defect-solutions ul {
  margin: 0;
  padding-left: var(--space-4);
  color: var(--color-text-secondary);
}

.defect-causes li,
.defect-solutions li {
  margin-bottom: var(--space-1);
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

/* Inspection Classes */
.classes-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--space-4);
}

.class-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  border-left: 4px solid var(--color-border-light);
}

.class-card--class1 {
  border-left-color: #10b981;
}

.class-card--class2 {
  border-left-color: #f59e0b;
}

.class-card--class3 {
  border-left-color: #ef4444;
}

.class-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-3);
}

.class-badge {
  padding: var(--space-1) var(--space-2);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  color: var(--color-text-secondary);
}

.class-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.class-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-3) 0;
  line-height: var(--line-height-relaxed);
}

.class-criteria {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
}

.class-criteria strong {
  color: var(--color-text-primary);
}

/* Image Viewer Modal */
.image-viewer-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
  padding: var(--space-6);
}

.image-viewer-content {
  position: relative;
  max-width: 90vw;
  max-height: 90vh;
  background-color: var(--color-surface);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.viewer-close {
  position: absolute;
  top: var(--space-3);
  right: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.5);
  border: none;
  border-radius: var(--radius-full);
  color: white;
  cursor: pointer;
  z-index: 1;
  transition: background-color var(--transition-fast);
}

.viewer-close:hover {
  background-color: rgba(0, 0, 0, 0.7);
}

.image-viewer-content img {
  display: block;
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
}

.viewer-caption {
  padding: var(--space-4);
  background-color: var(--color-surface);
  border-top: 1px solid var(--color-border-light);
}

.viewer-caption h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.viewer-caption p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
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
  
  .distribution-bar {
    flex-direction: column;
    height: auto;
  }
  
  .distribution-segment {
    width: 100% !important;
    padding: var(--space-3);
    flex-direction: row;
    justify-content: space-between;
  }
  
  .defects-grid {
    grid-template-columns: 1fr;
  }
  
  .classes-grid {
    grid-template-columns: 1fr;
  }
  
  .category-info {
    flex-wrap: wrap;
  }
  
  .defect-count {
    width: 100%;
    margin-top: var(--space-1);
  }
}
</style>
