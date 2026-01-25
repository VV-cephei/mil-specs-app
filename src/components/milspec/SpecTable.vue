<template>
  <v-card elevation="0" class="spec-table-card">
    <v-card-title class="d-flex align-center flex-wrap ga-2 pa-0 mb-4">
      <span>{{ title }}</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Filter..."
        single-line
        hide-details
        density="compact"
        variant="outlined"
        style="max-width: 250px"
        class="mr-2"
      ></v-text-field>
      <v-btn
        icon="mdi-download"
        variant="text"
        @click="exportData"
        title="Export to CSV"
      ></v-btn>
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :items-per-page="25"
      :loading="loading"
      class="elevation-1 rounded"
      hover
    >
      <template v-slot:item.code="{ item }">
        <v-chip
          color="primary"
          variant="flat"
          size="small"
          class="font-weight-bold"
        >
          {{ item.code }}
        </v-chip>
      </template>
      
      <template v-slot:item.description="{ item }">
        <div class="text-truncate" style="max-width: 400px;">
          {{ item.description }}
        </div>
      </template>
      
      <template v-slot:item.category="{ item }">
        <v-chip size="small" variant="outlined" color="secondary">
          {{ item.category || '-' }}
        </v-chip>
      </template>
      
      <template v-slot:item.specification="{ item }">
        <span v-if="item.specification">{{ item.specification }}</span>
        <span v-else class="text-grey">-</span>
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-eye"
          size="small"
          variant="text"
          color="primary"
          @click="$emit('view', item)"
          title="View Details"
        >
          <v-icon size="small">mdi-eye</v-icon>
        </v-btn>
        <v-btn
          icon="mdi-content-copy"
          size="small"
          variant="text"
          @click="$emit('copy', item)"
          title="Copy Code"
        >
          <v-icon size="small">mdi-content-copy</v-icon>
        </v-btn>
      </template>
      
      <template v-slot:no-data>
        <div class="text-center py-8">
          <v-icon icon="mdi-inbox-outline" size="48" color="grey-lighten-1"></v-icon>
          <p class="mt-2 text-grey">No data available</p>
        </div>
      </template>
      
      <template v-slot:loading>
        <div class="text-center py-8">
          <v-progress-circular indeterminate color="primary"></v-progress-circular>
          <p class="mt-2 text-grey">Loading...</p>
        </div>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  items: {
    type: Array,
    required: true
  },
  headers: {
    type: Array,
    default: () => []
  },
  loading: {
    type: Boolean,
    default: false
  }
})

defineEmits(['view', 'copy'])

const search = ref('')

function exportData() {
  // Convert data to CSV
  const headers = props.headers
    .filter(h => h.key !== 'actions')
    .map(h => h.title)
    .join(',')
  
  const rows = props.items.map(item =>
    props.headers
      .filter(h => h.key !== 'actions')
      .map(h => {
        const value = item[h.key] || ''
        // Escape commas and quotes
        if (value.includes(',') || value.includes('"')) {
          return `"${value.replace(/"/g, '""')}"`
        }
        return value
      })
      .join(',')
  )
  
  const csv = [headers, ...rows].join('\n')
  
  // Download CSV
  const blob = new Blob([csv], { type: 'text/csv' })
  const url = URL.createObjectURL(blob)
  const link = document.createElement('a')
  link.href = url
  link.download = `${props.title.replace(/\s+/g, '_')}.csv`
  link.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.spec-table-card {
  background: transparent !important;
}

.v-data-table {
  border: 1px solid #e0e0e0;
}
</style>
