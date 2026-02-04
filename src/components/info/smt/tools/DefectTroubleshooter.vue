<template>
  <div class="defect-troubleshooter">
    <div class="troubleshooter-header">
      <h3 class="troubleshooter-title">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <circle cx="12" cy="12" r="10"/>
          <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/>
          <line x1="12" y1="17" x2="12.01" y2="17"/>
        </svg>
        Defect Troubleshooter
      </h3>
      <p class="troubleshooter-description">
        Diagnose SMT defects and get recommended solutions
      </p>
    </div>

    <!-- Progress Steps -->
    <div class="progress-steps">
      <div 
        v-for="(step, index) in steps" 
        :key="index"
        class="progress-step"
        :class="{
          'progress-step--completed': currentStep > index + 1,
          'progress-step--active': currentStep === index + 1,
          'progress-step--upcoming': currentStep < index + 1
        }"
      >
        <div class="step-circle">
          <svg v-if="currentStep > index + 1" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3">
            <polyline points="20 6 9 17 4 12"/>
          </svg>
          <span v-else>{{ index + 1 }}</span>
        </div>
        <span class="step-label">{{ step }}</span>
      </div>
    </div>

    <div class="troubleshooter-body">
      <!-- Step 1: Select Defect Type -->
      <div v-if="currentStep === 1" class="wizard-step">
        <h4 class="step-title">Select the defect type you're experiencing</h4>
        <p class="step-description">Choose the defect that best matches what you're seeing</p>
        
        <div class="defect-grid">
          <button
            v-for="defect in defectTypes"
            :key="defect.id"
            class="defect-card"
            :class="{ 'defect-card--selected': selectedDefect === defect.id }"
            @click="selectDefect(defect.id)"
          >
            <div class="defect-icon" :style="{ backgroundColor: defect.color + '20', color: defect.color }">
              <component :is="defect.icon" />
            </div>
            <div class="defect-info">
              <span class="defect-name">{{ defect.name }}</span>
              <span class="defect-brief">{{ defect.brief }}</span>
            </div>
          </button>
        </div>
      </div>

      <!-- Step 2: Diagnostic Questions -->
      <div v-if="currentStep === 2" class="wizard-step">
        <h4 class="step-title">Answer diagnostic questions</h4>
        <p class="step-description">Help us narrow down the root cause</p>
        
        <div class="questions-list">
          <div 
            v-for="(question, index) in currentQuestions" 
            :key="index"
            class="question-item"
          >
            <label class="question-label">{{ question.text }}</label>
            <div class="question-options">
              <button
                v-for="option in question.options"
                :key="option.value"
                class="option-btn"
                :class="{ 'option-btn--selected': answers[question.id] === option.value }"
                @click="setAnswer(question.id, option.value)"
              >
                {{ option.label }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Step 3: Diagnosis Results -->
      <div v-if="currentStep === 3" class="wizard-step wizard-step--results">
        <div class="results-header">
          <div class="defect-badge" :style="{ backgroundColor: currentDefectData.color + '20', color: currentDefectData.color }">
            <component :is="currentDefectData.icon" />
            <span>{{ currentDefectData.name }}</span>
          </div>
        </div>

        <!-- Root Causes -->
        <div class="results-section">
          <h5 class="results-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="12" cy="12" r="10"/>
              <line x1="12" y1="16" x2="12" y2="12"/>
              <line x1="12" y1="8" x2="12.01" y2="8"/>
            </svg>
            Most Likely Root Causes
          </h5>
          <div class="causes-list">
            <div 
              v-for="(cause, index) in rankedCauses" 
              :key="index"
              class="cause-item"
            >
              <div class="cause-rank" :class="'cause-rank--' + (index + 1)">{{ index + 1 }}</div>
              <div class="cause-content">
                <span class="cause-name">{{ cause.name }}</span>
                <span class="cause-likelihood">{{ cause.likelihood }}% likely</span>
              </div>
              <div class="cause-bar">
                <div class="cause-bar-fill" :style="{ width: cause.likelihood + '%' }"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Recommended Solutions -->
        <div class="results-section">
          <h5 class="results-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"/>
            </svg>
            Recommended Solutions
          </h5>
          <div class="solutions-list">
            <div 
              v-for="(solution, index) in solutions" 
              :key="index"
              class="solution-item"
            >
              <div class="solution-number">{{ index + 1 }}</div>
              <div class="solution-content">
                <span class="solution-title">{{ solution.title }}</span>
                <span class="solution-description">{{ solution.description }}</span>
              </div>
            </div>
          </div>
        </div>

        <!-- Process Parameters to Check -->
        <div class="results-section">
          <h5 class="results-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <path d="M12 20V10"/>
              <path d="M18 20V4"/>
              <path d="M6 20v-4"/>
            </svg>
            Process Parameters to Check
          </h5>
          <div class="parameters-grid">
            <div 
              v-for="(param, index) in parametersToCheck" 
              :key="index"
              class="parameter-card"
            >
              <span class="parameter-name">{{ param.name }}</span>
              <span class="parameter-target">{{ param.target }}</span>
            </div>
          </div>
        </div>

        <!-- Related Defects -->
        <div class="results-section">
          <h5 class="results-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="18" cy="5" r="3"/>
              <circle cx="6" cy="12" r="3"/>
              <circle cx="18" cy="19" r="3"/>
              <line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/>
              <line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/>
            </svg>
            Related Defects to Watch For
          </h5>
          <div class="related-defects">
            <span 
              v-for="(related, index) in relatedDefects" 
              :key="index"
              class="related-tag"
            >
              {{ related }}
            </span>
          </div>
        </div>

        <!-- Defect Image Example -->
        <div class="results-section" v-if="currentDefectData.image">
          <h5 class="results-section-title">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
              <circle cx="8.5" cy="8.5" r="1.5"/>
              <polyline points="21 15 16 10 5 21"/>
            </svg>
            Visual Reference
          </h5>
          <div class="defect-image">
            <img :src="currentDefectData.image" :alt="currentDefectData.name" />
          </div>
        </div>
      </div>
    </div>

    <!-- Navigation -->
    <div class="troubleshooter-navigation">
      <button 
        v-if="currentStep > 1"
        class="nav-btn nav-btn--secondary"
        @click="previousStep"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="15 18 9 12 15 6"/>
        </svg>
        Back
      </button>
      
      <button 
        v-if="currentStep === 3"
        class="nav-btn nav-btn--secondary"
        @click="startOver"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
        Start Over
      </button>

      <button 
        v-if="currentStep === 3"
        class="nav-btn nav-btn--secondary"
        @click="exportReport"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
          <polyline points="7 10 12 15 17 10"/>
          <line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Export Report
      </button>

      <button 
        v-if="currentStep < 3"
        class="nav-btn nav-btn--primary"
        :disabled="!canProceed"
        @click="nextStep"
      >
        {{ currentStep === 2 ? 'Get Diagnosis' : 'Continue' }}
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="9 18 15 12 9 6"/>
        </svg>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, h } from 'vue'

