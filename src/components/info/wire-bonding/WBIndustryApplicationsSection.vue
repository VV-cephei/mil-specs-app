<template>
  <section id="industry-applications" class="wb-section">
    <div class="section-header">
      <h2 class="section-title">Industry Applications</h2>
      <p class="section-description">
        Wire bonding requirements vary significantly across industries. Understanding 
        application-specific needs ensures optimal material and process selection.
      </p>
    </div>
    
    <div v-if="data" class="applications-content">
      <div class="applications-grid">
        <!-- RF/Microwave -->
        <div class="application-card application-card--rf">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M2 12h2"></path>
                <path d="M20 12h2"></path>
                <path d="M6 12a6 6 0 0 1 12 0"></path>
                <path d="M9 12a3 3 0 0 1 6 0"></path>
                <circle cx="12" cy="12" r="1"></circle>
              </svg>
            </div>
            <h3 class="card-title">{{ data.rfMicrowave?.title }}</h3>
          </div>
          
          <p class="card-description">{{ data.rfMicrowave?.description }}</p>
          
          <div class="key-requirements">
            <h4>Key Requirements</h4>
            <ul>
              <li v-for="(req, i) in data.rfMicrowave?.keyRequirements" :key="i">{{ req }}</li>
            </ul>
          </div>
          
          <div class="preferred-bonding">
            <h4>Preferred Bonding</h4>
            <div class="bonding-type">
              <span class="bonding-label">{{ data.rfMicrowave?.preferredBonding?.type }}</span>
            </div>
            <ul class="bonding-reasons">
              <li v-for="(reason, i) in data.rfMicrowave?.preferredBonding?.reasons" :key="i">{{ reason }}</li>
            </ul>
          </div>
          
          <div class="materials-section">
            <h4>Typical Materials</h4>
            <div class="materials-list">
              <div 
                v-for="mat in data.rfMicrowave?.typicalMaterials" 
                :key="mat.material"
                class="material-item"
              >
                <span class="material-name">{{ mat.material }}</span>
                <span class="material-dims">{{ mat.dimensions }}</span>
                <span class="material-apps">{{ mat.applications }}</span>
              </div>
            </div>
          </div>
          
          <div class="device-types">
            <h4>Device Types</h4>
            <div class="device-tags">
              <span v-for="(device, i) in data.rfMicrowave?.deviceTypes" :key="i" class="device-tag">
                {{ device }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Power Electronics -->
        <div class="application-card application-card--power">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
            </div>
            <h3 class="card-title">{{ data.powerElectronics?.title }}</h3>
          </div>
          
          <p class="card-description">{{ data.powerElectronics?.description }}</p>
          
          <div class="key-requirements">
            <h4>Key Requirements</h4>
            <ul>
              <li v-for="(req, i) in data.powerElectronics?.keyRequirements" :key="i">{{ req }}</li>
            </ul>
          </div>
          
          <div class="preferred-bonding">
            <h4>Preferred Bonding</h4>
            <div class="bonding-type">
              <span class="bonding-label">{{ data.powerElectronics?.preferredBonding?.type }}</span>
              <span class="wire-range">{{ data.powerElectronics?.preferredBonding?.wireRange }}</span>
            </div>
            <ul class="bonding-reasons">
              <li v-for="(reason, i) in data.powerElectronics?.preferredBonding?.reasons" :key="i">{{ reason }}</li>
            </ul>
          </div>
          
          <div class="configurations-section">
            <h4>Typical Configurations</h4>
            <div class="configs-list">
              <div 
                v-for="config in data.powerElectronics?.typicalConfigurations" 
                :key="config.application"
                class="config-item"
              >
                <span class="config-app">{{ config.application }}</span>
                <span class="config-wire">{{ config.wireSize }}</span>
                <span class="config-bonds">{{ config.bondsPerChip }}</span>
                <span class="config-current">{{ config.currentPerWire }}</span>
              </div>
            </div>
          </div>
          
          <div class="reliability-section">
            <h4>Reliability Requirements</h4>
            <div class="reliability-specs">
              <div class="rel-item">
                <span class="rel-label">Thermal Cycles:</span>
                <span class="rel-value">{{ data.powerElectronics?.reliabilityRequirements?.thermalCycles }}</span>
              </div>
              <div class="rel-item">
                <span class="rel-label">Power Cycles:</span>
                <span class="rel-value">{{ data.powerElectronics?.reliabilityRequirements?.powerCycles }}</span>
              </div>
              <div class="rel-item">
                <span class="rel-label">Lifetime:</span>
                <span class="rel-value">{{ data.powerElectronics?.reliabilityRequirements?.lifetime }}</span>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Automotive/EV -->
        <div class="application-card application-card--automotive">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2"></path>
                <circle cx="7" cy="17" r="2"></circle>
                <circle cx="17" cy="17" r="2"></circle>
              </svg>
            </div>
            <h3 class="card-title">{{ data.automotiveEV?.title }}</h3>
          </div>
          
          <p class="card-description">{{ data.automotiveEV?.description }}</p>
          
          <div class="key-requirements">
            <h4>Key Requirements</h4>
            <ul>
              <li v-for="(req, i) in data.automotiveEV?.keyRequirements" :key="i">{{ req }}</li>
            </ul>
          </div>
          
          <div class="standards-section">
            <h4>Qualification Standards</h4>
            <div class="standards-grid">
              <div class="standard-item">
                <span class="standard-name">{{ data.automotiveEV?.qualificationStandards?.aecQ100?.name }}</span>
                <span class="standard-scope">{{ data.automotiveEV?.qualificationStandards?.aecQ100?.scope }}</span>
                <div class="grades-list">
                  <span 
                    v-for="grade in data.automotiveEV?.qualificationStandards?.aecQ100?.grades" 
                    :key="grade.grade"
                    class="grade-tag"
                  >
                    Grade {{ grade.grade }}: {{ grade.tempRange }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="copper-adoption">
            <h4>Copper Wire Adoption</h4>
            <div class="adoption-grid">
              <div class="adoption-drivers">
                <h5>Drivers</h5>
                <ul>
                  <li v-for="(driver, i) in data.automotiveEV?.copperWireAdoption?.drivers" :key="i">{{ driver }}</li>
                </ul>
              </div>
              <div class="adoption-challenges">
                <h5>Challenges</h5>
                <ul>
                  <li v-for="(challenge, i) in data.automotiveEV?.copperWireAdoption?.challenges" :key="i">{{ challenge }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        
        <!-- LED Applications -->
        <div class="application-card application-card--led">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </svg>
            </div>
            <h3 class="card-title">{{ data.ledApplications?.title }}</h3>
          </div>
          
          <p class="card-description">{{ data.ledApplications?.description }}</p>
          
          <div class="key-requirements">
            <h4>Key Requirements</h4>
            <ul>
              <li v-for="(req, i) in data.ledApplications?.keyRequirements" :key="i">{{ req }}</li>
            </ul>
          </div>
          
          <div class="preferred-materials">
            <h4>Preferred Materials</h4>
            <div class="materials-comparison">
              <div class="material-option material-option--primary">
                <span class="option-label">Primary</span>
                <span class="option-material">{{ data.ledApplications?.preferredMaterials?.primary?.material }}</span>
                <span class="option-reason">{{ data.ledApplications?.preferredMaterials?.primary?.reason }}</span>
              </div>
              <div class="material-option material-option--alternative">
                <span class="option-label">Alternative</span>
                <span class="option-material">{{ data.ledApplications?.preferredMaterials?.alternative?.material }}</span>
                <span class="option-reason">{{ data.ledApplications?.preferredMaterials?.alternative?.reason }}</span>
              </div>
            </div>
          </div>
          
          <div class="silver-challenges">
            <h4>Silver Wire Challenges</h4>
            <div class="challenges-list">
              <div 
                v-for="(challenge, key) in data.ledApplications?.silverWireChallenges" 
                :key="key"
                class="challenge-item"
              >
                <span class="challenge-name">{{ formatChallengeName(key) }}</span>
                <span class="challenge-issue">{{ challenge.issue }}</span>
                <span class="challenge-mitigation">{{ challenge.mitigation }}</span>
              </div>
            </div>
          </div>
          
          <div class="optical-considerations">
            <h4>Optical Considerations</h4>
            <p class="optical-note">{{ data.ledApplications?.opticalConsiderations?.wireShading }}</p>
            <p class="reflectivity-note">Reflectivity: {{ data.ledApplications?.opticalConsiderations?.reflectivity }}</p>
          </div>
        </div>
        
        <!-- Medical Devices -->
        <div class="application-card application-card--medical">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
              </svg>
            </div>
            <h3 class="card-title">{{ data.medicalDevices?.title }}</h3>
          </div>
          
          <p class="card-description">{{ data.medicalDevices?.description }}</p>
          
          <div class="key-requirements">
            <h4>Key Requirements</h4>
            <ul>
              <li v-for="(req, i) in data.medicalDevices?.keyRequirements" :key="i">{{ req }}</li>
            </ul>
          </div>
          
          <div class="implantable-section">
            <h4>Implantable Devices</h4>
            <div class="implantable-examples">
              <span v-for="(example, i) in data.medicalDevices?.implantableDevices?.examples" :key="i" class="example-tag">
                {{ example }}
              </span>
            </div>
            <div class="implantable-requirements">
              <div class="impl-req">
                <span class="impl-label">Hermeticity:</span>
                <span class="impl-value">{{ data.medicalDevices?.implantableDevices?.requirements?.hermeticity }}</span>
              </div>
              <div class="impl-req">
                <span class="impl-label">Biocompatibility:</span>
                <span class="impl-value">{{ data.medicalDevices?.implantableDevices?.requirements?.biocompatibility }}</span>
              </div>
              <div class="impl-req">
                <span class="impl-label">Lifetime:</span>
                <span class="impl-value">{{ data.medicalDevices?.implantableDevices?.requirements?.lifetime }}</span>
              </div>
            </div>
          </div>
          
          <div class="regulatory-section">
            <h4>Regulatory Considerations</h4>
            <div class="regulatory-items">
              <span class="reg-item">{{ data.medicalDevices?.regulatoryConsiderations?.fda }}</span>
              <span class="reg-item">{{ data.medicalDevices?.regulatoryConsiderations?.iso13485 }}</span>
              <span class="reg-item">{{ data.medicalDevices?.regulatoryConsiderations?.biocompatibility }}</span>
            </div>
          </div>
        </div>
        
        <!-- Aerospace/Defense -->
        <div class="application-card application-card--aerospace">
          <div class="card-header">
            <div class="card-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M17.8 19.2 16 11l3.5-3.5C21 6 21.5 4 21 3c-1-.5-3 0-4.5 1.5L13 8 4.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.2c.4-.3.6-.7.5-1.2z"></path>
              </svg>
            </div>
            <h3 class="card-title">{{ data.aerospaceDefense?.title }}</h3>
          </div>
          
          <p class="card-description">{{ data.aerospaceDefense?.description }}</p>
          
          <div class="key-requirements">
            <h4>Key Requirements</h4>
            <ul>
              <li v-for="(req, i) in data.aerospaceDefense?.keyRequirements" :key="i">{{ req }}</li>
            </ul>
          </div>
          
          <div class="military-standards">
            <h4>Military Standards</h4>
            <div class="mil-std-grid">
              <div class="mil-std-item">
                <span class="mil-std-name">{{ data.aerospaceDefense?.militaryStandards?.milStd883?.name }}</span>
                <span class="mil-std-scope">{{ data.aerospaceDefense?.militaryStandards?.milStd883?.scope }}</span>
                <div class="mil-methods">
                  <span 
                    v-for="method in data.aerospaceDefense?.militaryStandards?.milStd883?.relevantMethods" 
                    :key="method.method"
                    class="method-tag"
                  >
                    {{ method.method }}: {{ method.title }}
                  </span>
                </div>
              </div>
              <div class="mil-std-item">
                <span class="mil-std-name">{{ data.aerospaceDefense?.militaryStandards?.milPrf38535?.name }}</span>
                <span class="mil-std-scope">{{ data.aerospaceDefense?.militaryStandards?.milPrf38535?.scope }}</span>
                <div class="mil-classes">
                  <span 
                    v-for="cls in data.aerospaceDefense?.militaryStandards?.milPrf38535?.classes" 
                    :key="cls.class"
                    class="class-tag"
                  >
                    Class {{ cls.class }}: {{ cls.description }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="space-applications">
            <h4>Space Applications</h4>
            <div class="space-challenges">
              <h5>Challenges</h5>
              <ul>
                <li v-for="(challenge, i) in data.aerospaceDefense?.spaceApplications?.challenges" :key="i">{{ challenge }}</li>
              </ul>
            </div>
            <div class="space-requirements">
              <h5>Requirements</h5>
              <div class="space-req-grid">
                <div class="space-req">
                  <span class="space-label">Radiation:</span>
                  <span class="space-value">{{ data.aerospaceDefense?.spaceApplications?.requirements?.radiationHardness }}</span>
                </div>
                <div class="space-req">
                  <span class="space-label">Thermal:</span>
                  <span class="space-value">{{ data.aerospaceDefense?.spaceApplications?.requirements?.thermalCycling }}</span>
                </div>
                <div class="space-req">
                  <span class="space-label">Outgassing:</span>
                  <span class="space-value">{{ data.aerospaceDefense?.spaceApplications?.requirements?.outgassing }}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div class="typical-applications">
            <h4>Typical Applications</h4>
            <div class="app-tags">
              <span v-for="(app, i) in data.aerospaceDefense?.typicalApplications" :key="i" class="app-tag">
                {{ app }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Comparison Images -->
      <div v-if="data.comparisonTables" class="comparison-images">
        <h3 class="comparison-title">Method Comparisons</h3>
        <div class="comparison-grid">
          <ImageViewer
            v-if="data.comparisonTables?.methodsComparison?.image"
            :src="data.comparisonTables.methodsComparison.image"
            :alt="data.comparisonTables.methodsComparison.title"
            :caption="data.comparisonTables.methodsComparison.title"
            :zoomable="true"
          />
          <ImageViewer
            v-if="data.comparisonTables?.ballVsWedge?.image"
            :src="data.comparisonTables.ballVsWedge.image"
            :alt="data.comparisonTables.ballVsWedge.title"
            :caption="data.comparisonTables.ballVsWedge.title"
            :zoomable="true"
          />
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading industry applications data...</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import ImageViewer from '@/components/shared/ImageViewer.vue'

const props = defineProps({
  industryApplications: {
    type: Object,
    default: () => null
  },
  glossary: {
    type: Array,
    default: () => []
  }
})

const data = computed(() => props.industryApplications)

function formatChallengeName(key) {
  return key
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim()
}
</script>

<style scoped>
.wb-section {
  padding: var(--space-12) var(--space-6);
  max-width: 1400px;
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
  max-width: 700px;
  margin: 0 auto;
  line-height: var(--line-height-relaxed);
}

/* Applications Grid */
.applications-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-6);
  margin-bottom: var(--space-8);
}

.application-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-xl);
  padding: var(--space-5);
  border-top: 4px solid var(--color-neutral-400);
  transition: box-shadow var(--transition-fast);
}

.application-card:hover {
  box-shadow: var(--shadow-lg);
}

.application-card--rf {
  border-top-color: #8B5CF6;
}

.application-card--power {
  border-top-color: #F59E0B;
}

.application-card--automotive {
  border-top-color: #3B82F6;
}

.application-card--led {
  border-top-color: #10B981;
}

.application-card--medical {
  border-top-color: #EC4899;
}

.application-card--aerospace {
  border-top-color: #6366F1;
}

.card-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  margin-bottom: var(--space-4);
}

