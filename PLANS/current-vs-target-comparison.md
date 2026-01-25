# DD Form 2326 UI: Current vs Target Comparison

## Visual Comparison

### Current Implementation
- Simple card-based layout with tabs
- Generic "Section 1-4" labels
- 80 individual input boxes per row (4 rows total)
- Ruler showing positions 1, 10, 20, 30, 40, 50, 60, 70, 80
- Field legend showing "Quality per Unit Pack (QUP) (Cols 1-3)"
- Modern Material Design styling (Vuetify cards, tabs)
- Light gray background
- No form structure or official appearance

### Target Implementation (Official DD Form 2326)
- Official government form layout
- Structured sections with proper labels:
  - Header with approval stamp and OMB information
  - Nomenclature and configuration fields
  - Part A: Item Identification Data
  - Part B: Preservation-Packing Data
  - Part C: Supplemental Data
  - Part D: Special Packaging Instruction Data
- Numbered cells (1-80) within structured table rows
- Row identifiers (A, B, C, D)
- Multiple sub-sections with specific field labels
- Black borders, white background
- Official form footer with form number and date
- Print-ready appearance

## Key Differences

### 1. Layout Structure

**Current:**
```
┌─────────────────────────────────────┐
│ DD Form 2326 Decoder (Header)      │
├─────────────────────────────────────┤
│ Tabs: Raw Data Grid | Paste | ...  │
├─────────────────────────────────────┤
│ Ruler: 1  10  20  30  40  50  60... │
│ Section 1: [80 input boxes]        │
│ Section 2: [80 input boxes]        │
│ Section 3: [80 input boxes]        │
│ Section 4: [80 input boxes]        │
│ Current Field: QUP (Cols 1-3)      │
└─────────────────────────────────────┘
```

**Target:**
```
┌──────────────────────────────────────────────────────────┐
│ APPROVAL │ PRESERVATION AND PACKING DATA │ Form Approved │
│  STAMP   │      (OMB Notice Text)        │ OMB No. ...   │
├──────────────────────────────────────────────────────────┤
│ NOMENCLATURE              │ DESIGN ACTIVITY'S PART NO.  │
│ MANUFACTURER'S CAGE CODE  │ CONFIG ITEM SPEC NUMBER     │
├──────────────────────────────────────────────────────────┤
│        ITEM IDENTIFICATION DATA (PART A)                 │
│ DOC CON │ NATIONAL STOCK NUMBER │ ITEM WEIGHT │ LENGTH...│
│    A    │ [numbered cells 1-80]                         │
├──────────────────────────────────────────────────────────┤
│ CODE│QUP│ICQ│CAGE│ DRAWING OR PART NUMBER          │ P  │
│     │ [numbered cells 41-80]                            │
├──────────────────────────────────────────────────────────┤
│      PRESERVATION - PACKING DATA (PART B)                │
│ DOC CON │ NSN │ PRES METH │ C │ PRES MTL │ WRAP MTL...  │
│    B    │ [numbered cells 1-80]                         │
├──────────────────────────────────────────────────────────┤
│ INT│U│SPEC│PACKING│UNIT PACK│UNIT PACK SIZE│CUBE│O│P   │
│    │ [numbered cells 41-80]                            │
├──────────────────────────────────────────────────────────┤
│           SUPPLEMENTAL DATA (PART C)                     │
│ DOC CON │ NSN │ SUPPLEMENTAL INSTRUCTIONS               │
│    C    │ [numbered cells 1-80]                         │
│         │ [numbered cells 41-80]                        │
├──────────────────────────────────────────────────────────┤
│    SPECIAL PACKAGING INSTRUCTION DATA (PART D)           │
│ DOC CON │ NSN │ PKG DESIGN ACT CAGE │ SPI NUMBER │ B│Y │
│    D    │ [numbered cells 1-80]                         │
├──────────────────────────────────────────────────────────┤
│ SPI DATE │ CONTAINER NATIONAL STOCK NUMBER              │
│          │ [numbered cells 41-80]                       │
├──────────────────────────────────────────────────────────┤
│ DD FORM 2326, SEP 1997  │ PREVIOUS EDITIONS ARE OBSOLETE│
│                                                   [Reset]│
└──────────────────────────────────────────────────────────┘
```

### 2. Field Organization

**Current:**
- Generic 4 sections with 80 characters each
- No field labels within the grid
- Field information shown separately below grid
- No visual grouping of related fields

**Target:**
- Structured sections (Parts A, B, C, D)
- Each section has specific field labels
- Fields are visually grouped with borders
- Column headers show field names
- Cell numbers integrated into the form structure

### 3. Visual Styling

