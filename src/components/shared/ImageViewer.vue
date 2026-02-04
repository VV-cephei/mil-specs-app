<template>
  <div class="image-viewer">
    <!-- Thumbnail/Preview -->
    <div 
      class="image-preview"
      :class="{ 'image-preview--zoomable': zoomable }"
      @click="zoomable ? openModal() : null"
      @keydown.enter="zoomable ? openModal() : null"
      :tabindex="zoomable ? 0 : -1"
      role="button"
      :aria-label="zoomable ? `View larger image: ${alt}` : undefined"
    >
      <img 
        :src="src" 
        :alt="alt"
        class="preview-image"
        loading="lazy"
      />
      <div v-if="zoomable" class="zoom-indicator">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="11" cy="11" r="8"/>
          <line x1="21" y1="21" x2="16.65" y2="16.65"/>
          <line x1="11" y1="8" x2="11" y2="14"/>
          <line x1="8" y1="11" x2="14" y2="11"/>
        </svg>
      </div>
    </div>
    
    <!-- Caption -->
    <p v-if="caption" class="image-caption">{{ caption }}</p>
    
    <!-- Modal -->
    <Teleport to="body">
      <Transition name="modal-fade">
        <div 
          v-if="isModalOpen" 
          class="image-modal-overlay"
          @click.self="closeModal"
          @keydown.escape="closeModal"
          tabindex="-1"
          ref="modalOverlay"
        >
          <div class="image-modal">
            <button 
              class="modal-close-btn"
              @click="closeModal"
              aria-label="Close image viewer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"/>
                <line x1="6" y1="6" x2="18" y2="18"/>
              </svg>
            </button>
            
            <div 
              class="modal-image-container"
              ref="imageContainer"
              @wheel.prevent="handleWheel"
              @mousedown="startPan"
              @mousemove="pan"
              @mouseup="endPan"
              @mouseleave="endPan"
              @touchstart="handleTouchStart"
              @touchmove="handleTouchMove"
              @touchend="handleTouchEnd"
            >
              <img 
                :src="src" 
                :alt="alt"
                class="modal-image"
                :style="imageStyle"
                draggable="false"
              />
            </div>
            
            <div class="modal-controls">
              <button 
                class="control-btn"
                @click="zoomOut"
                :disabled="zoomLevel <= 1"
                aria-label="Zoom out"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>
              <span class="zoom-level">{{ Math.round(zoomLevel * 100) }}%</span>
              <button 
                class="control-btn"
                @click="zoomIn"
                :disabled="zoomLevel >= maxZoom"
                aria-label="Zoom in"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <circle cx="11" cy="11" r="8"/>
                  <line x1="21" y1="21" x2="16.65" y2="16.65"/>
                  <line x1="11" y1="8" x2="11" y2="14"/>
                  <line x1="8" y1="11" x2="14" y2="11"/>
                </svg>
              </button>
              <button 
                class="control-btn"
                @click="resetZoom"
                aria-label="Reset zoom"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                  <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
                  <path d="M3 3v5h5"/>
                </svg>
              </button>
            </div>
            
            <p v-if="caption" class="modal-caption">{{ caption }}</p>
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<script setup>
import { ref, computed, watch, nextTick } from 'vue'

const props = defineProps({
  src: {
    type: String,
    required: true
  },
  alt: {
    type: String,
    required: true
  },
  caption: {
    type: String,
    default: ''
  },
  zoomable: {
    type: Boolean,
    default: true
  },
  maxZoom: {
    type: Number,
    default: 3
  }
})

const emit = defineEmits(['close', 'zoom-change'])

const isModalOpen = ref(false)
const zoomLevel = ref(1)
const panX = ref(0)
const panY = ref(0)
const isPanning = ref(false)
const startX = ref(0)
const startY = ref(0)
const modalOverlay = ref(null)
const imageContainer = ref(null)

// Touch handling
const lastTouchDistance = ref(0)

const imageStyle = computed(() => ({
  transform: `scale(${zoomLevel.value}) translate(${panX.value}px, ${panY.value}px)`,
  cursor: zoomLevel.value > 1 ? (isPanning.value ? 'grabbing' : 'grab') : 'default'
}))

function openModal() {
  isModalOpen.value = true
  document.body.style.overflow = 'hidden'
  nextTick(() => {
    modalOverlay.value?.focus()
  })
}

function closeModal() {
  isModalOpen.value = false
  document.body.style.overflow = ''
  resetZoom()
  emit('close')
}

function zoomIn() {
  if (zoomLevel.value < props.maxZoom) {
    zoomLevel.value = Math.min(zoomLevel.value + 0.5, props.maxZoom)
    emit('zoom-change', zoomLevel.value)
  }
}

function zoomOut() {
  if (zoomLevel.value > 1) {
    zoomLevel.value = Math.max(zoomLevel.value - 0.5, 1)
    if (zoomLevel.value === 1) {
      panX.value = 0
      panY.value = 0
    }
    emit('zoom-change', zoomLevel.value)
  }
}

