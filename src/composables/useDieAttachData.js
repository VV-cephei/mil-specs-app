import { ref } from 'vue'

// Part 1: Overview
const overview = ref(null)
// Part 2: Materials
const materials = ref(null)
// Part 3: Process Flow
const processFlow = ref(null)
// Part 4: Tooling
const tooling = ref(null)
// Part 5: Eutectic Bonding
const eutecticBonding = ref(null)
// Part 6: Sintering
const sintering = ref(null)
// Part 7: Black Epoxy
const blackEpoxy = ref(null)
// Part 8: Bond Line Control
const bondLineControl = ref(null)
// Part 9: Quality Standards (Specifications)
const specifications = ref(null)
// Part 10: DFM Rules
const dfmRules = ref(null)
// Part 11: Failure Modes
const failureModes = ref(null)
// Part 12: Future Trends
const futureTrends = ref(null)

// Legacy data (kept for compatibility)
const processTechniques = ref(null)
const rfPerformance = ref(null)
const glossary = ref(null)

const loading = ref(false)
const error = ref(null)

export function useDieAttachData() {
  async function loadData(force = false) {
    if (overview.value && !force) return

    loading.value = true
    error.value = null

    try {
      const [
        overviewData,
        materialsData,
        processFlowData,
        toolingData,
        eutecticData,
        sinteringData,
        blackEpoxyData,
        bondLineData,
        specsData,
        dfmData,
        failureData,
        futureData,
        // Legacy data
        processData,
        rfData,
        glossaryData
      ] = await Promise.all([
        // New 12-part structure
        fetch('/data/die-attach/overview.json').then(r => r.json()),
        fetch('/data/die-attach/materials.json').then(r => r.json()),
        fetch('/data/die-attach/process-flow.json').then(r => r.json()),
        fetch('/data/die-attach/tooling.json').then(r => r.json()),
        fetch('/data/die-attach/eutectic-bonding.json').then(r => r.json()),
        fetch('/data/die-attach/sintering.json').then(r => r.json()),
        fetch('/data/die-attach/black-epoxy.json').then(r => r.json()),
        fetch('/data/die-attach/bond-line-control.json').then(r => r.json()),
        fetch('/data/die-attach/specifications.json').then(r => r.json()),
        fetch('/data/die-attach/dfm-rules.json').then(r => r.json()),
        fetch('/data/die-attach/failure-modes.json').then(r => r.json()),
        fetch('/data/die-attach/future-trends.json').then(r => r.json()),
        // Legacy data
        fetch('/data/die-attach/process-techniques.json').then(r => r.json()),
        fetch('/data/die-attach/rf-performance.json').then(r => r.json()),
        fetch('/data/die-attach/glossary.json').then(r => r.json())
      ])

      // New 12-part structure
      overview.value = overviewData
      materials.value = materialsData
      processFlow.value = processFlowData
      tooling.value = toolingData
      eutecticBonding.value = eutecticData
      sintering.value = sinteringData
      blackEpoxy.value = blackEpoxyData
      bondLineControl.value = bondLineData
      specifications.value = specsData
      dfmRules.value = dfmData
      failureModes.value = failureData
      futureTrends.value = futureData
      
      // Legacy data
      processTechniques.value = processData
      rfPerformance.value = rfData
      glossary.value = glossaryData
    } catch (e) {
      console.error('Error loading die attach data:', e)
      error.value = {
        message: 'Failed to load die attach data. Please try again later.'
      }
    } finally {
      loading.value = false
    }
  }

  return {
    // New 12-part structure
    overview,
    materials,
    processFlow,
    tooling,
    eutecticBonding,
    sintering,
    blackEpoxy,
    bondLineControl,
    specifications,
    dfmRules,
    failureModes,
    futureTrends,
    // Legacy data
    processTechniques,
    rfPerformance,
    glossary,
    // State
    loading,
    error,
    loadData
  }
}