// Icon components
const BridgeIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { d: 'M4 18h16' }),
  h('path', { d: 'M4 14h16' }),
  h('path', { d: 'M6 14v4' }),
  h('path', { d: 'M18 14v4' }),
  h('path', { d: 'M12 6v8' })
])

const TombstoneIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('rect', { x: 8, y: 4, width: 8, height: 16, rx: 1 }),
  h('line', { x1: 4, y1: 20, x2: 20, y2: 20 })
])

const OpenIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('circle', { cx: 12, cy: 12, r: 10 }),
  h('line', { x1: 8, y1: 12, x2: 16, y2: 12 })
])

const BallIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('circle', { cx: 12, cy: 12, r: 4 }),
  h('circle', { cx: 6, cy: 18, r: 2 }),
  h('circle', { cx: 18, cy: 18, r: 2 }),
  h('circle', { cx: 12, cy: 6, r: 2 })
])

const ColdJointIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('path', { d: 'M12 2v4' }),
  h('path', { d: 'M12 18v4' }),
  h('path', { d: 'M4.93 4.93l2.83 2.83' }),
  h('path', { d: 'M16.24 16.24l2.83 2.83' }),
  h('path', { d: 'M2 12h4' }),
  h('path', { d: 'M18 12h4' }),
  h('circle', { cx: 12, cy: 12, r: 4 })
])

const HIPIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('ellipse', { cx: 12, cy: 16, rx: 8, ry: 4 }),
  h('circle', { cx: 12, cy: 8, r: 4 })
])

const VoidIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('rect', { x: 4, y: 4, width: 16, height: 16, rx: 2 }),
  h('circle', { cx: 12, cy: 12, r: 4, fill: 'none', 'stroke-dasharray': '4 2' })
])

const ShiftIcon = () => h('svg', { xmlns: 'http://www.w3.org/2000/svg', width: 24, height: 24, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', 'stroke-width': 2 }, [
  h('rect', { x: 6, y: 6, width: 12, height: 12, rx: 1, 'stroke-dasharray': '4 2' }),
  h('rect', { x: 8, y: 8, width: 12, height: 12, rx: 1 })
])

// State
const currentStep = ref(1)
const selectedDefect = ref(null)
const answers = ref({})

const steps = ['Select Defect', 'Diagnostics', 'Results']

