<template>
  <div class="mil-spec-view">
    <v-container fluid class="pa-0">
      <v-row no-gutters>
        <!-- Sidebar Navigation -->
        <v-col cols="12" md="3" lg="2" class="sidebar-col">
          <v-card class="rounded-0 h-100" elevation="2">
            <v-card-title class="text-subtitle-1 font-weight-bold pa-4">
              <v-icon icon="mdi-menu" class="mr-2"></v-icon>
              Navigation
            </v-card-title>
            <v-divider></v-divider>
            <v-list nav density="compact">
              <v-list-item
                v-for="section in sections"
                :key="section.id"
                :active="activeSection === section.id"
                :to="`/specs?section=${section.id}`"
                @click="setActiveSection(section.id)"
              >
                <template v-slot:prepend>
                  <v-icon :icon="section.icon" size="small"></v-icon>
                </template>
                <v-list-item-title>{{ section.title }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
        
        <!-- Main Content -->
        <v-col cols="12" md="9" lg="10" class="pa-4">
          <v-card elevation="2">
            <v-card-title class="d-flex align-center flex-wrap ga-4 pa-4">
              <span class="text-h5 font-weight-bold">
                <v-icon icon="mdi-book-open-variant" class="mr-2"></v-icon>
                MIL-STD-2073: {{ currentSectionTitle }}
              </span>
              <v-spacer></v-spacer>
              <v-text-field
                v-model="searchQuery"
                prepend-inner-icon="mdi-magnify"
                label="Search..."
                single-line
                hide-details
                density="compact"
                variant="outlined"
                style="max-width: 300px"
                @input="handleSearch"
              ></v-text-field>
            </v-card-title>
            
            <v-divider></v-divider>
            
            <v-card-text class="pa-4">
              <!-- Loading State -->
              <div v-if="specsStore.loading" class="text-center py-8">
                <v-progress-circular indeterminate color="primary" size="48"></v-progress-circular>
                <p class="mt-4 text-grey">Loading specifications...</p>
              </div>
              
              <!-- Methods Table -->
              <SpecTable
                v-else-if="activeSection === 'methods'"
                title="Methods of Preservation"
                :items="filteredMethods"
                :headers="methodHeaders"
                :loading="specsStore.loading"
                @view="viewMethod"
                @copy="copyCode"
              />
              
              <!-- Cleaning Table -->
              <SpecTable
                v-else-if="activeSection === 'cleaning'"
                title="Cleaning & Drying Procedures"
                :items="filteredCleaning"
                :headers="cleaningHeaders"
                :loading="specsStore.loading"
                @view="viewCleaning"
                @copy="copyCode"
              />
              
              <!-- Preservation Table -->
              <SpecTable
                v-else-if="activeSection === 'preservation'"
                title="Preservative Materials"
                :items="filteredPreservation"
                :headers="preservationHeaders"
                :loading="specsStore.loading"
                @view="viewPreservation"
                @copy="copyCode"
              />
              
              <!-- Placeholder for other sections -->
              <div v-else class="text-center py-8">
                <v-icon icon="mdi-cog" size="64" color="grey-lighten-1"></v-icon>
                <h3 class="text-h6 mt-4 text-grey">{{ currentSectionTitle }}</h3>
                <p class="text-body-2 text-grey">Coming soon</p>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    
    <!-- Detail Dialog -->
    <v-dialog v-model="detailDialog" max-width="600">
      <v-card v-if="selectedItem">
        <v-card-title class="d-flex align-center pa-4">
          <v-chip color="primary" variant="flat" class="mr-2">
            {{ selectedItem.code }}
          </v-chip>
          <span>Specification Details</span>
          <v-spacer></v-spacer>
          <v-btn icon @click="detailDialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
        </v-card-title>
        <v-divider></v-divider>
        <v-card-text class="pa-4">
          <p class="text-body-1 mb-4">{{ selectedItem.description }}</p>
          
          <template v-if="selectedItem.keywords">
            <div class="mb-4">
              <strong class="text-subtitle-2">Keywords:</strong>
              <v-chip
                v-for="keyword in selectedItem.keywords"
                :key="keyword"
                size="small"
                class="ml-1 mb-1"
              >
                {{ keyword }}
              </v-chip>
            </div>
          </template>
          
          <template v-if="selectedItem.specReference">
            <div class="mb-4">
              <strong class="text-subtitle-2">MIL-STD Reference:</strong>
              <span class="text-body-2 ml-2">{{ selectedItem.specReference }}</span>
            </div>
          </template>
          
          <template v-if="selectedItem.relatedCodes">
            <div class="mb-4">
              <strong class="text-subtitle-2">Related Codes:</strong>
              <v-chip
                v-for="code in selectedItem.relatedCodes"
                :key="code"
                size="small"
                color="secondary"
                class="ml-1 mb-1"
                @click="searchByCode(code)"
              >
                {{ code }}
              </v-chip>
            </div>
          </template>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions class="pa-4">
          <v-btn variant="outlined" prepend-icon="mdi-content-copy" @click="copyToClipboard">
            Copy Code
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="primary" @click="detailDialog = false">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useSpecsStore } from '@/stores/specs'
import { useUIStore } from '@/stores/ui'
import SpecTable from '@/components/milspec/SpecTable.vue'

