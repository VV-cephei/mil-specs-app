<template>
  <div 
    class="accordion-panel" 
    :class="[
      `accordion-panel--${variant}`,
      { 'accordion-panel--expanded': isExpanded }
    ]"
  >
    <button
      class="accordion-header"
      :aria-expanded="isExpanded"
      :aria-controls="contentId"
      @click="toggle"
      @keydown.enter.prevent="toggle"
      @keydown.space.prevent="toggle"
    >
      <slot name="header">
        <span v-if="icon" class="accordion-icon" v-html="icon"></span>
        <div class="accordion-title-wrapper">
          <span class="accordion-title">{{ title }}</span>
          <span v-if="subtitle" class="accordion-subtitle">{{ subtitle }}</span>
        </div>
      </slot>
      <span class="accordion-chevron" :class="{ 'accordion-chevron--rotated': isExpanded }">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </span>
    </button>
    <div
      :id="contentId"
      class="accordion-content-wrapper"
      :aria-hidden="!isExpanded"
      ref="contentWrapper"
    >
      <div class="accordion-content" ref="content">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, onMounted, nextTick } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  },
  icon: {
    type: String,
    default: ''
  },
  expanded: {
    type: Boolean,
    default: false
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'bordered', 'filled'].includes(value)
  }
})

const emit = defineEmits(['toggle'])

const isExpanded = ref(props.expanded)
const contentWrapper = ref(null)
const content = ref(null)
const contentId = computed(() => `accordion-content-${Math.random().toString(36).substr(2, 9)}`)

function toggle() {
  isExpanded.value = !isExpanded.value
  emit('toggle', isExpanded.value)
}

function updateHeight() {
  if (!contentWrapper.value || !content.value) return
  
  if (isExpanded.value) {
    contentWrapper.value.style.maxHeight = `${content.value.scrollHeight}px`
  } else {
    contentWrapper.value.style.maxHeight = '0px'
  }
}

watch(isExpanded, () => {
  nextTick(updateHeight)
})

watch(() => props.expanded, (newVal) => {
  isExpanded.value = newVal
})

onMounted(() => {
  updateHeight()
  
  // Watch for content changes
  if (content.value) {
    const observer = new ResizeObserver(() => {
      if (isExpanded.value) {
        updateHeight()
      }
    })
    observer.observe(content.value)
  }
})
</script>

<style scoped>
.accordion-panel {
  width: 100%;
}

.accordion-header {
  display: flex;
  align-items: center;
  width: 100%;
  padding: var(--space-4);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  background: transparent;
  border: none;
  cursor: pointer;
  text-align: left;
  transition: all var(--transition-fast);
}

.accordion-header:hover {
  background-color: var(--color-surface-hover);
}

.accordion-header:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: -2px;
}

.accordion-header:focus:not(:focus-visible) {
  outline: none;
}

.accordion-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-right: var(--space-3);
  color: var(--color-primary-500);
}

.accordion-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.accordion-title-wrapper {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.accordion-title {
  font-weight: var(--font-weight-semibold);
}

.accordion-subtitle {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-normal);
  color: var(--color-text-secondary);
}

.accordion-chevron {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  margin-left: var(--space-3);
  color: var(--color-text-secondary);
  transition: transform 0.3s ease;
}

.accordion-chevron--rotated {
  transform: rotate(180deg);
}

.accordion-content-wrapper {
  max-height: 0;
  overflow: hidden;
  transition: max-height 0.3s ease-out;
}

.accordion-content {
  padding: 0 var(--space-4) var(--space-4);
}

/* Default variant */
.accordion-panel--default {
  border-bottom: 1px solid var(--color-border-light);
}

.accordion-panel--default:first-child {
  border-top: 1px solid var(--color-border-light);
}

/* Bordered variant */
.accordion-panel--bordered {
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-default);
  margin-bottom: var(--space-2);
}

.accordion-panel--bordered .accordion-header {
  border-radius: var(--radius-default);
}

.accordion-panel--bordered.accordion-panel--expanded .accordion-header {
  border-radius: var(--radius-default) var(--radius-default) 0 0;
}

/* Filled variant */
.accordion-panel--filled {
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
  margin-bottom: var(--space-2);
}

.accordion-panel--filled .accordion-header {
  border-radius: var(--radius-default);
}

.accordion-panel--filled.accordion-panel--expanded .accordion-header {
  border-radius: var(--radius-default) var(--radius-default) 0 0;
  background-color: var(--color-surface);
}

.accordion-panel--filled .accordion-content {
  background-color: var(--color-surface);
  border-radius: 0 0 var(--radius-default) var(--radius-default);
}

/* Expanded state styling */
.accordion-panel--expanded .accordion-header {
  color: var(--color-primary-600);
}

.accordion-panel--expanded .accordion-chevron {
  color: var(--color-primary-500);
}
</style>
