<template>
  <section id="tools" class="smt-section smt-tools-section">
    <div class="section-header">
      <h2>
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
        </svg>
        Interactive Engineering Tools
      </h2>
      <p>
        Professional calculators and wizards to help optimize your SMT manufacturing process
      </p>
    </div>

    <!-- Tool Tabs -->
    <div class="tools-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-button"
        :class="{ 'tab-button--active': activeTab === tab.id }"
        @click="activeTab = tab.id"
      >
        <component :is="tab.icon" class="tab-icon" />
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </div>

    <!-- Tool Content -->
    <div class="tools-content">
      <Transition name="fade" mode="out-in">
        <StencilApertureCalculator v-if="activeTab === 'stencil'" key="stencil" />
        <ReflowProfileBuilder v-else-if="activeTab === 'reflow'" key="reflow" />
        <DefectTroubleshooter v-else-if="activeTab === 'defects'" key="defects" />
        <SolderAlloySelector v-else-if="activeTab === 'alloy'" key="alloy" />
      </Transition>
    </div>

    <!-- Tool Descriptions -->
    <div class="tools-info">
      <div class="info-card">
        <h4>About These Tools</h4>
        <p>
          These interactive engineering tools are designed to assist SMT process engineers 
          in optimizing their manufacturing processes. All calculations are based on 
          industry standards including IPC-7525, IPC-A-610, and J-STD-001.
        </p>
        <ul class="info-list">
          <li>
            <strong>Stencil Calculator:</strong> Calculate area ratio and aspect ratio 
            for optimal solder paste release based on IPC-7525 guidelines.
          </li>
          <li>
            <strong>Reflow Profile Builder:</strong> Design and visualize temperature 
            profiles for different solder alloys and board configurations.
          </li>
          <li>
            <strong>Defect Troubleshooter:</strong> Diagnose common SMT defects with 
            guided questions and get ranked root causes with solutions.
          </li>
          <li>
            <strong>Alloy Selector:</strong> Find the optimal solder alloy based on 
            your application requirements, temperature range, and reliability needs.
          </li>
        </ul>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, h } from 'vue'
import StencilApertureCalculator from './tools/StencilApertureCalculator.vue'
import ReflowProfileBuilder from './tools/ReflowProfileBuilder.vue'
import DefectTroubleshooter from './tools/DefectTroubleshooter.vue'
import SolderAlloySelector from './tools/SolderAlloySelector.vue'

// Tab icons as render functions
const StencilIcon = () => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  width: 20, 
  height: 20, 
  viewBox: '0 0 24 24', 
  fill: 'none', 
  stroke: 'currentColor', 
  'stroke-width': 2 
}, [
  h('rect', { x: 3, y: 3, width: 18, height: 18, rx: 2 }),
  h('rect', { x: 7, y: 7, width: 3, height: 3 }),
  h('rect', { x: 14, y: 7, width: 3, height: 3 }),
  h('rect', { x: 7, y: 14, width: 3, height: 3 }),
  h('rect', { x: 14, y: 14, width: 3, height: 3 })
])

const ReflowIcon = () => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  width: 20, 
  height: 20, 
  viewBox: '0 0 24 24', 
  fill: 'none', 
  stroke: 'currentColor', 
  'stroke-width': 2 
}, [
  h('path', { d: 'M3 3v18h18' }),
  h('path', { d: 'M18.7 8l-5.1 5.2-2.8-2.7L7 14.3' })
])

const DefectIcon = () => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  width: 20, 
  height: 20, 
  viewBox: '0 0 24 24', 
  fill: 'none', 
  stroke: 'currentColor', 
  'stroke-width': 2 
}, [
  h('circle', { cx: 12, cy: 12, r: 10 }),
  h('path', { d: 'M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3' }),
  h('line', { x1: 12, y1: 17, x2: 12.01, y2: 17 })
])

const AlloyIcon = () => h('svg', { 
  xmlns: 'http://www.w3.org/2000/svg', 
  width: 20, 
  height: 20, 
  viewBox: '0 0 24 24', 
  fill: 'none', 
  stroke: 'currentColor', 
  'stroke-width': 2 
}, [
  h('path', { d: 'M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z' })
])

// State
const activeTab = ref('stencil')

// Tab definitions
const tabs = [
  { id: 'stencil', label: 'Stencil Calculator', icon: StencilIcon },
  { id: 'reflow', label: 'Reflow Profile', icon: ReflowIcon },
  { id: 'defects', label: 'Defect Troubleshooter', icon: DefectIcon },
  { id: 'alloy', label: 'Alloy Selector', icon: AlloyIcon }
]
</script>

<style scoped>
.smt-tools-section {
  scroll-margin-top: 80px;
}

.section-header {
  margin-bottom: var(--space-6);
}

.section-header h2 {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.section-header h2 svg {
  color: var(--color-primary-500);
}

.section-header p {
  font-size: var(--font-size-lg);
  color: var(--color-text-secondary);
  margin: 0;
}

/* Tool Tabs */
.tools-tabs {
  display: flex;
  gap: var(--space-2);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-lg);
  margin-bottom: var(--space-4);
  overflow-x: auto;
}

.tab-button {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: none;
  border: none;
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tab-button:hover {
  color: var(--color-text-primary);
  background-color: var(--color-surface-hover);
}

.tab-button--active {
  color: var(--color-primary-700);
  background-color: var(--color-surface);
  box-shadow: var(--shadow-sm);
}

.tab-icon {
  flex-shrink: 0;
}

/* Tool Content */
.tools-content {
  min-height: 500px;
}

/* Fade transition */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* Tools Info */
.tools-info {
  margin-top: var(--space-6);
}

.info-card {
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
}

.info-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.info-card p {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-4) 0;
  line-height: var(--line-height-relaxed);
}

.info-list {
  margin: 0;
  padding-left: var(--space-5);
}

.info-list li {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
  line-height: var(--line-height-relaxed);
}

.info-list li strong {
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .tools-tabs {
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
  }
  
  .tab-label {
    display: none;
  }
  
  .tab-button {
    padding: var(--space-3);
  }
  
  .section-header h2 {
    font-size: var(--font-size-xl);
  }
  
  .section-header p {
    font-size: var(--font-size-base);
  }
}

@media (min-width: 769px) {
  .tab-label {
    display: inline;
  }
}
</style>
