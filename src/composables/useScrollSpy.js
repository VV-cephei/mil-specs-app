/**
 * useScrollSpy Composable
 * Tracks scroll position and determines which section is currently in view
 * Uses IntersectionObserver for efficient scroll tracking
 */

import { ref, onMounted, onUnmounted, watch } from 'vue'

/**
 * @param {string[]} sectionIds - Array of section IDs to track
 * @param {Object} options - Configuration options
 * @param {number} options.offset - Offset from top of viewport (default: 100)
 * @param {number} options.threshold - Intersection threshold (default: 0.1)
 * @param {string} options.rootMargin - Root margin for observer (default: '-100px 0px -50% 0px')
 * @returns {Object} - { activeSection, setActiveSection }
 */
export function useScrollSpy(sectionIds, options = {}) {
  const {
    offset = 100,
    threshold = 0.1,
    rootMargin = '-100px 0px -50% 0px'
  } = options

  const activeSection = ref(sectionIds[0] || '')
  const visibleSections = ref(new Set())
  let observer = null

  /**
   * Manually set the active section
   * @param {string} sectionId - Section ID to set as active
   */
  function setActiveSection(sectionId) {
    if (sectionIds.includes(sectionId)) {
      activeSection.value = sectionId
    }
  }

  /**
   * Determine which section should be active based on visible sections
   */
  function updateActiveSection() {
    if (visibleSections.value.size === 0) return

    // Find the first visible section in the order they appear in sectionIds
    for (const id of sectionIds) {
      if (visibleSections.value.has(id)) {
        activeSection.value = id
        return
      }
    }
  }

  /**
   * Handle intersection changes
   * @param {IntersectionObserverEntry[]} entries
   */
  function handleIntersection(entries) {
    entries.forEach(entry => {
      const id = entry.target.id
      
      if (entry.isIntersecting) {
        visibleSections.value.add(id)
      } else {
        visibleSections.value.delete(id)
      }
    })

    updateActiveSection()
  }

  /**
   * Initialize the IntersectionObserver
   */
  function initObserver() {
    if (typeof window === 'undefined') return

    // Clean up existing observer
    if (observer) {
      observer.disconnect()
    }

    observer = new IntersectionObserver(handleIntersection, {
      root: null,
      rootMargin,
      threshold
    })

    // Observe all sections
    sectionIds.forEach(id => {
      const element = document.getElementById(id)
      if (element) {
        observer.observe(element)
      }
    })
  }

  /**
   * Clean up the observer
   */
  function cleanup() {
    if (observer) {
      observer.disconnect()
      observer = null
    }
    visibleSections.value.clear()
  }

  /**
   * Refresh the observer (useful when sections are dynamically added/removed)
   */
  function refresh() {
    cleanup()
    initObserver()
  }

  // Watch for changes in sectionIds and reinitialize
  watch(
    () => sectionIds,
    () => {
      refresh()
    },
    { deep: true }
  )

  onMounted(() => {
    initObserver()
  })

  onUnmounted(() => {
    cleanup()
  })

  return {
    activeSection,
    setActiveSection,
    refresh
  }
}

export default useScrollSpy
