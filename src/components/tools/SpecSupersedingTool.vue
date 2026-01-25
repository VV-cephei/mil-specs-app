<template>
  <v-card class="spec-superseding-tool h-100">
    <v-card-title class="bg-secondary text-white">
      Spec Superseding Lookup
    </v-card-title>
    
    <v-card-text class="pa-4">
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search Cancelled Spec or Description"
        variant="outlined"
        density="comfortable"
        clearable
        class="mb-4"
      ></v-text-field>

      <v-data-table
        :headers="headers"
        :items="specs"
        :search="search"
        :loading="loading"
        class="elevation-1"
        density="compact"
        hover
        fixed-header
        height="600px"
      >
        <template v-slot:item.status="{ item }">
          <v-chip
            size="small"
            :color="getStatusColor(item.status)"
          >
            {{ item.status }}
          </v-chip>
        </template>
        
        <template v-slot:item.replacement="{ item }">
          <span v-if="item.replacement" class="font-weight-bold text-primary">
            {{ item.replacement }}
          </span>
          <span v-else class="text-grey font-italic">None</span>
        </template>
      </v-data-table>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const loading = ref(false)
const search = ref('')
const specs = ref([])

const headers = [
  { title: 'Original Spec', key: 'original', align: 'start', sortable: true },
  { title: 'Description', key: 'description', align: 'start', sortable: true },
  { title: 'Status', key: 'status', align: 'center', sortable: true },
  { title: 'Superseded By', key: 'replacement', align: 'start', sortable: true },
  { title: 'Notes', key: 'notes', align: 'start', sortable: false },
]

function getStatusColor(status) {
  if (!status) return 'grey'
  const s = status.toLowerCase()
  if (s.includes('superseded') || s.includes('cancelled')) return 'warning'
  if (s.includes('active')) return 'success'
  return 'info'
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('/data/specs/superseding.json')
    specs.value = await response.json()
  } catch (e) {
    console.error('Failed to load superseding specs data', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.spec-superseding-tool {
  min-height: 400px;
}
</style>