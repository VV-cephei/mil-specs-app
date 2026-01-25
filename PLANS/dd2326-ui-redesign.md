# DD Form 2326 Decoder UI Redesign Plan

## Overview
Redesign the DD Form 2326 Decoder page to match the official form layout as shown in the reference image. The form needs to replicate the exact structure, styling, and field organization of the official DD Form 2326 (SEP 1997).

## Current State Analysis

### Existing Components
1. **[`DecoderView.vue`](src/views/DecoderView.vue)** - Main decoder page with tabs for different input methods
2. **[`RawDataGrid.vue`](src/components/dd2326/RawDataGrid.vue)** - 4x80 character grid input
3. **[`FormGridInput.vue`](src/components/dd2326/FormGridInput.vue)** - Simplified field input boxes

### Current Issues
- UI doesn't match the official DD Form 2326 layout
- Missing proper form sections (Parts A, B, C, D)
- No visual representation of the actual form structure
- Lacks the official form header, approval stamp, and OMB information
- Grid layout doesn't show the numbered cells (1-80) as in the official form
- Missing proper field labels and organization

## Target Form Structure

Based on the reference image, the DD Form 2326 consists of:

### 1. Form Header
- **Left**: "APPROVAL STAMP" box
- **Center**: "PRESERVATION AND PACKING DATA" title with OMB notice text
- **Right**: "Form Approved OMB No. 0704-0188" box

### 2. Top Section Fields
- **NOMENCLATURE** field (left)
- **DESIGN ACTIVITY'S PART NUMBER** field (right)
- **MANUFACTURER'S CAGE CODE** field (left)
- **CONFIGURATION ITEM SPECIFICATION NUMBER** field (right)

### 3. Part A: Item Identification Data
- **DOC CON** column (cells 1-8)
- **NATIONAL STOCK NUMBER** section:
  - FSC (cells 9-10)
  - NIIN (cells 11-20)
  - ADDL (cells 21)
- **ITEM WEIGHT** (cells 22-24)
- **LENGTH** (cells 25-28)
- **WIDTH** (cells 29-32)
- **DEPTH** (cells 33-36)
- **CAT** (cells 37-40)
- Row A with numbered cells 1-80

### 4. Part A Continued (Second Row)
- **CODE** (cells 41-42)
- **QUP** (cells 43-46)
- **ICQ** (cells 47-50)
- **CAGE** (cells 51-60)
- **DRAWING OR PART NUMBER** (cells 61-79)
- **P** (cell 80)
- Row with numbered cells 41-80

### 5. Part B: Preservation-Packing Data
- **DOC CON** column
- **NATIONAL STOCK NUMBER** (FSC, NIIN, ADDL)
- **PRES METH** (Preservation Method)
- **C** (Cleaning)
- **PRES MTL** (Preservation Material)
- **WRAP MTL** (Wrapping Material)
- **CUSH DUNN** (Cushioning)
- **C** (Cushioning thickness)
- **UNIT CONT** (Unit Container)
- Row B with numbered cells 1-80

### 6. Part B Continued (Second Row)
- **INT TYPE** (Interior Type)
- **U** (Unit)
- **SPEC MKG** (Special Marking)
- **PACKING** (A, B, C)
- **UNIT PACK WEIGHT** (LBS, Unit)
- **UNIT PACK SIZE** (LENGTH, WIDTH, DEPTH in inches)
- **UNIT PACK CUBE** (WHOLE CUBE, 100th, CU. FT.)
- **O** (Optional)
- **P** (Packing)
- Row with numbered cells 41-80

### 7. Part C: Supplemental Data
- **DOC CON** column
- **NATIONAL STOCK NUMBER** (FSC, NIIN, ADDL)
- **SUPPLEMENTAL INSTRUCTIONS** (large field)
- Row C with numbered cells 1-80
- Second row with numbered cells 41-80 for supplemental instructions

### 8. Part D: Special Packaging Instruction Data
- **DOC CON** column
- **NATIONAL STOCK NUMBER** (FSC, NIIN, ADDL)
- **PKG DESIGN ACT CAGE** (cells 22-24)
- **SPI NUMBER** (cells 25-40)
- **B** (cell 37)
- **Y** (cell 38)
- Row D with numbered cells 1-80