function resetZoom() {
  zoomLevel.value = 1
  panX.value = 0
  panY.value = 0
  emit('zoom-change', zoomLevel.value)
}

function handleWheel(event) {
  if (event.deltaY < 0) {
    zoomIn()
  } else {
    zoomOut()
  }
}

function startPan(event) {
  if (zoomLevel.value <= 1) return
  isPanning.value = true
  startX.value = event.clientX - panX.value
  startY.value = event.clientY - panY.value
}

function pan(event) {
  if (!isPanning.value || zoomLevel.value <= 1) return
  panX.value = event.clientX - startX.value
  panY.value = event.clientY - startY.value
}

function endPan() {
  isPanning.value = false
}

// Touch handlers for pinch-to-zoom
function handleTouchStart(event) {
  if (event.touches.length === 2) {
    lastTouchDistance.value = getTouchDistance(event.touches)
  } else if (event.touches.length === 1 && zoomLevel.value > 1) {
    isPanning.value = true
    startX.value = event.touches[0].clientX - panX.value
    startY.value = event.touches[0].clientY - panY.value
  }
}

function handleTouchMove(event) {
  if (event.touches.length === 2) {
    const distance = getTouchDistance(event.touches)
    const delta = distance - lastTouchDistance.value
    
    if (delta > 0 && zoomLevel.value < props.maxZoom) {
      zoomLevel.value = Math.min(zoomLevel.value + 0.02, props.maxZoom)
    } else if (delta < 0 && zoomLevel.value > 1) {
      zoomLevel.value = Math.max(zoomLevel.value - 0.02, 1)
    }
    
    lastTouchDistance.value = distance
    emit('zoom-change', zoomLevel.value)
  } else if (event.touches.length === 1 && isPanning.value) {
    panX.value = event.touches[0].clientX - startX.value
    panY.value = event.touches[0].clientY - startY.value
  }
}

function handleTouchEnd() {
  isPanning.value = false
  lastTouchDistance.value = 0
  if (zoomLevel.value === 1) {
    panX.value = 0
    panY.value = 0
  }
}

function getTouchDistance(touches) {
  const dx = touches[0].clientX - touches[1].clientX
  const dy = touches[0].clientY - touches[1].clientY
  return Math.sqrt(dx * dx + dy * dy)
}

// Cleanup on unmount
watch(isModalOpen, (newVal) => {
  if (!newVal) {
    document.body.style.overflow = ''
  }
})
</script>

<style scoped>
.image-viewer {
  display: inline-block;
}

.image-preview {
  position: relative;
  display: inline-block;
  border-radius: var(--radius-default);
  overflow: hidden;
  background-color: var(--color-surface-elevated);
}

.image-preview--zoomable {
  cursor: zoom-in;
}

.image-preview--zoomable:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.preview-image {
  display: block;
  max-width: 100%;
  height: auto;
}

.zoom-indicator {
  position: absolute;
  bottom: var(--space-2);
  right: var(--space-2);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background-color: rgba(0, 0, 0, 0.6);
  color: white;
  border-radius: var(--radius-default);
  opacity: 0;
  transition: opacity var(--transition-fast);
}

.image-preview--zoomable:hover .zoom-indicator,
.image-preview--zoomable:focus .zoom-indicator {
  opacity: 1;
}

.image-caption {
  margin-top: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  text-align: center;
}

/* Modal */
.image-modal-overlay {
  position: fixed;
  inset: 0;
  z-index: 9999;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.9);
}

.image-modal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 95vw;
  max-height: 95vh;
}

.modal-close-btn {
  position: absolute;
  top: var(--space-4);
  right: var(--space-4);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  background-color: rgba(255, 255, 255, 0.1);
  color: white;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.modal-close-btn:hover {
  background-color: rgba(255, 255, 255, 0.2);
}

.modal-close-btn:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.modal-image-container {
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  max-width: 90vw;
  max-height: 80vh;
}

.modal-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
  transition: transform 0.1s ease;
  user-select: none;
}

.modal-controls {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-top: var(--space-4);
  padding: var(--space-2) var(--space-4);
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: var(--radius-full);
}

.control-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: transparent;
  color: white;
  border: none;
  border-radius: var(--radius-full);
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.control-btn:hover:not(:disabled) {
  background-color: rgba(255, 255, 255, 0.2);
}

.control-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.control-btn:focus {
  outline: 2px solid var(--color-accent-500);
  outline-offset: 2px;
}

.zoom-level {
  min-width: 50px;
  text-align: center;
  font-size: var(--font-size-sm);
  color: white;
}

.modal-caption {
  margin-top: var(--space-4);
  font-size: var(--font-size-base);
  color: rgba(255, 255, 255, 0.8);
  text-align: center;
}

/* Transitions */
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.2s ease;
}

.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
