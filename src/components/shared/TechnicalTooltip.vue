<template>
  <span 
    class="tooltip-wrapper"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
    @focus="showTooltip"
    @blur="hideTooltip"
    @keydown.escape="hideTooltip"
    tabindex="0"
    :aria-describedby="tooltipId"
  >
    <slot>
      <span class="tooltip-trigger">{{ term }}</span>
    </slot>
    <Teleport to="body">
      <Transition name="tooltip-fade">
        <div
          v-if="isVisible"
          :id="tooltipId"
          role="tooltip"
          class="tooltip-content"
          :class="[`tooltip-${placement}`]"
          :style="tooltipStyle"
          ref="tooltipRef"
        >
          <div class="tooltip-header" v-if="term">
            <span class="tooltip-term">{{ term }}</span>
          </div>
          <div class="tooltip-body">
            {{ definition }}
          </div>
          <div class="tooltip-arrow" :class="[`arrow-${placement}`]"></div>
        </div>
      </Transition>
    </Teleport>
  </span>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'

const props = defineProps({
  term: {
    type: String,
    default: ''
  },
  definition: {
    type: String,
    required: true
  },
  placement: {
    type: String,
    default: 'top',
    validator: (value) => ['top', 'bottom', 'left', 'right'].includes(value)
  },
  maxWidth: {
    type: String,
    default: '300px'
  }
})

const isVisible = ref(false)
const tooltipRef = ref(null)
const triggerRect = ref(null)
const tooltipId = computed(() => `tooltip-${Math.random().toString(36).substr(2, 9)}`)

let showTimeout = null
let hideTimeout = null

const tooltipStyle = computed(() => {
  if (!triggerRect.value) return { maxWidth: props.maxWidth }
  
  const rect = triggerRect.value
  const offset = 8
  let top, left
  
  switch (props.placement) {
    case 'top':
      top = rect.top - offset
      left = rect.left + rect.width / 2
      break
    case 'bottom':
      top = rect.bottom + offset
      left = rect.left + rect.width / 2
      break
    case 'left':
      top = rect.top + rect.height / 2
      left = rect.left - offset
      break
    case 'right':
      top = rect.top + rect.height / 2
      left = rect.right + offset
      break
  }
  
  return {
    maxWidth: props.maxWidth,
    top: `${top}px`,
    left: `${left}px`
  }
})

function showTooltip(event) {
  clearTimeout(hideTimeout)
  showTimeout = setTimeout(() => {
    const target = event.currentTarget
    triggerRect.value = target.getBoundingClientRect()
    isVisible.value = true
    nextTick(() => {
      adjustPosition()
    })
  }, 200)
}

function hideTooltip() {
  clearTimeout(showTimeout)
  hideTimeout = setTimeout(() => {
    isVisible.value = false
  }, 150)
}

function adjustPosition() {
  if (!tooltipRef.value || !triggerRect.value) return
  
  const tooltip = tooltipRef.value
  const tooltipRect = tooltip.getBoundingClientRect()
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight
  
  // Adjust if tooltip goes off screen
  if (tooltipRect.right > viewportWidth) {
    tooltip.style.left = `${viewportWidth - tooltipRect.width - 10}px`
  }
  if (tooltipRect.left < 0) {
    tooltip.style.left = '10px'
  }
  if (tooltipRect.bottom > viewportHeight) {
    tooltip.style.top = `${viewportHeight - tooltipRect.height - 10}px`
  }
  if (tooltipRect.top < 0) {
    tooltip.style.top = '10px'
  }
}

onMounted(() => {
  window.addEventListener('scroll', hideTooltip, true)
  window.addEventListener('resize', hideTooltip)
})

onUnmounted(() => {
  clearTimeout(showTimeout)
  clearTimeout(hideTimeout)
  window.removeEventListener('scroll', hideTooltip, true)
  window.removeEventListener('resize', hideTooltip)
})
</script>

<style scoped>
.tooltip-wrapper {
  display: inline;
  position: relative;
  cursor: help;
}

.tooltip-trigger {
  border-bottom: 1px dashed var(--color-accent-500);
  color: var(--color-accent-600);
  font-weight: var(--font-weight-medium);
}

.tooltip-content {
  position: fixed;
  z-index: 9999;
  padding: var(--space-3);
  background-color: var(--color-primary-700);
  color: var(--color-text-inverse);
  border-radius: var(--radius-default);
  box-shadow: var(--shadow-lg);
  font-size: var(--font-size-sm);
  line-height: 1.5;
  pointer-events: none;
}

.tooltip-top {
  transform: translateX(-50%) translateY(-100%);
}

.tooltip-bottom {
  transform: translateX(-50%);
}

.tooltip-left {
  transform: translateX(-100%) translateY(-50%);
}

.tooltip-right {
  transform: translateY(-50%);
}

.tooltip-header {
  margin-bottom: var(--space-2);
  padding-bottom: var(--space-2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
}

.tooltip-term {
  font-weight: var(--font-weight-semibold);
  color: var(--color-accent-300);
}

.tooltip-body {
  color: rgba(255, 255, 255, 0.9);
}

.tooltip-arrow {
  position: absolute;
  width: 8px;
  height: 8px;
  background-color: var(--color-primary-700);
  transform: rotate(45deg);
}

.arrow-top {
  bottom: -4px;
  left: 50%;
  margin-left: -4px;
}

.arrow-bottom {
  top: -4px;
  left: 50%;
  margin-left: -4px;
}

.arrow-left {
  right: -4px;
  top: 50%;
  margin-top: -4px;
}

.arrow-right {
  left: -4px;
  top: 50%;
  margin-top: -4px;
}

/* Transition */
.tooltip-fade-enter-active,
.tooltip-fade-leave-active {
  transition: opacity 0.15s ease, transform 0.15s ease;
}

.tooltip-fade-enter-from,
.tooltip-fade-leave-to {
  opacity: 0;
}

.tooltip-fade-enter-from.tooltip-top,
.tooltip-fade-leave-to.tooltip-top {
  transform: translateX(-50%) translateY(calc(-100% + 5px));
}

.tooltip-fade-enter-from.tooltip-bottom,
.tooltip-fade-leave-to.tooltip-bottom {
  transform: translateX(-50%) translateY(-5px);
}

/* Focus styles for accessibility */
.tooltip-wrapper:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
  border-radius: var(--radius-sm);
}

.tooltip-wrapper:focus:not(:focus-visible) {
  outline: none;
}
</style>