### 9. Part D Continued
- **SPI DATE** (cells 41-48)
- **CONTAINER NATIONAL STOCK NUMBER** (FSC, NIIN, ADDL)
- Row with numbered cells 41-80

### 10. Form Footer
- **Left**: "DD FORM 2326, SEP 1997"
- **Center**: "PREVIOUS EDITIONS ARE OBSOLETE."
- **Right**: "Reset" button

## Design Approach

### Component Architecture

```
DecoderView.vue
├── DD2326FormDisplay.vue (NEW - Main form component)
│   ├── FormHeader.vue (NEW)
│   ├── TopFieldsSection.vue (NEW)
│   ├── PartASection.vue (NEW)
│   ├── PartBSection.vue (NEW)
│   ├── PartCSection.vue (NEW)
│   ├── PartDSection.vue (NEW)
│   └── FormFooter.vue (NEW)
└── DecodedResultsDisplay.vue (REFACTOR - existing results section)
```

### Styling Strategy

1. **Table-based Layout**: Use HTML tables with precise borders to match the form grid
2. **Fixed Cell Widths**: Each numbered cell should be uniform width
3. **Border Styling**: Black borders (1px solid) for main sections, lighter borders for cells
4. **Typography**: 
   - Headers: Bold, uppercase, small font (10-11px)
   - Cell numbers: Small font (8-9px)
   - Input text: Monospace font (Courier New)