// Defect types data
const defectTypes = [
  { 
    id: 'bridges', 
    name: 'Solder Bridges', 
    brief: 'Unwanted solder connections between pads',
    color: '#ef4444',
    icon: BridgeIcon,
    image: '/images/smt/solder-defects-common.png'
  },
  { 
    id: 'tombstoning', 
    name: 'Tombstoning', 
    brief: 'Component standing on one end',
    color: '#f97316',
    icon: TombstoneIcon,
    image: '/images/smt/component-faults.png'
  },
  { 
    id: 'insufficient', 
    name: 'Insufficient Solder / Opens', 
    brief: 'Not enough solder or no connection',
    color: '#eab308',
    icon: OpenIcon,
    image: '/images/smt/open-defects.png'
  },
  { 
    id: 'solder-balls', 
    name: 'Solder Balls', 
    brief: 'Small spheres of solder on board',
    color: '#22c55e',
    icon: BallIcon,
    image: '/images/smt/soldering-defects.png'
  },
  { 
    id: 'cold-joints', 
    name: 'Cold Joints', 
    brief: 'Dull, grainy solder appearance',
    color: '#06b6d4',
    icon: ColdJointIcon,
    image: '/images/smt/temperature-faults.png'
  },
  { 
    id: 'hip', 
    name: 'Head-in-Pillow', 
    brief: 'BGA ball not fully collapsed',
    color: '#8b5cf6',
    icon: HIPIcon,
    image: null
  },
  { 
    id: 'voiding', 
    name: 'Voiding', 
    brief: 'Air pockets in solder joint',
    color: '#ec4899',
    icon: VoidIcon,
    image: null
  },
  { 
    id: 'shift', 
    name: 'Component Shift', 
    brief: 'Component moved from pad center',
    color: '#6366f1',
    icon: ShiftIcon,
    image: '/images/smt/pcb-defects.png'
  }
]

