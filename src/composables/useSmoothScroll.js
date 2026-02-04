/**
 * useSmoothScroll Composable
 * Provides smooth scrolling functionality with configurable easing
 */

/**
 * Easing functions for smooth scrolling
 */
const easingFunctions = {
  linear: (t) => t,
  easeInQuad: (t) => t * t,
  easeOutQuad: (t) => t * (2 - t),
  easeInOutQuad: (t) => (t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t),
  easeInCubic: (t) => t * t * t,
  easeOutCubic: (t) => (--t) * t * t + 1,
  easeInOutCubic: (t) => (t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1),
  easeInQuart: (t) => t * t * t * t,
  easeOutQuart: (t) => 1 - (--t) * t * t * t,
  easeInOutQuart: (t) => (t < 0.5 ? 8 * t * t * t * t : 1 - 8 * (--t) * t * t * t)
}

/**
 * @param {Object} options - Configuration options
 * @param {number} options.duration - Animation duration in ms (default: 600)
 * @param {number} options.offset - Offset from target element (default: 80)
 * @param {string} options.easing - Easing function name (default: 'easeInOutCubic')
 * @returns {Object} - { scrollToSection, scrollToTop, scrollToElement }
 */
export function useSmoothScroll(options = {}) {
  const {
    duration = 600,
    offset = 80,
    easing = 'easeInOutCubic'
  } = options

  let isScrolling = false
  let scrollAnimationId = null

  /**
   * Get the easing function
   * @param {string} easingName - Name of the easing function
   * @returns {Function} - Easing function
   */
  function getEasingFunction(easingName) {
    return easingFunctions[easingName] || easingFunctions.easeInOutCubic
  }

  /**
   * Animate scroll to a target position
   * @param {number} targetPosition - Target scroll position
   * @param {Object} scrollOptions - Override options for this scroll
   */
  function animateScroll(targetPosition, scrollOptions = {}) {
    const scrollDuration = scrollOptions.duration ?? duration
    const easingFn = getEasingFunction(scrollOptions.easing ?? easing)

    if (isScrolling && scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId)
    }

    const startPosition = window.pageYOffset
    const distance = targetPosition - startPosition
    let startTime = null
    isScrolling = true

    function step(currentTime) {
      if (!startTime) startTime = currentTime
      const elapsed = currentTime - startTime
      const progress = Math.min(elapsed / scrollDuration, 1)
      const easedProgress = easingFn(progress)

      window.scrollTo(0, startPosition + distance * easedProgress)

      if (progress < 1) {
        scrollAnimationId = requestAnimationFrame(step)
      } else {
        isScrolling = false
        scrollAnimationId = null
      }
    }

    scrollAnimationId = requestAnimationFrame(step)
  }

  /**
   * Scroll to a section by ID
   * @param {string} sectionId - ID of the section to scroll to
   * @param {Object} scrollOptions - Override options for this scroll
   * @returns {boolean} - True if element was found and scroll initiated
   */
  function scrollToSection(sectionId, scrollOptions = {}) {
    if (typeof window === 'undefined') return false

    const element = document.getElementById(sectionId)
    if (!element) {
      console.warn(`[useSmoothScroll] Element with id "${sectionId}" not found`)
      return false
    }

    return scrollToElement(element, scrollOptions)
  }

  /**
   * Scroll to an element
   * @param {HTMLElement} element - Element to scroll to
   * @param {Object} scrollOptions - Override options for this scroll
   * @returns {boolean} - True if scroll was initiated
   */
  function scrollToElement(element, scrollOptions = {}) {
    if (typeof window === 'undefined' || !element) return false

    const scrollOffset = scrollOptions.offset ?? offset
    const rect = element.getBoundingClientRect()
    const targetPosition = rect.top + window.pageYOffset - scrollOffset

    animateScroll(targetPosition, scrollOptions)
    return true
  }

  /**
   * Scroll to the top of the page
   * @param {Object} scrollOptions - Override options for this scroll
   */
  function scrollToTop(scrollOptions = {}) {
    if (typeof window === 'undefined') return

    animateScroll(0, scrollOptions)
  }

  /**
   * Scroll to the bottom of the page
   * @param {Object} scrollOptions - Override options for this scroll
   */
  function scrollToBottom(scrollOptions = {}) {
    if (typeof window === 'undefined') return

    const targetPosition = document.documentElement.scrollHeight - window.innerHeight
    animateScroll(targetPosition, scrollOptions)
  }

  /**
   * Cancel any ongoing scroll animation
   */
  function cancelScroll() {
    if (scrollAnimationId) {
      cancelAnimationFrame(scrollAnimationId)
      scrollAnimationId = null
      isScrolling = false
    }
  }

  /**
   * Check if currently scrolling
   * @returns {boolean}
   */
  function getIsScrolling() {
    return isScrolling
  }

  return {
    scrollToSection,
    scrollToElement,
    scrollToTop,
    scrollToBottom,
    cancelScroll,
    isScrolling: getIsScrolling
  }
}

export default useSmoothScroll
