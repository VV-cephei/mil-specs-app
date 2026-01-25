# mil-specs.com - Vue.js Application Architecture

## Executive Summary

This document outlines the comprehensive architecture for the mil-specs.com Vue.js single-page application. The application will serve as a centralized platform for aerospace professionals to view, analyze, and create workflows based on MIL specifications, with initial focus on MIL-STD-2073 and DD Form 2326.

## Technical Stack

- **Framework**: Vue.js 3 (Composition API)
- **Build Tool**: Vite 5.x
- **UI Framework**: Vuetify 3 (Material Design Components)
- **State Management**: Pinia
- **Routing**: Vue Router 4
- **HTTP Client**: Axios
- **Validation**: Vuelidate or Vee-Validate
- **PDF Handling**: PDF.js (for document rendering)
- **Export**: jsPDF (for form generation/export)

## Project Structure

```
mil-specs-app/
├── src/
│   ├── assets/
│   │   ├── styles/
│   │   │   ├── _variables.scss
│   │   │   ├── _mixins.scss
│   │   │   └── custom.scss
│   │   └── images/
│   ├── components/
│   │   ├── common/
│   │   │   ├── AppHeader.vue
│   │   │   ├── AppNavigation.vue
│   │   │   ├── AppFooter.vue
│   │   │   ├── SearchBar.vue
│   │   │   └── LoadingSpinner.vue
│   │   ├── home/
│   │   │   ├── HeroSection.vue
│   │   │   ├── FeaturesSection.vue
│   │   │   └── QuickLinks.vue
│   │   ├── milspec/
│   │   │   ├── SpecViewer.vue
│   │   │   ├── SpecNavigation.vue
│   │   │   ├── SpecSection.vue
│   │   │   ├── SpecTable.vue
│   │   │   └── SpecSearch.vue
│   │   ├── dd2326/
│   │   │   ├── FormGenerator.vue
│   │   │   ├── FormField.vue
│   │   │   ├── FormPreview.vue
│   │   │   ├── FormValidator.vue
│   │   │   ├── DecoderInput.vue
│   │   │   ├── DecoderTable.vue
│   │   │   └── DecoderResult.vue
│   │   └── shared/
│   │       ├── DataTable.vue
│   │       ├── ExportButton.vue
│   │       └── HelpDialog.vue
│   ├── composables/
│   │   ├── useSpecData.js
│   │   ├── useFormGenerator.js
│   │   ├── useDecoder.js
│   │   └── useExport.js
│   ├── stores/
│   │   ├── specs.js
│   │   ├── forms.js
│   │   └── ui.js
│   ├── views/
│   │   ├── HomeView.vue
│   │   ├── MilSpecView.vue
│   │   ├── FormGeneratorView.vue
│   │   └── DecoderView.vue
│   ├── router/
│   │   └── index.js
│   ├── utils/
│   │   ├── validators.js
│   │   ├── formatters.js
│   │   ├── codes.js
│   │   └── constants.js
│   ├── data/
│   │   ├── mil-std-2073/
│   │   │   ├── methods.json
│   │   │   ├── cleaning.json
│   │   │   ├── preservation.json
│   │   │   ├── wrapping.json
│   │   │   ├── cushioning.json
│   │   │   └── containers.json
│   │   └── dd2326/
│   │       └── fields.json
│   ├── App.vue
│   └── main.js
├── public/
│   └── favicon.ico
├── .env
├── package.json
├── vite.config.js
├── vuetify.config.js
└── README.md
```

## Component Architecture

### Core Components

#### AppHeader.vue
**Purpose**: Global application header with branding and navigation
**Props**: None
**Events**: menu-toggle
**Features**:
- Application logo and name
- Global search bar
- Navigation menu (mobile)
- User authentication status (future)

```vue
<template>
  <v-app-bar color="primary" elevation="2">
    <v-app-bar-title class="font-weight-bold">
      <v-icon icon="mdi-shield-air" class="mr-2"></v-icon>
      mil-specs.com
    </v-app-bar-title>
    <template v-slot:append>
      <SearchBar />
      <v-btn icon="mdi-menu" @click="$emit('menu-toggle')"></v-btn>
    </template>
  </v-app-bar>
</template>
```