const route = useRoute()
const router = useRouter()
const specsStore = useSpecsStore()
const uiStore = useUIStore()

// State
const searchQuery = ref('')
const detailDialog = ref(false)
const selectedItem = ref(null)
const activeSection = ref('methods')

// Navigation sections
const sections = [
  { id: 'methods', title: 'Methods of Preservation', icon: 'mdi-package-variant' },
  { id: 'cleaning', title: 'Cleaning & Drying', icon: 'mdi-broom' },
  { id: 'preservation', title: 'Preservative Materials', icon: 'mdi-shield-outline' },
  { id: 'wrapping', title: 'Wrapping Materials', icon: 'mdi-wrap' },
  { id: 'cushioning', title: 'Cushioning Materials', icon: 'mdi-cushion' },
  { id: 'containers', title: 'Containers', icon: 'mdi-box' }
]

// Table headers
const methodHeaders = [
  { title: 'Code', key: 'code', width: '100px' },
  { title: 'Description', key: 'description' },
  { title: 'Category', key: 'category', width: '120px' },
  { title: 'Actions', key: 'actions', width: '120px', sortable: false }
]

const cleaningHeaders = [
  { title: 'Code', key: 'code', width: '100px' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', width: '120px', sortable: false }
]

const preservationHeaders = [
  { title: 'Code', key: 'code', width: '100px' },
  { title: 'Specification', key: 'specification' },
  { title: 'Description', key: 'description' },
  { title: 'Actions', key: 'actions', width: '120px', sortable: false }
]

// Computed
const currentSectionTitle = computed(() => {
  const section = sections.find(s => s.id === activeSection.value)
  return section ? section.title : 'Select a Section'
})

const filteredMethods = computed(() => specsStore.getFilteredData('mil-std-2073', 'methods') || [])
const filteredCleaning = computed(() => specsStore.getFilteredData('mil-std-2073', 'cleaning') || [])
const filteredPreservation = computed(() => specsStore.getFilteredData('mil-std-2073', 'preservation') || [])

// Methods
function setActiveSection(sectionId) {
  activeSection.value = sectionId
  searchQuery.value = ''
  specsStore.setSearchQuery('')
}

function handleSearch() {
  specsStore.setSearchQuery(searchQuery.value)
}

function viewMethod(item) {
  selectedItem.value = item
  detailDialog.value = true
}

function viewCleaning(item) {
  selectedItem.value = item
  detailDialog.value = true
}

function viewPreservation(item) {
  selectedItem.value = item
  detailDialog.value = true
}

function copyCode(item) {
  navigator.clipboard.writeText(item.code)
  uiStore.showSnackbar(`Code ${item.code} copied to clipboard`, 'success')
}

function copyToClipboard() {
  if (selectedItem.value) {
    navigator.clipboard.writeText(selectedItem.value.code)
    uiStore.showSnackbar(`Code ${selectedItem.value.code} copied to clipboard`, 'success')
  }
}

function searchByCode(code) {
  searchQuery.value = code
  specsStore.setSearchQuery(code)
  detailDialog.value = false
}

// Watch for route changes
watch(() => route.query.section, (newSection) => {
  if (newSection && sections.some(s => s.id === newSection)) {
    setActiveSection(newSection)
  }
}, { immediate: true })

onMounted(() => {
  // Initialize from route query
  if (route.query.section) {
    setActiveSection(route.query.section)
  }
  if (route.query.search) {
    searchQuery.value = route.query.search
    specsStore.setSearchQuery(route.query.search)
  }
})
</script>

<style scoped>
.sidebar-col {
  position: sticky;
  top: 0;
  height: calc(100vh - 64px);
  overflow-y: auto;
}

@media (max-width: 959px) {
  .sidebar-col {
    position: relative;
    height: auto;
  }
}
</style>
