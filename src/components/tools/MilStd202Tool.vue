<template>
  <v-card class="mil-std-202-tool h-100">
    <v-card-title class="bg-primary text-white">
      MIL-STD-202 Method Viewer
    </v-card-title>
    
    <v-card-text class="pa-4">
      <v-row>
        <v-col cols="12" md="6">
          <v-autocomplete
            v-model="selectedMethod"
            :items="methods"
            item-title="displayText"
            item-value="id"
            label="Select Method"
            return-object
            variant="outlined"
            density="comfortable"
            clearable
            :loading="loading"
          ></v-autocomplete>
        </v-col>
        
        <v-col cols="12" md="6">
          <v-select
            v-model="selectedCondition"
            :items="availableConditions"
            item-title="name"
            item-value="name"
            label="Select Condition"
            return-object
            variant="outlined"
            density="comfortable"
            :disabled="!selectedMethod || availableConditions.length === 0"
            no-data-text="No conditions available for this method"
          ></v-select>
        </v-col>
      </v-row>

      <v-divider class="my-4"></v-divider>

      <div v-if="selectedMethod" class="method-details">
        <div class="text-h6 mb-2">{{ selectedMethod.id }} - {{ selectedMethod.title }}</div>
        <div class="text-subtitle-2 mb-4 text-grey-darken-1">
          Status: <v-chip size="small" :color="getStatusColor(selectedMethod.status)" class="mr-2">{{ selectedMethod.status }}</v-chip>
          Date: {{ selectedMethod.date }}
        </div>

        <v-table
          v-if="selectedCondition"
          class="mt-4 border rounded"
        >
          <thead>
            <tr>
              <th class="text-left bg-grey-lighten-4">Parameter</th>
              <th class="text-left bg-grey-lighten-4">Detail</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td class="font-weight-bold text-no-wrap" style="width: 200px">Condition Name</td>
              <td>{{ selectedCondition.name }}</td>
            </tr>
            <tr>
              <td class="font-weight-bold text-no-wrap">Requirements</td>
              <td>{{ selectedCondition.requirements }}</td>
            </tr>
          </tbody>
        </v-table>
        
        <v-alert
          v-else-if="availableConditions.length === 0"
          type="info"
          variant="tonal"
          class="mt-4"
        >
          No specific test conditions defined for this method.
        </v-alert>
        
        <v-alert
          v-else
          type="info"
          variant="tonal"
          class="mt-4"
        >
          Please select a test condition to view requirements.
        </v-alert>
      </div>
      
      <div v-else class="text-center text-grey pa-8">
        <v-icon size="64" color="grey-lighten-2">mdi-text-box-search-outline</v-icon>
        <div class="mt-4">Select a method to view details</div>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

const loading = ref(false)
const methods = ref([])
const selectedMethod = ref(null)
const selectedCondition = ref(null)

const availableConditions = computed(() => {
  if (!selectedMethod.value || !selectedMethod.value.conditions) return []
  return selectedMethod.value.conditions
})

// Reset condition when method changes
import { watch } from 'vue'
watch(selectedMethod, () => {
  selectedCondition.value = null
})

function getStatusColor(status) {
  if (!status) return 'grey'
  const s = status.toLowerCase()
  if (s.includes('canceled')) return 'error'
  if (s.includes('active')) return 'success'
  return 'info'
}

onMounted(async () => {
  loading.value = true
  try {
    const response = await fetch('/data/mil-std-202/methods.json')
    const data = await response.json()
    methods.value = data.methods.map(m => ({
      ...m,
      displayText: `${m.id} - ${m.title}`
    }))
  } catch (e) {
    console.error('Failed to load MIL-STD-202 data', e)
  } finally {
    loading.value = false
  }
})
</script>

<style scoped>
.mil-std-202-tool {
  min-height: 400px;
}
</style>