#### AppNavigation.vue
**Purpose**: Main navigation drawer
**Props**: drawer (boolean)
**Features**:
- Navigation links to all main sections
- Search within MIL specs
- Recent documents (future)
- Favorites (future)

### Home Page Components

#### HeroSection.vue
**Purpose**: Landing page hero section
**Features**:
- Professional hero image/banner
- Value proposition
- Call-to-action buttons
- Quick stats or metrics

#### FeaturesSection.vue
**Purpose**: Showcase platform capabilities
**Features**:
- Card-based feature display
- Icons and descriptions
- Responsive grid layout

#### QuickLinks.vue
**Purpose**: Quick navigation to common tasks
**Features**:
- Recent specs
- Quick actions
- Popular documents

### MIL-STD-2073 Components

#### SpecViewer.vue
**Purpose**: Main container for spec viewing
**Features**:
- Split-pane navigation and content
- Breadcrumb navigation
- Print/export options
- Reference linking

#### SpecNavigation.vue
**Purpose**: Hierarchical navigation tree
**Features**:
- Expandable/collapsible sections
- Active section highlighting
- Search filtering
- Keyboard navigation

#### SpecSection.vue
**Purpose**: Display individual spec sections
**Features**:
- Proper formatting of spec content
- Code highlighting (where applicable)
- Tables and lists
- Cross-references

#### SpecTable.vue
**Purpose**: Display spec tables (methods, codes, etc.)
**Features**:
- Sortable columns
- Search/filter
- Pagination
- Export options
- Copy to clipboard

### DD Form 2326 Components

#### FormGenerator.vue
**Purpose**: Main form generation interface
**Features**:
- Step-by-step wizard or single-page form
- Auto-population from MIL-STD-2073 codes
- Validation feedback
- Save/load functionality

#### FormField.vue
**Purpose**: Reusable form input component
**Props**: fieldConfig, modelValue, error
**Features**:
- Label and help text
- Validation display
- Input types (text, select, date, etc.)
- Conditional fields

#### FormPreview.vue
**Purpose**: Preview generated form
**Features**:
- Visual representation of DD Form 2326
- Print preview
- Export options

#### FormValidator.vue
**Purpose**: Form validation logic
**Features**:
- Required field validation
- Format validation
- Cross-field validation
- Custom validation rules

#### DecoderInput.vue
**Purpose**: Input for decoding DD Form 2326
**Features**:
- Text input (paste form data)
- File upload (PDF, JSON)
- URL import (future)

#### DecoderTable.vue
**Purpose**: Display decoded data in table format
**Features**:
- Structured table display
- All required fields
- Expandable details
- Filter and search

#### DecoderResult.vue
**Purpose**: Complete decoded result display
**Features**:
- Summary view
- Detailed breakdown
- MIL-STD-2073 reference links
- Export options

## Data Models

### MIL-STD-2073 Data Structure

```javascript
// methods.json structure
{
  "code": "20",
  "description": "Preservative coating...",
  "category": "Method",
  "group": "Basic",
  "keywords": ["preservative", "coating", "greaseproof"],
  "relatedCodes": ["21", "22"],
  "specReference": "5.2.2.2",
  "notes": ["..."],
  "seeAlso": ["MIL-PRF-16173"]
}

// cleaning.json structure
{
  "code": "5",
  "description": "Petroleum solvent followed by fingerprint removal",
  "category": "Cleaning",
  "keywords": ["solvent", "fingerprint"],
  "milStdReference": "5.3.1"
}

// preservation.json structure
{
  "code": "01",
  "specification": "MIL-PRF-16173",
  "grade": "1",
  "description": "Corrosion preventive, solvent cutback, cold application, hard film",
  "category": "Preservative",
  "application": "cold",
  "filmType": "hard"
}
```

### DD Form 2326 Data Structure