// Questions for each defect type
const defectQuestions = {
  bridges: [
    {
      id: 'occurrence',
      text: 'When does the bridging occur?',
      options: [
        { value: 'first-pass', label: 'First reflow pass' },
        { value: 'second-pass', label: 'Second reflow pass' },
        { value: 'random', label: 'Random / Intermittent' }
      ]
    },
    {
      id: 'location',
      text: 'Where on the board are bridges occurring?',
      options: [
        { value: 'fine-pitch', label: 'Fine-pitch components (QFP, BGA)' },
        { value: 'passives', label: 'Passive components' },
        { value: 'widespread', label: 'Widespread across board' }
      ]
    },
    {
      id: 'recent-change',
      text: 'Any recent process changes?',
      options: [
        { value: 'new-paste', label: 'New solder paste lot' },
        { value: 'new-stencil', label: 'New or cleaned stencil' },
        { value: 'profile-change', label: 'Reflow profile adjusted' },
        { value: 'none', label: 'No recent changes' }
      ]
    }
  ],
  tombstoning: [
    {
      id: 'component-size',
      text: 'What component sizes are affected?',
      options: [
        { value: '0201-0402', label: '0201 / 0402' },
        { value: '0603-0805', label: '0603 / 0805' },
        { value: 'mixed', label: 'Multiple sizes' }
      ]
    },
    {
      id: 'pattern',
      text: 'Is there a pattern to the defects?',
      options: [
        { value: 'one-direction', label: 'Components facing one direction' },
        { value: 'board-edge', label: 'Near board edges' },
        { value: 'random', label: 'Random distribution' }
      ]
    },
    {
      id: 'frequency',
      text: 'How often does it occur?',
      options: [
        { value: 'high', label: 'High (>5% of components)' },
        { value: 'medium', label: 'Medium (1-5%)' },
        { value: 'low', label: 'Low (<1%)' }
      ]
    }
  ],
  insufficient: [
    {
      id: 'location',
      text: 'Where are opens occurring?',
      options: [
        { value: 'bga', label: 'BGA packages' },
        { value: 'qfn', label: 'QFN / DFN packages' },
        { value: 'fine-pitch', label: 'Fine-pitch leads' },
        { value: 'passives', label: 'Passive components' }
      ]
    },
    {
      id: 'pattern',
      text: 'Is there a pattern?',
      options: [
        { value: 'consistent', label: 'Same location each board' },
        { value: 'random', label: 'Random locations' },
        { value: 'board-area', label: 'Specific board area' }
      ]
    },
    {
      id: 'visual',
      text: 'What does the joint look like?',
      options: [
        { value: 'no-paste', label: 'No paste deposited' },
        { value: 'partial', label: 'Partial paste coverage' },
        { value: 'non-wet', label: 'Paste present but not wetted' }
      ]
    }
  ],
  'solder-balls': [
    {
      id: 'size',
      text: 'What size are the solder balls?',
      options: [
        { value: 'small', label: 'Small (<0.1mm)' },
        { value: 'medium', label: 'Medium (0.1-0.3mm)' },
        { value: 'large', label: 'Large (>0.3mm)' }
      ]
    },
    {
      id: 'location',
      text: 'Where are they located?',
      options: [
        { value: 'near-components', label: 'Near component edges' },
        { value: 'random', label: 'Random on board' },
        { value: 'under-components', label: 'Under components' }
      ]
    },
    {
      id: 'quantity',
      text: 'How many per board?',
      options: [
        { value: 'few', label: 'Few (1-5)' },
        { value: 'moderate', label: 'Moderate (5-20)' },
        { value: 'many', label: 'Many (>20)' }
      ]
    }
  ],
  'cold-joints': [
    {
      id: 'appearance',
      text: 'What is the joint appearance?',
      options: [
        { value: 'dull', label: 'Dull, matte finish' },
        { value: 'grainy', label: 'Grainy texture' },
        { value: 'cracked', label: 'Visible cracks' }
      ]
    },
    {
      id: 'location',
      text: 'Where are cold joints occurring?',
      options: [
        { value: 'large-components', label: 'Large thermal mass components' },
        { value: 'board-edge', label: 'Board edges' },
        { value: 'widespread', label: 'Widespread' }
      ]
    },
    {
      id: 'alloy',
      text: 'What solder alloy are you using?',
      options: [
        { value: 'lead-free', label: 'Lead-free (SAC)' },
        { value: 'leaded', label: 'Leaded (SnPb)' },
        { value: 'low-temp', label: 'Low-temperature' }
      ]
    }
  ],
  hip: [
    {
      id: 'package',
      text: 'What BGA package type?',
      options: [
        { value: 'fine-pitch', label: 'Fine pitch (<0.8mm)' },
        { value: 'standard', label: 'Standard pitch (0.8-1.0mm)' },
        { value: 'large', label: 'Large pitch (>1.0mm)' }
      ]
    },
    {
      id: 'location',
      text: 'Where on the BGA?',
      options: [
        { value: 'center', label: 'Center balls' },
        { value: 'perimeter', label: 'Perimeter balls' },
        { value: 'random', label: 'Random distribution' }
      ]
    },
    {
      id: 'warpage',
      text: 'Is component warpage suspected?',
      options: [
        { value: 'yes', label: 'Yes, visible warpage' },
        { value: 'possible', label: 'Possibly' },
        { value: 'no', label: 'No warpage observed' }
      ]
    }
  ],
  voiding: [
    {
      id: 'void-size',
      text: 'What is the void percentage?',
      options: [
        { value: 'low', label: 'Low (<10%)' },
        { value: 'medium', label: 'Medium (10-25%)' },
        { value: 'high', label: 'High (>25%)' }
      ]
    },
    {
      id: 'component-type',
      text: 'Which components are affected?',
      options: [
        { value: 'bga', label: 'BGA packages' },
        { value: 'qfn', label: 'QFN thermal pads' },
        { value: 'power', label: 'Power components' }
      ]
    },
    {
      id: 'paste-type',
      text: 'What paste type are you using?',
      options: [
        { value: 'type3', label: 'Type 3' },
        { value: 'type4', label: 'Type 4' },
        { value: 'type5', label: 'Type 5 or finer' }
      ]
    }
  ],
  shift: [
    {
      id: 'direction',
      text: 'What direction is the shift?',
      options: [
        { value: 'conveyor', label: 'Conveyor direction' },
        { value: 'perpendicular', label: 'Perpendicular to conveyor' },
        { value: 'rotation', label: 'Rotational' }
      ]
    },
    {
      id: 'magnitude',
      text: 'How much shift?',
      options: [
        { value: 'slight', label: 'Slight (<25% off pad)' },
        { value: 'moderate', label: 'Moderate (25-50%)' },
        { value: 'severe', label: 'Severe (>50%)' }
      ]
    },
    {
      id: 'components',
      text: 'Which components are affected?',
      options: [
        { value: 'small', label: 'Small passives' },
        { value: 'large', label: 'Large components' },
        { value: 'all', label: 'All component types' }
      ]
    }
  ]
}

