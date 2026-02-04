<template>
  <section id="reflow" class="smt-section">
    <div class="section-header">
      <h2 class="section-title">Reflow Soldering</h2>
      <p class="section-description">
        The board travels through a convection oven with 8-12 zones. Understanding the 
        temperature profile is critical for achieving reliable solder joints.
      </p>
    </div>
    
    <div v-if="hasData" class="reflow-content">
      <!-- Profile Diagram -->
      <div class="profile-diagram-section">
        <div class="diagram-card">
          <img 
            :src="reflowProfiles.images?.profileDiagram || '/images/smt/reflow-profile-diagram.png'" 
            alt="Reflow Profile Diagram"
            class="profile-image"
            loading="lazy"
          />
          <div class="diagram-caption">
            <span class="caption-text">Typical Reflow Profile - Temperature vs Time</span>
            <span class="total-time">Total Time: {{ reflowProfiles.overview?.totalTime }}</span>
          </div>
        </div>
      </div>
      
      <!-- Profile Zones -->
      <div class="zones-section">
        <h3 class="subsection-title">Reflow Profile Zones</h3>
        
        <div class="zones-timeline">
          <div 
            v-for="zone in reflowProfiles.zones" 
            :key="zone.id" 
            class="zone-card"
            :class="`zone-card--${zone.id}`"
          >
            <div class="zone-header">
              <span class="zone-order">{{ zone.order }}</span>
              <h4 class="zone-name">{{ zone.name }}</h4>
            </div>
            
            <div class="zone-params">
              <div class="param-item">
                <span class="param-label">Temperature</span>
                <span class="param-value">
                  <template v-if="typeof zone.temperatureRange === 'object'">
                    {{ zone.temperatureRange.minimum }} → {{ zone.temperatureRange.peak }}
                    <span class="param-note">(max {{ zone.temperatureRange.maximum }})</span>
                  </template>
                  <template v-else>
                    {{ zone.temperatureRange }}
                  </template>
                </span>
              </div>
              
              <div v-if="zone.rampRate" class="param-item">
                <span class="param-label">Ramp Rate</span>
                <span class="param-value">{{ zone.rampRate }}</span>
              </div>
              
              <div v-if="zone.duration" class="param-item">
                <span class="param-label">Duration</span>
                <span class="param-value">{{ zone.duration }}</span>
              </div>
            </div>
            
            <div class="zone-goal">
              <strong>Goal:</strong> {{ zone.goal }}
            </div>
            
            <div v-if="zone.physics" class="zone-physics">
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <line x1="12" y1="16" x2="12" y2="12"></line>
                <line x1="12" y1="8" x2="12.01" y2="8"></line>
              </svg>
              <span>{{ zone.physics }}</span>
            </div>
            
            <div v-if="zone.issues" class="zone-issues">
              <div v-for="(effects, issueType) in zone.issues" :key="issueType" class="issue-group">
                <span class="issue-type">{{ formatIssueType(issueType) }}:</span>
                <ul class="issue-effects">
                  <li v-for="(effect, idx) in effects" :key="idx">{{ effect }}</li>
                </ul>
              </div>
            </div>
            
            <div v-if="zone.trenchInsight" class="trench-insight">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                <line x1="12" y1="17" x2="12.01" y2="17"></line>
              </svg>
              <span>{{ zone.trenchInsight }}</span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- Profile Comparison -->
      <div v-if="reflowProfiles.profiles" class="profiles-section">
        <h3 class="subsection-title">Profile Comparison: Lead-Free vs Leaded</h3>
        
        <div class="profiles-table-wrapper">
          <table class="profiles-table">
            <thead>
              <tr>
                <th>Parameter</th>
                <th v-for="(profile, key) in reflowProfiles.profiles" :key="key">
                  {{ profile.name }}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td class="param-name">Alloy</td>
                <td v-for="(profile, key) in reflowProfiles.profiles" :key="key">
                  <code>{{ profile.alloy }}</code>
                </td>
              </tr>
              <tr>
                <td class="param-name">Liquidus</td>
                <td v-for="(profile, key) in reflowProfiles.profiles" :key="key">
                  {{ profile.liquidus }}
                </td>
              </tr>
              <tr>
                <td class="param-name">Peak Temperature</td>
                <td v-for="(profile, key) in reflowProfiles.profiles" :key="key" class="highlight-cell">
                  {{ profile.peakTemp }}
                </td>
              </tr>
              <tr>
                <td class="param-name">Time Above Liquidus (TAL)</td>
                <td v-for="(profile, key) in reflowProfiles.profiles" :key="key">
                  {{ profile.tal }}
                </td>
              </tr>
              <tr>
                <td class="param-name">Total Profile Time</td>
                <td v-for="(profile, key) in reflowProfiles.profiles" :key="key">
                  {{ profile.totalTime }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      
      <!-- Critical Parameters Summary -->
      <div class="critical-params-section">
        <h3 class="subsection-title">Critical Parameters</h3>
        
        <div class="params-grid">
          <div class="param-card param-card--tal">
            <div class="param-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="12" cy="12" r="10"></circle>
                <polyline points="12 6 12 12 16 14"></polyline>
              </svg>
            </div>
            <h4>Time Above Liquidus (TAL)</h4>
            <p class="param-range">45-90 seconds (SAC305)</p>
            <p class="param-desc">Duration solder is molten. Too short = cold joints. Too long = leaching.</p>
          </div>
          
          <div class="param-card param-card--peak">
            <div class="param-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M14 14.76V3.5a2.5 2.5 0 0 0-5 0v11.26a4.5 4.5 0 1 0 5 0z"></path>
              </svg>
            </div>
            <h4>Peak Temperature</h4>
            <p class="param-range">235-250°C (SAC305)</p>
            <p class="param-desc">Maximum temperature reached. Must exceed liquidus but not damage components.</p>
          </div>
          
          <div class="param-card param-card--ramp">
            <div class="param-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="23 6 13.5 15.5 8.5 10.5 1 18"></polyline>
                <polyline points="17 6 23 6 23 12"></polyline>
              </svg>
            </div>
            <h4>Ramp Rates</h4>
            <p class="param-range">Preheat: 1-3°C/s | Cooling: &lt;4°C/s</p>
            <p class="param-desc">Controlled heating prevents thermal shock. Fast cooling creates strong grain structure.</p>
          </div>
          
          <div class="param-card param-card--delta">
            <div class="param-icon">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <path d="M12 2L2 7l10 5 10-5-10-5z"></path>
                <path d="M2 17l10 5 10-5"></path>
                <path d="M2 12l10 5 10-5"></path>
              </svg>
            </div>
            <h4>Delta T (ΔT)</h4>
            <p class="param-range">&lt;10°C across board</p>
            <p class="param-desc">Temperature difference between hottest and coldest points. Minimizes tombstoning.</p>
          </div>
        </div>
      </div>
      
      <!-- Common Issues -->
      <div class="issues-section">
        <h3 class="subsection-title">Common Reflow Issues & Solutions</h3>
        
        <div class="issues-grid">
          <div class="issue-card">
            <h4 class="issue-title">
              <span class="issue-icon issue-icon--warning">⚠</span>
              Solder Balling
            </h4>
            <p class="issue-cause"><strong>Cause:</strong> Preheat too fast, paste solvents explode</p>
            <p class="issue-solution"><strong>Fix:</strong> Slow preheat ramp to 1-2°C/sec</p>
          </div>
          
          <div class="issue-card">
            <h4 class="issue-title">
              <span class="issue-icon issue-icon--warning">⚠</span>
              Cold Solder Joints
            </h4>
            <p class="issue-cause"><strong>Cause:</strong> Insufficient peak temp or TAL too short</p>
            <p class="issue-solution"><strong>Fix:</strong> Increase peak temp, extend TAL</p>
          </div>
          
          <div class="issue-card">
            <h4 class="issue-title">
              <span class="issue-icon issue-icon--warning">⚠</span>
              Graping
            </h4>
            <p class="issue-cause"><strong>Cause:</strong> Flux exhaustion from long soak</p>
            <p class="issue-solution"><strong>Fix:</strong> Shorten soak time, use more active flux</p>
          </div>
          
          <div class="issue-card">
            <h4 class="issue-title">
              <span class="issue-icon issue-icon--warning">⚠</span>
              Component Damage
            </h4>
            <p class="issue-cause"><strong>Cause:</strong> Peak temp too high or TAL too long</p>
            <p class="issue-solution"><strong>Fix:</strong> Reduce peak temp, stay under 260°C</p>
          </div>
          
          <div class="issue-card">
            <h4 class="issue-title">
              <span class="issue-icon issue-icon--warning">⚠</span>
              Tombstoning
            </h4>
            <p class="issue-cause"><strong>Cause:</strong> Uneven heating, one pad melts first</p>
            <p class="issue-solution"><strong>Fix:</strong> Reduce ΔT, use thermal reliefs</p>
          </div>
          
          <div class="issue-card">
            <h4 class="issue-title">
              <span class="issue-icon issue-icon--warning">⚠</span>
              Brittle Joints
            </h4>
            <p class="issue-cause"><strong>Cause:</strong> Cooling too slow, large grain structure</p>
            <p class="issue-solution"><strong>Fix:</strong> Increase cooling rate to &gt;4°C/sec</p>
          </div>
        </div>
      </div>
    </div>
    
    <div v-else class="loading-placeholder">
      <p>Loading reflow profile data...</p>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  reflowProfiles: {
    type: Object,
    default: () => ({})
  }
})