```javascript
// fields.json structure
{
  "fields": [
    {
      "id": "qup",
      "label": "Quality per Unit Pack (QUP)",
      "type": "text",
      "required": true,
      "validation": "^[A-Z0-9]{1,4}$",
      "helpText": "Enter the QUP code per MIL-STD-2073",
      "milStdReference": "Appendix E, Section 1"
    },
    {
      "id": "methodOfPreservation",
      "label": "Method of Preservation",
      "type": "select",
      "required": true,
      "options": "methods",
      "helpText": "Select the preservation method code",
      "milStdReference": "Appendix E, Section 2"
    },
    {
      "id": "cleaningDrying",
      "label": "Cleaning & Drying",
      "type": "select",
      "required": false,
      "options": "cleaning",
      "helpText": "Select the cleaning procedure code",
      "milStdReference": "Appendix E, Section 3"
    },
    {
      "id": "preservativeMaterial",
      "label": "Preservative Materials",
      "type": "select",
      "required": false,
      "options": "preservation",
      "helpText": "Select the preservative material code",
      "milStdReference": "Appendix E, Section 4"
    },
    {
      "id": "wrappingMaterial",
      "label": "Wrapping Material",
      "type": "select",
      "required": false,
      "options": "wrapping",
      "helpText": "Select the wrapping material code",
      "milStdReference": "Appendix E, Section 5"
    },
    {
      "id": "cushioningMaterial",
      "label": "Cushioning Material",
      "type": "select",
      "required": false,
      "options": "cushioning",
      "helpText": "Select the cushioning material code",
      "milStdReference": "Appendix E, Section 6"
    },
    {
      "id": "cushioningThickness",
      "label": "Cushioning Thickness",
      "type": "text",
      "required": false,
      "validation": "^[0-9.]+$",
      "helpText": "Enter thickness in inches",
      "milStdReference": "Appendix E, Section 7"
    },
    {
      "id": "unitIntermediateContainer",
      "label": "Unit/Intermediate Container",
      "type": "select",
      "required": false,
      "options": "containers",
      "helpText": "Select container type",
      "milStdReference": "Appendix E, Section 8"
    },
    {
      "id": "packingCode",
      "label": "Packing Code",
      "type": "text",
      "required": false,
      "validation": "^[A-Z0-9]{1,4}$",
      "helpText": "Enter the packing code",
      "milStdReference": "Appendix E, Section 9"
    },
    {
      "id": "specialMaterialContent",
      "label": "Special Material Content",
      "type": "textarea",
      "required": false,
      "helpText": "Describe any special material requirements",
      "milStdReference": "Appendix E, Section 10"
    },
    {
      "id": "hazardousMaterial",
      "label": "Hazardous Material",
      "type": "select",
      "required": false,
      "options": ["Yes", "No"],
      "helpText": "Indicates if materials are hazardous",
      "milStdReference": "Appendix E, Section 11"
    },
    {
      "id": "specialMarking",
      "label": "Special Marking",
      "type": "textarea",
      "required": false,
      "helpText": "Enter any special marking requirements",
      "milStdReference": "Appendix E, Section 12"
    },
    {
      "id": "unitContainerLevel",
      "label": "Unit Container Level",
      "type": "select",
      "required": false,
      "options": ["Level A", "Level B", "Level C"],
      "helpText": "Select the unit container level",
      "milStdReference": "Appendix E, Section 13"
    },
    {
      "id": "optionalProcedures",
      "label": "Optional Procedures",
      "type": "textarea",
      "required": false,
      "helpText": "Describe any optional procedures",
      "milStdReference": "Appendix E, Section 14"
    },
    {
      "id": "shelfLife",
      "label": "Shelf-Life",
      "type": "text",
      "required": false,
      "validation": "^[0-9/]+$",
      "helpText": "Enter shelf-life period",
      "milStdReference": "Appendix E, Section 15"
    },
    {
      "id": "shelfLifeAction",
      "label": "Shelf-Life Action",
      "type": "select",
      "required": false,
      "options": ["Use First", "Inspect/Test", "Dispose", "Return to Supplier"],
      "helpText": "Select shelf-life action",
      "milStdReference": "Appendix E, Section 16"
    },
    {
      "id": "typeOfStorage",
      "label": "Type of Storage",
      "type": "select",
      "required": false,
      "options": ["Controlled Humidity", "Refrigerated", "Frozen", "Shelter", "Open"],
      "helpText": "Select storage type",
      "milStdReference": "Appendix E, Section 17"
    }
  ]
}
```

