<template>
  <section id="glossary" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">SMT Glossary</h2>
      <p class="section-description">
        Quick reference for SMT terminology, acronyms, and definitions.
      </p>
    </div>
    
    <div v-if="hasData" class="glossary-content">
      <!-- Search and Filter -->
      <div class="glossary-controls">
        <div class="search-box">
          <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <input 
            v-model="searchQuery"
            type="text"
            placeholder="Search terms..."
            class="search-input"
          />
          <button 
            v-if="searchQuery"
            class="clear-search"
            @click="searchQuery = ''"
            aria-label="Clear search"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        
        <div class="category-filters">
          <button 
            v-for="category in categories"
            :key="category.id"
            class="category-btn"
            :class="{ 'category-btn--active': activeCategory === category.id }"
            @click="activeCategory = activeCategory === category.id ? null : category.id"
          >
            {{ category.label }}
            <span class="category-count">{{ getCategoryCount(category.id) }}</span>
          </button>
        </div>
      </div>
      
      <!-- Alphabet Quick Nav -->
      <div class="alphabet-nav">
        <button 
          v-for="letter in alphabet"
          :key="letter"
          class="letter-btn"
          :class="{ 
            'letter-btn--active': hasTermsForLetter(letter),
            'letter-btn--current': currentLetter === letter
          }"
          :disabled="!hasTermsForLetter(letter)"
          @click="scrollToLetter(letter)"
        >
          {{ letter }}
        </button>
      </div>
      
      <!-- Terms List -->
      <div class="terms-container">
        <div 
          v-for="letter in lettersWithTerms"
          :key="letter"
          class="letter-group"
          :id="`letter-${letter}`"
        >
          <h3 class="letter-heading">{{ letter }}</h3>
          
          <div class="terms-grid">
            <div 
              v-for="term in getTermsForLetter(letter)"
              :key="term.term"
              class="term-card"
            >
              <div class="term-header">
                <span class="term-abbr">{{ term.term }}</span>
                <span v-if="term.fullName" class="term-full">{{ term.fullName }}</span>
              </div>
              <p class="term-definition">{{ term.definition }}</p>
            </div>
          </div>
        </div>
        
        <!-- No Results -->
        <div v-if="filteredTerms.length === 0" class="no-results">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="11" cy="11" r="8"></circle>
            <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
          </svg>
          <p>No terms found matching "{{ searchQuery }}"</p>
          <button class="clear-btn" @click="clearFilters">Clear Filters</button>
        </div>
      </div>
      
      <!-- Quick Stats -->
      <div class="glossary-stats">
        <div class="stat-item">
          <span class="stat-value">{{ glossary.terms?.length || 0 }}</span>
          <span class="stat-label">Total Terms</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ glossary.standards?.length || 0 }}</span>
          <span class="stat-label">Standards Referenced</span>
        </div>
        <div class="stat-item">
          <span class="stat-value">{{ filteredTerms.length }}</span>
          <span class="stat-label">Showing</span>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading glossary data...</p>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const props = defineProps({
  glossary: {
    type: Object,
    default: () => ({})
  }
})

const hasData = computed(() => {
  return props.glossary?.terms?.length > 0
})

// Search and filter state
const searchQuery = ref('')
const activeCategory = ref(null)
const currentLetter = ref(null)

// Categories for filtering
const categories = [
  { id: 'materials', label: 'Materials', keywords: ['solder', 'flux', 'paste', 'alloy', 'substrate', 'finish'] },
  { id: 'process', label: 'Process', keywords: ['reflow', 'print', 'place', 'profile', 'temperature', 'time'] },
  { id: 'defects', label: 'Defects', keywords: ['defect', 'tombstone', 'bridge', 'void', 'crack', 'whisker', 'embrittlement'] },
  { id: 'equipment', label: 'Equipment', keywords: ['spi', 'aoi', 'axi', 'stencil', 'squeegee', 'oven', 'machine'] },
  { id: 'standards', label: 'Standards', keywords: ['ipc', 'class', 'rohs', 'jedec', 'standard'] }
]

// Alphabet for navigation
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

// Filter terms based on search and category
const filteredTerms = computed(() => {
  let terms = props.glossary?.terms || []
  
  // Filter by search query
  if (searchQuery.value) {
    const query = searchQuery.value.toLowerCase()
    terms = terms.filter(term => 
      term.term.toLowerCase().includes(query) ||
      (term.fullName && term.fullName.toLowerCase().includes(query)) ||
      term.definition.toLowerCase().includes(query)
    )
  }
  
  // Filter by category
  if (activeCategory.value) {
    const category = categories.find(c => c.id === activeCategory.value)
    if (category) {
      terms = terms.filter(term => {
        const searchText = `${term.term} ${term.fullName || ''} ${term.definition}`.toLowerCase()
        return category.keywords.some(keyword => searchText.includes(keyword))
      })
    }
  }
  
  return [...terms].sort((a, b) => a.term.localeCompare(b.term))
})

