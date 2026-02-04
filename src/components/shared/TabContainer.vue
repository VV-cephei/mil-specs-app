<template>
  <div class="tab-container" :class="[`tab-container--${variant}`]">
    <div 
      class="tab-header" 
      role="tablist" 
      :aria-label="ariaLabel"
    >
      <button
        v-for="tab in tabs"
        :key="tab.id"
        role="tab"
        class="tab-button"
        :class="{ 'tab-button--active': modelValue === tab.id }"
        :id="`tab-${tab.id}`"
        :aria-selected="modelValue === tab.id"
        :aria-controls="`panel-${tab.id}`"
        :tabindex="modelValue === tab.id ? 0 : -1"
        @click="selectTab(tab.id)"
        @keydown="handleKeydown($event, tab.id)"
      >
        <span v-if="tab.icon" class="tab-icon" v-html="tab.icon"></span>
        <span class="tab-label">{{ tab.label }}</span>
        <span v-if="tab.badge" class="tab-badge">{{ tab.badge }}</span>
      </button>
    </div>
    <div class="tab-content">
      <div
        v-for="tab in tabs"
        :key="tab.id"
        role="tabpanel"
        class="tab-panel"
        :class="{ 'tab-panel--active': modelValue === tab.id }"
        :id="`panel-${tab.id}`"
        :aria-labelledby="`tab-${tab.id}`"
        :hidden="modelValue !== tab.id"
      >
        <slot :name="tab.id" v-if="modelValue === tab.id"></slot>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  tabs: {
    type: Array,
    required: true,
    validator: (value) => value.every(tab => tab.id && tab.label)
  },
  modelValue: {
    type: String,
    required: true
  },
  variant: {
    type: String,
    default: 'default',
    validator: (value) => ['default', 'pills', 'underline'].includes(value)
  },
  ariaLabel: {
    type: String,
    default: 'Tab navigation'
  }
})

const emit = defineEmits(['update:modelValue'])

const tabIds = computed(() => props.tabs.map(tab => tab.id))

function selectTab(tabId) {
  emit('update:modelValue', tabId)
}

function handleKeydown(event, currentTabId) {
  const currentIndex = tabIds.value.indexOf(currentTabId)
  let newIndex = currentIndex
  
  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowUp':
      event.preventDefault()
      newIndex = currentIndex > 0 ? currentIndex - 1 : tabIds.value.length - 1
      break
    case 'ArrowRight':
    case 'ArrowDown':
      event.preventDefault()
      newIndex = currentIndex < tabIds.value.length - 1 ? currentIndex + 1 : 0
      break
    case 'Home':
      event.preventDefault()
      newIndex = 0
      break
    case 'End':
      event.preventDefault()
      newIndex = tabIds.value.length - 1
      break
    default:
      return
  }
  
  const newTabId = tabIds.value[newIndex]
  selectTab(newTabId)
  
  // Focus the new tab button
  const newTabButton = document.getElementById(`tab-${newTabId}`)
  if (newTabButton) {
    newTabButton.focus()
  }
}
</script>

<style scoped>
.tab-container {
  width: 100%;
}

.tab-header {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-4);
}

.tab-button {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-secondary);
  background: transparent;
  border: none;
  cursor: pointer;
  transition: all var(--transition-fast);
  white-space: nowrap;
}

.tab-button:hover {
  color: var(--color-text-primary);
}

.tab-button:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.tab-button:focus:not(:focus-visible) {
  outline: none;
}

.tab-button--active {
  color: var(--color-primary-600);
}

/* Default variant */
.tab-container--default .tab-header {
  border-bottom: 1px solid var(--color-border-light);
}

.tab-container--default .tab-button {
  position: relative;
  padding-bottom: var(--space-3);
  margin-bottom: -1px;
}

.tab-container--default .tab-button--active::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 2px;
  background-color: var(--color-primary-500);
}

/* Pills variant */
.tab-container--pills .tab-header {
  background-color: var(--color-surface-elevated);
  padding: var(--space-1);
  border-radius: var(--radius-default);
}

.tab-container--pills .tab-button {
  border-radius: var(--radius-default);
}

.tab-container--pills .tab-button--active {
  background-color: var(--color-surface);
  color: var(--color-primary-600);
  box-shadow: var(--shadow-sm);
}

/* Underline variant */
.tab-container--underline .tab-button {
  padding-bottom: var(--space-3);
  border-bottom: 2px solid transparent;
}

.tab-container--underline .tab-button--active {
  border-bottom-color: var(--color-primary-500);
}

.tab-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
}

.tab-icon :deep(svg) {
  width: 100%;
  height: 100%;
}

.tab-badge {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 18px;
  height: 18px;
  padding: 0 var(--space-1);
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  background-color: var(--color-accent-100);
  color: var(--color-accent-700);
  border-radius: var(--radius-full);
}

.tab-content {
  position: relative;
}

.tab-panel {
  display: none;
}

.tab-panel--active {
  display: block;
  animation: fadeIn 0.2s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsive */
@media (max-width: 576px) {
  .tab-header {
    overflow-x: auto;
    flex-wrap: nowrap;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
  }
  
  .tab-header::-webkit-scrollbar {
    display: none;
  }
  
  .tab-button {
    flex-shrink: 0;
  }
}
</style>