## Routing Structure

```javascript
// router/index.js
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    meta: { title: 'Home' }
  },
  {
    path: '/specs',
    name: 'specs',
    component: MilSpecView,
    meta: { title: 'MIL-STD-2073 Viewer' },
    children: [
      {
        path: ':section*',
        name: 'spec-section',
        component: SpecViewer,
        meta: { title: 'Spec Viewer' }
      }
    ]
  },
  {
    path: '/form-generator',
    name: 'form-generator',
    component: FormGeneratorView,
    meta: { title: 'DD Form 2326 Generator' }
  },
  {
    path: '/decoder',
    name: 'decoder',
    component: DecoderView,
    meta: { title: 'DD Form 2326 Decoder' }
  },
  {
    path: '/about',
    name: 'about',
    component: () => import('@/views/AboutView.vue'),
    meta: { title: 'About' }
  }
]
```

## State Management (Pinia Stores)

### specs.js
```javascript
export const useSpecsStore = defineStore('specs', {
  state: () => ({
    currentSpec: null,
    currentSection: null,
    searchQuery: '',
    methods: [],
    cleaning: [],
    preservation: [],
    wrapping: [],
    cushioning: [],
    containers: []
  }),
  getters: {
    filteredMethods: (state) => {
      if (!state.searchQuery) return state.methods
      return state.methods.filter(m => 
        m.code.includes(state.searchQuery) ||
        m.description.toLowerCase().includes(state.searchQuery.toLowerCase())
      )
    }
  },
  actions: {
    async loadSpecData() {
      // Load all MIL-STD-2073 data files
    },
    setCurrentSection(sectionId) {
      this.currentSection = sectionId
    }
  }
})
```

### forms.js
```javascript
export const useFormsStore = defineStore('forms', {
  state: () => ({
    currentForm: null,
    savedForms: [],
    decodedResults: []
  }),
  actions: {
    saveForm(formData) {
      this.savedForms.push({
        id: Date.now(),
        data: formData,
        createdAt: new Date()
      })
    },
    decodeForm(encodedData) {
      // Decode DD Form 2326 data
    }
  }
})
```

### ui.js
```javascript
export const useUIStore = defineStore('ui', {
  state: () => ({
    drawer: true,
    loading: false,
    theme: 'light',
    notifications: []
  }),
  actions: {
    toggleDrawer() {
      this.drawer = !this.drawer
    },
    showNotification(message, type = 'info') {
      this.notifications.push({ message, type, id: Date.now() })
    }
  }
})
```

## Validation Logic

```javascript
// utils/validators.js
import { useFormValidator } from '@vuelidate/core'
import { required, minLength, maxLength, helpers } from '@vuelidate/validators'

const codeValidator = helpers.regex(/^[A-Z0-9]{1,4}$/)

export const formValidators = {
  qup: {
    required,
    codeValidator: helpers.withMessage('QUP must be 1-4 alphanumeric characters', codeValidator)
  },
  packingCode: {
    codeValidator
  },
  cushioningThickness: {
    decimalValidator: helpers.regex(/^[0-9.]+$/)
  }
}

export function useDD2326Validation() {
  const rules = {
    qup: { required, codeValidator },
    methodOfPreservation: { required },
    cleaningDrying: {},
    preservativeMaterial: {},
    wrappingMaterial: {},
    cushioningMaterial: {},
    cushioningThickness: {},
    unitIntermediateContainer: {},
    packingCode: {},
    specialMaterialContent: {},
    hazardousMaterial: {},
    specialMarking: {},
    unitContainerLevel: {},
    optionalProcedures: {},
    shelfLife: {},
    shelfLifeAction: {},
    typeOfStorage: {}
  }
  
  return useFormValidator(rules)
}
```

## Export Functionality