// Diagnosis data for each defect
const diagnosisData = {
  bridges: {
    causes: [
      { name: 'Excessive solder paste volume', likelihood: 85 },
      { name: 'Stencil aperture too large', likelihood: 75 },
      { name: 'Insufficient solder paste gap', likelihood: 65 },
      { name: 'Paste slump during reflow', likelihood: 55 },
      { name: 'Component misalignment', likelihood: 40 }
    ],
    solutions: [
      { title: 'Reduce aperture size', description: 'Decrease stencil aperture by 10-15% to reduce paste volume' },
      { title: 'Check stencil condition', description: 'Inspect for clogged apertures, clean or replace if worn' },
      { title: 'Optimize reflow profile', description: 'Ensure proper preheat to prevent paste slump' },
      { title: 'Verify pad design', description: 'Check solder mask defined vs non-solder mask defined pads' },
      { title: 'Adjust print parameters', description: 'Reduce print speed and pressure if paste is smearing' }
    ],
    parameters: [
      { name: 'Aperture Size', target: 'Reduce by 10-15%' },
      { name: 'Print Pressure', target: '0.5-1.0 kg/cm' },
      { name: 'Print Speed', target: '20-40 mm/sec' },
      { name: 'Stencil Gap', target: '0 mm (contact)' }
    ],
    related: ['Solder Balls', 'Component Shift', 'Insufficient Solder']
  },
  tombstoning: {
    causes: [
      { name: 'Unequal pad heating', likelihood: 80 },
      { name: 'Unequal paste deposits', likelihood: 70 },
      { name: 'Component placement offset', likelihood: 60 },
      { name: 'Excessive reflow ramp rate', likelihood: 50 },
      { name: 'Pad design imbalance', likelihood: 45 }
    ],
    solutions: [
      { title: 'Balance thermal mass', description: 'Ensure equal copper distribution on both pads' },
      { title: 'Check paste deposits', description: 'Verify equal paste volume on both pads with SPI' },
      { title: 'Optimize placement accuracy', description: 'Center component precisely between pads' },
      { title: 'Reduce preheat ramp', description: 'Slower ramp allows more uniform heating' },
      { title: 'Use anti-tombstone paste', description: 'Consider paste with slower wetting characteristics' }
    ],
    parameters: [
      { name: 'Preheat Ramp', target: '1.0-2.0 °C/sec' },
      { name: 'Placement Accuracy', target: '±0.05mm' },
      { name: 'Paste Volume Balance', target: '±10%' },
      { name: 'Soak Time', target: '60-90 sec' }
    ],
    related: ['Component Shift', 'Cold Joints', 'Insufficient Solder']
  },
  insufficient: {
    causes: [
      { name: 'Blocked stencil apertures', likelihood: 75 },
      { name: 'Insufficient print pressure', likelihood: 65 },
      { name: 'Poor paste release', likelihood: 60 },
      { name: 'Paste dried out', likelihood: 55 },
      { name: 'Pad oxidation', likelihood: 45 }
    ],
    solutions: [
      { title: 'Clean stencil thoroughly', description: 'Use appropriate solvent and wipe frequency' },
      { title: 'Increase print pressure', description: 'Ensure complete aperture fill' },
      { title: 'Check area ratio', description: 'Verify aperture design meets 0.66 minimum' },
      { title: 'Replace solder paste', description: 'Check paste age and storage conditions' },
      { title: 'Verify pad finish', description: 'Check for oxidation or contamination' }
    ],
    parameters: [
      { name: 'Print Pressure', target: '0.8-1.2 kg/cm' },
      { name: 'Separation Speed', target: '1-3 mm/sec' },
      { name: 'Area Ratio', target: '≥0.66' },
      { name: 'Paste Age', target: '<6 months' }
    ],
    related: ['Cold Joints', 'Opens', 'Head-in-Pillow']
  },
  'solder-balls': {
    causes: [
      { name: 'Paste slump/spread', likelihood: 70 },
      { name: 'Excessive paste volume', likelihood: 65 },
      { name: 'Outgassing during reflow', likelihood: 60 },
      { name: 'Moisture in paste', likelihood: 55 },
      { name: 'Solder mask issues', likelihood: 40 }
    ],
    solutions: [
      { title: 'Reduce paste volume', description: 'Decrease aperture size or stencil thickness' },
      { title: 'Optimize reflow profile', description: 'Ensure adequate soak for flux activation' },
      { title: 'Check paste condition', description: 'Verify proper storage and handling' },
      { title: 'Improve stencil design', description: 'Use home plate or rounded apertures' },
      { title: 'Verify solder mask', description: 'Check for proper cure and adhesion' }
    ],
    parameters: [
      { name: 'Paste Volume', target: 'Reduce 10-20%' },
      { name: 'Soak Temperature', target: '150-180°C' },
      { name: 'Soak Duration', target: '60-90 sec' },
      { name: 'Paste Humidity', target: '<60% RH' }
    ],
    related: ['Solder Bridges', 'Voiding', 'Component Shift']
  },
  'cold-joints': {
    causes: [
      { name: 'Insufficient peak temperature', likelihood: 80 },
      { name: 'Insufficient time above liquidus', likelihood: 75 },
      { name: 'Poor thermal transfer', likelihood: 60 },
      { name: 'Contaminated surfaces', likelihood: 50 },
      { name: 'Expired flux', likelihood: 40 }
    ],
    solutions: [
      { title: 'Increase peak temperature', description: 'Ensure 20-40°C above liquidus' },
      { title: 'Extend TAL', description: 'Increase time above liquidus to 45-75 seconds' },
      { title: 'Profile thermal mass', description: 'Account for large components in profile' },
      { title: 'Clean surfaces', description: 'Ensure pads and components are clean' },
      { title: 'Check paste freshness', description: 'Verify paste is within shelf life' }
    ],
    parameters: [
      { name: 'Peak Temperature', target: 'Liquidus + 25-40°C' },
      { name: 'Time Above Liquidus', target: '45-75 sec' },
      { name: 'Ramp to Peak', target: '1.5-2.5 °C/sec' },
      { name: 'Delta T', target: '<10°C across board' }
    ],
    related: ['Head-in-Pillow', 'Insufficient Solder', 'Voiding']
  },
  hip: {
    causes: [
      { name: 'Component warpage', likelihood: 85 },
      { name: 'PCB warpage', likelihood: 75 },
      { name: 'Insufficient reflow temperature', likelihood: 65 },
      { name: 'Oxidized BGA balls', likelihood: 55 },
      { name: 'Paste volume mismatch', likelihood: 45 }
    ],
    solutions: [
      { title: 'Control warpage', description: 'Use vacuum reflow or component hold-down' },
      { title: 'Optimize profile', description: 'Ensure adequate peak temperature and TAL' },
      { title: 'Check component storage', description: 'Verify proper MSL handling' },
      { title: 'Adjust paste volume', description: 'May need more paste for warped components' },
      { title: 'Consider nitrogen reflow', description: 'Reduces oxidation during reflow' }
    ],
    parameters: [
      { name: 'Peak Temperature', target: '245-250°C (SAC)' },
      { name: 'TAL', target: '60-90 sec' },
      { name: 'Cooling Rate', target: '2-4 °C/sec' },
      { name: 'Component Flatness', target: '<0.15mm' }
    ],
    related: ['Cold Joints', 'Opens', 'Voiding']
  },
  voiding: {
    causes: [
      { name: 'Outgassing during reflow', likelihood: 75 },
      { name: 'Insufficient flux activity', likelihood: 65 },
      { name: 'Pad/paste oxidation', likelihood: 60 },
      { name: 'Improper reflow profile', likelihood: 55 },
      { name: 'Large thermal pad design', likelihood: 50 }
    ],
    solutions: [
      { title: 'Optimize reflow profile', description: 'Longer soak for outgassing, proper peak temp' },
      { title: 'Use void-reducing paste', description: 'Select paste formulated for low voiding' },
      { title: 'Modify aperture design', description: 'Use window pane or cross-hatch patterns' },
      { title: 'Consider vacuum reflow', description: 'Removes trapped gases during reflow' },
      { title: 'Improve pad finish', description: 'Ensure clean, oxide-free surfaces' }
    ],
    parameters: [
      { name: 'Soak Duration', target: '90-120 sec' },
      { name: 'Peak Temperature', target: 'Liquidus + 30°C' },
      { name: 'Aperture Pattern', target: 'Window pane for large pads' },
      { name: 'Void Target', target: '<25% area' }
    ],
    related: ['Cold Joints', 'Head-in-Pillow', 'Insufficient Solder']
  },
  shift: {
    causes: [
      { name: 'Unequal wetting forces', likelihood: 70 },
      { name: 'Conveyor vibration', likelihood: 65 },
      { name: 'Excessive paste volume', likelihood: 55 },
      { name: 'Component floating', likelihood: 50 },
      { name: 'Placement offset', likelihood: 45 }
    ],
    solutions: [
      { title: 'Balance pad design', description: 'Ensure symmetric pad sizes and thermal relief' },
      { title: 'Check conveyor', description: 'Verify smooth operation, no vibration' },
      { title: 'Reduce paste volume', description: 'Less paste reduces floating tendency' },
      { title: 'Optimize placement', description: 'Verify placement accuracy and force' },
      { title: 'Adjust reflow profile', description: 'Slower ramp reduces sudden wetting' }
    ],
    parameters: [
      { name: 'Placement Accuracy', target: '±0.05mm' },
      { name: 'Paste Volume', target: 'Reduce if floating' },
      { name: 'Preheat Ramp', target: '1.5-2.0 °C/sec' },
      { name: 'Conveyor Speed', target: 'Consistent, no jerks' }
    ],
    related: ['Tombstoning', 'Solder Bridges', 'Opens']
  }
}