.card-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  border-radius: var(--radius-lg);
  background-color: var(--color-surface-elevated);
}

.application-card--rf .card-icon {
  color: #8B5CF6;
  background-color: #EDE9FE;
}

.application-card--power .card-icon {
  color: #F59E0B;
  background-color: #FEF3C7;
}

.application-card--automotive .card-icon {
  color: #3B82F6;
  background-color: #DBEAFE;
}

.application-card--led .card-icon {
  color: #10B981;
  background-color: #D1FAE5;
}

.application-card--medical .card-icon {
  color: #EC4899;
  background-color: #FCE7F3;
}

.application-card--aerospace .card-icon {
  color: #6366F1;
  background-color: #E0E7FF;
}

.card-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.card-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-4);
  line-height: var(--line-height-relaxed);
}

/* Key Requirements */
.key-requirements {
  margin-bottom: var(--space-4);
}

.key-requirements h4,
.preferred-bonding h4,
.materials-section h4,
.device-types h4,
.configurations-section h4,
.reliability-section h4,
.standards-section h4,
.copper-adoption h4,
.preferred-materials h4,
.silver-challenges h4,
.optical-considerations h4,
.implantable-section h4,
.regulatory-section h4,
.military-standards h4,
.space-applications h4,
.typical-applications h4 {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin-bottom: var(--space-2);
}