```javascript
// utils/export.js
import jsPDF from 'jspdf'
import 'jspdf-autotable'

export function exportToPDF(formData) {
  const doc = new jsPDF()
  
  // Add header
  doc.setFontSize(20)
  doc.text('DD Form 2326 - Military Packaging Data', 105, 20, { align: 'center' })
  
  // Add form fields
  doc.setFontSize(12)
  let y = 40
  
  Object.entries(formData).forEach(([key, value]) => {
    doc.text(`${formatLabel(key)}: ${value}`, 20, y)
    y += 10
  })
  
  doc.save('DD2326.pdf')
}

export function exportToJSON(formData) {
  const dataStr = JSON.stringify(formData, null, 2)
  const blob = new Blob([dataStr], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  
  const link = document.createElement('a')
  link.href = url
  link.download = 'DD2326.json'
  link.click()
}
```

## UI/UX Design Specifications

### Color Palette (Military/Aerospace Theme)

```scss
// _variables.scss
$primary: #1a237e;      // Deep navy blue
$secondary: #37474f;    // Steel gray
$accent: #0288d1;       // Aerospace blue
$warning: #f57c00;      // Safety orange
$success: #2e7d32;      // Army green
$error: #c62828;        // Alert red
$background: #f5f5f5;
$surface: #ffffff;
```

### Typography

- **Headings**: Roboto, sans-serif
- **Body**: Open Sans, sans-serif
- **Code/Monospace**: Source Code Pro, monospace
- **Minimum font size**: 14px for body text
- **Line height**: 1.5 for body text

### Responsive Breakpoints

- **xs**: 0-599px (Mobile)
- **sm**: 600-959px (Tablet portrait)
- **md**: 960-1279px (Tablet landscape)
- **lg**: 1280-1919px (Desktop)
- **xl**: 1920px+ (Large desktop)

## Implementation Phases

### Phase 1: Foundation
1. Initialize Vue 3 + Vite project
2. Install and configure Vuetify 3
3. Set up Vue Router and Pinia
4. Create basic layout components
5. Implement home page

### Phase 2: MIL-STD-2073 Viewer
1. Create data files for preservation methods
2. Build spec navigation component
3. Implement spec viewer with tables
4. Add search and filter functionality
5. Implement data loading from JSON files

### Phase 3: DD Form 2326 Generator
1. Create form field components
2. Implement validation logic
3. Build form wizard/interface
4. Add auto-population from codes
5. Implement export functionality (PDF, JSON)

### Phase 4: DD Form 2326 Decoder
1. Create decoder input component
2. Implement parsing logic
3. Build decoded result table
4. Add search and filter
5. Link to MIL-STD-2073 references

### Phase 5: Polish & Optimization
1. Performance optimization
2. Accessibility compliance (WCAG 2.1)
3. Cross-browser testing
4. Mobile responsiveness testing
5. Documentation and code cleanup

## Future Expansion Considerations

### Modular Architecture
The application is designed to easily accommodate:
- Additional MIL specs (MIL-STD-129, MIL-STD-130, etc.)
- User authentication and accounts
- Cloud storage for forms
- API integration for real-time spec updates
- Collaborative features
- Mobile app wrapper

### Scalability
- Lazy loading for routes and components
- Optimized bundle splitting
- CDN integration for static assets
- Caching strategy for API responses

## Security Considerations

1. **Input Sanitation**: All user inputs validated and sanitized
2. **XSS Protection**: Vue's template interpolation prevents XSS
3. **CSRF Protection**: If API integration is added
4. **Data Encryption**: Sensitive data encrypted in localStorage
5. **Access Control**: Ready for authentication layer

## Accessibility (WCAG 2.1 Compliance)

- Proper heading hierarchy
- ARIA labels on interactive elements
- Keyboard navigation support
- Color contrast ratios (4.5:1 minimum)
- Focus indicators
- Screen reader compatible

## Testing Strategy

### Unit Tests (Vitest)
- Component tests with Vue Test Utils
- Store tests
- Utility function tests
- Validation logic tests

### E2E Tests (Cypress)
- Form submission flows
- Navigation flows
- Responsive behavior
- Export functionality

## Deployment Strategy

### Build Process
```bash
npm run build
# Creates optimized production bundle in /dist
```