5. **Colors**:
   - Background: White (#FFFFFF)
   - Headers: Light gray (#E8E8E8 or #F0F0F0)
   - Borders: Black (#000000)
   - Text: Black (#000000)
6. **Spacing**: Minimal padding (2-4px) to maintain compact form appearance

### Data Model

```javascript
{
  // Header fields
  approvalStamp: '',
  nomenclature: '',
  designActivityPartNumber: '',
  manufacturersCageCode: '',
  configurationItemSpecNumber: '',
  
  // Part A - Item Identification
  partA: {
    docCon: '', // cells 1-8
    fsc: '', // cells 9-10
    niin: '', // cells 11-20
    addl: '', // cell 21
    itemWeight: { pounds: '', unit: '' }, // cells 22-24
    length: { inches: '', unit: '' }, // cells 25-28
    width: { inches: '', unit: '' }, // cells 29-32
    depth: { inches: '', unit: '' }, // cells 33-36
    cat: '', // cells 37-40
    code: '', // cells 41-42
    qup: '', // cells 43-46
    icq: '', // cells 47-50
    cage: '', // cells 51-60
    drawingOrPartNumber: '', // cells 61-79
    p: '' // cell 80
  },
  
  // Part B - Preservation-Packing
  partB: {
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
    unitCont: '',
    intType: '',
    u: '',
    specMkg: '',
    packing: { a: '', b: '', c: '' },
    unitPackWeight: { lbs: '', unit: '' },
    unitPackSize: { length: '', width: '', depth: '', unit: '' },
    unitPackCube: { wholeCube: '', hundredth: '', cuFt: '' },
    o: '',
    p: ''
  },
  
  // Part C - Supplemental Data
  partC: {
    docCon: '',
    fsc: '',
    niin: '',
    addl: '',
    supplementalInstructions: '' // cells 1-80 (two rows)
  },
  
  // Part D - Special Packaging
  partD: {
    docCon: '',
    fsc: '',
    niin: '',
    addl: '',
    pkgDesignActCage: '',
    spiNumber: '',
    b: '',
    y: '',
    spiDate: '',
    containerFsc: '',
    containerNiin: '',
    containerAddl: ''
  }
}
```

## Implementation Steps

### Step 1: Create Form Header Component
- Create [`FormHeader.vue`](src/components/dd2326/FormHeader.vue)
- Implement three-column layout (approval stamp, title, OMB info)
- Add OMB notice text with proper formatting
- Style with borders and proper spacing

### Step 2: Create Top Fields Section
- Create [`TopFieldsSection.vue`](src/components/dd2326/TopFieldsSection.vue)
- Implement 2x2 grid for nomenclature, design activity, manufacturer cage, and config spec
- Add proper labels and input fields
- Style to match form appearance

### Step 3: Build Part A Component
- Create [`PartASection.vue`](src/components/dd2326/PartASection.vue)
- Implement table structure with proper column headers
- Create 80 numbered cells for row A
- Add second row with cells 41-80
- Implement field groupings (DOC CON, NSN, measurements, etc.)
- Add cell number labels (1-80)

### Step 4: Build Part B Component
- Create [`PartBSection.vue`](src/components/dd2326/PartBSection.vue)
- Implement preservation-packing data fields
- Create two rows (B and continuation)
- Add all required field headers and cells
- Implement proper column spans for multi-cell fields

### Step 5: Build Part C Component
- Create [`PartCSection.vue`](src/components/dd2326/PartCSection.vue)
- Implement supplemental data section
- Create large text area for supplemental instructions
- Add two rows (C and continuation) with numbered cells

### Step 6: Build Part D Component
- Create [`PartDSection.vue`](src/components/dd2326/PartDSection.vue)
- Implement special packaging instruction fields
- Create two rows (D and continuation)
- Add SPI date and container NSN fields

### Step 7: Create Form Footer
- Create [`FormFooter.vue`](src/components/dd2326/FormFooter.vue)
- Add form number and date
- Add "PREVIOUS EDITIONS ARE OBSOLETE" text
- Implement Reset button

### Step 8: Create Main Form Display Component
- Create [`DD2326FormDisplay.vue`](src/components/dd2326/DD2326FormDisplay.vue)
- Integrate all section components
- Implement data binding and v-model support
- Add form-wide styling and container

### Step 9: Update DecoderView
- Refactor [`DecoderView.vue`](src/views/DecoderView.vue)
- Replace current input methods with new form display
- Keep decode functionality but update to work with new data structure
- Maintain export and results display features

### Step 10: Styling and Polish
- Create shared CSS for form styling
- Ensure consistent borders, spacing, and typography
- Test responsive behavior (form may need horizontal scroll)
- Add print-friendly styles

### Step 11: Testing and Validation
- Test all input fields
- Verify cell numbering is correct
- Ensure data binding works properly
- Test decode functionality with new structure
- Validate against official form layout

## Technical Considerations

### Responsive Design
- The form is inherently wide (80 cells)
- Implement horizontal scroll for smaller screens
- Consider a "zoom" or "scale" option for better viewing
- Maintain aspect ratio and proportions

### Accessibility
- Add proper ARIA labels for all input fields
- Ensure keyboard navigation works correctly
- Provide field descriptions for screen readers
- Maintain sufficient color contrast

### Performance
- Use v-once for static labels
- Implement virtual scrolling if needed for large forms
- Optimize re-renders with proper key attributes

### Browser Compatibility
- Test in Chrome, Firefox, Safari, Edge
- Ensure table layouts render consistently
- Test print functionality across browsers

## Success Criteria

1. ✅ Form visually matches the official DD Form 2326 layout
2. ✅ All sections (Parts A, B, C, D) are properly implemented
3. ✅ Cell numbering (1-80) is accurate and visible
4. ✅ Field labels match the official form exactly
5. ✅ Borders and spacing match the reference image
6. ✅ Form header and footer are correctly styled
7. ✅ Data can be input and decoded successfully
8. ✅ Form is printable and maintains layout
9. ✅ All existing decoder functionality still works
10. ✅ Code is well-organized and maintainable

## Future Enhancements

- Add field validation based on MIL-STD-2073 specifications
- Implement auto-complete for known codes
- Add tooltips with field descriptions
- Create a "fill from template" feature
- Add form versioning support (different DD 2326 editions)
- Implement collaborative editing features
- Add form comparison tool

## References

- DD Form 2326 (SEP 1997) - Official form layout
- MIL-STD-2073-1E - Packaging standard
- Current implementation in [`DecoderView.vue`](src/views/DecoderView.vue)
- Existing grid components: [`RawDataGrid.vue`](src/components/dd2326/RawDataGrid.vue), [`FormGridInput.vue`](src/components/dd2326/FormGridInput.vue)