.key-requirements ul {
  padding-left: var(--space-4);
  margin: 0;
}

.key-requirements li {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

/* Preferred Bonding */
.preferred-bonding {
  margin-bottom: var(--space-4);
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.bonding-type {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  margin-bottom: var(--space-2);
}

.bonding-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
}

.wire-range {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.bonding-reasons {
  padding-left: var(--space-4);
  margin: 0;
}

.bonding-reasons li {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

/* Materials Section */
.materials-section {
  margin-bottom: var(--space-4);
}

.materials-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.material-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.material-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.material-dims {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

.material-apps {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

/* Device Types */
.device-types {
  margin-bottom: var(--space-4);
}

.device-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.device-tag {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

/* Configurations */
.configs-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.config-item {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-1);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  font-size: var(--font-size-xs);
}

.config-app {
  grid-column: 1 / -1;
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.config-wire,
.config-bonds,
.config-current {
  color: var(--color-text-secondary);
}

/* Reliability */
.reliability-specs {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.rel-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.rel-label {
  color: var(--color-text-secondary);
}

.rel-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

/* Standards */
.standards-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.standard-item {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.standard-name {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

.standard-scope {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.grades-list {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.grade-tag {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

/* Copper Adoption */
.adoption-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-3);
}

.adoption-drivers,
.adoption-challenges {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.adoption-drivers {
  border-left: 3px solid var(--color-success-500);
}

.adoption-challenges {
  border-left: 3px solid var(--color-warning-500);
}

.adoption-drivers h5,
.adoption-challenges h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.adoption-drivers ul,
.adoption-challenges ul {
  padding-left: var(--space-4);
  margin: 0;
}

.adoption-drivers li,
.adoption-challenges li {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

/* Preferred Materials */
.materials-comparison {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.material-option {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  border-radius: var(--radius-default);
}

.material-option--primary {
  background-color: var(--color-success-50);
  border-left: 3px solid var(--color-success-500);
}

.material-option--alternative {
  background-color: var(--color-surface-elevated);
  border-left: 3px solid var(--color-neutral-400);
}

.option-label {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-tertiary);
  text-transform: uppercase;
}

.option-material {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-text-primary);
}

.option-reason {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Silver Challenges */
.challenges-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.challenge-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.challenge-name {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.challenge-issue {
  font-size: var(--font-size-xs);
  color: var(--color-warning-700);
}

.challenge-mitigation {
  font-size: var(--font-size-xs);
  color: var(--color-success-700);
}

/* Optical Considerations */
.optical-note,
.reflectivity-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

/* Implantable Section */
.implantable-examples {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
  margin-bottom: var(--space-3);
}

.example-tag {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

.implantable-requirements {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.impl-req {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.impl-label {
  color: var(--color-text-secondary);
}

.impl-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-align: right;
}

/* Regulatory */
.regulatory-items {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.reg-item {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

/* Military Standards */
.mil-std-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.mil-std-item {
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.mil-std-name {
  display: block;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin-bottom: var(--space-1);
}

.mil-std-scope {
  display: block;
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-2);
}

.mil-methods,
.mil-classes {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.method-tag,
.class-tag {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

/* Space Applications */
.space-challenges,
.space-requirements {
  margin-bottom: var(--space-3);
}

.space-challenges h5,
.space-requirements h5 {
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-secondary);
  text-transform: uppercase;
  margin-bottom: var(--space-2);
}

.space-challenges ul {
  padding-left: var(--space-4);
  margin: 0;
}

.space-challenges li {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
  margin-bottom: var(--space-1);
}

.space-req-grid {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.space-req {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-xs);
  padding: var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
}

.space-label {
  color: var(--color-text-secondary);
}

.space-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  text-align: right;
}

/* Typical Applications */
.app-tags {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-1);
}

.app-tag {
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-sm);
  color: var(--color-text-secondary);
}

/* Comparison Images */
.comparison-images {
  margin-top: var(--space-8);
  padding-top: var(--space-8);
  border-top: 1px solid var(--color-border-light);
}

.comparison-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  text-align: center;
  margin-bottom: var(--space-6);
}

.comparison-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-6);
}

.loading-placeholder {
  text-align: center;
  padding: var(--space-12);
  color: var(--color-text-secondary);
}

/* Responsive */
@media (max-width: 1200px) {
  .applications-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .wb-section {
    padding: var(--space-8) var(--space-4);
  }
  
  .applications-grid {
    grid-template-columns: 1fr;
  }
  
  .adoption-grid {
    grid-template-columns: 1fr;
  }
  
  .comparison-grid {
    grid-template-columns: 1fr;
  }
}
</style>