const hasData = computed(() => {
  return props.reflowProfiles?.zones?.length > 0 ||
         props.reflowProfiles?.profiles
})

function formatIssueType(type) {
  const labels = {
    'tooFast': 'Too Fast',
    'tooSlow': 'Too Slow',
    'tooLong': 'Too Long',
    'tooShort': 'Too Short',
    'tooHot': 'Too Hot'
  }
  return labels[type] || type.replace(/([A-Z])/g, ' $1').trim()
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

.reflow-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-10);
}

/* Subsection Titles */
.subsection-title {
  font-size: var(--font-size-xl);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-4) 0;
}

/* Profile Diagram */
.diagram-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.profile-image {
  width: 100%;
  height: auto;
  display: block;
}

.diagram-caption {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: var(--space-3) var(--space-4);
  background-color: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border-light);
}

.caption-text {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
}

.total-time {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
}

/* Zones Timeline */
.zones-timeline {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--space-4);
}

.zone-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
  border-top: 4px solid var(--color-border-light);
}

.zone-card--preheat {
  border-top-color: #60a5fa;
}

.zone-card--soak {
  border-top-color: #fbbf24;
}

.zone-card--reflow {
  border-top-color: #ef4444;
}

.zone-card--cooling {
  border-top-color: #34d399;
}