### Deployment Options
- **Vercel/Netlify**: Automatic deployments from Git
- **AWS Amplify**: Scalable hosting
- **Docker**: Containerized deployment
- **Static hosting**: S3 + CloudFront

### Environment Variables
```
VITE_API_URL=https://api.mil-specs.com
VITE_APP_VERSION=1.0.0
```

## Code Examples

### Composable: useSpecData.js
```javascript
import { ref, computed } from 'vue'
import { useSpecsStore } from '@/stores/specs'

export function useSpecData() {
  const store = useSpecsStore()
  const loading = ref(false)
  const error = ref(null)
  
  const methods = computed(() => store.methods)
  const cleaning = computed(() => store.cleaning)
  
  async function loadMethods() {
    loading.value = true
    try {
      const response = await fetch('/data/mil-std-2073/methods.json')
      store.methods = await response.json()
    } catch (e) {
      error.value = e.message
    } finally {
      loading.value = false
    }
  }
  
  function searchMethods(query) {
    store.searchQuery = query
  }
  
  return {
    loading,
    error,
    methods,
    cleaning,
    loadMethods,
    searchMethods
  }
}
```

### Composable: useFormGenerator.js
```javascript
import { ref, reactive, computed } from 'vue'
import { useDD2326Validation } from '@/utils/validators'

export function useFormGenerator() {
  const { v$, validate } = useDD2326Validation()
  
  const form = reactive({
    qup: '',
    methodOfPreservation: null,
    cleaningDrying: null,
    preservativeMaterial: null,
    wrappingMaterial: null,
    cushioningMaterial: null,
    cushioningThickness: '',
    unitIntermediateContainer: null,
    packingCode: '',
    specialMaterialContent: '',
    hazardousMaterial: null,
    specialMarking: '',
    unitContainerLevel: null,
    optionalProcedures: '',
    shelfLife: '',
    shelfLifeAction: null,
    typeOfStorage: null
  })
  
  const isValid = computed(() => {
    return v$.value.$validate()
  })
  
  function resetForm() {
    Object.keys(form).forEach(key => {
      form[key] = typeof form[key] === 'string' ? '' : null
    })
    v$.value.$reset()
  }
  
  function populateFromCode(code) {
    // Logic to auto-populate form from preservation code
  }
  
  return {
    form,
    isValid,
    validate,
    resetForm,
    populateFromCode
  }
}
```

### Component: SpecTable.vue
```vue
<template>
  <v-card>
    <v-card-title class="d-flex align-center">
      <span>{{ title }}</span>
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        prepend-inner-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
        density="compact"
        class="mx-4"
        style="max-width: 300px"
      ></v-text-field>
      <v-btn
        icon="mdi-download"
        variant="text"
        @click="exportData"
      ></v-btn>
    </v-card-title>
    
    <v-data-table
      :headers="headers"
      :items="items"
      :search="search"
      :loading="loading"
      :items-per-page="25"
      class="elevation-1"
    >
      <template v-slot:item.code="{ item }">
        <v-chip color="primary" variant="flat">
          {{ item.code }}
        </v-chip>
      </template>
      
      <template v-slot:item.actions="{ item }">
        <v-btn
          icon="mdi-eye"
          size="small"
          variant="text"
          @click="$emit('view', item)"
        ></v-btn>
        <v-btn
          icon="mdi-content-copy"
          size="small"
          variant="text"
          @click="copyCode(item.code)"
        ></v-btn>
      </template>
    </v-data-table>
  </v-card>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  title: { type: String, required: true },
  items: { type: Array, required: true },
  headers: { type: Array, default: () => [] },
  loading: { type: Boolean, default: false }
})

defineEmits(['view'])

const search = ref('')

function copyCode(code) {
  navigator.clipboard.writeText(code)
}

function exportData() {
  // Export logic
}
</script>
```

## Conclusion

This architecture provides a solid foundation for the mil-specs.com application with:
- Professional UI using Vuetify 3
- Scalable component structure
- Clear separation of concerns
- Easy maintenance and expansion
- Performance optimization
- Accessibility compliance
- Future-proof design

The modular approach allows for incremental development and easy addition of new features and MIL specifications.