// Computed values
const currentDefectData = computed(() => {
  return defectTypes.find(d => d.id === selectedDefect.value) || defectTypes[0]
})

const currentQuestions = computed(() => {
  return defectQuestions[selectedDefect.value] || []
})

const canProceed = computed(() => {
  if (currentStep.value === 1) {
    return selectedDefect.value !== null
  }
  if (currentStep.value === 2) {
    return currentQuestions.value.every(q => answers.value[q.id] !== undefined)
  }
  return true
})

const diagnosis = computed(() => {
  return diagnosisData[selectedDefect.value] || diagnosisData.bridges
})

const rankedCauses = computed(() => {
  // Adjust likelihood based on answers
  let causes = [...diagnosis.value.causes]
  
  // Simple adjustment logic based on answers
  const ans = answers.value
  
  if (selectedDefect.value === 'bridges') {
    if (ans.occurrence === 'first-pass') {
      causes[0].likelihood = Math.min(95, causes[0].likelihood + 10)
    }
    if (ans.recent_change === 'new-paste') {
      causes[3].likelihood = Math.min(90, causes[3].likelihood + 20)
    }
  }
  
  // Sort by likelihood
  return causes.sort((a, b) => b.likelihood - a.likelihood)
})

const solutions = computed(() => diagnosis.value.solutions)
const parametersToCheck = computed(() => diagnosis.value.parameters)
const relatedDefects = computed(() => diagnosis.value.related)