.zone-header {
  display: flex;
  align-items: center;
  gap: var(--space-3);
}

.zone-order {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
  border-radius: var(--radius-full);
}

.zone-name {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0;
}

.zone-params {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.param-item {
  display: flex;
  justify-content: space-between;
  font-size: var(--font-size-sm);
}

.param-label {
  color: var(--color-text-secondary);
}

.param-value {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
  font-family: var(--font-family-mono);
}

.param-note {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.zone-goal {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  padding: var(--space-2) var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.zone-goal strong {
  color: var(--color-text-primary);
}

.zone-physics {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  color: var(--color-primary-600);
}

.zone-physics svg {
  flex-shrink: 0;
  margin-top: 2px;
}

.zone-issues {
  display: flex;
  flex-direction: column;
  gap: var(--space-2);
}

.issue-group {
  font-size: var(--font-size-sm);
}

.issue-type {
  font-weight: var(--font-weight-semibold);
  color: var(--color-warning-dark);
}

.issue-effects {
  margin: var(--space-1) 0 0 var(--space-4);
  padding: 0;
  color: var(--color-text-secondary);
}

.issue-effects li {
  margin-bottom: var(--space-1);
}

/* Trench Insight */
.trench-insight {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  padding: var(--space-3);
  background: linear-gradient(135deg, var(--color-accent-50) 0%, var(--color-accent-100) 100%);
  border: 1px solid var(--color-accent-200);
  border-radius: var(--radius-default);
  font-size: var(--font-size-sm);
  color: var(--color-accent-900);
}

.trench-insight svg {
  flex-shrink: 0;
  color: var(--color-accent-600);
  margin-top: 2px;
}

/* Profiles Table */
.profiles-table-wrapper {
  overflow-x: auto;
}

.profiles-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--font-size-sm);
}

.profiles-table th,
.profiles-table td {
  padding: var(--space-3) var(--space-4);
  text-align: left;
  border-bottom: 1px solid var(--color-border-light);
}

.profiles-table th {
  background-color: var(--color-surface-elevated);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.profiles-table td {
  color: var(--color-text-secondary);
}

.param-name {
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.profiles-table code {
  font-family: var(--font-family-mono);
  font-size: var(--font-size-xs);
  padding: var(--space-1) var(--space-2);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.highlight-cell {
  font-weight: var(--font-weight-semibold);
  color: var(--color-primary-600);
}

/* Critical Parameters */
.params-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: var(--space-4);
}

.param-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-5);
  text-align: center;
}

.param-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-3);
  border-radius: var(--radius-full);
}

.param-card--tal .param-icon {
  background-color: var(--color-primary-100);
  color: var(--color-primary-600);
}

.param-card--peak .param-icon {
  background-color: #fecaca;
  color: #dc2626;
}

.param-card--ramp .param-icon {
  background-color: #fef3c7;
  color: #d97706;
}

.param-card--delta .param-icon {
  background-color: #d1fae5;
  color: #059669;
}

.param-card h4 {
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.param-range {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-bold);
  color: var(--color-primary-600);
  margin: 0 0 var(--space-2) 0;
  font-family: var(--font-family-mono);
}

.param-desc {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0;
  line-height: var(--line-height-relaxed);
}

/* Issues Grid */
.issues-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--space-4);
}

.issue-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  padding: var(--space-4);
}

.issue-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-base);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

.issue-icon {
  font-size: var(--font-size-lg);
}

.issue-icon--warning {
  color: var(--color-warning-main);
}

.issue-cause,
.issue-solution {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-2) 0;
}

.issue-cause strong,
.issue-solution strong {
  color: var(--color-text-primary);
}

.issue-solution {
  color: var(--color-success-dark);
  margin-bottom: 0;
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
  
  .zones-timeline {
    grid-template-columns: 1fr;
  }
  
  .params-grid {
    grid-template-columns: 1fr;
  }
  
  .issues-grid {
    grid-template-columns: 1fr;
  }
  
  .diagram-caption {
    flex-direction: column;
    gap: var(--space-2);
    text-align: center;
  }
}
</style>