| Aspect | Current | Target |
|--------|---------|--------|
| **Background** | Light gray (#f5f5f5) | White |
| **Borders** | Light gray (#ddd) | Black (#000) |
| **Typography** | Modern sans-serif | Form-style (mix of sans-serif and monospace) |
| **Cell Size** | 20px width, 24px height | Varies by field (proportional) |
| **Headers** | Material Design cards | Table headers with black borders |
| **Overall Style** | Modern web app | Official government form |
| **Print Ready** | No | Yes |

### 4. Data Input Method

**Current:**
- Individual character input boxes
- Auto-advance on input
- Arrow key navigation
- Focus-based field info display

**Target:**
- Should maintain similar input functionality
- But visually appear as official form
- Fields should be grouped logically
- Some fields span multiple cells

### 5. Missing Elements in Current Implementation

1. **Form Header**
   - No approval stamp area
   - No OMB information
   - No official title with notice text

2. **Top Fields Section**
   - No nomenclature field
   - No design activity part number
   - No manufacturer's cage code
   - No configuration item specification number

3. **Structured Parts**
   - No Part A, B, C, D designations
   - No DOC CON column
   - No proper field groupings

4. **Field Labels**
   - Missing specific field names (QUP, ICQ, CAGE, etc.)
   - No column headers for measurements
   - No unit indicators (LBS, INCHES, CU. FT.)

5. **Form Footer**
   - No form number and date
   - No "PREVIOUS EDITIONS ARE OBSOLETE" text
   - No official Reset button

## Transformation Strategy

### Phase 1: Create New Form Components
- Build official form layout components
- Maintain existing functionality
- Keep current grid as alternative input method

### Phase 2: Replace Default View
- Make official form the primary view
- Move current grid to "Advanced" or "Raw Input" tab
- Update decoder logic to work with new structure

### Phase 3: Enhance Features
- Add field validation
- Implement auto-fill from codes
- Add tooltips and help text
- Enable print functionality

## Data Mapping

The current 4-section grid needs to map to the official form structure:

```javascript
// Current: 4 arrays of 80 characters
rawGridData[0] // Section 1 (80 chars)
rawGridData[1] // Section 2 (80 chars)
rawGridData[2] // Section 3 (80 chars)
rawGridData[3] // Section 4 (80 chars)

// Target: Structured form data
{
  // Top fields (not in grid)
  nomenclature: '',
  designActivityPartNumber: '',
  manufacturersCageCode: '',
  configurationItemSpecNumber: '',
  
  // Part A - Row A (cells 1-40)
  partA_rowA: {
    docCon: '', // cells 1-8
    fsc: '', // cells 9-10
    niin: '', // cells 11-20
    addl: '', // cell 21
    itemWeightPounds: '', // cells 22-23
    itemWeightUnit: '', // cell 24
    lengthInches: '', // cells 25-27
    lengthUnit: '', // cell 28
    widthInches: '', // cells 29-31
    widthUnit: '', // cell 32
    depthInches: '', // cells 33-35
    depthUnit: '', // cell 36
    cat: '' // cells 37-40
  },
  
  // Part A - Row continuation (cells 41-80)
  partA_rowCont: {
    code: '', // cells 41-42
    qup: '', // cells 43-46
    icq: '', // cells 47-50
    cage: '', // cells 51-60
    drawingOrPartNumber: '', // cells 61-79
    p: '' // cell 80
  },
  
  // Part B - Row B (cells 1-40)
  partB_rowB: {
    docCon: '',
    fsc: '',
    niin: '',
    addl: '',
    presMeth: '',
    c: '',
    presMtl: '',
    wrapMtl: '',
    cushDunn: '',
    cThickness: '',
    unitCont: ''
  },
  
  // Part B - Row continuation (cells 41-80)
  partB_rowCont: {
    intType: '',
    u: '',
    specMkg: '',
    packingA: '',
    packingB: '',
    packingC: '',
    unitPackWeightLbs: '',
    unitPackWeightUnit: '',
    unitPackLength: '',
    unitPackWidth: '',
    unitPackDepth: '',
    unitPackDepthUnit: '',
    wholeCube: '',
    hundredthCube: '',
    cuFt: '',
    o: '',
    p: ''
  },
  
  // Part C - Row C (cells 1-80)
  partC_rowC: {
    docCon: '',
    fsc: '',
    niin: '',
    addl: '',
    supplementalInstructions: '' // cells spanning multiple
  },
  
  // Part C - Row continuation (cells 41-80)
  partC_rowCont: {
    supplementalInstructionsCont: ''
  },
  
  // Part D - Row D (cells 1-40)
  partD_rowD: {
    docCon: '',
    fsc: '',
    niin: '',
    addl: '',
    pkgDesignActCage: '',
    spiNumber: '',
    b: '',
    y: ''
  },
  
  // Part D - Row continuation (cells 41-80)
  partD_rowCont: {
    spiDate: '',
    containerFsc: '',
    containerNiin: '',
    containerAddl: ''
  }
}
```

## Implementation Priority

### High Priority (Must Have)
1. ✅ Form header with approval stamp and OMB info
2. ✅ Top fields section (nomenclature, etc.)
3. ✅ Part A structure with proper field labels
4. ✅ Part B structure with preservation fields
5. ✅ Form footer with form number and reset
6. ✅ Black borders and official styling

### Medium Priority (Should Have)
1. ✅ Part C supplemental data section
2. ✅ Part D special packaging section
3. ✅ Cell numbering (1-80) display
4. ✅ Row identifiers (A, B, C, D)
5. ✅ Proper column spans for multi-cell fields

### Low Priority (Nice to Have)
1. ⚪ Print-optimized CSS
2. ⚪ Field validation indicators
3. ⚪ Auto-complete suggestions
4. ⚪ Tooltips for field descriptions
5. ⚪ Responsive scaling options

## Next Steps

1. Create component structure for official form
2. Build each section component with proper styling
3. Implement data binding between grid and form
4. Update decoder logic to work with new structure
5. Test and refine visual appearance
6. Add enhanced features (validation, tooltips, etc.)