// Methods
function selectDefect(defectId) {
  selectedDefect.value = defectId
  answers.value = {}
}

function setAnswer(questionId, value) {
  answers.value[questionId] = value
}

function nextStep() {
  if (canProceed.value && currentStep.value < 3) {
    currentStep.value++
  }
}

function previousStep() {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

function startOver() {
  currentStep.value = 1
  selectedDefect.value = null
  answers.value = {}
}

function exportReport() {
  const report = `SMT Defect Troubleshooting Report
=====================================
Date: ${new Date().toLocaleString()}

DEFECT TYPE: ${currentDefectData.value.name}
${currentDefectData.value.brief}

DIAGNOSTIC ANSWERS:
${currentQuestions.value.map(q => {
  const answer = q.options.find(o => o.value === answers.value[q.id])
  return `- ${q.text}: ${answer?.label || 'Not answered'}`
}).join('\n')}

ROOT CAUSES (Ranked by Likelihood):
${rankedCauses.value.map((c, i) => `${i + 1}. ${c.name} (${c.likelihood}%)`).join('\n')}

RECOMMENDED SOLUTIONS:
${solutions.value.map((s, i) => `${i + 1}. ${s.title}\n   ${s.description}`).join('\n\n')}

PROCESS PARAMETERS TO CHECK:
${parametersToCheck.value.map(p => `- ${p.name}: ${p.target}`).join('\n')}

RELATED DEFECTS TO WATCH:
${relatedDefects.value.join(', ')}
`

  const blob = new Blob([report], { type: 'text/plain' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = `defect-report-${selectedDefect.value}-${Date.now()}.txt`
  a.click()
  URL.revokeObjectURL(url)
}
</script>

<style scoped>
.defect-troubleshooter {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}

.troubleshooter-header {
  padding: var(--space-5);
  background: linear-gradient(135deg, var(--color-warning-600), var(--color-warning-700));
  color: var(--color-text-inverse);
}

.troubleshooter-title {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  margin: 0 0 var(--space-2) 0;
}

.troubleshooter-title svg {
  opacity: 0.9;
}

.troubleshooter-description {
  font-size: var(--font-size-sm);
  opacity: 0.9;
  margin: 0;
}

/* Progress Steps */
.progress-steps {
  display: flex;
  justify-content: center;
  gap: var(--space-8);
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-elevated);
  border-bottom: 1px solid var(--color-border-light);
}

.progress-step {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-2);
}

.step-circle {
  width: 32px;
  height: 32px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  transition: all var(--transition-fast);
}

.progress-step--completed .step-circle {
  background-color: var(--color-success-500);
  color: white;
}

.progress-step--active .step-circle {
  background-color: var(--color-primary-500);
  color: white;
  box-shadow: 0 0 0 4px var(--color-primary-100);
}

.progress-step--upcoming .step-circle {
  background-color: var(--color-surface);
  border: 2px solid var(--color-border-default);
  color: var(--color-text-tertiary);
}

.step-label {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.progress-step--active .step-label {
  color: var(--color-primary-600);
  font-weight: var(--font-weight-medium);
}

/* Troubleshooter Body */
.troubleshooter-body {
  padding: var(--space-6);
  min-height: 400px;
}

.wizard-step {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
}

.step-title {
  font-size: var(--font-size-lg);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-2) 0;
}

.step-description {
  font-size: var(--font-size-sm);
  color: var(--color-text-secondary);
  margin: 0 0 var(--space-5) 0;
}

/* Defect Grid */
.defect-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.defect-card {
  display: flex;
  align-items: center;
  gap: var(--space-3);
  padding: var(--space-4);
  background-color: var(--color-surface);
  border: 2px solid var(--color-border-light);
  border-radius: var(--radius-lg);
  cursor: pointer;
  transition: all var(--transition-fast);
  text-align: left;
}

.defect-card:hover {
  border-color: var(--color-primary-300);
  background-color: var(--color-primary-50);
}

.defect-card--selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-50);
}

.defect-icon {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--radius-default);
}