// Get letters that have terms
const lettersWithTerms = computed(() => {
  const letters = new Set()
  filteredTerms.value.forEach(term => {
    const firstLetter = term.term.charAt(0).toUpperCase()
    if (alphabet.includes(firstLetter)) {
      letters.add(firstLetter)
    }
  })
  return Array.from(letters).sort()
})

// Check if a letter has terms
function hasTermsForLetter(letter) {
  return filteredTerms.value.some(term => 
    term.term.charAt(0).toUpperCase() === letter
  )
}

// Get terms for a specific letter
function getTermsForLetter(letter) {
  return filteredTerms.value.filter(term => 
    term.term.charAt(0).toUpperCase() === letter
  )
}

// Get count for a category
function getCategoryCount(categoryId) {
  const category = categories.find(c => c.id === categoryId)
  if (!category) return 0
  
  const terms = props.glossary?.terms || []
  return terms.filter(term => {
    const searchText = `${term.term} ${term.fullName || ''} ${term.definition}`.toLowerCase()
    return category.keywords.some(keyword => searchText.includes(keyword))
  }).length
}

// Scroll to a letter section
function scrollToLetter(letter) {
  currentLetter.value = letter
  const element = document.getElementById(`letter-${letter}`)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

// Clear all filters
function clearFilters() {
  searchQuery.value = ''
  activeCategory.value = null
  currentLetter.value = null
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

.glossary-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
}

/* Controls */
.glossary-controls {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
}

.search-box {
  position: relative;
  display: flex;
  align-items: center;
  max-width: 400px;
}

.search-box svg {
  position: absolute;
  left: var(--space-3);
  color: var(--color-text-tertiary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: var(--space-3) var(--space-10);
  font-size: var(--font-size-base);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  background-color: var(--color-surface);
  color: var(--color-text-primary);
  transition: border-color var(--transition-fast);
}

.search-input:focus {
  outline: none;
  border-color: var(--color-primary-500);
}

.search-input::placeholder {
  color: var(--color-text-tertiary);
}

.clear-search {
  position: absolute;
  right: var(--space-3);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background: none;
  border: none;
  color: var(--color-text-tertiary);
  cursor: pointer;
  border-radius: var(--radius-full);
  transition: all var(--transition-fast);
}

.clear-search:hover {
  background-color: var(--color-surface-elevated);
  color: var(--color-text-secondary);
}

.category-filters {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.category-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-3);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  color: var(--color-text-secondary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.category-btn:hover {
  border-color: var(--color-primary-300);
  color: var(--color-primary-600);
}

.category-btn--active {
  background-color: var(--color-primary-500);
  border-color: var(--color-primary-500);
  color: white;
}

.category-count {
  font-size: var(--font-size-xs);
  padding: 2px 6px;
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: var(--radius-full);
}

.category-btn--active .category-count {
  background-color: rgba(255, 255, 255, 0.2);
}

/* Alphabet Nav */
.alphabet-nav {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  padding: var(--space-3);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.letter-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background: none;
  border: none;
  border-radius: var(--radius-default);
  color: var(--color-text-tertiary);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.letter-btn:disabled {
  opacity: 0.3;
  cursor: not-allowed;
}

.letter-btn--active:not(:disabled) {
  color: var(--color-text-primary);
}

.letter-btn--active:not(:disabled):hover {
  background-color: var(--color-surface-elevated);
  color: var(--color-primary-600);
}

.letter-btn--current {
  background-color: var(--color-primary-500);
  color: white;
}

/* Terms Container */
.terms-container {
  display: flex;
  flex-direction: column;
  gap: var(--space-8);
}

.letter-group {
  scroll-margin-top: 120px;
}

.letter-heading {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin: 0 0 var(--space-4) 0;
  padding-bottom: var(--space-2);
  border-bottom: 2px solid var(--color-primary-200);
}

.terms-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
  gap: var(--space-4);
}

.term-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
  transition: border-color var(--transition-fast);
}

.term-card:hover {
  border-color: var(--color-primary-300);
}

.term-header {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  margin-bottom: var(--space-2);
}

.term-abbr {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  font-family: var(--font-family-mono);
}

.term-full {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.term-definition {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* No Results */
.no-results {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-4);
  padding: var(--space-12);
  text-align: center;
  color: var(--color-text-tertiary);
}

.no-results svg {
  opacity: 0.5;
}

.no-results p {
  font-size: var(--font-size-base);
  margin: 0;
}

.clear-btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  background-color: var(--color-primary-500);
  border: none;
  border-radius: var(--radius-default);
  color: white;
  cursor: pointer;
  transition: background-color var(--transition-fast);
}

.clear-btn:hover {
  background-color: var(--color-primary-600);
}

/* Stats */
.glossary-stats {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-6);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
}

.stat-value {
  font-size: var(--font-size-2xl);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

.stat-label {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
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
  
  .search-box {
    max-width: 100%;
  }
  
  .alphabet-nav {
    justify-content: center;
  }
  
  .letter-btn {
    width: 28px;
    height: 28px;
    font-size: var(--font-size-xs);
  }
  
  .terms-grid {
    grid-template-columns: 1fr;
  }
  
  .glossary-stats {
    flex-direction: column;
    gap: var(--space-4);
  }
}
</style>