.defect-info {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.defect-name {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.defect-brief {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Questions */
.questions-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-5);
}

.question-item {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.question-label {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  color: var(--color-text-primary);
}

.question-options {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.option-btn {
  padding: var(--space-2) var(--space-4);
  font-size: var(--font-size-sm);
  background-color: var(--color-surface);
  border: 1px solid var(--color-border-default);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.option-btn:hover {
  border-color: var(--color-primary-300);
  background-color: var(--color-primary-50);
}

.option-btn--selected {
  border-color: var(--color-primary-500);
  background-color: var(--color-primary-500);
  color: white;
}

/* Results */
.wizard-step--results {
  padding-top: 0;
}

.results-header {
  margin-bottom: var(--space-5);
}

.defect-badge {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-full);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
}

.results-section {
  margin-bottom: var(--space-5);
}

.results-section-title {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
  margin: 0 0 var(--space-3) 0;
}

/* Causes */
.causes-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.cause-item {
  display: grid;
  grid-template-columns: 32px 1fr 100px;
  align-items: center;
  gap: var(--space-3);
}

.cause-rank {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-bold);
}

.cause-rank--1 {
  background-color: var(--color-error-100);
  color: var(--color-error-700);
}

.cause-rank--2 {
  background-color: var(--color-warning-100);
  color: var(--color-warning-700);
}

.cause-rank--3 {
  background-color: var(--color-accent-100);
  color: var(--color-accent-700);
}

.cause-rank--4,
.cause-rank--5 {
  background-color: var(--color-neutral-100);
  color: var(--color-neutral-600);
}

.cause-content {
  display: flex;
  flex-direction: column;
}

.cause-name {
  font-size: var(--font-size-sm);
  color: var(--color-text-primary);
}

.cause-likelihood {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.cause-bar {
  height: 8px;
  background-color: var(--color-neutral-100);
  border-radius: var(--radius-full);
  overflow: hidden;
}

.cause-bar-fill {
  height: 100%;
  background-color: var(--color-primary-500);
  border-radius: var(--radius-full);
  transition: width var(--transition-normal);
}

/* Solutions */
.solutions-list {
  display: flex;
  flex-direction: column;
  gap: var(--space-3);
}

.solution-item {
  display: flex;
  gap: var(--space-3);
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.solution-number {
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--color-primary-100);
  color: var(--color-primary-700);
  border-radius: 50%;
  font-size: var(--font-size-xs);
  font-weight: var(--font-weight-bold);
}

.solution-content {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
}

.solution-title {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

.solution-description {
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Parameters */
.parameters-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-3);
}

.parameter-card {
  display: flex;
  flex-direction: column;
  gap: var(--space-1);
  padding: var(--space-3);
  background-color: var(--color-surface-elevated);
  border-radius: var(--radius-default);
}

.parameter-name {
  font-size: var(--font-size-xs);
  color: var(--color-text-tertiary);
}

.parameter-target {
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-semibold);
  color: var(--color-text-primary);
}

/* Related Defects */
.related-defects {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
}

.related-tag {
  padding: var(--space-1) var(--space-3);
  background-color: var(--color-surface-elevated);
  border: 1px solid var(--color-border-light);
  border-radius: var(--radius-full);
  font-size: var(--font-size-xs);
  color: var(--color-text-secondary);
}

/* Defect Image */
.defect-image {
  border-radius: var(--radius-default);
  overflow: hidden;
  border: 1px solid var(--color-border-light);
}

.defect-image img {
  width: 100%;
  height: auto;
  display: block;
}

/* Navigation */
.troubleshooter-navigation {
  display: flex;
  justify-content: space-between;
  padding: var(--space-4) var(--space-5);
  background-color: var(--color-surface-elevated);
  border-top: 1px solid var(--color-border-light);
}

.nav-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-3) var(--space-5);
  font-size: var(--font-size-sm);
  font-weight: var(--font-weight-medium);
  border-radius: var(--radius-default);
  cursor: pointer;
  transition: all var(--transition-fast);
}

.nav-btn--primary {
  background-color: var(--color-primary-500);
  color: white;
  border: none;
  margin-left: auto;
}

.nav-btn--primary:hover:not(:disabled) {
  background-color: var(--color-primary-600);
}

.nav-btn--primary:disabled {
  background-color: var(--color-neutral-300);
  cursor: not-allowed;
}

.nav-btn--secondary {
  background-color: var(--color-surface);
  color: var(--color-text-secondary);
  border: 1px solid var(--color-border-default);
}

.nav-btn--secondary:hover {
  background-color: var(--color-surface-hover);
  color: var(--color-text-primary);
}

/* Responsive */
@media (max-width: 768px) {
  .defect-grid {
    grid-template-columns: 1fr;
  }
  
  .parameters-grid {
    grid-template-columns: 1fr;
  }
  
  .cause-item {
    grid-template-columns: 32px 1fr;
  }
  
  .cause-bar {
    grid-column: 1 / -1;
  }
  
  .progress-steps {
    gap: var(--space-4);
  }
  
  .step-label {
    display: none;
  }
}
</style>
